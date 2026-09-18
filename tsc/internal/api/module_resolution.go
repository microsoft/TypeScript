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
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type moduleResolutionMatchKey struct {
	moduleName   string
	directory    tspath.Path
	mode         core.ResolutionMode
	hasDirectory bool
	hasMode      bool
}

type providedModuleResolutions struct {
	useCaseSensitiveFileNames bool
	fallbackToResolution      bool
	entries                   map[moduleResolutionMatchKey]*module.ResolvedModule
	currentDirectory          string
}

type moduleResolutionProviderFactory struct {
	registration     *moduleResolverRegistration
	session          *Session
	conn             ipc.Conn
	ctx              context.Context
	currentDirectory string
}

func (f *moduleResolutionProviderFactory) Identity() uint64 {
	return uint64(f.registration.id)
}

func (f *moduleResolutionProviderFactory) CompilerOptions() *core.CompilerOptions {
	return f.registration.compilerOptions
}

type moduleResolutionProvider struct {
	registration       *moduleResolverRegistration
	conn               ipc.Conn
	ctx                context.Context
	currentDirectory   string
	snapshot           SnapshotID
	inProgressSnapshot uint64
	fallbackResolver   *module.Resolver
}

func (f *moduleResolutionProviderFactory) NewProvider(fallback *module.Resolver) (module.ResolutionProvider, func()) {
	inProgressSnapshot := f.session.registerInProgressSnapshot(fallback)
	provider := &moduleResolutionProvider{
		registration:       f.registration,
		conn:               f.conn,
		ctx:                f.ctx,
		currentDirectory:   f.currentDirectory,
		inProgressSnapshot: inProgressSnapshot,
		fallbackResolver:   fallback,
	}
	return provider, func() {
		f.session.releaseInProgressSnapshot(inProgressSnapshot)
	}
}

func (p *moduleResolutionProvider) ResolveModuleName(
	moduleName string,
	containingDirectory string,
	resolutionMode core.ResolutionMode,
) (*module.ResolvedModule, []module.DiagAndArgs, error) {
	registration := p.registration
	if registration.resolutions != nil {
		if result, found := registration.resolutions.lookup(moduleName, containingDirectory, resolutionMode); found {
			return result, nil, nil
		}
		if !registration.resolutions.fallbackToResolution {
			return nil, nil, nil
		}
	}
	if registration.resolveModuleNameCallback == "" {
		result, trace := p.fallbackResolver.ResolveModuleNameFromDirectory(moduleName, containingDirectory, resolutionMode)
		return result, trace, nil
	}
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
	callbackResult, err := p.conn.Call(p.ctx, registration.resolveModuleNameCallback, params)
	if err != nil {
		return nil, nil, fmt.Errorf("resolveModuleName callback failed: %w", err)
	}

	if len(callbackResult) == 0 || string(callbackResult) == "null" {
		return nil, nil, nil
	}
	var providedResolution ProvidedModuleResolution
	if err := json.Unmarshal(callbackResult, &providedResolution); err != nil {
		return nil, nil, fmt.Errorf("invalid resolveModuleName callback result: %w", err)
	}
	return providedModuleResolutionToResolvedModule(&providedResolution, p.currentDirectory), nil, nil
}

func (p *providedModuleResolutions) lookup(moduleName string, containingDirectory string, resolutionMode core.ResolutionMode) (*module.ResolvedModule, bool) {
	directory := tspath.ToPath(containingDirectory, p.currentDirectory, p.useCaseSensitiveFileNames)
	keys := [...]moduleResolutionMatchKey{
		{moduleName: moduleName, directory: directory, mode: resolutionMode, hasDirectory: true, hasMode: true},
		{moduleName: moduleName, directory: directory, hasDirectory: true},
		{moduleName: moduleName, mode: resolutionMode, hasMode: true},
		{moduleName: moduleName},
	}
	for _, key := range keys {
		if result, ok := p.entries[key]; ok {
			return result, true
		}
	}
	return nil, false
}

func compileModuleResolutionSpec(spec *ModuleResolutionSpec, currentDirectory string, useCaseSensitive bool) (*providedModuleResolutions, error) {
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

	provider := &providedModuleResolutions{
		fallbackToResolution:      fallbackToResolution,
		entries:                   make(map[moduleResolutionMatchKey]*module.ResolvedModule, len(spec.Entries)),
		currentDirectory:          currentDirectory,
		useCaseSensitiveFileNames: useCaseSensitive,
	}
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

		key := moduleResolutionMatchKey{moduleName: entry.ModuleName}
		if entry.ContainingDirectory != nil {
			directory := tspath.GetNormalizedAbsolutePath(entry.ContainingDirectory.ToAbsoluteFileName(currentDirectory), currentDirectory)
			key.directory = tspath.ToPath(directory, currentDirectory, useCaseSensitive)
			key.hasDirectory = true
		}
		if entry.ResolutionMode != nil {
			mode := core.ModuleKind(*entry.ResolutionMode)
			if mode != core.ModuleKindNone && mode != core.ModuleKindCommonJS && mode != core.ModuleKindESNext {
				return nil, fmt.Errorf("%w: module resolution entry %d has invalid resolutionMode %s", ErrClientError, i, mode.String())
			}
			key.mode = mode
			key.hasMode = true
		}
		if _, exists := provider.entries[key]; exists {
			return nil, fmt.Errorf("%w: duplicate module resolution entry for %q", ErrClientError, entry.ModuleName)
		}

		provided := providedModuleResolutionToResolvedModule(entry.Result, currentDirectory)
		provider.entries[key] = provided
	}

	return provider, nil
}

func providedModuleResolutionToResolvedModule(provided *ProvidedModuleResolution, currentDirectory string) *module.ResolvedModule {
	if provided == nil || provided.ResolvedFileName == nil {
		return nil
	}
	result := &module.ResolvedModule{
		ResolvedFileName: tspath.GetNormalizedAbsolutePath(provided.ResolvedFileName.ToAbsoluteFileName(currentDirectory), currentDirectory),
	}
	if provided.OriginalPath != nil {
		result.OriginalPath = tspath.GetNormalizedAbsolutePath(provided.OriginalPath.ToAbsoluteFileName(currentDirectory), currentDirectory)
	}
	if provided.PackageID != nil {
		result.PackageId = module.PackageId{
			Name:             provided.PackageID.Name,
			SubModuleName:    provided.PackageID.SubModuleName,
			Version:          provided.PackageID.Version,
			PeerDependencies: provided.PackageID.PeerDependencies,
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

func (s *Session) moduleResolutionProviderFactory(ctx context.Context, options *CreateProgramOptions) (module.ResolutionProviderFactory, error) {
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
	return &moduleResolutionProviderFactory{
		registration:     data,
		session:          s,
		conn:             s.conn,
		ctx:              ctx,
		currentDirectory: s.GetCurrentDirectory(),
	}, nil
}

func (s *Session) registerInProgressSnapshot(resolver *module.Resolver) uint64 {
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

	var resolver *module.Resolver
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
	provider := &moduleResolutionProvider{
		registration:       data,
		conn:               s.conn,
		ctx:                ctx,
		currentDirectory:   s.GetCurrentDirectory(),
		snapshot:           params.Snapshot,
		inProgressSnapshot: params.InProgressSnapshot,
		fallbackResolver:   resolver,
	}
	result, trace, err := provider.ResolveModuleName(params.ModuleName, containingDirectory, mode)
	if err != nil {
		return nil, err
	}
	return &ResolveModuleNameResult{
		ResolvedModule: newResolvedModuleResponse(result),
		Trace:          moduleResolutionTraceToStrings(trace),
	}, nil
}
