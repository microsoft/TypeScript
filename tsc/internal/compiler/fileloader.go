package compiler

import (
	"cmp"
	"iter"
	"slices"
	"strings"
	"sync"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler/module"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type fileLoader struct {
	host                CompilerHost
	programOptions      ProgramOptions
	compilerOptions     *core.CompilerOptions
	resolver            *module.Resolver
	defaultLibraryPath  string
	comparePathsOptions tspath.ComparePathsOptions
	wg                  core.WorkGroup
	supportedExtensions []string

	tasksByFileName collections.SyncMap[string, *parseTask]
	rootTasks       []*parseTask

	totalFileCount atomic.Int32
	libFileCount   atomic.Int32

	factoryMu sync.Mutex
	factory   ast.NodeFactory
}

type processedFiles struct {
	files                         []*ast.SourceFile
	resolvedModules               map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule]
	sourceFileMetaDatas           map[tspath.Path]*ast.SourceFileMetaData
	jsxRuntimeImportSpecifiers    map[tspath.Path]*jsxRuntimeImportSpecifier
	importHelpersImportSpecifiers map[tspath.Path]*ast.Node
}

type jsxRuntimeImportSpecifier struct {
	moduleReference string
	specifier       *ast.Node
}

func processAllProgramFiles(
	host CompilerHost,
	programOptions ProgramOptions,
	compilerOptions *core.CompilerOptions,
	resolver *module.Resolver,
	rootFiles []string,
	libs []string,
) processedFiles {
	supportedExtensions := tsoptions.GetSupportedExtensions(compilerOptions, nil /*extraFileExtensions*/)
	loader := fileLoader{
		host:               host,
		programOptions:     programOptions,
		compilerOptions:    compilerOptions,
		resolver:           resolver,
		defaultLibraryPath: tspath.GetNormalizedAbsolutePath(host.DefaultLibraryPath(), host.GetCurrentDirectory()),
		comparePathsOptions: tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		},
		wg:                  core.NewWorkGroup(programOptions.SingleThreaded),
		rootTasks:           make([]*parseTask, 0, len(rootFiles)+len(libs)),
		supportedExtensions: core.Flatten(tsoptions.GetSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions)),
	}

	loader.addRootTasks(rootFiles, false)
	loader.addRootTasks(libs, true)
	loader.addAutomaticTypeDirectiveTasks()

	loader.startTasks(loader.rootTasks)

	loader.wg.RunAndWait()

	totalFileCount := int(loader.totalFileCount.Load())
	libFileCount := int(loader.libFileCount.Load())

	files := make([]*ast.SourceFile, 0, totalFileCount-libFileCount)
	libFiles := make([]*ast.SourceFile, 0, totalFileCount) // totalFileCount here since we append files to it later to construct the final list

	resolvedModules := make(map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule], totalFileCount)
	sourceFileMetaDatas := make(map[tspath.Path]*ast.SourceFileMetaData, totalFileCount)
	var jsxRuntimeImportSpecifiers map[tspath.Path]*jsxRuntimeImportSpecifier
	var importHelpersImportSpecifiers map[tspath.Path]*ast.Node

	for task := range loader.collectTasks(loader.rootTasks) {
		file := task.file
		if task.isLib {
			libFiles = append(libFiles, file)
		} else {
			files = append(files, file)
		}
		path := file.Path()
		resolvedModules[path] = task.resolutionsInFile
		sourceFileMetaDatas[path] = task.metadata
		if task.jsxRuntimeImportSpecifier != nil {
			if jsxRuntimeImportSpecifiers == nil {
				jsxRuntimeImportSpecifiers = make(map[tspath.Path]*jsxRuntimeImportSpecifier, totalFileCount)
			}
			jsxRuntimeImportSpecifiers[path] = task.jsxRuntimeImportSpecifier
		}
		if task.importHelpersImportSpecifier != nil {
			if importHelpersImportSpecifiers == nil {
				importHelpersImportSpecifiers = make(map[tspath.Path]*ast.Node, totalFileCount)
			}
			importHelpersImportSpecifiers[path] = task.importHelpersImportSpecifier
		}
	}
	loader.sortLibs(libFiles)

	allFiles := append(libFiles, files...)

	return processedFiles{
		files:                         allFiles,
		resolvedModules:               resolvedModules,
		sourceFileMetaDatas:           sourceFileMetaDatas,
		jsxRuntimeImportSpecifiers:    jsxRuntimeImportSpecifiers,
		importHelpersImportSpecifiers: importHelpersImportSpecifiers,
	}
}

func (p *fileLoader) addRootTasks(files []string, isLib bool) {
	for _, fileName := range files {
		absPath := tspath.GetNormalizedAbsolutePath(fileName, p.host.GetCurrentDirectory())
		if core.Tristate.IsTrue(p.compilerOptions.AllowNonTsExtensions) || slices.Contains(p.supportedExtensions, tspath.TryGetExtensionFromPath(absPath)) {
			p.rootTasks = append(p.rootTasks, &parseTask{normalizedFilePath: absPath, isLib: isLib})
		}
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
		for i, task := range tasks {
			loadedTask, loaded := p.tasksByFileName.LoadOrStore(task.normalizedFilePath, task)
			if loaded {
				// dedup tasks to ensure correct file order, regardless of which task would be started first
				tasks[i] = loadedTask
			} else {
				loadedTask.start(p)
			}
		}
	}
}

func (p *fileLoader) collectTasks(tasks []*parseTask) iter.Seq[*parseTask] {
	return func(yield func(*parseTask) bool) {
		p.collectTasksWorker(tasks, core.Set[*parseTask]{}, yield)
	}
}

func (p *fileLoader) collectTasksWorker(tasks []*parseTask, seen core.Set[*parseTask], yield func(*parseTask) bool) bool {
	for _, task := range tasks {
		// ensure we only walk each task once
		if seen.Has(task) {
			continue
		}
		seen.Add(task)

		if len(task.subTasks) > 0 {
			if !p.collectTasksWorker(task.subTasks, seen, yield) {
				return false
			}
		}

		if task.file != nil {
			if !yield(task) {
				return false
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
	// defaultLibraryPath and a.FileName() are absolute and normalized; a prefix check should suffice.
	defaultLibraryPath := tspath.RemoveTrailingDirectorySeparator(p.defaultLibraryPath)
	aFileName := a.FileName()

	if strings.HasPrefix(aFileName, defaultLibraryPath) && len(aFileName) > len(defaultLibraryPath) && aFileName[len(defaultLibraryPath)] == tspath.DirectorySeparator {
		// avoid tspath.GetBaseFileName; we know these paths are already absolute and normalized.
		basename := aFileName[strings.LastIndexByte(aFileName, tspath.DirectorySeparator)+1:]
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

	metadata                     *ast.SourceFileMetaData
	resolutionsInFile            module.ModeAwareCache[*module.ResolvedModule]
	importHelpersImportSpecifier *ast.Node
	jsxRuntimeImportSpecifier    *jsxRuntimeImportSpecifier
}

func (t *parseTask) start(loader *fileLoader) {
	loader.totalFileCount.Add(1)
	if t.isLib {
		loader.libFileCount.Add(1)
	}

	loader.wg.Queue(func() {
		file := loader.parseSourceFile(t.normalizedFilePath)
		t.file = file
		loader.wg.Queue(func() {
			t.metadata = loader.loadSourceFileMetaData(file.Path())
		})

		// !!! if noResolve, skip all of this
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

		toParse, resolutionsInFile, importHelpersImportSpecifier, jsxRuntimeImportSpecifier := loader.resolveImportsAndModuleAugmentations(file)
		for _, imp := range toParse {
			t.addSubTask(imp, false)
		}

		t.resolutionsInFile = resolutionsInFile
		t.importHelpersImportSpecifier = importHelpersImportSpecifier
		t.jsxRuntimeImportSpecifier = jsxRuntimeImportSpecifier

		loader.startTasks(t.subTasks)
	})
}

func (p *fileLoader) loadSourceFileMetaData(path tspath.Path) *ast.SourceFileMetaData {
	packageJsonType := p.resolver.GetPackageJsonTypeIfApplicable(string(path))
	impliedNodeFormat := ast.GetImpliedNodeFormatForFile(string(path), packageJsonType)
	return &ast.SourceFileMetaData{
		PackageJsonType:   packageJsonType,
		ImpliedNodeFormat: impliedNodeFormat,
	}
}

func (p *fileLoader) parseSourceFile(fileName string) *ast.SourceFile {
	path := tspath.ToPath(fileName, p.host.GetCurrentDirectory(), p.host.FS().UseCaseSensitiveFileNames())
	sourceFile := p.host.GetSourceFile(fileName, path, p.compilerOptions.GetEmitScriptTarget())
	return sourceFile
}

func (t *parseTask) addSubTask(fileName string, isLib bool) {
	normalizedFilePath := tspath.NormalizePath(fileName)
	t.subTasks = append(t.subTasks, &parseTask{normalizedFilePath: normalizedFilePath, isLib: isLib})
}

func (p *fileLoader) resolveTripleslashPathReference(moduleName string, containingFile string) string {
	basePath := tspath.GetDirectoryPath(containingFile)
	referencedFileName := moduleName

	if !tspath.IsRootedDiskPath(moduleName) {
		referencedFileName = tspath.CombinePaths(basePath, moduleName)
	}
	return tspath.NormalizePath(referencedFileName)
}

const externalHelpersModuleNameText = "tslib" // TODO(jakebailey): dedupe

func (p *fileLoader) resolveImportsAndModuleAugmentations(file *ast.SourceFile) (
	toParse []string,
	resolutionsInFile module.ModeAwareCache[*module.ResolvedModule],
	importHelpersImportSpecifier *ast.Node,
	jsxRuntimeImportSpecifier_ *jsxRuntimeImportSpecifier,
) {
	moduleNames := make([]*ast.Node, 0, len(file.Imports)+len(file.ModuleAugmentations)+2)
	moduleNames = append(moduleNames, file.Imports...)
	for _, imp := range file.ModuleAugmentations {
		if imp.Kind == ast.KindStringLiteral {
			moduleNames = append(moduleNames, imp)
		}
		// Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
	}

	isJavaScriptFile := ast.IsSourceFileJS(file)
	isExternalModuleFile := ast.IsExternalModule(file)

	if isJavaScriptFile || (!file.IsDeclarationFile && (p.compilerOptions.GetIsolatedModules() || isExternalModuleFile)) {
		if p.compilerOptions.ImportHelpers.IsTrue() {
			specifier := p.createSyntheticImport(externalHelpersModuleNameText, file)
			moduleNames = append(moduleNames, specifier)
			importHelpersImportSpecifier = specifier
		}

		jsxImport := ast.GetJSXRuntimeImport(ast.GetJSXImplicitImportBase(p.compilerOptions, file), p.compilerOptions)
		if jsxImport != "" {
			specifier := p.createSyntheticImport(jsxImport, file)
			moduleNames = append(moduleNames, specifier)
			jsxRuntimeImportSpecifier_ = &jsxRuntimeImportSpecifier{
				moduleReference: jsxImport,
				specifier:       specifier,
			}
		}
	}

	if len(moduleNames) != 0 {
		toParse = make([]string, 0, len(moduleNames))

		resolutions := p.resolveModuleNames(moduleNames, file)

		resolutionsInFile = make(module.ModeAwareCache[*module.ResolvedModule], len(resolutions))

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

			// const elideImport = isJSFileFromNodeModules && currentNodeModulesDepth > maxNodeModuleJsDepth;

			// Don't add the file if it has a bad extension (e.g. 'tsx' if we don't have '--allowJs')
			// This may still end up being an untyped module -- the file won't be included but imports will be allowed.
			hasAllowedExtension := false
			if p.compilerOptions.ResolveJsonModule.IsTrue() {
				hasAllowedExtension = tspath.FileExtensionIsOneOf(resolvedFileName, tspath.SupportedTSExtensionsWithJsonFlat)
			} else {
				hasAllowedExtension = tspath.FileExtensionIsOneOf(resolvedFileName, tspath.SupportedTSExtensionsFlat)
			}
			shouldAddFile := resolution.IsResolved() && hasAllowedExtension
			// TODO(ercornel): !!!: other checks on whether or not to add the file

			if shouldAddFile {
				// p.findSourceFile(resolvedFileName, FileIncludeReason{Import, 0})
				toParse = append(toParse, resolvedFileName)
			}
		}
	}

	return toParse, resolutionsInFile, importHelpersImportSpecifier, jsxRuntimeImportSpecifier_
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

func (p *fileLoader) createSyntheticImport(text string, file *ast.SourceFile) *ast.Node {
	p.factoryMu.Lock()
	defer p.factoryMu.Unlock()
	externalHelpersModuleReference := p.factory.NewStringLiteral(text)
	importDecl := p.factory.NewImportDeclaration(nil, nil, externalHelpersModuleReference, nil)
	// !!! addInternalEmitFlags(importDecl, InternalEmitFlags.NeverApplyImportHelper);
	externalHelpersModuleReference.Parent = importDecl
	importDecl.Parent = file.AsNode()
	// !!! externalHelpersModuleReference.Flags &^= ast.NodeFlagsSynthesized
	// !!! importDecl.Flags &^= ast.NodeFlagsSynthesized
	return externalHelpersModuleReference
}
