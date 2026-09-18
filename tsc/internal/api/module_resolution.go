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
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type moduleResolutionMatchKey struct {
	moduleName   string
	directory    tspath.Path
	mode         core.ResolutionMode
	hasDirectory bool
	hasMode      bool
}

type providedModuleResolutions struct {
	identity             uint64
	fallbackToResolution bool
	entries              map[moduleResolutionMatchKey]*module.ResolvedModule
	currentDirectory     string
	useCaseSensitive     bool
}

type moduleResolutionProviderFactory struct {
	identity         uint64
	base             *providedModuleResolutions
	session          *Session
	conn             ipc.Conn
	ctx              context.Context
	callback         string
	currentDirectory string
}

func (f *moduleResolutionProviderFactory) Identity() uint64 {
	return f.identity
}

type moduleResolutionProvider struct {
	factory            *moduleResolutionProviderFactory
	inProgressSnapshot uint64
	fallbackResolver   *module.Resolver
}

func (f *moduleResolutionProviderFactory) NewProvider(fallback *module.Resolver) (module.ResolutionProvider, func()) {
	inProgressSnapshot := f.session.registerInProgressSnapshot(fallback)
	provider := &moduleResolutionProvider{
		factory:            f,
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
	f := p.factory
	if f.base != nil {
		if result, found := f.base.lookup(moduleName, containingDirectory, resolutionMode); found {
			return result, nil, nil
		}
		if !f.base.fallbackToResolution {
			return nil, nil, nil
		}
	}
	if f.callback == "" {
		result, trace := p.fallbackResolver.ResolveModuleNameFromDirectory(moduleName, containingDirectory, resolutionMode)
		return result, trace, nil
	}
	params := &ResolveModuleNameCallbackParams{
		ModuleName:          moduleName,
		ContainingDirectory: containingDirectory,
	}
	params.InProgressSnapshot = p.inProgressSnapshot
	mode := ResolutionMode(resolutionMode)
	params.ResolutionMode = &mode
	callbackResult, err := f.conn.Call(f.ctx, f.callback, params)
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
	return providedModuleResolutionToResolvedModule(&providedResolution, f.currentDirectory), nil, nil
}

func (p *providedModuleResolutions) lookup(moduleName string, containingDirectory string, resolutionMode core.ResolutionMode) (*module.ResolvedModule, bool) {
	directory := tspath.ToPath(containingDirectory, p.currentDirectory, p.useCaseSensitive)
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

func compileModuleResolutionSpec(spec *ModuleResolutionSpec, identity uint64, currentDirectory string, useCaseSensitive bool) (*providedModuleResolutions, error) {
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
		identity:             identity,
		fallbackToResolution: fallbackToResolution,
		entries:              make(map[moduleResolutionMatchKey]*module.ResolvedModule, len(spec.Entries)),
		currentDirectory:     currentDirectory,
		useCaseSensitive:     useCaseSensitive,
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
		identity:         uint64(options.ModuleResolver),
		base:             data.provider,
		session:          s,
		conn:             s.conn,
		ctx:              ctx,
		callback:         data.resolveModuleNameCallback,
		currentDirectory: s.currentDirectory(),
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
		s.nextModuleResolutionIdentity.Add(1),
		s.currentDirectory(),
		s.fileSystem().UseCaseSensitiveFileNames(),
	)
	if err != nil {
		return 0, err
	}
	id := ModuleResolverID(s.nextModuleResolverID.Add(1))
	data := &moduleResolverData{
		compilerOptions:           &params.CompilerOptions,
		provider:                  provider,
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

type liveModuleResolutionHost struct {
	fs  vfs.FS
	cwd string
}

func (h *liveModuleResolutionHost) FS() vfs.FS {
	return h.fs
}

func (h *liveModuleResolutionHost) GetCurrentDirectory() string {
	return h.cwd
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
	containingDirectory := tspath.GetNormalizedAbsolutePath(params.ContainingDirectory.ToAbsoluteFileName(s.currentDirectory()), s.currentDirectory())

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
		resolver = inProgressResolver.NewResolverForCompilerOptions(data.compilerOptions)
	} else if params.Snapshot != 0 {
		sd, err := s.getSnapshotData(params.Snapshot)
		if err != nil {
			return nil, err
		}
		resolver = module.NewResolver(sd.snapshot, data.compilerOptions, "", "", sd.snapshot.ContentMapperExtensions())
	} else {
		resolver = module.NewResolver(&liveModuleResolutionHost{fs: s.fileSystem(), cwd: s.currentDirectory()}, data.compilerOptions, "", "", nil)
	}
	factory := &moduleResolutionProviderFactory{
		identity:         uint64(params.Resolver),
		base:             data.provider,
		session:          s,
		conn:             s.conn,
		ctx:              ctx,
		callback:         data.resolveModuleNameCallback,
		currentDirectory: s.currentDirectory(),
	}
	provider, cleanup := factory.NewProvider(resolver)
	defer cleanup()
	result, trace, err := provider.ResolveModuleName(params.ModuleName, containingDirectory, mode)
	if err != nil {
		return nil, err
	}
	return &ResolveModuleNameResult{
		ResolvedModule: newResolvedModuleResponse(result),
		Trace:          moduleResolutionTraceToStrings(trace),
	}, nil
}
