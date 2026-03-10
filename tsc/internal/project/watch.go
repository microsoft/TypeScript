package project

import (
	"fmt"
	"maps"
	"slices"
	"strings"
	"sync"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/tspath"
)

const (
	minWatchLocationDepth = 2
)

type fileSystemWatcherKey struct {
	pattern string
	kind    lsproto.WatchKind
}

type fileSystemWatcherValue struct {
	count int
	id    WatcherID
}

type PatternsAndIgnored struct {
	patterns []string
	ignored  map[string]struct{}
}

func toFileSystemWatcherKey(w *lsproto.FileSystemWatcher) fileSystemWatcherKey {
	if w.GlobPattern.RelativePattern != nil {
		panic("relative globs not implemented")
	}
	kind := w.Kind
	if kind == nil {
		kind = new(lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete)
	}
	return fileSystemWatcherKey{pattern: *w.GlobPattern.Pattern, kind: *kind}
}

type WatcherID string

var watcherID atomic.Uint64

type WatchedFiles[T any] struct {
	name                string
	watchKind           lsproto.WatchKind
	computeGlobPatterns func(input T) PatternsAndIgnored

	mu                  sync.RWMutex
	input               T
	computeWatchersOnce sync.Once
	watchers            []*lsproto.FileSystemWatcher
	ignored             map[string]struct{}
	id                  uint64
}

func NewWatchedFiles[T any](name string, watchKind lsproto.WatchKind, computeGlobPatterns func(input T) PatternsAndIgnored) *WatchedFiles[T] {
	return &WatchedFiles[T]{
		id:                  watcherID.Add(1),
		name:                name,
		watchKind:           watchKind,
		computeGlobPatterns: computeGlobPatterns,
	}
}

func (w *WatchedFiles[T]) Watchers() (WatcherID, []*lsproto.FileSystemWatcher, map[string]struct{}) {
	w.computeWatchersOnce.Do(func() {
		w.mu.Lock()
		defer w.mu.Unlock()
		result := w.computeGlobPatterns(w.input)
		globs := result.patterns
		ignored := result.ignored
		// ignored is only used for logging and doesn't affect watcher identity
		w.ignored = ignored
		if !slices.EqualFunc(w.watchers, globs, func(a *lsproto.FileSystemWatcher, b string) bool {
			return *a.GlobPattern.Pattern == b
		}) {
			w.watchers = core.Map(globs, func(glob string) *lsproto.FileSystemWatcher {
				return &lsproto.FileSystemWatcher{
					GlobPattern: lsproto.PatternOrRelativePattern{
						Pattern: &glob,
					},
					Kind: &w.watchKind,
				}
			})
			w.id = watcherID.Add(1)
		}
	})

	w.mu.RLock()
	defer w.mu.RUnlock()
	return WatcherID(fmt.Sprintf("%s watcher %d", w.name, w.id)), w.watchers, w.ignored
}

func (w *WatchedFiles[T]) ID() WatcherID {
	if w == nil {
		return ""
	}
	id, _, _ := w.Watchers()
	return id
}

func (w *WatchedFiles[T]) Name() string {
	return w.name
}

func (w *WatchedFiles[T]) WatchKind() lsproto.WatchKind {
	return w.watchKind
}

func (w *WatchedFiles[T]) Clone(input T) *WatchedFiles[T] {
	if w == nil {
		return nil
	}
	w.mu.RLock()
	defer w.mu.RUnlock()
	return &WatchedFiles[T]{
		name:                w.name,
		watchKind:           w.watchKind,
		computeGlobPatterns: w.computeGlobPatterns,
		watchers:            w.watchers,
		input:               input,
	}
}

func createResolutionLookupGlobMapper(workspaceDirectory string, libDirectory string, currentDirectory string, useCaseSensitiveFileNames bool) func(data *collections.SyncSet[tspath.Path]) PatternsAndIgnored {
	workspaceDirectoryPath := tspath.ToPath(workspaceDirectory, currentDirectory, useCaseSensitiveFileNames)
	currentDirectoryPath := tspath.ToPath(currentDirectory, currentDirectory, useCaseSensitiveFileNames)
	libDirectoryPath := tspath.ToPath(libDirectory, currentDirectory, useCaseSensitiveFileNames)

	return func(data *collections.SyncSet[tspath.Path]) PatternsAndIgnored {
		var ignored map[string]struct{}
		var seenDirs collections.Set[tspath.Path]
		var includeWorkspace, includeRoot, includeLib bool
		var nodeModulesDirectories collections.Set[tspath.Path]
		var externalDirectories collections.Set[tspath.Path]

		if data != nil {
			data.Range(func(path tspath.Path) bool {
				// Assuming all of the input paths are file paths, we can avoid
				// duplicate work by only taking one file per dir, since their outputs
				// will always be the same.
				if !seenDirs.AddIfAbsent(path.GetDirectoryPath()) {
					return true
				}

				if workspaceDirectoryPath.ContainsPath(path) {
					includeWorkspace = true
				} else if currentDirectoryPath.ContainsPath(path) {
					includeRoot = true
				} else if libDirectoryPath.ContainsPath(path) {
					includeLib = true
				} else if idx := strings.Index(string(path), "/node_modules/"); idx != -1 {
					nodeModulesDirectories.Add(path[:idx+len("/node_modules")])
				} else {
					externalDirectories.Add(path.GetDirectoryPath())
				}
				return true
			})
		}

		var globs []string
		if includeWorkspace {
			globs = append(globs, getRecursiveGlobPattern(string(workspaceDirectoryPath)))
		}
		if includeRoot {
			globs = append(globs, getRecursiveGlobPattern(string(currentDirectoryPath)))
		}
		if includeLib {
			globs = append(globs, getRecursiveGlobPattern(string(libDirectoryPath)))
		}
		if nodeModulesDirectories.Len() > 0 {
			nodeModulesGlobs := make([]string, 0, nodeModulesDirectories.Len())
			for dir := range nodeModulesDirectories.Keys() {
				nodeModulesGlobs = append(nodeModulesGlobs, getRecursiveGlobPattern(string(dir)))
			}
			slices.Sort(nodeModulesGlobs)
			globs = append(globs, nodeModulesGlobs...)
		}
		if externalDirectories.Len() > 0 {
			externalDirStrings := make([]string, 0, externalDirectories.Len())
			for dir := range externalDirectories.Keys() {
				externalDirStrings = append(externalDirStrings, string(dir))
			}
			externalDirectoryParents, ignoredExternalDirs := tspath.GetCommonParents(
				externalDirStrings,
				minWatchLocationDepth,
				getPathComponentsForWatching,
				tspath.ComparePathsOptions{UseCaseSensitiveFileNames: true}, // Already using tspath.Path
			)
			slices.Sort(externalDirectoryParents)
			ignored = ignoredExternalDirs
			for _, dir := range externalDirectoryParents {
				globs = append(globs, getRecursiveGlobPattern(dir))
			}
		}

		return PatternsAndIgnored{
			patterns: globs,
			ignored:  ignored,
		}
	}
}

func getTypingsLocationsGlobs(
	typingsFiles []string,
	typingsLocation string,
	workspaceDirectory string,
	currentDirectory string,
	useCaseSensitiveFileNames bool,
) PatternsAndIgnored {
	var includeTypingsLocation, includeWorkspace bool
	externalDirectories := make(map[tspath.Path]string)
	globs := make(map[tspath.Path]string)
	comparePathsOptions := tspath.ComparePathsOptions{
		CurrentDirectory:          currentDirectory,
		UseCaseSensitiveFileNames: useCaseSensitiveFileNames,
	}
	for _, file := range typingsFiles {
		if tspath.ContainsPath(typingsLocation, file, comparePathsOptions) {
			includeTypingsLocation = true
		} else if !tspath.ContainsPath(workspaceDirectory, file, comparePathsOptions) {
			directory := tspath.GetDirectoryPath(file)
			externalDirectories[tspath.ToPath(directory, currentDirectory, useCaseSensitiveFileNames)] = directory
		} else {
			includeWorkspace = true
		}
	}
	externalDirectoryParents, ignored := tspath.GetCommonParents(
		slices.Collect(maps.Values(externalDirectories)),
		minWatchLocationDepth,
		getPathComponentsForWatching,
		comparePathsOptions,
	)
	slices.Sort(externalDirectoryParents)
	if includeWorkspace {
		globs[tspath.ToPath(workspaceDirectory, currentDirectory, useCaseSensitiveFileNames)] = getRecursiveGlobPattern(workspaceDirectory)
	}
	if includeTypingsLocation {
		globs[tspath.ToPath(typingsLocation, currentDirectory, useCaseSensitiveFileNames)] = getRecursiveGlobPattern(typingsLocation)
	}
	for _, dir := range externalDirectoryParents {
		globs[tspath.ToPath(dir, currentDirectory, useCaseSensitiveFileNames)] = getRecursiveGlobPattern(dir)
	}
	return PatternsAndIgnored{
		patterns: slices.Collect(maps.Values(globs)),
		ignored:  ignored,
	}
}

func getPathComponentsForWatching(path string, currentDirectory string) []string {
	components := tspath.GetPathComponents(path, currentDirectory)
	rootLength := perceivedOsRootLengthForWatching(components)
	if rootLength <= 1 {
		return components
	}
	newRoot := tspath.CombinePaths(components[0], components[1:rootLength]...)
	return append([]string{newRoot}, components[rootLength:]...)
}

func perceivedOsRootLengthForWatching(pathComponents []string) int {
	length := len(pathComponents)
	if length <= 1 {
		return length
	}
	if strings.HasPrefix(pathComponents[0], "//") {
		// Group UNC roots (//server/share) into a single component
		return 2
	}
	if len(pathComponents[0]) == 3 && tspath.IsVolumeCharacter(pathComponents[0][0]) && pathComponents[0][1] == ':' && pathComponents[0][2] == '/' {
		// Windows-style volume
		if strings.EqualFold(pathComponents[1], "users") {
			// Group C:/Users/username into a single component
			return min(3, length)
		}
		return 1
	}
	if pathComponents[1] == "home" {
		// Group /home/username into a single component
		return min(3, length)
	}
	return 1
}

func getRecursiveGlobPattern(directory string) string {
	return fmt.Sprintf("%s/%s", tspath.RemoveTrailingDirectorySeparator(directory), "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}")
}
