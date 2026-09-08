package watchmanager

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/cachedvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
)

type benchmarkWatchFS struct {
	vfs.FS
	resolves        int
	scans           int
	comparerQueries int
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
				reconcile := func(wm *WatchManager) {
					// Include the caller's dependency-directory computation.
					for _, name := range names {
						wm.Realpath(name)
					}
					wm.SetWatchFiles(names)
					if err := wm.ReconcileWatches(desired); err != nil {
						b.Fatal(err)
					}
				}
				var resolutionFS vfs.FS
				create := func() *WatchManager {
					wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
					wm.SetResolutionFS(resolutionFS)
					reconcile(wm)
					wm.SetResolutionFS(nil)
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
							filesystem.resolves, filesystem.scans, filesystem.comparerQueries = 0, 0, 0
							b.ReportAllocs()
							for b.Loop() {
								operation()
							}
							b.ReportMetric(float64(filesystem.resolves)/float64(b.N), "realpaths/op")
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
								wm.DrainEvents()
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
