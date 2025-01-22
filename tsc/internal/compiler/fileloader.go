package compiler

import (
	"cmp"
	"iter"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/compiler/module"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type fileLoader struct {
	host            CompilerHost
	programOptions  ProgramOptions
	compilerOptions *core.CompilerOptions

	resolver             *module.Resolver
	resolvedModulesMutex sync.Mutex
	resolvedModules      map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule]

	mu                      sync.Mutex
	wg                      *core.WorkGroup
	tasksByFileName         map[string]*parseTask
	currentNodeModulesDepth int
	defaultLibraryPath      string
	comparePathsOptions     tspath.ComparePathsOptions
	rootTasks               []*parseTask
}

func processAllProgramFiles(
	host CompilerHost,
	programOptions ProgramOptions,
	compilerOptions *core.CompilerOptions,
	resolver *module.Resolver,
	rootFiles []string,
	libs []string,
) (files []*ast.SourceFile, resolvedModules map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule]) {
	loader := fileLoader{
		host:               host,
		programOptions:     programOptions,
		compilerOptions:    compilerOptions,
		resolver:           resolver,
		tasksByFileName:    make(map[string]*parseTask),
		defaultLibraryPath: programOptions.DefaultLibraryPath,
		comparePathsOptions: tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		},
		wg:        core.NewWorkGroup(programOptions.SingleThreaded),
		rootTasks: make([]*parseTask, 0, len(rootFiles)+len(libs)),
	}

	loader.addRootTasks(rootFiles, false)
	loader.addRootTasks(libs, true)
	loader.addAutomaticTypeDirectiveTasks()

	loader.startTasks(loader.rootTasks)

	loader.wg.Wait()

	files, libFiles := []*ast.SourceFile{}, []*ast.SourceFile{}
	for task := range loader.collectTasks(loader.rootTasks) {
		if task.isLib {
			libFiles = append(libFiles, task.file)
		} else {
			files = append(files, task.file)
		}
	}
	loader.sortLibs(libFiles)

	return append(libFiles, files...), loader.resolvedModules
}

func (p *fileLoader) addRootTasks(files []string, isLib bool) {
	for _, fileName := range files {
		absPath := tspath.GetNormalizedAbsolutePath(fileName, p.host.GetCurrentDirectory())
		p.rootTasks = append(p.rootTasks, &parseTask{normalizedFilePath: absPath, isLib: isLib})
	}
}

func (p *fileLoader) addAutomaticTypeDirectiveTasks() {
	var containingDirectory string
	if p.compilerOptions.ConfigFilePath != "" {
		containingDirectory = tspath.GetDirectoryPath(p.compilerOptions.ConfigFilePath)
	} else {
		containingDirectory = p.host.GetCurrentDirectory()
	}
	containingFileName := tspath.CombinePaths(containingDirectory, module.InferredTypesContainingFile)

	automaticTypeDirectiveNames := module.GetAutomaticTypeDirectiveNames(p.compilerOptions, p.host)
	for _, name := range automaticTypeDirectiveNames {
		resolved := p.resolver.ResolveTypeReferenceDirective(name, containingFileName, core.ModuleKindNodeNext, nil)
		if resolved.IsResolved() {
			p.rootTasks = append(p.rootTasks, &parseTask{normalizedFilePath: resolved.ResolvedFileName, isLib: false})
		}
	}
}

func (p *fileLoader) startTasks(tasks []*parseTask) {
	if len(tasks) > 0 {
		p.mu.Lock()
		defer p.mu.Unlock()
		for i, task := range tasks {
			// dedup tasks to ensure correct file order, regardless of which task would be started first
			if existingTask, ok := p.tasksByFileName[task.normalizedFilePath]; ok {
				tasks[i] = existingTask
			} else {
				p.tasksByFileName[task.normalizedFilePath] = task
				task.start(p)
			}
		}
	}
}

func (p *fileLoader) collectTasks(tasks []*parseTask) iter.Seq[*parseTask] {
	return func(yield func(*parseTask) bool) {
		p.collectTasksWorker(tasks, yield)
	}
}

func (p *fileLoader) collectTasksWorker(tasks []*parseTask, yield func(*parseTask) bool) bool {
	for _, task := range tasks {
		if _, ok := p.tasksByFileName[task.normalizedFilePath]; ok {
			// ensure we only walk each task once
			delete(p.tasksByFileName, task.normalizedFilePath)

			if len(task.subTasks) > 0 {
				if !p.collectTasksWorker(task.subTasks, yield) {
					return false
				}
			}

			if task.file != nil {
				if !yield(task) {
					return false
				}
			}
		}
	}
	return true
}

func (p *fileLoader) sortLibs(libFiles []*ast.SourceFile) {
	slices.SortFunc(libFiles, func(f1 *ast.SourceFile, f2 *ast.SourceFile) int {
		return cmp.Compare(p.getDefaultLibFilePriority(f1), p.getDefaultLibFilePriority(f2))
	})
}

func (p *fileLoader) getDefaultLibFilePriority(a *ast.SourceFile) int {
	if tspath.ContainsPath(p.defaultLibraryPath, a.FileName(), p.comparePathsOptions) {
		basename := tspath.GetBaseFileName(a.FileName())
		if basename == "lib.d.ts" || basename == "lib.es6.d.ts" {
			return 0
		}
		name := strings.TrimSuffix(strings.TrimPrefix(basename, "lib."), ".d.ts")
		index := slices.Index(tsoptions.Libs, name)
		if index != -1 {
			return index + 1
		}
	}
	return len(tsoptions.Libs) + 2
}

type parseTask struct {
	normalizedFilePath string
	file               *ast.SourceFile
	isLib              bool
	subTasks           []*parseTask
}

func (t *parseTask) start(loader *fileLoader) {
	loader.wg.Run(func() {
		file := loader.parseSourceFile(t.normalizedFilePath)

		// !!! if noResolve, skip all of this
		loader.collectExternalModuleReferences(file)

		t.subTasks = make([]*parseTask, 0, len(file.ReferencedFiles)+len(file.Imports)+len(file.ModuleAugmentations))

		for _, ref := range file.ReferencedFiles {
			resolvedPath := loader.resolveTripleslashPathReference(ref.FileName, file.FileName())
			t.addSubTask(resolvedPath, false)
		}

		for _, ref := range file.TypeReferenceDirectives {
			resolved := loader.resolver.ResolveTypeReferenceDirective(ref.FileName, file.FileName(), core.ModuleKindCommonJS /* !!! */, nil)
			if resolved.IsResolved() {
				t.addSubTask(resolved.ResolvedFileName, false)
			}
		}

		if loader.compilerOptions.NoLib != core.TSTrue {
			for _, lib := range file.LibReferenceDirectives {
				name, ok := tsoptions.GetLibFileName(lib.FileName)
				if !ok {
					continue
				}
				t.addSubTask(tspath.CombinePaths(loader.defaultLibraryPath, name), true)
			}
		}

		for _, imp := range loader.resolveImportsAndModuleAugmentations(file) {
			t.addSubTask(imp, false)
		}

		t.file = file
		loader.startTasks(t.subTasks)
	})
}

func (p *fileLoader) parseSourceFile(fileName string) *ast.SourceFile {
	path := tspath.ToPath(fileName, p.host.GetCurrentDirectory(), p.host.FS().UseCaseSensitiveFileNames())
	text, _ := p.host.FS().ReadFile(fileName)
	var sourceFile *ast.SourceFile
	if tspath.FileExtensionIs(fileName, tspath.ExtensionJson) {
		sourceFile = parser.ParseJSONText(fileName, text)
	} else {
		sourceFile = parser.ParseSourceFile(fileName, text, p.compilerOptions.GetEmitScriptTarget())
	}
	sourceFile.SetPath(path)
	return sourceFile
}

func (t *parseTask) addSubTask(fileName string, isLib bool) {
	normalizedFilePath := tspath.NormalizePath(fileName)
	t.subTasks = append(t.subTasks, &parseTask{normalizedFilePath: normalizedFilePath, isLib: isLib})
}

func (p *fileLoader) collectExternalModuleReferences(file *ast.SourceFile) {
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

	if file.Flags&ast.NodeFlagsPossiblyContainsDynamicImport != 0 {
		p.collectDynamicImportOrRequireOrJsDocImportCalls(file)
	}
}

func (p *fileLoader) collectDynamicImportOrRequireOrJsDocImportCalls(file *ast.SourceFile) {
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
			binder.SetParentInChildren(node) // we need parent data on imports before the program is fully bound, so we ensure it's set here
			file.Imports = append(file.Imports, node.Arguments()[0])
		} else if ast.IsLiteralImportTypeNode(node) {
			binder.SetParentInChildren(node) // we need parent data on imports before the program is fully bound, so we ensure it's set here
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

func (p *fileLoader) collectModuleReferences(file *ast.SourceFile, node *ast.Statement, inAmbientModule bool) {
	if ast.IsAnyImportOrReExport(node) {
		moduleNameExpr := ast.GetExternalModuleName(node)
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

func (p *fileLoader) resolveTripleslashPathReference(moduleName string, containingFile string) string {
	basePath := tspath.GetDirectoryPath(containingFile)
	referencedFileName := moduleName

	if !tspath.IsRootedDiskPath(moduleName) {
		referencedFileName = tspath.CombinePaths(basePath, moduleName)
	}
	return tspath.NormalizePath(referencedFileName)
}

func (p *fileLoader) resolveImportsAndModuleAugmentations(file *ast.SourceFile) []string {
	toParse := make([]string, 0, len(file.Imports))
	if len(file.Imports) > 0 || len(file.ModuleAugmentations) > 0 {
		moduleNames := getModuleNames(file)
		resolutions := p.resolveModuleNames(moduleNames, file)

		resolutionsInFile := make(module.ModeAwareCache[*module.ResolvedModule], len(resolutions))

		p.resolvedModulesMutex.Lock()
		defer p.resolvedModulesMutex.Unlock()
		if p.resolvedModules == nil {
			p.resolvedModules = make(map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule])
		}
		p.resolvedModules[file.Path()] = resolutionsInFile

		for i, resolution := range resolutions {
			resolvedFileName := resolution.ResolvedFileName
			// TODO(ercornel): !!!: check if from node modules

			mode := core.ModuleKindCommonJS // !!!
			resolutionsInFile[module.ModeAwareCacheKey{Name: moduleNames[i].Text(), Mode: mode}] = resolution

			// add file to program only if:
			// - resolution was successful
			// - noResolve is falsy
			// - module name comes from the list of imports
			// - it's not a top level JavaScript module that exceeded the search max

			// const elideImport = isJsFileFromNodeModules && currentNodeModulesDepth > maxNodeModuleJsDepth;

			// Don't add the file if it has a bad extension (e.g. 'tsx' if we don't have '--allowJs')
			// This may still end up being an untyped module -- the file won't be included but imports will be allowed.

			shouldAddFile := resolution.IsResolved() && tspath.FileExtensionIsOneOf(resolvedFileName, []string{".ts", ".tsx", ".mts", ".cts"})
			// TODO(ercornel): !!!: other checks on whether or not to add the file

			if shouldAddFile {
				// p.findSourceFile(resolvedFileName, FileIncludeReason{Import, 0})
				toParse = append(toParse, resolvedFileName)
			}
		}
	}
	return toParse
}

func (p *fileLoader) resolveModuleNames(entries []*ast.Node, file *ast.SourceFile) []*module.ResolvedModule {
	if len(entries) == 0 {
		return nil
	}

	resolvedModules := make([]*module.ResolvedModule, 0, len(entries))

	for _, entry := range entries {
		moduleName := entry.Text()
		if moduleName == "" {
			continue
		}
		resolvedModule := p.resolver.ResolveModuleName(moduleName, file.FileName(), core.ModuleKindCommonJS /* !!! */, nil)
		resolvedModules = append(resolvedModules, resolvedModule)
	}

	return resolvedModules
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
