package modulespecifiers

import (
	"cmp"
	"fmt"
	"regexp"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type regexPatternCacheKey struct {
	pattern         string
	caseInsensitive bool
}

var (
	regexPatternCacheMu sync.RWMutex
	regexPatternCache   = make(map[regexPatternCacheKey]*regexp.Regexp)
)

func comparePathsByRedirect(a ModulePath, b ModulePath, caseSensitivity tspath.CaseSensitivity) int {
	// Redirects sort first, matching Strada's compareBooleans(b.isRedirect, a.isRedirect).
	if c := core.CompareBooleans(b.IsRedirect, a.IsRedirect); c != 0 {
		return c
	}
	if c := cmp.Compare(a.FileName.DirectorySeparatorCount(), b.FileName.DirectorySeparatorCount()); c != 0 {
		return c
	}
	// Strada relies on Map insertion order to break remaining ties deterministically;
	// Go maps are unordered, so compare paths to keep the ordering stable.
	return caseSensitivity.CompareFilePaths(a.FileName, b.FileName)
}

func PathIsBareSpecifier(path tspath.ModuleSpecifier) bool {
	return !path.IsAbsolute() && !path.IsRelative()
}

func IsExcludedByRegex(moduleSpecifier string, excludes []string) bool {
	for _, pattern := range excludes {
		re := stringToRegex(pattern)
		if re == nil {
			continue
		}
		if re.MatchString(moduleSpecifier) {
			return true
		}
	}
	return false
}

func stringToRegex(pattern string) *regexp.Regexp {
	caseInsensitive := false

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
						caseInsensitive = true
					}
				}
			}
		}
	}
	key := regexPatternCacheKey{pattern, caseInsensitive}

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

	compilePattern := pattern
	if caseInsensitive {
		compilePattern = "(?i:" + pattern + ")"
	}

	compiled, err := regexp.Compile(compilePattern)
	if err != nil {
		regexPatternCache[key] = nil
		return nil
	}
	regexPatternCache[key] = compiled
	return compiled
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

// TryGetRealFileNameForNonJSDeclarationFileName remaps files like `foo.d.json.ts` or
// `foo.module.d.css.ts` back to their real non-JS names.
func TryGetRealFileNameForNonJSDeclarationFileName(fileName string) string {
	baseName := tspath.GetBaseFileName(fileName)
	// Ends with .ts, contains ".d.", and is NOT a standard .d.ts file
	if !strings.HasSuffix(fileName, tspath.ExtensionTs) ||
		!strings.Contains(baseName, ".d.") ||
		strings.HasSuffix(baseName, tspath.ExtensionDts) {
		return ""
	}
	noExtension := tspath.RemoveExtension(fileName, tspath.ExtensionTs)
	lastDotIndex := strings.LastIndex(noExtension, ".")
	ext := noExtension[lastDotIndex:]
	before, _, _ := strings.Cut(noExtension, ".d.")
	return before + ext
}

func getJSExtensionForFile(fileName string, options *core.CompilerOptions) string {
	result := module.TryGetJSExtensionForFile(fileName, options)
	if len(result) == 0 {
		panic(fmt.Sprintf("Extension %s is unsupported:: FileName:: %s", extensionFromPath(fileName), fileName))
	}
	return result
}

func getJSExtensionForFileName(fileName tspath.RootedFilePath, options *core.CompilerOptions) string {
	result := module.TryGetJSExtensionForFileName(fileName, options)
	if len(result) == 0 {
		panic(fmt.Sprintf("Extension %s is unsupported:: FileName:: %s", fileName.Extension(), fileName))
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

func tryGetAnyFileFromPath(host ModuleSpecifierGenerationHost, path tspath.RootedFilePath) bool {
	// !!! TODO: shouldn't this use readdir instead of fileexists for perf?
	// We check all js, `node` and `json` extensions in addition to TS, since node module resolution would also choose those over the directory
	extGroups := tsoptions.GetSupportedExtensions(
		&core.CompilerOptions{
			AllowJs: core.TSTrue,
		},
		[]string{".node", ".json"},
	)
	for _, exts := range extGroups {
		for _, e := range exts {
			if host.FileExists(path.AppendSuffix(e)) {
				return true
			}
		}
	}
	return false
}

func getPathsRelativeToRootDirs(path tspath.RootedFilePath, rootDirs []tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) []tspath.RelativePath {
	var results []tspath.RelativePath
	for _, rootDir := range rootDirs {
		relativePath := getRelativePathIfInSameVolume(path, rootDir, caseSensitivity)
		if !isPathRelativeToParent(relativePath) {
			results = append(results, relativePath)
		}
	}
	return results
}

func isPathRelativeToParent(path tspath.RelativePath) bool {
	return path.IsParentRelative()
}

func getRelativePathIfInSameVolume(path tspath.RootedFilePath, directoryPath tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) tspath.RelativePath {
	relativePath, ok := caseSensitivity.RelativePathFromDirectory(directoryPath, path)
	if !ok {
		return ""
	}
	return relativePath
}

func resolvePathPatternIfInSameVolume(path string, directoryPath tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) string {
	relativePath := tspath.ResolveRelativePathToDirectoryOrUrl(
		directoryPath.AsString(),
		path,
		false,
		directoryPath,
		caseSensitivity,
	)

	if tspath.IsRootedDiskPath(relativePath) {
		return ""
	}
	return relativePath
}

func packageJsonPathsAreEqual(a tspath.RootedDirectoryPath, b tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) bool {
	if a == b {
		return true
	}
	if a == "" || b == "" {
		return false
	}
	return caseSensitivity.ComparePaths(a.AsPath(), b.AsPath()) == 0
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
	TopLevelNodeModulesSearchRoot tspath.RootedDirectoryPath
	TopLevelNodeModulesDirectory  tspath.RootedDirectoryPath
	PackageRootDirectory          tspath.RootedDirectoryPath
	PackageName                   string
	PackageRelativePath           tspath.RelativePath
	HasNestedNodeModules          bool
	IsDirectNodeModulesFile       bool
}

type nodeModulesPathParseState uint8

const (
	nodeModulesPathParseStateBeforeNodeModules nodeModulesPathParseState = iota
	nodeModulesPathParseStateNodeModules
	nodeModulesPathParseStateScope
	nodeModulesPathParseStatePackageContent
)

func GetNodeModulePathParts(fileName tspath.RootedFilePath) *NodeModulePathParts {
	fullPath := fileName.AsString()
	topLevelNodeModulesIndex := -1
	packageNameStart := -1
	packageRootIndex := -1
	hasNestedNodeModules := false
	partEnd := 0
	state := nodeModulesPathParseStateBeforeNodeModules

	for partEnd >= 0 {
		partStart := partEnd
		partEnd = core.IndexAfter(fullPath, "/", partStart+1)
		switch state {
		case nodeModulesPathParseStateBeforeNodeModules:
			if strings.HasPrefix(fullPath[partStart:], "/node_modules/") {
				topLevelNodeModulesIndex = partStart
				state = nodeModulesPathParseStateNodeModules
			}
		case nodeModulesPathParseStateNodeModules:
			packageNameStart = partStart + 1
			if packageNameStart >= len(fullPath) {
				return nil
			}
			if fullPath[packageNameStart] == '@' {
				state = nodeModulesPathParseStateScope
			} else {
				packageRootIndex = partEnd
				state = nodeModulesPathParseStatePackageContent
			}
		case nodeModulesPathParseStateScope:
			packageRootIndex = partEnd
			state = nodeModulesPathParseStatePackageContent
		case nodeModulesPathParseStatePackageContent:
			if strings.HasPrefix(fullPath[partStart:], "/node_modules/") {
				hasNestedNodeModules = true
				state = nodeModulesPathParseStateNodeModules
			}
		}
	}

	if topLevelNodeModulesIndex == -1 || packageNameStart == -1 {
		return nil
	}

	rootLength := fileName.RootLength()
	searchRootEnd := max(topLevelNodeModulesIndex, rootLength)
	topLevelNodeModulesSearchRoot := tspath.RootedDirectoryPathFromNormalized(fullPath[:searchRootEnd])
	topLevelNodeModulesDirectory := tspath.RootedDirectoryPathFromNormalized(
		fullPath[:topLevelNodeModulesIndex+len("/node_modules")],
	)
	if packageRootIndex == -1 {
		return &NodeModulePathParts{
			TopLevelNodeModulesSearchRoot: topLevelNodeModulesSearchRoot,
			TopLevelNodeModulesDirectory:  topLevelNodeModulesDirectory,
			PackageName:                   fullPath[packageNameStart:],
			HasNestedNodeModules:          hasNestedNodeModules,
			IsDirectNodeModulesFile:       true,
		}
	}
	packageRootDirectory := tspath.RootedDirectoryPathFromNormalized(fullPath[:packageRootIndex])
	return &NodeModulePathParts{
		TopLevelNodeModulesSearchRoot: topLevelNodeModulesSearchRoot,
		TopLevelNodeModulesDirectory:  topLevelNodeModulesDirectory,
		PackageRootDirectory:          packageRootDirectory,
		PackageName:                   fullPath[packageNameStart:packageRootIndex],
		PackageRelativePath:           tspath.RelativePathFromNormalized(fullPath[packageRootIndex+1:]),
		HasNestedNodeModules:          hasNestedNodeModules,
	}
}

func GetNodeModulesPackageName(
	compilerOptions *core.CompilerOptions,
	importingSourceFile *ast.SourceFile, // !!! | FutureSourceFile
	nodeModulesFileName tspath.RootedFilePath,
	host ModuleSpecifierGenerationHost,
	preferences UserPreferences,
	options ModuleSpecifierOptions,
) tspath.ModuleSpecifier {
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

func GetPackageNameFromDirectory(path tspath.RootedPath) string {
	fileOrDirectoryPath := path.AsString()
	idx := strings.LastIndex(fileOrDirectoryPath, "/node_modules/")
	if idx == -1 {
		return ""
	}

	basename := fileOrDirectoryPath[idx+len("/node_modules/"):]
	if basename[0] == '.' {
		return ""
	}

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
) tspath.ModuleSpecifier {
	specifier := entrypoint.ModuleSpecifier.AsString()
	if entrypoint.Ending == module.EndingFixed {
		return entrypoint.ModuleSpecifier
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
			return tspath.ToModuleSpecifier(tspath.ChangeAnyExtension(specifier, jsExtension, []string{dtsExtension}, tspath.CaseSensitive))
		case ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex:
			if entrypoint.Ending == module.EndingChangeable {
				// .d.mts/.d.cts must keep an extension; rewrite to .mjs/.cjs instead of dropping
				if dtsExtension == tspath.ExtensionDts {
					specifier = tspath.RemoveExtension(specifier, dtsExtension)
					if preferredEnding == ModuleSpecifierEndingMinimal {
						specifier = strings.TrimSuffix(specifier, "/index")
					}
					return tspath.ToModuleSpecifier(specifier)
				}
				jsExtension := GetJSExtensionForDeclarationFileExtension(dtsExtension)
				return tspath.ToModuleSpecifier(tspath.ChangeAnyExtension(specifier, jsExtension, []string{dtsExtension}, tspath.CaseSensitive))
			}
			// EndingExtensionChangeable - can only change extension, not remove it
			jsExtension := GetJSExtensionForDeclarationFileExtension(dtsExtension)
			return tspath.ToModuleSpecifier(tspath.ChangeAnyExtension(specifier, jsExtension, []string{dtsExtension}, tspath.CaseSensitive))
		}
		return tspath.ToModuleSpecifier(specifier)
	}

	// Handle .ts/.tsx/.mts/.cts extensions
	if tspath.FileExtensionIsOneOf(specifier, []string{tspath.ExtensionTs, tspath.ExtensionTsx, tspath.ExtensionMts, tspath.ExtensionCts}) {
		switch preferredEnding {
		case ModuleSpecifierEndingTsExtension:
			return tspath.ToModuleSpecifier(specifier)
		case ModuleSpecifierEndingJsExtension:
			if jsExtension := module.TryGetJSExtensionForFile(specifier, options); jsExtension != "" {
				return tspath.ToModuleSpecifier(tspath.RemoveFileExtension(specifier) + jsExtension)
			}
			return tspath.ToModuleSpecifier(specifier)
		case ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex:
			if entrypoint.Ending == module.EndingChangeable {
				specifier = tspath.RemoveFileExtension(specifier)
				if preferredEnding == ModuleSpecifierEndingMinimal {
					specifier = strings.TrimSuffix(specifier, "/index")
				}
				return tspath.ToModuleSpecifier(specifier)
			}
			// EndingExtensionChangeable - can only change extension, not remove it
			if jsExtension := module.TryGetJSExtensionForFile(specifier, options); jsExtension != "" {
				return tspath.ToModuleSpecifier(tspath.RemoveFileExtension(specifier) + jsExtension)
			}
			return tspath.ToModuleSpecifier(specifier)
		}
		return tspath.ToModuleSpecifier(specifier)
	}

	// Handle .js/.jsx/.mjs/.cjs extensions
	if tspath.FileExtensionIsOneOf(specifier, []string{tspath.ExtensionJs, tspath.ExtensionJsx, tspath.ExtensionMjs, tspath.ExtensionCjs}) {
		switch preferredEnding {
		case ModuleSpecifierEndingTsExtension, ModuleSpecifierEndingJsExtension:
			return tspath.ToModuleSpecifier(specifier)
		case ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex:
			if entrypoint.Ending == module.EndingChangeable {
				specifier = tspath.RemoveFileExtension(specifier)
				if preferredEnding == ModuleSpecifierEndingMinimal {
					specifier = strings.TrimSuffix(specifier, "/index")
				}
				return tspath.ToModuleSpecifier(specifier)
			}
			// EndingExtensionChangeable - keep the extension
			return tspath.ToModuleSpecifier(specifier)
		}
		return tspath.ToModuleSpecifier(specifier)
	}

	// For other extensions (like .json), return as-is
	return tspath.ToModuleSpecifier(specifier)
}
