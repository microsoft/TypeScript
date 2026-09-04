package project

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestGetPathComponentsForWatching(t *testing.T) {
	t.Parallel()

	assert.DeepEqual(t, getPathComponentsForWatching(tspath.ToRootedDirectoryPath("/project", "")), []string{"/", "project"})
	assert.DeepEqual(t, getPathComponentsForWatching(tspath.ToRootedDirectoryPath("C:\\project", "")), []string{"C:/", "project"})
	assert.DeepEqual(t, getPathComponentsForWatching(tspath.ToRootedDirectoryPath("//server/share/project/tsconfig.json", "")), []string{"//server/share", "project", "tsconfig.json"})
	assert.DeepEqual(t, getPathComponentsForWatching(tspath.ToRootedDirectoryPath(`\\server\share\project\tsconfig.json`, "")), []string{"//server/share", "project", "tsconfig.json"})
	assert.DeepEqual(t, getPathComponentsForWatching(tspath.ToRootedDirectoryPath("C:\\Users", "")), []string{"C:/Users"})
	assert.DeepEqual(t, getPathComponentsForWatching(tspath.ToRootedDirectoryPath("C:\\Users\\andrew\\project", "")), []string{"C:/Users/andrew", "project"})
	assert.DeepEqual(t, getPathComponentsForWatching(tspath.ToRootedDirectoryPath("/home", "")), []string{"/home"})
	assert.DeepEqual(t, getPathComponentsForWatching(tspath.ToRootedDirectoryPath("/home/andrew/project", "")), []string{"/home/andrew", "project"})
}

func TestNilWatchedFilesClone(t *testing.T) {
	t.Parallel()

	var w *WatchedFiles[int]
	result := w.Clone(42)
	assert.Assert(t, result == nil, "clone on a nil `WatchedFiles` should return nil")
}

func TestResolutionLookupWatcherPreservesDirectorySpelling(t *testing.T) {
	t.Parallel()

	caseSensitivity := tspath.CaseInsensitive
	fileName := tspath.RootedFilePath("/External/Dir/file.ts")
	var files collections.SyncMap[tspath.PathKey, tspath.RootedFilePath]
	files.Store(caseSensitivity.PathKey(tspath.RootedPath(fileName)), fileName)

	result := createResolutionLookupGlobMapper(
		tspath.RootedDirectoryPath("/workspace"),
		tspath.RootedDirectoryPath("/lib"),
		tspath.RootedDirectoryPath("/current"),
		caseSensitivity,
	)(&files)

	assert.DeepEqual(t, result.directoriesOutsideWorkspace, []tspath.RootedDirectoryPath{
		tspath.RootedDirectoryPath("/External/Dir"),
	})
	watcher := newRecursiveDirectoryWatcher(result.directoriesOutsideWorkspace[0], lsproto.WatchKindCreate, true)
	assert.Equal(t, string(*watcher.GlobPattern.RelativePattern.BaseUri.URI), "file:///External/Dir")
}

func TestResolutionLookupWatcherPreservesNodeModulesSpelling(t *testing.T) {
	t.Parallel()

	caseSensitivity := tspath.CaseInsensitive
	fileName := tspath.RootedFilePath("/External/Node_Modules/pkg/index.d.ts")
	var files collections.SyncMap[tspath.PathKey, tspath.RootedFilePath]
	files.Store(caseSensitivity.PathKey(tspath.RootedPath(fileName)), fileName)

	result := createResolutionLookupGlobMapper(
		tspath.RootedDirectoryPath("/workspace"),
		tspath.RootedDirectoryPath("/lib"),
		tspath.RootedDirectoryPath("/current"),
		caseSensitivity,
	)(&files)

	assert.DeepEqual(t, result.patternsInsideWorkspace, []string{"/External/Node_Modules/**/*"})
}

func TestResolutionLookupWatcherPreservesIncludedDirectorySpelling(t *testing.T) {
	t.Parallel()

	caseSensitivity := tspath.CaseInsensitive
	var files collections.SyncMap[tspath.PathKey, tspath.RootedFilePath]
	for _, fileName := range []tspath.RootedFilePath{
		tspath.RootedFilePath("/Workspace/src/index.ts"),
		tspath.RootedFilePath("/Project/src/index.ts"),
		tspath.RootedFilePath("/Lib/lib.d.ts"),
	} {
		files.Store(caseSensitivity.PathKey(tspath.RootedPath(fileName)), fileName)
	}

	result := createResolutionLookupGlobMapper(
		tspath.RootedDirectoryPath("/Workspace"),
		tspath.RootedDirectoryPath("/Lib"),
		tspath.RootedDirectoryPath("/Project"),
		caseSensitivity,
	)(&files)

	assert.DeepEqual(t, result.patternsInsideWorkspace, []string{
		"/Workspace/**/*",
		"/Project/**/*",
		"/Lib/**/*",
	})
}
