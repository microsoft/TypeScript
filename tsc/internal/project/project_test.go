package project_test

import (
	"context"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/diagnostics"
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
		snapshot := session.Snapshot()
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
		snapshot := session.Snapshot()
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
		err = utils.FS().WriteFile("/src/tsconfig.json", `{"compilerOptions": {"strict": false}}`)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{Uri: lsproto.DocumentUri("file:///src/tsconfig.json"), Type: lsproto.FileChangeTypeChanged}})
		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		snapshot := session.Snapshot()
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
		err = utils.FS().WriteFile("/src/newfile.ts", content)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{Uri: lsproto.DocumentUri("file:///src/newfile.ts"), Type: lsproto.FileChangeTypeCreated}})
		session.DidOpenFile(context.Background(), "file:///src/newfile.ts", 1, content, lsproto.LanguageKindTypeScript)
		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/newfile.ts"))
		assert.NilError(t, err)
		snapshot := session.Snapshot()
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
		snapshot := session.Snapshot()
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
		err = utils.FS().WriteFile("/src/tsconfig.json", `{"compilerOptions": {}}`)
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

	t.Run("publishes global diagnostics after checking", func(t *testing.T) {
		t.Parallel()
		// Use a target/lib that does not include Disposable, then write code that needs it.
		// This triggers a deferred "Cannot find global type 'Disposable'" global diagnostic
		// during checking, which should be accumulated and published on the tsconfig URI.
		files := map[string]any{
			"/src/tsconfig.json": `{
				"compilerOptions": {
					"target": "es2020"
				}
			}`,
			"/src/index.ts": `export function f() {
				using x = { [Symbol.dispose]() {} };
			}`,
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		// Request semantic diagnostics to trigger checking, which triggers the global type resolvers.
		ls, err := session.GetLanguageService(projecttestutil.WithRequestID(context.Background()), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		_, err = ls.ProvideDiagnostics(projecttestutil.WithRequestID(context.Background()), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		// Enqueue global diagnostics publishing (normally done by the LSP server after each request).
		session.EnqueuePublishGlobalDiagnostics()
		session.WaitForBackgroundTasks()

		calls := utils.Client().PublishDiagnosticsCalls()
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
		// Should have global diagnostics (e.g., Cannot find global type 'Disposable')
		hasGlobalDiag := false
		for _, diag := range lastTsconfigCall.Params.Diagnostics {
			if strings.Contains(diag.Message, "Cannot find global") {
				hasGlobalDiag = true
				break
			}
		}
		assert.Assert(t, hasGlobalDiag, "expected a 'Cannot find global' diagnostic on tsconfig.json, got: %v", lastTsconfigCall.Params.Diagnostics)
	})
}

func TestDisplayName(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	t.Run("configured project returns relative config path", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/tsconfig.json": `{}`,
			"/home/projects/index.ts":      "export const x = 1;",
		}
		session, _ := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///home/projects/index.ts", 1, "export const x = 1;", lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///home/projects/index.ts"))
		assert.NilError(t, err)

		snapshot := session.Snapshot()
		configured := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/tsconfig.json"))
		assert.Assert(t, configured != nil)
		assert.Equal(t, configured.DisplayName("/home/projects"), "tsconfig.json")
	})

	t.Run("configured project with nested config", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/sub/tsconfig.json": `{}`,
			"/home/projects/sub/index.ts":      "export const x = 1;",
		}
		session, _ := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///home/projects/sub/index.ts", 1, "export const x = 1;", lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///home/projects/sub/index.ts"))
		assert.NilError(t, err)

		snapshot := session.Snapshot()
		configured := snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/sub/tsconfig.json"))
		assert.Assert(t, configured != nil)
		assert.Equal(t, configured.DisplayName("/home/projects"), "sub/tsconfig.json")
	})

	t.Run("inferred project returns directory base name", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/index.ts": "export const x = 1;",
		}
		session, _ := projecttestutil.SetupWithOptions(files, &project.SessionOptions{
			CurrentDirectory:       "/home/projects",
			DefaultLibraryPath:     bundled.LibPath(),
			PositionEncoding:       lsproto.PositionEncodingKindUTF8,
			WatchEnabled:           true,
			LoggingEnabled:         true,
			PushDiagnosticsEnabled: true,
		})
		session.DidOpenFile(context.Background(), "file:///home/projects/index.ts", 1, "export const x = 1;", lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///home/projects/index.ts"))
		assert.NilError(t, err)

		snapshot := session.Snapshot()
		inferred := snapshot.ProjectCollection.InferredProject()
		assert.Assert(t, inferred != nil)
		name := inferred.DisplayName("/home")
		assert.Equal(t, name, "projects")
	})
}

func TestProgressNotifications(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	t.Run("emits progress for configured project loading", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/tsconfig.json": `{}`,
			"/home/projects/index.ts":      "export const x = 1;",
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///home/projects/index.ts", 1, "export const x = 1;", lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///home/projects/index.ts"))
		assert.NilError(t, err)

		startCalls := utils.Client().ProgressStartCalls()
		finishCalls := utils.Client().ProgressFinishCalls()

		assert.Assert(t, len(startCalls) > 0, "expected at least one ProgressStart call")
		assert.Assert(t, len(finishCalls) > 0, "expected at least one ProgressFinish call")

		foundProjectStart := false
		for _, call := range startCalls {
			if call.Message == diagnostics.Project_0 {
				foundProjectStart = true
				break
			}
		}
		assert.Assert(t, foundProjectStart, "expected ProgressStart with Project_0 message")

		foundProjectFinish := false
		for _, call := range finishCalls {
			if call.Message == diagnostics.Project_0 {
				foundProjectFinish = true
				break
			}
		}
		assert.Assert(t, foundProjectFinish, "expected ProgressFinish with Project_0 message")
	})

	t.Run("emits progress for inferred project loading", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/index.ts": "export const x = 1;",
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///home/projects/index.ts", 1, "export const x = 1;", lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///home/projects/index.ts"))
		assert.NilError(t, err)

		startCalls := utils.Client().ProgressStartCalls()
		finishCalls := utils.Client().ProgressFinishCalls()

		assert.Assert(t, len(startCalls) > 0, "expected at least one ProgressStart call")
		assert.Assert(t, len(finishCalls) > 0, "expected at least one ProgressFinish call")

		foundProjectStart := false
		for _, call := range startCalls {
			if call.Message == diagnostics.Project_0 {
				foundProjectStart = true
				break
			}
		}
		assert.Assert(t, foundProjectStart, "expected ProgressStart with Project_0 message")
	})

	t.Run("each start has a matching finish", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/tsconfig.json": `{}`,
			"/home/projects/a.ts":          "export const a = 1;",
			"/home/projects/b.ts":          "export const b = 2;",
		}
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///home/projects/a.ts", 1, "export const a = 1;", lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///home/projects/a.ts"))
		assert.NilError(t, err)

		startCalls := utils.Client().ProgressStartCalls()
		finishCalls := utils.Client().ProgressFinishCalls()

		starts := 0
		finishes := 0
		for _, call := range startCalls {
			if call.Message == diagnostics.Project_0 {
				starts++
			}
		}
		for _, call := range finishCalls {
			if call.Message == diagnostics.Project_0 {
				finishes++
			}
		}
		assert.Equal(t, starts, finishes, "ProgressStart and ProgressFinish calls for Project_0 should be balanced")
	})
}
