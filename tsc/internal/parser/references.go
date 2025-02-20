package parser

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func collectExternalModuleReferences(file *ast.SourceFile) {
	// !!!
	// If we are importing helpers, we need to add a synthetic reference to resolve the
	// helpers library. (A JavaScript file without `externalModuleIndicator` set might be
	// a CommonJS module; `commonJsModuleIndicator` doesn't get set until the binder has
	// run. We synthesize a helpers import for it just in case; it will never be used if
	// the binder doesn't find and set a `commonJsModuleIndicator`.)
	// if (isJavaScriptFile || (!file.isDeclarationFile && (getIsolatedModules(options) || isExternalModule(file)))) {
	// 	if (options.importHelpers) {
	// 		// synthesize 'import "tslib"' declaration
	// 		imports = [createSyntheticImport(externalHelpersModuleNameText, file)];
	// 	}
	// 	const jsxImport = getJSXRuntimeImport(getJSXImplicitImportBase(options, file), options);
	// 	if (jsxImport) {
	// 		// synthesize `import "base/jsx-runtime"` declaration
	// 		(imports ||= []).push(createSyntheticImport(jsxImport, file));
	// 	}
	// }
	for _, node := range file.Statements.Nodes {
		collectModuleReferences(file, node, false /*inAmbientModule*/)
	}

	if file.Flags&ast.NodeFlagsPossiblyContainsDynamicImport != 0 {
		collectDynamicImportOrRequireOrJsDocImportCalls(file)
	}
}

func collectDynamicImportOrRequireOrJsDocImportCalls(file *ast.SourceFile) {
	lastIndex := 0
	for {
		index := strings.Index(file.Text[lastIndex:], "import")
		if index == -1 {
			break
		}
		index += lastIndex
		node := getNodeAtPosition(file, index, false /* !!! isJavaScriptFile */)
		// if isJavaScriptFile && isRequireCall(node /*requireStringLiteralLikeArgument*/, true) {
		// 	setParentRecursive(node /*incremental*/, false) // we need parent data on imports before the program is fully bound, so we ensure it's set here
		// 	imports = append(imports, node.arguments[0])
		// } else
		if ast.IsImportCall(node) && len(node.Arguments()) >= 1 && ast.IsStringLiteralLike(node.Arguments()[0]) {
			// we have to check the argument list has length of at least 1. We will still have to process these even though we have parsing error.
			ast.SetParentInChildren(node) // we need parent data on imports before the program is fully bound, so we ensure it's set here
			file.Imports = append(file.Imports, node.Arguments()[0])
		} else if ast.IsLiteralImportTypeNode(node) {
			ast.SetParentInChildren(node) // we need parent data on imports before the program is fully bound, so we ensure it's set here
			file.Imports = append(file.Imports, node.AsImportTypeNode().Argument.AsLiteralTypeNode().Literal)
		}
		// else if isJavaScriptFile && isJSDocImportTag(node) {
		// 	const moduleNameExpr = getExternalModuleName(node)
		// 	if moduleNameExpr && isStringLiteral(moduleNameExpr) && moduleNameExpr.text {
		// 		setParentRecursive(node /*incremental*/, false)
		// 		imports = append(imports, moduleNameExpr)
		// 	}
		// }
		lastIndex = min(index+len("import"), len(file.Text))
	}
}

func collectModuleReferences(file *ast.SourceFile, node *ast.Statement, inAmbientModule bool) {
	if ast.IsAnyImportOrReExport(node) {
		moduleNameExpr := ast.GetExternalModuleName(node)
		// TypeScript 1.0 spec (April 2014): 12.1.6
		// An ExternalImportDeclaration in an AmbientExternalModuleDeclaration may reference other external modules
		// only through top - level external module names. Relative external module names are not permitted.
		if moduleNameExpr != nil && ast.IsStringLiteral(moduleNameExpr) {
			moduleName := moduleNameExpr.AsStringLiteral().Text
			if moduleName != "" && (!inAmbientModule || !tspath.IsExternalModuleNameRelative(moduleName)) {
				ast.SetParentInChildren(node) // we need parent data on imports before the program is fully bound, so we ensure it's set here
				file.Imports = append(file.Imports, moduleNameExpr)
				// !!! removed `&& p.currentNodeModulesDepth == 0`
				if file.UsesUriStyleNodeCoreModules != core.TSTrue && !file.IsDeclarationFile {
					if strings.HasPrefix(moduleName, "node:") && !exclusivelyPrefixedNodeCoreModules[moduleName] {
						// Presence of `node:` prefix takes precedence over unprefixed node core modules
						file.UsesUriStyleNodeCoreModules = core.TSTrue
					} else if file.UsesUriStyleNodeCoreModules == core.TSUnknown && unprefixedNodeCoreModules[moduleName] {
						// Avoid `unprefixedNodeCoreModules.has` for every import
						file.UsesUriStyleNodeCoreModules = core.TSFalse
					}
				}
			}
		}
		return
	}
	if ast.IsModuleDeclaration(node) && ast.IsAmbientModule(node) && (inAmbientModule || ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient) || file.IsDeclarationFile) {
		ast.SetParentInChildren(node)
		nameText := node.AsModuleDeclaration().Name().Text()
		// Ambient module declarations can be interpreted as augmentations for some existing external modules.
		// This will happen in two cases:
		// - if current file is external module then module augmentation is a ambient module declaration defined in the top level scope
		// - if current file is not external module then module augmentation is an ambient module declaration with non-relative module name
		//   immediately nested in top level ambient module declaration .
		if ast.IsExternalModule(file) || (inAmbientModule && !tspath.IsExternalModuleNameRelative(nameText)) {
			file.ModuleAugmentations = append(file.ModuleAugmentations, node.AsModuleDeclaration().Name())
		} else if !inAmbientModule {
			if file.IsDeclarationFile {
				// for global .d.ts files record name of ambient module
				file.AmbientModuleNames = append(file.AmbientModuleNames, nameText)
			}
			// An AmbientExternalModuleDeclaration declares an external module.
			// This type of declaration is permitted only in the global module.
			// The StringLiteral must specify a top - level external module name.
			// Relative external module names are not permitted
			// NOTE: body of ambient module is always a module block, if it exists
			if node.AsModuleDeclaration().Body != nil {
				for _, statement := range node.AsModuleDeclaration().Body.AsModuleBlock().Statements.Nodes {
					collectModuleReferences(file, statement, true /*inAmbientModule*/)
				}
			}
		}
	}
}

// Returns a token if position is in [start-of-leading-trivia, end), includes JSDoc only in JS files
func getNodeAtPosition(file *ast.SourceFile, position int, isJavaScriptFile bool) *ast.Node {
	current := file.AsNode()
	for {
		var child *ast.Node
		if isJavaScriptFile /* && hasJSDocNodes(current) */ {
			for _, jsDoc := range current.JSDoc(file) {
				if nodeContainsPosition(jsDoc, position) {
					child = jsDoc
					break
				}
			}
		}
		if child == nil {
			current.ForEachChild(func(node *ast.Node) bool {
				if nodeContainsPosition(node, position) {
					child = node
					return true
				}
				return false
			})
		}
		if child == nil {
			return current
		}
		current = child
	}
}

func nodeContainsPosition(node *ast.Node, position int) bool {
	return node.Kind >= ast.KindFirstNode && node.Pos() <= position && (position < node.End() || position == node.End() && node.Kind == ast.KindEndOfFile)
}

var unprefixedNodeCoreModules = map[string]bool{
	"assert":              true,
	"assert/strict":       true,
	"async_hooks":         true,
	"buffer":              true,
	"child_process":       true,
	"cluster":             true,
	"console":             true,
	"constants":           true,
	"crypto":              true,
	"dgram":               true,
	"diagnostics_channel": true,
	"dns":                 true,
	"dns/promises":        true,
	"domain":              true,
	"events":              true,
	"fs":                  true,
	"fs/promises":         true,
	"http":                true,
	"http2":               true,
	"https":               true,
	"inspector":           true,
	"inspector/promises":  true,
	"module":              true,
	"net":                 true,
	"os":                  true,
	"path":                true,
	"path/posix":          true,
	"path/win32":          true,
	"perf_hooks":          true,
	"process":             true,
	"punycode":            true,
	"querystring":         true,
	"readline":            true,
	"readline/promises":   true,
	"repl":                true,
	"stream":              true,
	"stream/consumers":    true,
	"stream/promises":     true,
	"stream/web":          true,
	"string_decoder":      true,
	"sys":                 true,
	"test/mock_loader":    true,
	"timers":              true,
	"timers/promises":     true,
	"tls":                 true,
	"trace_events":        true,
	"tty":                 true,
	"url":                 true,
	"util":                true,
	"util/types":          true,
	"v8":                  true,
	"vm":                  true,
	"wasi":                true,
	"worker_threads":      true,
	"zlib":                true,
}

var exclusivelyPrefixedNodeCoreModules = map[string]bool{
	"node:sea":            true,
	"node:sqlite":         true,
	"node:test":           true,
	"node:test/reporters": true,
}
