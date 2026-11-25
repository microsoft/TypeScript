package api

import (
	"context"
	"fmt"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type moduleResolverFactory struct {
	registration     *moduleResolverRegistration
	session          *Session
	conn             ipc.Conn
	currentDirectory tspath.RootedDirectoryPath
}

type programResolutionContext struct {
	options   module.ResolverOptions
	resolvers map[ModuleResolverID]module.Resolver
	mu        sync.Mutex
}

type callbackModuleResolver struct {
	registration               *moduleResolverRegistration
	conn                       ipc.Conn
	ctx                        context.Context
	currentDirectory           tspath.RootedDirectoryPath
	caseSensitivity            tspath.CaseSensitivity
	snapshot                   SnapshotID
	programResolutionContextID uint64
	fallbackResolver           module.Resolver
}

func (p *callbackModuleResolver) BaseDirectory() tspath.RootedDirectoryPath {
	return p.fallbackResolver.BaseDirectory()
}

func (f *moduleResolverFactory) NewResolver(
	ctx context.Context,
	options module.ResolverOptions,
) (module.Resolver, func()) {
	options.CompilerOptions = f.registration.compilerOptions
	var fallback module.Resolver = module.NewResolver(options)
	if f.registration.resolveModuleNameCallback == "" {
		if f.registration.resolutions != nil {
			fallback = module.NewStaticResolver(fallback, f.registration.resolutions)
		}
		return fallback, func() {}
	}
	contextID := f.session.registerProgramResolutionContext(fallback, options, f.registration)
	var resolver module.Resolver = &callbackModuleResolver{
		registration:               f.registration,
		conn:                       f.conn,
		ctx:                        ctx,
		currentDirectory:           f.currentDirectory,
		caseSensitivity:            f.session.caseSensitivity(),
		programResolutionContextID: contextID,
		fallbackResolver:           fallback,
	}
	if f.registration.resolutions != nil {
		resolver = module.NewStaticResolver(resolver, f.registration.resolutions)
	}
	return resolver, func() {
		f.session.releaseProgramResolutionContext(contextID)
	}
}

func (p *callbackModuleResolver) ResolveModuleName(
	moduleName string,
	containingFile tspath.RootedFilePath,
	resolutionMode core.ResolutionMode,
	redirectedReference module.ResolvedProjectReference,
) (*module.ResolvedModule, []module.DiagAndArgs, error) {
	return p.resolveModuleName(moduleName, containingFile.Directory(), resolutionMode)
}

func (p *callbackModuleResolver) ResolveModuleNameFromDirectory(
	moduleName string,
	containingDirectory tspath.RootedDirectoryPath,
	resolutionMode core.ResolutionMode,
) (*module.ResolvedModule, []module.DiagAndArgs, error) {
	return p.resolveModuleName(moduleName, containingDirectory, resolutionMode)
}

func (p *callbackModuleResolver) resolveModuleName(
	moduleName string,
	containingDirectory tspath.RootedDirectoryPath,
	resolutionMode core.ResolutionMode,
) (*module.ResolvedModule, []module.DiagAndArgs, error) {
	params := &ResolveModuleNameCallbackParams{
		ModuleName:          moduleName,
		ContainingDirectory: containingDirectory.AsString(),
	}
	if p.snapshot != 0 {
		params.Snapshot = &p.snapshot
	}
	if p.programResolutionContextID != 0 {
		params.InProgressSnapshot = &p.programResolutionContextID
	}
	mode := ResolutionMode(resolutionMode)
	params.ResolutionMode = &mode
	callbackResult, err := p.conn.Call(p.ctx, p.registration.resolveModuleNameCallback, params)
	if err != nil {
		return nil, nil, fmt.Errorf("resolveModuleName callback failed: %w", err)
	}

	if len(callbackResult) == 0 || string(callbackResult) == "null" {
		return nil, nil, nil
	}
	var staticResolution StaticModuleResolution
	if err := json.Unmarshal(callbackResult, &staticResolution); err != nil {
		return nil, nil, fmt.Errorf("invalid resolveModuleName callback result: %w", err)
	}
	return staticModuleResolutionToResolvedModule(&staticResolution, p.currentDirectory, p.caseSensitivity), nil, nil
}

func (p *callbackModuleResolver) ResolveTypeReferenceDirective(
	typeReferenceDirectiveName string,
	containingFile tspath.RootedFilePath,
	resolutionMode core.ResolutionMode,
	redirectedReference module.ResolvedProjectReference,
) (*module.ResolvedTypeReferenceDirective, []module.DiagAndArgs) {
	return p.fallbackResolver.ResolveTypeReferenceDirective(typeReferenceDirectiveName, containingFile, resolutionMode, redirectedReference)
}

func (p *callbackModuleResolver) GetResolutionData() *module.ResolutionData {
	return p.fallbackResolver.GetResolutionData()
}

func compileModuleResolutionSpec(spec *ModuleResolutionSpec, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) (*module.StaticResolutions, error) {
	if spec == nil {
		return nil, nil
	}
	fallbackToResolution := false
	switch spec.Fallback {
	case ModuleResolutionFallbackResolve:
		fallbackToResolution = true
	case ModuleResolutionFallbackUnresolved:
		fallbackToResolution = false
	default:
		return nil, fmt.Errorf("%w: invalid module resolution fallback %q", ErrClientError, spec.Fallback)
	}

	entries := make([]module.StaticResolutionEntry, 0, len(spec.Entries))
	for i, entry := range spec.Entries {
		if entry == nil {
			return nil, fmt.Errorf("%w: module resolution entry %d is null", ErrClientError, i)
		}
		if entry.ModuleName == "" {
			return nil, fmt.Errorf("%w: module resolution entry %d has an empty moduleName", ErrClientError, i)
		}
		if entry.Result == nil {
			return nil, fmt.Errorf("%w: module resolution entry %d has no result", ErrClientError, i)
		}

		staticEntry := module.StaticResolutionEntry{ModuleName: entry.ModuleName}
		if entry.ContainingDirectory != nil {
			staticEntry.ContainingDirectory = tspath.ToRootedDirectoryPath(entry.ContainingDirectory.ToFileName(currentDirectory).AsString(), currentDirectory)
		}
		if entry.ResolutionMode != nil {
			mode := core.ModuleKind(*entry.ResolutionMode)
			if mode != core.ModuleKindNone && mode != core.ModuleKindCommonJS && mode != core.ModuleKindESNext {
				return nil, fmt.Errorf("%w: module resolution entry %d has invalid resolutionMode %s", ErrClientError, i, mode.String())
			}
			staticEntry.ResolutionMode = &mode
		}
		staticEntry.Result = staticModuleResolutionToResolvedModule(entry.Result, currentDirectory, caseSensitivity)
		entries = append(entries, staticEntry)
	}

	resolutions, err := module.NewStaticResolutions(entries, fallbackToResolution, currentDirectory, caseSensitivity)
	if err != nil {
		return nil, fmt.Errorf("%w: %w", ErrClientError, err)
	}
	return resolutions, nil
}

func staticModuleResolutionToResolvedModule(staticResolution *StaticModuleResolution, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) *module.ResolvedModule {
	if staticResolution == nil || staticResolution.ResolvedFileName == nil {
		return nil
	}
	result := &module.ResolvedModule{
		ResolvedFileName:   staticResolution.ResolvedFileName.ToFileName(currentDirectory),
		IsCustomResolution: true,
	}
	if staticResolution.OriginalPath != nil {
		result.OriginalPath = staticResolution.OriginalPath.ToFileName(currentDirectory)
	}
	result.ResolvedPath = caseSensitivity.PathKey(result.ResolvedFileName.AsPath())
	if staticResolution.PackageID != nil {
		result.PackageId = module.PackageId{
			Name:             staticResolution.PackageID.Name,
			SubModuleName:    staticResolution.PackageID.SubModuleName,
			Version:          staticResolution.PackageID.Version,
			PeerDependencies: staticResolution.PackageID.PeerDependencies,
		}
	}
	originalPath := result.ResolvedFileName
	if result.OriginalPath != "" {
		originalPath = result.OriginalPath
	}
	result.Extension = result.ResolvedFileName.Extension()
	result.IsExternalLibraryImport = strings.Contains(originalPath.AsString(), "/node_modules/")
	return result
}

func moduleResolutionTraceToStrings(trace []module.DiagAndArgs) []string {
	return core.Map(trace, func(entry module.DiagAndArgs) string {
		return entry.Message.Localize(locale.Default, entry.Args...)
	})
}

func (s *Session) moduleResolverFactory(options *CreateProgramOptions) (project.ModuleResolverFactory, error) {
	if options.ModuleResolver == 0 {
		return nil, nil
	}
	s.moduleResolversMu.RLock()
	data := s.moduleResolvers[options.ModuleResolver]
	s.moduleResolversMu.RUnlock()
	if data == nil {
		return nil, fmt.Errorf("%w: module resolver %d not found", ErrClientError, options.ModuleResolver)
	}
	if data.resolveModuleNameCallback != "" && s.conn == nil {
		return nil, fmt.Errorf("%w: API connection is not initialized", ErrClientError)
	}
	return &moduleResolverFactory{
		registration:     data,
		session:          s,
		conn:             s.conn,
		currentDirectory: s.GetCurrentDirectory(),
	}, nil
}

func (s *Session) registerProgramResolutionContext(
	resolver module.Resolver,
	options module.ResolverOptions,
	registration *moduleResolverRegistration,
) uint64 {
	id := s.nextProgramResolutionContextID.Add(1)
	s.programResolutionContextsMu.Lock()
	s.programResolutionContexts[id] = &programResolutionContext{
		options:   options,
		resolvers: map[ModuleResolverID]module.Resolver{registration.id: resolver},
	}
	s.programResolutionContextsMu.Unlock()
	return id
}

func (s *Session) releaseProgramResolutionContext(id uint64) {
	s.programResolutionContextsMu.Lock()
	delete(s.programResolutionContexts, id)
	s.programResolutionContextsMu.Unlock()
}

func (c *programResolutionContext) resolverFor(registration *moduleResolverRegistration) module.Resolver {
	c.mu.Lock()
	defer c.mu.Unlock()
	if resolver := c.resolvers[registration.id]; resolver != nil {
		return resolver
	}
	options := c.options
	options.CompilerOptions = registration.compilerOptions
	resolver := module.NewResolver(options)
	c.resolvers[registration.id] = resolver
	return resolver
}

func moduleResolutionError(snapshot *project.Snapshot) error {
	for _, project := range snapshot.ProjectCollection.Projects() {
		if project.Program != nil {
			if err := project.Program.ModuleResolutionError(); err != nil {
				return err
			}
		}
	}
	return nil
}

func (s *Session) handleCreateModuleResolver(params *CreateModuleResolverParams) (ModuleResolverID, error) {
	provider, err := compileModuleResolutionSpec(
		params.ModuleResolutions,
		s.GetCurrentDirectory(),
		s.caseSensitivity(),
	)
	if err != nil {
		return 0, err
	}
	id := ModuleResolverID(s.nextModuleResolverID.Add(1))
	data := &moduleResolverRegistration{
		id:                        id,
		compilerOptions:           &params.CompilerOptions,
		resolutions:               provider,
		resolveModuleNameCallback: params.ResolveModuleNameCallback,
	}
	s.moduleResolversMu.Lock()
	s.moduleResolvers[id] = data
	s.moduleResolversMu.Unlock()
	return id, nil
}

func (s *Session) handleReleaseModuleResolver(params *ReleaseModuleResolverParams) (any, error) {
	s.moduleResolversMu.Lock()
	_, ok := s.moduleResolvers[params.Resolver]
	if ok {
		delete(s.moduleResolvers, params.Resolver)
	}
	s.moduleResolversMu.Unlock()
	if !ok {
		return nil, fmt.Errorf("%w: module resolver %d not found", ErrClientError, params.Resolver)
	}
	return nil, nil
}

func (s *Session) handleResolveModuleName(ctx context.Context, params *ResolveModuleNameParams) (*ResolveModuleNameResult, error) {
	if params.ModuleName == "" {
		return nil, fmt.Errorf("%w: moduleName is empty", ErrClientError)
	}
	mode, err := parseResolutionMode(params.ResolutionMode)
	if err != nil {
		return nil, err
	}
	resolver, err := s.moduleResolverForRequest(ctx, params.Resolver, params.Snapshot, params.InProgressSnapshot)
	if err != nil {
		return nil, err
	}
	containingDirectory := tspath.ToRootedDirectoryPath(params.ContainingDirectory.ToFileName(s.GetCurrentDirectory()).AsString(), s.GetCurrentDirectory())
	result, trace, err := resolver.ResolveModuleNameFromDirectory(params.ModuleName, containingDirectory, mode)
	if err != nil {
		return nil, err
	}
	return &ResolveModuleNameResult{
		ResolvedModule: newResolvedModuleResponse(result),
		Trace:          moduleResolutionTraceToStrings(trace),
	}, nil
}

func (s *Session) handleResolveTypeReferenceDirective(ctx context.Context, params *ResolveTypeReferenceDirectiveParams) (*ResolveTypeReferenceDirectiveResult, error) {
	if params.TypeReferenceDirectiveName == "" {
		return nil, fmt.Errorf("%w: typeReferenceDirectiveName is empty", ErrClientError)
	}
	if params.ContainingFile.FileName == "" && params.ContainingFile.URI == "" {
		return nil, fmt.Errorf("%w: containingFile is empty", ErrClientError)
	}
	mode, err := parseResolutionMode(params.ResolutionMode)
	if err != nil {
		return nil, err
	}
	resolver, err := s.moduleResolverForRequest(ctx, params.Resolver, params.Snapshot, params.InProgressSnapshot)
	if err != nil {
		return nil, err
	}
	result, trace := resolver.ResolveTypeReferenceDirective(params.TypeReferenceDirectiveName, params.ContainingFile.ToFileName(s.GetCurrentDirectory()), mode, nil)
	return &ResolveTypeReferenceDirectiveResult{
		ResolvedTypeReferenceDirective: newResolvedTypeReferenceDirectiveResponse(result),
		Trace:                          moduleResolutionTraceToStrings(trace),
	}, nil
}

func parseResolutionMode(mode *ResolutionMode) (core.ResolutionMode, error) {
	if mode == nil {
		return core.ResolutionModeNone, nil
	}
	value := core.ModuleKind(*mode)
	if value != core.ResolutionModeNone && value != core.ResolutionModeCommonJS && value != core.ResolutionModeESM {
		return core.ResolutionModeNone, fmt.Errorf("%w: invalid resolutionMode %s", ErrClientError, value.String())
	}
	return value, nil
}

func (s *Session) moduleResolverForRequest(ctx context.Context, id ModuleResolverID, snapshot SnapshotID, inProgressSnapshot uint64) (module.Resolver, error) {
	s.moduleResolversMu.RLock()
	data := s.moduleResolvers[id]
	s.moduleResolversMu.RUnlock()
	if data == nil {
		return nil, fmt.Errorf("%w: module resolver %d not found", ErrClientError, id)
	}

	var resolver module.Resolver
	if snapshot != 0 && inProgressSnapshot != 0 {
		return nil, fmt.Errorf("%w: snapshot and inProgressSnapshot are mutually exclusive", ErrClientError)
	}
	if inProgressSnapshot != 0 {
		s.programResolutionContextsMu.RLock()
		resolutionContext := s.programResolutionContexts[inProgressSnapshot]
		s.programResolutionContextsMu.RUnlock()
		if resolutionContext == nil {
			return nil, fmt.Errorf("%w: in-progress snapshot %d not found", ErrClientError, inProgressSnapshot)
		}
		resolver = resolutionContext.resolverFor(data)
	} else if snapshot != 0 {
		sd, err := s.getSnapshotData(snapshot)
		if err != nil {
			return nil, err
		}
		options := module.ResolverOptions{
			Host:            sd.snapshot,
			CompilerOptions: data.compilerOptions,
			ExtraExtensions: sd.snapshot.ContentMapperExtensions(),
		}
		if configPath := data.compilerOptions.ConfigFilePath; configPath != "" {
			if config := sd.snapshot.ConfigFileRegistry.GetConfig(s.caseSensitivity().PathKey(configPath.AsPath())); config != nil {
				options.ExtraExtensions = config.ContentMapperExtensions()
			}
		}
		resolver = module.NewResolver(options)
	} else {
		resolver = module.NewResolver(module.ResolverOptions{
			Host:            s,
			CompilerOptions: data.compilerOptions,
		})
	}
	if data.resolveModuleNameCallback != "" {
		resolver = &callbackModuleResolver{
			registration:               data,
			conn:                       s.conn,
			ctx:                        ctx,
			currentDirectory:           s.GetCurrentDirectory(),
			caseSensitivity:            s.caseSensitivity(),
			snapshot:                   snapshot,
			programResolutionContextID: inProgressSnapshot,
			fallbackResolver:           resolver,
		}
	}
	if data.resolutions != nil {
		resolver = module.NewStaticResolver(resolver, data.resolutions)
	}
	return resolver, nil
}
