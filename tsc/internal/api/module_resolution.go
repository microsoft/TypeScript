package api

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type moduleResolverFactory struct {
	registration     *moduleResolverRegistration
	session          *Session
	conn             ipc.Conn
	ctx              context.Context
	currentDirectory string
}

func (f *moduleResolverFactory) CompilerOptions() *core.CompilerOptions {
	return f.registration.compilerOptions
}

type callbackModuleResolver struct {
	registration       *moduleResolverRegistration
	conn               ipc.Conn
	ctx                context.Context
	currentDirectory   string
	snapshot           SnapshotID
	inProgressSnapshot uint64
	fallbackResolver   module.Resolver
}

func (f *moduleResolverFactory) NewResolver(fallback module.Resolver) (module.Resolver, func()) {
	if f.registration.resolveModuleNameCallback == "" {
		if f.registration.resolutions != nil {
			fallback = module.NewStaticResolver(fallback, f.registration.resolutions)
		}
		return fallback, func() {}
	}
	inProgressSnapshot := f.session.registerInProgressSnapshot(fallback)
	var resolver module.Resolver = &callbackModuleResolver{
		registration:       f.registration,
		conn:               f.conn,
		ctx:                f.ctx,
		currentDirectory:   f.currentDirectory,
		inProgressSnapshot: inProgressSnapshot,
		fallbackResolver:   fallback,
	}
	if f.registration.resolutions != nil {
		resolver = module.NewStaticResolver(resolver, f.registration.resolutions)
	}
	return resolver, func() {
		f.session.releaseInProgressSnapshot(inProgressSnapshot)
	}
}

func (p *callbackModuleResolver) ResolveModuleName(
	moduleName string,
	containingFile string,
	resolutionMode core.ResolutionMode,
	redirectedReference module.ResolvedProjectReference,
) (*module.ResolvedModule, []module.DiagAndArgs, error) {
	return p.resolveModuleName(moduleName, containingFile, tspath.GetDirectoryPath(containingFile), resolutionMode, redirectedReference)
}

func (p *callbackModuleResolver) ResolveModuleNameFromDirectory(
	moduleName string,
	containingDirectory string,
	resolutionMode core.ResolutionMode,
) (*module.ResolvedModule, []module.DiagAndArgs, error) {
	return p.resolveModuleName(moduleName, containingDirectory, containingDirectory, resolutionMode, nil)
}

func (p *callbackModuleResolver) resolveModuleName(
	moduleName string,
	containingFile string,
	containingDirectory string,
	resolutionMode core.ResolutionMode,
	redirectedReference module.ResolvedProjectReference,
) (*module.ResolvedModule, []module.DiagAndArgs, error) {
	params := &ResolveModuleNameCallbackParams{
		ModuleName:          moduleName,
		ContainingDirectory: containingDirectory,
	}
	if p.snapshot != 0 {
		params.Snapshot = &p.snapshot
	}
	if p.inProgressSnapshot != 0 {
		params.InProgressSnapshot = &p.inProgressSnapshot
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
	return staticModuleResolutionToResolvedModule(&staticResolution, p.currentDirectory), nil, nil
}

func (p *callbackModuleResolver) ResolveTypeReferenceDirective(
	typeReferenceDirectiveName string,
	containingFile string,
	resolutionMode core.ResolutionMode,
	redirectedReference module.ResolvedProjectReference,
) (*module.ResolvedTypeReferenceDirective, []module.DiagAndArgs) {
	return p.fallbackResolver.ResolveTypeReferenceDirective(typeReferenceDirectiveName, containingFile, resolutionMode, redirectedReference)
}

func (p *callbackModuleResolver) GetPackageScopeForPath(directory string) *packagejson.InfoCacheEntry {
	return p.fallbackResolver.GetPackageScopeForPath(directory)
}

func (p *callbackModuleResolver) PackageJsonCacheEntries(f func(key tspath.Path, value *packagejson.InfoCacheEntry) bool) {
	p.fallbackResolver.PackageJsonCacheEntries(f)
}

func (p *callbackModuleResolver) ResolvePackageDirectory(
	moduleName string,
	containingFile string,
	resolutionMode core.ResolutionMode,
	redirectedReference module.ResolvedProjectReference,
) *module.ResolvedModule {
	return p.fallbackResolver.ResolvePackageDirectory(moduleName, containingFile, resolutionMode, redirectedReference)
}

func compileModuleResolutionSpec(spec *ModuleResolutionSpec, currentDirectory string, useCaseSensitive bool) (*module.StaticResolutions, error) {
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
			staticEntry.ContainingDirectory = tspath.GetNormalizedAbsolutePath(entry.ContainingDirectory.ToAbsoluteFileName(currentDirectory), currentDirectory)
		}
		if entry.ResolutionMode != nil {
			mode := core.ModuleKind(*entry.ResolutionMode)
			if mode != core.ModuleKindNone && mode != core.ModuleKindCommonJS && mode != core.ModuleKindESNext {
				return nil, fmt.Errorf("%w: module resolution entry %d has invalid resolutionMode %s", ErrClientError, i, mode.String())
			}
			staticEntry.ResolutionMode = &mode
		}
		staticEntry.Result = staticModuleResolutionToResolvedModule(entry.Result, currentDirectory)
		entries = append(entries, staticEntry)
	}

	resolutions, err := module.NewStaticResolutions(entries, fallbackToResolution, currentDirectory, useCaseSensitive)
	if err != nil {
		return nil, fmt.Errorf("%w: %w", ErrClientError, err)
	}
	return resolutions, nil
}

func staticModuleResolutionToResolvedModule(staticResolution *StaticModuleResolution, currentDirectory string) *module.ResolvedModule {
	if staticResolution == nil || staticResolution.ResolvedFileName == nil {
		return nil
	}
	result := &module.ResolvedModule{
		ResolvedFileName: tspath.GetNormalizedAbsolutePath(staticResolution.ResolvedFileName.ToAbsoluteFileName(currentDirectory), currentDirectory),
	}
	if staticResolution.OriginalPath != nil {
		result.OriginalPath = tspath.GetNormalizedAbsolutePath(staticResolution.OriginalPath.ToAbsoluteFileName(currentDirectory), currentDirectory)
	}
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
	result.Extension = tspath.TryGetExtensionFromPath(result.ResolvedFileName)
	result.IsExternalLibraryImport = strings.Contains(originalPath, "/node_modules/")
	return result
}

func moduleResolutionTraceToStrings(trace []module.DiagAndArgs) []string {
	return core.Map(trace, func(entry module.DiagAndArgs) string {
		return entry.Message.Localize(locale.Default, entry.Args...)
	})
}

func (s *Session) moduleResolverFactory(ctx context.Context, options *CreateProgramOptions) (project.ModuleResolverFactory, error) {
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
		ctx:              ctx,
		currentDirectory: s.GetCurrentDirectory(),
	}, nil
}

func (s *Session) registerInProgressSnapshot(resolver module.Resolver) uint64 {
	id := s.nextInProgressSnapshotHandle.Add(1)
	s.inProgressSnapshotsMu.Lock()
	s.inProgressSnapshots[id] = resolver
	s.inProgressSnapshotsMu.Unlock()
	return id
}

func (s *Session) releaseInProgressSnapshot(id uint64) {
	s.inProgressSnapshotsMu.Lock()
	delete(s.inProgressSnapshots, id)
	s.inProgressSnapshotsMu.Unlock()
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
		s.FS().UseCaseSensitiveFileNames(),
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
	s.moduleResolversMu.RLock()
	data := s.moduleResolvers[params.Resolver]
	s.moduleResolversMu.RUnlock()
	if data == nil {
		return nil, fmt.Errorf("%w: module resolver %d not found", ErrClientError, params.Resolver)
	}

	mode := core.ResolutionModeNone
	if params.ResolutionMode != nil {
		mode = core.ModuleKind(*params.ResolutionMode)
		if mode != core.ResolutionModeNone && mode != core.ResolutionModeCommonJS && mode != core.ResolutionModeESM {
			return nil, fmt.Errorf("%w: invalid resolutionMode %s", ErrClientError, mode.String())
		}
	}
	containingDirectory := tspath.GetNormalizedAbsolutePath(params.ContainingDirectory.ToAbsoluteFileName(s.GetCurrentDirectory()), s.GetCurrentDirectory())

	var resolver module.Resolver
	if params.Snapshot != 0 && params.InProgressSnapshot != 0 {
		return nil, fmt.Errorf("%w: snapshot and inProgressSnapshot are mutually exclusive", ErrClientError)
	}
	if params.InProgressSnapshot != 0 {
		s.inProgressSnapshotsMu.RLock()
		inProgressResolver := s.inProgressSnapshots[params.InProgressSnapshot]
		s.inProgressSnapshotsMu.RUnlock()
		if inProgressResolver == nil {
			return nil, fmt.Errorf("%w: in-progress snapshot %d not found", ErrClientError, params.InProgressSnapshot)
		}
		resolver = inProgressResolver
	} else if params.Snapshot != 0 {
		sd, err := s.getSnapshotData(params.Snapshot)
		if err != nil {
			return nil, err
		}
		resolver = module.NewResolver(sd.snapshot, data.compilerOptions, "", "", sd.snapshot.ContentMapperExtensions())
	} else {
		resolver = module.NewResolver(s, data.compilerOptions, "", "", nil)
	}
	if data.resolveModuleNameCallback != "" {
		resolver = &callbackModuleResolver{
			registration:       data,
			conn:               s.conn,
			ctx:                ctx,
			currentDirectory:   s.GetCurrentDirectory(),
			snapshot:           params.Snapshot,
			inProgressSnapshot: params.InProgressSnapshot,
			fallbackResolver:   resolver,
		}
	}
	if data.resolutions != nil {
		resolver = module.NewStaticResolver(resolver, data.resolutions)
	}
	result, trace, err := resolver.ResolveModuleNameFromDirectory(params.ModuleName, containingDirectory, mode)
	if err != nil {
		return nil, err
	}
	return &ResolveModuleNameResult{
		ResolvedModule: newResolvedModuleResponse(result),
		Trace:          moduleResolutionTraceToStrings(trace),
	}, nil
}
