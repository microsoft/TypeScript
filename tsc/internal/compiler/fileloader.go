package compiler

import (
	"cmp"
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

type libResolution struct {
	libraryName string
	resolution  *module.ResolvedModule
	trace       []string
}

type LibFile struct {
	Name     string
	path     string
	Replaced bool
}

type fileLoader struct {
	opts                ProgramOptions
	resolver            *module.Resolver
	defaultLibraryPath  string
	comparePathsOptions tspath.ComparePathsOptions
	supportedExtensions []string

	filesParser      *filesParser
	rootTasks        []*parseTask
	includeProcessor *includeProcessor

	totalFileCount atomic.Int32
	libFileCount   atomic.Int32

	factoryMu sync.Mutex
	factory   ast.NodeFactory

	projectReferenceFileMapper *projectReferenceFileMapper
	dtsDirectories             collections.Set[tspath.Path]

	pathForLibFileCache       collections.SyncMap[string, *LibFile]
	pathForLibFileResolutions collections.SyncMap[tspath.Path, *libResolution]
}

type processedFiles struct {
	resolver                      *module.Resolver
	files                         []*ast.SourceFile
	filesByPath                   map[tspath.Path]*ast.SourceFile
	projectReferenceFileMapper    *projectReferenceFileMapper
	missingFiles                  []string
	resolvedModules               map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule]
	typeResolutionsInFile         map[tspath.Path]module.ModeAwareCache[*module.ResolvedTypeReferenceDirective]
	sourceFileMetaDatas           map[tspath.Path]ast.SourceFileMetaData
	jsxRuntimeImportSpecifiers    map[tspath.Path]*jsxRuntimeImportSpecifier
	importHelpersImportSpecifiers map[tspath.Path]*ast.Node
	libFiles                      map[tspath.Path]*LibFile
	// List of present unsupported extensions
	unsupportedExtensions                []string
	sourceFilesFoundSearchingNodeModules collections.Set[tspath.Path]
	includeProcessor                     *includeProcessor
	// if file was included using source file and its output is actually part of program
	// this contains mapping from output to source file
	outputFileToProjectReferenceSource map[tspath.Path]string
}

type jsxRuntimeImportSpecifier struct {
	moduleReference string
	specifier       *ast.Node
}

func processAllProgramFiles(
	opts ProgramOptions,
	singleThreaded bool,
) processedFiles {
	compilerOptions := opts.Config.CompilerOptions()
	rootFiles := opts.Config.FileNames()
	supportedExtensions := tsoptions.GetSupportedExtensions(compilerOptions, nil /*extraFileExtensions*/)
	var maxNodeModuleJsDepth int
	if p := opts.Config.CompilerOptions().MaxNodeModuleJsDepth; p != nil {
		maxNodeModuleJsDepth = *p
	}
	loader := fileLoader{
		opts:               opts,
		defaultLibraryPath: tspath.GetNormalizedAbsolutePath(opts.Host.DefaultLibraryPath(), opts.Host.GetCurrentDirectory()),
		comparePathsOptions: tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: opts.Host.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          opts.Host.GetCurrentDirectory(),
		},
		filesParser: &filesParser{
			wg:       core.NewWorkGroup(singleThreaded),
			maxDepth: maxNodeModuleJsDepth,
		},
		rootTasks:           make([]*parseTask, 0, len(rootFiles)+len(compilerOptions.Lib)),
		supportedExtensions: core.Flatten(tsoptions.GetSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions)),
		includeProcessor:    &includeProcessor{},
	}
	loader.addProjectReferenceTasks(singleThreaded)
	loader.resolver = module.NewResolver(loader.projectReferenceFileMapper.host, compilerOptions, opts.TypingsLocation, opts.ProjectName)
	for index, rootFile := range rootFiles {
		loader.addRootTask(rootFile, nil, &fileIncludeReason{kind: fileIncludeKindRootFile, data: index})
	}
	if len(rootFiles) > 0 && compilerOptions.NoLib.IsFalseOrUnknown() {
		if compilerOptions.Lib == nil {
			name := tsoptions.GetDefaultLibFileName(compilerOptions)
			libFile := loader.pathForLibFile(name)
			loader.addRootTask(libFile.path, libFile, &fileIncludeReason{kind: fileIncludeKindLibFile})

		} else {
			for index, lib := range compilerOptions.Lib {
				if name, ok := tsoptions.GetLibFileName(lib); ok {
					libFile := loader.pathForLibFile(name)
					loader.addRootTask(libFile.path, libFile, &fileIncludeReason{kind: fileIncludeKindLibFile, data: index})
				}
				// !!! error on unknown name
			}
		}
	}

	if len(rootFiles) > 0 {
		loader.addAutomaticTypeDirectiveTasks()
	}

	loader.filesParser.parse(&loader, loader.rootTasks)
	// Clear out loader and host to ensure its not used post program creation
	loader.projectReferenceFileMapper.loader = nil
	loader.projectReferenceFileMapper.host = nil

	totalFileCount := int(loader.totalFileCount.Load())
	libFileCount := int(loader.libFileCount.Load())

	var missingFiles []string
	files := make([]*ast.SourceFile, 0, totalFileCount-libFileCount)
	libFiles := make([]*ast.SourceFile, 0, totalFileCount) // totalFileCount here since we append files to it later to construct the final list

	filesByPath := make(map[tspath.Path]*ast.SourceFile, totalFileCount)
	loader.includeProcessor.fileIncludeReasons = make(map[tspath.Path][]*fileIncludeReason, totalFileCount)
	var outputFileToProjectReferenceSource map[tspath.Path]string
	if !opts.canUseProjectReferenceSource() {
		outputFileToProjectReferenceSource = make(map[tspath.Path]string, totalFileCount)
	}
	resolvedModules := make(map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule], totalFileCount+1)
	typeResolutionsInFile := make(map[tspath.Path]module.ModeAwareCache[*module.ResolvedTypeReferenceDirective], totalFileCount)
	sourceFileMetaDatas := make(map[tspath.Path]ast.SourceFileMetaData, totalFileCount)
	var jsxRuntimeImportSpecifiers map[tspath.Path]*jsxRuntimeImportSpecifier
	var importHelpersImportSpecifiers map[tspath.Path]*ast.Node
	var unsupportedExtensions []string
	var sourceFilesFoundSearchingNodeModules collections.Set[tspath.Path]
	libFilesMap := make(map[tspath.Path]*LibFile, libFileCount)

	loader.filesParser.collect(&loader, loader.rootTasks, func(task *parseTask) {
		if task.redirectedParseTask != nil {
			if !opts.canUseProjectReferenceSource() {
				outputFileToProjectReferenceSource[task.redirectedParseTask.path] = task.FileName()
			}
			return
		}

		if task.isForAutomaticTypeDirective {
			typeResolutionsInFile[task.path] = task.typeResolutionsInFile
			return
		}
		file := task.file
		path := task.path
		if file == nil {
			// !!! sheetal file preprocessing diagnostic explaining getSourceFileFromReferenceWorker
			missingFiles = append(missingFiles, task.normalizedFilePath)
			return
		}

		// !!! sheetal todo porting file case errors
		// if _, ok := filesByPath[path]; ok {
		// 	Check if it differs only in drive letters its ok to ignore that error:
		// 	const checkedAbsolutePath = getNormalizedAbsolutePathWithoutRoot(checkedName, currentDirectory);
		// 	const inputAbsolutePath = getNormalizedAbsolutePathWithoutRoot(fileName, currentDirectory);
		// 	if (checkedAbsolutePath !== inputAbsolutePath) {
		// 	    reportFileNamesDifferOnlyInCasingError(fileName, file, reason);
		// 	}
		// } else if loader.comparePathsOptions.UseCaseSensitiveFileNames {
		// 	pathIgnoreCase := tspath.ToPath(file.FileName(), loader.comparePathsOptions.CurrentDirectory, false)
		// 	// for case-sensitsive file systems check if we've already seen some file with similar filename ignoring case
		// 	if _, ok := filesByNameIgnoreCase[pathIgnoreCase]; ok {
		// 		reportFileNamesDifferOnlyInCasingError(fileName, existingFile, reason);
		// 	} else {
		// 		filesByNameIgnoreCase[pathIgnoreCase] = file
		// 	}
		// }

		if task.libFile != nil {
			libFiles = append(libFiles, file)
			libFilesMap[path] = task.libFile
		} else {
			files = append(files, file)
		}
		filesByPath[path] = file
		resolvedModules[path] = task.resolutionsInFile
		typeResolutionsInFile[path] = task.typeResolutionsInFile
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
		extension := tspath.TryGetExtensionFromPath(file.FileName())
		if slices.Contains(tspath.SupportedJSExtensionsFlat, extension) {
			unsupportedExtensions = core.AppendIfUnique(unsupportedExtensions, extension)
		}
		if task.fromExternalLibrary {
			sourceFilesFoundSearchingNodeModules.Add(path)
		}
	})
	loader.sortLibs(libFiles)

	allFiles := append(libFiles, files...)

	keys := slices.Collect(loader.pathForLibFileResolutions.Keys())
	slices.Sort(keys)
	for _, key := range keys {
		value, _ := loader.pathForLibFileResolutions.Load(key)
		resolvedModules[key] = module.ModeAwareCache[*module.ResolvedModule]{
			module.ModeAwareCacheKey{Name: value.libraryName, Mode: core.ModuleKindCommonJS}: value.resolution,
		}
		for _, trace := range value.trace {
			opts.Host.Trace(trace)
		}
	}

	return processedFiles{
		resolver:                             loader.resolver,
		files:                                allFiles,
		filesByPath:                          filesByPath,
		projectReferenceFileMapper:           loader.projectReferenceFileMapper,
		resolvedModules:                      resolvedModules,
		typeResolutionsInFile:                typeResolutionsInFile,
		sourceFileMetaDatas:                  sourceFileMetaDatas,
		jsxRuntimeImportSpecifiers:           jsxRuntimeImportSpecifiers,
		importHelpersImportSpecifiers:        importHelpersImportSpecifiers,
		unsupportedExtensions:                unsupportedExtensions,
		sourceFilesFoundSearchingNodeModules: sourceFilesFoundSearchingNodeModules,
		libFiles:                             libFilesMap,
		includeProcessor:                     loader.includeProcessor,
		outputFileToProjectReferenceSource:   outputFileToProjectReferenceSource,
	}
}

func (p *fileLoader) toPath(file string) tspath.Path {
	return tspath.ToPath(file, p.opts.Host.GetCurrentDirectory(), p.opts.Host.FS().UseCaseSensitiveFileNames())
}

func (p *fileLoader) addRootTask(fileName string, libFile *LibFile, includeReason *fileIncludeReason) {
	absPath := tspath.GetNormalizedAbsolutePath(fileName, p.opts.Host.GetCurrentDirectory())
	if core.Tristate.IsTrue(p.opts.Config.CompilerOptions().AllowNonTsExtensions) || slices.Contains(p.supportedExtensions, tspath.TryGetExtensionFromPath(absPath)) {
		p.rootTasks = append(p.rootTasks, &parseTask{
			normalizedFilePath: absPath,
			libFile:            libFile,
			includeReason:      includeReason,
		})
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
	p.rootTasks = append(p.rootTasks, &parseTask{
		normalizedFilePath:          containingFileName,
		isForAutomaticTypeDirective: true,
	})
}

func (p *fileLoader) resolveAutomaticTypeDirectives(containingFileName string) (
	toParse []resolvedRef,
	typeResolutionsInFile module.ModeAwareCache[*module.ResolvedTypeReferenceDirective],
	typeResolutionsTrace []string,
) {
	automaticTypeDirectiveNames := module.GetAutomaticTypeDirectiveNames(p.opts.Config.CompilerOptions(), p.opts.Host)
	if len(automaticTypeDirectiveNames) != 0 {
		toParse = make([]resolvedRef, 0, len(automaticTypeDirectiveNames))
		typeResolutionsInFile = make(module.ModeAwareCache[*module.ResolvedTypeReferenceDirective], len(automaticTypeDirectiveNames))
		for _, name := range automaticTypeDirectiveNames {
			resolutionMode := core.ModuleKindNodeNext
			resolved, trace := p.resolver.ResolveTypeReferenceDirective(name, containingFileName, resolutionMode, nil)
			typeResolutionsInFile[module.ModeAwareCacheKey{Name: name, Mode: resolutionMode}] = resolved
			typeResolutionsTrace = append(typeResolutionsTrace, trace...)
			if resolved.IsResolved() {
				toParse = append(toParse, resolvedRef{
					fileName:      resolved.ResolvedFileName,
					increaseDepth: resolved.IsExternalLibraryImport,
					elideOnDepth:  false,
					includeReason: &fileIncludeReason{
						kind: fileIncludeKindAutomaticTypeDirectiveFile,
						data: &automaticTypeDirectiveFileData{name, resolved.PackageId},
					},
				})
			}
		}
	}
	return toParse, typeResolutionsInFile, typeResolutionsTrace
}

func (p *fileLoader) addProjectReferenceTasks(singleThreaded bool) {
	p.projectReferenceFileMapper = &projectReferenceFileMapper{
		opts: p.opts,
		host: p.opts.Host,
	}
	projectReferences := p.opts.Config.ResolvedProjectReferencePaths()
	if len(projectReferences) == 0 {
		return
	}

	parser := &projectReferenceParser{
		loader: p,
		wg:     core.NewWorkGroup(singleThreaded),
	}
	rootTasks := createProjectReferenceParseTasks(projectReferences)
	parser.parse(rootTasks)

	// Add files from project references as root if the module kind is 'none'.
	// This ensures that files from project references are included in the root tasks
	// when no module system is specified, allowing including all files for global symbol merging
	// !!! sheetal Do we really need it?
	if len(p.opts.Config.FileNames()) != 0 {
		for index, resolved := range p.projectReferenceFileMapper.getResolvedProjectReferences() {
			if resolved == nil || resolved.CompilerOptions().GetEmitModuleKind() != core.ModuleKindNone {
				continue
			}
			if p.opts.canUseProjectReferenceSource() {
				for _, fileName := range resolved.FileNames() {
					p.rootTasks = append(p.rootTasks, &parseTask{
						normalizedFilePath: fileName,
						includeReason: &fileIncludeReason{
							kind: fileIncludeKindSourceFromProjectReference,
							data: index,
						},
					})
				}
			} else {
				for outputDts := range resolved.GetOutputDeclarationFileNames() {
					if outputDts != "" {
						p.rootTasks = append(p.rootTasks, &parseTask{
							normalizedFilePath: outputDts,
							includeReason: &fileIncludeReason{
								kind: fileIncludeKindOutputFromProjectReference,
								data: index,
							},
						})
					}
				}
			}
		}
	}
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

func (p *fileLoader) loadSourceFileMetaData(fileName string) ast.SourceFileMetaData {
	packageJsonScope := p.resolver.GetPackageJsonScopeIfApplicable(fileName)
	var packageJsonType, packageJsonDirectory string
	if packageJsonScope.Exists() {
		packageJsonDirectory = packageJsonScope.PackageDirectory
		if value, ok := packageJsonScope.Contents.Type.GetValue(); ok {
			packageJsonType = value
		}
	}
	impliedNodeFormat := ast.GetImpliedNodeFormatForFile(fileName, packageJsonType)
	return ast.SourceFileMetaData{
		PackageJsonType:      packageJsonType,
		PackageJsonDirectory: packageJsonDirectory,
		ImpliedNodeFormat:    impliedNodeFormat,
	}
}

func (p *fileLoader) parseSourceFile(t *parseTask) *ast.SourceFile {
	path := p.toPath(t.normalizedFilePath)
	options := p.projectReferenceFileMapper.getCompilerOptionsForFile(t)
	sourceFile := p.opts.Host.GetSourceFile(ast.SourceFileParseOptions{
		FileName:                       t.normalizedFilePath,
		Path:                           path,
		CompilerOptions:                ast.GetSourceFileAffectingCompilerOptions(t.normalizedFilePath, options),
		ExternalModuleIndicatorOptions: ast.GetExternalModuleIndicatorOptions(t.normalizedFilePath, options, t.metadata),
		JSDocParsingMode:               p.opts.JSDocParsingMode,
	})
	return sourceFile
}

func (p *fileLoader) resolveTripleslashPathReference(moduleName string, containingFile string, index int) resolvedRef {
	basePath := tspath.GetDirectoryPath(containingFile)
	referencedFileName := moduleName

	if !tspath.IsRootedDiskPath(moduleName) {
		referencedFileName = tspath.CombinePaths(basePath, moduleName)
	}
	return resolvedRef{
		fileName: tspath.NormalizePath(referencedFileName),
		includeReason: &fileIncludeReason{
			kind: fileIncludeKindReferenceFile,
			data: &referencedFileData{
				file:  p.toPath(containingFile),
				index: index,
			},
		},
	}
}

func (p *fileLoader) resolveTypeReferenceDirectives(t *parseTask) {
	file := t.file
	if len(file.TypeReferenceDirectives) == 0 {
		return
	}
	meta := t.metadata

	typeResolutionsInFile := make(module.ModeAwareCache[*module.ResolvedTypeReferenceDirective], len(file.TypeReferenceDirectives))
	var typeResolutionsTrace []string
	for index, ref := range file.TypeReferenceDirectives {
		redirect, fileName := p.projectReferenceFileMapper.getRedirectForResolution(file)
		resolutionMode := getModeForTypeReferenceDirectiveInFile(ref, file, meta, module.GetCompilerOptionsWithRedirect(p.opts.Config.CompilerOptions(), redirect))
		resolved, trace := p.resolver.ResolveTypeReferenceDirective(ref.FileName, fileName, resolutionMode, redirect)
		typeResolutionsInFile[module.ModeAwareCacheKey{Name: ref.FileName, Mode: resolutionMode}] = resolved
		includeReason := &fileIncludeReason{
			kind: fileIncludeKindTypeReferenceDirective,
			data: &referencedFileData{
				file:  t.path,
				index: index,
			},
		}
		typeResolutionsTrace = append(typeResolutionsTrace, trace...)

		if resolved.IsResolved() {
			t.addSubTask(resolvedRef{
				fileName:              resolved.ResolvedFileName,
				increaseDepth:         resolved.IsExternalLibraryImport,
				elideOnDepth:          false,
				isFromExternalLibrary: resolved.IsExternalLibraryImport,
				includeReason:         includeReason,
			}, nil)
		} else {
			p.includeProcessor.addProcessingDiagnostic(&processingDiagnostic{
				kind: processingDiagnosticKindUnknownReference,
				data: includeReason,
			})
		}
	}

	t.typeResolutionsInFile = typeResolutionsInFile
	t.typeResolutionsTrace = typeResolutionsTrace
}

const externalHelpersModuleNameText = "tslib" // TODO(jakebailey): dedupe

func (p *fileLoader) resolveImportsAndModuleAugmentations(t *parseTask) {
	file := t.file
	meta := t.metadata

	moduleNames := make([]*ast.Node, 0, len(file.Imports())+len(file.ModuleAugmentations)+2)

	isJavaScriptFile := ast.IsSourceFileJS(file)
	isExternalModuleFile := ast.IsExternalModule(file)

	redirect, fileName := p.projectReferenceFileMapper.getRedirectForResolution(file)
	optionsForFile := module.GetCompilerOptionsWithRedirect(p.opts.Config.CompilerOptions(), redirect)
	if isJavaScriptFile || (!file.IsDeclarationFile && (optionsForFile.GetIsolatedModules() || isExternalModuleFile)) {
		if optionsForFile.ImportHelpers.IsTrue() {
			specifier := p.createSyntheticImport(externalHelpersModuleNameText, file)
			moduleNames = append(moduleNames, specifier)
			t.importHelpersImportSpecifier = specifier
		}

		jsxImport := ast.GetJSXRuntimeImport(ast.GetJSXImplicitImportBase(optionsForFile, file), optionsForFile)
		if jsxImport != "" {
			specifier := p.createSyntheticImport(jsxImport, file)
			moduleNames = append(moduleNames, specifier)
			t.jsxRuntimeImportSpecifier = &jsxRuntimeImportSpecifier{
				moduleReference: jsxImport,
				specifier:       specifier,
			}
		}
	}

	importsStart := len(moduleNames)

	moduleNames = append(moduleNames, file.Imports()...)
	for _, imp := range file.ModuleAugmentations {
		if imp.Kind == ast.KindStringLiteral {
			moduleNames = append(moduleNames, imp)
		}
		// Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
	}

	if len(moduleNames) != 0 {
		resolutionsInFile := make(module.ModeAwareCache[*module.ResolvedModule], len(moduleNames))
		var resolutionsTrace []string

		for index, entry := range moduleNames {
			moduleName := entry.Text()
			if moduleName == "" {
				continue
			}

			mode := getModeForUsageLocation(file.FileName(), meta, entry, optionsForFile)
			resolvedModule, trace := p.resolver.ResolveModuleName(moduleName, fileName, mode, redirect)
			resolutionsInFile[module.ModeAwareCacheKey{Name: moduleName, Mode: mode}] = resolvedModule
			resolutionsTrace = append(resolutionsTrace, trace...)

			if !resolvedModule.IsResolved() {
				continue
			}

			resolvedFileName := resolvedModule.ResolvedFileName
			isFromNodeModulesSearch := resolvedModule.IsExternalLibraryImport
			// Don't treat redirected files as JS files.
			isJsFile := !tspath.FileExtensionIsOneOf(resolvedFileName, tspath.SupportedTSExtensionsWithJsonFlat) && p.projectReferenceFileMapper.getRedirectParsedCommandLineForResolution(ast.NewHasFileName(resolvedFileName, p.toPath(resolvedFileName))) == nil
			isJsFileFromNodeModules := isFromNodeModulesSearch && isJsFile && strings.Contains(resolvedFileName, "/node_modules/")

			// add file to program only if:
			// - resolution was successful
			// - noResolve is falsy
			// - module name comes from the list of imports
			// - it's not a top level JavaScript module that exceeded the search max

			importIndex := index - importsStart

			shouldAddFile := moduleName != "" &&
				module.GetResolutionDiagnostic(optionsForFile, resolvedModule, file) == nil &&
				!optionsForFile.NoResolve.IsTrue() &&
				!(isJsFile && !optionsForFile.GetAllowJS()) &&
				(importIndex < 0 || (importIndex < len(file.Imports()) && (ast.IsInJSFile(file.Imports()[importIndex]) || file.Imports()[importIndex].Flags&ast.NodeFlagsJSDoc == 0)))

			if shouldAddFile {
				t.addSubTask(resolvedRef{
					fileName:              resolvedFileName,
					increaseDepth:         resolvedModule.IsExternalLibraryImport,
					elideOnDepth:          isJsFileFromNodeModules,
					isFromExternalLibrary: resolvedModule.IsExternalLibraryImport,
					includeReason: &fileIncludeReason{
						kind: fileIncludeKindImport,
						data: &referencedFileData{
							file:      t.path,
							index:     importIndex,
							synthetic: core.IfElse(importIndex < 0, entry, nil),
						},
					},
				}, nil)
			}
		}

		t.resolutionsInFile = resolutionsInFile
		t.resolutionsTrace = resolutionsTrace
	}
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

func (p *fileLoader) pathForLibFile(name string) *LibFile {
	if cached, ok := p.pathForLibFileCache.Load(name); ok {
		return cached
	}

	path := tspath.CombinePaths(p.defaultLibraryPath, name)
	replaced := false
	if p.opts.Config.CompilerOptions().LibReplacement.IsTrue() && name != "lib.d.ts" {
		libraryName := getLibraryNameFromLibFileName(name)
		resolveFrom := getInferredLibraryNameResolveFrom(p.opts.Config.CompilerOptions(), p.opts.Host.GetCurrentDirectory(), name)
		resolution, trace := p.resolver.ResolveModuleName(libraryName, resolveFrom, core.ModuleKindCommonJS, nil)
		if resolution.IsResolved() {
			path = resolution.ResolvedFileName
			replaced = true
		}
		p.pathForLibFileResolutions.LoadOrStore(p.toPath(resolveFrom), &libResolution{
			libraryName: libraryName,
			resolution:  resolution,
			trace:       trace,
		})
	}

	libPath, _ := p.pathForLibFileCache.LoadOrStore(name, &LibFile{name, path, replaced})
	return libPath
}

func getLibraryNameFromLibFileName(libFileName string) string {
	// Support resolving to lib.dom.d.ts -> @typescript/lib-dom, and
	//                      lib.dom.iterable.d.ts -> @typescript/lib-dom/iterable
	//                      lib.es2015.symbol.wellknown.d.ts -> @typescript/lib-es2015/symbol-wellknown
	components := strings.Split(libFileName, ".")
	var path string
	if len(components) > 1 {
		path = components[1]
	}
	i := 2
	for i < len(components) && components[i] != "" && components[i] != "d" {
		path += core.IfElse(i == 2, "/", "-") + components[i]
		i++
	}
	return "@typescript/lib-" + path
}

func getInferredLibraryNameResolveFrom(options *core.CompilerOptions, currentDirectory string, libFileName string) string {
	var containingDirectory string
	if options.ConfigFilePath != "" {
		containingDirectory = tspath.GetDirectoryPath(options.ConfigFilePath)
	} else {
		containingDirectory = currentDirectory
	}
	return tspath.CombinePaths(containingDirectory, "__lib_node_modules_lookup_"+libFileName+"__.ts")
}

func getModeForTypeReferenceDirectiveInFile(ref *ast.FileReference, file *ast.SourceFile, meta ast.SourceFileMetaData, options *core.CompilerOptions) core.ResolutionMode {
	if ref.ResolutionMode != core.ResolutionModeNone {
		return ref.ResolutionMode
	} else {
		return getDefaultResolutionModeForFile(file.FileName(), meta, options)
	}
}

func getDefaultResolutionModeForFile(fileName string, meta ast.SourceFileMetaData, options *core.CompilerOptions) core.ResolutionMode {
	if importSyntaxAffectsModuleResolution(options) {
		return ast.GetImpliedNodeFormatForEmitWorker(fileName, options.GetEmitModuleKind(), meta)
	} else {
		return core.ResolutionModeNone
	}
}

func getModeForUsageLocation(fileName string, meta ast.SourceFileMetaData, usage *ast.StringLiteralLike, options *core.CompilerOptions) core.ResolutionMode {
	if ast.IsImportDeclaration(usage.Parent) || usage.Parent.Kind == ast.KindJSImportDeclaration || ast.IsExportDeclaration(usage.Parent) || ast.IsJSDocImportTag(usage.Parent) {
		isTypeOnly := ast.IsExclusivelyTypeOnlyImportOrExport(usage.Parent)
		if isTypeOnly {
			var override core.ResolutionMode
			var ok bool
			switch usage.Parent.Kind {
			case ast.KindImportDeclaration, ast.KindJSImportDeclaration:
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

func getEmitSyntaxForUsageLocationWorker(fileName string, meta ast.SourceFileMetaData, usage *ast.Node, options *core.CompilerOptions) core.ResolutionMode {
	if ast.IsRequireCall(usage.Parent, false /*requireStringLiteralLikeArgument*/) || ast.IsExternalModuleReference(usage.Parent) && ast.IsImportEqualsDeclaration(usage.Parent.Parent) {
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
