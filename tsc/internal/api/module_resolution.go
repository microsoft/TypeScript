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

type callbackModuleResolutionProvider struct {
	identity         uint64
	base             *providedModuleResolutions
	conn             ipc.Conn
	ctx              context.Context
	callback         string
	currentDirectory string
}

func (p *callbackModuleResolutionProvider) Identity() uint64 {
	return p.identity
}

func (p *callbackModuleResolutionProvider) ResolveModuleName(
	moduleName string,
	containingDirectory string,
	resolutionMode core.ResolutionMode,
	fallback func() *module.ResolvedModule,
) (*module.ResolvedModule, error) {
	if p.base != nil {
		if result, found := p.base.lookup(moduleName, containingDirectory, resolutionMode); found {
			return result, nil
		}
		if !p.base.fallbackToResolution {
			return nil, nil
		}
	}
	if p.callback == "" {
		return fallback(), nil
	}
	params := &ResolveModuleNameCallbackParams{
		ModuleName:          moduleName,
		ContainingDirectory: containingDirectory,
	}
	mode := ResolutionMode(resolutionMode)
	params.ResolutionMode = &mode
	callbackResult, err := p.conn.Call(p.ctx, p.callback, params)
	if err != nil {
		return nil, fmt.Errorf("resolveModuleName callback failed: %w", err)
	}
	if len(callbackResult) == 0 || string(callbackResult) == "null" {
		return nil, nil
	}
	var providedResolution ProvidedModuleResolution
	if err := json.Unmarshal(callbackResult, &providedResolution); err != nil {
		return nil, fmt.Errorf("invalid resolveModuleName callback result: %w", err)
	}
	return providedModuleResolutionToResolvedModule(moduleName, &providedResolution, p.currentDirectory), nil
}

func (p *providedModuleResolutions) Identity() uint64 {
	return p.identity
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

func (p *providedModuleResolutions) ResolveModuleName(
	moduleName string,
	containingDirectory string,
	resolutionMode core.ResolutionMode,
	fallback func() *module.ResolvedModule,
) (*module.ResolvedModule, error) {
	if result, found := p.lookup(moduleName, containingDirectory, resolutionMode); found {
		return result, nil
	}
	if p.fallbackToResolution {
		return fallback(), nil
	}
	return nil, nil
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

		provided := providedModuleResolutionToResolvedModule(entry.ModuleName, entry.Result, currentDirectory)
		provider.entries[key] = provided
	}

	return provider, nil
}

func providedModuleResolutionToResolvedModule(moduleName string, provided *ProvidedModuleResolution, currentDirectory string) *module.ResolvedModule {
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

func (s *Session) moduleResolutionProvider(ctx context.Context, options *CreateProgramOptions) (module.ResolutionProvider, error) {
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
	return &callbackModuleResolutionProvider{
		identity:         uint64(options.ModuleResolver),
		base:             data.provider,
		conn:             s.conn,
		ctx:              ctx,
		callback:         data.resolveModuleNameCallback,
		currentDirectory: s.currentDirectory(),
	}, nil
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

	var host module.ResolutionHost
	var extraExtensions []string
	if params.Snapshot != 0 {
		sd, err := s.getSnapshotData(params.Snapshot)
		if err != nil {
			return nil, err
		}
		host = sd.snapshot
		extraExtensions = sd.snapshot.ContentMapperExtensions()
	} else {
		host = &liveModuleResolutionHost{fs: s.fileSystem(), cwd: s.currentDirectory()}
	}
	resolver := module.NewResolver(host, data.compilerOptions, "", "", extraExtensions)
	var trace []module.DiagAndArgs
	behavior := &callbackModuleResolutionProvider{
		identity:         uint64(params.Resolver),
		base:             data.provider,
		conn:             s.conn,
		ctx:              ctx,
		callback:         data.resolveModuleNameCallback,
		currentDirectory: s.currentDirectory(),
	}
	result, err := behavior.ResolveModuleName(params.ModuleName, containingDirectory, mode, func() *module.ResolvedModule {
		result, resolutionTrace := resolver.ResolveModuleNameFromDirectory(params.ModuleName, containingDirectory, mode)
		trace = resolutionTrace
		return result
	})
	if err != nil {
		return nil, err
	}
	return &ResolveModuleNameResult{
		ResolvedModule: newResolvedModuleResponse(result),
		Trace:          moduleResolutionTraceToStrings(trace),
	}, nil
}
