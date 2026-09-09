package watchmanager

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strconv"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

func watchResolutionDirectory(t *testing.T) string {
	t.Helper()
	dir, err := filepath.Abs(fmt.Sprintf(".watch-resolution-%d-%d", os.Getpid(), time.Now().UnixNano()))
	assert.NilError(t, err)
	assert.NilError(t, os.Mkdir(dir, 0o755))
	t.Cleanup(func() { os.RemoveAll(dir) })
	return dir
}

func TestWatchResolutionNamespaceChanges(t *testing.T) {
	t.Parallel()
	for _, directory := range []bool{false, true} {
		t.Run(strconv.FormatBool(directory), func(t *testing.T) {
			t.Parallel()
			dir := watchResolutionDirectory(t)
			for _, target := range []string{"one", "two"} {
				assert.NilError(t, os.Mkdir(dir+"/"+target, 0o755))
				assert.NilError(t, os.WriteFile(dir+"/"+target+"/file.ts", nil, 0o600))
			}
			link := dir + "/link"
			targetSuffix := "/file.ts"
			if directory {
				targetSuffix = ""
			}
			assert.NilError(t, os.Symlink(dir+"/one"+targetSuffix, link))
			name := link
			if directory {
				name += "/file.ts"
			}
			filesystem := osvfs.FS()
			wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
			reconcile := func() {
				t.Helper()
				assert.NilError(t, wm.ReconcileWatches([]string{name}, map[string]bool{dir: true}, nil))
			}
			reconcile()
			assert.Equal(t, wm.Realpath(name, nil), dir+"/one/file.ts")
			assert.NilError(t, os.Remove(link))
			assert.NilError(t, os.Symlink(dir+"/two"+targetSuffix, link))
			wm.onWatchEvents([]fswatch.Event{{Path: link, Kind: fswatch.EventUpdate}}, nil)
			changes := wm.DrainEvents()
			retargeted, err := wm.RefreshResolutions(changes)
			assert.NilError(t, err)
			assert.Assert(t, retargeted)
			reconcile()
			assert.Equal(t, wm.Realpath(name, nil), dir+"/two/file.ts")
			wm.onWatchEvents([]fswatch.Event{{Path: dir + "/two/file.ts", Kind: fswatch.EventUpdate}}, nil)
			changes = wm.DrainEvents()
			_, ok := changes.Changes[name]
			assert.Assert(t, ok, "new target did not expand: %v", changes.Changes)
			_, err = wm.RefreshResolutions(changes)
			assert.NilError(t, err)
			reconcile()
			wm.onWatchEvents([]fswatch.Event{{Path: dir + "/one/file.ts", Kind: fswatch.EventUpdate}}, nil)
			changes = wm.DrainEvents()
			_, ok = changes.Changes[name]
			assert.Assert(t, !ok, "old target still expands: %v", changes.Changes)
		})
	}
}

func TestWatchResolutionAbsentDirectoryAppears(t *testing.T) {
	t.Parallel()
	dir := watchResolutionDirectory(t)
	name := dir + "/new/file.ts"
	filesystem := osvfs.FS()
	wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
	assert.NilError(t, wm.ReconcileWatches([]string{name}, nil, nil))
	assert.NilError(t, os.Mkdir(dir+"/new", 0o755))
	assert.NilError(t, os.WriteFile(dir+"/target.ts", nil, 0o600))
	assert.NilError(t, os.Symlink(dir+"/target.ts", name))
	wm.onWatchEvents([]fswatch.Event{{Path: dir + "/new", Kind: fswatch.EventUpdate}}, nil)
	changes := wm.DrainEvents()
	_, err := wm.RefreshResolutions(changes)
	assert.NilError(t, err)
	assert.NilError(t, wm.ReconcileWatches([]string{name}, nil, nil))
	assert.Equal(t, wm.Realpath(name, nil), dir+"/target.ts")
	assert.NilError(t, os.RemoveAll(dir+"/new"))
	wm.onWatchEvents([]fswatch.Event{{Path: dir + "/new", Kind: fswatch.EventDelete}}, nil)
	changes = wm.DrainEvents()
	assert.Equal(t, changes.Changes[name], fswatch.EventDelete)
	_, err = wm.RefreshResolutions(changes)
	assert.NilError(t, err)
	assert.NilError(t, wm.ReconcileWatches([]string{name}, nil, nil))
	assert.Equal(t, wm.Realpath(name, nil), name)
}

func TestWatchResolutionRefreshWithoutReconcile(t *testing.T) {
	t.Parallel()
	dir := watchResolutionDirectory(t)
	for _, target := range []string{"one.ts", "two.ts"} {
		assert.NilError(t, os.WriteFile(dir+"/"+target, nil, 0o600))
	}
	name := dir + "/link.ts"
	assert.NilError(t, os.Symlink(dir+"/one.ts", name))
	filesystem := osvfs.FS()
	wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
	assert.NilError(t, wm.ReconcileWatches([]string{name}, nil, nil))
	assert.Equal(t, wm.Realpath(name, nil), dir+"/one.ts")
	aliases := wm.aliases
	resolved := *wm.resolvedPaths[name]

	assert.NilError(t, os.Remove(name))
	assert.NilError(t, os.Symlink(dir+"/two.ts", name))
	wm.onWatchEvents([]fswatch.Event{{Path: name, Kind: fswatch.EventUpdate}}, nil)
	changes := wm.DrainEvents()
	assert.Equal(t, *wm.resolvedPaths[name], resolved, "draining must not mutate cached resolutions")
	assert.Assert(t, wm.aliases == aliases, "draining must match with the old alias index")
	retargeted, err := wm.RefreshResolutions(changes)
	assert.NilError(t, err)
	assert.Assert(t, retargeted)
	assert.Equal(t, wm.Realpath(name, nil), dir+"/two.ts")
	assert.Assert(t, wm.aliases != aliases, "refresh must publish the new alias index without reconciling")

	wm.onWatchEvents([]fswatch.Event{{Path: dir + "/two.ts", Kind: fswatch.EventUpdate}}, nil)
	changes = wm.DrainEvents()
	_, ok := changes.Changes[name]
	assert.Assert(t, ok, "new target did not expand without reconciling: %v", changes.Changes)
	_, err = wm.RefreshResolutions(changes)
	assert.NilError(t, err)

	wm.onWatchEvents([]fswatch.Event{{Path: dir + "/one.ts", Kind: fswatch.EventUpdate}}, nil)
	changes = wm.DrainEvents()
	_, ok = changes.Changes[name]
	assert.Assert(t, !ok, "old target still expands without reconciling: %v", changes.Changes)
}

func TestWatchResolutionFileBecomesDirectory(t *testing.T) {
	t.Parallel()
	dir := watchResolutionDirectory(t)
	assert.NilError(t, os.WriteFile(dir+"/prefix", nil, 0o600))
	assert.NilError(t, os.Mkdir(dir+"/target", 0o755))
	assert.NilError(t, os.WriteFile(dir+"/target/file.ts", nil, 0o600))
	filesystem := osvfs.FS()
	wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
	name := dir + "/prefix/file.ts"
	assert.NilError(t, wm.ReconcileWatches([]string{name}, nil, nil))
	assert.Equal(t, wm.Realpath(name, nil), name)
	assert.NilError(t, os.Remove(dir+"/prefix"))
	assert.NilError(t, os.Symlink(dir+"/target", dir+"/prefix"))
	wm.onWatchEvents([]fswatch.Event{{Path: dir + "/prefix", Kind: fswatch.EventUpdate}}, nil)
	changes := wm.DrainEvents()
	_, err := wm.RefreshResolutions(changes)
	assert.NilError(t, err)
	assert.NilError(t, wm.ReconcileWatches([]string{name}, nil, nil))
	assert.Equal(t, wm.Realpath(name, nil), dir+"/target/file.ts")
}
