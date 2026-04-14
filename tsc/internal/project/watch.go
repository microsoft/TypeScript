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
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
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
	directoriesOutsideWorkspace []string
	patternsInsideWorkspace     []string
	ignored                     map[string]struct{}
}

// toFileSystemWatcherKey produces a deduplication key for a file system watcher.
// Note: this key is a simple string concatenation of the base and pattern, so
// structurally different watchers (Pattern vs RelativePattern, URI vs WorkspaceFolder)
// could theoretically collide. In practice, workspace watchers use plain Pattern
// with filesystem paths while outside-workspace watchers use RelativePattern with
// file:// URIs, so collisions don't occur.
func toFileSystemWatcherKey(w *lsproto.FileSystemWatcher) fileSystemWatcherKey {
	kind := w.Kind
	if kind == nil {
		kind = new(lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete)
	}
	var pattern string
	if w.GlobPattern.Pattern != nil {
		pattern = *w.GlobPattern.Pattern
	} else if w.GlobPattern.RelativePattern != nil {
		var base string
		if w.GlobPattern.RelativePattern.BaseUri.URI != nil {
			base = string(*w.GlobPattern.RelativePattern.BaseUri.URI)
		} else if w.GlobPattern.RelativePattern.BaseUri.WorkspaceFolder != nil {
			panic("workspace folder-based relative patterns not implemented")
		}
		pattern = base + "/" + w.GlobPattern.RelativePattern.Pattern
	}
	return fileSystemWatcherKey{pattern: pattern, kind: *kind}
}

func fileSystemWatcherGlobString(w *lsproto.FileSystemWatcher) string {
	if w.GlobPattern.Pattern != nil {
		return *w.GlobPattern.Pattern
	}
	if w.GlobPattern.RelativePattern != nil {
		var base string
		if w.GlobPattern.RelativePattern.BaseUri.URI != nil {
			base = string(*w.GlobPattern.RelativePattern.BaseUri.URI)
		} else if w.GlobPattern.RelativePattern.BaseUri.WorkspaceFolder != nil {
			panic("workspace folder-based relative patterns not implemented")
		}
		return base + "/" + w.GlobPattern.RelativePattern.Pattern
	}
	return ""
}

type WatcherID string

var watcherID atomic.Uint64

type WatchedFiles[T any] struct {
	name                         string
	watchKind                    lsproto.WatchKind
	hasRelativePatternCapability bool
	computeGlobPatterns          func(input T) PatternsAndIgnored

	mu                       sync.RWMutex
	input                    T
	computeWatchersOnce      sync.Once
	workspaceWatchers        []*lsproto.FileSystemWatcher
	outsideWorkspaceWatchers []*lsproto.FileSystemWatcher
	ignored                  map[string]struct{}
	id                       uint64
}

func NewWatchedFiles[T any](name string, watchKind lsproto.WatchKind, hasRelativePatternCapability bool, computeGlobPatterns func(input T) PatternsAndIgnored) *WatchedFiles[T] {
	return &WatchedFiles[T]{
		id:                           watcherID.Add(1),
		name:                         name,
		watchKind:                    watchKind,
		hasRelativePatternCapability: hasRelativePatternCapability,
		computeGlobPatterns:          computeGlobPatterns,
	}
}

type Watchers struct {
	WatcherID                WatcherID
	WorkspaceWatchers        []*lsproto.FileSystemWatcher
	OutsideWorkspaceWatchers []*lsproto.FileSystemWatcher
	IgnoredPaths             map[string]struct{}
}

func (w *WatchedFiles[T]) Watchers() Watchers {
	w.computeWatchersOnce.Do(func() {
		w.mu.Lock()
		defer w.mu.Unlock()
		result := w.computeGlobPatterns(w.input)
		globs := result.patternsInsideWorkspace

		ignored := result.ignored
		// ignored is only used for logging and doesn't affect watcher identity
		w.ignored = ignored
		changed := false
		if !slices.EqualFunc(w.workspaceWatchers, globs, func(a *lsproto.FileSystemWatcher, b string) bool {
			return *a.GlobPattern.Pattern == b
		}) {
			w.workspaceWatchers = core.Map(globs, func(glob string) *lsproto.FileSystemWatcher {
				return &lsproto.FileSystemWatcher{
					GlobPattern: lsproto.PatternOrRelativePattern{
						Pattern: &glob,
					},
					Kind: &w.watchKind,
				}
			})
			changed = true
		}
		dirsOutside := result.directoriesOutsideWorkspace
		if !slices.EqualFunc(w.outsideWorkspaceWatchers, dirsOutside, func(a *lsproto.FileSystemWatcher, b string) bool {
			return fileSystemWatcherGlobString(a) == recursiveDirectoryGlobPattern(b, w.hasRelativePatternCapability)
		}) {
			w.outsideWorkspaceWatchers = core.Map(dirsOutside, func(dir string) *lsproto.FileSystemWatcher {
				return newRecursiveDirectoryWatcher(dir, w.watchKind, w.hasRelativePatternCapability)
			})
			changed = true
		}
		if changed {
			w.id = watcherID.Add(1)
		}
	})

	w.mu.RLock()
	defer w.mu.RUnlock()
	return Watchers{
		WatcherID:                WatcherID(fmt.Sprintf("%s watcher %d", w.name, w.id)),
		WorkspaceWatchers:        w.workspaceWatchers,
		OutsideWorkspaceWatchers: w.outsideWorkspaceWatchers,
		IgnoredPaths:             w.ignored,
	}
}

func (w *WatchedFiles[T]) ID() WatcherID {
	if w == nil {
		return ""
	}
	return w.Watchers().WatcherID
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
		name:                         w.name,
		watchKind:                    w.watchKind,
		hasRelativePatternCapability: w.hasRelativePatternCapability,
		computeGlobPatterns:          w.computeGlobPatterns,
		workspaceWatchers:            w.workspaceWatchers,
		outsideWorkspaceWatchers:     w.outsideWorkspaceWatchers,
		input:                        input,
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
				if tspath.IsDynamicFileName(string(path)) {
					return true
				}
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
		var outsideDirs []string
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
			outsideDirs = externalDirectoryParents
		}

		return PatternsAndIgnored{
			directoriesOutsideWorkspace: outsideDirs,
			patternsInsideWorkspace:     globs,
			ignored:                     ignored,
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
	return PatternsAndIgnored{
		directoriesOutsideWorkspace: externalDirectoryParents,
		patternsInsideWorkspace:     slices.Collect(maps.Values(globs)),
		ignored:                     ignored,
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
	return fmt.Sprintf("%s/%s", tspath.RemoveTrailingDirectorySeparator(directory), "**/*")
}

// recursiveDirectoryGlobPattern returns the string form of a recursive watcher
// for the given directory that would be produced by newRecursiveDirectoryWatcher.
func recursiveDirectoryGlobPattern(directory string, useRelativePattern bool) string {
	if useRelativePattern {
		return string(lsconv.FileNameToDocumentURI(directory)) + "/**/*"
	}
	return getRecursiveGlobPattern(directory)
}

// newRecursiveDirectoryWatcher creates a FileSystemWatcher for recursively
// watching a directory. When useRelativePattern is true, a RelativePattern with
// a file:// base URI is used; otherwise a plain glob Pattern is used.
func newRecursiveDirectoryWatcher(directory string, kind lsproto.WatchKind, useRelativePattern bool) *lsproto.FileSystemWatcher {
	if useRelativePattern {
		baseUri := lsproto.URI(lsconv.FileNameToDocumentURI(directory))
		return &lsproto.FileSystemWatcher{
			GlobPattern: lsproto.PatternOrRelativePattern{
				RelativePattern: &lsproto.RelativePattern{
					BaseUri: lsproto.WorkspaceFolderOrURI{
						URI: &baseUri,
					},
					Pattern: "**/*",
				},
			},
			Kind: &kind,
		}
	}
	glob := getRecursiveGlobPattern(directory)
	return &lsproto.FileSystemWatcher{
		GlobPattern: lsproto.PatternOrRelativePattern{
			Pattern: &glob,
		},
		Kind: &kind,
	}
}
