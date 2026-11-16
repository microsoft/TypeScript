package lsp_test

import (
	"context"
	"io"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/lsp"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/lsptestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// TestOutgoingCallHierarchyDoesNotDuplicateFromRanges reproduces #65526: a
// single method call produced two identical fromRanges entries.
func TestOutgoingCallHierarchyDoesNotDuplicateFromRanges(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const text = "interface G { m(): void; }\nfunction probe(g: G) { g.m(); }\n"
	files := map[string]string{
		"/home/projects/tsconfig.json": `{"compilerOptions":{"strict":true}}`,
		"/home/projects/repro.ts":      text,
	}
	fs := bundled.WrapFS(vfstest.FromMap(files, tspath.CaseInsensitive))

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		if req.Method == lsproto.MethodClientRegisterCapability || req.Method == lsproto.MethodClientUnregisterCapability {
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		}
		return nil
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

	uri := lsproto.DocumentUri("file:///home/projects/repro.ts")
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "typescript", Text: text},
	})

	prepareMsg, prepare, ok := client.SendRequest(t, lsproto.TextDocumentPrepareCallHierarchyInfo, &lsproto.CallHierarchyPrepareParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lsproto.Position{Line: 1, Character: 9},
	})
	assert.Assert(t, ok && prepareMsg.AsResponse().Error == nil)
	assert.Assert(t, prepare.CallHierarchyItems != nil)
	items := *prepare.CallHierarchyItems
	assert.Equal(t, len(items), 1)

	outgoingMsg, outgoing, ok := client.SendRequest(t, lsproto.CallHierarchyOutgoingCallsInfo, &lsproto.CallHierarchyOutgoingCallsParams{
		Item: items[0],
	})
	assert.Assert(t, ok && outgoingMsg.AsResponse().Error == nil)
	assert.Assert(t, outgoing.CallHierarchyOutgoingCalls != nil)
	calls := *outgoing.CallHierarchyOutgoingCalls
	assert.Equal(t, len(calls), 1)
	assert.Equal(t, len(calls[0].FromRanges), 1)
}
