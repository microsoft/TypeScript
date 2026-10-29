package build

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/iovfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestDependencyRealpathFirstObservation(t *testing.T) {
	t.Parallel()
	const alias tspath.RootedPath = "/project/link.d.ts"
	const first tspath.RootedPath = "/shared/first.d.ts"
	const second tspath.RootedPath = "/shared/second.d.ts"
	fs := vfstest.FromMap(map[string]any{
		alias.AsString():  vfstest.Symlink(first.AsString()),
		first.AsString():  "export const value: 1;",
		second.AsString(): "export const value: 2;",
	}, tspath.CaseSensitive)
	tracker := &dependencyTrackingFS{}
	tracker.Inner = fs
	assert.Equal(t, tracker.Realpath(alias), first)
	fs.(iovfs.FsWithSys).FSys().(*vfstest.MapFS).AddSymlink("project/link.d.ts", "shared/second.d.ts")
	assert.Equal(t, tracker.Realpath(alias), second)
	observed, ok := tracker.realpaths.Load(alias)
	assert.Assert(t, ok)
	assert.Equal(t, observed, first)
	assert.Assert(t, tracker.SeenFiles.Has(alias))
	const output tspath.RootedFilePath = "/project/out.js"
	assert.NilError(t, tracker.WriteFile(output, "export const value = 1;"))
	assert.Assert(t, !tracker.SeenFiles.Has(output.AsPath()))
}
