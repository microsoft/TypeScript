package compiler

import (
	"math"
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type fileLoaderWorkerTask[T any] interface {
	comparable
	FileName() string
	isLoaded() bool
	load(loader *fileLoader)
	getSubTasks() []T
	shouldIncreaseDepth() bool
	shouldElideOnDepth() bool
	isRoot() bool
	isFromExternalLibrary() bool
	markFromExternalLibrary()
}

type fileLoaderWorker[K fileLoaderWorkerTask[K]] struct {
	wg              core.WorkGroup
	tasksByFileName collections.SyncMap[string, *queuedTask[K]]
	maxDepth        int
}

type queuedTask[K fileLoaderWorkerTask[K]] struct {
	task                K
	mu                  sync.Mutex
	lowestDepth         int
	fromExternalLibrary bool
}

func (w *fileLoaderWorker[K]) runAndWait(loader *fileLoader, tasks []K) {
	w.start(loader, tasks, 0, false)
	w.wg.RunAndWait()
}

func (w *fileLoaderWorker[K]) start(loader *fileLoader, tasks []K, depth int, isFromExternalLibrary bool) {
	for i, task := range tasks {
		taskIsFromExternalLibrary := isFromExternalLibrary || task.isFromExternalLibrary()
		newTask := &queuedTask[K]{task: task, lowestDepth: math.MaxInt}
		loadedTask, loaded := w.tasksByFileName.LoadOrStore(task.FileName(), newTask)
		task = loadedTask.task
		if loaded {
			tasks[i] = task
			// Add in the loaded task's external-ness.
			taskIsFromExternalLibrary = taskIsFromExternalLibrary || task.isFromExternalLibrary()
		}

		w.wg.Queue(func() {
			loadedTask.mu.Lock()
			defer loadedTask.mu.Unlock()

			startSubtasks := false

			currentDepth := depth
			if task.shouldIncreaseDepth() {
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

			if task.shouldElideOnDepth() && currentDepth > w.maxDepth {
				return
			}

			if !task.isLoaded() {
				task.load(loader)
			}

			if startSubtasks {
				w.start(loader, task.getSubTasks(), loadedTask.lowestDepth, loadedTask.fromExternalLibrary)
			}
		})
	}
}

func (w *fileLoaderWorker[K]) collect(loader *fileLoader, tasks []K, iterate func(K, []tspath.Path)) []tspath.Path {
	// Mark all tasks we saw as external after the fact.
	w.tasksByFileName.Range(func(key string, value *queuedTask[K]) bool {
		if value.fromExternalLibrary {
			value.task.markFromExternalLibrary()
		}
		return true
	})
	return w.collectWorker(loader, tasks, iterate, collections.Set[K]{})
}

func (w *fileLoaderWorker[K]) collectWorker(loader *fileLoader, tasks []K, iterate func(K, []tspath.Path), seen collections.Set[K]) []tspath.Path {
	var results []tspath.Path
	for _, task := range tasks {
		// ensure we only walk each task once
		if !task.isLoaded() || seen.Has(task) {
			continue
		}
		seen.Add(task)
		var subResults []tspath.Path
		if subTasks := task.getSubTasks(); len(subTasks) > 0 {
			subResults = w.collectWorker(loader, subTasks, iterate, seen)
		}
		iterate(task, subResults)
		results = append(results, loader.toPath(task.FileName()))
	}
	return results
}
