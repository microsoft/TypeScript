package project

import (
	"bytes"
	"context"
	"errors"
	"os"
	"path/filepath"
	"slices"
	"strings"
	"sync/atomic"
	"syscall"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

func TestWatchAliasesMockFilesystem(t *testing.T) {
	t.Parallel()
	for _, sensitive := range []bool{false, true} {
		fs := vfstest.FromMap(map[string]string{"/src/ſ.ts": "original"}, sensitive)
		host := NewSnapshotHost(&SessionInit{FS: fs, Options: &SessionOptions{CurrentDirectory: "/src", WatchEnabled: true}})
		snapshot := host.newSnapshot(1, &SnapshotFS{
			diskFiles: map[tspath.Path]*diskFile{host.toPath("/src/ſ.ts"): newDiskFile("/src/ſ.ts", "original")},
		}, &ConfigFileRegistry{}, nil, host.newRootSnapshot(0, false).userPreferences, nil, nil)
		snapshot.initializeWatchAliases(nil)
		if got := snapshot.watchNames("/src/s.ts"); !slices.Equal(got, []string{"/src/s.ts"}) {
			t.Fatalf("mock filesystem acquired host Unicode semantics: %q", got)
		}
		source := newSourceFS(true, snapshot.fs, host.toPath)
		source.Track("/src/İ.ts")
		if name, ok := source.seenFiles.Load(host.toPath("/src/İ.ts")); !ok || name != "/src/İ.ts" {
			t.Fatal("watch index input lost original spelling")
		}
	}
}

type failingWatchComparerFS struct {
	vfs.FS
	err   error
	calls int
}

func (fs *failingWatchComparerFS) WatchPathComparer(string) (fswatch.PathComparer, error) {
	fs.calls++
	return fswatch.PathComparer{}, fs.err
}

type watchAliasClient struct {
	noopClient
	refreshes atomic.Int32
}

func (c *watchAliasClient) RefreshDiagnostics(context.Context) error {
	c.refreshes.Add(1)
	return nil
}

func TestWatchAliasComparerErrorsSurface(t *testing.T) {
	t.Parallel()
	for _, want := range []error{syscall.EACCES, syscall.EIO} {
		t.Run(want.Error(), func(t *testing.T) {
			t.Parallel()
			const mainText = `import { value } from "./value";`
			disk := vfstest.FromMap(map[string]string{
				"/src/tsconfig.json": `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`,
				"/src/main.ts":       mainText,
				"/src/value.ts":      "export const value = 1;",
			}, true)
			fs := &failingWatchComparerFS{FS: disk, err: want}
			var logs bytes.Buffer
			client := &watchAliasClient{}
			session := NewSession(&SessionInit{
				BackgroundCtx: context.Background(),
				Options: &SessionOptions{
					CurrentDirectory: "/src",
					PositionEncoding: lsproto.PositionEncodingKindUTF8,
					WatchEnabled:     true,
				},
				FS: fs, Logger: logging.NewLogger(&logs), Client: client,
			})
			var recovered any
			func() {
				defer func() { recovered = recover() }()
				session.DidOpenFile(context.Background(), "file:///src/main.ts", 1, mainText, lsproto.LanguageKindTypeScript)
			}()
			if recovered != nil {
				t.Fatalf("filesystem comparison lookup failure panicked while adopting a session snapshot: %v", recovered)
			}
			defer session.Close()
			session.WaitForBackgroundTasks()
			if !session.snapshotMu.TryLock() {
				t.Fatal("filesystem comparison lookup failure left the snapshot mutex locked")
			}
			session.snapshotMu.Unlock()
			snapshot := session.Snapshot()
			if !errors.Is(snapshot.watchAliasesError, want) || snapshot.watchAliases != nil {
				t.Fatalf("failed generation did not retain the filesystem comparison lookup error: %v", snapshot.watchAliasesError)
			}
			if !strings.Contains(logs.String(), want.Error()) || !strings.Contains(logs.String(), "invalidat") {
				t.Fatalf("missing degraded-watch warning with logging disabled: %s", logs.String())
			}
			for _, kind := range []lsproto.FileChangeType{lsproto.FileChangeTypeCreated, lsproto.FileChangeTypeChanged, lsproto.FileChangeTypeDeleted} {
				var changes FileChangeSummary
				switch kind {
				case lsproto.FileChangeTypeCreated:
					changes.Created.Add("file:///unrelated/alias.data")
				case lsproto.FileChangeTypeChanged:
					changes.Changed.Add("file:///unrelated/alias.data")
				case lsproto.FileChangeTypeDeleted:
					changes.Deleted.Add("file:///unrelated/alias.data")
				}
				if !snapshot.expandWatchAliases(changes).InvalidateAll {
					t.Fatal("failed index did not conservatively invalidate watch events")
				}
			}
			if snapshot.expandWatchAliases(FileChangeSummary{}).InvalidateAll {
				t.Fatal("failed index invalidated a generation without watch events")
			}
			calls := fs.calls
			if err := disk.WriteFile("/src/value.ts", `export const value = "changed";`); err != nil {
				t.Fatal(err)
			}
			fs.err = nil
			refreshes := client.refreshes.Load()
			session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{
				Uri: "file:///unrelated/alias.data", Type: lsproto.FileChangeTypeChanged,
			}})
			session.WaitForBackgroundTasks()
			next := session.Snapshot()
			if next == snapshot || client.refreshes.Load() <= refreshes {
				t.Fatal("failed index did not schedule snapshot and diagnostic refreshes for an unrecognized alias")
			}
			if fs.calls <= calls {
				t.Fatal("next generation did not retry the comparer query")
			}
			var changes FileChangeSummary
			changes.Changed.Add("file:///unrelated/alias.data")
			if next.expandWatchAliases(changes).InvalidateAll {
				t.Fatal("successful generation retained degraded invalidation")
			}
			service, err := session.GetLanguageService(context.Background(), "file:///src/main.ts")
			if err != nil {
				t.Fatal(err)
			}
			source := service.GetProgram().GetSourceFile("/src/value.ts")
			if source == nil || source.Text() != `export const value = "changed";` {
				t.Fatal("degraded watch refresh did not discard stale source contents")
			}
		})
	}
}

func TestWatchAliasesDisabledDoesNotProbe(t *testing.T) {
	t.Parallel()
	fs := &failingWatchComparerFS{FS: vfstest.FromMap(map[string]string{}, true), err: errors.New("unexpected comparer query")}
	host := NewSnapshotHost(&SessionInit{FS: fs, Options: &SessionOptions{CurrentDirectory: "/src"}})
	snapshot := host.newRootSnapshot(0, false)
	defer snapshot.Deref()
	snapshot.fs.diskFiles = map[tspath.Path]*diskFile{"/src/main.ts": newDiskFile("/src/main.ts", "")}
	snapshot.initializeWatchAliases(nil)
	if fs.calls != 0 {
		t.Fatal("watch-disabled snapshot queried native watch comparer")
	}
}

func TestWatchAliasesStandaloneErrors(t *testing.T) {
	t.Parallel()
	for _, watchEnabled := range []bool{false, true} {
		for _, program := range []bool{false, true} {
			fs := &failingWatchComparerFS{
				FS: vfstest.FromMap(map[string]string{
					"/src/tsconfig.json": `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`,
					"/src/main.ts":       "export const value = 1;",
				}, true),
				err: syscall.EACCES,
			}

			host := NewSnapshotHost(&SessionInit{
				FS: fs, Options: &SessionOptions{CurrentDirectory: "/src", WatchEnabled: watchEnabled},
			})
			root := host.NewStandaloneRootSnapshot()
			var snapshot *Snapshot
			var err error
			if program {
				snapshot = host.CloneSnapshotForProgram(
					context.Background(), root, []string{"/src/main.ts"},
					&core.CompilerOptions{NoLib: core.TSTrue}, nil, nil, nil, FileChangeSummary{},
				)
				err = snapshot.apiError
			} else {
				var projects collections.Set[string]
				projects.Add("/src/tsconfig.json")
				snapshot, err = host.CloneSnapshot(context.Background(), root, FileChangeSummary{}, &APISnapshotRequest{OpenProjects: &projects})
			}
			if watchEnabled {
				if !errors.Is(err, syscall.EACCES) {
					t.Fatalf("standalone clone (program=%v) lost filesystem comparison lookup error: %v", program, err)
				}
			} else if err != nil || fs.calls != 0 {
				t.Fatalf("watch-disabled clone (program=%v) queried comparer: calls=%d, err=%v", program, fs.calls, err)
			}
			snapshot.Deref()
			if watchEnabled && !program {
				overlaySnapshot, err := host.CloneSnapshotWithTemporaryFile(context.Background(), root, "file:///src/main.ts", "export const value = 2;")
				overlaySnapshot.Deref()
				if !errors.Is(err, syscall.EACCES) {
					t.Fatalf("temporary-file clone lost filesystem comparison lookup error: %v", err)
				}
			}
			root.Deref()
			host.Close()
		}
	}
}

func TestWatchAliasesRegularFileAncestor(t *testing.T) {
	t.Parallel()
	directory, err := os.Getwd()
	if err != nil {
		t.Fatal(err)
	}
	host := NewSnapshotHost(&SessionInit{
		FS: osvfs.FS(), Options: &SessionOptions{CurrentDirectory: filepath.ToSlash(directory), WatchEnabled: true},
	})
	defer host.Close()
	root := host.NewStandaloneRootSnapshot()
	defer root.Deref()
	root.compilerOptionsForInferredProjects = &core.CompilerOptions{NoLib: core.TSTrue}
	// Keep the source in an overlay; watchalias.go is an existing regular file,
	// so this unresolved import makes native comparer queries encounter ENOTDIR.
	snapshot, err := host.CloneSnapshotWithTemporaryFile(context.Background(), root,
		lsconv.FileNameToDocumentURI(filepath.ToSlash(filepath.Join(directory, "watch-alias-malformed-import.ts"))),
		`import "./watchalias.go/missing";`,
	)
	if snapshot != nil {
		defer snapshot.Deref()
	}
	if err != nil {
		t.Fatal(err)
	}
	if (snapshot.watchAliases != nil) != fswatch.NativePathComparisonAvailable || snapshot.watchAliasesError != nil {
		t.Fatalf("regular-file ancestor disabled native aliases: %v", snapshot.watchAliasesError)
	}
}
