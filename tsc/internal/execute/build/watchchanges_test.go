package build

import (
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"github.com/microsoft/TypeScript/tsc/internal/watchalias"
	"gotest.tools/v3/assert"
)

func TestWatchFileChangedAncestors(t *testing.T) {
	t.Parallel()
	for _, caseSensitive := range []bool{false, true} {
		o := &Orchestrator{comparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory: "/repo", UseCaseSensitiveFileNames: caseSensitive,
		}}
		raw := map[string]fswatch.EventKind{
			"/repo/src":      fswatch.EventDelete,
			"/repo/lib":      fswatch.EventUpdate,
			"/repo/lib/a.ts": fswatch.EventUpdate,
			"/repo/s":        fswatch.EventDelete,
		}
		for i := range 10000 {
			raw[fmt.Sprintf("/unrelated/%d", i)] = fswatch.EventDelete
		}
		tests := []struct {
			name string
			want bool
		}{
			{"src/nested/a.ts", true},
			{"SRC/a.ts", !caseSensitive},
			{"src-other/a.ts", false},
			{"lib/a.ts", true},
			{"lib/b.ts", false},
			{"ſ/a.ts", false},
			{"unknown/a.ts", false},
		}
		index := watchalias.New(vfstest.FromMap(map[string]string{}, caseSensitive))
		for _, test := range tests {
			name := tspath.GetNormalizedAbsolutePath(test.name, "/repo")
			assert.NilError(t, index.Register(watchalias.Registration{Name: name, Realpath: name, Dependency: true}))
		}
		events := make(map[tspath.Path]fswatch.EventKind)
		for name, kind := range index.Match(raw).Changes {
			events[o.toPath(name)] = kind
		}
		for _, test := range tests {
			assert.Equal(t, o.watchFileChanged(test.name, events), test.want, "%s (caseSensitive=%v)", test.name, caseSensitive)
		}
	}
}
