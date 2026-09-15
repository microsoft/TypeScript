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
	_ func() *module.ResolvedModule,
) (*module.ResolvedModule, error) {
	if p.base != nil {
		if result, found := p.base.lookup(moduleName, containingDirectory, resolutionMode); found {
			return result, nil
		}
		if !p.base.fallbackToResolution {
			return nil, nil
		}
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
	externalPath := result.ResolvedFileName
	if result.OriginalPath != "" {
		externalPath = result.OriginalPath
	}
	result.Extension = tspath.TryGetExtensionFromPath(result.ResolvedFileName)
	result.ResolvedUsingTsExtension = tspath.IsExternalModuleNameRelative(moduleName) &&
		tspath.TryExtractTSExtension(moduleName) != ""
	result.ResolvedUsingExtraExtensions = !tspath.FileExtensionIsOneOf(result.ResolvedFileName, tspath.SupportedTSExtensionsWithJsonFlat) &&
		!tspath.FileExtensionIsOneOf(result.ResolvedFileName, tspath.SupportedJSExtensionsFlat)
	result.IsExternalLibraryImport = strings.Contains(externalPath, "/node_modules/")
	return result
}

func moduleResolutionTraceToStrings(trace []module.DiagAndArgs) []string {
	return core.Map(trace, func(entry module.DiagAndArgs) string {
		return entry.Message.Localize(locale.Default, entry.Args...)
	})
}

func (s *Session) resolveModuleResolutionSource(source *ModuleResolutionSource) (*providedModuleResolutions, error) {
	if source == nil {
		return nil, nil
	}
	if source.Spec != nil && source.Set != 0 {
		return nil, fmt.Errorf("%w: moduleResolutions cannot contain both spec and set", ErrClientError)
	}
	if source.Spec != nil {
		return compileModuleResolutionSpec(
			source.Spec,
			s.nextModuleResolutionIdentity.Add(1),
			s.currentDirectory(),
			s.fileSystem().UseCaseSensitiveFileNames(),
		)
	}
	if source.Set == 0 {
		return nil, fmt.Errorf("%w: moduleResolutions must contain spec or set", ErrClientError)
	}
	s.moduleResolutionSetsMu.RLock()
	provider := s.moduleResolutionSets[source.Set]
	s.moduleResolutionSetsMu.RUnlock()
	if provider == nil {
		return nil, fmt.Errorf("%w: module resolution set %d not found", ErrClientError, source.Set)
	}
	return provider, nil
}

func (s *Session) handleCreateModuleResolutionSet(params *CreateModuleResolutionSetParams) (ModuleResolutionSetID, error) {
	provider, err := compileModuleResolutionSpec(
		&params.Spec,
		s.nextModuleResolutionIdentity.Add(1),
		s.currentDirectory(),
		s.fileSystem().UseCaseSensitiveFileNames(),
	)
	if err != nil {
		return 0, err
	}
	id := ModuleResolutionSetID(s.nextModuleResolutionSetID.Add(1))
	s.moduleResolutionSetsMu.Lock()
	s.moduleResolutionSets[id] = provider
	s.moduleResolutionSetsMu.Unlock()
	return id, nil
}

func (s *Session) handleReleaseModuleResolutionSet(params *ReleaseModuleResolutionSetParams) (any, error) {
	if params.Set == 0 {
		return nil, fmt.Errorf("%w: empty module resolution set handle", ErrClientError)
	}
	s.moduleResolutionSetsMu.Lock()
	_, ok := s.moduleResolutionSets[params.Set]
	if ok {
		delete(s.moduleResolutionSets, params.Set)
	}
	s.moduleResolutionSetsMu.Unlock()
	if !ok {
		return nil, fmt.Errorf("%w: module resolution set %d not found", ErrClientError, params.Set)
	}
	return nil, nil
}

func (s *Session) handleCreateModuleResolver(params *CreateModuleResolverParams) (ModuleResolverID, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return 0, err
	}
	provider, err := s.resolveModuleResolutionSource(params.ModuleResolutions)
	if err != nil {
		return 0, err
	}
	id := ModuleResolverID(s.nextModuleResolverID.Add(1))
	data := &moduleResolverData{
		resolver:                  module.NewResolver(sd.snapshot, &params.CompilerOptions, "", "", sd.snapshot.ContentMapperExtensions()),
		provider:                  provider,
		resolveModuleNameCallback: params.ResolveModuleNameCallback,
	}
	sd.moduleResolversMu.Lock()
	if sd.moduleResolvers == nil {
		sd.moduleResolvers = make(map[ModuleResolverID]*moduleResolverData)
	}
	sd.moduleResolvers[id] = data
	sd.moduleResolversMu.Unlock()
	return id, nil
}

func (s *Session) handleResolveModuleName(ctx context.Context, params *ResolveModuleNameParams) (*ResolveModuleNameResult, error) {
	if params.ModuleName == "" {
		return nil, fmt.Errorf("%w: moduleName is empty", ErrClientError)
	}
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}
	sd.moduleResolversMu.RLock()
	data := sd.moduleResolvers[params.Resolver]
	sd.moduleResolversMu.RUnlock()
	if data == nil {
		return nil, fmt.Errorf("%w: module resolver %d not found in snapshot %d", ErrClientError, params.Resolver, params.Snapshot)
	}

	mode := core.ResolutionModeNone
	if params.ResolutionMode != nil {
		mode = core.ModuleKind(*params.ResolutionMode)
		if mode != core.ResolutionModeNone && mode != core.ResolutionModeCommonJS && mode != core.ResolutionModeESM {
			return nil, fmt.Errorf("%w: invalid resolutionMode %s", ErrClientError, mode.String())
		}
	}
	containingDirectory := tspath.GetNormalizedAbsolutePath(params.ContainingDirectory.ToAbsoluteFileName(s.currentDirectory()), s.currentDirectory())

	var result *module.ResolvedModule
	var trace []module.DiagAndArgs
	var provided bool
	if data.provider != nil {
		result, provided = data.provider.lookup(params.ModuleName, containingDirectory, mode)
	}
	if !provided && (data.provider == nil || data.provider.fallbackToResolution) {
		if data.resolveModuleNameCallback != "" {
			if s.conn == nil {
				return nil, fmt.Errorf("%w: API connection is not initialized", ErrClientError)
			}
			callbackParams := &ResolveModuleNameCallbackParams{
				ModuleName:          params.ModuleName,
				ContainingDirectory: containingDirectory,
			}
			if params.ResolutionMode != nil {
				callbackParams.ResolutionMode = params.ResolutionMode
			}
			callbackResult, err := s.conn.Call(ctx, data.resolveModuleNameCallback, callbackParams)
			if err != nil {
				return nil, fmt.Errorf("resolveModuleName callback failed: %w", err)
			}
			if len(callbackResult) != 0 && string(callbackResult) != "null" {
				var providedResolution ProvidedModuleResolution
				if err := json.Unmarshal(callbackResult, &providedResolution); err != nil {
					return nil, fmt.Errorf("invalid resolveModuleName callback result: %w", err)
				}
				result = providedModuleResolutionToResolvedModule(params.ModuleName, &providedResolution, s.currentDirectory())
			}
		} else {
			result, trace = data.resolver.ResolveModuleNameFromDirectory(params.ModuleName, containingDirectory, mode)
		}
	}
	return &ResolveModuleNameResult{
		ResolvedModule: newResolvedModuleResponse(result),
		Trace:          moduleResolutionTraceToStrings(trace),
	}, nil
}
