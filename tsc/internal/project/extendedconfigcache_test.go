package project

import (
	"context"
	"fmt"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type noopClient struct{}

func (noopClient) WatchFiles(ctx context.Context, id WatcherID, watchers []*lsproto.FileSystemWatcher) error {
	return nil
}

func (noopClient) UnwatchFiles(ctx context.Context, id WatcherID) error { return nil }

func (noopClient) RefreshDiagnostics(ctx context.Context) error { return nil }

func (noopClient) PublishDiagnostics(ctx context.Context, params *lsproto.PublishDiagnosticsParams) error {
	return nil
}

func (noopClient) RefreshInlayHints(ctx context.Context) error { return nil }

func (noopClient) RefreshCodeLens(ctx context.Context) error { return nil }

// TestExtendedConfigCacheRefCounting tests the invariant that each ExtendedSourceFile
// of a config in the ConfigFileRegistry is ref'd exactly once per config that extends it,
// and deref'd exactly once when that config is removed.
func TestExtendedConfigCacheRefCounting(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	setup := func(files map[string]any) *Session {
		fsFromMap := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		fs := bundled.WrapFS(fsFromMap)
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
			FS:          fs,
			Client:      noopClient{},
			Logger:      logging.NewTestLogger(),
			NpmExecutor: nil,
		})
		return session
	}

	untitledSeq := 0
	openUntitled := func(session *Session) {
		untitledSeq++
		uri := lsproto.DocumentUri(fmt.Sprintf("untitled:Untitled-%d", untitledSeq))
		session.DidOpenFile(context.Background(), uri, 1, "", lsproto.LanguageKindTypeScript)
	}

	// flushCloseProject is the canonical way to ensure project close work is applied.
	// Close the file, then open an unrelated file.
	flushCloseProject := func(session *Session, fileURI lsproto.DocumentUri) {
		session.DidCloseFile(context.Background(), fileURI)
		openUntitled(session)
	}

	refCount := func(session *Session, path tspath.Path) int {
		entry, ok := session.extendedConfigCache.entries.Load(path)
		if !ok {
			return 0
		}
		return entry.refCount
	}

	assertNoEntry := func(t *testing.T, session *Session, fileName string) {
		t.Helper()
		path := session.toPath(fileName)
		_, ok := session.extendedConfigCache.entries.Load(path)
		assert.Equal(t, ok, false)
	}

	expectedExtendedRefCounts := func(session *Session, snapshot *Snapshot) map[tspath.Path]int {
		result := make(map[tspath.Path]int)
		for _, cfg := range snapshot.ConfigFileRegistry.configs {
			if cfg.commandLine == nil || cfg.commandLine.ConfigFile == nil {
				continue
			}
			for _, file := range cfg.commandLine.ExtendedSourceFiles() {
				result[session.toPath(file)]++
			}
		}
		return result
	}

	assertExtendedRefCountsMatchRegistry := func(t *testing.T, session *Session, snapshot *Snapshot) {
		t.Helper()
		expected := expectedExtendedRefCounts(session, snapshot)
		for path, want := range expected {
			got := refCount(session, path)
			assert.Equal(t, got, want, "extended config %s refCount mismatch", path)
		}
	}

	t.Run("multi-extends shared ancestor counted once", func(t *testing.T) {
		t.Parallel()

		// One config extends *two* configs; both extend a shared root.
		// Expected behavior: ExtendedSourceFiles() is deduped, so the shared root should only
		// be ref'd once for this config.
		files := map[string]any{
			"/project/tsconfig.json": `{
				"extends": ["./tsconfig.base1.json", "./tsconfig.base2.json"]
			}`,
			"/project/tsconfig.base1.json": `{
				"extends": "./tsconfig.root.json",
				"compilerOptions": {"strict": true}
			}`,
			"/project/tsconfig.base2.json": `{
				"extends": "./tsconfig.root.json",
				"compilerOptions": {"noImplicitAny": true}
			}`,
			"/project/tsconfig.root.json": `{
				"compilerOptions": {"target": "ES2020"}
			}`,
			"/project/src/main.ts": "export const x = 1;",
		}

		session := setup(files)
		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///project/src/main.ts"), 1, files["/project/src/main.ts"].(string), lsproto.LanguageKindTypeScript)
		snapshot, release := session.Snapshot()
		defer release()

		config := snapshot.ConfigFileRegistry.GetConfig("/project/tsconfig.json")
		assert.Assert(t, config != nil)
		// Shared root should only appear once in the flattened list.
		var rootCount int
		for _, f := range config.ExtendedSourceFiles() {
			if f == "/project/tsconfig.root.json" {
				rootCount++
			}
		}
		assert.Equal(t, rootCount, 1)

		// And the cache refcounts should match the registry's deduped list.
		assertExtendedRefCountsMatchRegistry(t, session, snapshot)

		release()
		flushCloseProject(session, lsproto.DocumentUri("file:///project/src/main.ts"))
		assertNoEntry(t, session, "/project/tsconfig.base1.json")
		assertNoEntry(t, session, "/project/tsconfig.base2.json")
		assertNoEntry(t, session, "/project/tsconfig.root.json")
	})

	t.Run("ExtendedSourceFiles can contain same path twice (case-insensitive)", func(t *testing.T) {
		t.Parallel()

		// This test is descriptive, not prescriptive. This seems bad and unintentional,
		// but is here to show that while the problem exists in the underlying config parsing
		// API, it doesn't disrupt the cache ref counting.
		files := map[string]any{
			"/project/tsconfig.json": `{
				"extends": ["./Shared.json", "./shared.json"]
			}`,
			"/project/shared.json": `{
				"compilerOptions": {"strict": true}
			}`,
		}

		// This test intentionally bypasses the project system's ExtendedConfigCache so we can
		// observe how ExtendedSourceFiles behaves when the same underlying file is referenced
		// with different casing on a case-insensitive FS.
		fsFromMap := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		fs := bundled.WrapFS(fsFromMap)

		// Minimal ParseConfigHost implementation.
		h := &testParseConfigHost{fs: fs, cwd: "/"}
		cmd, diags := tsoptions.GetParsedCommandLineOfConfigFile("/project/tsconfig.json", nil, nil, h, nil /*extendedConfigCache*/)
		assert.Equal(t, len(diags), 0)
		assert.Assert(t, cmd != nil)

		extended := cmd.ExtendedSourceFiles()
		assert.Equal(t, len(extended), 2)
		assert.Equal(t, extended[0], "/project/Shared.json")
		assert.Equal(t, extended[1], "/project/shared.json")
	})

	t.Run("project system dedupes case-only extends via cache", func(t *testing.T) {
		t.Parallel()

		files := map[string]any{
			"/project/tsconfig.json": `{
				"extends": ["./Shared.json", "./shared.json"]
			}`,
			"/project/shared.json": `{
				"compilerOptions": {"strict": true}
			}`,
			"/project/src/main.ts": "export const x = 1;",
		}

		session := setup(files)
		session.DidOpenFile(context.Background(), lsproto.DocumentUri("file:///project/src/main.ts"), 1, files["/project/src/main.ts"].(string), lsproto.LanguageKindTypeScript)
		snapshot, release := session.Snapshot()
		defer release()

		config := snapshot.ConfigFileRegistry.GetConfig("/project/tsconfig.json")
		assert.Assert(t, config != nil)
		extended := config.ExtendedSourceFiles()
		assert.Equal(t, len(extended), 1)
		assert.Equal(t, session.toPath(extended[0]), session.toPath("/project/shared.json"))
	})

	t.Run("transitive extended config ref counting with new project", func(t *testing.T) {
		t.Parallel()

		// Scenario: transitive extends chain where a new project reuses a cached
		// extended config without reparsing it, which should still ref the transitive deps.
		//
		// projectA/tsconfig.json extends shared/tsconfig.base.json extends shared/tsconfig.common.json
		// projectB/tsconfig.json extends shared/tsconfig.base.json extends shared/tsconfig.common.json
		//
		// When projectB is opened AFTER projectA, tsconfig.base.json is retrieved from cache
		// (not reparsed), so tsconfig.common.json doesn't get Acquired again. But when projectA
		// is closed, tsconfig.common.json gets deref'd. If projectB didn't properly ref
		// tsconfig.common.json, it will be deleted and cause a panic on next snapshot clone.
		files := map[string]any{
			"/user/username/projects/shared/tsconfig.common.json": `{
					"compilerOptions": { "strict": true }
				}`,
			"/user/username/projects/shared/tsconfig.base.json": `{
					"extends": "./tsconfig.common.json",
					"compilerOptions": { "target": "ES2020" }
				}`,
			"/user/username/projects/projectA/tsconfig.json": `{
					"extends": "../shared/tsconfig.base.json"
				}`,
			"/user/username/projects/projectA/src/main.ts": "const a = 1;",
			"/user/username/projects/projectB/tsconfig.json": `{
					"extends": "../shared/tsconfig.base.json"
				}`,
			"/user/username/projects/projectB/src/main.ts": "const b = 2;",
			"/user/username/projects/other/src/main.ts":    "const other = 3;",
		}

		session := setup(files)

		// Step 1: Open file in projectA - this parses the full extends chain
		session.DidOpenFile(context.Background(), "file:///user/username/projects/projectA/src/main.ts", 1, files["/user/username/projects/projectA/src/main.ts"].(string), lsproto.LanguageKindTypeScript)

		// Verify extended configs are in cache with correct ref counts
		baseEntry, baseOk := session.extendedConfigCache.entries.Load("/user/username/projects/shared/tsconfig.base.json")
		commonEntry, commonOk := session.extendedConfigCache.entries.Load("/user/username/projects/shared/tsconfig.common.json")
		assert.Assert(t, baseOk, "tsconfig.base.json should be in cache")
		assert.Assert(t, commonOk, "tsconfig.common.json should be in cache")
		assert.Equal(t, baseEntry.refCount, 1)
		assert.Equal(t, commonEntry.refCount, 1)

		// Step 2: Open file in projectB - this should acquire tsconfig.base.json from cache
		// (not reparse it), and should also ref tsconfig.common.json (but doesn't due to bug)
		session.DidOpenFile(context.Background(), "file:///user/username/projects/projectB/src/main.ts", 1, files["/user/username/projects/projectB/src/main.ts"].(string), lsproto.LanguageKindTypeScript)

		// Step 3: Close projectA file and open an unrelated file to force projectA cleanup
		session.DidCloseFile(context.Background(), "file:///user/username/projects/projectA/src/main.ts")
		// Opening another file triggers cleanup of closed projects
		session.DidOpenFile(context.Background(), "file:///user/username/projects/other/src/main.ts", 1, files["/user/username/projects/other/src/main.ts"].(string), lsproto.LanguageKindTypeScript)

		// Close the other file too so only projectB remains
		session.DidCloseFile(context.Background(), "file:///user/username/projects/other/src/main.ts")

		// Step 4: Trigger another snapshot clone for projectB
		session.DidChangeFile(context.Background(), "file:///user/username/projects/projectB/src/main.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{
				Partial: &lsproto.TextDocumentContentChangePartial{
					Range: lsproto.Range{
						Start: lsproto.Position{Line: 0, Character: 0},
						End:   lsproto.Position{Line: 0, Character: 12},
					},
					Text: "const b = 3;",
				},
			},
		})
		// This call triggered the panic
		_, err := session.GetLanguageService(context.Background(), "file:///user/username/projects/projectB/src/main.ts")
		assert.NilError(t, err)
	})
}

type testParseConfigHost struct {
	fs  vfs.FS
	cwd string
}

func (h *testParseConfigHost) FS() vfs.FS { return h.fs }

func (h *testParseConfigHost) GetCurrentDirectory() string { return h.cwd }
