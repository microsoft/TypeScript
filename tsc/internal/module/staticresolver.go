package module

import (
	"errors"
	"fmt"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type StaticResolutionEntry struct {
	ModuleName          string
	ContainingDirectory string
	ResolutionMode      *core.ResolutionMode
	Result              *ResolvedModule
}

type staticResolutionKey struct {
	moduleName   string
	directory    tspath.Path
	mode         core.ResolutionMode
	hasDirectory bool
	hasMode      bool
}

type StaticResolutions struct {
	fallbackToResolver        bool
	entries                   map[staticResolutionKey]*ResolvedModule
	currentDirectory          string
	useCaseSensitiveFileNames bool
}

func NewStaticResolutions(
	entries []StaticResolutionEntry,
	fallbackToResolver bool,
	currentDirectory string,
	useCaseSensitiveFileNames bool,
) (*StaticResolutions, error) {
	resolutions := &StaticResolutions{
		fallbackToResolver:        fallbackToResolver,
		entries:                   make(map[staticResolutionKey]*ResolvedModule, len(entries)),
		currentDirectory:          currentDirectory,
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
	}
	for _, entry := range entries {
		if entry.ModuleName == "" {
			return nil, errors.New("module name is empty")
		}
		key := staticResolutionKey{moduleName: entry.ModuleName}
		if entry.ContainingDirectory != "" {
			key.directory = tspath.ToPath(entry.ContainingDirectory, currentDirectory, useCaseSensitiveFileNames)
			key.hasDirectory = true
		}
		if entry.ResolutionMode != nil {
			key.mode = *entry.ResolutionMode
			key.hasMode = true
		}
		if _, exists := resolutions.entries[key]; exists {
			return nil, fmt.Errorf("duplicate static module resolution for %q", entry.ModuleName)
		}
		resolutions.entries[key] = entry.Result
	}
	return resolutions, nil
}

func (r *StaticResolutions) lookup(moduleName string, containingDirectory string, resolutionMode core.ResolutionMode) (*ResolvedModule, bool) {
	directory := tspath.ToPath(containingDirectory, r.currentDirectory, r.useCaseSensitiveFileNames)
	keys := [...]staticResolutionKey{
		{moduleName: moduleName, directory: directory, mode: resolutionMode, hasDirectory: true, hasMode: true},
		{moduleName: moduleName, directory: directory, hasDirectory: true},
		{moduleName: moduleName, mode: resolutionMode, hasMode: true},
		{moduleName: moduleName},
	}
	for _, key := range keys {
		if result, ok := r.entries[key]; ok {
			return result, true
		}
	}
	return nil, false
}

type StaticResolver struct {
	fallback    Resolver
	resolutions *StaticResolutions
}

func NewStaticResolver(fallback Resolver, resolutions *StaticResolutions) *StaticResolver {
	return &StaticResolver{fallback: fallback, resolutions: resolutions}
}

func (r *StaticResolver) ResolveModuleName(
	moduleName string,
	containingFile string,
	resolutionMode core.ResolutionMode,
	redirectedReference ResolvedProjectReference,
) (*ResolvedModule, []DiagAndArgs, error) {
	return r.resolveModuleName(moduleName, containingFile, tspath.GetDirectoryPath(containingFile), resolutionMode, redirectedReference)
}

func (r *StaticResolver) ResolveModuleNameFromDirectory(
	moduleName string,
	containingDirectory string,
	resolutionMode core.ResolutionMode,
) (*ResolvedModule, []DiagAndArgs, error) {
	if result, found := r.resolutions.lookup(moduleName, containingDirectory, resolutionMode); found {
		return result, nil, nil
	}
	if !r.resolutions.fallbackToResolver {
		return nil, nil, nil
	}
	return r.fallback.ResolveModuleNameFromDirectory(moduleName, containingDirectory, resolutionMode)
}

func (r *StaticResolver) resolveModuleName(
	moduleName string,
	containingFile string,
	containingDirectory string,
	resolutionMode core.ResolutionMode,
	redirectedReference ResolvedProjectReference,
) (*ResolvedModule, []DiagAndArgs, error) {
	if result, found := r.resolutions.lookup(moduleName, containingDirectory, resolutionMode); found {
		return result, nil, nil
	}
	if !r.resolutions.fallbackToResolver {
		return nil, nil, nil
	}
	return r.fallback.ResolveModuleName(moduleName, containingFile, resolutionMode, redirectedReference)
}

func (r *StaticResolver) ResolveTypeReferenceDirective(
	typeReferenceDirectiveName string,
	containingFile string,
	resolutionMode core.ResolutionMode,
	redirectedReference ResolvedProjectReference,
) (*ResolvedTypeReferenceDirective, []DiagAndArgs) {
	return r.fallback.ResolveTypeReferenceDirective(typeReferenceDirectiveName, containingFile, resolutionMode, redirectedReference)
}

func (r *StaticResolver) GetPackageScopeForPath(directory string) *packagejson.InfoCacheEntry {
	return r.fallback.GetPackageScopeForPath(directory)
}

func (r *StaticResolver) PackageJsonCacheEntries(f func(key tspath.Path, value *packagejson.InfoCacheEntry) bool) {
	r.fallback.PackageJsonCacheEntries(f)
}

func (r *StaticResolver) ResolvePackageDirectory(
	moduleName string,
	containingFile string,
	resolutionMode core.ResolutionMode,
	redirectedReference ResolvedProjectReference,
) *ResolvedModule {
	return r.fallback.ResolvePackageDirectory(moduleName, containingFile, resolutionMode, redirectedReference)
}
