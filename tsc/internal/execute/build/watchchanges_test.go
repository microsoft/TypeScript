package build

import (
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestWatchFileChangedAncestors(t *testing.T) {
	t.Parallel()
	for _, caseSensitive := range []bool{false, true} {
		o := &Orchestrator{comparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory: "/repo", UseCaseSensitiveFileNames: caseSensitive,
		}}
		events := map[tspath.Path]fswatch.EventKind{
			o.toPath("/repo/src"):      fswatch.EventDelete,
			o.toPath("/repo/lib"):      fswatch.EventUpdate,
			o.toPath("/repo/lib/a.ts"): fswatch.EventUpdate,
			o.toPath("/repo/s"):        fswatch.EventDelete,
		}
		for i := range 10000 {
			events[o.toPath(fmt.Sprintf("/unrelated/%d", i))] = fswatch.EventDelete
		}
		for _, test := range []struct {
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
		} {
			assert.Equal(t, o.watchFileChanged(test.name, events), test.want, "%s (caseSensitive=%v)", test.name, caseSensitive)
		}
	}
}
