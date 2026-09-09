package project

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestWatchRealpathRetargetIdenticalText(t *testing.T) {
	t.Parallel()
	for _, watchEnabled := range []bool{false, true} {
		files := func(target, value string) map[string]any {
			return map[string]any{
				"/project/tsconfig.json":    `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true},"files":["main.ts"]}`,
				"/project/main.ts":          `import { value } from "pkg"; export { value };`,
				"/project/node_modules/pkg": vfstest.Symlink("/packages/" + target),
				"/packages/one/index.d.ts":  `export { value } from "./dep";`,
				"/packages/two/index.d.ts":  `export { value } from "./dep";`,
				"/packages/one/dep.d.ts":    `export const value: "one";`,
				"/packages/two/dep.d.ts":    value,
			}
		}
		fs := &countedWatchAliasFS{FS: vfstest.FromMap(files("one", `export const value: "two";`), true)}
		host := NewSnapshotHost(&SessionInit{FS: fs, Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: watchEnabled}})
		root := host.NewStandaloneRootSnapshot()
		snapshot, err := host.CloneSnapshot(context.Background(), root, FileChangeSummary{}, &APISnapshotRequest{
			OpenProjects: collections.NewSetFromItems("/project/tsconfig.json"),
		})
		assert.NilError(t, err)
		fs.FS = vfstest.FromMap(files("two", `export const value: "two";`), true)
		var changes FileChangeSummary
		changes.Changed.Add("file:///project/node_modules/pkg")
		next := host.update(context.Background(), snapshot, SnapshotChange{
			fileChanges: changes, ResourceRequest: ResourceRequest{Projects: []tspath.Path{"/project/tsconfig.json"}},
		})
		assert.NilError(t, next.apiError)
		file := next.ProjectCollection.ConfiguredProject("/project/tsconfig.json").Program.GetSourceFile("/project/node_modules/pkg/dep.d.ts")
		assert.Assert(t, file != nil)
		assert.Equal(t, file.Text(), `export const value: "two";`)
		assert.Equal(t, snapshot.ProjectCollection.ConfiguredProject("/project/tsconfig.json").Program.GetSourceFile("/project/node_modules/pkg/dep.d.ts").Text(), `export const value: "one";`)
		assert.NilError(t, fs.WriteFile("/packages/two/dep.d.ts", `export const value: "updated";`))
		changes = FileChangeSummary{}
		changes.Changed.Add("file:///packages/two/dep.d.ts")
		last := host.update(context.Background(), next, SnapshotChange{
			fileChanges: changes, ResourceRequest: ResourceRequest{Projects: []tspath.Path{"/project/tsconfig.json"}},
		})
		assert.NilError(t, last.apiError)
		assert.Equal(t, last.ProjectCollection.ConfiguredProject("/project/tsconfig.json").Program.GetSourceFile("/project/node_modules/pkg/dep.d.ts").Text(), `export const value: "updated";`)
		last.Deref()
		next.Deref()
		snapshot.Deref()
		root.Deref()
		host.Close()
	}
}
