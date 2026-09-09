package project

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"slices"
	"strings"
	"sync/atomic"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestSnapshot(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	setup := func(files map[string]any) *Session {
		fs := bundled.WrapFS(vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/))
		session := NewSession(&SessionInit{
			BackgroundCtx: context.Background(),
			Options: &SessionOptions{
				CurrentDirectory:   "/",
				DefaultLibraryPath: bundled.LibPath(),
				TypingsLocation:    "/home/src/Library/Caches/typescript",
				PositionEncoding:   lsproto.PositionEncodingKindUTF8,
				WatchEnabled:       false,
				LoggingEnabled:     false,
			},
			FS: fs,
		})
		return session
	}

	t.Run("temporary file can be added to an empty root snapshot", func(t *testing.T) {
		t.Parallel()
		session := setup(map[string]any{})
		defer session.Close()

		baseSnapshot := session.Snapshot()
		uri := lsproto.DocumentUri("file:///temporary.ts")
		snapshot, err := session.CloneSnapshotWithTemporaryFile(context.Background(), baseSnapshot, uri, "export const value = 1;")
		assert.NilError(t, err)
		defer snapshot.Deref()

		assert.Equal(t, snapshot.GetFile(uri.FileName()).Content(), "export const value = 1;")
	})

	t.Run("compilerHost gets frozen with snapshot's FS only once", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/tsconfig.json": "{}",
			"/home/projects/TS/p1/index.ts":      "console.log('Hello, world!');",
		}
		session := setup(files)
		session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/index.ts", 1, files["/home/projects/TS/p1/index.ts"].(string), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "", lsproto.LanguageKindTypeScript)
		snapshotBefore := session.Snapshot()

		session.DidChangeFile(context.Background(), "file:///home/projects/TS/p1/index.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{
				Partial: &lsproto.TextDocumentContentChangePartial{
					Text: "\n",
					Range: lsproto.Range{
						Start: lsproto.Position{Line: 0, Character: 24},
						End:   lsproto.Position{Line: 0, Character: 24},
					},
				},
			},
		})
		_, err := session.GetLanguageService(context.Background(), "file:///home/projects/TS/p1/index.ts")
		assert.NilError(t, err)
		snapshotAfter := session.Snapshot()

		// Configured project was updated by a clone
		assert.Equal(t, snapshotAfter.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json")).ProgramUpdateKind, ProgramUpdateKindCloned)
		// Inferred project wasn't updated last snapshot change, so its program update kind is still NewFiles
		assert.Equal(t, snapshotBefore.ProjectCollection.InferredProject(), snapshotAfter.ProjectCollection.InferredProject())
		assert.Equal(t, snapshotAfter.ProjectCollection.InferredProject().ProgramUpdateKind, ProgramUpdateKindNewFiles)
		// host for inferred project should not change
		assert.Equal(t, snapshotAfter.ProjectCollection.InferredProject().host.sourceFS.source, snapshotBefore.fs)
	})

	t.Run("cached disk files are cleaned up", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/tsconfig.json": "{}",
			"/home/projects/TS/p1/index.ts":      "import { a } from './a'; console.log(a);",
			"/home/projects/TS/p1/a.ts":          "export const a = 1;",
			"/home/projects/TS/p2/tsconfig.json": "{}",
			"/home/projects/TS/p2/index.ts":      "import { b } from './b'; console.log(b);",
			"/home/projects/TS/p2/b.ts":          "export const b = 2;",
		}
		session := setup(files)
		session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/index.ts", 1, files["/home/projects/TS/p1/index.ts"].(string), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(context.Background(), "file:///home/projects/TS/p2/index.ts", 1, files["/home/projects/TS/p2/index.ts"].(string), lsproto.LanguageKindTypeScript)
		snapshotBefore := session.Snapshot()

		// a.ts and b.ts are cached
		assert.Check(t, snapshotBefore.fs.diskFiles["/home/projects/ts/p1/a.ts"] != nil)
		assert.Check(t, snapshotBefore.fs.diskFiles["/home/projects/ts/p2/b.ts"] != nil)

		// Close p1's only open file
		session.DidCloseFile(context.Background(), "file:///home/projects/TS/p1/index.ts")
		// Next open file is unrelated to p1, triggers p1 closing and file cache cleanup
		session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "", lsproto.LanguageKindTypeScript)
		snapshotAfter := session.Snapshot()

		// a.ts is cleaned up, b.ts is still cached
		assert.Check(t, snapshotAfter.fs.diskFiles["/home/projects/ts/p1/a.ts"] == nil)
		assert.Check(t, snapshotAfter.fs.diskFiles["/home/projects/ts/p2/b.ts"] != nil)
	})

	t.Run("GetFile returns nil for non-existent files", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/tsconfig.json": "{}",
			"/home/projects/TS/p1/index.ts":      "console.log('Hello, world!');",
		}
		session := setup(files)
		session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/index.ts", 1, files["/home/projects/TS/p1/index.ts"].(string), lsproto.LanguageKindTypeScript)
		snapshot := session.Snapshot()

		handle := snapshot.GetFile("/home/projects/TS/p1/nonexistent.ts")
		assert.Check(t, handle == nil, "GetFile should return nil for non-existent file")

		// Test that ReadFile returns false for non-existent file
		_, ok := snapshot.ReadFile("/home/projects/TS/p1/nonexistent.ts")
		assert.Check(t, !ok, "ReadFile should return false for non-existent file")
	})

	t.Run("program change loads node_modules dependency and auto-imports includes it", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/otherproject/tsconfig.json": `{
				"compilerOptions": {
					"module": "commonjs"
				}
			}`,
			"/home/projects/otherproject/index.ts": ``,
			"/home/projects/node_modules/foo/package.json": `{
				"types": "index.d.ts",
				"typesVersions": {
					"*": {
						"bar/*": ["dist/*"],
						"exact-match": ["dist/index.d.ts"],
						"foo/*": ["dist/*"],
						"*": ["dist/*"]
					}
				}
			}`,
			"/home/projects/node_modules/foo/nope.d.ts":                     `export const nope = 0;`,
			"/home/projects/node_modules/foo/dist/index.d.ts":               `export const index = 0;`,
			"/home/projects/node_modules/foo/dist/blah.d.ts":                `export const blah = 0;`,
			"/home/projects/node_modules/foo/dist/foo/onlyInFooFolder.d.ts": `export const foo = 0;`,
			"/home/projects/node_modules/foo/dist/subfolder/one.d.ts":       `export const one = 0;`,
		}
		session := setup(files)
		t.Cleanup(session.Close)
		ctx := context.Background()
		otherIndexURI := lsproto.DocumentUri("file:///home/projects/otherproject/index.ts")

		// Open the file
		session.DidOpenFile(ctx, otherIndexURI, 1, files["/home/projects/otherproject/index.ts"].(string), lsproto.LanguageKindTypeScript)

		// Insert import statement:
		// This will trigger both a program rebuild which will include the node_modules files,
		// and an auto-import collection which should find the exports from those files.
		session.DidChangeFile(ctx, otherIndexURI, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{
				Partial: &lsproto.TextDocumentContentChangePartial{
					Text: `import {} from "foo/foo/subfolder/one";`,
					Range: lsproto.Range{
						Start: lsproto.Position{Line: 0, Character: 0},
						End:   lsproto.Position{Line: 0, Character: 0},
					},
				},
			},
		})

		// Now trigger snapshot clone with both program update and auto-imports registry building.
		_, err := session.GetCurrentLanguageServiceWithAutoImports(ctx, otherIndexURI)
		assert.NilError(t, err)
	})

	t.Run("fallback rebuild with recomputed parse options is safe for later clone", func(t *testing.T) {
		t.Parallel()

		testFiles := map[string]any{
			"/project/node_modules/pkg/index.ts": `export const pkg = 0;`,
			"/project/src/other.ts":              `export const other = 1;`,
		}
		session := setup(testFiles)
		pkgURI := lsproto.DocumentUri("file:///project/node_modules/pkg/index.ts")
		otherURI := lsproto.DocumentUri("file:///project/src/other.ts")

		session.DidOpenFile(context.Background(), pkgURI, 1, testFiles["/project/node_modules/pkg/index.ts"].(string), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(context.Background(), otherURI, 1, testFiles["/project/src/other.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), pkgURI)
		assert.NilError(t, err)

		err = session.fs.fs.WriteFile("/project/node_modules/pkg/package.json", `{ "type": "module" }`)
		assert.NilError(t, err)
		session.DidChangeFile(context.Background(), pkgURI, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{
				WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{
					Text: `import "./missing"; export const pkg = 1;`,
				},
			},
		})
		_, err = session.GetLanguageService(context.Background(), pkgURI)
		assert.NilError(t, err)

		session.DidChangeFile(context.Background(), otherURI, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{
				WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{
					Text: `export const other = 2;`,
				},
			},
		})
		_, err = session.GetLanguageService(context.Background(), otherURI)
		assert.NilError(t, err)
	})

	t.Run("auto-import snapshot is adopted when session snapshot is unchanged", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/tsconfig.json": "{}",
			"/home/projects/TS/p1/index.ts":      "const value = foo;",
			"/home/projects/TS/p1/foo.ts":        "export const foo = 1;",
		}
		session := setup(files)
		t.Cleanup(session.Close)
		ctx := context.Background()
		uri := lsproto.DocumentUri("file:///home/projects/TS/p1/index.ts")

		session.DidOpenFile(ctx, uri, 1, files["/home/projects/TS/p1/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(ctx, uri)
		assert.NilError(t, err)

		baseSnapshot := session.Snapshot()
		preparedSnapshot := session.SnapshotHost.CloneSnapshotWithAutoImports(ctx, baseSnapshot, uri, nil)
		session.TryAdoptSnapshotInBackground(baseSnapshot, preparedSnapshot)
		defer preparedSnapshot.Deref()

		session.WaitForBackgroundTasks()
		assert.Equal(t, session.Snapshot(), preparedSnapshot)
	})

	t.Run("no-op watch change does not rebuild program", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/tsconfig.json": "{}",
			"/home/projects/TS/p1/index.ts":      "import { a } from './a'; console.log(a);",
			"/home/projects/TS/p1/a.ts":          "export const a = 1;",
		}
		session := setup(files)
		t.Cleanup(session.Close)
		ctx := context.Background()
		uri := lsproto.DocumentUri("file:///home/projects/TS/p1/index.ts")
		configPath := tspath.Path("/home/projects/ts/p1/tsconfig.json")

		session.DidOpenFile(ctx, uri, 1, files["/home/projects/TS/p1/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(ctx, uri)
		assert.NilError(t, err)

		programBefore := session.Snapshot().ProjectCollection.ConfiguredProject(configPath).Program

		// Send a watch change event for a project file whose content on disk is unchanged.
		// This should not invalidate the program or trigger a recheck.
		session.pendingFileChangesMu.Lock()
		session.pendingFileChanges = append(session.pendingFileChanges, FileChange{
			Kind: FileChangeKindWatchChange,
			URI:  "file:///home/projects/TS/p1/a.ts",
		})
		session.pendingFileChangesMu.Unlock()
		_, err = session.GetLanguageService(ctx, uri)
		assert.NilError(t, err)

		programAfter := session.Snapshot().ProjectCollection.ConfiguredProject(configPath).Program
		assert.Equal(t, programBefore, programAfter, "no-op watch change should not rebuild the program")

		// A watch change that reflects an actual content change on disk must still
		// rebuild the program.
		err = session.fs.fs.WriteFile("/home/projects/TS/p1/a.ts", "export const a = 2;")
		assert.NilError(t, err)
		session.pendingFileChangesMu.Lock()
		session.pendingFileChanges = append(session.pendingFileChanges, FileChange{
			Kind: FileChangeKindWatchChange,
			URI:  "file:///home/projects/TS/p1/a.ts",
		})
		session.pendingFileChangesMu.Unlock()
		_, err = session.GetLanguageService(ctx, uri)
		assert.NilError(t, err)

		programChanged := session.Snapshot().ProjectCollection.ConfiguredProject(configPath).Program
		assert.Assert(t, programBefore != programChanged, "real watch change should rebuild the program")
	})
}

func BenchmarkSnapshotCloneRefCost(b *testing.B) {
	if !bundled.Embedded {
		b.Skip("bundled files are not embedded")
	}

	for _, largeProjectSize := range []int{100, 1000, 10_000} {
		b.Run(fmt.Sprintf("largeProject_%d_files", largeProjectSize), func(b *testing.B) {
			files := map[string]any{
				// Small project: 100 files
				"/small/tsconfig.json": `{"compilerOptions": {"strict": true}}`,
				// Large project: variable number of files
				"/large/tsconfig.json": `{"compilerOptions": {"strict": true}}`,
			}

			// Generate small project files
			for i := range 100 {
				files[fmt.Sprintf("/small/file%d.ts", i)] = fmt.Sprintf("export const small%d = %d;", i, i)
			}

			// Generate large project files
			for i := range largeProjectSize {
				files[fmt.Sprintf("/large/file%d.ts", i)] = fmt.Sprintf("export const large%d = %d;", i, i)
			}

			fs := bundled.WrapFS(vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/))
			session := NewSession(&SessionInit{
				BackgroundCtx: context.Background(),
				Options: &SessionOptions{
					CurrentDirectory:   "/",
					DefaultLibraryPath: bundled.LibPath(),
					TypingsLocation:    "/home/src/Library/Caches/typescript",
					PositionEncoding:   lsproto.PositionEncodingKindUTF8,
					WatchEnabled:       false,
					LoggingEnabled:     false,
				},
				FS: fs,
			})

			// Open one file from each project to initialize them
			session.DidOpenFile(context.Background(), "file:///small/file0.ts", 1, files["/small/file0.ts"].(string), lsproto.LanguageKindTypeScript)
			_, err := session.GetLanguageService(context.Background(), "file:///small/file0.ts")
			if err != nil {
				b.Fatal(err)
			}

			session.DidOpenFile(context.Background(), "file:///large/file0.ts", 1, files["/large/file0.ts"].(string), lsproto.LanguageKindTypeScript)
			_, err = session.GetLanguageService(context.Background(), "file:///large/file0.ts")
			if err != nil {
				b.Fatal(err)
			}

			session.WaitForBackgroundTasks()

			// Now benchmark: change the small project's tsconfig, then request a language service.
			// This forces a snapshot clone, which refs every file in both projects.
			strict := true
			b.ResetTimer()
			for b.Loop() {
				strict = !strict
				var tsconfigContent string
				if strict {
					tsconfigContent = `{"compilerOptions": {"strict": true}}`
				} else {
					tsconfigContent = `{"compilerOptions": {"strict": false}}`
				}
				err := session.fs.fs.WriteFile("/small/tsconfig.json", tsconfigContent)
				if err != nil {
					b.Fatal(err)
				}
				session.pendingFileChangesMu.Lock()
				session.pendingFileChanges = append(session.pendingFileChanges, FileChange{
					Kind: FileChangeKindWatchChange,
					URI:  "file:///small/tsconfig.json",
				})
				session.pendingFileChangesMu.Unlock()
				_, err = session.GetLanguageService(context.Background(), "file:///small/file0.ts")
				if err != nil {
					b.Fatal(err)
				}
				session.WaitForBackgroundTasks()
			}
		})
	}
}

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

func TestWatchRealpathRetargetIdenticalText(t *testing.T) {
	t.Parallel()
	for _, watchEnabled := range []bool{false, true} {
		files := func(target, value string) map[string]any {
			return map[string]any{
				"/project/tsconfig.json":    `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true},"files":["main.ts"]}`,
				"/project/main.ts":          `import { value } from "pkg"; export { value };`,
				"/project/node_modules/pkg": vfstest.Symlink("/packages/" + target),
				"/packages/one/index.d.ts":  `export { value } from "./dep";`,
				"/packages/two/index.d.ts":  `export { value } from "./dep";`,
				"/packages/one/dep.d.ts":    `export const value: "one";`,
				"/packages/two/dep.d.ts":    value,
			}
		}
		fs := &countedWatchAliasFS{FS: vfstest.FromMap(files("one", `export const value: "two";`), true)}
		host := NewSnapshotHost(&SessionInit{FS: fs, Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: watchEnabled}})
		root := host.NewStandaloneRootSnapshot()
		snapshot, err := host.CloneSnapshot(context.Background(), root, FileChangeSummary{}, &APISnapshotRequest{
			OpenProjects: collections.NewSetFromItems("/project/tsconfig.json"),
		})
		assert.NilError(t, err)
		fs.FS = vfstest.FromMap(files("two", `export const value: "two";`), true)
		var changes FileChangeSummary
		changes.Changed.Add("file:///project/node_modules/pkg")
		next := host.update(context.Background(), snapshot, SnapshotChange{
			fileChanges: changes, ResourceRequest: ResourceRequest{Projects: []tspath.Path{"/project/tsconfig.json"}},
		})
		assert.NilError(t, next.apiError)
		file := next.ProjectCollection.ConfiguredProject("/project/tsconfig.json").Program.GetSourceFile("/project/node_modules/pkg/dep.d.ts")
		assert.Assert(t, file != nil)
		assert.Equal(t, file.Text(), `export const value: "two";`)
		assert.Equal(t, snapshot.ProjectCollection.ConfiguredProject("/project/tsconfig.json").Program.GetSourceFile("/project/node_modules/pkg/dep.d.ts").Text(), `export const value: "one";`)
		assert.NilError(t, fs.WriteFile("/packages/two/dep.d.ts", `export const value: "updated";`))
		changes = FileChangeSummary{}
		changes.Changed.Add("file:///packages/two/dep.d.ts")
		last := host.update(context.Background(), next, SnapshotChange{
			fileChanges: changes, ResourceRequest: ResourceRequest{Projects: []tspath.Path{"/project/tsconfig.json"}},
		})
		assert.NilError(t, last.apiError)
		assert.Equal(t, last.ProjectCollection.ConfiguredProject("/project/tsconfig.json").Program.GetSourceFile("/project/node_modules/pkg/dep.d.ts").Text(), `export const value: "updated";`)
		last.Deref()
		next.Deref()
		snapshot.Deref()
		root.Deref()
		host.Close()
	}
}

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
