package tsctests

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestContentMapperWatchManifestCasing(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name string
		args []string
	}{
		{name: "watch", args: []string{"--watch", "--runExternalCode"}},
		{name: "build watch", args: []string{"--build", "--watch", "--runExternalCode"}},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			const manifest = "/home/src/workspaces/Mapper/package.json"
			input := &tscInput{ignoreCase: true, files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": `{
					"compilerOptions": { "composite": true },
					"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
				}`,
				"/home/src/workspaces/project/app.vue":             `export const app = 1;`,
				"/home/src/workspaces/project/node_modules/mapper": vfstest.Symlink("/home/src/workspaces/Mapper"),
				manifest: contentmappertest.PackageJSON(contentmappertest.VerbatimMapper),
			}}
			testSys := newTestSys(input, false)
			spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()}
			sys := &recordingContentMapperSystem{TestSys: testSys, spawner: spawner}
			result := execute.CommandLine(t.Context(), sys, test.args, testSys)
			assert.Assert(t, result.Watcher != nil)
			assert.Equal(t, spawner.spawns.Load(), int32(1))

			testSys.writeFileNoError(manifest, strings.Replace(
				contentmappertest.PackageJSON(contentmappertest.VerbatimMapper),
				`"version": "1.0.0"`, `"version": "2.0.0"`, 1,
			))
			testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: strings.ToUpper(manifest)}})
			result.Watcher.DoCycle()

			assert.Equal(t, spawner.spawns.Load(), int32(2))
			assert.Equal(t, spawner.closes.Load(), int32(1))
		})
	}
}
