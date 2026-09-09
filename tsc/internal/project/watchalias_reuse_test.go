package project

import (
	"context"
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

func TestWatchAliasSnapshotReuse(t *testing.T) {
	t.Parallel()
	disk := vfstest.FromMap(map[string]string{
		"/src/tsconfig.json": `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`,
		"/src/main.ts":       "export const value = 1;",
		"/src/other.ts":      "export const other = 1;",
	}, true)
	fs := &failingWatchComparerFS{FS: disk}
	host := NewSnapshotHost(&SessionInit{FS: fs, Options: &SessionOptions{CurrentDirectory: "/src", WatchEnabled: true}})
	defer host.Close()
	root := host.NewStandaloneRootSnapshot()
	defer root.Deref()
	snapshot, err := host.CloneSnapshot(context.Background(), root, FileChangeSummary{}, &APISnapshotRequest{
		OpenProjects: collections.NewSetFromItems("/src/tsconfig.json"),
	})
	if err != nil {
		t.Fatal(err)
	}
	defer func() { snapshot.Deref() }()
	opened, err := host.CloneSnapshotWithTemporaryFile(context.Background(), snapshot, "file:///src/main.ts", "export const value = 1;")
	if err != nil {
		t.Fatal(err)
	}
	snapshot.Deref()
	snapshot = opened
	for range 3 {
		calls, aliases := fs.calls, snapshot.watchAliases
		next, cloneErr := host.CloneSnapshotWithTemporaryFile(context.Background(), snapshot, "file:///src/main.ts", "export const value = 2;")
		if cloneErr != nil {
			t.Fatal(cloneErr)
		}
		snapshot.Deref()
		snapshot = next
		if fs.calls != calls || snapshot.watchAliases != aliases {
			t.Fatalf("content edit rebuilt immutable aliases: comparer queries %d -> %d", calls, fs.calls)
		}
	}
	for _, name := range []lsproto.DocumentUri{"file:///unrelated/ignored", "file:///src/main.ts", "file:///src/node_modules/ignored"} {
		calls, aliases := fs.calls, snapshot.watchAliases
		var changes FileChangeSummary
		changes.Changed.Add(name)
		next, cloneErr := host.CloneSnapshot(context.Background(), snapshot, changes, nil)
		if cloneErr != nil {
			t.Fatal(cloneErr)
		}
		snapshot.Deref()
		snapshot = next
		if fs.calls == calls || snapshot.watchAliases == aliases {
			t.Fatalf("filesystem change %s reused aliases after filtering", name)
		}
	}
	calls, aliases := fs.calls, snapshot.watchAliases
	next, err := host.CloneSnapshotWithTemporaryFile(context.Background(), snapshot, "file:///src/main.ts", `import "./other"; export const value = 3;`)
	if err != nil {
		t.Fatal(err)
	}
	snapshot.Deref()
	snapshot = next
	if fs.calls == calls || aliases == snapshot.watchAliases {
		t.Fatal("new import names reused aliases")
	}
	if snapshot.ProjectCollection.ConfiguredProject(host.toPath("/src/tsconfig.json")).Program.GetSourceFile("/src/other.ts") == nil {
		t.Fatal("new import was not loaded")
	}
	calls, aliases = fs.calls, snapshot.watchAliases
	next, err = host.CloneSnapshotWithTemporaryFile(context.Background(), snapshot, "file:///src/main.ts", "export const value = 4;")
	if err != nil {
		t.Fatal(err)
	}
	snapshot.Deref()
	snapshot = next
	if fs.calls != calls || aliases != snapshot.watchAliases {
		t.Fatal("removing an import needlessly rebuilt immutable alias coverage")
	}
	if snapshot.ProjectCollection.ConfiguredProject(host.toPath("/src/tsconfig.json")).Program.GetSourceFile("/src/other.ts") != nil {
		t.Fatal("alias reuse retained a removed import in the program")
	}
	if err = disk.WriteFile("/src/other.ts", "export const other = 2;"); err != nil {
		t.Fatal(err)
	}
	var removedDependencyChange FileChangeSummary
	removedDependencyChange.Changed.Add("file:///src/other.ts")
	next, err = host.CloneSnapshot(context.Background(), snapshot, removedDependencyChange, nil)
	if err != nil {
		t.Fatal(err)
	}
	snapshot.Deref()
	snapshot = next
	program := snapshot.ProjectCollection.ConfiguredProject(host.toPath("/src/tsconfig.json")).Program
	if program.GetSourceFile("/src/other.ts") != nil || program.GetSourceFile("/src/main.ts").Text() != "export const value = 4;" {
		t.Fatal("notification for surplus alias coverage changed live sources")
	}
	if snapshot.watchAliases == aliases {
		t.Fatal("filesystem notification did not rebuild alias coverage")
	}
	calls, aliases = fs.calls, snapshot.watchAliases
	if err = disk.WriteFile("/src/tsconfig.json", `{"compilerOptions":{"noLib":true,"types":[]},"include":["*.ts"]}`); err != nil {
		t.Fatal(err)
	}
	var configChange FileChangeSummary
	configChange.Changed.Add("file:///src/tsconfig.json")
	next, err = host.CloneSnapshot(context.Background(), snapshot, configChange, nil)
	if err != nil {
		t.Fatal(err)
	}
	snapshot.Deref()
	snapshot = next
	if fs.calls == calls || aliases == snapshot.watchAliases {
		t.Fatal("config change reused aliases")
	}
}

func TestWatchAliasProgramCloneReuse(t *testing.T) {
	t.Parallel()
	fs := &failingWatchComparerFS{FS: vfstest.FromMap(map[string]string{
		"/src/s.ts": "export const s = 1;",
		"/src/ſ.ts": "export const longS = 1;",
	}, true)}
	host := NewSnapshotHost(&SessionInit{FS: fs, Options: &SessionOptions{CurrentDirectory: "/src", WatchEnabled: true}})
	defer host.Close()
	root := host.NewStandaloneRootSnapshot()
	defer root.Deref()
	options := &core.CompilerOptions{NoLib: core.TSTrue, Types: []string{}}
	snapshot := host.CloneSnapshotForProgram(context.Background(), root, []string{"/src/s.ts"}, options, nil, nil, nil, FileChangeSummary{})
	defer snapshot.Deref()
	calls := fs.calls
	next := host.CloneSnapshotForProgram(context.Background(), snapshot, []string{"/src/s.ts"}, options, nil, nil, snapshot.ProjectCollection.inferredProject, FileChangeSummary{})
	defer next.Deref()
	if snapshot.watchAliases != next.watchAliases || calls != fs.calls {
		t.Fatal("unchanged createProgram rebuilt alias inputs")
	}
	last := host.CloneSnapshotForProgram(context.Background(), next, []string{"/src/s.ts", "/src/ſ.ts"}, options, nil, nil, next.ProjectCollection.inferredProject, FileChangeSummary{})
	defer last.Deref()
	if last.watchAliases == next.watchAliases || calls == fs.calls {
		t.Fatal("new original root name reused aliases")
	}
	if len(last.ProjectCollection.inferredProject.Program.GetSourceFiles()) != 2 {
		t.Fatal("distinct s and long-s root identities collapsed")
	}
}

func TestWatchAliasCoalescedFilesystemChanges(t *testing.T) {
	t.Parallel()
	for _, kind := range []FileChangeKind{FileChangeKindWatchCreate, FileChangeKindWatchChange, FileChangeKindWatchDelete, FileChangeKindSave} {
		fs := vfstest.FromMap(map[string]string{"/src/node_modules/main.ts": "export {};"}, true)
		host := NewSnapshotHost(&SessionInit{FS: fs, Options: &SessionOptions{CurrentDirectory: "/src", WatchEnabled: true}})
		snapshot := host.NewStandaloneRootSnapshot()
		overlays := newOverlayFS(fs, make(map[tspath.Path]*Overlay), lsproto.PositionEncodingKindUTF8, host.toPath)
		_, snapshot.fs.overlays = overlays.processChanges([]FileChange{{
			Kind: FileChangeKindOpen, URI: "file:///src/node_modules/main.ts", Content: "export {};",
		}})
		change, nextOverlays := overlays.processChanges([]FileChange{
			{Kind: kind, URI: "file:///src/node_modules/main.ts"},
			{
				Kind: FileChangeKindChange, URI: "file:///src/node_modules/main.ts", Version: 2,
				Changes: []lsproto.TextDocumentContentChangePartialOrWholeDocument{{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: "export const value = 1;"}}},
			},
		})
		var merged FileChangeSummary
		mergeFileChangeSummary(&merged, change)
		if !merged.hasFileSystemChanges || snapshot.watchAliasChangesAreContentOnly(merged, nextOverlays) {
			t.Fatalf("coalesced filesystem event kind %v was treated as an overlay-only edit", kind)
		}
		snapshot.Deref()
		host.Close()
	}
}

func TestWatchAliasSessionRefreshesFilteredEvents(t *testing.T) {
	t.Parallel()
	fs := &failingWatchComparerFS{FS: vfstest.FromMap(map[string]string{
		"/src/tsconfig.json": `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`,
		"/src/main.ts":       "export const value = 1;",
	}, true)}
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(),
		FS:            fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/src", WatchEnabled: true},
	})
	defer session.Close()
	session.DidOpenFile(context.Background(), "file:///src/main.ts", 1, "export const value = 1;", lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	previous, calls := session.Snapshot(), fs.calls
	session.pendingFileChangesMu.Lock()
	session.pendingFileChanges = append(session.pendingFileChanges,
		FileChange{Kind: FileChangeKindWatchCreate, URI: "file:///src/node_modules/ignored.ts"},
		FileChange{Kind: FileChangeKindWatchDelete, URI: "file:///src/node_modules/ignored.ts"},
	)
	session.pendingFileChangesMu.Unlock()
	if _, err := session.GetLanguageService(context.Background(), "file:///src/main.ts"); err != nil {
		t.Fatal(err)
	}
	session.WaitForBackgroundTasks()
	if next := session.Snapshot(); next == previous || next.watchAliases == previous.watchAliases || fs.calls == calls {
		t.Fatal("coalesced namespace events failed to refresh the session alias generation")
	}
}

func TestWatchAliasRealpathStateReuseAndRefresh(t *testing.T) {
	t.Parallel()
	files := func(target string) map[string]any {
		result := map[string]any{
			"/var":                           vfstest.Symlink("/private"),
			"/private/project/tsconfig.json": `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true},"files":["main.ts"]}`,
			"/private/project/main.ts":       `import { value } from "pkg"; export { value };`,
			"/packages/one/index.d.ts":       `export const value: "one";`,
			"/packages/two/index.d.ts":       `export const value: "two";`,
		}
		if target != "" {
			result["/private/project/node_modules/pkg"] = vfstest.Symlink("/packages/" + target)
		}
		return result
	}
	fs := &countedWatchAliasFS{FS: vfstest.FromMap(files("one"), true)}
	host := NewSnapshotHost(&SessionInit{FS: fs, Options: &SessionOptions{CurrentDirectory: "/var/project", WatchEnabled: true}})
	defer host.Close()
	root := host.NewStandaloneRootSnapshot()
	defer root.Deref()
	snapshot, err := host.CloneSnapshot(context.Background(), root, FileChangeSummary{}, &APISnapshotRequest{
		OpenProjects: collections.NewSetFromItems("/var/project/tsconfig.json"),
	})
	if err != nil {
		t.Fatal(err)
	}
	defer snapshot.Deref()
	if snapshot.watchAliases == nil || fs.comparerQueries.Load() != 0 {
		t.Fatal("mock must retain physical aliases without querying native comparer")
	}
	if !slices.Contains(snapshot.watchNames("/var/project"), "/private/project") {
		t.Fatal("disabled native comparison lost requested realpath root")
	}
	opened, err := host.CloneSnapshotWithTemporaryFile(context.Background(), snapshot, "file:///var/project/main.ts", `import { value } from "pkg"; export { value };`)
	if err != nil {
		t.Fatal(err)
	}
	defer opened.Deref()
	calls := fs.realpaths.Load()
	edited, err := host.CloneSnapshotWithTemporaryFile(context.Background(), opened, "file:///var/project/main.ts", `import { value } from "pkg"; export { value }; // edited`)
	if err != nil {
		t.Fatal(err)
	}
	defer edited.Deref()
	if calls != fs.realpaths.Load() {
		t.Fatalf("content edit repeated realpath queries: %d -> %d", calls, fs.realpaths.Load())
	}
	if edited.watchAliases != opened.watchAliases {
		t.Fatal("content edit rebuilt immutable physical aliases")
	}
	if !slices.Contains(edited.watchNames("/var/project/node_modules/pkg"), "/packages/one") {
		t.Fatal("edit lost known package realpath")
	}
	fs.FS = vfstest.FromMap(files(""), true)
	var changes FileChangeSummary
	changes.Deleted.Add("file:///var/project/node_modules/pkg")
	removed := host.update(context.Background(), edited, SnapshotChange{
		fileChanges: changes, ResourceRequest: ResourceRequest{Projects: []tspath.Path{"/var/project/tsconfig.json"}},
	})
	defer removed.Deref()
	if slices.Contains(removed.watchNames("/var/project/node_modules/pkg"), "/packages/one") {
		t.Fatal("deleted symlink retained old realpath")
	}
	fs.FS = vfstest.FromMap(files("two"), true)
	changes = FileChangeSummary{}
	changes.Created.Add("file:///var/project/node_modules/pkg")
	retargeted := host.update(context.Background(), removed, SnapshotChange{
		fileChanges: changes, ResourceRequest: ResourceRequest{Projects: []tspath.Path{"/var/project/tsconfig.json"}},
	})
	if retargeted.apiError != nil {
		t.Fatal(retargeted.apiError)
	}
	defer retargeted.Deref()
	project := retargeted.ProjectCollection.ConfiguredProject(tspath.Path("/var/project/tsconfig.json"))
	source := project.Program.GetSourceFile("/var/project/node_modules/pkg/index.d.ts")
	if source == nil || source.Text() != `export const value: "two";` {
		t.Fatal("symlink retarget retained old source contents")
	}
	if names := retargeted.watchNames("/var/project/node_modules/pkg"); !slices.Contains(names, "/packages/two") || slices.Contains(names, "/packages/one") {
		t.Fatalf("symlink retarget retained old realpath: %v", names)
	}
	if names := edited.watchNames("/var/project/node_modules/pkg"); !slices.Contains(names, "/packages/one") || slices.Contains(names, "/packages/two") {
		t.Fatal("refresh mutated published physical aliases")
	}
	fs.FS = vfstest.FromMap(files(""), true)
	changes = FileChangeSummary{}
	changes.Deleted.Add("file:///var/project/node_modules/pkg")
	deleted := host.update(context.Background(), retargeted, SnapshotChange{
		fileChanges: changes, ResourceRequest: ResourceRequest{Projects: []tspath.Path{"/var/project/tsconfig.json"}},
	})
	if deleted.apiError != nil {
		t.Fatal(deleted.apiError)
	}
	defer deleted.Deref()
	if slices.Contains(deleted.watchNames("/var/project/node_modules/pkg"), "/packages/two") {
		t.Fatal("symlink deletion retained old realpath")
	}
	if fs.comparerQueries.Load() != 0 {
		t.Fatal("mock queried native comparer while refreshing physical aliases")
	}
}
