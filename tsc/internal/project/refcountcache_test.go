package project

import (
	"context"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestRefCountingCaches(t *testing.T) {
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

	t.Run("parseCache", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/user/username/projects/myproject/src/main.ts":  "const x = 1;",
			"/user/username/projects/myproject/src/utils.ts": "export function util() {}",
		}

		t.Run("reuse unchanged file", func(t *testing.T) {
			t.Parallel()

			session := setup(files)
			session.DidOpenFile(context.Background(), "file:///user/username/projects/myproject/src/main.ts", 1, files["/user/username/projects/myproject/src/main.ts"].(string), lsproto.LanguageKindTypeScript)
			session.DidOpenFile(context.Background(), "file:///user/username/projects/myproject/src/utils.ts", 1, files["/user/username/projects/myproject/src/utils.ts"].(string), lsproto.LanguageKindTypeScript)
			snapshot, release := session.Snapshot()
			program := snapshot.ProjectCollection.InferredProject().Program
			main := program.GetSourceFile("/user/username/projects/myproject/src/main.ts")
			utils := program.GetSourceFile("/user/username/projects/myproject/src/utils.ts")
			mainEntry, _ := session.parseCache.entries.Load(NewParseCacheKey(main.ParseOptions(), main.Hash, main.ScriptKind))
			utilsEntry, _ := session.parseCache.entries.Load(NewParseCacheKey(utils.ParseOptions(), utils.Hash, utils.ScriptKind))
			assert.Equal(t, mainEntry.refCount, 1)
			assert.Equal(t, utilsEntry.refCount, 1)

			session.DidChangeFile(context.Background(), "file:///user/username/projects/myproject/src/main.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
				{
					Partial: &lsproto.TextDocumentContentChangePartial{
						Range: lsproto.Range{
							Start: lsproto.Position{Line: 0, Character: 0},
							End:   lsproto.Position{Line: 0, Character: 12},
						},
						Text: "const x = 2;",
					},
				},
			})
			ls, err := session.GetLanguageService(context.Background(), "file:///user/username/projects/myproject/src/main.ts")
			assert.NilError(t, err)
			newMain := ls.GetProgram().GetSourceFile("/user/username/projects/myproject/src/main.ts")
			newMainEntry, _ := session.parseCache.entries.Load(NewParseCacheKey(newMain.ParseOptions(), newMain.Hash, newMain.ScriptKind))
			assert.Assert(t, newMain != main)
			assert.Assert(t, newMainEntry != mainEntry)
			assert.Equal(t, ls.GetProgram().GetSourceFile("/user/username/projects/myproject/src/utils.ts"), utils)
			assert.Equal(t, mainEntry.refCount, 1)
			assert.Equal(t, newMainEntry.refCount, 1)
			assert.Equal(t, utilsEntry.refCount, 2)
			release()
			assert.Equal(t, mainEntry.refCount, 0)
			assert.Equal(t, newMainEntry.refCount, 1)
			assert.Equal(t, utilsEntry.refCount, 1)
		})

		t.Run("release file on close", func(t *testing.T) {
			t.Parallel()

			session := setup(files)
			session.DidOpenFile(context.Background(), "file:///user/username/projects/myproject/src/main.ts", 1, files["/user/username/projects/myproject/src/main.ts"].(string), lsproto.LanguageKindTypeScript)
			session.DidOpenFile(context.Background(), "file:///user/username/projects/myproject/src/utils.ts", 1, files["/user/username/projects/myproject/src/utils.ts"].(string), lsproto.LanguageKindTypeScript)
			snapshot, release := session.Snapshot()
			program := snapshot.ProjectCollection.InferredProject().Program
			main := program.GetSourceFile("/user/username/projects/myproject/src/main.ts")
			utils := program.GetSourceFile("/user/username/projects/myproject/src/utils.ts")
			release()
			mainEntry, _ := session.parseCache.entries.Load(NewParseCacheKey(main.ParseOptions(), main.Hash, main.ScriptKind))
			utilsEntry, _ := session.parseCache.entries.Load(NewParseCacheKey(utils.ParseOptions(), utils.Hash, utils.ScriptKind))
			assert.Equal(t, mainEntry.refCount, 1)
			assert.Equal(t, utilsEntry.refCount, 1)

			session.DidCloseFile(context.Background(), "file:///user/username/projects/myproject/src/main.ts")
			_, err := session.GetLanguageService(context.Background(), "file:///user/username/projects/myproject/src/utils.ts")
			assert.NilError(t, err)
			assert.Equal(t, utilsEntry.refCount, 1)
			assert.Equal(t, mainEntry.refCount, 0)
			mainEntry, ok := session.parseCache.entries.Load(NewParseCacheKey(main.ParseOptions(), main.Hash, main.ScriptKind))
			assert.Equal(t, ok, false)
		})

		t.Run("unchanged program does not over-ref", func(t *testing.T) {
			t.Parallel()

			// When a program is reused across snapshots without changes, we should
			// not accumulate extra refs. The ref count should stay at 1 per source file
			// until the program is finally disposed.
			session := setup(files)
			session.DidOpenFile(context.Background(), "file:///user/username/projects/myproject/src/main.ts", 1, files["/user/username/projects/myproject/src/main.ts"].(string), lsproto.LanguageKindTypeScript)
			session.DidOpenFile(context.Background(), "file:///user/username/projects/myproject/src/utils.ts", 1, files["/user/username/projects/myproject/src/utils.ts"].(string), lsproto.LanguageKindTypeScript)

			// Get first snapshot and capture the program/entries
			snapshot1, release1 := session.Snapshot()
			program1 := snapshot1.ProjectCollection.InferredProject().Program
			main := program1.GetSourceFile("/user/username/projects/myproject/src/main.ts")
			mainEntry, _ := session.parseCache.entries.Load(NewParseCacheKey(main.ParseOptions(), main.Hash, main.ScriptKind))
			assert.Equal(t, mainEntry.refCount, 1, "initial refCount should be 1")

			// Change utils.ts to trigger a new snapshot, but main.ts stays the same
			// so main's source file should be reused.
			session.DidChangeFile(context.Background(), "file:///user/username/projects/myproject/src/utils.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
				{
					Partial: &lsproto.TextDocumentContentChangePartial{
						Range: lsproto.Range{
							Start: lsproto.Position{Line: 0, Character: 0},
							End:   lsproto.Position{Line: 0, Character: 25},
						},
						Text: "export function util2() {}",
					},
				},
			})

			// Get second snapshot - main.ts should be reused (program is new but shares source files)
			ls, err := session.GetLanguageService(context.Background(), "file:///user/username/projects/myproject/src/main.ts")
			assert.NilError(t, err)
			program2 := ls.GetProgram()
			main2 := program2.GetSourceFile("/user/username/projects/myproject/src/main.ts")
			assert.Equal(t, main, main2, "main.ts source file should be reused")

			// main.ts refCount should be 2: one for old program, one for new program
			mainEntry, _ = session.parseCache.entries.Load(NewParseCacheKey(main.ParseOptions(), main.Hash, main.ScriptKind))
			assert.Equal(t, mainEntry.refCount, 2, "refCount should be 2 (old and new program)")

			// Now release the first snapshot
			release1()

			// The entry should still exist with refCount 1 (new snapshot still holds it)
			mainEntry, ok := session.parseCache.entries.Load(NewParseCacheKey(main.ParseOptions(), main.Hash, main.ScriptKind))
			assert.Assert(t, ok, "entry should still exist after releasing old snapshot")
			assert.Equal(t, mainEntry.refCount, 1, "refCount should be 1 after releasing old snapshot")

			// Close files to trigger cleanup
			session.DidCloseFile(context.Background(), "file:///user/username/projects/myproject/src/main.ts")
			session.DidCloseFile(context.Background(), "file:///user/username/projects/myproject/src/utils.ts")
			session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "", lsproto.LanguageKindTypeScript)

			// Entry should now be gone (refCount 0, deleted)
			mainEntry, ok = session.parseCache.entries.Load(NewParseCacheKey(main.ParseOptions(), main.Hash, main.ScriptKind))
			if ok {
				t.Logf("Entry still exists with refCount=%d, deleted=%v", mainEntry.refCount, mainEntry.deleted)
			}
			assert.Assert(t, !ok, "entry should be deleted after program is disposed")
		})
	})

	t.Run("extendedConfigCache", func(t *testing.T) {
		files := map[string]any{
			"/user/username/projects/myproject/tsconfig.json": `{
				"extends": "./tsconfig.base.json"
			}`,
			"/user/username/projects/myproject/tsconfig.base.json": `{
				"compilerOptions": {}
			}`,
			"/user/username/projects/myproject/src/main.ts": "const x = 1;",
		}

		t.Run("release extended configs with project close", func(t *testing.T) {
			t.Parallel()

			session := setup(files)
			session.DidOpenFile(context.Background(), "file:///user/username/projects/myproject/src/main.ts", 1, files["/user/username/projects/myproject/src/main.ts"].(string), lsproto.LanguageKindTypeScript)
			snapshot, release := session.Snapshot()
			config := snapshot.ConfigFileRegistry.GetConfig("/user/username/projects/myproject/tsconfig.json")
			assert.Equal(t, config.ExtendedSourceFiles()[0], "/user/username/projects/myproject/tsconfig.base.json")
			extendedConfigEntry, _ := session.extendedConfigCache.entries.Load("/user/username/projects/myproject/tsconfig.base.json")
			assert.Equal(t, extendedConfigEntry.refCount, 1)
			release()

			session.DidCloseFile(context.Background(), "file:///user/username/projects/myproject/src/main.ts")
			session.DidOpenFile(context.Background(), "untitled:Untitled-1", 1, "", lsproto.LanguageKindTypeScript)
			assert.Equal(t, extendedConfigEntry.refCount, 0)
		})
	})
}
