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
			mainEntry, _ := session.parseCache.entries.Load(newParseCacheKey(main.ParseOptions(), main.ScriptKind))
			utilsEntry, _ := session.parseCache.entries.Load(newParseCacheKey(utils.ParseOptions(), utils.ScriptKind))
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
			assert.Assert(t, ls.GetProgram().GetSourceFile("/user/username/projects/myproject/src/main.ts") != main)
			assert.Equal(t, ls.GetProgram().GetSourceFile("/user/username/projects/myproject/src/utils.ts"), utils)
			assert.Equal(t, mainEntry.refCount, 2)
			assert.Equal(t, utilsEntry.refCount, 2)
			release()
			assert.Equal(t, mainEntry.refCount, 1)
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
			mainEntry, _ := session.parseCache.entries.Load(newParseCacheKey(main.ParseOptions(), main.ScriptKind))
			utilsEntry, _ := session.parseCache.entries.Load(newParseCacheKey(utils.ParseOptions(), utils.ScriptKind))
			assert.Equal(t, mainEntry.refCount, 1)
			assert.Equal(t, utilsEntry.refCount, 1)

			session.DidCloseFile(context.Background(), "file:///user/username/projects/myproject/src/main.ts")
			_, err := session.GetLanguageService(context.Background(), "file:///user/username/projects/myproject/src/utils.ts")
			assert.NilError(t, err)
			assert.Equal(t, utilsEntry.refCount, 1)
			assert.Equal(t, mainEntry.refCount, 0)
			mainEntry, ok := session.parseCache.entries.Load(newParseCacheKey(main.ParseOptions(), main.ScriptKind))
			assert.Equal(t, ok, false)
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
