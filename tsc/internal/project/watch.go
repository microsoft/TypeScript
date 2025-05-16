package project

import (
	"context"
	"slices"

	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

const (
	fileGlobPattern          = "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}"
	recursiveFileGlobPattern = "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}"
)

type watchedFiles[T any] struct {
	client    Client
	getGlobs  func(data T) []string
	watchKind lsproto.WatchKind

	data      T
	globs     []string
	watcherID WatcherHandle
}

func newWatchedFiles[T any](client Client, watchKind lsproto.WatchKind, getGlobs func(data T) []string) *watchedFiles[T] {
	return &watchedFiles[T]{
		client:    client,
		watchKind: watchKind,
		getGlobs:  getGlobs,
	}
}

func (w *watchedFiles[T]) update(ctx context.Context, newData T) (updated bool, err error) {
	newGlobs := w.getGlobs(newData)
	w.data = newData
	if slices.Equal(w.globs, newGlobs) {
		return false, nil
	}

	w.globs = newGlobs
	if w.watcherID != "" {
		if err = w.client.UnwatchFiles(ctx, w.watcherID); err != nil {
			return false, err
		}
	}

	watchers := make([]*lsproto.FileSystemWatcher, 0, len(newGlobs))
	for _, glob := range newGlobs {
		watchers = append(watchers, &lsproto.FileSystemWatcher{
			GlobPattern: lsproto.PatternOrRelativePattern{
				Pattern: &glob,
			},
			Kind: &w.watchKind,
		})
	}
	watcherID, err := w.client.WatchFiles(ctx, watchers)
	if err != nil {
		return false, err
	}
	w.watcherID = watcherID
	return true, nil
}
