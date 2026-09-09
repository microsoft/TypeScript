package project

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"gotest.tools/v3/assert"
)

type lifecycleNativeComparerFS struct {
	vfs.FS
	comparer fswatch.PathComparer
}

func (fs *lifecycleNativeComparerFS) WatchPathComparer(string) (fswatch.PathComparer, error) {
	return fs.comparer, nil
}

func TestWatchDirectoryRecreationNativeSpellings(t *testing.T) {
	t.Parallel()
	comparer, err := fswatch.PathComparerForPath(t.TempDir())
	assert.NilError(t, err)
	if comparer.Key("\u00e9") != comparer.Key("e\u0301") {
		t.Skip("requires a normalization-insensitive volume")
	}
	for _, test := range []struct{ name, deleted, created string }{
		{"NFC-to-original", "/packages/\u00e9", watchLifecyclePhysical},
		{"original-to-NFC", watchLifecyclePhysical, "/packages/\u00e9"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			fs := &lifecycleNativeComparerFS{FS: watchLifecycleFS(true), comparer: comparer}
			checkWatchDirectoryRecreation(t, fs, test.deleted, test.created, nil, false)
		})
	}
}
