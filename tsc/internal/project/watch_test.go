package project

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestResolutionLookupGlobsPreserveOriginalNames(t *testing.T) {
	t.Parallel()

	const workspace, current, lib = "/Workspace/K", "/Current/K", "/Library/K"
	for _, tc := range []struct {
		name, file, glob, outside string
	}{
		{name: "workspace", file: workspace + "/main.ts", glob: workspace + "/**/*"},
		{name: "current", file: current + "/main.ts", glob: current + "/**/*"},
		{name: "library", file: lib + "/lib.d.ts", glob: lib + "/**/*"},
		{name: "node modules", file: "/External/K/NODE_MODULES/Pkg/main.ts", glob: "/External/K/NODE_MODULES/**/*"},
		{name: "external", file: "/External/K/Project/main.ts", outside: "/External/K/Project"},
		{name: "NFD", file: "/External/e\u0301/Project/main.ts", outside: "/External/e\u0301/Project"},
	} {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			source := newSourceFS(true, nil, func(name string) tspath.Path {
				return tspath.ToPath(name, current, false)
			})
			source.Track(tc.file)
			result := createResolutionLookupGlobMapper(workspace, lib, current, false)(source.seenFiles)
			if tc.glob != "" {
				assert.DeepEqual(t, result.patternsInsideWorkspace, []string{tc.glob})
				assert.Equal(t, len(result.directoriesOutsideWorkspace), 0)
			} else {
				assert.DeepEqual(t, result.directoriesOutsideWorkspace, []string{tc.outside})
				assert.Equal(t, len(result.patternsInsideWorkspace), 0)
			}
		})
	}
}

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
