package lsp_test

import (
	"context"
	"fmt"
	"io"
	"slices"
	"strings"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/lsp"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/lsptestutil"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type workspaceDiagnosticReport = lsproto.WorkspaceFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport

// progressRecorder collects the $/progress notifications the server sends for a request, so tests
// can assert on streamed partial results and work done progress.
type progressRecorder struct {
	mu      sync.Mutex
	partial []workspaceDiagnosticReport
	kinds   []string
}

func (p *progressRecorder) record(req *lsproto.RequestMessage) {
	if req.Method != lsproto.MethodProgress {
		return
	}
	raw, ok := req.Params.(json.Value)
	if !ok {
		return
	}
	var partial lsproto.WorkspaceDiagnosticPartialResultParams
	if err := json.Unmarshal(raw, &partial); err == nil && len(partial.Value.Items) > 0 {
		p.mu.Lock()
		p.partial = append(p.partial, partial.Value.Items...)
		p.mu.Unlock()
		return
	}
	var workDone lsproto.ProgressParams
	if err := json.Unmarshal(raw, &workDone); err != nil {
		return
	}
	p.mu.Lock()
	defer p.mu.Unlock()
	switch {
	case workDone.Value.Begin != nil:
		p.kinds = append(p.kinds, "begin")
	case workDone.Value.Report != nil:
		p.kinds = append(p.kinds, "report")
	case workDone.Value.End != nil:
		p.kinds = append(p.kinds, "end")
	}
}

func (p *progressRecorder) partialItems() []workspaceDiagnosticReport {
	p.mu.Lock()
	defer p.mu.Unlock()
	return append([]workspaceDiagnosticReport(nil), p.partial...)
}

func (p *progressRecorder) workDoneKinds() []string {
	p.mu.Lock()
	defer p.mu.Unlock()
	return append([]string(nil), p.kinds...)
}

// initWorkspaceDiagnosticsClient brings up a client and turns workspace diagnostics on at the given
// scope. The capability is never advertised at initialize, so every test has to opt in the same way
// a user would.
func initWorkspaceDiagnosticsClient(t *testing.T, files map[string]string) (*lsptestutil.LSPClient, *progressRecorder) {
	t.Helper()
	return initWorkspaceDiagnosticsClientWithScope(t, files, "allProjects")
}

func initWorkspaceDiagnosticsClientWithScope(t *testing.T, files map[string]string, scope string) (*lsptestutil.LSPClient, *progressRecorder) {
	t.Helper()
	client, progress := startWorkspaceDiagnosticsClient(t, files)
	if scope != "" {
		setWorkspaceDiagnosticsScope(t, client, scope)
	}
	return client, progress
}

func startWorkspaceDiagnosticsClient(t *testing.T, files map[string]string) (*lsptestutil.LSPClient, *progressRecorder) {
	t.Helper()

	fs := bundled.WrapFS(vfstest.FromMap(files, false))
	progress := &progressRecorder{}

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		switch req.Method {
		case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability,
			lsproto.MethodWindowWorkDoneProgressCreate:
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		default:
			return nil
		}
	}

	client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
		Err:                io.Discard,
		Cwd:                "/home/projects",
		FS:                 fs,
		DefaultLibraryPath: bundled.LibPath(),
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	client.OnServerNotification = func(_ context.Context, req *lsproto.RequestMessage) {
		progress.record(req)
	}

	initMsg, initResult, ok := lsptestutil.SendRequest(t, client, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{
			TextDocument: &lsproto.TextDocumentClientCapabilities{
				Diagnostic: &lsproto.DiagnosticClientCapabilities{DynamicRegistration: new(true)},
			},
		},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	assert.Assert(t, !initResult.Capabilities.DiagnosticProvider.Options.WorkspaceDiagnostics,
		"workspace diagnostics must not be advertised at initialize")
	lsptestutil.SendNotification(t, client, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	return client, progress
}

func setWorkspaceDiagnosticsScope(t *testing.T, client *lsptestutil.LSPClient, scope string) {
	t.Helper()
	lsptestutil.SendNotification(t, client, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{
		Settings: map[string]any{
			"typescript": map[string]any{"experimental": map[string]any{"workspaceDiagnostics": map[string]any{"scope": scope}}},
		},
	})
}

// workspaceDiagnosticsFiles is a project with an error in one file, a clean file, and a dependency
// that must not be reported.
var workspaceDiagnosticsFiles = map[string]string{
	"/home/projects/tsconfig.json": `{}`,
	// Opened by tests. An open document is left out of workspace reports, so tests open this one
	// and assert on the others.
	"/home/projects/open.ts":                            "export const shared = 1;",
	"/home/projects/index.ts":                           "import { shared } from \"./open.js\";\nexport const x: string = shared;\n",
	"/home/projects/other.ts":                           "export const y = 1;",
	"/home/projects/node_modules/dep/package.json":      `{"name": "dep", "types": "index.d.ts"}`,
	"/home/projects/node_modules/dep/index.d.ts":        "export declare const z: string = 1;",
	"/home/projects/node_modules/@types/x/package.json": `{"name": "@types/x", "types": "index.d.ts"}`,
}

func openWorkspaceDiagnosticsProject(t *testing.T, client *lsptestutil.LSPClient) {
	t.Helper()
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri:        "file:///home/projects/open.ts",
			LanguageId: "typescript",
			Version:    1,
			Text:       workspaceDiagnosticsFiles["/home/projects/open.ts"],
		},
	})
}

func pullWorkspaceDiagnostics(t *testing.T, client *lsptestutil.LSPClient, params *lsproto.WorkspaceDiagnosticParams) *lsproto.WorkspaceDiagnosticReport {
	t.Helper()
	msg, resp, ok := lsptestutil.SendRequest(t, client, lsproto.WorkspaceDiagnosticInfo, params)
	assert.Assert(t, ok, "expected a response")
	assert.Assert(t, msg.AsResponse().Error == nil, "expected no error")
	return resp
}

func reportURIs(reports []workspaceDiagnosticReport) []string {
	uris := make([]string, 0, len(reports))
	for _, report := range reports {
		if report.FullDocumentDiagnosticReport != nil {
			uris = append(uris, string(report.FullDocumentDiagnosticReport.Uri))
		} else {
			uris = append(uris, string(report.UnchangedDocumentDiagnosticReport.Uri))
		}
	}
	return uris
}

func findFullReport(t *testing.T, reports []workspaceDiagnosticReport, uri lsproto.DocumentUri) *lsproto.WorkspaceFullDocumentDiagnosticReport {
	t.Helper()
	for _, report := range reports {
		if report.FullDocumentDiagnosticReport != nil && report.FullDocumentDiagnosticReport.Uri == uri {
			return report.FullDocumentDiagnosticReport
		}
	}
	t.Fatalf("no full report for %s in %v", uri, reportURIs(reports))
	return nil
}

func previousResultIDs(reports []workspaceDiagnosticReport) []lsproto.PreviousResultId {
	ids := make([]lsproto.PreviousResultId, 0, len(reports))
	for _, report := range reports {
		if full := report.FullDocumentDiagnosticReport; full != nil && full.ResultId != nil {
			ids = append(ids, lsproto.PreviousResultId{Uri: full.Uri, Value: *full.ResultId})
		} else if unchanged := report.UnchangedDocumentDiagnosticReport; unchanged != nil {
			ids = append(ids, lsproto.PreviousResultId{Uri: unchanged.Uri, Value: unchanged.ResultId})
		}
	}
	return ids
}

func TestWorkspaceDiagnosticsReportsEveryProjectFile(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	client, _ := initWorkspaceDiagnosticsClient(t, workspaceDiagnosticsFiles)
	openWorkspaceDiagnosticsProject(t, client)

	resp := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{},
	})

	assert.DeepEqual(t, reportURIs(resp.Items), []string{
		"file:///home/projects/index.ts",
		"file:///home/projects/other.ts",
	})

	// The opened document is deliberately absent: the client pulls it directly.
	withError := findFullReport(t, resp.Items, "file:///home/projects/index.ts")
	assert.Assert(t, withError.Version.Integer == nil)
	assert.Equal(t, len(withError.Items), 1)
	assert.Assert(t, strings.Contains(withError.Items[0].Message.AsString(), "not assignable"))

	clean := findFullReport(t, resp.Items, "file:///home/projects/other.ts")
	assert.Assert(t, clean.Version.Integer == nil)
	assert.Equal(t, len(clean.Items), 0)
}

func TestWorkspaceDiagnosticsReportsUnchangedForKnownResultIDs(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	client, _ := initWorkspaceDiagnosticsClient(t, workspaceDiagnosticsFiles)
	openWorkspaceDiagnosticsProject(t, client)

	first := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{},
	})
	ids := previousResultIDs(first.Items)
	assert.Equal(t, len(ids), 2)

	second := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: ids,
	})
	assert.DeepEqual(t, reportURIs(second.Items), reportURIs(first.Items))
	for _, report := range second.Items {
		assert.Assert(t, report.UnchangedDocumentDiagnosticReport != nil, "expected an unchanged report, got %v", report)
	}

	// Editing the open document changes what a closed file reports, so that file comes back in full.
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidChangeInfo, &lsproto.DidChangeTextDocumentParams{
		TextDocument: lsproto.VersionedTextDocumentIdentifier{Uri: "file:///home/projects/open.ts", Version: 2},
		ContentChanges: []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: "export const shared = \"ok\";"}},
		},
	})

	third := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: ids,
	})
	fixed := findFullReport(t, third.Items, "file:///home/projects/index.ts")
	assert.Equal(t, len(fixed.Items), 0)
}

func TestWorkspaceDiagnosticsClearsDocumentsNoLongerReported(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	client, _ := initWorkspaceDiagnosticsClient(t, workspaceDiagnosticsFiles)
	openWorkspaceDiagnosticsProject(t, client)

	resp := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{
			{Uri: "file:///home/projects/deleted.ts", Value: "stale"},
		},
	})

	cleared := findFullReport(t, resp.Items, "file:///home/projects/deleted.ts")
	assert.Equal(t, len(cleared.Items), 0)
	assert.Assert(t, cleared.ResultId == nil)
}

func TestWorkspaceDiagnosticsStreamsPartialResults(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	client, progress := initWorkspaceDiagnosticsClient(t, workspaceDiagnosticsFiles)
	openWorkspaceDiagnosticsProject(t, client)

	resp := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds:  []lsproto.PreviousResultId{},
		PartialResultToken: &lsproto.IntegerOrString{String: new("workspace-diagnostics")},
		WorkDoneToken:      &lsproto.IntegerOrString{String: new("workspace-diagnostics-progress")},
	})

	// Everything was streamed, so the response itself carries no reports.
	assert.Equal(t, len(resp.Items), 0)
	assert.DeepEqual(t, reportURIs(progress.partialItems()), []string{
		"file:///home/projects/index.ts",
		"file:///home/projects/other.ts",
	})

	kinds := progress.workDoneKinds()
	assert.Assert(t, len(kinds) >= 2, "expected work done progress, got %v", kinds)
	assert.Equal(t, kinds[0], "begin")
	assert.Equal(t, kinds[len(kinds)-1], "end")
}

func TestWorkspaceDiagnosticsDisabledByScope(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	client, _ := initWorkspaceDiagnosticsClient(t, workspaceDiagnosticsFiles)
	openWorkspaceDiagnosticsProject(t, client)
	setWorkspaceDiagnosticsScope(t, client, "off")

	resp := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{
			{Uri: "file:///home/projects/index.ts", Value: "stale"},
		},
	})

	// Nothing is checked, but whatever the client still holds is cleared.
	assert.DeepEqual(t, reportURIs(resp.Items), []string{"file:///home/projects/index.ts"})
	assert.Equal(t, len(findFullReport(t, resp.Items, "file:///home/projects/index.ts").Items), 0)
}

// compositeSolutionFiles is a solution-style build of two composite projects, where b references a
// and a has an error.
var compositeSolutionFiles = map[string]string{
	"/home/projects/tsconfig.json":   `{"files": [], "references": [{"path": "./a"}, {"path": "./b"}]}`,
	"/home/projects/a/tsconfig.json": `{"compilerOptions": {"composite": true, "outDir": "lib"}}`,
	"/home/projects/a/index.ts":      "export const a: string = 1;",
	"/home/projects/b/tsconfig.json": `{"compilerOptions": {"composite": true, "outDir": "lib"}, "references": [{"path": "../a"}]}`,
	"/home/projects/b/index.ts":      "import { a } from \"../a/index.js\";\nexport const b = a;\n",
	"/home/projects/b/open.ts":       "export const opened = 1;\n",
}

func openAndPull(t *testing.T, files map[string]string, open lsproto.DocumentUri) *lsproto.WorkspaceDiagnosticReport {
	t.Helper()
	client, _ := initWorkspaceDiagnosticsClient(t, files)
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri:        open,
			LanguageId: "typescript",
			Version:    1,
			Text:       files[open.FileName()],
		},
	})
	return pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{},
	})
}

// A file reached through the source-of-project-reference redirect belongs to the project that owns
// it, so it is reported once even though it appears in both programs.
func TestWorkspaceDiagnosticsAttributesReferencedSourcesToOwningProject(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	resp := openAndPull(t, compositeSolutionFiles, "file:///home/projects/b/open.ts")

	assert.DeepEqual(t, reportURIs(resp.Items), []string{
		"file:///home/projects/a/index.ts",
		"file:///home/projects/b/index.ts",
	})
	assert.Equal(t, len(findFullReport(t, resp.Items, "file:///home/projects/a/index.ts").Items), 1)
	assert.Equal(t, len(findFullReport(t, resp.Items, "file:///home/projects/b/index.ts").Items), 0)
}

// With the redirect disabled, b consumes a's emitted declarations. Those are build output, not
// something the user edits, so they must not be reported.
func TestWorkspaceDiagnosticsSkipsReferencedProjectOutputs(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]string{
		"/home/projects/tsconfig.json":    `{"files": [], "references": [{"path": "./a"}, {"path": "./b"}]}`,
		"/home/projects/a/tsconfig.json":  `{"compilerOptions": {"composite": true, "outDir": "lib"}}`,
		"/home/projects/a/index.ts":       "export const a: string = \"ok\";",
		"/home/projects/a/lib/index.d.ts": "export declare const a: string = 1;\n",
		"/home/projects/a/lib/index.js":   "export const a = \"ok\";\n",
		"/home/projects/b/tsconfig.json":  `{"compilerOptions": {"composite": true, "outDir": "lib", "disableSourceOfProjectReferenceRedirect": true}, "references": [{"path": "../a"}]}`,
		"/home/projects/b/index.ts":       "import { a } from \"../a/index.js\";\nexport const b = a;\n",
		"/home/projects/b/open.ts":        "export const opened = 1;\n",
	}

	resp := openAndPull(t, files, "file:///home/projects/b/open.ts")

	assert.DeepEqual(t, reportURIs(resp.Items), []string{
		"file:///home/projects/a/index.ts",
		"file:///home/projects/b/index.ts",
	})
}

// disableReferencedProjectLoad keeps the referenced project out of the editor entirely, so its
// files are not reported even though the referencing project's program contains them.
func TestWorkspaceDiagnosticsHonorsDisableReferencedProjectLoad(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]string{
		"/home/projects/a/tsconfig.json": `{"compilerOptions": {"composite": true, "outDir": "lib"}}`,
		"/home/projects/a/index.ts":      "export const a: string = 1;",
		"/home/projects/b/tsconfig.json": `{"compilerOptions": {"composite": true, "outDir": "lib", "disableReferencedProjectLoad": true}, "references": [{"path": "../a"}]}`,
		"/home/projects/b/index.ts":      "import { a } from \"../a/index.js\";\nexport const b: number = a;\n",
		"/home/projects/b/open.ts":       "export const opened = 1;\n",
	}

	resp := openAndPull(t, files, "file:///home/projects/b/open.ts")

	assert.DeepEqual(t, reportURIs(resp.Items), []string{"file:///home/projects/b/index.ts"})
	assert.Equal(t, len(findFullReport(t, resp.Items, "file:///home/projects/b/index.ts").Items), 1)
}

// manyProjectFiles builds a solution of independent sibling projects, each with a few files and an
// error in one of them, to exercise checking more than one project at a time.
func manyProjectFiles(projects, filesPerProject int) map[string]string {
	files := map[string]string{}
	var refs strings.Builder
	for p := range projects {
		name := fmt.Sprintf("p%d", p)
		if p > 0 {
			refs.WriteString(", ")
		}
		fmt.Fprintf(&refs, `{"path": "./%s"}`, name)
		files[fmt.Sprintf("/home/projects/%s/tsconfig.json", name)] = `{"compilerOptions": {"composite": true, "outDir": "lib"}}`
		for f := range filesPerProject {
			body := fmt.Sprintf("export const v%d = %d;", f, f)
			if f == 0 {
				body = "export const bad: string = 1;"
			}
			files[fmt.Sprintf("/home/projects/%s/f%d.ts", name, f)] = body + "\n"
		}
	}
	files["/home/projects/p0/open.ts"] = "export const opened = 1;\n"
	files["/home/projects/tsconfig.json"] = fmt.Sprintf(`{"files": [], "references": [%s]}`, refs.String())
	return files
}

// Projects are checked concurrently, but a pull must still report the same files in the same order
// every time.
func TestWorkspaceDiagnosticsOrdersReportsDeterministically(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const projects, filesPerProject = 6, 4
	files := manyProjectFiles(projects, filesPerProject)

	var want []string
	for p := range projects {
		for f := range filesPerProject {
			want = append(want, fmt.Sprintf("file:///home/projects/p%d/f%d.ts", p, f))
		}
	}

	for range 3 {
		resp := openAndPull(t, files, "file:///home/projects/p0/open.ts")
		assert.DeepEqual(t, reportURIs(resp.Items), want)
		for p := range projects {
			uri := lsproto.DocumentUri(fmt.Sprintf("file:///home/projects/p%d/f0.ts", p))
			assert.Equal(t, len(findFullReport(t, resp.Items, uri).Items), 1, "expected the error in %s", uri)
		}
	}
}

// Editing one project rebuilds only that project's program, so the untouched projects are
// acknowledged from the cache instead of being checked again.
func TestWorkspaceDiagnosticsRechecksOnlyTheEditedProject(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]string{
		"/home/projects/tsconfig.json":    `{"files": [], "references": [{"path": "./p0"}, {"path": "./p1"}, {"path": "./p2"}]}`,
		"/home/projects/p0/tsconfig.json": `{"compilerOptions": {"composite": true, "outDir": "out"}}`,
		"/home/projects/p0/open.ts":       "export const shared = 1;\n",
		"/home/projects/p0/consumer.ts":   "import { shared } from \"./open.js\";\nexport const use: string = shared;\n",
		"/home/projects/p1/tsconfig.json": `{"compilerOptions": {"composite": true, "outDir": "out"}}`,
		"/home/projects/p1/index.ts":      "export const p1 = 1;\n",
		"/home/projects/p2/tsconfig.json": `{"compilerOptions": {"composite": true, "outDir": "out"}}`,
		"/home/projects/p2/index.ts":      "export const p2 = 1;\n",
	}
	opened := lsproto.DocumentUri("file:///home/projects/p0/open.ts")

	client, _ := initWorkspaceDiagnosticsClient(t, files)
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri: opened, LanguageId: "typescript", Version: 1,
			Text: files["/home/projects/p0/open.ts"],
		},
	})

	first := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{},
	})
	consumer := lsproto.DocumentUri("file:///home/projects/p0/consumer.ts")
	assert.Equal(t, len(findFullReport(t, first.Items, consumer).Items), 1)
	ids := previousResultIDs(first.Items)

	// Fix the error by editing p0's open file. Only p0's program is rebuilt.
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidChangeInfo, &lsproto.DidChangeTextDocumentParams{
		TextDocument: lsproto.VersionedTextDocumentIdentifier{Uri: opened, Version: 2},
		ContentChanges: []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: "export const shared = \"ok\";\n"}},
		},
	})

	second := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{PreviousResultIds: ids})

	// The consumer's diagnostics changed, so it comes back in full and now reports nothing.
	assert.Equal(t, len(findFullReport(t, second.Items, consumer).Items), 0)

	// Every file of every other project is acknowledged as unchanged.
	for _, report := range second.Items {
		if full := report.FullDocumentDiagnosticReport; full != nil {
			assert.Equal(t, full.Uri, consumer, "only the affected file should be reported in full")
			continue
		}
		assert.Assert(t, report.UnchangedDocumentDiagnosticReport != nil)
	}
}

// A setting that changes what a diagnostic says is invisible to a program generation, so the cache
// must not answer "unchanged" across such a change.
func TestWorkspaceDiagnosticsInvalidatesCacheOnSeverityPreferenceChange(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	uri := lsproto.DocumentUri("file:///home/projects/index.ts")
	files := map[string]string{
		"/home/projects/tsconfig.json": `{"compilerOptions": {"noUnusedLocals": true}}`,
		"/home/projects/index.ts":      "export function f() { const unused = 1; }\n",
		"/home/projects/open.ts":       "export const opened = 1;\n",
	}
	client, _ := initWorkspaceDiagnosticsClient(t, files)
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri: "file:///home/projects/open.ts", LanguageId: "typescript", Version: 1,
			Text: files["/home/projects/open.ts"],
		},
	})

	first := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{},
	})
	before := findFullReport(t, first.Items, uri)
	assert.Equal(t, len(before.Items), 1)
	assert.Equal(t, *before.Items[0].Severity, lsproto.DiagnosticSeverityWarning)

	// Style checks become errors. The program is untouched, so only the fingerprint catches this.
	// Configuration always arrives as a full snapshot, so the scope has to be repeated or it would
	// fall back to its default and turn the feature off.
	lsptestutil.SendNotification(t, client, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{
		Settings: map[string]any{"typescript": map[string]any{
			"reportStyleChecksAsWarnings": false,
			"experimental":                map[string]any{"workspaceDiagnostics": map[string]any{"scope": "allProjects"}},
		}},
	})

	second := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: previousResultIDs(first.Items),
	})
	after := findFullReport(t, second.Items, uri)
	assert.Equal(t, len(after.Items), 1)
	assert.Equal(t, *after.Items[0].Severity, lsproto.DiagnosticSeverityError)
}

// scopedSolutionFiles is a three-project solution: lib is referenced by app, and standalone is
// unrelated to both. Each has one error.
var scopedSolutionFiles = map[string]string{
	"/home/projects/tsconfig.json":            `{"files": [], "references": [{"path": "./lib"}, {"path": "./app"}, {"path": "./standalone"}]}`,
	"/home/projects/lib/tsconfig.json":        `{"compilerOptions": {"composite": true, "outDir": "out"}}`,
	"/home/projects/lib/index.ts":             "export const libBad: string = 1;\n",
	"/home/projects/lib/open.ts":              "export const opened = 1;\n",
	"/home/projects/app/tsconfig.json":        `{"compilerOptions": {"composite": true, "outDir": "out"}, "references": [{"path": "../lib"}]}`,
	"/home/projects/app/index.ts":             "import { libBad } from \"../lib/index.js\";\nexport const appBad: number = libBad;\n",
	"/home/projects/standalone/tsconfig.json": `{"compilerOptions": {"composite": true, "outDir": "out"}}`,
	"/home/projects/standalone/index.ts":      "export const aloneBad: string = 1;\n",
}

func pullWithScope(t *testing.T, scope string, open lsproto.DocumentUri) []string {
	t.Helper()
	client, _ := initWorkspaceDiagnosticsClientWithScope(t, scopedSolutionFiles, scope)
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri: open, LanguageId: "typescript", Version: 1,
			Text: scopedSolutionFiles[open.FileName()],
		},
	})
	resp := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{},
	})
	return reportURIs(resp.Items)
}

// Opening a file in lib, each scope reports a different slice of the solution: lib alone, lib plus
// the app that consumes it, or everything including the unrelated project.
func TestWorkspaceDiagnosticsScopes(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	opened := lsproto.DocumentUri("file:///home/projects/lib/open.ts")

	t.Run("openProjects", func(t *testing.T) {
		t.Parallel()
		assert.DeepEqual(t, pullWithScope(t, "openProjects", opened), []string{
			"file:///home/projects/lib/index.ts",
		})
	})

	t.Run("openProjectsAndDependents", func(t *testing.T) {
		t.Parallel()
		assert.DeepEqual(t, pullWithScope(t, "openProjectsAndDependents", opened), []string{
			"file:///home/projects/app/index.ts",
			"file:///home/projects/lib/index.ts",
		})
	})

	t.Run("allProjects", func(t *testing.T) {
		t.Parallel()
		assert.DeepEqual(t, pullWithScope(t, "allProjects", opened), []string{
			"file:///home/projects/app/index.ts",
			"file:///home/projects/lib/index.ts",
			"file:///home/projects/standalone/index.ts",
		})
	})

	t.Run("off", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, len(pullWithScope(t, "off", opened)), 0)
	})
}

// A document the client has open is pulled directly through textDocument/diagnostic, and the client
// only reconciles document and workspace results within a single diagnostic provider. Workspace
// diagnostics ride on their own provider, so reporting an open file here would show every problem
// in it twice. Opening a file that was previously reported must also clear it.
func TestWorkspaceDiagnosticsExcludesOpenDocuments(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]string{
		"/home/projects/tsconfig.json": `{}`,
		"/home/projects/broken.ts":     "export const bad: string = 1;\n",
		"/home/projects/clean.ts":      "export const fine = 1;\n",
	}
	broken := lsproto.DocumentUri("file:///home/projects/broken.ts")

	client, _ := initWorkspaceDiagnosticsClient(t, files)

	// Open only the clean file. The error in the unopened file is reported by the workspace pull.
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri: "file:///home/projects/clean.ts", LanguageId: "typescript", Version: 1,
			Text: files["/home/projects/clean.ts"],
		},
	})
	first := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{},
	})
	assert.DeepEqual(t, reportURIs(first.Items), []string{string(broken)})
	assert.Equal(t, len(findFullReport(t, first.Items, broken).Items), 1)

	// Now open the file with the error. It must be reported empty rather than left in place, so the
	// workspace collection drops it and only the document pull shows the problem.
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri: broken, LanguageId: "typescript", Version: 1,
			Text: files["/home/projects/broken.ts"],
		},
	})
	second := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: previousResultIDs(first.Items),
	})
	cleared := findFullReport(t, second.Items, broken)
	assert.Equal(t, len(cleared.Items), 0, "an opened file must be cleared from the workspace report")

	// Closing it hands ownership back to the workspace pull.
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: broken},
	})
	third := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: previousResultIDs(second.Items),
	})
	assert.Equal(t, len(findFullReport(t, third.Items, broken).Items), 1)
}

// The node_modules exclusion is a default, not a rule: a project can say what workspace diagnostics
// should skip.
func TestWorkspaceDiagnosticsHonorsExcludeOption(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]string{
		"/home/projects/tsconfig.json": `{"compilerOptions": {"experimentalWorkspaceDiagnosticsExclude": ["**/vendor/**"]}}`,
		"/home/projects/open.ts":       "export const opened = 1;\n",
		"/home/projects/src/index.ts":  "export const bad: string = 1;\n",
		"/home/projects/vendor/lib.ts": "export const vendored: string = 1;\n",
	}

	client, _ := initWorkspaceDiagnosticsClient(t, files)
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri: "file:///home/projects/open.ts", LanguageId: "typescript", Version: 1,
			Text: files["/home/projects/open.ts"],
		},
	})

	resp := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{},
	})

	// vendor/ is excluded by the option; src/ is reported even though the default would not have
	// excluded vendor/ and this project's setting replaces that default.
	assert.DeepEqual(t, reportURIs(resp.Items), []string{"file:///home/projects/src/index.ts"})
	assert.Equal(t, len(findFullReport(t, resp.Items, "file:///home/projects/src/index.ts").Items), 1)
}

// A file with no tsconfig lands in the inferred project, which the memoized open-configured-projects
// set does not cover, so the open-project scopes have to account for it separately.
func TestWorkspaceDiagnosticsCoversInferredProject(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]string{
		"/home/projects/index.ts":  "import { helper } from \"./helper.js\";\nexport const x = helper;\n",
		"/home/projects/helper.ts": "export const helper: string = 1;\n",
	}

	client, _ := initWorkspaceDiagnosticsClientWithScope(t, files, "openProjects")
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri: "file:///home/projects/index.ts", LanguageId: "typescript", Version: 1,
			Text: files["/home/projects/index.ts"],
		},
	})

	resp := pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
		PreviousResultIds: []lsproto.PreviousResultId{},
	})

	helper := lsproto.DocumentUri("file:///home/projects/helper.ts")
	assert.DeepEqual(t, reportURIs(resp.Items), []string{string(helper)})
	assert.Equal(t, len(findFullReport(t, resp.Items, helper).Items), 1)
}

// Single threaded mode takes a different path that spawns no goroutines. It has to produce the same
// reports, and it must not deadlock: core.NewWorkGroup's single threaded form defers work to
// RunAndWait, which cannot drive a drain that runs as projects finish.
func TestWorkspaceDiagnosticsSingleThreaded(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]string{
		"/home/projects/tsconfig.json":    `{"files": [], "references": [{"path": "./p0"}, {"path": "./p1"}]}`,
		"/home/projects/p0/tsconfig.json": `{"compilerOptions": {"composite": true, "outDir": "out", "singleThreaded": true}}`,
		"/home/projects/p0/open.ts":       "export const opened = 1;\n",
		"/home/projects/p0/bad.ts":        "export const a: string = 1;\n",
		"/home/projects/p1/tsconfig.json": `{"compilerOptions": {"composite": true, "outDir": "out", "singleThreaded": true}}`,
		"/home/projects/p1/bad.ts":        "export const b: string = 1;\n",
	}

	resp := openAndPull(t, files, "file:///home/projects/p0/open.ts")

	assert.DeepEqual(t, reportURIs(resp.Items), []string{
		"file:///home/projects/p0/bad.ts",
		"file:///home/projects/p1/bad.ts",
	})
	for _, uri := range reportURIs(resp.Items) {
		assert.Equal(t, len(findFullReport(t, resp.Items, lsproto.DocumentUri(uri)).Items), 1)
	}
}

// "projects that reference them" is transitive: app references mid references base, so opening a
// file in base must reach app as well, while an unrelated project stays out.
func TestWorkspaceDiagnosticsDependentsAreTransitive(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	composite := `{"compilerOptions": {"composite": true, "outDir": "out"}%s}`
	files := map[string]string{
		"/home/projects/tsconfig.json":           `{"files": [], "references": [{"path": "./base"}, {"path": "./mid"}, {"path": "./app"}, {"path": "./unrelated"}]}`,
		"/home/projects/base/tsconfig.json":      fmt.Sprintf(composite, ""),
		"/home/projects/base/open.ts":            "export const opened = 1;\n",
		"/home/projects/base/index.ts":           "export const base: string = 1;\n",
		"/home/projects/mid/tsconfig.json":       fmt.Sprintf(composite, `, "references": [{"path": "../base"}]`),
		"/home/projects/mid/index.ts":            "export const mid: string = 1;\n",
		"/home/projects/app/tsconfig.json":       fmt.Sprintf(composite, `, "references": [{"path": "../mid"}]`),
		"/home/projects/app/index.ts":            "export const app: string = 1;\n",
		"/home/projects/unrelated/tsconfig.json": fmt.Sprintf(composite, ""),
		"/home/projects/unrelated/index.ts":      "export const alone: string = 1;\n",
	}

	pull := func(scope string) []string {
		client, _ := initWorkspaceDiagnosticsClientWithScope(t, files, scope)
		lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
			TextDocument: &lsproto.TextDocumentItem{
				Uri: "file:///home/projects/base/open.ts", LanguageId: "typescript", Version: 1,
				Text: files["/home/projects/base/open.ts"],
			},
		})
		got := reportURIs(pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{
			PreviousResultIds: []lsproto.PreviousResultId{},
		}).Items)
		slices.Sort(got)
		return got
	}

	assert.DeepEqual(t, pull("openProjectsAndDependents"), []string{
		"file:///home/projects/app/index.ts",
		"file:///home/projects/base/index.ts",
		"file:///home/projects/mid/index.ts",
	})

	// The unrelated project is reachable and gets loaded, so its absence above is the scope
	// filtering it out rather than the loader never finding it.
	assert.DeepEqual(t, pull("allProjects"), []string{
		"file:///home/projects/app/index.ts",
		"file:///home/projects/base/index.ts",
		"file:///home/projects/mid/index.ts",
		"file:///home/projects/unrelated/index.ts",
	})
}
