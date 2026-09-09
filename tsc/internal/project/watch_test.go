package project

import (
	"bytes"
	"context"
	"errors"
	"os"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
	"sync/atomic"
	"syscall"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/dirty"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestResolutionLookupGlobsPreserveOriginalNames(t *testing.T) {
	t.Parallel()

	const workspace, current, lib = "/Workspace/K", "/Current/K", "/Library/K"
	for _, tc := range []struct {
		name, file, glob, outside string
	}{
		{name: "workspace", file: workspace + "/main.ts", glob: workspace + "/**/*"},
		{name: "current", file: current + "/main.ts", glob: current + "/**/*"},
		{name: "library", file: lib + "/lib.d.ts", glob: lib + "/**/*"},
		{name: "node modules", file: "/External/K/NODE_MODULES/Pkg/main.ts", glob: "/External/K/NODE_MODULES/**/*"},
		{name: "external", file: "/External/K/Project/main.ts", outside: "/External/K/Project"},
		{name: "NFD", file: "/External/e\u0301/Project/main.ts", outside: "/External/e\u0301/Project"},
	} {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			source := newSourceFS(true, nil, func(name string) tspath.Path {
				return tspath.ToPath(name, current, false)
			})
			source.Track(tc.file)
			result := createResolutionLookupGlobMapper(workspace, lib, current, false)(source.seenFiles)
			if tc.glob != "" {
				assert.DeepEqual(t, result.patternsInsideWorkspace, []string{tc.glob})
				assert.Equal(t, len(result.directoriesOutsideWorkspace), 0)
			} else {
				assert.DeepEqual(t, result.directoriesOutsideWorkspace, []string{tc.outside})
				assert.Equal(t, len(result.patternsInsideWorkspace), 0)
			}
		})
	}
}

func TestGetPathComponentsForWatching(t *testing.T) {
	t.Parallel()

	assert.DeepEqual(t, getPathComponentsForWatching("/project", ""), []string{"/", "project"})
	assert.DeepEqual(t, getPathComponentsForWatching("C:\\project", ""), []string{"C:/", "project"})
	assert.DeepEqual(t, getPathComponentsForWatching("//server/share/project/tsconfig.json", ""), []string{"//server/share", "project", "tsconfig.json"})
	assert.DeepEqual(t, getPathComponentsForWatching(`\\server\share\project\tsconfig.json`, ""), []string{"//server/share", "project", "tsconfig.json"})
	assert.DeepEqual(t, getPathComponentsForWatching("C:\\Users", ""), []string{"C:/Users"})
	assert.DeepEqual(t, getPathComponentsForWatching("C:\\Users\\andrew\\project", ""), []string{"C:/Users/andrew", "project"})
	assert.DeepEqual(t, getPathComponentsForWatching("/home", ""), []string{"/home"})
	assert.DeepEqual(t, getPathComponentsForWatching("/home/andrew/project", ""), []string{"/home/andrew", "project"})
}

func TestNilWatchedFilesClone(t *testing.T) {
	t.Parallel()

	var w *WatchedFiles[int]
	result := w.Clone(42)
	assert.Assert(t, result == nil, "clone on a nil `WatchedFiles` should return nil")
}

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

func newComparerErrorConfigSession(t *testing.T, files map[string]any, main string) (*Session, *failingWatchComparerFS) {
	t.Helper()
	fs := &failingWatchComparerFS{FS: vfstest.FromMap(files, true), err: syscall.EIO}
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(),
		Options: &SessionOptions{
			CurrentDirectory: "/src",
			PositionEncoding: lsproto.PositionEncodingKindUTF8,
			WatchEnabled:     true,
			RunExternalCode:  true,
		},
		FS: fs, Client: &noopClient{}, Spawner: contentmappertest.NewSpawner(),
	})
	t.Cleanup(session.Close)
	session.DidOpenFile(context.Background(), lsconv.FileNameToDocumentURI(main), 1, files[main].(string), lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	assert.Assert(t, errors.Is(session.Snapshot().watchAliasesError, syscall.EIO))
	return session, fs
}

func recoverComparerWithConfigEvent(t *testing.T, session *Session, fs *failingWatchComparerFS, name string, kind lsproto.FileChangeType) {
	t.Helper()
	assert.DeepEqual(t, session.Snapshot().watchNames(name), []string{name})
	fs.err = nil
	session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{
		Uri: lsconv.FileNameToDocumentURI(name), Type: kind,
	}})
	session.WaitForBackgroundTasks()
	assert.NilError(t, session.Snapshot().watchAliasesError)
}

func TestWatchAliasComparerErrorExtendedConfig(t *testing.T) {
	t.Parallel()
	const main = "/src/main.ts"
	const base = "/src/e\u0301/base.json"
	session, fs := newComparerErrorConfigSession(t, map[string]any{
		main:                       "export const value = 1;",
		"/src/tsconfig.json":       `{"extends":"./middle.json","files":["main.ts"]}`,
		"/src/middle.json":         `{"extends":"./e\u0301/base.json"}`,
		base:                       `{"compilerOptions":{"noLib":true,"types":[],"strict":false}}`,
		"/src/other/main.ts":       "export const value = 2;",
		"/src/other/tsconfig.json": `{"extends":"../middle.json","files":["main.ts"]}`,
	}, main)
	otherURI := lsconv.FileNameToDocumentURI("/src/other/main.ts")
	session.DidOpenFile(context.Background(), otherURI, 1, "export const value = 2;", lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	old := session.Snapshot()
	for _, name := range []string{main, otherURI.FileName()} {
		assert.Equal(t, old.GetDefaultProject(lsconv.FileNameToDocumentURI(name)).Program.Options().Strict, core.TSFalse)
	}
	assert.NilError(t, fs.WriteFile(base, `{"compilerOptions":{"noLib":true,"types":[],"strict":true}}`))
	recoverComparerWithConfigEvent(t, session, fs, "/src/\u00e9/base.json", lsproto.FileChangeTypeChanged)
	for _, name := range []string{main, otherURI.FileName()} {
		service, err := session.GetLanguageService(context.Background(), lsconv.FileNameToDocumentURI(name))
		assert.NilError(t, err)
		assert.Equal(t, service.GetProgram().Options().Strict, core.TSTrue)
		assert.Equal(t, old.GetDefaultProject(lsconv.FileNameToDocumentURI(name)).Program.Options().Strict, core.TSFalse)
	}
}

func TestWatchAliasComparerErrorConfigDiscovery(t *testing.T) {
	t.Parallel()
	for _, deletion := range []bool{false, true} {
		name := "creation"
		if deletion {
			name = "deletion"
		}
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			const main = "/src/e\u0301/main.ts"
			const config = "/src/e\u0301/tsconfig.json"
			files := map[string]any{main: "export const value = 1;"}
			configText := `{"compilerOptions":{"noLib":true,"types":[],"strict":true},"files":["main.ts"]}`
			before, after := KindInferred, KindConfigured
			kind := lsproto.FileChangeTypeCreated
			if deletion {
				files[config] = configText
				before, after = after, before
				kind = lsproto.FileChangeTypeDeleted
			}
			session, fs := newComparerErrorConfigSession(t, files, main)
			uri := lsconv.FileNameToDocumentURI(main)
			assert.Equal(t, session.Snapshot().GetDefaultProject(uri).Kind, before)
			if deletion {
				assert.NilError(t, fs.Remove(config))
			} else {
				assert.NilError(t, fs.WriteFile(config, configText))
			}
			// A directory event need not identify the config added or removed beneath it.
			recoverComparerWithConfigEvent(t, session, fs, "/src/\u00e9", kind)
			_, err := session.GetLanguageService(context.Background(), uri)
			assert.NilError(t, err)
			assert.Equal(t, session.Snapshot().GetDefaultProject(uri).Kind, after)
			if !deletion {
				assert.Equal(t, session.Snapshot().GetDefaultProject(uri).Program.Options().Strict, core.TSTrue)
			}
		})
	}
}

func TestWatchAliasComparerErrorContentMapperManifest(t *testing.T) {
	t.Parallel()
	const main = "/src/main.ts"
	const manifest = "/src/e\u0301/package.json"
	session, fs := newComparerErrorConfigSession(t, map[string]any{
		main: "import { version } from './app.box';",
		"/src/tsconfig.json": `{
			"compilerOptions":{"noLib":true,"types":[],"target":"es2020","module":"preserve"},
			"contentMappers":[{"package":"mapper","extensions":[".box"]}],
			"files":["main.ts"]
		}`,
		"/src/node_modules/mapper": vfstest.Symlink("/src/e\u0301"),
		manifest:                   `{"name":"mapper","typescript":{"contentMapper":{"exec":["compiler-test-mapper"]}}}`,
		"/src/app.box":             "export const version = #{target};",
	}, main)
	oldMappers := session.Snapshot().ConfigFileRegistry.contentMappers()
	assert.Assert(t, slices.Contains(oldMappers.extensions, ".box"))
	oldCommandLine := session.Snapshot().GetDefaultProject(lsconv.FileNameToDocumentURI(main)).CommandLine
	assert.Equal(t, oldCommandLine.ContentMappers()[0].Version, "")
	assert.NilError(t, fs.WriteFile(manifest, contentmappertest.PackageJSON(contentmappertest.TransformingMapper)))
	recoverComparerWithConfigEvent(t, session, fs, "/src/\u00e9/package.json", lsproto.FileChangeTypeChanged)
	service, err := session.GetLanguageService(context.Background(), lsconv.FileNameToDocumentURI(main))
	assert.NilError(t, err)
	mappers := session.Snapshot().GetDefaultProject(lsconv.FileNameToDocumentURI(main)).CommandLine.ContentMappers()
	assert.Equal(t, mappers[0].Version, "1.0.0")
	assert.DeepEqual(t, mappers[0].CompilerOptions, []string{"target", "jsx"})
	source := service.GetProgram().GetSourceFile("/src/app.box")
	assert.Assert(t, source != nil)
	assert.Assert(t, strings.Contains(source.Text(), "export const version = 7;"), "mapper manifest was not reloaded: %q", source.Text())
	assert.Assert(t, session.Snapshot().ConfigFileRegistry.contentMappers() != oldMappers)
}

func TestConfigInvalidateAllPreservesClosedFiles(t *testing.T) {
	t.Parallel()
	const main = "/src/main.ts"
	const config tspath.Path = "/src/tsconfig.json"
	session, _ := newComparerErrorConfigSession(t, map[string]any{
		main:           "export const value = 1;",
		string(config): `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`,
	}, main)
	old := session.Snapshot()
	newBuilder := func() *configFileRegistryBuilder {
		return &configFileRegistryBuilder{
			fs:                          newSourceFS(false, old.fs, old.host.toPath),
			configs:                     dirty.NewSyncMap(old.ConfigFileRegistry.configs),
			configFileNames:             dirty.NewMap(old.ConfigFileRegistry.configFileNames),
			allConfiguredContentMappers: old.ConfigFileRegistry.contentMappers(),
		}
	}
	builder := newBuilder()
	change := FileChangeSummary{InvalidateAll: true}
	change.Closed.Add(lsconv.FileNameToDocumentURI(main))
	result := builder.DidChangeFiles(change, nil)
	entry, ok := builder.configs.Load(config)
	assert.Assert(t, ok)
	assert.Equal(t, entry.Value().pendingReload, PendingReloadFull)
	assert.Equal(t, len(entry.Value().retainingOpenFiles), 0)
	assert.Assert(t, builder.allConfiguredContentMappers == nil)
	_, retained := builder.configFileNames.Get(old.host.toPath(main))
	assert.Assert(t, !retained)
	_, affected := result.affectedFiles[old.host.toPath(main)]
	assert.Assert(t, !affected, "a closed file must not be rediscovered during invalidation")
	assert.Equal(t, len(old.ConfigFileRegistry.configs[config].retainingOpenFiles), 1)
	assert.Equal(t, old.ConfigFileRegistry.configs[config].pendingReload, PendingReloadNone)

	// The ordinary high-volume path still avoids reparsing unchanged config text.
	builder = newBuilder()
	builder.invalidateCache(nil, false /*forceFullReload*/)
	entry, ok = builder.configs.Load(config)
	assert.Assert(t, ok)
	assert.Equal(t, entry.Value().pendingReload, PendingReloadFileNames)
	assert.Assert(t, builder.allConfiguredContentMappers != nil)
}

const (
	watchLifecycleLogical  = "/project/node_modules/pkg/lib"
	watchLifecyclePhysical = "/packages/e\u0301"
	watchLifecycleMain     = `import { value } from "pkg/lib"; export { value };`
	watchLifecycleInitial  = `export const value: "initial";`
)

func watchLifecycleFS(useCaseSensitiveFileNames bool) vfs.FS {
	return vfstest.FromMap(map[string]any{
		"/project/tsconfig.json":               `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true,"module":"node16","moduleResolution":"node16"},"files":["main.ts"]}`,
		"/project/main.ts":                     watchLifecycleMain,
		watchLifecycleLogical:                  vfstest.Symlink(watchLifecyclePhysical),
		watchLifecyclePhysical + "/index.d.ts": watchLifecycleInitial,
	}, useCaseSensitiveFileNames)
}

func checkWatchDirectoryRecreation(t *testing.T, fs vfs.FS, deleted, created string, editor []FileChangeKind, api bool) {
	t.Helper()
	ctx := context.Background()
	session := NewSession(&SessionInit{
		BackgroundCtx: ctx, FS: fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	const uri = "file:///project/main.ts"
	session.DidOpenFile(ctx, uri, 1, watchLifecycleMain, lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	old := session.Snapshot()
	old.ref()
	defer old.Deref()
	assert.Assert(t, old.GetDefaultProject(uri).Program.GetSourceFile(watchLifecycleLogical+"/index.d.ts") != nil)

	func() {
		session.snapshotUpdateMu.Lock()
		defer session.snapshotUpdateMu.Unlock()
		events := []*lsproto.FileEvent{
			{Uri: lsconv.FileNameToDocumentURI(deleted), Type: lsproto.FileChangeTypeDeleted},
			{Uri: lsconv.FileNameToDocumentURI(created), Type: lsproto.FileChangeTypeCreated},
		}
		if len(editor) == 0 {
			session.DidChangeWatchedFiles(ctx, events)
			return
		}
		session.DidChangeWatchedFiles(ctx, events[:1])
		for _, kind := range editor {
			if kind == FileChangeKindSave {
				saveURI := lsproto.DocumentUri(uri)
				if !fs.UseCaseSensitiveFileNames() {
					saveURI = lsconv.FileNameToDocumentURI(strings.ToUpper("/project/main.ts"))
				}
				session.DidSaveFile(ctx, saveURI)
			} else {
				session.DidChangeFile(ctx, uri, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
					WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: watchLifecycleMain + "\n"},
				}})
			}
		}
		session.DidChangeWatchedFiles(ctx, events[1:])
	}()

	if api {
		var changes FileChangeSummary
		changes.Changed.Add(lsconv.FileNameToDocumentURI(watchLifecyclePhysical + "/index.d.ts"))
		next, err := session.APIUpdate(ctx, changes, nil)
		assert.NilError(t, err)
		defer next.Deref()
	}
	service, err := session.GetLanguageService(ctx, uri)
	assert.NilError(t, err)
	source := service.GetProgram().GetSourceFile(watchLifecycleLogical + "/index.d.ts")
	assert.Assert(t, source != nil, "directory recreation must not tombstone an unchanged declaration")
	assert.Equal(t, source.Text(), watchLifecycleInitial)
	assert.Equal(t, old.GetDefaultProject(uri).Program.GetSourceFile(watchLifecycleLogical+"/index.d.ts").Text(), watchLifecycleInitial)
	if len(editor) != 0 {
		overlay := session.Snapshot().fs.overlays[session.toPath("/project/main.ts")]
		assert.Equal(t, overlay.Content(), watchLifecycleMain+"\n")
		assert.Equal(t, overlay.Version(), int32(2))
		assert.Equal(t, overlay.MatchesDiskText(), editor[len(editor)-1] == FileChangeKindSave)
	}

	assert.NilError(t, fs.WriteFile(watchLifecyclePhysical+"/index.d.ts", `export const value: "updated";`))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri: lsconv.FileNameToDocumentURI(watchLifecyclePhysical + "/index.d.ts"), Type: lsproto.FileChangeTypeChanged,
	}})
	service, err = session.GetLanguageService(ctx, uri)
	assert.NilError(t, err)
	assert.Equal(t, service.GetProgram().GetSourceFile(watchLifecycleLogical+"/index.d.ts").Text(), `export const value: "updated";`)
}

func TestWatchDirectoryRecreationCoalescesBeforeDeletion(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name, deleted, created string
		editor                 []FileChangeKind
		caseInsensitive        bool
		api                    bool
	}{
		{name: "physical", deleted: watchLifecyclePhysical, created: watchLifecyclePhysical},
		{name: "logical", deleted: watchLifecycleLogical, created: watchLifecycleLogical},
		{name: "physical-to-logical", deleted: watchLifecyclePhysical, created: watchLifecycleLogical},
		{name: "logical-to-physical", deleted: watchLifecycleLogical, created: watchLifecyclePhysical},
		{name: "edit-save", deleted: watchLifecyclePhysical, created: watchLifecycleLogical, editor: []FileChangeKind{FileChangeKindChange, FileChangeKindSave}},
		{name: "save-edit", deleted: watchLifecycleLogical, created: watchLifecyclePhysical, editor: []FileChangeKind{FileChangeKindSave, FileChangeKindChange}},
		{name: "case-insensitive-spellings", deleted: strings.ToUpper(watchLifecyclePhysical), created: watchLifecyclePhysical, caseInsensitive: true},
		{name: "case-insensitive-edit-save", deleted: strings.ToUpper(watchLifecyclePhysical), created: watchLifecyclePhysical, caseInsensitive: true, editor: []FileChangeKind{FileChangeKindChange, FileChangeKindSave}},
		{name: "case-insensitive-save-edit", deleted: strings.ToUpper(watchLifecyclePhysical), created: watchLifecyclePhysical, caseInsensitive: true, editor: []FileChangeKind{FileChangeKindSave, FileChangeKindChange}},
		{name: "api-merge", deleted: watchLifecyclePhysical, created: watchLifecycleLogical, api: true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			checkWatchDirectoryRecreation(t, watchLifecycleFS(!test.caseInsensitive), test.deleted, test.created, test.editor, test.api)
		})
	}
}

func TestWatchDirectoryFinalDeletion(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	fs := watchLifecycleFS(true)
	session := NewSession(&SessionInit{
		BackgroundCtx: ctx, FS: fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	const uri = "file:///project/main.ts"
	session.DidOpenFile(ctx, uri, 1, watchLifecycleMain, lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	assert.NilError(t, fs.Remove(watchLifecyclePhysical+"/index.d.ts"))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{
		{Uri: lsconv.FileNameToDocumentURI(watchLifecyclePhysical), Type: lsproto.FileChangeTypeDeleted},
		{Uri: lsconv.FileNameToDocumentURI(watchLifecycleLogical), Type: lsproto.FileChangeTypeCreated},
		{Uri: lsconv.FileNameToDocumentURI(watchLifecycleLogical), Type: lsproto.FileChangeTypeDeleted},
	})
	service, err := session.GetLanguageService(ctx, uri)
	assert.NilError(t, err)
	assert.Assert(t, service.GetProgram().GetSourceFile(watchLifecycleLogical+"/index.d.ts") == nil)
}

func TestWatchDirectoryCanceledEventsRefreshRealpath(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	fs := &countedWatchAliasFS{FS: watchLifecycleFS(true)}
	session := NewSession(&SessionInit{
		BackgroundCtx: ctx, FS: fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	const uri = "file:///project/main.ts"
	session.DidOpenFile(ctx, uri, 1, watchLifecycleMain, lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	const target = "/packages/other/index.d.ts"
	fs.FS = vfstest.FromMap(map[string]any{
		"/project/tsconfig.json": `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true,"module":"node16","moduleResolution":"node16"},"files":["main.ts"]}`,
		"/project/main.ts":       watchLifecycleMain,
		watchLifecycleLogical:    vfstest.Symlink("/packages/other"),
		target:                   watchLifecycleInitial,
	}, true)
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{
		{Uri: lsconv.FileNameToDocumentURI(watchLifecycleLogical), Type: lsproto.FileChangeTypeCreated},
		{Uri: lsconv.FileNameToDocumentURI(watchLifecycleLogical), Type: lsproto.FileChangeTypeDeleted},
	})
	next, err := session.APIUpdate(ctx, FileChangeSummary{}, nil)
	assert.NilError(t, err)
	defer next.Deref()
	file := next.fs.diskFiles[session.toPath(watchLifecycleLogical+"/index.d.ts")]
	assert.Assert(t, file != nil)
	assert.Equal(t, file.realpathName, target, "canceled notifications must still refresh physical observations")
	assert.NilError(t, fs.WriteFile(target, `export const value: "retargeted";`))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri: lsconv.FileNameToDocumentURI(target), Type: lsproto.FileChangeTypeChanged,
	}})
	service, err := session.GetLanguageService(ctx, uri)
	assert.NilError(t, err)
	assert.Equal(t, service.GetProgram().GetSourceFile(watchLifecycleLogical+"/index.d.ts").Text(), `export const value: "retargeted";`)
}

func TestWatchNotificationsUsePublishedGeneration(t *testing.T) {
	t.Parallel()
	const initial = `import {value} from "one"; export {value};`
	fs := vfstest.FromMap(map[string]any{
		"/project/tsconfig.json":    `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true},"files":["main.ts"]}`,
		"/project/main.ts":          initial,
		"/project/node_modules/one": vfstest.Symlink("/packages/pkg"),
		"/project/node_modules/two": vfstest.Symlink("/packages/pkg"),
		"/packages/pkg/index.d.ts":  `export const value: "initial";`,
	}, true)
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(), FS: fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	ctx := context.Background()
	session.DidOpenFile(ctx, "file:///project/main.ts", 1, initial, lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()

	// A notification can arrive after a clone's input was flushed but before
	// that clone is published. It must not capture the receipt-time aliases.
	session.snapshotUpdateMu.Lock()
	defer session.snapshotUpdateMu.Unlock()
	old := session.Snapshot()
	old.ref()
	defer old.Deref()
	assert.NilError(t, fs.WriteFile("/packages/pkg/index.d.ts", `export const value: "updated";`))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri: "file:///packages/pkg/index.d.ts", Type: lsproto.FileChangeTypeChanged,
	}})
	session.pendingFileChangesMu.Lock()
	pending := append([]FileChange(nil), session.pendingFileChanges...)
	session.pendingFileChangesMu.Unlock()
	assert.Equal(t, len(pending), 1, "only the raw notification belongs in the pending queue")
	assert.Equal(t, pending[0].URI, lsproto.DocumentUri("file:///packages/pkg/index.d.ts"))

	edits, overlays := session.fs.processChanges([]FileChange{{
		Kind: FileChangeKindChange, URI: "file:///project/main.ts", Version: 2,
		Changes: []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
			WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: `import {value} from "two"; export {value};`},
		}},
	}})
	session.UpdateSnapshot(ctx, overlays, SnapshotChange{
		fileChanges: edits, ResourceRequest: ResourceRequest{Documents: []lsproto.DocumentUri{"file:///project/main.ts"}},
	})
	assert.Assert(t, session.Snapshot() != old)

	session.pendingFileChangesMu.Lock()
	changes, overlays := session.flushChangesLocked(ctx)
	session.pendingFileChangesMu.Unlock()
	assert.Assert(t, changes.Changed.Has("file:///project/node_modules/two/index.d.ts"), "preparation must use the newly published registration")
	session.UpdateSnapshot(ctx, overlays, SnapshotChange{
		fileChanges: changes, ResourceRequest: ResourceRequest{Documents: []lsproto.DocumentUri{"file:///project/main.ts"}},
	})
	source := session.Snapshot().GetDefaultProject("file:///project/main.ts").Program.GetSourceFile("/project/node_modules/two/index.d.ts")
	assert.Assert(t, source != nil)
	assert.Equal(t, source.Text(), `export const value: "updated";`)
	assert.Equal(t, old.GetDefaultProject("file:///project/main.ts").Program.GetSourceFile("/project/node_modules/one/index.d.ts").Text(), `export const value: "initial";`)
}

func TestWatchPreparationSerializesBackgroundAdoption(t *testing.T) {
	t.Parallel()
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(), FS: vfstest.FromMap(map[string]string{}, true), Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	base := session.Snapshot()
	clone, err := session.CloneSnapshot(context.Background(), base, FileChangeSummary{}, nil)
	assert.NilError(t, err)
	session.snapshotUpdateMu.Lock()
	started, adopted := make(chan struct{}), make(chan struct{})
	go func() {
		close(started)
		session.adoptSnapshotChange(base, clone)
		close(adopted)
	}()
	<-started
	var adoptedEarly bool
	select {
	case <-adopted:
		adoptedEarly = true
	case <-time.After(20 * time.Millisecond):
		adoptedEarly = session.Snapshot() != base
	}
	session.snapshotUpdateMu.Unlock()
	<-adopted
	assert.Assert(t, !adoptedEarly, "background adoption changed the base inside the preparation-to-clone boundary")
	assert.Assert(t, session.Snapshot() == clone)
}

func TestWatchAliasDisabledSaveKeepsSnapshot(t *testing.T) {
	t.Parallel()
	for _, enabled := range []bool{false, true} {
		t.Run(strconv.FormatBool(enabled), func(t *testing.T) {
			t.Parallel()
			const uri = "file:///src/main.ts"
			const text = "export const value = 1;"
			fs := vfstest.FromMap(map[string]string{
				"/src/tsconfig.json": `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`,
				"/src/main.ts":       text,
			}, true)
			session := NewSession(&SessionInit{
				BackgroundCtx: context.Background(), FS: fs, Client: &noopClient{},
				Options: &SessionOptions{CurrentDirectory: "/src", WatchEnabled: enabled},
			})
			defer session.Close()
			session.DidOpenFile(context.Background(), uri, 1, text, lsproto.LanguageKindTypeScript)
			_, err := session.GetLanguageService(context.Background(), uri)
			assert.NilError(t, err)
			session.WaitForBackgroundTasks()
			previous := session.Snapshot()
			session.DidSaveFile(context.Background(), uri)
			_, err = session.GetLanguageService(context.Background(), uri)
			assert.NilError(t, err)
			assert.Assert(t, session.Snapshot() == previous, "hosts without alias state must not clone only to refresh aliases")
		})
	}
}

func TestWatchAliasSaveWithoutOverlay(t *testing.T) {
	t.Parallel()
	const main = `import {value} from "pkg"; export {value};`
	fs := vfstest.FromMap(map[string]any{
		"/project/tsconfig.json":    `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true},"files":["main.ts"]}`,
		"/project/main.ts":          main,
		"/project/node_modules/pkg": vfstest.Symlink("/packages/pkg"),
		"/packages/pkg/index.d.ts":  `export const value: "initial";`,
	}, true)
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(), FS: fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	ctx := context.Background()
	session.DidOpenFile(ctx, "file:///project/main.ts", 1, main, lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	assert.NilError(t, fs.WriteFile("/packages/pkg/index.d.ts", `export const value: "saved";`))
	session.DidSaveFile(ctx, "file:///packages/pkg/index.d.ts")
	service, err := session.GetLanguageService(ctx, "file:///project/main.ts")
	assert.NilError(t, err)
	assert.Equal(t, service.GetProgram().GetSourceFile("/project/node_modules/pkg/index.d.ts").Text(), `export const value: "saved";`)
}
