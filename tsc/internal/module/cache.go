package module

import (
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type ModeAwareCache[T any] map[ModeAwareCacheKey]T

type moduleResolutionCacheKey struct {
	containingDirectory tspath.RootedDirectoryPath
	moduleName          string
	resolutionMode      core.ResolutionMode
	redirectConfigName  tspath.RootedFilePath
}

type moduleResolutionCache struct {
	cache collections.SyncMap[moduleResolutionCacheKey, *ResolvedModule]
}

func (c *moduleResolutionCache) Get(key moduleResolutionCacheKey) (*ResolvedModule, bool) {
	return c.cache.Load(key)
}

func (c *moduleResolutionCache) Set(key moduleResolutionCacheKey, value *ResolvedModule) {
	c.cache.LoadOrStore(key, value)
}

type typeRefDirectiveResolutionCacheKey struct {
	containingDirectory             tspath.RootedDirectoryPath
	typeReferenceName               string
	resolutionMode                  core.ResolutionMode
	redirectConfigName              tspath.RootedFilePath
	fromInferredTypesContainingFile bool
}

type typeRefDirectiveResolutionCache struct {
	cache collections.SyncMap[typeRefDirectiveResolutionCacheKey, *ResolvedTypeReferenceDirective]
}

func (c *typeRefDirectiveResolutionCache) Get(key typeRefDirectiveResolutionCacheKey) (*ResolvedTypeReferenceDirective, bool) {
	return c.cache.Load(key)
}

func (c *typeRefDirectiveResolutionCache) Set(key typeRefDirectiveResolutionCacheKey, value *ResolvedTypeReferenceDirective) {
	c.cache.Store(key, value)
}

type parsedPatternsCache struct {
	cache collections.SyncMap[*collections.OrderedMap[string, []string], *ParsedPatterns]
}

func (c *parsedPatternsCache) Get(pathMappings *collections.OrderedMap[string, []string]) *ParsedPatterns {
	patterns, ok := c.cache.Load(pathMappings)
	if !ok {
		patterns, _ = c.cache.LoadOrStore(pathMappings, TryParsePatterns(pathMappings))
	}
	return patterns
}

type ResolutionData struct {
	compilerOptions *core.CompilerOptions
	typingsLocation tspath.RootedDirectoryPath
	projectName     string
	extraExtensions []string

	packageJsonInfoCache *packagejson.InfoCache
}

func newResolutionData(opts ResolverOptions) *ResolutionData {
	data := &ResolutionData{
		compilerOptions:      opts.CompilerOptions,
		typingsLocation:      opts.TypingsLocation,
		projectName:          opts.ProjectName,
		extraExtensions:      opts.ExtraExtensions,
		packageJsonInfoCache: opts.PackageJsonCache,
	}
	if data.packageJsonInfoCache == nil {
		data.packageJsonInfoCache = packagejson.NewInfoCache(opts.Host.FS().CaseSensitivity())
	}
	return data
}

// Clone copies the package-json cache table without copying its entries.
func (c *ResolutionData) Clone() *ResolutionData {
	return &ResolutionData{
		compilerOptions:      c.compilerOptions,
		typingsLocation:      c.typingsLocation,
		projectName:          c.projectName,
		extraExtensions:      c.extraExtensions,
		packageJsonInfoCache: c.packageJsonInfoCache.Clone(),
	}
}

func (c *ResolutionData) PackageJsonCacheEntries(f func(key tspath.PathKey, value *packagejson.InfoCacheEntry) bool) {
	c.packageJsonInfoCache.Range(f)
}

func getRedirectConfigName(redirect ResolvedProjectReference) tspath.RootedFilePath {
	if redirect == nil {
		return ""
	}
	return redirect.ConfigName()
}
