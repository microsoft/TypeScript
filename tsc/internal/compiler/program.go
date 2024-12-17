package compiler

import (
	"fmt"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/compiler/module"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type ProgramOptions struct {
	RootPath         string
	Host             CompilerHost
	Options          *core.CompilerOptions
	SingleThreaded   bool
	ProjectReference []ProjectReference
}

type Program struct {
	host             CompilerHost
	programOptions   ProgramOptions
	compilerOptions  *core.CompilerOptions
	rootPath         string
	nodeModules      map[string]*ast.SourceFile
	checker          *Checker
	resolver         *module.Resolver
	currentDirectory string

	fileProcessingMutex sync.Mutex
	files               []*ast.SourceFile
	filesByPath         map[tspath.Path]*ast.SourceFile
	processedFileNames  core.Set[string]

	// The below settings are to track if a .js file should be add to the program if loaded via searching under node_modules.
	// This works as imported modules are discovered recursively in a depth first manner, specifically:
	// - For each root file, findSourceFile is called.
	// - This calls processImportedModules for each module imported in the source file.
	// - This calls resolveModuleNames, and then calls findSourceFile for each resolved module.
	// As all these operations happen - and are nested - within the createProgram call, they close over the below variables.
	// The current resolution depth is tracked by incrementing/decrementing as the depth first search progresses.
	// maxNodeModuleJsDepth      int
	currentNodeModulesDepth int

	usesUriStyleNodeCoreModules core.Tristate

	commonSourceDirectory     string
	commonSourceDirectoryOnce sync.Once
}

var extensions = []string{".ts", ".tsx"}

func NewProgram(options ProgramOptions) *Program {
	p := &Program{}
	p.programOptions = options
	p.compilerOptions = options.Options
	if p.compilerOptions == nil {
		p.compilerOptions = &core.CompilerOptions{}
	}
	p.filesByPath = make(map[tspath.Path]*ast.SourceFile)

	// p.maxNodeModuleJsDepth = p.options.MaxNodeModuleJsDepth

	// TODO(ercornel): !!! tracing?
	// tracing?.push(tracing.Phase.Program, "createProgram", { configFilePath: options.configFilePath, rootDir: options.rootDir }, /*separateBeginAndEnd*/ true);
	// performance.mark("beforeProgram");

	p.host = options.Host
	if p.host == nil {
		panic("host required")
	}

	p.resolver = module.NewResolver(p.host, p.compilerOptions)

	// TODO(ercornel): !!!: SKIPPING FOR NOW :: default lib
	p.rootPath = options.RootPath
	if p.rootPath == "" {
		panic("root path required")
	}
	fileInfos := readFileInfos(p.host.FS(), p.rootPath, extensions)
	// Sort files by descending file size
	slices.SortFunc(fileInfos, func(a FileInfo, b FileInfo) int {
		return int(b.Size) - int(a.Size)
	})

	p.processRootFiles(fileInfos)

	// Sort files by path so we get a stable ordering between runs
	slices.SortFunc(p.files, func(f1 *ast.SourceFile, f2 *ast.SourceFile) int {
		return strings.Compare(string(f1.Path()), string(f2.Path()))
	})

	return p
}

func readFileInfos(fs vfs.FS, rootPath string, extensions []string) []FileInfo {
	var fileInfos []FileInfo

	err := fs.WalkDir(rootPath, func(path string, d vfs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() && slices.ContainsFunc(extensions, func(ext string) bool { return tspath.FileExtensionIs(path, ext) }) {
			info, err := d.Info()
			if err != nil {
				return err //nolint:wrapcheck
			}
			fileInfos = append(fileInfos, FileInfo{Name: path, Size: info.Size()})
		}
		return nil
	})
	if err != nil {
		fmt.Println(err)
	}

	return fileInfos
}

func (p *Program) SourceFiles() []*ast.SourceFile { return p.files }
func (p *Program) Options() *core.CompilerOptions { return p.compilerOptions }
func (p *Program) Host() CompilerHost             { return p.host }

func (p *Program) bindSourceFiles() {
	wg := core.NewWorkGroup(p.programOptions.SingleThreaded)
	for _, file := range p.files {
		if !file.IsBound {
			wg.Run(func() {
				binder.BindSourceFile(file, p.compilerOptions)
			})
		}
	}
	wg.Wait()
}

func (p *Program) processRootFiles(rootFiles []FileInfo) {
	wg := core.NewWorkGroup(p.programOptions.SingleThreaded)

	absPaths := make([]string, 0, len(rootFiles))
	for _, fileInfo := range rootFiles {
		absPath := tspath.GetNormalizedAbsolutePath(fileInfo.Name, p.currentDirectory)
		p.processedFileNames.Add(absPath)
		absPaths = append(absPaths, absPath)
	}

	for _, absPath := range absPaths {
		p.startParseTask(absPath, wg)
	}

	wg.Wait()
}

func (p *Program) startParseTask(fileName string, wg *core.WorkGroup) {
	wg.Run(func() {
		normalizedPath := tspath.NormalizePath(fileName)
		file := p.parseSourceFile(normalizedPath)
		p.collectExternalModuleReferences(file)

		filesToParse := make([]string, 0, len(file.ReferencedFiles)+len(file.Imports)+len(file.ModuleAugmentations))

		for _, ref := range file.ReferencedFiles {
			resolvedPath := p.resolveTripleslashPathReference(ref.FileName, file.FileName())
			filesToParse = append(filesToParse, resolvedPath)
		}

		filesToParse = append(filesToParse, p.resolveImportsAndModuleAugmentations(file)...)

		p.fileProcessingMutex.Lock()
		defer p.fileProcessingMutex.Unlock()
		p.files = append(p.files, file)
		p.filesByPath[file.Path()] = file

		if len(filesToParse) > 0 {
			for _, fileName := range filesToParse {
				if !p.processedFileNames.Has(fileName) {
					p.processedFileNames.Add(fileName)
					p.startParseTask(fileName, wg)
				}
			}
		}
	})
}

func (p *Program) getResolvedModule(currentSourceFile *ast.SourceFile, moduleReference string) *ast.SourceFile {
	resolved := p.resolver.ResolveModuleName(moduleReference, currentSourceFile.FileName(), core.ModuleKindNodeNext, nil)
	return p.findSourceFile(resolved.ResolvedFileName, FileIncludeReason{FileIncludeKindImport, 0})
}

func (p *Program) findSourceFile(candidate string, reason FileIncludeReason) *ast.SourceFile {
	path := tspath.ToPath(candidate, p.host.GetCurrentDirectory(), p.host.FS().UseCaseSensitiveFileNames())
	return p.filesByPath[path]
}

func (p *Program) parseSourceFile(fileName string) *ast.SourceFile {
	path := tspath.ToPath(fileName, p.currentDirectory, p.host.FS().UseCaseSensitiveFileNames())
	text, _ := p.host.FS().ReadFile(fileName)
	sourceFile := parser.ParseSourceFile(fileName, text, p.compilerOptions.GetEmitScriptTarget())
	sourceFile.SetPath(path)
	return sourceFile
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

func (p *Program) resolveModuleNames(entries []*ast.Node, file *ast.SourceFile) []*module.ResolvedModule {
	if len(entries) == 0 {
		return nil
	}

	resolvedModules := make([]*module.ResolvedModule, 0, len(entries))

	for _, entry := range entries {
		moduleName := entry.Text()
		if moduleName == "" {
			continue
		}
		resolvedModule := p.resolver.ResolveModuleName(moduleName, file.FileName(), core.ModuleKindNodeNext, nil)
		resolvedModules = append(resolvedModules, resolvedModule)
	}

	return resolvedModules
}

func (p *Program) resolveImportsAndModuleAugmentations(file *ast.SourceFile) []string {
	toParse := make([]string, 0, len(file.Imports))
	if len(file.Imports) > 0 || len(file.ModuleAugmentations) > 0 {
		moduleNames := getModuleNames(file)
		resolutions := p.resolveModuleNames(moduleNames, file)

		for _, resolution := range resolutions {
			resolvedFileName := resolution.ResolvedFileName
			// TODO(ercornel): !!!: check if from node modules

			// add file to program only if:
			// - resolution was successful
			// - noResolve is falsy
			// - module name comes from the list of imports
			// - it's not a top level JavaScript module that exceeded the search max

			// const elideImport = isJsFileFromNodeModules && currentNodeModulesDepth > maxNodeModuleJsDepth;

			// Don't add the file if it has a bad extension (e.g. 'tsx' if we don't have '--allowJs')
			// This may still end up being an untyped module -- the file won't be included but imports will be allowed.

			shouldAddFile := resolution.IsResolved()
			// TODO(ercornel): !!!: other checks on whether or not to add the file

			if shouldAddFile {
				// p.findSourceFile(resolvedFileName, FileIncludeReason{Import, 0})
				toParse = append(toParse, resolvedFileName)
			}
		}
	}
	return toParse
}

func (p *Program) GetSyntacticDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(sourceFile, false /*ensureBound*/, p.getSyntaticDiagnosticsForFile)
}

func (p *Program) GetBindDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(sourceFile, true /*ensureBound*/, p.getBindDiagnosticsForFile)
}

func (p *Program) GetSemanticDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(sourceFile, true /*ensureBound*/, p.getSemanticDiagnosticsForFile)
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
	return core.Concatenate(sourceFile.BindDiagnostics(), p.getTypeChecker().GetDiagnostics(sourceFile))
}

func (p *Program) getDiagnosticsHelper(sourceFile *ast.SourceFile, ensureBound bool, getDiagnostics func(*ast.SourceFile) []*ast.Diagnostic) []*ast.Diagnostic {
	if sourceFile != nil {
		if ensureBound {
			binder.BindSourceFile(sourceFile, p.compilerOptions)
		}
		return sortAndDeduplicateDiagnostics(getDiagnostics(sourceFile))
	}
	if ensureBound {
		p.bindSourceFiles()
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
		if tspath.GetBaseFileName(file.FileName()) == "main.ts" {
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
				binder.SetParentInChildren(node) // we need parent data on imports before the program is fully bound, so we ensure it's set here
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
	if ast.IsModuleDeclaration(node) && ast.IsAmbientModule(node) && (inAmbientModule || ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient) || file.IsDeclarationFile) {
		binder.SetParentInChildren(node)
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
					p.collectModuleReferences(file, statement, true /*inAmbientModule*/)
				}
			}
		}
	}
}

func (p *Program) resolveTripleslashPathReference(moduleName string, containingFile string) string {
	basePath := tspath.GetDirectoryPath(containingFile)
	referencedFileName := moduleName

	if !tspath.IsRootedDiskPath(moduleName) {
		referencedFileName = tspath.CombinePaths(basePath, moduleName)
	}
	return tspath.NormalizePath(referencedFileName)
}

func (p *Program) getEmitModuleFormatOfFile(sourceFile *ast.SourceFile) core.ModuleKind {
	// !!!
	// Must reimplement the below.
	// Also, previous version is a method on `TypeCheckerHost`/`Program`.

	// mode, hadImpliedFormat := getImpliedNodeFormatForEmitWorker(sourceFile, options)
	// if !hadImpliedFormat {
	// 	mode = options.GetEmitModuleKind()
	// }
	return p.compilerOptions.GetEmitModuleKind()
}

func (p *Program) CommonSourceDirectory() string {
	p.commonSourceDirectoryOnce.Do(func() {
		var files []string
		host := &emitHost{program: p}
		for _, file := range p.files {
			if sourceFileMayBeEmitted(file, host, false /*forceDtsEmit*/) {
				files = append(files, file.FileName())
			}
		}
		p.commonSourceDirectory = getCommonSourceDirectory(
			p.compilerOptions,
			files,
			p.host.GetCurrentDirectory(),
			p.host.FS().UseCaseSensitiveFileNames(),
		)
	})
	return p.commonSourceDirectory
}

func computeCommonSourceDirectoryOfFilenames(fileNames []string, currentDirectory string, useCaseSensitiveFileNames bool) string {
	var commonPathComponents []string
	for _, sourceFile := range fileNames {
		// Each file contributes into common source file path
		sourcePathComponents := tspath.GetNormalizedPathComponents(sourceFile, currentDirectory)

		// The base file name is not part of the common directory path
		sourcePathComponents = sourcePathComponents[:len(sourcePathComponents)-1]

		if commonPathComponents == nil {
			// first file
			commonPathComponents = sourcePathComponents
			continue
		}

		n := min(len(commonPathComponents), len(sourcePathComponents))
		for i := range n {
			if tspath.GetCanonicalFileName(commonPathComponents[i], useCaseSensitiveFileNames) != tspath.GetCanonicalFileName(sourcePathComponents[i], useCaseSensitiveFileNames) {
				if i == 0 {
					// Failed to find any common path component
					return ""
				}

				// New common path found that is 0 -> i-1
				commonPathComponents = commonPathComponents[:i]
				break
			}
		}

		// If the sourcePathComponents was shorter than the commonPathComponents, truncate to the sourcePathComponents
		if len(sourcePathComponents) < len(commonPathComponents) {
			commonPathComponents = commonPathComponents[:len(sourcePathComponents)]
		}
	}

	if len(commonPathComponents) == 0 {
		// Can happen when all input files are .d.ts files
		return currentDirectory
	}

	return tspath.GetPathFromPathComponents(commonPathComponents)
}

func getCommonSourceDirectory(options *core.CompilerOptions, files []string, currentDirectory string, useCaseSensitiveFileNames bool) string {
	var commonSourceDirectory string
	// !!! If a rootDir is specified use it as the commonSourceDirectory
	// !!! Project compilations never infer their root from the input source paths

	commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(files, currentDirectory, useCaseSensitiveFileNames)

	if len(commonSourceDirectory) > 0 {
		// Make sure directory path ends with directory separator so this string can directly
		// used to replace with "" to get the relative path of the source file and the relative path doesn't
		// start with / making it rooted path
		commonSourceDirectory = tspath.EnsureTrailingDirectorySeparator(commonSourceDirectory)
	}

	return commonSourceDirectory
}

type EmitOptions struct {
	TargetSourceFile *ast.SourceFile // Single file to emit. If `nil`, emits all files
	forceDtsEmit     bool
}

type EmitResult struct {
	EmitSkipped  bool
	Diagnostics  []*ast.Diagnostic      // Contains declaration emit diagnostics
	EmittedFiles []string               // Array of files the compiler wrote to disk
	sourceMaps   []*sourceMapEmitResult // Array of sourceMapData if compiler emitted sourcemaps
}

type sourceMapEmitResult struct {
	inputSourceFileNames []string // Input source file (which one can use on program to get the file), 1:1 mapping with the sourceMap.sources list
	sourceMap            *sourcemap.RawSourceMap
}

func (p *Program) Emit(options *EmitOptions) *EmitResult {
	// !!! performance measurement

	host := &emitHost{program: p}

	writerPool := &sync.Pool{
		New: func() any {
			return printer.NewTextWriter(host.Options().NewLine.GetNewLineCharacter())
		},
	}
	wg := core.NewWorkGroup(p.programOptions.SingleThreaded)

	var emitters []*emitter
	sourceFiles := getSourceFilesToEmit(host, options.TargetSourceFile, options.forceDtsEmit)
	for _, sourceFile := range sourceFiles {
		emitter := &emitter{
			host:              host,
			emittedFilesList:  nil,
			sourceMapDataList: nil,
			writer:            nil,
			sourceFile:        sourceFile,
		}
		emitters = append(emitters, emitter)
		wg.Run(func() {
			// take an unused writer
			writer := writerPool.Get().(printer.EmitTextWriter)
			writer.Clear()

			// attach writer and perform emit
			emitter.writer = writer
			emitter.paths = getOutputPathsFor(sourceFile, host, options.forceDtsEmit)
			emitter.emit()
			emitter.writer = nil

			// put the writer back in the pool
			writerPool.Put(writer)
		})
	}

	// wait for emit to complete
	wg.Wait()

	// collect results from emit, preserving input order
	result := &EmitResult{}
	for _, emitter := range emitters {
		if emitter.emitSkipped {
			result.EmitSkipped = true
		}
		result.Diagnostics = append(result.Diagnostics, emitter.emitterDiagnostics.GetDiagnostics()...)
		if emitter.emittedFilesList != nil {
			result.EmittedFiles = append(result.EmittedFiles, emitter.emittedFilesList...)
		}
		if emitter.sourceMapDataList != nil {
			result.sourceMaps = append(result.sourceMaps, emitter.sourceMapDataList...)
		}
	}
	return result
}
