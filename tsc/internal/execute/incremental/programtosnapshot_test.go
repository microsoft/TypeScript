package incremental

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestGlobalFileOrderChanged(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name    string
		old     []tspath.PathKey
		new     []tspath.PathKey
		changed bool
	}{
		{"unchanged", []tspath.PathKey{"/a", "/module", "/b"}, []tspath.PathKey{"/a", "/module", "/b"}, false},
		{"global reorder", []tspath.PathKey{"/a", "/module", "/b"}, []tspath.PathKey{"/b", "/module", "/a"}, true},
		{"module reorder", []tspath.PathKey{"/a", "/module", "/b"}, []tspath.PathKey{"/module", "/a", "/b"}, false},
		{"global added", []tspath.PathKey{"/a", "/b"}, []tspath.PathKey{"/a", "/new", "/b"}, false},
		{"global removed", []tspath.PathKey{"/a", "/removed", "/b"}, []tspath.PathKey{"/a", "/b"}, false},
		{"reorder with removal", []tspath.PathKey{"/a", "/removed", "/b"}, []tspath.PathKey{"/b", "/a"}, true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			old := &snapshot{fileOrder: test.old}
			current := &snapshot{fileOrder: test.new}
			for _, path := range test.old {
				old.fileInfos.Store(path, &FileInfo{affectsGlobalScope: path != "/module"})
			}
			for _, path := range test.new {
				current.fileInfos.Store(path, &FileInfo{affectsGlobalScope: path != "/module"})
			}
			assert.Equal(t, globalFileOrderChanged(old, current), test.changed)
		})
	}
}
