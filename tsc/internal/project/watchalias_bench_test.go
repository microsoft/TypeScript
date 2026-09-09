package project

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync/atomic"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

type countedWatchAliasFS struct {
	vfs.FS
	comparisonFS    vfs.FS
	comparerQueries atomic.Int64
	realpaths       atomic.Int64
}

func (f *countedWatchAliasFS) WatchPathComparisonEnabled() bool {
	return f.comparisonFS != nil
}

func (f *countedWatchAliasFS) WatchPathComparer(directory string) (fswatch.PathComparer, error) {
	f.comparerQueries.Add(1)
	return f.comparisonFS.(interface {
		WatchPathComparer(directory string) (fswatch.PathComparer, error)
	}).WatchPathComparer(directory)
}

func (f *countedWatchAliasFS) Realpath(name string) string {
	f.realpaths.Add(1)
	return f.FS.Realpath(name)
}

// These benchmarks exercise snapshot publication itself, not a detached Index.
// File contents are virtual; native comparer queries use existing repository
// ancestors, so setup needs neither 50,000 disk files nor a native watcher.
func BenchmarkSnapshotWatchAliases(b *testing.B) {
	benchmarkSnapshotWatchAliases(b, false)
}

func BenchmarkSnapshotWatchAliasRealpaths(b *testing.B) {
	benchmarkSnapshotWatchAliases(b, true)
}

func benchmarkSnapshotWatchAliases(b *testing.B, symlink bool) {
	directory, directoryErr := os.Getwd()
	if directoryErr != nil {
		b.Fatal(directoryErr)
	}
	directory = filepath.ToSlash(directory)
	for _, size := range []int{1000, 10000, 50000} {
		for _, spelling := range []string{"ASCII", "Unicode"} {
			for _, mode := range []string{"native", "mock", "disabled"} {
				b.Run(fmt.Sprintf("%s/%s/%d", mode, spelling, size), func(b *testing.B) {
					names := make([]string, size)
					files := make(map[string]any, size)
					logicalRoot := directory + "/watch-bench"
					physicalRoot := logicalRoot
					if symlink {
						logicalRoot += "/node_modules/pkg"
						physicalRoot += "/physical"
						files[logicalRoot] = vfstest.Symlink(physicalRoot)
					}
					for i := range size {
						base := "file"
						if spelling == "Unicode" {
							base = "Café_İ_ſ"
						}
						suffix := fmt.Sprintf("/group%d/%s%d.ts", i/100, base, i)
						names[i] = logicalRoot + suffix
						files[physicalRoot+suffix] = "export const value = 1;"
					}
					fs := &countedWatchAliasFS{FS: vfstest.FromMap(files, true)}
					configName := directory + "/watch-bench/tsconfig.json"
					config, configErr := json.Marshal(map[string]any{
						"compilerOptions": map[string]any{"noLib": true, "types": []string{}},
						"files":           names,
					})
					if configErr != nil {
						b.Fatal(configErr)
					}
					if err := fs.WriteFile(configName, string(config)); err != nil {
						b.Fatal(err)
					}
					if mode == "native" {
						fs.comparisonFS = osvfs.FS()
						if !fswatch.NativePathComparisonAvailable {
							b.Skip("native comparison unavailable")
						}
					}
					host := NewSnapshotHost(&SessionInit{FS: fs, Options: &SessionOptions{
						CurrentDirectory: directory, WatchEnabled: mode != "disabled",
					}})
					defer host.Close()
					b.Run("cold", func(b *testing.B) {
						snapshot := host.newRootSnapshot(0, false)
						defer snapshot.Deref()
						snapshot.fs.diskFiles = make(map[tspath.Path]*diskFile, size)
						for _, name := range names {
							file := newDiskFile(name, "export const value = 1;")
							if symlink {
								file.realpathName = physicalRoot + strings.TrimPrefix(name, logicalRoot)
								snapshot.fs.realpathFiles++
							}
							snapshot.fs.diskFiles[host.toPath(name)] = file
						}
						fs.comparerQueries.Store(0)
						fs.realpaths.Store(0)
						b.ReportAllocs()
						b.ResetTimer()
						for b.Loop() {
							snapshot.initializeWatchAliases(nil)
						}
						b.ReportMetric(float64(fs.comparerQueries.Load())/float64(b.N), "comparer-queries/op")
						b.ReportMetric(float64(fs.realpaths.Load())/float64(b.N), "realpath/op")
					})
					b.Run("clone-edit", func(b *testing.B) {
						setupStart := time.Now()
						fs.comparerQueries.Store(0)
						fs.realpaths.Store(0)
						root := host.NewStandaloneRootSnapshot()
						defer root.Deref()
						projects := collections.NewSetFromItems(configName)
						snapshot, err := host.CloneSnapshot(context.Background(), root, FileChangeSummary{}, &APISnapshotRequest{OpenProjects: projects})
						if err != nil {
							b.Fatal(err)
						}
						uri := lsconv.FileNameToDocumentURI(names[0])
						opened, err := host.CloneSnapshotWithTemporaryFile(context.Background(), snapshot, uri, "export const value = 1;")
						snapshot.Deref()
						if err != nil {
							b.Fatal(err)
						}
						snapshot = opened
						if project := snapshot.ProjectCollection.ConfiguredProject(host.toPath(configName)); project == nil || len(project.Program.GetSourceFiles()) != size {
							b.Fatal("benchmark lost its configured project files")
						}
						setupTime := time.Since(setupStart)
						setupComparerQueries, setupRealpaths := fs.comparerQueries.Load(), fs.realpaths.Load()
						fs.comparerQueries.Store(0)
						fs.realpaths.Store(0)
						b.ReportAllocs()
						b.ResetTimer()
						for b.Loop() {
							next, err := host.CloneSnapshotWithTemporaryFile(context.Background(), snapshot, uri, fmt.Sprintf("export const value = %d;", snapshot.id))
							if err != nil {
								b.Fatal(err)
							}
							snapshot.Deref()
							snapshot = next
							if len(snapshot.ProjectCollection.ConfiguredProject(host.toPath(configName)).Program.GetSourceFiles()) != size {
								b.Fatal("clone lost its configured project files")
							}
						}
						b.StopTimer()
						b.ReportMetric(float64(fs.comparerQueries.Load())/float64(b.N), "comparer-queries/op")
						b.ReportMetric(float64(fs.realpaths.Load())/float64(b.N), "realpath/op")
						b.ReportMetric(float64(setupComparerQueries), "setup-comparer-queries")
						b.ReportMetric(float64(setupRealpaths), "setup-realpath")
						b.ReportMetric(float64(setupTime.Nanoseconds()), "setup-ns")
						snapshot.Deref()
					})
				})
			}
		}
	}
}
