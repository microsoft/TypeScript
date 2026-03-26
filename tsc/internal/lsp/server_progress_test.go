package lsp_test

import (
	"context"
	"io"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/lsptestutil"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestProgressNotificationsEndToEnd(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/home/projects/tsconfig.json": `{}`,
		"/home/projects/index.ts":      "export const x = 1;",
	}, false))

	// Collect $/progress notifications. Signal when "end" arrives.
	var mu sync.Mutex
	var progressNotifications []*lsproto.ProgressParams
	endReceived := make(chan struct{}, 1)

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		switch req.Method {
		case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability, lsproto.MethodWindowWorkDoneProgressCreate:
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
	defer func() { assert.NilError(t, closeClient()) }()

	client.OnServerNotification = func(_ context.Context, req *lsproto.RequestMessage) {
		if req.Method == lsproto.MethodProgress {
			if params, ok := req.Params.(*lsproto.ProgressParams); ok {
				mu.Lock()
				progressNotifications = append(progressNotifications, params)
				isEnd := params.Value.End != nil
				mu.Unlock()
				if isEnd {
					select {
					case endReceived <- struct{}{}:
						// Signaled.
					default:
						// Already signaled.
					}
				}
			}
		}
	}

	initMsg, _, ok := lsptestutil.SendRequest(t, client, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{
			Window: &lsproto.WindowClientCapabilities{
				WorkDoneProgress: new(true),
			},
		},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	lsptestutil.SendNotification(t, client, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	uri := lsproto.DocumentUri("file:///home/projects/index.ts")
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "typescript", Text: "export const x = 1;"},
	})

	// Send a request to ensure the server has processed the didOpen and loaded the project.
	msg, resp, ok := lsptestutil.SendRequest(t, client, lsproto.CustomProjectInfoInfo, &lsproto.ProjectInfoParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok, "expected a response")
	assert.Assert(t, msg.AsResponse().Error == nil)
	assert.Equal(t, resp.ConfigFilePath, "/home/projects/tsconfig.json")

	// Wait for the "end" progress notification before reading.
	select {
	case <-endReceived:
		// Got it.
	case <-t.Context().Done():
		t.Fatal("timed out waiting for progress end notification")
	}

	mu.Lock()
	notifications := make([]*lsproto.ProgressParams, len(progressNotifications))
	copy(notifications, progressNotifications)
	mu.Unlock()

	assert.Assert(t, len(notifications) >= 2, "expected at least begin+end progress notifications, got %d", len(notifications))

	// First notification should be a "begin".
	assert.Assert(t, notifications[0].Value.Begin != nil, "expected first progress notification to be 'begin'")
	assert.Equal(t, notifications[0].Value.Begin.Title, "Loading")

	// Last notification should be an "end".
	last := notifications[len(notifications)-1]
	assert.Assert(t, last.Value.End != nil, "expected last progress notification to be 'end'")

	// All notifications should share the same token.
	firstToken := tokenString(notifications[0].Token)
	assert.Assert(t, firstToken != "", "expected non-empty progress token")
	for i, n := range notifications {
		assert.Equal(t, tokenString(n.Token), firstToken, "notification %d has different token", i)
	}
}

func tokenString(t lsproto.IntegerOrString) string {
	if t.String != nil {
		return *t.String
	}
	return ""
}
