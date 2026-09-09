package watchmanager

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/cachedvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

func TestWatchAliasNativeContainment(t *testing.T) { //nolint:paralleltest // Keep native subscriptions sequential to bound kqueue descriptors and event delays.
	for _, backend := range []fswatch.Watcher{fswatch.Default(), fswatch.Kqueue()} { //nolint:paralleltest // Native subscriptions are intentionally sequential.
		for _, pair := range []struct{ disk, requested string }{
			{"ASCII", "ascii"},
			{"s", "\u017f"},
			{"SS", "\u00df"},
			{"\u00e9", "e\u0301"},
		} {
			t.Run(backend.Name()+"/"+pair.disk, func(t *testing.T) {
				dir, err := filepath.Abs(fmt.Sprintf(".watch-alias-%d-%s-%s", os.Getpid(), backend.Name(), pair.disk))
				if err != nil {
					t.Fatal(err)
				}
				if err = os.Mkdir(dir, 0o755); err != nil {
					t.Fatal(err)
				}
				defer os.RemoveAll(dir)
				disk := filepath.Join(dir, pair.disk)
				requested := filepath.Join(dir, pair.requested)
				if err = os.Mkdir(disk, 0o755); err != nil {
					t.Fatal(err)
				}
				a, err := os.Stat(disk)
				if err != nil {
					t.Fatal(err)
				}
				b, err := os.Stat(requested)
				if err != nil || !os.SameFile(a, b) {
					t.Skip("volume does not equate these filename spellings")
				}
				filesystem := osvfs.FS()
				wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
				wm.SetBackend(&FSWatchBackend{Inner: backend})
				wm.Lock()
				err = wm.ReconcileWatches(nil, map[string]bool{requested: false}, nil)
				wm.Unlock()
				if err != nil {
					t.Fatal(err)
				}
				defer wm.CloseAllWatches()
				if err := os.Mkdir(filepath.Join(disk, "child"), 0o755); err != nil {
					t.Fatal(err)
				}
				deadline := time.NewTimer(5 * time.Second)
				defer deadline.Stop()
				for {
					select {
					case <-wm.DoCycleCh():
						wm.Lock()
						changes := wm.DrainEvents()
						found := false
						covered := false
						for event := range changes.Changes {
							if strings.HasSuffix(event, "/child") {
								found = true
								if wm.IsPathUnderWatch(event, caseInsensitiveOpts) {
									covered = true
								}
							}
						}
						wm.Unlock()
						if changes.Overflow {
							t.Fatal("unexpected overflow")
						}
						if found {
							if !covered {
								t.Errorf("child events %v are outside their requested root %q", changes.Changes, requested)
							}
							return
						}
					case <-deadline.C:
						t.Fatal("no delivered child event")
					}
				}
			})
		}
	}
}

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

type benchmarkWatchFS struct {
	vfs.FS
	resolves        int
	leafResolves    int
	scans           int
	comparerQueries int
}

func (f *benchmarkWatchFS) RealpathWithParent(path string, realpath func(string) string) string {
	f.leafResolves++
	return vfs.RealpathWithParent(f.FS, path, realpath)
}

func (f *benchmarkWatchFS) Realpath(path string) string {
	f.resolves++
	return f.FS.Realpath(path)
}

func (f *benchmarkWatchFS) GetAccessibleEntries(path string) vfs.Entries {
	f.scans++
	return f.FS.GetAccessibleEntries(path)
}

func (f *benchmarkWatchFS) WatchPathComparer(path string) (fswatch.PathComparer, error) {
	f.comparerQueries++
	return f.FS.(interface {
		WatchPathComparer(directory string) (fswatch.PathComparer, error)
	}).WatchPathComparer(path)
}

func BenchmarkWatchAliasGeneration(b *testing.B) {
	root, rootErr := filepath.Abs(fmt.Sprintf("../../../../.watch-alias-bench-%d-%d", os.Getpid(), time.Now().UnixNano()))
	if rootErr != nil {
		b.Fatal(rootErr)
	}
	if err := os.Mkdir(root, 0o755); err != nil {
		b.Fatal(err)
	}
	b.Cleanup(func() { os.RemoveAll(root) })
	root = filepath.ToSlash(root)
	comparer, comparerErr := fswatch.PathComparerForPath(root)
	if comparerErr != nil {
		b.Fatal(comparerErr)
	}
	if comparer.Key("s") != comparer.Key("\u017f") {
		b.Skip("requires native case-insensitive watch comparison")
	}
	for _, count := range []int{1000, 10000, 50000} {
		for _, spelling := range []string{"ascii", "unicode"} {
			b.Run(fmt.Sprintf("%s/%d", spelling, count), func(b *testing.B) {
				filesystem := &benchmarkWatchFS{FS: osvfs.FS()}
				dir := fmt.Sprintf("%s/%s-%d", root, spelling, count)
				if err := os.Mkdir(dir, 0o755); err != nil {
					b.Fatal(err)
				}
				names := make([]string, count)
				desired := make(map[string]bool)
				for i := range names {
					physical := fmt.Sprintf("%s/s%d", dir, i/10)
					if i%10 == 0 {
						if err := os.Mkdir(physical, 0o755); err != nil {
							b.Fatal(err)
						}
					}
					prefix := "s"
					if spelling == "unicode" {
						prefix = "\u017f"
					}
					// Missing leaves model failed lookups; their subscription
					// directories exist and use the actual native volume comparer.
					names[i] = fmt.Sprintf("%s/%s%d/file%d.ts", dir, prefix, i/10, i)
					desired[fmt.Sprintf("%s/%s%d", dir, prefix, i/10)] = false
				}
				var resolutionFS vfs.FS
				reconcile := func(wm *WatchManager) {
					// Include the caller's dependency-directory computation.
					for _, name := range names {
						wm.Realpath(name, resolutionFS)
					}
					if err := wm.ReconcileWatches(names, desired, resolutionFS); err != nil {
						b.Fatal(err)
					}
				}
				create := func() *WatchManager {
					wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
					reconcile(wm)
					return wm
				}
				for _, fixture := range []string{"missing", "existing"} {
					if fixture == "existing" {
						for i, name := range names {
							if i%100 == 0 {
								target := fmt.Sprintf("%s/target%d.ts", dir, i)
								if err := os.WriteFile(target, nil, 0o600); err != nil {
									b.Fatal(err)
								}
								if err := os.Symlink(target, name); err != nil {
									b.Fatal(err)
								}
							} else if err := os.WriteFile(name, nil, 0o600); err != nil {
								b.Fatal(err)
							}
						}
					}
					b.Run(fixture, func(b *testing.B) {
						report := func(b *testing.B, operation func()) {
							filesystem.resolves, filesystem.leafResolves, filesystem.scans, filesystem.comparerQueries = 0, 0, 0, 0
							b.ReportAllocs()
							for b.Loop() {
								operation()
							}
							b.ReportMetric(float64(filesystem.resolves)/float64(b.N), "realpaths/op")
							b.ReportMetric(float64(filesystem.leafResolves)/float64(b.N), "leaf-resolutions/op")
							b.ReportMetric(float64(filesystem.scans)/float64(b.N), "scans/op")
							b.ReportMetric(float64(filesystem.comparerQueries)/float64(b.N), "comparer-queries/op")
						}
						b.Run("construct-native", func(b *testing.B) {
							report(b, func() { create() })
						})
						b.Run("construct-build-cache", func(b *testing.B) {
							cached := cachedvfs.From(filesystem)
							for directory := range desired {
								cached.GetAccessibleEntries(directory)
							}
							// Model the build's already-resolved dependencies, not
							// free cold work: setup is explicitly reported separately.
							for _, name := range names {
								cached.Realpath(name)
							}
							resolutionFS = cached
							report(b, func() { create() })
							resolutionFS = nil
							b.ReportMetric(float64(len(desired)), "setup-scans")
							b.ReportMetric(float64(len(names)), "setup-realpaths")
						})
						wm := create()
						event := []fswatch.Event{{Path: dir + "/s0/file1.ts", Kind: fswatch.EventUpdate}}
						b.Run("unchanged", func(b *testing.B) {
							report(b, func() { reconcile(wm) })
						})
						b.Run("incremental", func(b *testing.B) {
							report(b, func() {
								wm.onWatchEvents(event, nil)
								changes := wm.DrainEvents()
								if _, err := wm.RefreshResolutions(changes); err != nil {
									b.Fatal(err)
								}
								reconcile(wm)
							})
						})
						b.Run("expand-event", func(b *testing.B) {
							report(b, func() {
								wm.onWatchEvents(event, nil)
								wm.DrainEvents()
							})
						})
					})
				}
			})
		}
	}
}
