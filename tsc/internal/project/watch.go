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
	"github.com/microsoft/typescript-go/internal/glob"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/tspath"
)

const (
	fileGlobPattern          = "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}"
	recursiveFileGlobPattern = "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}"
)

type WatcherID string

var watcherID atomic.Uint64

type WatchedFiles[T any] struct {
	name                string
	watchKind           lsproto.WatchKind
	computeGlobPatterns func(input T) []string

	input                  T
	computeWatchersOnce    sync.Once
	watchers               []*lsproto.FileSystemWatcher
	computeParsedGlobsOnce sync.Once
	parsedGlobs            []*glob.Glob
	id                     uint64
}

func NewWatchedFiles[T any](name string, watchKind lsproto.WatchKind, computeGlobPatterns func(input T) []string) *WatchedFiles[T] {
	return &WatchedFiles[T]{
		id:                  watcherID.Add(1),
		name:                name,
		watchKind:           watchKind,
		computeGlobPatterns: computeGlobPatterns,
	}
}

func (w *WatchedFiles[T]) Watchers() (WatcherID, []*lsproto.FileSystemWatcher) {
	w.computeWatchersOnce.Do(func() {
		newWatchers := core.Map(w.computeGlobPatterns(w.input), func(glob string) *lsproto.FileSystemWatcher {
			return &lsproto.FileSystemWatcher{
				GlobPattern: lsproto.PatternOrRelativePattern{
					Pattern: &glob,
				},
				Kind: &w.watchKind,
			}
		})
		if !slices.EqualFunc(w.watchers, newWatchers, func(a, b *lsproto.FileSystemWatcher) bool {
			return *a.GlobPattern.Pattern == *b.GlobPattern.Pattern
		}) {
			w.watchers = newWatchers
			w.id = watcherID.Add(1)
		}
	})
	return WatcherID(fmt.Sprintf("%s watcher %d", w.name, w.id)), w.watchers
}

func (w *WatchedFiles[T]) ID() WatcherID {
	if w == nil {
		return ""
	}
	id, _ := w.Watchers()
	return id
}

func (w *WatchedFiles[T]) Name() string {
	return w.name
}

func (w *WatchedFiles[T]) WatchKind() lsproto.WatchKind {
	return w.watchKind
}

func (w *WatchedFiles[T]) ParsedGlobs() []*glob.Glob {
	w.computeParsedGlobsOnce.Do(func() {
		patterns := w.computeGlobPatterns(w.input)
		w.parsedGlobs = make([]*glob.Glob, 0, len(patterns))
		for _, pattern := range patterns {
			if g, err := glob.Parse(pattern); err == nil {
				w.parsedGlobs = append(w.parsedGlobs, g)
			} else {
				panic("failed to parse glob pattern: " + pattern)
			}
		}
	})
	return w.parsedGlobs
}

func (w *WatchedFiles[T]) Clone(input T) *WatchedFiles[T] {
	return &WatchedFiles[T]{
		name:                w.name,
		watchKind:           w.watchKind,
		computeGlobPatterns: w.computeGlobPatterns,
		input:               input,
		parsedGlobs:         w.parsedGlobs,
	}
}

func globMapperForTypingsInstaller(data map[tspath.Path]string) []string {
	return slices.AppendSeq(make([]string, 0, len(data)), maps.Values(data))
}

func createResolutionLookupGlobMapper(currentDirectory string, useCaseSensitiveFileNames bool) func(data map[tspath.Path]string) []string {
	rootPath := tspath.ToPath(currentDirectory, "", useCaseSensitiveFileNames)
	rootPathComponents := tspath.GetPathComponents(string(rootPath), "")
	isRootWatchable := canWatchDirectoryOrFile(rootPathComponents)

	return func(data map[tspath.Path]string) []string {
		// dir -> recursive
		globSet := make(map[string]bool)
		var seenDirs collections.Set[string]

		for path, fileName := range data {
			// Assuming all of the input paths are filenames, we can avoid
			// duplicate work by only taking one file per dir, since their outputs
			// will always be the same.
			if !seenDirs.AddIfAbsent(tspath.GetDirectoryPath(string(path))) {
				continue
			}

			w := getDirectoryToWatchFailedLookupLocation(
				fileName,
				path,
				currentDirectory,
				rootPath,
				rootPathComponents,
				isRootWatchable,
				true,
			)
			if w == nil {
				continue
			}
			globSet[w.dir] = globSet[w.dir] || !w.nonRecursive
		}

		globs := make([]string, 0, len(globSet))
		for dir, recursive := range globSet {
			if recursive {
				globs = append(globs, dir+"/"+recursiveFileGlobPattern)
			} else {
				globs = append(globs, dir+"/"+fileGlobPattern)
			}
		}

		slices.Sort(globs)
		return globs
	}
}

func getTypingsLocationsGlobs(typingsFiles []string, typingsLocation string, currentDirectory string, useCaseSensitiveFileNames bool) (fileGlobs map[tspath.Path]string, directoryGlobs map[tspath.Path]string) {
	comparePathsOptions := tspath.ComparePathsOptions{
		CurrentDirectory:          currentDirectory,
		UseCaseSensitiveFileNames: useCaseSensitiveFileNames,
	}
	for _, file := range typingsFiles {
		basename := tspath.GetBaseFileName(file)
		if basename == "package.json" || basename == "bower.json" {
			// package.json or bower.json exists, watch the file to detect changes and update typings
			if fileGlobs == nil {
				fileGlobs = map[tspath.Path]string{}
			}
			fileGlobs[tspath.ToPath(file, currentDirectory, useCaseSensitiveFileNames)] = file
		} else {
			var globLocation string
			// path in projectRoot, watch project root
			if tspath.ContainsPath(currentDirectory, file, comparePathsOptions) {
				currentDirectoryLen := len(currentDirectory) + 1
				subDirectory := strings.IndexRune(file[currentDirectoryLen:], tspath.DirectorySeparator)
				if subDirectory != -1 {
					// Watch subDirectory
					globLocation = file[0 : currentDirectoryLen+subDirectory]
				} else {
					// Watch the directory itself
					globLocation = file
				}
			} else {
				// path in global cache, watch global cache
				// else watch node_modules or bower_components
				globLocation = core.IfElse(tspath.ContainsPath(typingsLocation, file, comparePathsOptions), typingsLocation, file)
			}
			// package.json or bower.json exists, watch the file to detect changes and update typings
			if directoryGlobs == nil {
				directoryGlobs = map[tspath.Path]string{}
			}
			directoryGlobs[tspath.ToPath(globLocation, currentDirectory, useCaseSensitiveFileNames)] = fmt.Sprintf("%s/%s", globLocation, recursiveFileGlobPattern)
		}
	}
	return fileGlobs, directoryGlobs
}

type directoryOfFailedLookupWatch struct {
	dir            string
	dirPath        tspath.Path
	nonRecursive   bool
	packageDir     *string
	packageDirPath *tspath.Path
}

func getDirectoryToWatchFailedLookupLocation(
	failedLookupLocation string,
	failedLookupLocationPath tspath.Path,
	rootDir string,
	rootPath tspath.Path,
	rootPathComponents []string,
	isRootWatchable bool,
	preferNonRecursiveWatch bool,
) *directoryOfFailedLookupWatch {
	failedLookupPathComponents := tspath.GetPathComponents(string(failedLookupLocationPath), "")
	failedLookupComponents := tspath.GetPathComponents(failedLookupLocation, "")
	perceivedOsRootLength := perceivedOsRootLengthForWatching(failedLookupPathComponents, len(failedLookupPathComponents))
	if len(failedLookupPathComponents) <= perceivedOsRootLength+1 {
		return nil
	}
	// If directory path contains node module, get the most parent node_modules directory for watching
	nodeModulesIndex := slices.Index(failedLookupPathComponents, "node_modules")
	if nodeModulesIndex != -1 && nodeModulesIndex+1 <= perceivedOsRootLength+1 {
		return nil
	}
	lastNodeModulesIndex := lastIndex(failedLookupPathComponents, "node_modules")
	if isRootWatchable && isInDirectoryPath(rootPathComponents, failedLookupPathComponents) {
		if len(failedLookupPathComponents) > len(rootPathComponents)+1 {
			// Instead of watching root, watch directory in root to avoid watching excluded directories not needed for module resolution
			return getDirectoryOfFailedLookupWatch(
				failedLookupComponents,
				failedLookupPathComponents,
				max(len(rootPathComponents)+1, perceivedOsRootLength+1),
				lastNodeModulesIndex,
				false,
			)
		} else {
			// Always watch root directory non recursively
			return &directoryOfFailedLookupWatch{
				dir:          rootDir,
				dirPath:      rootPath,
				nonRecursive: true,
			}
		}
	}

	return getDirectoryToWatchFromFailedLookupLocationDirectory(
		failedLookupComponents,
		failedLookupPathComponents,
		len(failedLookupPathComponents)-1,
		perceivedOsRootLength,
		nodeModulesIndex,
		rootPathComponents,
		lastNodeModulesIndex,
		preferNonRecursiveWatch,
	)
}

func getDirectoryToWatchFromFailedLookupLocationDirectory(
	dirComponents []string,
	dirPathComponents []string,
	dirPathComponentsLength int,
	perceivedOsRootLength int,
	nodeModulesIndex int,
	rootPathComponents []string,
	lastNodeModulesIndex int,
	preferNonRecursiveWatch bool,
) *directoryOfFailedLookupWatch {
	// If directory path contains node module, get the most parent node_modules directory for watching
	if nodeModulesIndex != -1 {
		// If the directory is node_modules use it to watch, always watch it recursively
		return getDirectoryOfFailedLookupWatch(
			dirComponents,
			dirPathComponents,
			nodeModulesIndex+1,
			lastNodeModulesIndex,
			false,
		)
	}

	// Use some ancestor of the root directory
	nonRecursive := true
	length := dirPathComponentsLength
	if !preferNonRecursiveWatch {
		for i := range dirPathComponentsLength {
			if dirPathComponents[i] != rootPathComponents[i] {
				nonRecursive = false
				length = max(i+1, perceivedOsRootLength+1)
				break
			}
		}
	}
	return getDirectoryOfFailedLookupWatch(
		dirComponents,
		dirPathComponents,
		length,
		lastNodeModulesIndex,
		nonRecursive,
	)
}

func getDirectoryOfFailedLookupWatch(
	dirComponents []string,
	dirPathComponents []string,
	length int,
	lastNodeModulesIndex int,
	nonRecursive bool,
) *directoryOfFailedLookupWatch {
	packageDirLength := -1
	if lastNodeModulesIndex != -1 && lastNodeModulesIndex+1 >= length && lastNodeModulesIndex+2 < len(dirPathComponents) {
		if !strings.HasPrefix(dirPathComponents[lastNodeModulesIndex+1], "@") {
			packageDirLength = lastNodeModulesIndex + 2
		} else if lastNodeModulesIndex+3 < len(dirPathComponents) {
			packageDirLength = lastNodeModulesIndex + 3
		}
	}
	var packageDir *string
	var packageDirPath *tspath.Path
	if packageDirLength != -1 {
		packageDir = ptrTo(tspath.GetPathFromPathComponents(dirPathComponents[:packageDirLength]))
		packageDirPath = ptrTo(tspath.Path(tspath.GetPathFromPathComponents(dirComponents[:packageDirLength])))
	}

	return &directoryOfFailedLookupWatch{
		dir:            tspath.GetPathFromPathComponents(dirComponents[:length]),
		dirPath:        tspath.Path(tspath.GetPathFromPathComponents(dirPathComponents[:length])),
		nonRecursive:   nonRecursive,
		packageDir:     packageDir,
		packageDirPath: packageDirPath,
	}
}

func perceivedOsRootLengthForWatching(pathComponents []string, length int) int {
	// Ignore "/", "c:/"
	if length <= 1 {
		return 1
	}
	indexAfterOsRoot := 1
	firstComponent := pathComponents[0]
	isDosStyle := len(firstComponent) >= 2 && tspath.IsVolumeCharacter(firstComponent[0]) && firstComponent[1] == ':'
	if firstComponent != "/" && !isDosStyle && isDosStyleNextPart(pathComponents[1]) {
		// ignore "//vda1cs4850/c$/folderAtRoot"
		if length == 2 {
			return 2
		}
		indexAfterOsRoot = 2
		isDosStyle = true
	}

	afterOsRoot := pathComponents[indexAfterOsRoot]
	if isDosStyle && !strings.EqualFold(afterOsRoot, "users") {
		// Paths like c:/notUsers
		return indexAfterOsRoot
	}

	if strings.EqualFold(afterOsRoot, "workspaces") {
		// Paths like: /workspaces as codespaces hoist the repos in /workspaces so we have to exempt these from "2" level from root rule
		return indexAfterOsRoot + 1
	}

	// Paths like: c:/users/username or /home/username
	return indexAfterOsRoot + 2
}

func canWatchDirectoryOrFile(pathComponents []string) bool {
	length := len(pathComponents)
	// Ignore "/", "c:/"
	// ignore "/user", "c:/users" or "c:/folderAtRoot"
	if length < 2 {
		return false
	}
	perceivedOsRootLength := perceivedOsRootLengthForWatching(pathComponents, length)
	return length > perceivedOsRootLength+1
}

func isDosStyleNextPart(part string) bool {
	return len(part) == 2 && tspath.IsVolumeCharacter(part[0]) && part[1] == '$'
}

func lastIndex[T comparable](s []T, v T) int {
	for i := len(s) - 1; i >= 0; i-- {
		if s[i] == v {
			return i
		}
	}
	return -1
}

func isInDirectoryPath(dirComponents []string, fileOrDirComponents []string) bool {
	if len(fileOrDirComponents) < len(dirComponents) {
		return false
	}
	for i := range dirComponents {
		if dirComponents[i] != fileOrDirComponents[i] {
			return false
		}
	}
	return true
}

func ptrTo[T any](v T) *T {
	return &v
}

type resolutionWithLookupLocations interface {
	GetLookupLocations() *module.LookupLocations
}

func extractLookups[T resolutionWithLookupLocations](
	projectToPath func(string) tspath.Path,
	failedLookups map[tspath.Path]string,
	affectingLocations map[tspath.Path]string,
	cache map[tspath.Path]module.ModeAwareCache[T],
) {
	for _, resolvedModulesInFile := range cache {
		for _, resolvedModule := range resolvedModulesInFile {
			for _, failedLookupLocation := range resolvedModule.GetLookupLocations().FailedLookupLocations {
				path := projectToPath(failedLookupLocation)
				if _, ok := failedLookups[path]; !ok {
					failedLookups[path] = failedLookupLocation
				}
			}
			for _, affectingLocation := range resolvedModule.GetLookupLocations().AffectingLocations {
				path := projectToPath(affectingLocation)
				if _, ok := affectingLocations[path]; !ok {
					affectingLocations[path] = affectingLocation
				}
			}
		}
	}
}
