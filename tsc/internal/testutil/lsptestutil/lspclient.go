package lsptestutil

import (
	"context"
	"errors"
	"fmt"
	"io"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/jsonrpc"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"golang.org/x/sync/errgroup"
	"gotest.tools/v3/assert"
)

// clientTransport wires a test client to a server using real LSP
// "Content-Length"-framed JSON streamed over byte pipes, exactly like
// communication with a real editor. This exercises the full marshal/unmarshal
// round-trip of every protocol data structure. The two directions are:
//
//	client --(clientOut)--> serverIn --> server
//	server --(serverOut)--> clientIn --> client
type clientTransport struct {
	serverIn       lsp.Reader // server reads client->server messages
	serverOut      lsp.Writer // server writes server->client messages
	clientIn       lsp.Reader // client reads server->client messages
	clientOut      lsp.Writer // client writes client->server messages
	closeClientOut func()     // closes the client->server direction
	closeServerOut func()     // closes the server->client direction
}

func newClientTransport() clientTransport {
	clientToServerReader, clientToServerWriter := io.Pipe()
	serverToClientReader, serverToClientWriter := io.Pipe()
	return clientTransport{
		serverIn:       lsp.ToReader(clientToServerReader),
		serverOut:      lsp.ToWriter(serverToClientWriter),
		clientIn:       lsp.ToReader(serverToClientReader),
		clientOut:      lsp.ToWriter(clientToServerWriter),
		closeClientOut: func() { _ = clientToServerWriter.Close() },
		closeServerOut: func() { _ = serverToClientWriter.Close() },
	}
}

// ServerRequestHandler handles server-initiated requests and returns the response to send back.
type ServerRequestHandler func(ctx context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage

// ServerNotificationHandler handles server-initiated notifications (e.g., $/progress).
type ServerNotificationHandler func(ctx context.Context, req *lsproto.RequestMessage)

// LSPClient provides infrastructure for communicating with an LSP server in tests.
type LSPClient struct {
	Server       *lsp.Server
	inputWriter  lsp.Writer
	outputReader lsp.Reader
	id           int32
	ctx          context.Context

	// inputWriterMu serializes writes to the server. The test goroutine (sending
	// requests/notifications) and the MessageRouter goroutine (sending responses
	// to server-initiated requests) both write to the same stream; a single
	// message is written as multiple underlying writes (header, body, flush), so
	// concurrent writers must not interleave.
	inputWriterMu sync.Mutex

	// OnServerRequest handles server-initiated requests (e.g., workspace/configuration).
	// If nil, all server requests receive a MethodNotFound error.
	onServerRequest ServerRequestHandler

	// OnServerNotification handles server-initiated notifications (e.g., $/progress).
	// If nil, notifications are ignored.
	OnServerNotification ServerNotificationHandler

	// Async message handling
	pendingRequests   map[jsonrpc.ID]chan *lsproto.ResponseMessage
	pendingRequestsMu sync.Mutex
}

// writeToServer writes a message to the server, serializing concurrent writers.
func (c *LSPClient) writeToServer(msg *lsproto.Message) error {
	c.inputWriterMu.Lock()
	defer c.inputWriterMu.Unlock()
	return c.inputWriter.Write(msg)
}

// NewLSPClient creates an LSPClient wrapping the given server and pipes.
func NewLSPClient(t *testing.T, serverOpts lsp.ServerOptions, onServerRequest ServerRequestHandler) (*LSPClient, func() error) {
	transport := newClientTransport()
	serverOpts.In = transport.serverIn
	serverOpts.Out = transport.serverOut

	server := lsp.NewServer(&serverOpts)

	ctx, cancel := context.WithCancel(t.Context())
	g, ctx := errgroup.WithContext(ctx)
	client := &LSPClient{
		Server:          server,
		inputWriter:     transport.clientOut,
		outputReader:    transport.clientIn,
		pendingRequests: make(map[jsonrpc.ID]chan *lsproto.ResponseMessage),
		onServerRequest: onServerRequest,
		ctx:             ctx,
	}

	// Start server goroutine
	g.Go(func() error {
		defer transport.closeServerOut()
		return server.Run(ctx)
	})

	// Start async message router
	g.Go(func() error {
		return client.MessageRouter(ctx)
	})

	return client, func() error {
		cancel()
		transport.closeClientOut()
		if err := g.Wait(); err != nil && !errors.Is(err, context.Canceled) {
			return err
		}
		return nil
	}
}

// NextID returns the next request ID.
func (c *LSPClient) NextID() int32 {
	id := c.id
	c.id++
	return id
}

// MessageRouter runs in a goroutine and routes incoming messages from the server.
// It handles responses to client requests and server-initiated requests.
// It continues draining the output channel until it is closed (EOF), even after
// context cancellation, to prevent the server's writeLoop from blocking on a send.
func (c *LSPClient) MessageRouter(ctx context.Context) error {
	for {
		msg, err := c.outputReader.Read()
		if err != nil {
			if errors.Is(err, io.EOF) {
				return nil
			}
			if ctx.Err() != nil {
				return nil
			}
			return fmt.Errorf("failed to read message: %w", err)
		}

		// After context cancellation, keep draining but don't process messages.
		if ctx.Err() != nil {
			continue
		}

		// Validate message can be marshaled
		if err := json.MarshalWrite(io.Discard, msg); err != nil {
			if ctx.Err() != nil {
				continue
			}

			return fmt.Errorf("failed to encode message as JSON: %w", err)
		}

		switch msg.Kind {
		case jsonrpc.MessageKindResponse:
			c.handleResponse(ctx, msg.AsResponse())
		case jsonrpc.MessageKindRequest:
			if err := c.handleServerRequest(ctx, msg.AsRequest()); err != nil {
				return err
			}
		case jsonrpc.MessageKindNotification:
			if c.OnServerNotification != nil {
				c.OnServerNotification(ctx, msg.AsRequest())
			}
		}
	}
}

// handleResponse routes a response message to the waiting request goroutine.
func (c *LSPClient) handleResponse(ctx context.Context, resp *lsproto.ResponseMessage) {
	if resp.ID == nil {
		return
	}

	c.pendingRequestsMu.Lock()
	respChan, ok := c.pendingRequests[*resp.ID]
	if ok {
		delete(c.pendingRequests, *resp.ID)
	}
	c.pendingRequestsMu.Unlock()

	if ok {
		select {
		case respChan <- resp:
			// sent response
		case <-ctx.Done():
			// context cancelled
		}
	}
}

// handleServerRequest handles requests initiated by the server (e.g., workspace/configuration).
func (c *LSPClient) handleServerRequest(ctx context.Context, req *lsproto.RequestMessage) error {
	var response *lsproto.ResponseMessage

	if c.onServerRequest != nil {
		response = c.onServerRequest(ctx, req)
	}

	if response == nil {
		// Default: unknown server request
		response = &lsproto.ResponseMessage{
			ID:      req.ID,
			JSONRPC: req.JSONRPC,
			Error: &jsonrpc.ResponseError{
				Code:    int32(lsproto.ErrorCodeMethodNotFound),
				Message: fmt.Sprintf("Unknown method: %s", req.Method),
			},
		}
	}

	// Send response back to server
	if ctx.Err() != nil {
		return nil
	}

	if err := c.writeToServer(response.Message()); err != nil {
		if ctx.Err() != nil {
			return nil
		}
		return fmt.Errorf("failed to write server request response: %w", err)
	}
	return nil
}

// WriteMsg validates and sends a message to the server.
// This is an untyped low-level method; prefer SendRequest and SendNotification for typed interactions.
func (c *LSPClient) WriteMsg(t *testing.T, msg *lsproto.Message) {
	assert.NilError(t, json.MarshalWrite(io.Discard, msg), "failed to encode message as JSON")
	if err := c.writeToServer(msg); err != nil {
		t.Fatalf("failed to write message: %v", err)
	}
}

// SendRequest sends a typed request and waits for the response.
func SendRequest[Params, Resp any](t *testing.T, c *LSPClient, info lsproto.RequestInfo[Params, Resp], params Params) (*lsproto.Message, Resp, bool) {
	id := c.NextID()
	reqID := lsproto.NewID(lsproto.IntegerOrString{Integer: &id})
	req := info.NewRequestMessage(reqID, params)

	resp, ok := c.SendRequestWorker(t, req, reqID)
	if !ok {
		return nil, *new(Resp), false
	}
	// The result arrives as a raw json.Value; decode it into Resp.
	result, err := info.UnmarshalResult(resp.Result)
	return resp.Message(), result, err == nil
}

// SendRequestAsync sends a typed request and returns a waiter for its response.
func SendRequestAsync[Params, Resp any](t *testing.T, c *LSPClient, info lsproto.RequestInfo[Params, Resp], params Params) func() (*lsproto.Message, Resp, bool) {
	id := c.NextID()
	reqID := lsproto.NewID(lsproto.IntegerOrString{Integer: &id})
	req := info.NewRequestMessage(reqID, params)

	responseChan := c.startRequestWorker(t, req, reqID)
	return func() (*lsproto.Message, Resp, bool) {
		resp, ok := c.waitForResponse(t, reqID, responseChan)
		if !ok {
			return nil, *new(Resp), false
		}
		result, err := info.UnmarshalResult(resp.Result)
		return resp.Message(), result, err == nil
	}
}

// This is an untyped version of SendRequest. Prefer to use SendRequest when possible.
func (c *LSPClient) SendRequestWorker(t *testing.T, req *lsproto.RequestMessage, reqID *jsonrpc.ID) (*lsproto.ResponseMessage, bool) {
	responseChan := c.startRequestWorker(t, req, reqID)
	return c.waitForResponse(t, reqID, responseChan)
}

func (c *LSPClient) startRequestWorker(t *testing.T, req *lsproto.RequestMessage, reqID *jsonrpc.ID) chan *lsproto.ResponseMessage {
	responseChan := make(chan *lsproto.ResponseMessage, 1)
	c.pendingRequestsMu.Lock()
	c.pendingRequests[*reqID] = responseChan
	c.pendingRequestsMu.Unlock()

	c.WriteMsg(t, req.Message())
	return responseChan
}

func (c *LSPClient) waitForResponse(t *testing.T, reqID *jsonrpc.ID, responseChan <-chan *lsproto.ResponseMessage) (*lsproto.ResponseMessage, bool) {
	ctx := t.Context()
	var resp *lsproto.ResponseMessage
	select {
	case <-ctx.Done():
		c.pendingRequestsMu.Lock()
		delete(c.pendingRequests, *reqID)
		c.pendingRequestsMu.Unlock()
		t.Fatalf("Request cancelled: %v", ctx.Err())
		return nil, false
	case resp = <-responseChan:
		if resp == nil {
			return nil, false
		}
	}

	return resp, true
}

// SendNotification sends a typed notification.
func SendNotification[Params any](t *testing.T, c *LSPClient, info lsproto.NotificationInfo[Params], params Params) {
	notification := info.NewNotificationMessage(
		params,
	)
	c.WriteMsg(t, notification.Message())
}

func (c *LSPClient) SetCompilerOptionsForInferredProjects(options *core.CompilerOptions) {
	c.Server.SetCompilerOptionsForInferredProjects(c.ctx, options)
}
