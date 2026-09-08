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
			wm.SetWatchFiles([]string{name})
			reconcile := func() {
				t.Helper()
				assert.NilError(t, wm.ReconcileWatches(map[string]bool{dir: true}))
			}
			reconcile()
			assert.Equal(t, wm.Realpath(name), dir+"/one/file.ts")
			assert.NilError(t, os.Remove(link))
			assert.NilError(t, os.Symlink(dir+"/two"+targetSuffix, link))
			wm.onWatchEvents([]fswatch.Event{{Path: link, Kind: fswatch.EventUpdate}}, nil)
			wm.DrainEvents()
			reconcile()
			assert.Equal(t, wm.Realpath(name), dir+"/two/file.ts")
			wm.onWatchEvents([]fswatch.Event{{Path: dir + "/two/file.ts", Kind: fswatch.EventUpdate}}, nil)
			changed, _ := wm.DrainEvents()
			_, ok := changed[name]
			assert.Assert(t, ok, "new target did not expand: %v", changed)
			reconcile()
			wm.onWatchEvents([]fswatch.Event{{Path: dir + "/one/file.ts", Kind: fswatch.EventUpdate}}, nil)
			changed, _ = wm.DrainEvents()
			_, ok = changed[name]
			assert.Assert(t, !ok, "old target still expands: %v", changed)
		})
	}
}

func TestWatchResolutionAbsentDirectoryAppears(t *testing.T) {
	t.Parallel()
	dir := watchResolutionDirectory(t)
	name := dir + "/new/file.ts"
	filesystem := osvfs.FS()
	wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
	wm.SetWatchFiles([]string{name})
	assert.NilError(t, wm.ReconcileWatches(nil))
	assert.NilError(t, os.Mkdir(dir+"/new", 0o755))
	assert.NilError(t, os.WriteFile(dir+"/target.ts", nil, 0o600))
	assert.NilError(t, os.Symlink(dir+"/target.ts", name))
	wm.onWatchEvents([]fswatch.Event{{Path: dir + "/new", Kind: fswatch.EventUpdate}}, nil)
	wm.DrainEvents()
	assert.NilError(t, wm.ReconcileWatches(nil))
	assert.Equal(t, wm.Realpath(name), dir+"/target.ts")
	assert.NilError(t, os.RemoveAll(dir+"/new"))
	wm.onWatchEvents([]fswatch.Event{{Path: dir + "/new", Kind: fswatch.EventDelete}}, nil)
	changed, _ := wm.DrainEvents()
	assert.Equal(t, changed[name], fswatch.EventDelete)
	assert.NilError(t, wm.ReconcileWatches(nil))
	assert.Equal(t, wm.Realpath(name), name)
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
	wm.SetWatchFiles([]string{name})
	assert.NilError(t, wm.ReconcileWatches(nil))
	assert.Equal(t, wm.Realpath(name), name)
	assert.NilError(t, os.Remove(dir+"/prefix"))
	assert.NilError(t, os.Symlink(dir+"/target", dir+"/prefix"))
	wm.onWatchEvents([]fswatch.Event{{Path: dir + "/prefix", Kind: fswatch.EventUpdate}}, nil)
	wm.DrainEvents()
	assert.NilError(t, wm.ReconcileWatches(nil))
	assert.Equal(t, wm.Realpath(name), dir+"/target/file.ts")
}
