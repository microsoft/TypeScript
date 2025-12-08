package project

import (
	"testing"

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
