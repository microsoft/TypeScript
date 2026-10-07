package requestfilesystem

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestRebaseDoesNotMutateInputs(t *testing.T) {
	t.Parallel()
	for _, sourceKind := range []Kind{KindLayer, KindFull} {
		for _, targetKind := range []Kind{"host", KindLayer, KindFull} {
			t.Run(string(sourceKind)+"/"+string(targetKind), func(t *testing.T) {
				t.Parallel()
				sourceHost := vfstest.FromMap(map[string]string{"/host.ts": "old host"}, tspath.CaseSensitive)
				targetHost := vfstest.FromMap(map[string]string{"/host.ts": "new host"}, tspath.CaseSensitive)
				sourceParams := &RequestFileSystem{
					Kind: sourceKind,
					Files: map[string]string{
						"/dir/source.ts": "source",
						"/dir/shared.ts": "source shared",
					},
					Symlinks:     map[string]RequestSymlink{"/alias.ts": {Target: "/dir/shared.ts"}},
					RemovedPaths: []string{"/dir/removed"},
				}
				source, err := newRequestFileSystem(sourceParams, sourceHost, "/")
				assert.NilError(t, err)
				expectedSource, err := newRequestFileSystem(sourceParams, sourceHost, "/")
				assert.NilError(t, err)
				var target vfs.FS = targetHost
				var expectedTarget vfs.FS = targetHost
				if targetKind != "host" {
					targetParams := &RequestFileSystem{
						Kind: targetKind,
						Files: map[string]string{
							"/dir/target.ts":         "target",
							"/dir/shared.ts":         "target shared",
							"/dir/removed/nested.ts": "removed",
						},
						Directories: map[string]RequestDirectoryEntries{
							"/dir": {Files: []string{"target.ts", "shared.ts"}, Directories: []string{"removed"}},
						},
					}
					target, err = newRequestFileSystem(targetParams, targetHost, "/")
					assert.NilError(t, err)
					expectedTarget, err = newRequestFileSystem(targetParams, targetHost, "/")
					assert.NilError(t, err)
				}
				var fileChanges project.FileChangeSummary
				rebased := Rebase(source, target, &fileChanges)
				assert.Assert(t, rebased != source && rebased != target)
				content, ok := rebased.ReadFile("/alias.ts")
				assert.Assert(t, ok)
				assert.Equal(t, content, "source shared")
				_, ok = rebased.ReadFile("/dir/removed/nested.ts")
				assert.Assert(t, !ok)
				assert.Assert(t, rebased.FileExists("/dir/source.ts"))
				assert.Equal(t, rebased.FileExists("/dir/target.ts"), sourceKind == KindLayer && targetKind != "host")
				_ = rebased.GetAccessibleEntries("/dir")
				second := Rebase(source, source, &fileChanges)
				assert.Assert(t, second != source)
				_ = second.GetAccessibleEntries("/dir")
				assert.Assert(t, reflect.DeepEqual(source, expectedSource), "source filesystem was mutated")
				assert.Assert(t, reflect.DeepEqual(target, expectedTarget), "target filesystem was mutated")
			})
		}
	}
}
