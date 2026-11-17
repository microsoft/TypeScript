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

func initCallHierarchyClient(t *testing.T) (*lsptestutil.LSPClient, lsproto.DocumentUri) {
	t.Helper()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const source = "interface G { m(): void; }\nfunction probe(g: G) { g.m(); }\n"
	files := map[string]string{
		"/home/projects/tsconfig.json": `{}`,
		"/home/projects/test.ts":       source,
	}
	fs := bundled.WrapFS(vfstest.FromMap(files, tspath.CaseInsensitive))

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		switch req.Method {
		case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability:
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		default:
			return nil
		}
	}

	client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
		Err: io.Discard, Cwd: "/home/projects", FS: fs, DefaultLibraryPath: bundled.LibPath(),
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	initMsg, _, ok := client.SendRequest(t, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	client.SendNotification(t, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	uri := lsproto.DocumentUri("file:///home/projects/test.ts")
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "typescript", Text: source},
	})
	return client, uri
}

func TestOutgoingCallHierarchyDoesNotDuplicateFromRanges(t *testing.T) {
	t.Parallel()
	client, uri := initCallHierarchyClient(t)

	_, prepare, ok := client.SendRequest(t, lsproto.TextDocumentPrepareCallHierarchyInfo, &lsproto.CallHierarchyPrepareParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lsproto.Position{Line: 1, Character: 9},
	})
	assert.Assert(t, ok && prepare.CallHierarchyItems != nil, "prepareCallHierarchy failed")
	assert.Equal(t, len(*prepare.CallHierarchyItems), 1)

	msg, outgoing, ok := client.SendRequest(t, lsproto.CallHierarchyOutgoingCallsInfo, &lsproto.CallHierarchyOutgoingCallsParams{
		Item: (*prepare.CallHierarchyItems)[0],
	})
	assert.Assert(t, ok && msg.AsResponse().Error == nil, "outgoingCalls failed")
	assert.Assert(t, outgoing.CallHierarchyOutgoingCalls != nil, "expected outgoing calls")
	assert.Equal(t, len(*outgoing.CallHierarchyOutgoingCalls), 1)
	assert.Equal(t, len((*outgoing.CallHierarchyOutgoingCalls)[0].FromRanges), 1)
}

func TestIncomingCallHierarchyDoesNotDuplicateFromRanges(t *testing.T) {
	t.Parallel()
	client, uri := initCallHierarchyClient(t)

	_, prepare, ok := client.SendRequest(t, lsproto.TextDocumentPrepareCallHierarchyInfo, &lsproto.CallHierarchyPrepareParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lsproto.Position{Line: 0, Character: 14},
	})
	assert.Assert(t, ok && prepare.CallHierarchyItems != nil, "prepareCallHierarchy failed")
	assert.Equal(t, len(*prepare.CallHierarchyItems), 1)

	msg, incoming, ok := client.SendRequest(t, lsproto.CallHierarchyIncomingCallsInfo, &lsproto.CallHierarchyIncomingCallsParams{
		Item: (*prepare.CallHierarchyItems)[0],
	})
	assert.Assert(t, ok && msg.AsResponse().Error == nil, "incomingCalls failed")
	assert.Assert(t, incoming.CallHierarchyIncomingCalls != nil, "expected incoming calls")
	assert.Equal(t, len(*incoming.CallHierarchyIncomingCalls), 1)
	assert.Equal(t, len((*incoming.CallHierarchyIncomingCalls)[0].FromRanges), 1)
}
