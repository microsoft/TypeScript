package lsp_test

import (
	"context"
	"io"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/modulespecifiers"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/lsptestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func initCompletionClient(t *testing.T, files map[string]string, prefs *lsutil.UserPreferences) *lsptestutil.LSPClient {
	t.Helper()

	fs := bundled.WrapFS(vfstest.FromMap(files, tspath.CaseInsensitive))

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		switch req.Method {
		case lsproto.MethodWorkspaceConfiguration:
			return &lsproto.ResponseMessage{
				ID:      req.ID,
				JSONRPC: req.JSONRPC,
				Result:  []any{prefs},
			}
		case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability:
			return &lsproto.ResponseMessage{
				ID:      req.ID,
				JSONRPC: req.JSONRPC,
				Result:  lsproto.Null{},
			}
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

	initMsg, _, ok := client.SendRequest(t, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	client.SendNotification(t, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	client.SendNotification(t, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{
		Settings: map[string]any{"typescript": prefs},
	})

	return client
}

func completionItems(resp lsproto.CompletionResponse) []*lsproto.CompletionItem {
	if resp.List != nil {
		return resp.List.Items
	}
	if resp.Items != nil {
		return *resp.Items
	}
	return nil
}

func findCompletionItem(items []*lsproto.CompletionItem, label string) *lsproto.CompletionItem {
	for _, item := range items {
		if item.Label == label {
			return item
		}
	}
	return nil
}

// Verifies that completion succeeds on a file that was already closed
// by the time the server processes the completion request.
func TestCompletionAfterFileClose(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	prefs := &lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
	}
	client := initCompletionClient(t, map[string]string{
		"/home/projects/tsconfig.json": `{"compilerOptions": {"module": "esnext", "target": "esnext"}}`,
		"/home/projects/a.ts":          "export const someVar = 10;",
		"/home/projects/b.ts":          "s",
	}, prefs)

	aURI := lsconv.FileNameToDocumentURI("/home/projects/a.ts")
	bURI := lsconv.FileNameToDocumentURI("/home/projects/b.ts")
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: aURI, LanguageId: "typescript", Text: "export const someVar = 10;"},
	})
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: bURI, LanguageId: "typescript", Text: "s"},
	})

	client.SendNotification(t, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: bURI},
	})

	msg, resp, ok := client.SendRequest(t, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: bURI},
		Position:     lsproto.Position{Line: 0, Character: 1},
		Context:      &lsproto.CompletionContext{},
	})
	assert.Assert(t, ok, "expected a response")
	assert.Assert(t, msg.AsResponse().Error == nil)
	item := findCompletionItem(completionItems(resp), "someVar")
	assert.Assert(t, item != nil)
	assert.Assert(t, item.Data != nil && item.Data.AutoImport != nil)
	assert.Equal(t, item.Data.AutoImport.ModuleSpecifier, "./a")
}

// Completion request is enqueued first, then a close notification is sent.
// This guarantees the completion enters the input channel before the close.
func TestCompletionWithConcurrentFileClose(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	prefs := &lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
	}
	client := initCompletionClient(t, map[string]string{
		"/home/projects/tsconfig.json": `{"compilerOptions": {"module": "esnext", "target": "esnext"}}`,
		"/home/projects/a.ts":          "export const someVar = 10;",
		"/home/projects/b.ts":          "s",
	}, prefs)

	aURI := lsconv.FileNameToDocumentURI("/home/projects/a.ts")
	bURI := lsconv.FileNameToDocumentURI("/home/projects/b.ts")
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: aURI, LanguageId: "typescript", Text: "export const someVar = 10;"},
	})
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: bURI, LanguageId: "typescript", Text: "s"},
	})

	waitForCompletion := client.SendRequestAsync(t, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: bURI},
		Position:     lsproto.Position{Line: 0, Character: 1},
		Context:      &lsproto.CompletionContext{},
	})

	client.SendNotification(t, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: bURI},
	})

	msg, resp, ok := waitForCompletion()
	assert.Assert(t, ok, "expected a response")
	assert.Assert(t, msg.AsResponse().Error == nil)
	item := findCompletionItem(completionItems(resp), "someVar")
	assert.Assert(t, item != nil)
	assert.Assert(t, item.Data != nil && item.Data.AutoImport != nil)
	assert.Equal(t, item.Data.AutoImport.ModuleSpecifier, "./a")
}

func TestCompletionForUnopenedFile(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	prefs := &lsutil.UserPreferences{}
	client := initCompletionClient(t, map[string]string{
		"/home/projects/tsconfig.json": `{"compilerOptions": {"module": "esnext", "target": "esnext"}}`,
		"/home/projects/c.ts":          "let xyz = 1;\nxy",
	}, prefs)

	cURI := lsconv.FileNameToDocumentURI("/home/projects/c.ts")
	msg, resp, ok := client.SendRequest(t, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: cURI},
		Position:     lsproto.Position{Line: 1, Character: 2},
		Context:      &lsproto.CompletionContext{},
	})
	assert.Assert(t, ok, "expected a response")
	assert.Assert(t, msg.AsResponse().Error == nil)
	assert.Assert(t, findCompletionItem(completionItems(resp), "xyz") != nil)
}

func TestAutoImportCompletionForUnopenedFile(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	prefs := &lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
	}
	client := initCompletionClient(t, map[string]string{
		"/home/projects/tsconfig.json": `{"compilerOptions": {"module": "esnext", "target": "esnext"}}`,
		"/home/projects/a.ts":          "export const someVar = 10;",
		"/home/projects/c.ts":          "s",
	}, prefs)

	cURI := lsconv.FileNameToDocumentURI("/home/projects/c.ts")
	msg, resp, ok := client.SendRequest(t, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: cURI},
		Position:     lsproto.Position{Line: 0, Character: 1},
		Context:      &lsproto.CompletionContext{},
	})
	assert.Assert(t, ok, "expected a response")
	assert.Assert(t, msg.AsResponse().Error == nil)
	item := findCompletionItem(completionItems(resp), "someVar")
	assert.Assert(t, item != nil)
	assert.Assert(t, item.Data != nil && item.Data.AutoImport != nil)
	assert.Equal(t, item.Data.AutoImport.ModuleSpecifier, "./a")
}

func TestAutoImportModuleSpecifierAfterUserPreferenceChange(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	prefs := &lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
	}
	client := initCompletionClient(t, map[string]string{
		"/home/projects/tsconfig.json":     `{"compilerOptions": {"module": "esnext", "target": "esnext", "paths": {"~/*": ["./src/*"]}}}`,
		"/home/projects/src/util/path.ts":  "export const somePath = 10;",
		"/home/projects/src/util/index.ts": "s",
	}, prefs)

	uri := lsconv.FileNameToDocumentURI("/home/projects/src/util/index.ts")
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "typescript", Text: "s"},
	})

	moduleSpecifier := func() string {
		msg, resp, ok := client.SendRequest(t, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
			TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
			Position:     lsproto.Position{Line: 0, Character: 1},
			Context:      &lsproto.CompletionContext{},
		})
		assert.Assert(t, ok, "expected a response")
		assert.Assert(t, msg.AsResponse().Error == nil)
		item := findCompletionItem(completionItems(resp), "somePath")
		assert.Assert(t, item != nil)
		assert.Assert(t, item.Data != nil && item.Data.AutoImport != nil)
		return item.Data.AutoImport.ModuleSpecifier
	}

	assert.Equal(t, moduleSpecifier(), "./path")

	excluded := *prefs
	excluded.AutoImportSpecifierExcludeRegexes = []string{"^\\./path$"}
	client.SendNotification(t, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{
		Settings: map[string]any{"typescript": &excluded},
	})

	assert.Equal(t, moduleSpecifier(), "~/util/path")

	jsEnding := excluded
	jsEnding.ImportModuleSpecifierEnding = modulespecifiers.ImportModuleSpecifierEndingPreferenceJs
	client.SendNotification(t, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{
		Settings: map[string]any{"typescript": &jsEnding},
	})

	assert.Equal(t, moduleSpecifier(), "./path.js")

	nonRelative := jsEnding
	nonRelative.ImportModuleSpecifierPreference = modulespecifiers.ImportModuleSpecifierPreferenceNonRelative
	client.SendNotification(t, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{
		Settings: map[string]any{"typescript": &nonRelative},
	})

	assert.Equal(t, moduleSpecifier(), "~/util/path.js")
}

// TestCompletionSnapshotFreezing verifies that the auto-import retry uses the
// snapshot captured in the sync phase, not a newer one that includes a
// concurrent DidChange. Without snapshot freezing the retry would flush the
// pending change, making position/prefix inconsistent with the request.
func TestCompletionSnapshotFreezing(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	prefs := &lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
	}
	client := initCompletionClient(t, map[string]string{
		"/home/projects/tsconfig.json": `{"compilerOptions": {"module": "esnext", "target": "esnext"}}`,
		"/home/projects/a.ts":          "export const someVar = 10;",
		"/home/projects/b.ts":          "someV",
	}, prefs)

	aURI := lsconv.FileNameToDocumentURI("/home/projects/a.ts")
	bURI := lsconv.FileNameToDocumentURI("/home/projects/b.ts")
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: aURI, LanguageId: "typescript", Text: "export const someVar = 10;"},
	})
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: bURI, LanguageId: "typescript", Text: "someV"},
	})

	waitForCompletion := client.SendRequestAsync(t, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: bURI},
		Position:     lsproto.Position{Line: 0, Character: 5},
		Context:      &lsproto.CompletionContext{},
	})

	client.SendNotification(t, lsproto.TextDocumentDidChangeInfo, &lsproto.DidChangeTextDocumentParams{
		TextDocument: lsproto.VersionedTextDocumentIdentifier{Uri: bURI, Version: 2},
		ContentChanges: []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: "notMatching"}},
		},
	})

	msg, resp, ok := waitForCompletion()
	assert.Assert(t, ok, "expected a response")
	assert.Assert(t, msg.AsResponse().Error == nil)
	item := findCompletionItem(completionItems(resp), "someVar")
	assert.Assert(t, item != nil, "expected someVar in completions (snapshot freezing should preserve original content)")
	assert.Assert(t, item.Data != nil && item.Data.AutoImport != nil)
	assert.Equal(t, item.Data.AutoImport.ModuleSpecifier, "./a")
}
