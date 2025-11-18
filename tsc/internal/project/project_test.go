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

func TestProject(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	t.Run("commandLineWithTypingsFiles is reset on CommandLine change", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/user/username/projects/project1/app.js":       ``,
			"/user/username/projects/project1/package.json": `{"name":"p1","dependencies":{"jquery":"^3.1.0"}}`,
			"/user/username/projects/project2/app.js":       ``,
		}

		session, utils := projecttestutil.SetupWithTypingsInstaller(files, &projecttestutil.TypingsInstallerOptions{
			PackageToFile: map[string]string{
				// Provide typings content to be installed for jquery so ATA actually installs something
				"jquery": `declare const $: { x: number }`,
			},
		})

		// 1) Open an inferred project file that triggers ATA
		uri1 := lsproto.DocumentUri("file:///user/username/projects/project1/app.js")
		session.DidOpenFile(context.Background(), uri1, 1, files["/user/username/projects/project1/app.js"].(string), lsproto.LanguageKindJavaScript)

		// 2) Wait for ATA/background tasks to finish, then get a language service for the first file
		session.WaitForBackgroundTasks()
		// Sanity check: ensure ATA performed at least one install
		npmCalls := utils.NpmExecutor().NpmInstallCalls()
		assert.Assert(t, len(npmCalls) > 0, "expected at least one npm install call from ATA")
		_, err := session.GetLanguageService(context.Background(), uri1)
		assert.NilError(t, err)

		// 3) Open another inferred project file
		uri2 := lsproto.DocumentUri("file:///user/username/projects/project2/app.js")
		session.DidOpenFile(context.Background(), uri2, 1, ``, lsproto.LanguageKindJavaScript)

		// 4) Get a language service for the second file
		//    If commandLineWithTypingsFiles was not reset, the new program command line
		//    won't include the newly opened file and this will fail.
		_, err = session.GetLanguageService(context.Background(), uri2)
		assert.NilError(t, err)
	})
}

func TestPushDiagnostics(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	t.Run("publishes program diagnostics on initial program creation", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/tsconfig.json": `{"compilerOptions": {"baseUrl": "."}}`,
			"/src/index.ts":      "export const x = 1;",
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)

		session.WaitForBackgroundTasks()

		calls := utils.Client().PublishDiagnosticsCalls()
		assert.Assert(t, len(calls) > 0, "expected at least one PublishDiagnostics call")

		// Find the call for tsconfig.json
		var tsconfigCall *struct {
			Ctx    context.Context
			Params *lsproto.PublishDiagnosticsParams
		}
		for i := range calls {
			if calls[i].Params.Uri == "file:///src/tsconfig.json" {
				tsconfigCall = &calls[i]
				break
			}
		}
		assert.Assert(t, tsconfigCall != nil, "expected PublishDiagnostics call for tsconfig.json")
		assert.Assert(t, len(tsconfigCall.Params.Diagnostics) > 0, "expected at least one diagnostic")
	})

	t.Run("clears diagnostics when project is removed", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/tsconfig.json":  `{"compilerOptions": {"baseUrl": "."}}`,
			"/src/index.ts":       "export const x = 1;",
			"/src2/tsconfig.json": `{"compilerOptions": {}}`,
			"/src2/index.ts":      "export const y = 2;",
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		session.WaitForBackgroundTasks()

		// Open a file in a different project to trigger cleanup of the first
		session.DidCloseFile(context.Background(), "file:///src/index.ts")
		session.DidOpenFile(context.Background(), "file:///src2/index.ts", 1, files["/src2/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src2/index.ts"))
		assert.NilError(t, err)
		session.WaitForBackgroundTasks()

		calls := utils.Client().PublishDiagnosticsCalls()
		// Should have at least one call for the first project with diagnostics,
		// and one clearing it after switching projects
		var firstProjectCalls []struct {
			Ctx    context.Context
			Params *lsproto.PublishDiagnosticsParams
		}
		for i := range calls {
			if calls[i].Params.Uri == "file:///src/tsconfig.json" {
				firstProjectCalls = append(firstProjectCalls, calls[i])
			}
		}
		assert.Assert(t, len(firstProjectCalls) >= 2, "expected at least 2 PublishDiagnostics calls for first project")
		// Last call should clear diagnostics
		lastCall := firstProjectCalls[len(firstProjectCalls)-1]
		assert.Equal(t, len(lastCall.Params.Diagnostics), 0, "expected empty diagnostics after project cleanup")
	})

	t.Run("updates diagnostics when program changes", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/tsconfig.json": `{"compilerOptions": {"baseUrl": "."}}`,
			"/src/index.ts":      "export const x = 1;",
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		session.WaitForBackgroundTasks()

		initialCallCount := len(utils.Client().PublishDiagnosticsCalls())

		// Change the tsconfig to remove baseUrl
		err = utils.FS().WriteFile("/src/tsconfig.json", `{"compilerOptions": {}}`, false)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{Uri: lsproto.DocumentUri("file:///src/tsconfig.json"), Type: lsproto.FileChangeTypeChanged}})
		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		session.WaitForBackgroundTasks()

		calls := utils.Client().PublishDiagnosticsCalls()
		assert.Assert(t, len(calls) > initialCallCount, "expected additional PublishDiagnostics call after change")

		// Find the last call for tsconfig.json
		var lastTsconfigCall *struct {
			Ctx    context.Context
			Params *lsproto.PublishDiagnosticsParams
		}
		for i := len(calls) - 1; i >= 0; i-- {
			if calls[i].Params.Uri == "file:///src/tsconfig.json" {
				lastTsconfigCall = &calls[i]
				break
			}
		}
		assert.Assert(t, lastTsconfigCall != nil, "expected PublishDiagnostics call for tsconfig.json")
		// After fixing the error, there should be no program diagnostics
		assert.Equal(t, len(lastTsconfigCall.Params.Diagnostics), 0, "expected no diagnostics after removing baseUrl option")
	})

	t.Run("does not publish for inferred projects", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/src/index.ts": "let x: number = 'not a number';",
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		session.WaitForBackgroundTasks()

		calls := utils.Client().PublishDiagnosticsCalls()
		// Should not have any calls since inferred projects don't have tsconfig.json
		assert.Equal(t, len(calls), 0, "expected no PublishDiagnostics calls for inferred projects")
	})
}
