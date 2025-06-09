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
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type fileLoader struct {
	opts                ProgramOptions
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
	missingFiles                  []string
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
	opts ProgramOptions,
	resolver *module.Resolver,
	libs []string,
	singleThreaded bool,
) processedFiles {
	compilerOptions := opts.Config.CompilerOptions()
	rootFiles := opts.Config.FileNames()
	supportedExtensions := tsoptions.GetSupportedExtensions(compilerOptions, nil /*extraFileExtensions*/)
	loader := fileLoader{
		opts:               opts,
		resolver:           resolver,
		defaultLibraryPath: tspath.GetNormalizedAbsolutePath(opts.Host.DefaultLibraryPath(), opts.Host.GetCurrentDirectory()),
		comparePathsOptions: tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: opts.Host.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          opts.Host.GetCurrentDirectory(),
		},
		wg:                  core.NewWorkGroup(singleThreaded),
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

	var missingFiles []string
	files := make([]*ast.SourceFile, 0, totalFileCount-libFileCount)
	libFiles := make([]*ast.SourceFile, 0, totalFileCount) // totalFileCount here since we append files to it later to construct the final list

	resolvedModules := make(map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule], totalFileCount)
	sourceFileMetaDatas := make(map[tspath.Path]*ast.SourceFileMetaData, totalFileCount)
	var jsxRuntimeImportSpecifiers map[tspath.Path]*jsxRuntimeImportSpecifier
	var importHelpersImportSpecifiers map[tspath.Path]*ast.Node

	for task := range loader.collectTasks(loader.rootTasks) {
		file := task.file
		if file == nil {
			missingFiles = append(missingFiles, task.normalizedFilePath)
			continue
		}
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
		absPath := tspath.GetNormalizedAbsolutePath(fileName, p.opts.Host.GetCurrentDirectory())
		if core.Tristate.IsTrue(p.opts.Config.CompilerOptions().AllowNonTsExtensions) || slices.Contains(p.supportedExtensions, tspath.TryGetExtensionFromPath(absPath)) {
			p.rootTasks = append(p.rootTasks, &parseTask{normalizedFilePath: absPath, isLib: isLib})
		}
	}
}

func (p *fileLoader) addAutomaticTypeDirectiveTasks() {
	var containingDirectory string
	compilerOptions := p.opts.Config.CompilerOptions()
	if compilerOptions.ConfigFilePath != "" {
		containingDirectory = tspath.GetDirectoryPath(compilerOptions.ConfigFilePath)
	} else {
		containingDirectory = p.opts.Host.GetCurrentDirectory()
	}
	containingFileName := tspath.CombinePaths(containingDirectory, module.InferredTypesContainingFile)

	automaticTypeDirectiveNames := module.GetAutomaticTypeDirectiveNames(compilerOptions, p.opts.Host)
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

		if !yield(task) {
			return false
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
		if file == nil {
			return
		}

		t.file = file
		t.metadata = loader.loadSourceFileMetaData(file.FileName())

		// !!! if noResolve, skip all of this
		t.subTasks = make([]*parseTask, 0, len(file.ReferencedFiles)+len(file.Imports())+len(file.ModuleAugmentations))

		for _, ref := range file.ReferencedFiles {
			resolvedPath := loader.resolveTripleslashPathReference(ref.FileName, file.FileName())
			t.addSubTask(resolvedPath, false)
		}

		compilerOptions := loader.opts.Config.CompilerOptions()
		for _, ref := range file.TypeReferenceDirectives {
			resolutionMode := getModeForTypeReferenceDirectiveInFile(ref, file, t.metadata, compilerOptions)
			resolved := loader.resolver.ResolveTypeReferenceDirective(ref.FileName, file.FileName(), resolutionMode, nil)
			if resolved.IsResolved() {
				t.addSubTask(resolved.ResolvedFileName, false)
			}
		}

		if compilerOptions.NoLib != core.TSTrue {
			for _, lib := range file.LibReferenceDirectives {
				name, ok := tsoptions.GetLibFileName(lib.FileName)
				if !ok {
					continue
				}
				t.addSubTask(tspath.CombinePaths(loader.defaultLibraryPath, name), true)
			}
		}

		toParse, resolutionsInFile, importHelpersImportSpecifier, jsxRuntimeImportSpecifier := loader.resolveImportsAndModuleAugmentations(file, t.metadata)
		for _, imp := range toParse {
			t.addSubTask(imp, false)
		}

		t.resolutionsInFile = resolutionsInFile
		t.importHelpersImportSpecifier = importHelpersImportSpecifier
		t.jsxRuntimeImportSpecifier = jsxRuntimeImportSpecifier

		loader.startTasks(t.subTasks)
	})
}

func (p *fileLoader) loadSourceFileMetaData(fileName string) *ast.SourceFileMetaData {
	packageJsonScope := p.resolver.GetPackageJsonScopeIfApplicable(fileName)
	var packageJsonType, packageJsonDirectory string
	if packageJsonScope.Exists() {
		packageJsonDirectory = packageJsonScope.PackageDirectory
		if value, ok := packageJsonScope.Contents.Type.GetValue(); ok {
			packageJsonType = value
		}
	}
	impliedNodeFormat := ast.GetImpliedNodeFormatForFile(fileName, packageJsonType)
	return &ast.SourceFileMetaData{
		PackageJsonType:      packageJsonType,
		PackageJsonDirectory: packageJsonDirectory,
		ImpliedNodeFormat:    impliedNodeFormat,
	}
}

func (p *fileLoader) parseSourceFile(fileName string) *ast.SourceFile {
	path := tspath.ToPath(fileName, p.opts.Host.GetCurrentDirectory(), p.opts.Host.FS().UseCaseSensitiveFileNames())
	sourceFile := p.opts.Host.GetSourceFile(fileName, path, p.opts.Config.CompilerOptions().GetEmitScriptTarget())
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

func (p *fileLoader) resolveImportsAndModuleAugmentations(file *ast.SourceFile, meta *ast.SourceFileMetaData) (
	toParse []string,
	resolutionsInFile module.ModeAwareCache[*module.ResolvedModule],
	importHelpersImportSpecifier *ast.Node,
	jsxRuntimeImportSpecifier_ *jsxRuntimeImportSpecifier,
) {
	moduleNames := make([]*ast.Node, 0, len(file.Imports())+len(file.ModuleAugmentations)+2)
	moduleNames = append(moduleNames, file.Imports()...)
	for _, imp := range file.ModuleAugmentations {
		if imp.Kind == ast.KindStringLiteral {
			moduleNames = append(moduleNames, imp)
		}
		// Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
	}

	isJavaScriptFile := ast.IsSourceFileJS(file)
	isExternalModuleFile := ast.IsExternalModule(file)

	compilerOptions := p.opts.Config.CompilerOptions()
	if isJavaScriptFile || (!file.IsDeclarationFile && (compilerOptions.GetIsolatedModules() || isExternalModuleFile)) {
		if compilerOptions.ImportHelpers.IsTrue() {
			specifier := p.createSyntheticImport(externalHelpersModuleNameText, file)
			moduleNames = append(moduleNames, specifier)
			importHelpersImportSpecifier = specifier
		}

		jsxImport := ast.GetJSXRuntimeImport(ast.GetJSXImplicitImportBase(compilerOptions, file), compilerOptions)
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

		resolutions := p.resolveModuleNames(moduleNames, file, meta)
		optionsForFile := p.getCompilerOptionsForFile(file)

		resolutionsInFile = make(module.ModeAwareCache[*module.ResolvedModule], len(resolutions))

		for _, resolution := range resolutions {
			resolvedFileName := resolution.resolvedModule.ResolvedFileName
			// TODO(ercornel): !!!: check if from node modules

			mode := getModeForUsageLocation(file.FileName(), meta, resolution.node, optionsForFile)
			resolutionsInFile[module.ModeAwareCacheKey{Name: resolution.node.Text(), Mode: mode}] = resolution.resolvedModule

			// add file to program only if:
			// - resolution was successful
			// - noResolve is falsy
			// - module name comes from the list of imports
			// - it's not a top level JavaScript module that exceeded the search max

			// const elideImport = isJSFileFromNodeModules && currentNodeModulesDepth > maxNodeModuleJsDepth;

			// Don't add the file if it has a bad extension (e.g. 'tsx' if we don't have '--allowJs')
			// This may still end up being an untyped module -- the file won't be included but imports will be allowed.
			hasAllowedExtension := false
			if compilerOptions.GetResolveJsonModule() {
				hasAllowedExtension = tspath.FileExtensionIsOneOf(resolvedFileName, tspath.SupportedTSExtensionsWithJsonFlat)
			} else if compilerOptions.AllowJs.IsTrue() {
				hasAllowedExtension = tspath.FileExtensionIsOneOf(resolvedFileName, tspath.SupportedJSExtensionsFlat) || tspath.FileExtensionIsOneOf(resolvedFileName, tspath.SupportedTSExtensionsFlat)
			} else {
				hasAllowedExtension = tspath.FileExtensionIsOneOf(resolvedFileName, tspath.SupportedTSExtensionsFlat)
			}
			shouldAddFile := resolution.resolvedModule.IsResolved() && hasAllowedExtension
			// TODO(ercornel): !!!: other checks on whether or not to add the file

			if shouldAddFile {
				// p.findSourceFile(resolvedFileName, FileIncludeReason{Import, 0})
				toParse = append(toParse, resolvedFileName)
			}
		}
	}

	return toParse, resolutionsInFile, importHelpersImportSpecifier, jsxRuntimeImportSpecifier_
}

func (p *fileLoader) resolveModuleNames(entries []*ast.Node, file *ast.SourceFile, meta *ast.SourceFileMetaData) []*resolution {
	if len(entries) == 0 {
		return nil
	}

	resolvedModules := make([]*resolution, 0, len(entries))

	for _, entry := range entries {
		moduleName := entry.Text()
		if moduleName == "" {
			continue
		}
		resolvedModule := p.resolver.ResolveModuleName(moduleName, file.FileName(), getModeForUsageLocation(file.FileName(), meta, entry, p.opts.Config.CompilerOptions()), nil)
		resolvedModules = append(resolvedModules, &resolution{node: entry, resolvedModule: resolvedModule})
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

type resolution struct {
	node           *ast.Node
	resolvedModule *module.ResolvedModule
}

func (p *fileLoader) getCompilerOptionsForFile(file *ast.SourceFile) *core.CompilerOptions {
	// !!! return getRedirectReferenceForResolution(file)?.commandLine.options || options;
	return p.opts.Config.CompilerOptions()
}

func getModeForTypeReferenceDirectiveInFile(ref *ast.FileReference, file *ast.SourceFile, meta *ast.SourceFileMetaData, options *core.CompilerOptions) core.ResolutionMode {
	if ref.ResolutionMode != core.ResolutionModeNone {
		return ref.ResolutionMode
	} else {
		return getDefaultResolutionModeForFile(file.FileName(), meta, options)
	}
}

func getDefaultResolutionModeForFile(fileName string, meta *ast.SourceFileMetaData, options *core.CompilerOptions) core.ResolutionMode {
	if importSyntaxAffectsModuleResolution(options) {
		return ast.GetImpliedNodeFormatForEmitWorker(fileName, options, meta)
	} else {
		return core.ResolutionModeNone
	}
}

func getModeForUsageLocation(fileName string, meta *ast.SourceFileMetaData, usage *ast.StringLiteralLike, options *core.CompilerOptions) core.ResolutionMode {
	if ast.IsImportDeclaration(usage.Parent) || ast.IsExportDeclaration(usage.Parent) || ast.IsJSDocImportTag(usage.Parent) {
		isTypeOnly := ast.IsExclusivelyTypeOnlyImportOrExport(usage.Parent)
		if isTypeOnly {
			var override core.ResolutionMode
			var ok bool
			switch usage.Parent.Kind {
			case ast.KindImportDeclaration:
				override, ok = usage.Parent.AsImportDeclaration().Attributes.GetResolutionModeOverride()
			case ast.KindExportDeclaration:
				override, ok = usage.Parent.AsExportDeclaration().Attributes.GetResolutionModeOverride()
			case ast.KindJSDocImportTag:
				override, ok = usage.Parent.AsJSDocImportTag().Attributes.GetResolutionModeOverride()
			}
			if ok {
				return override
			}
		}
	}
	if ast.IsLiteralTypeNode(usage.Parent) && ast.IsImportTypeNode(usage.Parent.Parent) {
		if override, ok := usage.Parent.Parent.AsImportTypeNode().Attributes.GetResolutionModeOverride(); ok {
			return override
		}
	}

	if options != nil && importSyntaxAffectsModuleResolution(options) {
		return getEmitSyntaxForUsageLocationWorker(fileName, meta, usage, options)
	}

	return core.ResolutionModeNone
}

func importSyntaxAffectsModuleResolution(options *core.CompilerOptions) bool {
	moduleResolution := options.GetModuleResolutionKind()
	return core.ModuleResolutionKindNode16 <= moduleResolution && moduleResolution <= core.ModuleResolutionKindNodeNext ||
		options.GetResolvePackageJsonExports() || options.GetResolvePackageJsonImports()
}

func getEmitSyntaxForUsageLocationWorker(fileName string, meta *ast.SourceFileMetaData, usage *ast.Node, options *core.CompilerOptions) core.ResolutionMode {
	if ast.IsRequireCall(usage.Parent) || ast.IsExternalModuleReference(usage.Parent) && ast.IsImportEqualsDeclaration(usage.Parent.Parent) {
		return core.ModuleKindCommonJS
	}
	fileEmitMode := ast.GetEmitModuleFormatOfFileWorker(fileName, options, meta)
	if ast.IsImportCall(ast.WalkUpParenthesizedExpressions(usage.Parent)) {
		if ast.ShouldTransformImportCall(fileName, options, fileEmitMode) {
			return core.ModuleKindCommonJS
		} else {
			return core.ModuleKindESNext
		}
	}
	// If we're in --module preserve on an input file, we know that an import
	// is an import. But if this is a declaration file, we'd prefer to use the
	// impliedNodeFormat. Since we want things to be consistent between the two,
	// we need to issue errors when the user writes ESM syntax in a definitely-CJS
	// file, until/unless declaration emit can indicate a true ESM import. On the
	// other hand, writing CJS syntax in a definitely-ESM file is fine, since declaration
	// emit preserves the CJS syntax.
	if fileEmitMode == core.ModuleKindCommonJS {
		return core.ModuleKindCommonJS
	} else {
		if fileEmitMode.IsNonNodeESM() || fileEmitMode == core.ModuleKindPreserve {
			return core.ModuleKindESNext
		}
	}
	return core.ModuleKindNone
}
