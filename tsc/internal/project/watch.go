package project

import (
	"context"
	"fmt"
	"maps"
	"slices"
	"strings"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/tspath"
)

const (
	fileGlobPattern          = "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}"
	recursiveFileGlobPattern = "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}"
)

type watchFileHost interface {
	Name() string
	Client() Client
	Log(message string)
}

type watchedFiles[T any] struct {
	p         watchFileHost
	getGlobs  func(data T) []string
	watchKind lsproto.WatchKind

	data      T
	globs     []string
	watcherID WatcherHandle
	watchType string
}

func newWatchedFiles[T any](
	p watchFileHost,
	watchKind lsproto.WatchKind,
	getGlobs func(data T) []string,
	watchType string,
) *watchedFiles[T] {
	return &watchedFiles[T]{
		p:         p,
		watchKind: watchKind,
		getGlobs:  getGlobs,
		watchType: watchType,
	}
}

func (w *watchedFiles[T]) update(ctx context.Context, newData T) {
	newGlobs := w.getGlobs(newData)
	newGlobs = slices.Clone(newGlobs)
	slices.Sort(newGlobs)

	w.data = newData
	if slices.Equal(w.globs, newGlobs) {
		return
	}

	w.globs = newGlobs
	if w.watcherID != "" {
		if err := w.p.Client().UnwatchFiles(ctx, w.watcherID); err != nil {
			w.p.Log(fmt.Sprintf("%s:: Failed to unwatch %s watch: %s, err: %v newGlobs that are not updated: \n%s", w.p.Name(), w.watchType, w.watcherID, err, formatFileList(w.globs, "\t", hr)))
			return
		}
		w.p.Log(fmt.Sprintf("%s:: %s watches unwatch %s", w.p.Name(), w.watchType, w.watcherID))
	}

	w.watcherID = ""
	if len(newGlobs) == 0 {
		return
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
	watcherID, err := w.p.Client().WatchFiles(ctx, watchers)
	if err != nil {
		w.p.Log(fmt.Sprintf("%s:: Failed to update %s watch: %v\n%s", w.p.Name(), w.watchType, err, formatFileList(w.globs, "\t", hr)))
		return
	}
	w.watcherID = watcherID
	w.p.Log(fmt.Sprintf("%s:: %s watches updated %s:\n%s", w.p.Name(), w.watchType, w.watcherID, formatFileList(w.globs, "\t", hr)))
	return
}

func globMapperForTypingsInstaller(data map[tspath.Path]string) []string {
	return slices.AppendSeq(make([]string, 0, len(data)), maps.Values(data))
}

func createResolutionLookupGlobMapper(host ProjectHost) func(data map[tspath.Path]string) []string {
	rootDir := host.GetCurrentDirectory()
	rootPath := tspath.ToPath(rootDir, "", host.FS().UseCaseSensitiveFileNames())
	rootPathComponents := tspath.GetPathComponents(string(rootPath), "")
	isRootWatchable := canWatchDirectoryOrFile(rootPathComponents)

	return func(data map[tspath.Path]string) []string {
		start := time.Now()

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
				rootDir,
				rootPath,
				rootPathComponents,
				isRootWatchable,
				rootDir,
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

		timeTaken := time.Since(start)
		host.Log(fmt.Sprintf("createGlobMapper took %s to create %d globs for %d failed lookups", timeTaken, len(globs), len(data)))
		return globs
	}
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
	currentDirectory string,
	preferNonRecursiveWatch bool,
) *directoryOfFailedLookupWatch {
	failedLookupPathComponents := tspath.GetPathComponents(string(failedLookupLocationPath), "")
	// Ensure failed look up is normalized path
	// !!! needed?
	if tspath.IsRootedDiskPath(failedLookupLocation) {
		failedLookupLocation = tspath.NormalizePath(failedLookupLocation)
	} else {
		failedLookupLocation = tspath.GetNormalizedAbsolutePath(failedLookupLocation, currentDirectory)
	}
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
