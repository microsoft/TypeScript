package compiler

import (
	"encoding/json"
	"fmt"
	"path/filepath"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

type ProgramOptions struct {
	RootPath       string
	Host           CompilerHost
	Options        *core.CompilerOptions
	SingleThreaded bool
}

type Program struct {
	host                        CompilerHost
	options                     *core.CompilerOptions
	rootPath                    string
	files                       []*ast.SourceFile
	filesByPath                 map[string]*ast.SourceFile
	nodeModules                 map[string]*ast.SourceFile
	checker                     *Checker
	usesUriStyleNodeCoreModules core.Tristate
	currentNodeModulesDepth     int
}

var extensions = []string{".ts", ".tsx"}

func NewProgram(options ProgramOptions) *Program {
	p := &Program{}
	p.options = options.Options
	if p.options == nil {
		p.options = &core.CompilerOptions{}
	}
	p.host = options.Host
	if p.host == nil {
		p.host = NewCompilerHost(p.options, options.SingleThreaded)
	}
	rootPath := options.RootPath
	if rootPath == "" {
		rootPath = "."
	}
	p.rootPath = p.host.AbsFileName(rootPath)
	fileInfos := p.host.ReadDirectory(rootPath, extensions)
	// Sort files by descending file size
	slices.SortFunc(fileInfos, func(a FileInfo, b FileInfo) int {
		return int(b.Size) - int(a.Size)
	})
	p.parseSourceFiles(fileInfos)
	return p
}

func (p *Program) SourceFiles() []*ast.SourceFile { return p.files }
func (p *Program) Options() *core.CompilerOptions { return p.options }
func (p *Program) Host() CompilerHost             { return p.host }

func (p *Program) parseSourceFiles(fileInfos []FileInfo) {
	p.files = make([]*ast.SourceFile, len(fileInfos))[:len(fileInfos)]
	for i := range fileInfos {
		p.host.RunTask(func() {
			fileName := fileInfos[i].Name
			text, _ := p.host.ReadFile(fileName)
			sourceFile := ParseSourceFile(fileName, text, getEmitScriptTarget(p.options))
			path, _ := filepath.Abs(fileName)
			sourceFile.SetPath(path)
			p.collectExternalModuleReferences(sourceFile)
			p.files[i] = sourceFile
		})
	}
	p.host.WaitForTasks()
	p.filesByPath = make(map[string]*ast.SourceFile)
	for _, file := range p.files {
		p.filesByPath[file.Path()] = file
	}
}

func (p *Program) bindSourceFiles() {
	for _, file := range p.files {
		if !file.IsBound {
			p.host.RunTask(func() {
				bindSourceFile(file, p.options)
			})
		}
	}
	p.host.WaitForTasks()
}

func (p *Program) getResolvedModule(currentSourceFile *ast.SourceFile, moduleReference string) *ast.SourceFile {
	directory := filepath.Dir(currentSourceFile.Path())
	if isExternalModuleNameRelative(moduleReference) {
		return p.findSourceFile(filepath.Join(directory, moduleReference))
	}
	return p.findNodeModule(moduleReference)
}

func (p *Program) findSourceFile(candidate string) *ast.SourceFile {
	extensionless := removeFileExtension(candidate)
	for _, ext := range []string{ExtensionTs, ExtensionTsx, ExtensionDts} {
		path := extensionless + ext
		if result, ok := p.filesByPath[path]; ok {
			return result
		}
	}
	return nil
}

func (p *Program) findNodeModule(moduleReference string) *ast.SourceFile {
	if p.nodeModules == nil {
		p.nodeModules = make(map[string]*ast.SourceFile)
	}
	if sourceFile, ok := p.nodeModules[moduleReference]; ok {
		return sourceFile
	}
	sourceFile := p.tryLoadNodeModule(filepath.Join(p.rootPath, "node_modules", moduleReference))
	if sourceFile == nil {
		sourceFile = p.tryLoadNodeModule(filepath.Join(p.rootPath, "node_modules/@types", moduleReference))
	}
	p.nodeModules[moduleReference] = sourceFile
	return sourceFile
}

func (p *Program) tryLoadNodeModule(modulePath string) *ast.SourceFile {
	if packageJson, ok := p.host.ReadFile(filepath.Join(modulePath, "package.json")); ok {
		var jsonMap map[string]any
		if json.Unmarshal([]byte(packageJson), &jsonMap) == nil {
			typesValue := jsonMap["types"]
			if typesValue == nil {
				typesValue = jsonMap["typings"]
			}
			if fileName, ok := typesValue.(string); ok {
				path := filepath.Join(modulePath, fileName)
				return p.filesByPath[path]
			}
		}
	}
	return nil
}

func (p *Program) GetSyntacticDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(sourceFile, p.getSyntaticDiagnosticsForFile)
}

func (p *Program) GetBindDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	p.bindSourceFiles()
	return p.getDiagnosticsHelper(sourceFile, p.getBindDiagnosticsForFile)
}

func (p *Program) GetSemanticDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(sourceFile, p.getSemanticDiagnosticsForFile)
}

func (p *Program) GetGlobalDiagnostics() []*ast.Diagnostic {
	return sortAndDeduplicateDiagnostics(p.getTypeChecker().GetGlobalDiagnostics())
}

func (p *Program) TypeCount() int {
	if p.checker == nil {
		return 0
	}
	return int(p.checker.typeCount)
}

func (p *Program) getTypeChecker() *Checker {
	if p.checker == nil {
		p.checker = NewChecker(p)
	}
	return p.checker
}

func (p *Program) getSyntaticDiagnosticsForFile(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return sourceFile.Diagnostics()
}

func (p *Program) getBindDiagnosticsForFile(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return sourceFile.BindDiagnostics()
}

func (p *Program) getSemanticDiagnosticsForFile(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getTypeChecker().GetDiagnostics(sourceFile)
}

func (p *Program) getDiagnosticsHelper(sourceFile *ast.SourceFile, getDiagnostics func(*ast.SourceFile) []*ast.Diagnostic) []*ast.Diagnostic {
	if sourceFile != nil {
		return sortAndDeduplicateDiagnostics(getDiagnostics(sourceFile))
	}
	var result []*ast.Diagnostic
	for _, file := range p.files {
		result = append(result, getDiagnostics(file)...)
	}
	return sortAndDeduplicateDiagnostics(result)
}

func (p *Program) PrintTypeAliases() {
	for _, file := range p.files {
		if filepath.Base(file.FileName()) == "main.ts" {
			file.AsNode().ForEachChild(p.printTypeAlias)
		}
	}
}

func (p *Program) printTypeAlias(node *ast.Node) bool {
	if ast.IsTypeAliasDeclaration(node) {
		fmt.Println(p.getTypeChecker().typeAliasToString(node.AsTypeAliasDeclaration()))
	}
	return node.ForEachChild(p.printTypeAlias)
}

func (p *Program) collectExternalModuleReferences(file *ast.SourceFile) {
	if file.ModuleReferencesProcessed {
		return
	}
	file.ModuleReferencesProcessed = true
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
	for _, node := range file.Statements {
		p.collectModuleReferences(file, node, false /*inAmbientModule*/)
	}
	// if ((file.flags & NodeFlags.PossiblyContainsDynamicImport) || isJavaScriptFile) {
	// 	collectDynamicImportOrRequireOrJsDocImportCalls(file);
	// }
	// function collectDynamicImportOrRequireOrJsDocImportCalls(file: SourceFile) {
	// 	const r = /import|require/g;
	// 	while (r.exec(file.text) !== null) { // eslint-disable-line no-restricted-syntax
	// 		const node = getNodeAtPosition(file, r.lastIndex);
	// 		if (isJavaScriptFile && isRequireCall(node, /*requireStringLiteralLikeArgument*/ true)) {
	// 			setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here
	// 			imports = append(imports, node.arguments[0]);
	// 		}
	// 		// we have to check the argument list has length of at least 1. We will still have to process these even though we have parsing error.
	// 		else if (isImportCall(node) && node.arguments.length >= 1 && isStringLiteralLike(node.arguments[0])) {
	// 			setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here
	// 			imports = append(imports, node.arguments[0]);
	// 		}
	// 		else if (isLiteralImportTypeNode(node)) {
	// 			setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here
	// 			imports = append(imports, node.argument.literal);
	// 		}
	// 		else if (isJavaScriptFile && isJSDocImportTag(node)) {
	// 			const moduleNameExpr = getExternalModuleName(node);
	// 			if (moduleNameExpr && isStringLiteral(moduleNameExpr) && moduleNameExpr.text) {
	// 				setParentRecursive(node, /*incremental*/ false);
	// 				imports = append(imports, moduleNameExpr);
	// 			}
	// 		}
	// 	}
	// }
	// /** Returns a token if position is in [start-of-leading-trivia, end), includes JSDoc only in JS files */
	// function getNodeAtPosition(sourceFile: SourceFile, position: number): Node {
	// 	let current: Node = sourceFile;
	// 	const getContainingChild = (child: Node) => {
	// 		if (child.pos <= position && (position < child.end || (position === child.end && (child.kind === Kind.EndOfFileToken)))) {
	// 			return child;
	// 		}
	// 	};
	// 	while (true) {
	// 		const child = isJavaScriptFile && hasJSDocNodes(current) && forEach(current.jsDoc, getContainingChild) || forEachChild(current, getContainingChild);
	// 		if (!child) {
	// 			return current;
	// 		}
	// 		current = child;
	// 	}
	// }
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

func (p *Program) collectModuleReferences(file *ast.SourceFile, node *ast.Statement, inAmbientModule bool) {
	if isAnyImportOrReExport(node) {
		moduleNameExpr := getExternalModuleName(node)
		// TypeScript 1.0 spec (April 2014): 12.1.6
		// An ExternalImportDeclaration in an AmbientExternalModuleDeclaration may reference other external modules
		// only through top - level external module names. Relative external module names are not permitted.
		if moduleNameExpr != nil && ast.IsStringLiteral(moduleNameExpr) {
			moduleName := moduleNameExpr.AsStringLiteral().Text
			if moduleName != "" && (!inAmbientModule || !isExternalModuleNameRelative(moduleName)) {
				setParentInChildren(node) // we need parent data on imports before the program is fully bound, so we ensure it's set here
				file.Imports = append(file.Imports, moduleNameExpr)
				if file.UsesUriStyleNodeCoreModules != core.TSTrue && p.currentNodeModulesDepth == 0 && !file.IsDeclarationFile {
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
	if ast.IsModuleDeclaration(node) && isAmbientModule(node) && (inAmbientModule || hasSyntacticModifier(node, ast.ModifierFlagsAmbient) || file.IsDeclarationFile) {
		setParentInChildren(node)
		nameText := node.AsModuleDeclaration().Name().Text()
		// Ambient module declarations can be interpreted as augmentations for some existing external modules.
		// This will happen in two cases:
		// - if current file is external module then module augmentation is a ambient module declaration defined in the top level scope
		// - if current file is not external module then module augmentation is an ambient module declaration with non-relative module name
		//   immediately nested in top level ambient module declaration .
		if isExternalModule(file) || (inAmbientModule && !isExternalModuleNameRelative(nameText)) {
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
				for _, statement := range node.AsModuleDeclaration().Body.AsModuleBlock().Statements {
					p.collectModuleReferences(file, statement, true /*inAmbientModule*/)
				}
			}
		}
	}
}
