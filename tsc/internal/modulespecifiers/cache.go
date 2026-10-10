package modulespecifiers

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// GenerationCache holds results that a host reuses across module specifier generation. Finding the
// subpath that a package.json "exports" map assigns to a file, and resolving the patterns of a "paths"
// or "typesVersions" table, each scan a whole table, and the same table is consulted once per file that
// needs a specifier, so hosts that generate many specifiers keep one of these. Entries are keyed by the
// table they were derived from and the compiler options, so neither a re-read package.json nor a
// different set of options is served stale results. The zero value is ready to use and safe for
// concurrent use.
type GenerationCache struct {
	exports      collections.SyncMap[packageExportsSpecifierKey, tspath.ModuleSpecifier]
	pathPatterns collections.SyncMap[pathPatternsKey, []pathPattern]
}

type packageExportsSpecifierKey struct {
	options          *core.CompilerOptions // conditions, custom conditions, and output extensions
	packageJson      *packagejson.PackageJson
	packageDirectory tspath.RootedDirectoryPath
	packageName      string
	targetFileName   tspath.RootedFilePath
	mode             core.ResolutionMode
}

// getModuleNameFromExports returns the specifier under which packageJson's "exports" map publishes
// targetFileName, or "" when it is not exported, consulting the host's cache when it has one.
func getModuleNameFromExports(
	options *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	targetFileName tspath.RootedFilePath,
	packageDirectory tspath.RootedDirectoryPath,
	packageName string,
	packageJson *packagejson.PackageJson,
	mode core.ResolutionMode,
) tspath.ModuleSpecifier {
	cache := host.ModuleSpecifierGenerationCache()
	if cache == nil {
		return tryGetModuleNameFromExports(options, host, targetFileName, packageDirectory, packageName, packageJson.Fields.Exports, module.GetConditions(options, mode))
	}
	key := packageExportsSpecifierKey{
		options:          options,
		packageJson:      packageJson,
		packageDirectory: packageDirectory,
		packageName:      packageName,
		targetFileName:   targetFileName,
		mode:             mode,
	}
	if specifier, ok := cache.exports.Load(key); ok {
		return specifier
	}
	specifier := tryGetModuleNameFromExports(options, host, targetFileName, packageDirectory, packageName, packageJson.Fields.Exports, module.GetConditions(options, mode))
	cache.exports.Store(key, specifier)
	return specifier
}

type pathPatternsKey struct {
	paths         *collections.OrderedMap[string, []string]
	baseDirectory tspath.RootedDirectoryPath
}

// pathPattern is one pattern of a "paths" or "typesVersions" table, resolved against the table's base
// directory and split at its wildcard.
type pathPattern struct {
	key          string // the table key the pattern belongs to
	pattern      string
	prefix       string // the pattern before its "*", or the whole pattern when it has none
	suffix       string // the pattern after its "*"
	hasWildcard  bool
	hasExtension bool
}

// getPathPatterns returns the patterns of paths in table order, resolved against baseDirectory. They
// depend only on the table, so they are resolved once per host when the host keeps a cache. The cache
// is keyed by the table's identity, so paths must be a table that lives as long as its source: the
// compiler options' "paths", or the "typesVersions" table of a parsed package.json.
func getPathPatterns(host ModuleSpecifierGenerationHost, paths *collections.OrderedMap[string, []string], baseDirectory tspath.RootedDirectoryPath) []pathPattern {
	cache := host.ModuleSpecifierGenerationCache()
	if cache == nil {
		return resolvePathPatterns(paths, baseDirectory, host.CaseSensitivity())
	}
	key := pathPatternsKey{paths: paths, baseDirectory: baseDirectory}
	if patterns, ok := cache.pathPatterns.Load(key); ok {
		return patterns
	}
	patterns, _ := cache.pathPatterns.LoadOrStore(key, resolvePathPatterns(paths, baseDirectory, host.CaseSensitivity()))
	return patterns
}

func resolvePathPatterns(paths *collections.OrderedMap[string, []string], baseDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) []pathPattern {
	patterns := make([]pathPattern, 0, paths.Size())
	for key, values := range paths.Entries() {
		for _, patternText := range values {
			normalized := tspath.NormalizePath(patternText)
			pattern := resolvePathPatternIfInSameVolume(normalized, baseDirectory, caseSensitivity)
			if len(pattern) == 0 {
				pattern = normalized
			}
			prefix, suffix, hasWildcard := strings.Cut(pattern, "*")
			patterns = append(patterns, pathPattern{
				key:          key,
				pattern:      pattern,
				prefix:       prefix,
				suffix:       suffix,
				hasWildcard:  hasWildcard,
				hasExtension: len(tspath.TryGetExtensionFromPath(pattern)) > 0,
			})
		}
	}
	return patterns
}
