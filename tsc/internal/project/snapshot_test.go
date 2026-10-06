package project

import (
	"context"
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestSnapshot(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	setup := func(files map[string]any) *Session {
		fs := bundled.WrapFS(vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/))
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

	t.Run("creates and removes synthetic programs", func(t *testing.T) {
		t.Parallel()
		session := setup(map[string]any{
			"/a.ts": "export const a = 1;",
			"/b.ts": "export const b = 1;",
		})
		defer session.Close()

		ctx := context.Background()
		options := &core.CompilerOptions{NoLib: core.TSTrue}
		createRequest := &APISnapshotRequest{CreatePrograms: []*APICreateProgramRequest{
			{
				RootFileNames:   []tspath.RootedFilePath{"/a.ts"},
				CompilerOptions: options,
			},
			{
				RootFileNames:   []tspath.RootedFilePath{"/b.ts"},
				CompilerOptions: options,
			},
		}}
		createdSnapshot, err := session.CloneSnapshot(
			ctx,
			session.Snapshot(),
			FileChangeSummary{},
			createRequest,
		)
		assert.NilError(t, err)
		defer createdSnapshot.Deref()
		createdPrograms := createdSnapshot.CreatedPrograms()
		assert.Equal(t, len(createdPrograms), 2)
		firstProject := createdPrograms[0]
		secondProject := createdPrograms[1]
		assert.Equal(t, firstProject.configFilePath, tspath.PathKey(""))
		assert.Equal(t, secondProject.configFilePath, tspath.PathKey(""))

		firstProgramID, ok := firstProject.ID().Synthetic()
		assert.Assert(t, ok)
		assert.Equal(t, string(firstProgramID), "/dev/null/synthetic/1")
		removeRequest := &APISnapshotRequest{RemovePrograms: collections.NewSetFromItems(firstProgramID)}
		removedSnapshot, err := session.CloneSnapshot(
			ctx,
			createdSnapshot,
			FileChangeSummary{},
			removeRequest,
		)
		assert.NilError(t, err)
		defer removedSnapshot.Deref()

		assert.Assert(t, firstProject != nil)
		assert.Assert(t, secondProject != nil)
		assert.Assert(t, firstProject.ID() != secondProject.ID())
		assert.DeepEqual(t, firstProject.CommandLine.FileNames(), []tspath.RootedFilePath{"/a.ts"})
		assert.DeepEqual(t, secondProject.CommandLine.FileNames(), []tspath.RootedFilePath{"/b.ts"})
		assert.Assert(t, createdSnapshot.ProjectCollection.InferredProject() == nil)
		assert.Equal(t, len(createdSnapshot.ProjectCollection.SyntheticProjects()), 2)
		assert.Equal(t, len(createdSnapshot.ProjectCollection.LanguageServiceProjects()), 0)
		assert.Equal(t, len(createdSnapshot.GetLanguageServiceProjectsContainingFile(lsproto.DocumentUri("file:///a.ts"))), 0)
		assert.Assert(t, createdSnapshot.ProjectCollection.GetDefaultProject(tspath.PathKeyFromCanonical("/a.ts")) == nil)
		assert.Equal(t, createdSnapshot.ProjectCollection.GetProject(firstProject.ID()), firstProject)

		openedSnapshot, err := session.CloneSnapshot(
			ctx,
			createdSnapshot,
			FileChangeSummary{},
			&APISnapshotRequest{OpenFiles: map[tspath.PathKey]tspath.RootedFilePath{
				tspath.PathKeyFromCanonical("/a.ts"): "/a.ts",
			}},
		)
		assert.NilError(t, err)
		defer openedSnapshot.Deref()
		inferredProject := openedSnapshot.ProjectCollection.InferredProject()
		assert.Assert(t, inferredProject != nil)
		_, ok = inferredProject.ID().Inferred()
		assert.Assert(t, ok)
		assert.Equal(t, inferredProject.configFilePath, tspath.PathKey(""))
		assert.Equal(t, len(openedSnapshot.ProjectCollection.LanguageServiceProjects()), 1)
		assert.Equal(t, len(openedSnapshot.GetLanguageServiceProjectsContainingFile(lsproto.DocumentUri("file:///a.ts"))), 1)
		assert.Equal(t, openedSnapshot.ProjectCollection.GetDefaultProject(tspath.PathKeyFromCanonical("/a.ts")), openedSnapshot.ProjectCollection.InferredProject())
		assert.Equal(t, openedSnapshot.ProjectCollection.GetProject(firstProject.ID()), firstProject)

		assert.Assert(t, removedSnapshot.ProjectCollection.GetProject(firstProject.ID()) == nil)
		assert.Equal(t, removedSnapshot.ProjectCollection.GetProject(secondProject.ID()), secondProject)
		assert.Equal(t, len(removedSnapshot.ProjectCollection.SyntheticProjects()), 1)
	})

	t.Run("failed API update is not adopted", func(t *testing.T) {
		t.Parallel()
		session := setup(map[string]any{
			"/a.ts": "export const a = 1;",
		})
		defer session.Close()

		baseSnapshot := session.Snapshot()
		failedSnapshot, err := session.CloneSnapshot(
			context.Background(),
			baseSnapshot,
			FileChangeSummary{},
			&APISnapshotRequest{RemovePrograms: collections.NewSetFromItems(NewSyntheticProjectID(1))},
		)
		defer failedSnapshot.Deref()

		assert.ErrorContains(t, err, "synthetic program not found for removal")
		assert.Equal(t, session.Snapshot(), baseSnapshot)
		assert.Assert(t, func() (panicked bool) {
			defer func() {
				if recover() != nil {
					panicked = true
				}
			}()
			_, _ = session.CloneSnapshot(context.Background(), failedSnapshot, FileChangeSummary{}, nil)
			return false
		}())
	})

	t.Run("failed API update preserves flushed host changes", func(t *testing.T) {
		t.Parallel()
		session := setup(map[string]any{
			"/a.ts": "export const a = 1;",
		})
		defer session.Close()

		baseSnapshot := session.Snapshot()
		session.pendingFileChangesMu.Lock()
		session.pendingFileChanges = append(session.pendingFileChanges, FileChange{
			Kind: FileChangeKindWatchChange,
			URI:  lsproto.DocumentUri("file:///a.ts"),
		})
		session.pendingFileChangesMu.Unlock()
		failedSnapshot, err := session.APIUpdate(
			context.Background(),
			FileChangeSummary{},
			&APISnapshotRequest{RemovePrograms: collections.NewSetFromItems(NewSyntheticProjectID(1))},
		)

		assert.ErrorContains(t, err, "synthetic program not found for removal")
		assert.Assert(t, failedSnapshot == nil)
		assert.Assert(t, session.Snapshot() != baseSnapshot)
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
		assert.Equal(t, snapshotAfter.ProjectCollection.ConfiguredProject(tspath.PathKey("/home/projects/ts/p1/tsconfig.json")).ProgramUpdateKind, ProgramUpdateKindCloned)
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
		assert.Check(t, snapshotBefore.fs.cacheFiles["/home/projects/ts/p1/a.ts"] != nil)
		assert.Check(t, snapshotBefore.fs.cacheFiles["/home/projects/ts/p2/b.ts"] != nil)

		// Close p1's only open file
		session.DidCloseFile(context.Background(), "file:///home/projects/TS/p1/index.ts")
		// Next open file is unrelated to p1, triggers p1 closing and file cache cleanup
		session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "", lsproto.LanguageKindTypeScript)
		snapshotAfter := session.Snapshot()

		// a.ts is cleaned up, b.ts is still cached
		assert.Check(t, snapshotAfter.fs.cacheFiles["/home/projects/ts/p1/a.ts"] == nil)
		assert.Check(t, snapshotAfter.fs.cacheFiles["/home/projects/ts/p2/b.ts"] != nil)
	})

	t.Run("idle cleanup releases unused configured projects", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/p1/tsconfig.json": `{"extends":"./base.json","files":["index.ts"]}`,
			"/p1/base.json":     `{"compilerOptions":{"noLib":true}}`,
			"/p1/index.ts":      `export const a = 1;`,
			"/p2/tsconfig.json": `{"compilerOptions":{"noLib":true},"files":["index.ts"]}`,
			"/p2/index.ts":      `export const b = 2;`,
		}
		session := setup(files)
		t.Cleanup(session.Close)
		ctx := context.Background()
		uri1 := lsproto.DocumentUri("file:///p1/index.ts")
		uri2 := lsproto.DocumentUri("file:///p2/index.ts")
		session.DidOpenFile(ctx, uri1, 1, files[string(uri1.FileName())].(string), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(ctx, uri2, 1, files[string(uri2.FileName())].(string), lsproto.LanguageKindTypeScript)
		session.WaitForBackgroundTasks()
		snapshot := session.Snapshot()
		project1 := snapshot.ProjectCollection.ConfiguredProject("/p1/tsconfig.json")
		project2 := snapshot.ProjectCollection.ConfiguredProject("/p2/tsconfig.json")
		assert.Assert(t, project1 != nil)
		assert.Assert(t, project2 != nil)
		file1 := project1.Program.GetSourceFile(uri1.FileName())
		key1 := parseCacheKeyForFile(file1)
		assert.Assert(t, session.parseCache.Has(key1))

		session.DidCloseFile(ctx, uri1)
		session.WaitForBackgroundTasks()
		closedProject1 := session.Snapshot().ProjectCollection.ConfiguredProject("/p1/tsconfig.json")
		assert.Assert(t, closedProject1 != nil)
		assert.Equal(t, closedProject1.Program, project1.Program)

		// Reopening during the grace period should reuse the program.
		session.DidOpenFile(ctx, uri1, 1, files[string(uri1.FileName())].(string), lsproto.LanguageKindTypeScript)
		reopenedProject1 := session.Snapshot().ProjectCollection.ConfiguredProject("/p1/tsconfig.json")
		assert.Assert(t, reopenedProject1 != nil)
		assert.Equal(t, reopenedProject1.Program, project1.Program)
		session.DidCloseFile(ctx, uri1)
		session.WaitForBackgroundTasks()

		retainedSnapshot := session.Snapshot()
		session.RetainSnapshot(retainedSnapshot)
		cleanIdle := func() {
			session.snapshotUpdateMu.Lock()
			defer session.snapshotUpdateMu.Unlock()
			session.cancelScheduledSnapshotUpdate()
			fileChanges, overlays, ataChanges, newConfig := session.flushChanges(ctx)
			session.UpdateSnapshot(ctx, overlays, SnapshotChange{
				reason:         UpdateReasonIdleCleanDiskCache,
				fileChanges:    fileChanges,
				ataChanges:     ataChanges,
				newConfig:      newConfig,
				cleanFileCache: true,
			})
		}
		cleanIdle()
		session.WaitForBackgroundTasks()
		snapshot = session.Snapshot()
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject("/p1/tsconfig.json") == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig("/p1/tsconfig.json") == nil)
		assert.Assert(t, snapshot.fs.cacheFiles["/p1/index.ts"] == nil)
		retainedProject2 := snapshot.ProjectCollection.ConfiguredProject("/p2/tsconfig.json")
		assert.Assert(t, retainedProject2 != nil)
		assert.Equal(t, retainedProject2.Program, project2.Program)
		assert.Assert(t, session.parseCache.Has(key1), "an in-flight snapshot must keep its source files alive")
		retainedSnapshot.Deref()
		assert.Assert(t, !session.parseCache.Has(key1))
		_, hasExtendedConfig := session.extendedConfigCache.entries.Load(tspath.PathKeyFromCanonical("/p1/base.json"))
		assert.Assert(t, !hasExtendedConfig)
		assert.Equal(t, session.programCounter.Len(), 1)

		session.DidCloseFile(ctx, uri2)
		cleanIdle()
		session.WaitForBackgroundTasks()
		assert.Equal(t, len(session.Snapshot().ProjectCollection.Projects()), 0)
		assert.Assert(t, session.Snapshot().ConfigFileRegistry.GetConfig("/p2/tsconfig.json") == nil)
		assert.Equal(t, len(session.Snapshot().fs.cacheFiles), 0)
		assert.Equal(t, session.programCounter.Len(), 0)

		session.DidOpenFile(ctx, uri1, 2, files[string(uri1.FileName())].(string), lsproto.LanguageKindTypeScript)
		assert.Assert(t, session.Snapshot().ProjectCollection.ConfiguredProject("/p1/tsconfig.json") != nil)
	})

	t.Run("idle cleanup retains API projects and files", func(t *testing.T) {
		t.Parallel()
		for _, openProject := range []bool{false, true} {
			t.Run(fmt.Sprintf("openProject=%v", openProject), func(t *testing.T) {
				t.Parallel()
				session := setup(map[string]any{
					"/p1/tsconfig.json": `{"compilerOptions":{"noLib":true},"files":["index.ts"]}`,
					"/p1/index.ts":      `export const a = 1;`,
				})
				t.Cleanup(session.Close)
				request := &APISnapshotRequest{}
				if openProject {
					request.OpenProjects = collections.NewSetFromItems(tspath.RootedFilePath("/p1/tsconfig.json"))
				} else {
					request.OpenFiles = map[tspath.PathKey]tspath.RootedFilePath{
						tspath.PathKeyFromCanonical("/p1/index.ts"): "/p1/index.ts",
					}
				}
				snapshot, err := session.APIUpdate(context.Background(), FileChangeSummary{}, request)
				assert.NilError(t, err)
				snapshot.Deref()
				session.WaitForBackgroundTasks()
				project := session.Snapshot().ProjectCollection.ConfiguredProject("/p1/tsconfig.json")
				assert.Assert(t, project != nil)
				session.UpdateSnapshot(context.Background(), session.Snapshot().overlays(), SnapshotChange{
					reason:         UpdateReasonIdleCleanDiskCache,
					cleanFileCache: true,
				})
				assert.Equal(t, session.Snapshot().ProjectCollection.ConfiguredProject("/p1/tsconfig.json"), project)
			})
		}
	})

	t.Run("idle cleanup retains referenced projects", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/app/tsconfig.json": `{"compilerOptions":{"noLib":true},"files":["index.ts"],"references":[{"path":"../lib"}]}`,
			"/app/index.ts":      `import { value } from "../lib"; export { value };`,
			"/lib/tsconfig.json": `{"compilerOptions":{"noLib":true,"composite":true},"files":["index.ts"]}`,
			"/lib/index.ts":      `export const value = 1;`,
		}
		session := setup(files)
		t.Cleanup(session.Close)
		ctx := context.Background()
		appURI := lsproto.DocumentUri("file:///app/index.ts")
		libURI := lsproto.DocumentUri("file:///lib/index.ts")
		session.DidOpenFile(ctx, libURI, 1, files[string(libURI.FileName())].(string), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(ctx, appURI, 1, files[string(appURI.FileName())].(string), lsproto.LanguageKindTypeScript)
		session.WaitForBackgroundTasks()
		appProject := session.Snapshot().ProjectCollection.ConfiguredProject("/app/tsconfig.json")
		libProject := session.Snapshot().ProjectCollection.ConfiguredProject("/lib/tsconfig.json")
		assert.Assert(t, appProject != nil)
		assert.Assert(t, libProject != nil)
		session.DidCloseFile(ctx, libURI)
		session.WaitForBackgroundTasks()
		session.UpdateSnapshot(ctx, session.Snapshot().overlays(), SnapshotChange{
			reason:         UpdateReasonIdleCleanDiskCache,
			cleanFileCache: true,
		})
		assert.Equal(t, session.Snapshot().ProjectCollection.ConfiguredProject("/app/tsconfig.json"), appProject)
		assert.Equal(t, session.Snapshot().ProjectCollection.ConfiguredProject("/lib/tsconfig.json"), libProject)
		assert.Assert(t, session.Snapshot().ConfigFileRegistry.GetConfig("/lib/tsconfig.json") != nil)
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

		err = session.fs.WriteFile("/project/node_modules/pkg/package.json", `{ "type": "module" }`)
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
		configPath := tspath.PathKey("/home/projects/ts/p1/tsconfig.json")

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
		err = session.fs.WriteFile("/home/projects/TS/p1/a.ts", "export const a = 2;")
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

func TestProjectIDNarrowing(t *testing.T) {
	t.Parallel()

	configured := ID("/project/tsconfig.json")
	configuredID, ok := configured.Configured()
	assert.Assert(t, ok)
	assert.Equal(t, configuredID.PathKey(), tspath.PathKeyFromCanonical("/project/tsconfig.json"))
	_, ok = configured.Inferred()
	assert.Assert(t, !ok)
	_, ok = configured.Synthetic()
	assert.Assert(t, !ok)

	inferred := inferredProjectID.AsID()
	inferredID, ok := inferred.Inferred()
	assert.Assert(t, ok)
	assert.Equal(t, inferredID, inferredProjectID)
	_, ok = inferred.Configured()
	assert.Assert(t, !ok)

	synthetic := NewSyntheticProjectID(1).AsID()
	syntheticID, ok := synthetic.Synthetic()
	assert.Assert(t, ok)
	assert.Equal(t, syntheticID, NewSyntheticProjectID(1))
	_, ok = synthetic.Configured()
	assert.Assert(t, !ok)

	canonicalSyntheticID, ok := ID("/dev/null/synthetic/01").Synthetic()
	assert.Assert(t, ok)
	assert.Equal(t, canonicalSyntheticID, NewSyntheticProjectID(1))

	_, ok = ID("/dev/null/synthetic/invalid").Configured()
	assert.Assert(t, ok)

	_, ok = ParseConfiguredProjectID(inferredProjectName)
	assert.Assert(t, !ok)
	_, ok = ParseConfiguredProjectID(tspath.PathKeyFromCanonical(NewSyntheticProjectID(1).AsID().String()))
	assert.Assert(t, !ok)
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

			fs := bundled.WrapFS(vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/))
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
				err := session.fs.WriteFile("/small/tsconfig.json", tsconfigContent)
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
