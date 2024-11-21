package compiler

import (
	"encoding/json"
	"fmt"
	"path/filepath"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/module"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type ProgramOptions struct {
	RootNames         []string
	Host              CompilerHost
	Options           *core.CompilerOptions
	SingleThreaded    bool
	ProjectReferences []ProjectReference
}

type Program struct {
	host             CompilerHost
	options          *core.CompilerOptions
	rootPath         string
	files            []*ast.SourceFile
	filesByPath      map[string]*ast.SourceFile
	nodeModules      map[string]*ast.SourceFile
	checker          *Checker
	resolver         *module.Resolver
	currentDirectory string

	resolvedModules                     map[string]*module.ResolvedModuleWithFailedLookupLocations
	resolvedTypeReferenceDirectiveNames map[string]*module.ResolvedTypeReferenceDirectiveWithFailedLookupLocations

	// The below settings are to track if a .js file should be add to the program if loaded via searching under node_modules.
	// This works as imported modules are discovered recursively in a depth first manner, specifically:
	// - For each root file, findSourceFile is called.
	// - This calls processImportedModules for each module imported in the source file.
	// - This calls resolveModuleNames, and then calls findSourceFile for each resolved module.
	// As all these operations happen - and are nested - within the createProgram call, they close over the below variables.
	// The current resolution depth is tracked by incrementing/decrementing as the depth first search progresses.
	//maxNodeModuleJsDepth    int32
	currentNodeModulesDepth int32
}

var extensions = []string{".ts", ".tsx"}

func NewProgram(options ProgramOptions) *Program {
	p := &Program{}
	p.options = options.Options
	if p.options == nil {
		p.options = &core.CompilerOptions{}
	}
	p.filesByPath = make(map[string]*ast.SourceFile, len(options.RootNames))

	p.resolvedModules = make(map[string]*module.ResolvedModuleWithFailedLookupLocations)
	//p.maxNodeModuleJsDepth = p.options.MaxNodeModuleJsDepth

	// TODO(ercornel): !!! tracing?
	// tracing?.push(tracing.Phase.Program, "createProgram", { configFilePath: options.configFilePath, rootDir: options.rootDir }, /*separateBeginAndEnd*/ true);
	// performance.mark("beforeProgram");

	p.host = options.Host
	if p.host == nil {
		p.host = NewCompilerHost(p.options, options.SingleThreaded)
	}

	// TODO(ercornel): !!!: SKIPPING FOR NOW :: default lib

	p.currentDirectory = p.host.GetCurrentDirectory()
	p.resolver = module.NewResolver(p.host, nil, p.options)

	if len(options.ProjectReferences) > 0 {
		// TODO(ercornel): !!!: project references
	}

	for i, rootName := range options.RootNames {
		p.processRootFile(rootName, FileIncludeReason{RootFile, i})
	}

	return p
}

func (p *Program) SourceFiles() []*ast.SourceFile { return p.files }
func (p *Program) Options() *core.CompilerOptions { return p.options }
func (p *Program) Host() CompilerHost             { return p.host }

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

func (p *Program) processRootFile(fileName string, reason FileIncludeReason /*, isDefaultLib bool, ignoreNoDefaultLib bool, */) {
	normalizedPath := tspath.NormalizePath(fileName)
	p.processSourceFile(normalizedPath, reason)
}

func (p *Program) processSourceFile(fileName string, reason FileIncludeReason) *ast.SourceFile {
	return p.findSourceFile(fileName, reason)
}

func (p *Program) findSourceFile(candidate string, reason FileIncludeReason) *ast.SourceFile {
	extensionless := tspath.RemoveFileExtension(candidate)
	for _, ext := range []string{tspath.ExtensionTs, tspath.ExtensionTsx, tspath.ExtensionDts} {
		path := extensionless + ext
		if result, ok := p.filesByPath[path]; ok {
			return result
		}
	}

	// TODO(ercornel): !!!: how to make this async
	file := p.parseSourceFile(candidate)
	if file != nil {
		p.filesByPath[candidate] = file
		p.processReferencedFiles(file)
		p.processImportedModules(file)
	}
	return file
}

func (p *Program) parseSourceFile(fileName string) *ast.SourceFile {
	text, _ := p.host.ReadFile(fileName)
	sourceFile := ParseSourceFile(fileName, text, p.options.GetEmitScriptTarget())
	path := tspath.GetNormalizedAbsolutePath(fileName, p.currentDirectory)
	sourceFile.SetPath(path)
	p.files = append(p.files, sourceFile)
	return sourceFile
}

func (p *Program) processReferencedFiles(file *ast.SourceFile) {
	for _, ref := range file.ReferencedFiles {
		p.processSourceFile(ref.FileName, FileIncludeReason{ReferenceFile, 0})
	}
}

func (p *Program) getResolvedModule(currentSourceFile *ast.SourceFile, moduleReference string) *ast.SourceFile {
	directory := tspath.GetDirectoryPath(currentSourceFile.Path())
	if tspath.IsExternalModuleNameRelative(moduleReference) {
		return p.findSourceFile(tspath.CombinePaths(directory, moduleReference), FileIncludeReason{Import, 0})
	}
	return p.findNodeModule(moduleReference)
}

func getModuleNames(file *ast.SourceFile) []*ast.Node {
	res := slices.Clone(file.Imports)
	for _, imp := range file.ModuleAugmentations {
		if imp.Kind == ast.KindStringLiteral {
			res = append(res, imp)
		}
		// Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
	}
	return res
}

func (p *Program) resolveModuleNames(entries []*ast.Node, file *ast.SourceFile) []*module.ResolvedModuleWithFailedLookupLocations {
	if len(entries) == 0 {
		return nil
	}

	resolvedModules := make([]*module.ResolvedModuleWithFailedLookupLocations, 0, len(entries))

	for _, entry := range entries {
		moduleName := entry.Text()
		if moduleName == "" {
			continue
		}
		resolvedModule := p.resolver.ResolveModuleName(moduleName, file.Path(), core.ModuleKindNodeNext, nil)
		resolvedModules = append(resolvedModules, resolvedModule)
	}

	return resolvedModules
}

func (p *Program) processImportedModules(file *ast.SourceFile) {
	p.collectExternalModuleReferences(file)

	if len(file.Imports) > 0 || len(file.ModuleAugmentations) > 0 {
		moduleNames := getModuleNames(file)
		resolutions := p.resolveModuleNames(moduleNames, file)

		for i, resolution := range resolutions {
			moduleName := moduleNames[i].Text()
			p.resolvedModules[moduleName] = resolution

			resolvedFileName := resolution.ResolvedFileName
			// TODO(ercornel): !!!: check if from node modules

			// add file to program only if:
			// - resolution was successful
			// - noResolve is falsy
			// - module name comes from the list of imports
			// - it's not a top level JavaScript module that exceeded the search max

			//const elideImport = isJsFileFromNodeModules && currentNodeModulesDepth > maxNodeModuleJsDepth;

			// Don't add the file if it has a bad extension (e.g. 'tsx' if we don't have '--allowJs')
			// This may still end up being an untyped module -- the file won't be included but imports will be allowed.

			shouldAddFile := resolution.IsResolved()
			// TODO(ercornel): !!!: other checks on whether or not to add the file

			if shouldAddFile {
				p.findSourceFile(resolvedFileName, FileIncludeReason{Import, 0})
			}
		}
	}
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

type NodeCount struct {
	kind  ast.Kind
	count int
}

func (p *Program) PrintSourceFileWithTypes() {
	for _, file := range p.files {
		if filepath.Base(file.FileName()) == "main.ts" {
			fmt.Print(p.getTypeChecker().sourceFileWithTypes(file))
		}
	}
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
	for _, node := range file.Statements.Nodes {
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
			if moduleName != "" && (!inAmbientModule || !tspath.IsExternalModuleNameRelative(moduleName)) {
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
		if isExternalModule(file) || (inAmbientModule && !tspath.IsExternalModuleNameRelative(nameText)) {
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
					p.collectModuleReferences(file, statement, true /*inAmbientModule*/)
				}
			}
		}
	}
}
