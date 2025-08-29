package modulespecifiers

import (
	"fmt"
	"slices"
	"strings"

	"github.com/dlclark/regexp2"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/semver"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func isNonGlobalAmbientModule(node *ast.Node) bool {
	return ast.IsModuleDeclaration(node) && ast.IsStringLiteral(node.Name())
}

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

func isExcludedByRegex(moduleSpecifier string, excludes []string) bool {
	for _, pattern := range excludes {
		compiled, err := regexp2.Compile(pattern, regexp2.None)
		if err != nil {
			continue
		}
		match, _ := compiled.MatchString(moduleSpecifier)
		if match {
			return true
		}
	}
	return false
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

func getJsExtensionForDeclarationFileExtension(ext string) string {
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
	result := tryGetJSExtensionForFile(fileName, options)
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

func tryGetJSExtensionForFile(fileName string, options *core.CompilerOptions) string {
	ext := tspath.TryGetExtensionFromPath(fileName)
	switch ext {
	case tspath.ExtensionTs, tspath.ExtensionDts:
		return tspath.ExtensionJs
	case tspath.ExtensionTsx:
		if options.Jsx == core.JsxEmitPreserve {
			return tspath.ExtensionJsx
		}
		return tspath.ExtensionJs
	case tspath.ExtensionJs, tspath.ExtensionJsx, tspath.ExtensionJson:
		return ext
	case tspath.ExtensionDmts, tspath.ExtensionMts, tspath.ExtensionMjs:
		return tspath.ExtensionMjs
	case tspath.ExtensionDcts, tspath.ExtensionCts, tspath.ExtensionCjs:
		return tspath.ExtensionCjs
	default:
		return ""
	}
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
		if len(relativePath) > 0 && isPathRelativeToParent(relativePath) {
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

var typeScriptVersion = semver.MustParse(core.Version()) // TODO: unify with clone inside module resolver?

func isApplicableVersionedTypesKey(conditions []string, key string) bool {
	if !slices.Contains(conditions, "types") {
		return false // only apply versioned types conditions if the types condition is applied
	}
	if !strings.HasPrefix(key, "types@") {
		return false
	}
	range_, ok := semver.TryParseVersionRange(key[len("types@"):])
	if !ok {
		return false
	}
	return range_.Test(&typeScriptVersion)
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

func GetPackageNameFromTypesPackageName(mangledName string) string {
	withoutAtTypePrefix := strings.TrimPrefix(mangledName, "@types/")
	if withoutAtTypePrefix != mangledName {
		return module.UnmangleScopedPackageName(withoutAtTypePrefix)
	}
	return mangledName
}

func allKeysStartWithDot(obj *collections.OrderedMap[string, packagejson.ExportsOrImports]) bool {
	for k := range obj.Keys() {
		if !strings.HasPrefix(k, ".") {
			return false
		}
	}
	return true
}
