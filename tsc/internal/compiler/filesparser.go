package compiler

import (
	"math"
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
	isForAutomaticTypeDirective bool
	includeReason               *fileIncludeReason

	metadata                     ast.SourceFileMetaData
	resolutionsInFile            module.ModeAwareCache[*module.ResolvedModule]
	resolutionsTrace             []string
	typeResolutionsInFile        module.ModeAwareCache[*module.ResolvedTypeReferenceDirective]
	typeResolutionsTrace         []string
	resolutionDiagnostics        []*ast.Diagnostic
	importHelpersImportSpecifier *ast.Node
	jsxRuntimeImportSpecifier    *jsxRuntimeImportSpecifier
	increaseDepth                bool
	elideOnDepth                 bool

	// Track if this file is from an external library (node_modules)
	// This mirrors the TypeScript currentNodeModulesDepth > 0 check
	fromExternalLibrary bool

	loadedTask        *parseTask
	allIncludeReasons []*fileIncludeReason
}

func (t *parseTask) FileName() string {
	return t.normalizedFilePath
}

func (t *parseTask) Path() tspath.Path {
	return t.path
}

func (t *parseTask) isRoot() bool {
	// Intentionally not checking t.includeReason != nil to ensure we can catch cases for missing include reason
	return !t.isForAutomaticTypeDirective && (t.includeReason.kind == fileIncludeKindRootFile || t.includeReason.kind == fileIncludeKindLibFile)
}

func (t *parseTask) load(loader *fileLoader) {
	t.loaded = true
	t.path = loader.toPath(t.normalizedFilePath)
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
			includeReason := &fileIncludeReason{
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
		normalizedFilePath:  tspath.NormalizePath(fileName),
		libFile:             t.libFile,
		fromExternalLibrary: t.fromExternalLibrary,
		includeReason:       t.includeReason,
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
	fileName              string
	increaseDepth         bool
	elideOnDepth          bool
	isFromExternalLibrary bool
	includeReason         *fileIncludeReason
}

func (t *parseTask) addSubTask(ref resolvedRef, libFile *LibFile) {
	normalizedFilePath := tspath.NormalizePath(ref.fileName)
	subTask := &parseTask{
		normalizedFilePath:  normalizedFilePath,
		libFile:             libFile,
		increaseDepth:       ref.increaseDepth,
		elideOnDepth:        ref.elideOnDepth,
		fromExternalLibrary: ref.isFromExternalLibrary,
		includeReason:       ref.includeReason,
	}
	t.subTasks = append(t.subTasks, subTask)
}

type filesParser struct {
	wg              core.WorkGroup
	tasksByFileName collections.SyncMap[string, *queuedParseTask]
	maxDepth        int
}

type queuedParseTask struct {
	task                *parseTask
	mu                  sync.Mutex
	lowestDepth         int
	fromExternalLibrary bool
}

func (w *filesParser) parse(loader *fileLoader, tasks []*parseTask) {
	w.start(loader, tasks, 0, false)
	w.wg.RunAndWait()
}

func (w *filesParser) start(loader *fileLoader, tasks []*parseTask, depth int, isFromExternalLibrary bool) {
	for i, task := range tasks {
		taskIsFromExternalLibrary := isFromExternalLibrary || task.fromExternalLibrary
		newTask := &queuedParseTask{task: task, lowestDepth: math.MaxInt}
		loadedTask, loaded := w.tasksByFileName.LoadOrStore(task.FileName(), newTask)
		task = loadedTask.task
		if loaded {
			tasks[i].loadedTask = task
			// Add in the loaded task's external-ness.
			taskIsFromExternalLibrary = taskIsFromExternalLibrary || task.fromExternalLibrary
		}

		w.wg.Queue(func() {
			loadedTask.mu.Lock()
			defer loadedTask.mu.Unlock()

			startSubtasks := false

			currentDepth := depth
			if task.increaseDepth {
				currentDepth++
			}
			if currentDepth < loadedTask.lowestDepth {
				// If we're seeing this task at a lower depth than before,
				// reprocess its subtasks to ensure they are loaded.
				loadedTask.lowestDepth = currentDepth
				startSubtasks = true
			}

			if !task.isRoot() && taskIsFromExternalLibrary && !loadedTask.fromExternalLibrary {
				// If we're seeing this task now as an external library,
				// reprocess its subtasks to ensure they are also marked as external.
				loadedTask.fromExternalLibrary = true
				startSubtasks = true
			}

			if task.elideOnDepth && currentDepth > w.maxDepth {
				return
			}

			if !task.loaded {
				task.load(loader)
			}

			if startSubtasks {
				w.start(loader, task.subTasks, loadedTask.lowestDepth, loadedTask.fromExternalLibrary)
			}
		})
	}
}

func (w *filesParser) collect(loader *fileLoader, tasks []*parseTask, iterate func(*parseTask)) {
	// Mark all tasks we saw as external after the fact.
	w.tasksByFileName.Range(func(key string, value *queuedParseTask) bool {
		if value.fromExternalLibrary {
			value.task.fromExternalLibrary = true
		}
		return true
	})
	w.collectWorker(loader, tasks, iterate, collections.Set[*parseTask]{})
}

func (w *filesParser) collectWorker(loader *fileLoader, tasks []*parseTask, iterate func(*parseTask), seen collections.Set[*parseTask]) {
	for _, task := range tasks {
		if task.redirectedParseTask == nil {
			includeReason := task.includeReason
			if task.loadedTask != nil {
				task = task.loadedTask
			}
			if existing, ok := loader.includeProcessor.fileIncludeReasons[task.path]; ok {
				loader.includeProcessor.fileIncludeReasons[task.path] = append(existing, includeReason)
			} else {
				loader.includeProcessor.fileIncludeReasons[task.path] = []*fileIncludeReason{includeReason}
			}
		}
		// ensure we only walk each task once
		if !task.loaded || !seen.AddIfAbsent(task) {
			continue
		}
		for _, trace := range task.typeResolutionsTrace {
			loader.opts.Host.Trace(trace)
		}
		for _, trace := range task.resolutionsTrace {
			loader.opts.Host.Trace(trace)
		}
		if subTasks := task.subTasks; len(subTasks) > 0 {
			w.collectWorker(loader, subTasks, iterate, seen)
		}
		iterate(task)
	}
}
