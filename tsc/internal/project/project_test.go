package project_test

import (
	"context"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

// These tests explicitly verify ProgramUpdateKind using subtests with shared helpers.
func TestProjectProgramUpdateKind(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// Use the default session setup for tests.

	t.Run("NewFiles on initial build", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/tsconfig.json": "{}",
			"/src/index.ts":      "export const x = 1;",
		}
		session, _ := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		snapshot, release := session.Snapshot()
		defer release()
		configured := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/src/tsconfig.json"))
		assert.Assert(t, configured != nil)
		assert.Equal(t, configured.ProgramUpdateKind, project.ProgramUpdateKindNewFiles)
	})

	t.Run("Cloned on single-file change", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/tsconfig.json": "{}",
			"/src/index.ts":      "console.log('Hello');",
		}
		session, _ := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		session.DidChangeFile(context.Background(), "file:///src/index.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
			Partial: &lsproto.TextDocumentContentChangePartial{Text: "\n", Range: lsproto.Range{Start: lsproto.Position{Line: 0, Character: 20}, End: lsproto.Position{Line: 0, Character: 20}}},
		}})
		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		snapshot, release := session.Snapshot()
		defer release()
		configured := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/src/tsconfig.json"))
		assert.Assert(t, configured != nil)
		assert.Equal(t, configured.ProgramUpdateKind, project.ProgramUpdateKindCloned)
	})

	t.Run("SameFileNames on config change without root changes", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/tsconfig.json": `{"compilerOptions": {"strict": true}}`,
			"/src/index.ts":      "export const x = 1;",
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		err = utils.FS().WriteFile("/src/tsconfig.json", `{"compilerOptions": {"strict": false}}`, false)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{Uri: lsproto.DocumentUri("file:///src/tsconfig.json"), Type: lsproto.FileChangeTypeChanged}})
		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		snapshot, release := session.Snapshot()
		defer release()
		configured := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/src/tsconfig.json"))
		assert.Assert(t, configured != nil)
		assert.Equal(t, configured.ProgramUpdateKind, project.ProgramUpdateKindSameFileNames)
	})

	t.Run("NewFiles on root addition", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/tsconfig.json": "{}",
			"/src/index.ts":      "export {}",
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		content := "export const y = 2;"
		err = utils.FS().WriteFile("/src/newfile.ts", content, false)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{Uri: lsproto.DocumentUri("file:///src/newfile.ts"), Type: lsproto.FileChangeTypeCreated}})
		session.DidOpenFile(context.Background(), "file:///src/newfile.ts", 1, content, lsproto.LanguageKindTypeScript)
		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/newfile.ts"))
		assert.NilError(t, err)
		snapshot, release := session.Snapshot()
		defer release()
		configured := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/src/tsconfig.json"))
		assert.Assert(t, configured != nil)
		assert.Equal(t, configured.ProgramUpdateKind, project.ProgramUpdateKindNewFiles)
	})

	t.Run("SameFileNames when adding an unresolvable import with multi-file change", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/tsconfig.json": "{}",
			"/src/index.ts":      "export const x = 1;",
			"/src/other.ts":      "export const z = 3;",
		}
		session, _ := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		// Change index.ts to add an unresolvable import
		session.DidChangeFile(context.Background(), "file:///src/index.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
			Partial: &lsproto.TextDocumentContentChangePartial{Text: "\nimport \"./does-not-exist\";\n", Range: lsproto.Range{Start: lsproto.Position{Line: 0, Character: 0}, End: lsproto.Position{Line: 0, Character: 0}}},
		}})
		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		snapshot, release := session.Snapshot()
		defer release()
		configured := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/src/tsconfig.json"))
		assert.Assert(t, configured != nil)
		assert.Equal(t, configured.ProgramUpdateKind, project.ProgramUpdateKindSameFileNames)
	})
}
