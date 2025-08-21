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
}
