package project

import (
	"context"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
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

	t.Run("compilerHost gets frozen with snapshot's FS only once", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/tsconfig.json": "{}",
			"/home/projects/TS/p1/index.ts":      "console.log('Hello, world!');",
		}
		session := setup(files)
		session.DidOpenFile(context.Background(), "file:///home/projects/TS/p1/index.ts", 1, files["/home/projects/TS/p1/index.ts"].(string), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "", lsproto.LanguageKindTypeScript)
		snapshotBefore, release := session.Snapshot()
		defer release()

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
		snapshotAfter, release := session.Snapshot()
		defer release()

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
		snapshotBefore, release := session.Snapshot()
		defer release()

		// a.ts and b.ts are cached
		assert.Check(t, snapshotBefore.fs.diskFiles["/home/projects/ts/p1/a.ts"] != nil)
		assert.Check(t, snapshotBefore.fs.diskFiles["/home/projects/ts/p2/b.ts"] != nil)

		// Close p1's only open file
		session.DidCloseFile(context.Background(), "file:///home/projects/TS/p1/index.ts")
		// Next open file is unrelated to p1, triggers p1 closing and file cache cleanup
		session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "", lsproto.LanguageKindTypeScript)
		snapshotAfter, release := session.Snapshot()
		defer release()

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
		snapshot, release := session.Snapshot()
		defer release()

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
		_, err := session.GetLanguageServiceWithAutoImports(ctx, otherIndexURI)
		assert.NilError(t, err)
	})
}
