package compiler

import (
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type fileLoaderWorkerTask interface {
	comparable
	FileName() string
	start(loader *fileLoader)
}

type fileLoaderWorker[K fileLoaderWorkerTask] struct {
	wg              core.WorkGroup
	tasksByFileName collections.SyncMap[string, K]
	getSubTasks     func(t K) []K
}

func (w *fileLoaderWorker[K]) runAndWait(loader *fileLoader, tasks []K) {
	w.start(loader, tasks)
	w.wg.RunAndWait()
}

func (w *fileLoaderWorker[K]) start(loader *fileLoader, tasks []K) {
	if len(tasks) > 0 {
		for i, task := range tasks {
			loadedTask, loaded := w.tasksByFileName.LoadOrStore(task.FileName(), task)
			if loaded {
				// dedup tasks to ensure correct file order, regardless of which task would be started first
				tasks[i] = loadedTask
			} else {
				w.wg.Queue(func() {
					task.start(loader)
					subTasks := w.getSubTasks(task)
					w.start(loader, subTasks)
				})
			}
		}
	}
}

func (w *fileLoaderWorker[K]) collect(loader *fileLoader, tasks []K, iterate func(K, []tspath.Path)) []tspath.Path {
	return w.collectWorker(loader, tasks, iterate, collections.Set[K]{})
}

func (w *fileLoaderWorker[K]) collectWorker(loader *fileLoader, tasks []K, iterate func(K, []tspath.Path), seen collections.Set[K]) []tspath.Path {
	var results []tspath.Path
	for _, task := range tasks {
		// ensure we only walk each task once
		if seen.Has(task) {
			continue
		}
		seen.Add(task)
		var subResults []tspath.Path
		if subTasks := w.getSubTasks(task); len(subTasks) > 0 {
			subResults = w.collectWorker(loader, subTasks, iterate, seen)
		}
		iterate(task, subResults)
		results = append(results, loader.toPath(task.FileName()))
	}
	return results
}
