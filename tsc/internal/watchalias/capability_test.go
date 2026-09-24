package watchalias_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/cachedvfs"
	"github.com/microsoft/TypeScript/tsc/internal/watchalias"
	"gotest.tools/v3/assert"
)

type disabledComparisonFS struct{ vfs.FS }

func (disabledComparisonFS) WatchPathComparisonEnabled() bool { return false }

func (disabledComparisonFS) WatchPathComparer(string) (fswatch.PathComparer, error) {
	panic("disabled filesystem comparison must not query native paths")
}

func TestDisabledComparisonSurvivesWrappers(t *testing.T) {
	t.Parallel()
	for _, filesystem := range []vfs.FS{
		disabledComparisonFS{},
		cachedvfs.From(disabledComparisonFS{}),
		bundled.WrapFS(cachedvfs.From(disabledComparisonFS{})),
		cachedvfs.From(bundled.WrapFS(disabledComparisonFS{})),
	} {
		assert.Assert(t, !watchalias.Enabled(filesystem))
		index := watchalias.New(filesystem)
		assert.NilError(t, index.Add("/virtual/\u017f.ts"))
		assert.DeepEqual(t, index.Expand("/virtual/s.ts"), []string{"/virtual/s.ts"})
	}
}
