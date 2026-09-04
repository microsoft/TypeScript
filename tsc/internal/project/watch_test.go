package project

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestGetPathComponentsForWatching(t *testing.T) {
	t.Parallel()

	assert.DeepEqual(t, getPathComponentsForWatching("/project", ""), []string{"/", "project"})
	assert.DeepEqual(t, getPathComponentsForWatching("C:\\project", ""), []string{"C:/", "project"})
	assert.DeepEqual(t, getPathComponentsForWatching("//server/share/project/tsconfig.json", ""), []string{"//server/share", "project", "tsconfig.json"})
	assert.DeepEqual(t, getPathComponentsForWatching(`\\server\share\project\tsconfig.json`, ""), []string{"//server/share", "project", "tsconfig.json"})
	assert.DeepEqual(t, getPathComponentsForWatching("C:\\Users", ""), []string{"C:/Users"})
	assert.DeepEqual(t, getPathComponentsForWatching("C:\\Users\\andrew\\project", ""), []string{"C:/Users/andrew", "project"})
	assert.DeepEqual(t, getPathComponentsForWatching("/home", ""), []string{"/home"})
	assert.DeepEqual(t, getPathComponentsForWatching("/home/andrew/project", ""), []string{"/home/andrew", "project"})
}

func TestNilWatchedFilesClone(t *testing.T) {
	t.Parallel()

	var w *WatchedFiles[int]
	result := w.Clone(42)
	assert.Assert(t, result == nil, "clone on a nil `WatchedFiles` should return nil")
}

func TestResolutionLookupWatcherPreservesIncludedDirectorySpelling(t *testing.T) {
	t.Parallel()

	var files collections.SyncMap[tspath.Path, string]
	for _, fileName := range []string{
		"/Workspace/src/index.ts",
		"/Project/src/index.ts",
		"/Lib/lib.d.ts",
	} {
		files.Store(tspath.ToPath(fileName, "/", false), fileName)
	}

	result := createResolutionLookupGlobMapper(
		"/Workspace",
		"/Lib",
		"/Project",
		false,
	)(&files)

	assert.DeepEqual(t, result.patternsInsideWorkspace, []string{
		"/Workspace/**/*",
		"/Project/**/*",
		"/Lib/**/*",
	})
}

func TestResolutionLookupWatcherPreservesNodeModulesSpelling(t *testing.T) {
	t.Parallel()

	var files collections.SyncMap[tspath.Path, string]
	fileName := "/External/Node_Modules/pkg/index.ts"
	files.Store(tspath.ToPath(fileName, "/", false), fileName)

	result := createResolutionLookupGlobMapper(
		"/Workspace",
		"/Lib",
		"/Project",
		false,
	)(&files)

	assert.DeepEqual(t, result.patternsInsideWorkspace, []string{"/External/Node_Modules/**/*"})
}
