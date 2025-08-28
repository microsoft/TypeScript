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
		assert.Equal(t, snapshotAfter.ProjectCollection.InferredProject().host.compilerFS.source, snapshotBefore.fs)
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
}
