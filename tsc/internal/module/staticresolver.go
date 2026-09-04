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
	ContainingDirectory tspath.RootedDirectoryPath
	ResolutionMode      *core.ResolutionMode
	Result              *ResolvedModule
}

type staticResolutionKey struct {
	moduleName   string
	directory    tspath.PathKey
	mode         core.ResolutionMode
	hasDirectory bool
	hasMode      bool
}

type StaticResolutions struct {
	fallbackToResolver bool
	entries            map[staticResolutionKey]*ResolvedModule
	currentDirectory   tspath.RootedDirectoryPath
	caseSensitivity    tspath.CaseSensitivity
}

func NewStaticResolutions(
	entries []StaticResolutionEntry,
	fallbackToResolver bool,
	currentDirectory tspath.RootedDirectoryPath,
	caseSensitivity tspath.CaseSensitivity,
) (*StaticResolutions, error) {
	resolutions := &StaticResolutions{
		fallbackToResolver: fallbackToResolver,
		entries:            make(map[staticResolutionKey]*ResolvedModule, len(entries)),
		currentDirectory:   currentDirectory,
		caseSensitivity:    caseSensitivity,
	}
	for _, entry := range entries {
		if entry.ModuleName == "" {
			return nil, errors.New("module name is empty")
		}
		key := staticResolutionKey{moduleName: entry.ModuleName}
		if entry.ContainingDirectory != "" {
			key.directory = caseSensitivity.PathKey(entry.ContainingDirectory.AsPath())
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

func (r *StaticResolutions) lookup(moduleName string, containingDirectory tspath.RootedDirectoryPath, resolutionMode core.ResolutionMode) (*ResolvedModule, bool) {
	directory := r.caseSensitivity.PathKey(containingDirectory.AsPath())
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

func (r *StaticResolver) BaseDirectory() tspath.RootedDirectoryPath {
	return r.fallback.BaseDirectory()
}

func (r *StaticResolver) ResolveModuleName(
	moduleName string,
	containingFile tspath.RootedFilePath,
	resolutionMode core.ResolutionMode,
	redirectedReference ResolvedProjectReference,
) (*ResolvedModule, []DiagAndArgs, error) {
	return r.resolveModuleName(moduleName, containingFile, containingFile.Directory(), resolutionMode, redirectedReference)
}

func (r *StaticResolver) ResolveModuleNameFromDirectory(
	moduleName string,
	containingDirectory tspath.RootedDirectoryPath,
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
	containingFile tspath.RootedFilePath,
	containingDirectory tspath.RootedDirectoryPath,
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
	containingFile tspath.RootedFilePath,
	resolutionMode core.ResolutionMode,
	redirectedReference ResolvedProjectReference,
) (*ResolvedTypeReferenceDirective, []DiagAndArgs) {
	return r.fallback.ResolveTypeReferenceDirective(typeReferenceDirectiveName, containingFile, resolutionMode, redirectedReference)
}

func (r *StaticResolver) GetPackageScopeForPath(directory tspath.RootedDirectoryPath) *packagejson.InfoCacheEntry {
	return r.fallback.GetPackageScopeForPath(directory)
}

func (r *StaticResolver) PackageJsonCacheEntries(f func(key tspath.PathKey, value *packagejson.InfoCacheEntry) bool) {
	r.fallback.PackageJsonCacheEntries(f)
}

func (r *StaticResolver) ResolvePackageDirectory(
	moduleName string,
	containingFile tspath.RootedFilePath,
	resolutionMode core.ResolutionMode,
	redirectedReference ResolvedProjectReference,
) *ResolvedModule {
	return r.fallback.ResolvePackageDirectory(moduleName, containingFile, resolutionMode, redirectedReference)
}
