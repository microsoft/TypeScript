package module

import (
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/packagejson"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type ModeAwareCache[T any] map[ModeAwareCacheKey]T

type caches struct {
	moduleNameCache                               *resolutionCache[*ResolvedModule]
	typeReferenceDirectiveCache                   *resolutionCache[*ResolvedTypeReferenceDirective]
	packageJsonInfoCache                          *packagejson.InfoCache
	resolvedTypeReferenceDirectiveLookupLocations map[*ResolvedTypeReferenceDirective]*LookupLocations
}

func newCaches(
	currentDirectory string,
	useCaseSensitiveFileNames bool,
	options *core.CompilerOptions,
) caches {
	optionsToRedirectsKey := make(map[*core.CompilerOptions]string)
	getOriginalOrResolvedModuleFileName := func(result *ResolvedModule) tspath.Path {
		if result.OriginalPath != "" {
			return tspath.ToPath(result.OriginalPath, currentDirectory, useCaseSensitiveFileNames)
		}
		return tspath.ToPath(result.ResolvedFileName, currentDirectory, useCaseSensitiveFileNames)
	}
	getOriginalOrResolvedTypeReferenceFileName := func(result *ResolvedTypeReferenceDirective) tspath.Path {
		if result.OriginalPath != "" {
			return tspath.ToPath(result.OriginalPath, currentDirectory, useCaseSensitiveFileNames)
		}
		return tspath.ToPath(result.ResolvedFileName, currentDirectory, useCaseSensitiveFileNames)
	}
	return caches{
		moduleNameCache:             newResolutionCache(currentDirectory, useCaseSensitiveFileNames, options, getOriginalOrResolvedModuleFileName, optionsToRedirectsKey, false /*isReadonly*/),
		typeReferenceDirectiveCache: newResolutionCache(currentDirectory, useCaseSensitiveFileNames, options, getOriginalOrResolvedTypeReferenceFileName, optionsToRedirectsKey, false /*isReadonly*/),
		packageJsonInfoCache:        packagejson.NewInfoCache(currentDirectory, useCaseSensitiveFileNames),
	}
}

type resolutionCache[T comparable] struct {
	perDirectoryResolutionCache[T]
	nonRelativeNameResolutionCache[T]
	mu              sync.RWMutex
	lookupLocations map[T]*LookupLocations
	isReadonly      bool
}

func newResolutionCache[T comparable](
	currentDirectory string,
	useCaseSensitiveFileNames bool,
	options *core.CompilerOptions,
	getResolvedFileName func(result T) tspath.Path,
	optionsToRedirectsKey map[*core.CompilerOptions]string,
	isReadonly bool,
) *resolutionCache[T] {
	return &resolutionCache[T]{
		perDirectoryResolutionCache:    newPerDirectoryResolutionCache[T](currentDirectory, useCaseSensitiveFileNames, options, optionsToRedirectsKey),
		nonRelativeNameResolutionCache: newNonRelativeNameResolutionCache[T](currentDirectory, useCaseSensitiveFileNames, options, getResolvedFileName, optionsToRedirectsKey),
		isReadonly:                     isReadonly,
	}
}

func (c *resolutionCache[T]) getLookupLocations(resolved T) *LookupLocations {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.lookupLocations[resolved]
}

func (c *resolutionCache[T]) initializeLookupLocations(resolved T, failedLookupLocations []string, affectingLocations []string, resolutionDiagnostics []ast.Diagnostic) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.lookupLocations == nil {
		c.lookupLocations = make(map[T]*LookupLocations)
	}
	c.lookupLocations[resolved] = &LookupLocations{
		FailedLookupLocations: failedLookupLocations,
		AffectingLocations:    affectingLocations,
		ResolutionDiagnostics: resolutionDiagnostics,
	}
}

func (c *resolutionCache[T]) updateLookupLocations(resolved T, failedLookupLocations []string, affectingLocations []string, resolutionDiagnostics []ast.Diagnostic) {
	c.mu.Lock()
	defer c.mu.Unlock()
	lookupLocations := c.lookupLocations[resolved]
	lookupLocations.FailedLookupLocations = slices.Concat(lookupLocations.FailedLookupLocations, failedLookupLocations)
	lookupLocations.AffectingLocations = slices.Concat(lookupLocations.AffectingLocations, affectingLocations)
	lookupLocations.ResolutionDiagnostics = slices.Concat(lookupLocations.ResolutionDiagnostics, resolutionDiagnostics)
}

type perDirectoryResolutionCache[T any] struct {
	mu                        sync.RWMutex
	currentDirectory          string
	useCaseSensitiveFileNames bool
	options                   *core.CompilerOptions
	directoryToModuleNameMap  *cacheWithRedirects[tspath.Path, ModeAwareCache[T]]
}

func newPerDirectoryResolutionCache[T any](
	currentDirectory string,
	useCaseSensitiveFileNames bool,
	options *core.CompilerOptions,
	optionsToRedirectsKey map[*core.CompilerOptions]string,
) perDirectoryResolutionCache[T] {
	return perDirectoryResolutionCache[T]{
		currentDirectory:          currentDirectory,
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
		options:                   options,
		directoryToModuleNameMap:  newCacheWithRedirects[tspath.Path, ModeAwareCache[T]](options, optionsToRedirectsKey),
	}
}

func (c *perDirectoryResolutionCache[T]) getFromDirectoryCache(nameAndMode ModeAwareCacheKey, directory string, redirectedReference *ResolvedProjectReference) (T, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	result, ok := c.directoryToModuleNameMap.getMapOfCacheRedirects(redirectedReference)[tspath.ToPath(directory, c.currentDirectory, c.useCaseSensitiveFileNames)][nameAndMode]
	return result, ok
}

func (c *perDirectoryResolutionCache[T]) setInDirectoryCache(nameAndMode ModeAwareCacheKey, directory string, value T, redirectedReference *ResolvedProjectReference) {
	cache := c.getOrCreateCacheForDirectory(directory, redirectedReference)
	c.mu.Lock()
	defer c.mu.Unlock()
	cache[nameAndMode] = value
}

func (c *perDirectoryResolutionCache[T]) getOrCreateCacheForDirectory(directory string, redirectedReference *ResolvedProjectReference) ModeAwareCache[T] {
	c.mu.RLock()
	cache := c.directoryToModuleNameMap.getOrCreateMapOfCacheRedirects(redirectedReference)
	key := tspath.ToPath(directory, c.currentDirectory, c.useCaseSensitiveFileNames)
	result, ok := cache[key]
	c.mu.RUnlock()
	if ok {
		return result
	}

	c.mu.Lock()
	defer c.mu.Unlock()
	result = make(ModeAwareCache[T])
	cache[key] = result
	return result
}

type nonRelativeNameResolutionCache[T any] struct {
	mu                        sync.RWMutex
	currentDirectory          string
	useCaseSensitiveFileNames bool
	options                   *core.CompilerOptions
	getResolvedFileName       func(result T) tspath.Path
	moduleNameToDirectoryMap  *cacheWithRedirects[ModeAwareCacheKey, *perNonRelativeNameCache[T]]
}

func newNonRelativeNameResolutionCache[T any](
	currentDirectory string,
	useCaseSensitiveFileNames bool,
	options *core.CompilerOptions,
	getResolvedFileName func(result T) tspath.Path,
	optionsToRedirectsKey map[*core.CompilerOptions]string,
) nonRelativeNameResolutionCache[T] {
	return nonRelativeNameResolutionCache[T]{
		currentDirectory:          currentDirectory,
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
		options:                   options,
		getResolvedFileName:       getResolvedFileName,
		moduleNameToDirectoryMap:  newCacheWithRedirects[ModeAwareCacheKey, *perNonRelativeNameCache[T]](options, optionsToRedirectsKey),
	}
}

func (c *nonRelativeNameResolutionCache[T]) getFromNonRelativeNameCache(nameAndMode ModeAwareCacheKey, directoryName string, redirectedReference *ResolvedProjectReference) (T, bool) {
	if tspath.IsExternalModuleNameRelative(nameAndMode.name) {
		panic("module name must be non-relative")
	}
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.moduleNameToDirectoryMap.getMapOfCacheRedirects(redirectedReference)[nameAndMode].get(tspath.ToPath(directoryName, c.currentDirectory, c.useCaseSensitiveFileNames))
}

func (c *nonRelativeNameResolutionCache[T]) setInNonRelativeNameCache(nameAndMode ModeAwareCacheKey, directoryName string, value T, redirectedReference *ResolvedProjectReference) {
	if tspath.IsExternalModuleNameRelative(nameAndMode.name) {
		panic("module name must be non-relative")
	}
	cache := c.getOrCreateCacheForNonRelativeName(nameAndMode, redirectedReference)
	c.mu.Lock()
	defer c.mu.Unlock()
	cache.set(tspath.ToPath(directoryName, c.currentDirectory, c.useCaseSensitiveFileNames), value, c.getResolvedFileName)
}

func (c *nonRelativeNameResolutionCache[T]) getOrCreateCacheForNonRelativeName(nameAndMode ModeAwareCacheKey, redirectedReference *ResolvedProjectReference) *perNonRelativeNameCache[T] {
	if tspath.IsExternalModuleNameRelative(nameAndMode.name) {
		panic("module name must be non-relative")
	}
	c.mu.RLock()
	cache := c.moduleNameToDirectoryMap.getOrCreateMapOfCacheRedirects(redirectedReference)
	result, ok := cache[nameAndMode]
	c.mu.RUnlock()
	if ok {
		return result
	}

	c.mu.Lock()
	defer c.mu.Unlock()
	result = &perNonRelativeNameCache[T]{}
	cache[nameAndMode] = result
	return result
}

type perNonRelativeNameCache[T any] struct {
	directoryPathMap map[tspath.Path]T
}

func (c *perNonRelativeNameCache[T]) get(directory tspath.Path) (result T, ok bool) {
	if c == nil {
		return result, ok
	}
	result, ok = c.directoryPathMap[directory]
	return result, ok
}

// At first this function add entry directory -> module resolution result to the table.
// Then it computes the set of parent folders for 'directory' that should have the same module resolution result
// and for every parent folder in set it adds entry: parent -> module resolution. .
// Lets say we first directory name: `/a/b/c/d/e` and resolution result is: `/a/b/bar.ts`.
// Set of parent folders that should have the same result will be:
//
//	[
//	  /a/b/c/d, /a/b/c, /a/b
//	]
//
// this means that request for module resolution from file in any of these folder will be immediately found in cache.
func (c *perNonRelativeNameCache[T]) set(directory tspath.Path, value T, getResolvedFileName func(result T) tspath.Path) {
	// if entry is already in cache do nothing
	if _, ok := c.directoryPathMap[directory]; ok {
		return
	}
	if c.directoryPathMap == nil {
		c.directoryPathMap = make(map[tspath.Path]T)
	}
	c.directoryPathMap[directory] = value
	resolvedFileName := getResolvedFileName(value)
	// find common prefix between directory and resolved file name
	// this common prefix should be the shortest path that has the same resolution
	// directory: /a/b/c/d/e
	// resolvedFileName: /a/b/foo.d.ts
	// commonPrefix: /a/b
	// for failed lookups cache the result for every directory up to root
	commonPrefix := getCommonPrefix(directory, resolvedFileName)
	current := directory
	for current != commonPrefix {
		parent := current.GetDirectoryPath()
		if parent == current {
			break
		}
		if _, ok := c.directoryPathMap[parent]; ok {
			break
		}
		c.directoryPathMap[parent] = value
		current = parent
	}
}

type cacheWithRedirects[K comparable, V any] struct {
	redirectsMap          map[*core.CompilerOptions]map[K]V
	redirectsKeyToMap     map[string]map[K]V
	optionsToRedirectsKey map[*core.CompilerOptions]string
	ownOptions            *core.CompilerOptions
	ownMap                map[K]V
}

func newCacheWithRedirects[K comparable, V any](ownOptions *core.CompilerOptions, optionsToRedirectsKey map[*core.CompilerOptions]string) *cacheWithRedirects[K, V] {
	cache := &cacheWithRedirects[K, V]{
		redirectsMap:          make(map[*core.CompilerOptions]map[K]V),
		redirectsKeyToMap:     make(map[string]map[K]V),
		optionsToRedirectsKey: optionsToRedirectsKey,
		ownOptions:            ownOptions,
		ownMap:                make(map[K]V),
	}
	if ownOptions != nil {
		cache.redirectsMap[ownOptions] = cache.ownMap
	}
	return cache
}

func (c *cacheWithRedirects[K, V]) getMapOfCacheRedirects(redirectedReference *ResolvedProjectReference) map[K]V {
	if redirectedReference == nil {
		return c.ownMap
	}
	return c.getOrCreateMap(redirectedReference.CommandLine.Options, false /*create*/)
}

func (c *cacheWithRedirects[K, V]) getOrCreateMapOfCacheRedirects(redirectedReference *ResolvedProjectReference) map[K]V {
	if redirectedReference == nil {
		return c.ownMap
	}
	return c.getOrCreateMap(redirectedReference.CommandLine.Options, true /*create*/)
}

func (c *cacheWithRedirects[K, V]) getOrCreateMap(redirectOptions *core.CompilerOptions, create bool) map[K]V {
	if result, ok := c.redirectsMap[redirectOptions]; ok {
		return result
	}
	key := c.getRedirectsCacheKey(redirectOptions)
	var result map[K]V
	if result = c.redirectsKeyToMap[key]; result == nil {
		if c.ownOptions != nil {
			ownKey := c.getRedirectsCacheKey(c.ownOptions)
			if ownKey == key {
				result = c.ownMap
			} else if _, ok := c.redirectsKeyToMap[ownKey]; !ok {
				c.redirectsKeyToMap[ownKey] = c.ownMap
			}
		}
		if result == nil && create {
			result = make(map[K]V)
		}
		if result != nil {
			c.redirectsKeyToMap[key] = result
		}
	}
	if result != nil {
		c.redirectsMap[redirectOptions] = result
	}
	return result
}

func (c *cacheWithRedirects[K, V]) getRedirectsCacheKey(options *core.CompilerOptions) string {
	if key, ok := c.optionsToRedirectsKey[options]; ok {
		return key
	}
	result := getModuleResolutionAffectingOptionsKey(options)
	c.optionsToRedirectsKey[options] = result
	return result
}

func getModuleResolutionAffectingOptionsKey(options *core.CompilerOptions) string {
	// !!! TODO(andrewbranch) Real implementation depends on command line parser
	return string(options.ModuleResolution)
}

func getCommonPrefix(directory tspath.Path, resolution tspath.Path) tspath.Path {
	if resolution == "" {
		return resolution
	}
	resolutionDirectory := resolution.GetDirectoryPath()

	// find first position where directory and resolution differs
	i := 0
	limit := min(len(directory), len(resolutionDirectory))
	for i < limit && directory[i] == resolutionDirectory[i] {
		i++
	}
	if i == len(directory) && (len(resolutionDirectory) == i || resolutionDirectory[i] == '/') {
		return directory
	}
	rootLength := tspath.GetRootLength(string(directory))
	if i < rootLength {
		return tspath.Path("")
	}
	sep := strings.LastIndexByte(string(directory[:i]), '/')
	if sep == -1 {
		return tspath.Path("")
	}
	return directory[:max(sep, rootLength)]
}
