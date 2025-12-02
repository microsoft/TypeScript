package compiler

import (
	"math"
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type parseTask struct {
	normalizedFilePath          string
	path                        tspath.Path
	file                        *ast.SourceFile
	libFile                     *LibFile
	redirectedParseTask         *parseTask
	subTasks                    []*parseTask
	loaded                      bool
	startedSubTasks             bool
	isForAutomaticTypeDirective bool
	includeReason               *FileIncludeReason

	metadata                     ast.SourceFileMetaData
	resolutionsInFile            module.ModeAwareCache[*module.ResolvedModule]
	resolutionsTrace             []module.DiagAndArgs
	typeResolutionsInFile        module.ModeAwareCache[*module.ResolvedTypeReferenceDirective]
	typeResolutionsTrace         []module.DiagAndArgs
	resolutionDiagnostics        []*ast.Diagnostic
	importHelpersImportSpecifier *ast.Node
	jsxRuntimeImportSpecifier    *jsxRuntimeImportSpecifier

	increaseDepth bool
	elideOnDepth  bool

	loadedTask        *parseTask
	allIncludeReasons []*FileIncludeReason
}

func (t *parseTask) FileName() string {
	return t.normalizedFilePath
}

func (t *parseTask) Path() tspath.Path {
	return t.path
}

func (t *parseTask) load(loader *fileLoader) {
	t.loaded = true
	if t.isForAutomaticTypeDirective {
		t.loadAutomaticTypeDirectives(loader)
		return
	}
	redirect := loader.projectReferenceFileMapper.getParseFileRedirect(t)
	if redirect != "" {
		t.redirect(loader, redirect)
		return
	}

	loader.totalFileCount.Add(1)
	if t.libFile != nil {
		loader.libFileCount.Add(1)
	}

	t.metadata = loader.loadSourceFileMetaData(t.normalizedFilePath)
	file := loader.parseSourceFile(t)
	if file == nil {
		return
	}

	t.file = file
	t.subTasks = make([]*parseTask, 0, len(file.ReferencedFiles)+len(file.Imports())+len(file.ModuleAugmentations))

	for index, ref := range file.ReferencedFiles {
		resolvedPath := loader.resolveTripleslashPathReference(ref.FileName, file.FileName(), index)
		t.addSubTask(resolvedPath, nil)
	}

	compilerOptions := loader.opts.Config.CompilerOptions()
	loader.resolveTypeReferenceDirectives(t)

	if compilerOptions.NoLib != core.TSTrue {
		for index, lib := range file.LibReferenceDirectives {
			includeReason := &FileIncludeReason{
				kind: fileIncludeKindLibReferenceDirective,
				data: &referencedFileData{
					file:  t.path,
					index: index,
				},
			}
			if name, ok := tsoptions.GetLibFileName(lib.FileName); ok {
				libFile := loader.pathForLibFile(name)
				t.addSubTask(resolvedRef{
					fileName:      libFile.path,
					includeReason: includeReason,
				}, libFile)
			} else {
				loader.includeProcessor.addProcessingDiagnostic(&processingDiagnostic{
					kind: processingDiagnosticKindUnknownReference,
					data: includeReason,
				})
			}
		}
	}

	loader.resolveImportsAndModuleAugmentations(t)
}

func (t *parseTask) redirect(loader *fileLoader, fileName string) {
	t.redirectedParseTask = &parseTask{
		normalizedFilePath: tspath.NormalizePath(fileName),
		libFile:            t.libFile,
		includeReason:      t.includeReason,
	}
	// increaseDepth and elideOnDepth are not copied to redirects, otherwise their depth would be double counted.
	t.subTasks = []*parseTask{t.redirectedParseTask}
}

func (t *parseTask) loadAutomaticTypeDirectives(loader *fileLoader) {
	toParseTypeRefs, typeResolutionsInFile, typeResolutionsTrace := loader.resolveAutomaticTypeDirectives(t.normalizedFilePath)
	t.typeResolutionsInFile = typeResolutionsInFile
	t.typeResolutionsTrace = typeResolutionsTrace
	for _, typeResolution := range toParseTypeRefs {
		t.addSubTask(typeResolution, nil)
	}
}

type resolvedRef struct {
	fileName      string
	increaseDepth bool
	elideOnDepth  bool
	includeReason *FileIncludeReason
}

func (t *parseTask) addSubTask(ref resolvedRef, libFile *LibFile) {
	normalizedFilePath := tspath.NormalizePath(ref.fileName)
	subTask := &parseTask{
		normalizedFilePath: normalizedFilePath,
		libFile:            libFile,
		increaseDepth:      ref.increaseDepth,
		elideOnDepth:       ref.elideOnDepth,
		includeReason:      ref.includeReason,
	}
	t.subTasks = append(t.subTasks, subTask)
}

type filesParser struct {
	wg             core.WorkGroup
	taskDataByPath collections.SyncMap[tspath.Path, *parseTaskData]
	maxDepth       int
}

type parseTaskData struct {
	// map of tasks by file casing
	tasks           map[string]*parseTask
	mu              sync.Mutex
	lowestDepth     int
	startedSubTasks bool
}

func (w *filesParser) parse(loader *fileLoader, tasks []*parseTask) {
	w.start(loader, tasks, 0)
	w.wg.RunAndWait()
}

func (w *filesParser) start(loader *fileLoader, tasks []*parseTask, depth int) {
	for i, task := range tasks {
		task.path = loader.toPath(task.normalizedFilePath)
		data, loaded := w.taskDataByPath.LoadOrStore(task.path, &parseTaskData{
			tasks:       map[string]*parseTask{task.normalizedFilePath: task},
			lowestDepth: math.MaxInt,
		})

		w.wg.Queue(func() {
			data.mu.Lock()
			defer data.mu.Unlock()

			startSubtasks := false
			if loaded {
				if existingTask, ok := data.tasks[task.normalizedFilePath]; ok {
					tasks[i].loadedTask = existingTask
				} else {
					data.tasks[task.normalizedFilePath] = task
					// This is new task for file name - so load subtasks if there was loading for any other casing
					startSubtasks = data.startedSubTasks
				}
			}

			currentDepth := core.IfElse(task.increaseDepth, depth+1, depth)
			if currentDepth < data.lowestDepth {
				// If we're seeing this task at a lower depth than before,
				// reprocess its subtasks to ensure they are loaded.
				data.lowestDepth = currentDepth
				startSubtasks = true
				data.startedSubTasks = true
			}

			if task.elideOnDepth && currentDepth > w.maxDepth {
				return
			}

			for _, taskByFileName := range data.tasks {
				loadSubTasks := startSubtasks
				if !taskByFileName.loaded {
					taskByFileName.load(loader)
					if taskByFileName.redirectedParseTask != nil {
						// Always load redirected task
						loadSubTasks = true
						data.startedSubTasks = true
					}
				}
				if !taskByFileName.startedSubTasks && loadSubTasks {
					taskByFileName.startedSubTasks = true
					w.start(loader, taskByFileName.subTasks, data.lowestDepth)
				}
			}
		})
	}
}

func (w *filesParser) getProcessedFiles(loader *fileLoader) processedFiles {
	totalFileCount := int(loader.totalFileCount.Load())
	libFileCount := int(loader.libFileCount.Load())

	var missingFiles []string
	files := make([]*ast.SourceFile, 0, totalFileCount-libFileCount)
	libFiles := make([]*ast.SourceFile, 0, totalFileCount) // totalFileCount here since we append files to it later to construct the final list

	filesByPath := make(map[tspath.Path]*ast.SourceFile, totalFileCount)
	// stores 'filename -> file association' ignoring case
	// used to track cases when two file names differ only in casing
	var tasksSeenByNameIgnoreCase map[string]*parseTask
	if loader.comparePathsOptions.UseCaseSensitiveFileNames {
		tasksSeenByNameIgnoreCase = make(map[string]*parseTask, totalFileCount)
	}

	loader.includeProcessor.fileIncludeReasons = make(map[tspath.Path][]*FileIncludeReason, totalFileCount)
	var outputFileToProjectReferenceSource map[tspath.Path]string
	if !loader.opts.canUseProjectReferenceSource() {
		outputFileToProjectReferenceSource = make(map[tspath.Path]string, totalFileCount)
	}
	resolvedModules := make(map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule], totalFileCount+1)
	typeResolutionsInFile := make(map[tspath.Path]module.ModeAwareCache[*module.ResolvedTypeReferenceDirective], totalFileCount)
	sourceFileMetaDatas := make(map[tspath.Path]ast.SourceFileMetaData, totalFileCount)
	var jsxRuntimeImportSpecifiers map[tspath.Path]*jsxRuntimeImportSpecifier
	var importHelpersImportSpecifiers map[tspath.Path]*ast.Node
	var sourceFilesFoundSearchingNodeModules collections.Set[tspath.Path]
	libFilesMap := make(map[tspath.Path]*LibFile, libFileCount)

	var collectFiles func(tasks []*parseTask, seen map[*parseTaskData]string)
	collectFiles = func(tasks []*parseTask, seen map[*parseTaskData]string) {
		for _, task := range tasks {
			includeReason := task.includeReason
			// Exclude automatic type directive tasks from include reason processing,
			// as these are internal implementation details and should not contribute
			// to the reasons for including files.
			if task.redirectedParseTask == nil && !task.isForAutomaticTypeDirective {
				if task.loadedTask != nil {
					task = task.loadedTask
				}
				w.addIncludeReason(loader, task, includeReason)
			}
			data, _ := w.taskDataByPath.Load(task.path)
			if !task.loaded {
				continue
			}

			// ensure we only walk each task once
			if checkedName, ok := seen[data]; ok {
				if !loader.opts.Config.CompilerOptions().ForceConsistentCasingInFileNames.IsFalse() {
					// Check if it differs only in drive letters its ok to ignore that error:
					checkedAbsolutePath := tspath.GetNormalizedAbsolutePathWithoutRoot(checkedName, loader.comparePathsOptions.CurrentDirectory)
					inputAbsolutePath := tspath.GetNormalizedAbsolutePathWithoutRoot(task.normalizedFilePath, loader.comparePathsOptions.CurrentDirectory)
					if checkedAbsolutePath != inputAbsolutePath {
						loader.includeProcessor.addProcessingDiagnosticsForFileCasing(task.path, checkedName, task.normalizedFilePath, includeReason)
					}
				}
				continue
			} else {
				seen[data] = task.normalizedFilePath
			}

			if tasksSeenByNameIgnoreCase != nil {
				pathLowerCase := tspath.ToFileNameLowerCase(string(task.path))
				if taskByIgnoreCase, ok := tasksSeenByNameIgnoreCase[pathLowerCase]; ok {
					loader.includeProcessor.addProcessingDiagnosticsForFileCasing(taskByIgnoreCase.path, taskByIgnoreCase.normalizedFilePath, task.normalizedFilePath, includeReason)
				} else {
					tasksSeenByNameIgnoreCase[pathLowerCase] = task
				}
			}

			for _, trace := range task.typeResolutionsTrace {
				loader.opts.Host.Trace(trace.Message, trace.Args...)
			}
			for _, trace := range task.resolutionsTrace {
				loader.opts.Host.Trace(trace.Message, trace.Args...)
			}
			if subTasks := task.subTasks; len(subTasks) > 0 {
				collectFiles(subTasks, seen)
			}

			// Exclude automatic type directive tasks from include reason processing,
			// as these are internal implementation details and should not contribute
			// to the reasons for including files.
			if task.redirectedParseTask != nil {
				if !loader.opts.canUseProjectReferenceSource() {
					outputFileToProjectReferenceSource[task.redirectedParseTask.path] = task.FileName()
				}
				continue
			}

			if task.isForAutomaticTypeDirective {
				typeResolutionsInFile[task.path] = task.typeResolutionsInFile
				continue
			}
			file := task.file
			path := task.path
			if file == nil {
				// !!! sheetal file preprocessing diagnostic explaining getSourceFileFromReferenceWorker
				missingFiles = append(missingFiles, task.normalizedFilePath)
				continue
			}

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
			if data.lowestDepth > 0 {
				sourceFilesFoundSearchingNodeModules.Add(path)
			}
		}
	}

	collectFiles(loader.rootTasks, make(map[*parseTaskData]string, totalFileCount))
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
			loader.opts.Host.Trace(trace.Message, trace.Args...)
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
		sourceFilesFoundSearchingNodeModules: sourceFilesFoundSearchingNodeModules,
		libFiles:                             libFilesMap,
		missingFiles:                         missingFiles,
		includeProcessor:                     loader.includeProcessor,
		outputFileToProjectReferenceSource:   outputFileToProjectReferenceSource,
	}
}

func (w *filesParser) addIncludeReason(loader *fileLoader, task *parseTask, reason *FileIncludeReason) {
	if task.redirectedParseTask != nil {
		w.addIncludeReason(loader, task.redirectedParseTask, reason)
	} else if task.loaded {
		if existing, ok := loader.includeProcessor.fileIncludeReasons[task.path]; ok {
			loader.includeProcessor.fileIncludeReasons[task.path] = append(existing, reason)
		} else {
			loader.includeProcessor.fileIncludeReasons[task.path] = []*FileIncludeReason{reason}
		}
	}
}
