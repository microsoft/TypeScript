package lsp_test

import (
	"context"
	"io"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/lsptestutil"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func initCompletionClient(t *testing.T, files map[string]string, prefs *lsutil.UserPreferences) *lsptestutil.LSPClient {
	t.Helper()

	fs := bundled.WrapFS(vfstest.FromMap(files, false))

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
	t.Cleanup(func() { assert.NilError(t, closeClient()) })

	initMsg, _, ok := lsptestutil.SendRequest(t, client, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	lsptestutil.SendNotification(t, client, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	lsptestutil.SendNotification(t, client, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{
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
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: aURI, LanguageId: "typescript", Text: "export const someVar = 10;"},
	})
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: bURI, LanguageId: "typescript", Text: "s"},
	})

	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: bURI},
	})

	msg, resp, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
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
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: aURI, LanguageId: "typescript", Text: "export const someVar = 10;"},
	})
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: bURI, LanguageId: "typescript", Text: "s"},
	})

	waitForCompletion := lsptestutil.SendRequestAsync(t, client, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: bURI},
		Position:     lsproto.Position{Line: 0, Character: 1},
		Context:      &lsproto.CompletionContext{},
	})

	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{
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
	msg, resp, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
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
	msg, resp, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
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
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: aURI, LanguageId: "typescript", Text: "export const someVar = 10;"},
	})
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: bURI, LanguageId: "typescript", Text: "someV"},
	})

	waitForCompletion := lsptestutil.SendRequestAsync(t, client, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: bURI},
		Position:     lsproto.Position{Line: 0, Character: 5},
		Context:      &lsproto.CompletionContext{},
	})

	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidChangeInfo, &lsproto.DidChangeTextDocumentParams{
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
