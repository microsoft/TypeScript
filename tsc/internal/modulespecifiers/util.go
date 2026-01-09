package modulespecifiers

import (
	"fmt"
	"slices"
	"strings"
	"sync"

	"github.com/dlclark/regexp2"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type regexPatternCacheKey struct {
	pattern string
	opts    regexp2.RegexOptions
}

var (
	regexPatternCacheMu sync.RWMutex
	regexPatternCache   = make(map[regexPatternCacheKey]*regexp2.Regexp)
)

func comparePathsByRedirectAndNumberOfDirectorySeparators(a ModulePath, b ModulePath) int {
	if a.IsRedirect == b.IsRedirect {
		return strings.Count(a.FileName, "/") - strings.Count(b.FileName, "/")
	}
	if a.IsRedirect {
		return 1
	}
	return -1
}

func PathIsBareSpecifier(path string) bool {
	return !tspath.PathIsAbsolute(path) && !tspath.PathIsRelative(path)
}

func IsExcludedByRegex(moduleSpecifier string, excludes []string) bool {
	for _, pattern := range excludes {
		re := stringToRegex(pattern)
		if re == nil {
			continue
		}
		match, _ := re.MatchString(moduleSpecifier)
		if match {
			return true
		}
	}
	return false
}

func stringToRegex(pattern string) *regexp2.Regexp {
	options := regexp2.RegexOptions(regexp2.ECMAScript)

	if len(pattern) > 2 && pattern[0] == '/' {
		lastSlash := strings.LastIndex(pattern, "/")
		if lastSlash > 0 {
			hasUnescapedMiddleSlash := false
			for i := 1; i < lastSlash; i++ {
				if pattern[i] == '/' && (i == 0 || pattern[i-1] != '\\') {
					hasUnescapedMiddleSlash = true
					break
				}
			}

			if !hasUnescapedMiddleSlash {
				flags := pattern[lastSlash+1:]
				pattern = pattern[1:lastSlash]

				for _, flag := range flags {
					switch flag {
					case 'i':
						options |= regexp2.IgnoreCase
					case 'u':
						options |= regexp2.Unicode
					}
				}
			}
		}
	}
	key := regexPatternCacheKey{pattern, options}

	regexPatternCacheMu.RLock()
	re, ok := regexPatternCache[key]
	regexPatternCacheMu.RUnlock()
	if ok {
		return re
	}

	regexPatternCacheMu.Lock()
	defer regexPatternCacheMu.Unlock()

	re, ok = regexPatternCache[key]
	if ok {
		return re
	}

	if len(regexPatternCache) > 1000 {
		clear(regexPatternCache)
	}

	pattern = strings.Clone(pattern)
	key.pattern = pattern

	compiled, err := regexp2.Compile(pattern, options)
	if err != nil {
		regexPatternCache[key] = nil
		return nil
	}
	regexPatternCache[key] = compiled
	return compiled
}

/**
 * Ensures a path is either absolute (prefixed with `/` or `c:`) or dot-relative (prefixed
 * with `./` or `../`) so as not to be confused with an unprefixed module name.
 *
 * ```ts
 * ensurePathIsNonModuleName("/path/to/file.ext") === "/path/to/file.ext"
 * ensurePathIsNonModuleName("./path/to/file.ext") === "./path/to/file.ext"
 * ensurePathIsNonModuleName("../path/to/file.ext") === "../path/to/file.ext"
 * ensurePathIsNonModuleName("path/to/file.ext") === "./path/to/file.ext"
 * ```
 *
 */
func ensurePathIsNonModuleName(path string) string {
	if PathIsBareSpecifier(path) {
		return "./" + path
	}
	return path
}

func GetJSExtensionForDeclarationFileExtension(ext string) string {
	switch ext {
	case tspath.ExtensionDts:
		return tspath.ExtensionJs
	case tspath.ExtensionDmts:
		return tspath.ExtensionMjs
	case tspath.ExtensionDcts:
		return tspath.ExtensionCjs
	default:
		// .d.json.ts and the like
		return ext[len(".d") : len(ext)-len(tspath.ExtensionTs)]
	}
}

func getJSExtensionForFile(fileName string, options *core.CompilerOptions) string {
	result := module.TryGetJSExtensionForFile(fileName, options)
	if len(result) == 0 {
		panic(fmt.Sprintf("Extension %s is unsupported:: FileName:: %s", extensionFromPath(fileName), fileName))
	}
	return result
}

/**
 * Gets the extension from a path.
 * Path must have a valid extension.
 */
func extensionFromPath(path string) string {
	ext := tspath.TryGetExtensionFromPath(path)
	if len(ext) == 0 {
		panic(fmt.Sprintf("File %s has unknown extension.", path))
	}
	return ext
}

func tryGetAnyFileFromPath(host ModuleSpecifierGenerationHost, path string) bool {
	// !!! TODO: shouldn't this use readdir instead of fileexists for perf?
	// We check all js, `node` and `json` extensions in addition to TS, since node module resolution would also choose those over the directory
	extGroups := tsoptions.GetSupportedExtensions(
		&core.CompilerOptions{
			AllowJs: core.TSTrue,
		},
		[]tsoptions.FileExtensionInfo{
			{
				Extension:      "node",
				IsMixedContent: false,
				ScriptKind:     core.ScriptKindExternal,
			},
			{
				Extension:      "json",
				IsMixedContent: false,
				ScriptKind:     core.ScriptKindJSON,
			},
		},
	)
	for _, exts := range extGroups {
		for _, e := range exts {
			fullPath := path + e
			if host.FileExists(tspath.GetNormalizedAbsolutePath(fullPath, host.GetCurrentDirectory())) {
				return true
			}
		}
	}
	return false
}

func getPathsRelativeToRootDirs(path string, rootDirs []string, useCaseSensitiveFileNames bool) []string {
	var results []string
	for _, rootDir := range rootDirs {
		relativePath := getRelativePathIfInSameVolume(path, rootDir, useCaseSensitiveFileNames)
		if !isPathRelativeToParent(relativePath) {
			results = append(results, relativePath)
		}
	}
	return results
}

func isPathRelativeToParent(path string) bool {
	return strings.HasPrefix(path, "..")
}

func getRelativePathIfInSameVolume(path string, directoryPath string, useCaseSensitiveFileNames bool) string {
	relativePath := tspath.GetRelativePathToDirectoryOrUrl(directoryPath, path, false, tspath.ComparePathsOptions{
		UseCaseSensitiveFileNames: useCaseSensitiveFileNames,
		CurrentDirectory:          directoryPath,
	})
	if tspath.IsRootedDiskPath(relativePath) {
		return ""
	}
	return relativePath
}

func packageJsonPathsAreEqual(a string, b string, options tspath.ComparePathsOptions) bool {
	if a == b {
		return true
	}
	if len(a) == 0 || len(b) == 0 {
		return false
	}
	return tspath.ComparePaths(a, b, options) == 0
}

func prefersTsExtension(allowedEndings []ModuleSpecifierEnding) bool {
	jsPriority := slices.Index(allowedEndings, ModuleSpecifierEndingJsExtension)
	tsPriority := slices.Index(allowedEndings, ModuleSpecifierEndingTsExtension)
	if tsPriority > -1 {
		return tsPriority < jsPriority
	}
	return false
}

func replaceFirstStar(s string, replacement string) string {
	return strings.Replace(s, "*", replacement, 1)
}

type NodeModulePathParts struct {
	TopLevelNodeModulesIndex int
	TopLevelPackageNameIndex int
	PackageRootIndex         int
	FileNameIndex            int
}

type nodeModulesPathParseState uint8

const (
	nodeModulesPathParseStateBeforeNodeModules nodeModulesPathParseState = iota
	nodeModulesPathParseStateNodeModules
	nodeModulesPathParseStateScope
	nodeModulesPathParseStatePackageContent
)

func GetNodeModulePathParts(fullPath string) *NodeModulePathParts {
	// If fullPath can't be valid module file within node_modules, returns undefined.
	// Example of expected pattern: /base/path/node_modules/[@scope/otherpackage/@otherscope/node_modules/]package/[subdirectory/]file.js
	// Returns indices:                       ^            ^                                                      ^             ^

	topLevelNodeModulesIndex := 0
	topLevelPackageNameIndex := 0
	packageRootIndex := 0
	fileNameIndex := 0

	partStart := 0
	partEnd := 0
	state := nodeModulesPathParseStateBeforeNodeModules

	for partEnd >= 0 {
		partStart = partEnd
		partEnd = core.IndexAfter(fullPath, "/", partStart+1)
		switch state {
		case nodeModulesPathParseStateBeforeNodeModules:
			if strings.Index(fullPath[partStart:], "/node_modules/") == 0 {
				topLevelNodeModulesIndex = partStart
				topLevelPackageNameIndex = partEnd
				state = nodeModulesPathParseStateNodeModules
			}
		case nodeModulesPathParseStateNodeModules, nodeModulesPathParseStateScope:
			if state == nodeModulesPathParseStateNodeModules && fullPath[partStart+1] == '@' {
				state = nodeModulesPathParseStateScope
			} else {
				packageRootIndex = partEnd
				state = nodeModulesPathParseStatePackageContent
			}
		case nodeModulesPathParseStatePackageContent:
			if strings.Index(fullPath[partStart:], "/node_modules/") == 0 {
				state = nodeModulesPathParseStateNodeModules
			} else {
				state = nodeModulesPathParseStatePackageContent
			}
		}
	}

	fileNameIndex = partStart

	if state > nodeModulesPathParseStateNodeModules {
		return &NodeModulePathParts{
			TopLevelNodeModulesIndex: topLevelNodeModulesIndex,
			TopLevelPackageNameIndex: topLevelPackageNameIndex,
			PackageRootIndex:         packageRootIndex,
			FileNameIndex:            fileNameIndex,
		}
	}
	return nil
}

func GetNodeModulesPackageName(
	compilerOptions *core.CompilerOptions,
	importingSourceFile *ast.SourceFile, // !!! | FutureSourceFile
	nodeModulesFileName string,
	host ModuleSpecifierGenerationHost,
	preferences UserPreferences,
	options ModuleSpecifierOptions,
) string {
	info := getInfo(importingSourceFile.FileName(), host)
	modulePaths := getAllModulePaths(info, nodeModulesFileName, host, compilerOptions, preferences, options)
	for _, modulePath := range modulePaths {
		if result := tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, preferences, true /*packageNameOnly*/, options.OverrideImportMode); len(result) > 0 {
			return result
		}
	}
	return ""
}

func allKeysStartWithDot(obj *collections.OrderedMap[string, packagejson.ExportsOrImports]) bool {
	for k := range obj.Keys() {
		if !strings.HasPrefix(k, ".") {
			return false
		}
	}
	return true
}

func GetPackageNameFromDirectory(fileOrDirectoryPath string) string {
	idx := strings.LastIndex(fileOrDirectoryPath, "/node_modules/")
	if idx == -1 {
		return ""
	}

	basename := fileOrDirectoryPath[idx+len("/node_modules/"):]
	nextSlash := strings.Index(basename, "/")
	if nextSlash == -1 {
		return basename
	}

	if basename[0] != '@' || nextSlash == len(basename)-1 {
		return basename[:nextSlash]
	}

	secondSlash := strings.Index(basename[nextSlash+1:], "/")
	if secondSlash == -1 {
		return basename
	}

	return basename[:nextSlash+1+secondSlash]
}

// ProcessEntrypointEnding processes a pre-computed module specifier from a package.json exports
// entrypoint according to the entrypoint's Ending type and the user's preferred endings.
func ProcessEntrypointEnding(
	entrypoint *module.ResolvedEntrypoint,
	prefs UserPreferences,
	host ModuleSpecifierGenerationHost,
	options *core.CompilerOptions,
	importingSourceFile SourceFileForSpecifierGeneration,
	allowedEndings []ModuleSpecifierEnding,
) string {
	specifier := entrypoint.ModuleSpecifier
	if entrypoint.Ending == module.EndingFixed {
		return specifier
	}

	if len(allowedEndings) == 0 {
		allowedEndings = GetAllowedEndingsInPreferredOrder(
			prefs,
			host,
			options,
			importingSourceFile,
			"",
			host.GetDefaultResolutionModeForFile(importingSourceFile),
		)
	}

	preferredEnding := allowedEndings[0]

	// Handle declaration file extensions
	dtsExtension := tspath.GetDeclarationFileExtension(specifier)
	if dtsExtension != "" {
		switch preferredEnding {
		case ModuleSpecifierEndingTsExtension, ModuleSpecifierEndingJsExtension:
			// Map .d.ts -> .js, .d.mts -> .mjs, .d.cts -> .cjs
			jsExtension := GetJSExtensionForDeclarationFileExtension(dtsExtension)
			return tspath.ChangeAnyExtension(specifier, jsExtension, []string{dtsExtension}, false)
		case ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex:
			if entrypoint.Ending == module.EndingChangeable {
				// .d.mts/.d.cts must keep an extension; rewrite to .mjs/.cjs instead of dropping
				if dtsExtension == tspath.ExtensionDts {
					specifier = tspath.RemoveExtension(specifier, dtsExtension)
					if preferredEnding == ModuleSpecifierEndingMinimal {
						specifier = strings.TrimSuffix(specifier, "/index")
					}
					return specifier
				}
				jsExtension := GetJSExtensionForDeclarationFileExtension(dtsExtension)
				return tspath.ChangeAnyExtension(specifier, jsExtension, []string{dtsExtension}, false)
			}
			// EndingExtensionChangeable - can only change extension, not remove it
			jsExtension := GetJSExtensionForDeclarationFileExtension(dtsExtension)
			return tspath.ChangeAnyExtension(specifier, jsExtension, []string{dtsExtension}, false)
		}
		return specifier
	}

	// Handle .ts/.tsx/.mts/.cts extensions
	if tspath.FileExtensionIsOneOf(specifier, []string{tspath.ExtensionTs, tspath.ExtensionTsx, tspath.ExtensionMts, tspath.ExtensionCts}) {
		switch preferredEnding {
		case ModuleSpecifierEndingTsExtension:
			return specifier
		case ModuleSpecifierEndingJsExtension:
			if jsExtension := module.TryGetJSExtensionForFile(specifier, options); jsExtension != "" {
				return tspath.RemoveFileExtension(specifier) + jsExtension
			}
			return specifier
		case ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex:
			if entrypoint.Ending == module.EndingChangeable {
				specifier = tspath.RemoveFileExtension(specifier)
				if preferredEnding == ModuleSpecifierEndingMinimal {
					specifier = strings.TrimSuffix(specifier, "/index")
				}
				return specifier
			}
			// EndingExtensionChangeable - can only change extension, not remove it
			if jsExtension := module.TryGetJSExtensionForFile(specifier, options); jsExtension != "" {
				return tspath.RemoveFileExtension(specifier) + jsExtension
			}
			return specifier
		}
		return specifier
	}

	// Handle .js/.jsx/.mjs/.cjs extensions
	if tspath.FileExtensionIsOneOf(specifier, []string{tspath.ExtensionJs, tspath.ExtensionJsx, tspath.ExtensionMjs, tspath.ExtensionCjs}) {
		switch preferredEnding {
		case ModuleSpecifierEndingTsExtension, ModuleSpecifierEndingJsExtension:
			return specifier
		case ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex:
			if entrypoint.Ending == module.EndingChangeable {
				specifier = tspath.RemoveFileExtension(specifier)
				if preferredEnding == ModuleSpecifierEndingMinimal {
					specifier = strings.TrimSuffix(specifier, "/index")
				}
				return specifier
			}
			// EndingExtensionChangeable - keep the extension
			return specifier
		}
		return specifier
	}

	// For other extensions (like .json), return as-is
	return specifier
}
