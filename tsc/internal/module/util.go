package module

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/semver"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var typeScriptVersion = semver.MustParse(core.Version())

const InferredTypesContainingFile = "__inferred type names__.ts"

func IsApplicableVersionedTypesKey(key string) bool {
	if !strings.HasPrefix(key, "types@") {
		return false
	}
	range_, ok := semver.TryParseVersionRange(key[len("types@"):])
	if !ok {
		return false
	}
	return range_.Test(&typeScriptVersion)
}

func ParseNodeModuleFromPath(resolved string, isFolder bool) string {
	path := tspath.NormalizePath(resolved)
	idx := strings.LastIndex(path, "/node_modules/")
	if idx == -1 {
		return ""
	}

	indexAfterNodeModules := idx + len("/node_modules/")
	indexAfterPackageName := moveToNextDirectorySeparatorIfAvailable(path, indexAfterNodeModules, isFolder)
	if path[indexAfterNodeModules] == '@' {
		indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(path, indexAfterPackageName, isFolder)
	}
	return path[:indexAfterPackageName]
}

func ParsePackageName(moduleName string) (packageName, rest string) {
	idx := strings.Index(moduleName, "/")
	if len(moduleName) > 0 && moduleName[0] == '@' {
		offset := idx + 1
		idx = strings.Index(moduleName[offset:], "/")
		if idx != -1 {
			idx += offset
		}
	}
	if idx == -1 {
		return moduleName, ""
	}
	return moduleName[:idx], moduleName[idx+1:]
}

func MangleScopedPackageName(packageName string) string {
	if len(packageName) > 0 && packageName[0] == '@' {
		idx := strings.Index(packageName, "/")
		if idx == -1 {
			return packageName
		}
		return packageName[1:idx] + "__" + packageName[idx+1:]
	}
	return packageName
}

func UnmangleScopedPackageName(packageName string) string {
	idx := strings.Index(packageName, "__")
	if idx != -1 {
		return "@" + packageName[:idx] + "/" + packageName[idx+2:]
	}
	return packageName
}

func GetTypesPackageName(packageName string) string {
	return "@types/" + MangleScopedPackageName(packageName)
}

func GetPackageNameFromTypesPackageName(mangledName string) string {
	withoutAtTypePrefix := strings.TrimPrefix(mangledName, "@types/")
	if withoutAtTypePrefix != mangledName {
		return UnmangleScopedPackageName(withoutAtTypePrefix)
	}
	return mangledName
}

func ComparePatternKeys(a, b string) int {
	aPatternIndex := strings.Index(a, "*")
	bPatternIndex := strings.Index(b, "*")
	baseLenA := len(a)
	if aPatternIndex != -1 {
		baseLenA = aPatternIndex + 1
	}
	baseLenB := len(b)
	if bPatternIndex != -1 {
		baseLenB = bPatternIndex + 1
	}

	if baseLenA > baseLenB {
		return -1
	}
	if baseLenB > baseLenA {
		return 1
	}
	if aPatternIndex == -1 {
		return 1
	}
	if bPatternIndex == -1 {
		return -1
	}
	if len(a) > len(b) {
		return -1
	}
	if len(b) > len(a) {
		return 1
	}
	return 0
}

// Returns a DiagnosticMessage if we won't include a resolved module due to its extension.
// The DiagnosticMessage's parameters are the imported module name, and the filename it resolved to.
// This returns a diagnostic even if the module will be an untyped module.
func GetResolutionDiagnostic(options *core.CompilerOptions, resolvedModule *ResolvedModule, file *ast.SourceFile) *diagnostics.Message {
	needJsx := func() *diagnostics.Message {
		if options.Jsx != core.JsxEmitNone {
			return nil
		}
		return diagnostics.Module_0_was_resolved_to_1_but_jsx_is_not_set
	}

	needAllowJs := func() *diagnostics.Message {
		if options.GetAllowJS() || !options.NoImplicitAny.DefaultIfUnknown(options.Strict).IsTrue() {
			return nil
		}
		return diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type
	}

	needResolveJsonModule := func() *diagnostics.Message {
		if options.GetResolveJsonModule() {
			return nil
		}
		return diagnostics.Module_0_was_resolved_to_1_but_resolveJsonModule_is_not_used
	}

	needAllowArbitraryExtensions := func() *diagnostics.Message {
		if file.IsDeclarationFile || options.AllowArbitraryExtensions.IsTrue() {
			return nil
		}
		return diagnostics.Module_0_was_resolved_to_1_but_allowArbitraryExtensions_is_not_set
	}

	switch resolvedModule.Extension {
	case tspath.ExtensionTs, tspath.ExtensionDts,
		tspath.ExtensionMts, tspath.ExtensionDmts,
		tspath.ExtensionCts, tspath.ExtensionDcts:
		// These are always allowed.
		return nil
	case tspath.ExtensionTsx:
		return needJsx()
	case tspath.ExtensionJsx:
		if message := needJsx(); message != nil {
			return message
		}
		return needAllowJs()
	case tspath.ExtensionJs, tspath.ExtensionMjs, tspath.ExtensionCjs:
		return needAllowJs()
	case tspath.ExtensionJson:
		return needResolveJsonModule()
	default:
		return needAllowArbitraryExtensions()
	}
}

// TryGetJSExtensionForFile maps TS/JS/DTS extensions to the output JS-side extension.
// Returns an empty string if the extension is unsupported.
func TryGetJSExtensionForFile(fileName string, options *core.CompilerOptions) string {
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
