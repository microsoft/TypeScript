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

// LSPReader reads LSP messages from a channel.
type LSPReader struct {
	c <-chan *lsproto.Message
}

func (r *LSPReader) Read() (*lsproto.Message, error) {
	msg, ok := <-r.c
	if !ok {
		return nil, io.EOF
	}
	return msg, nil
}

// LSPWriter writes LSP messages to a channel.
type LSPWriter struct {
	c chan<- *lsproto.Message
}

func (w *LSPWriter) Write(msg *lsproto.Message) error {
	w.c <- msg
	return nil
}

func (w *LSPWriter) Close() {
	close(w.c)
}

var (
	_ lsp.Reader = (*LSPReader)(nil)
	_ lsp.Writer = (*LSPWriter)(nil)
)

// newLSPPipe creates a paired LSPReader and LSPWriter connected by a buffered channel.
func newLSPPipe() (*LSPReader, *LSPWriter) {
	c := make(chan *lsproto.Message, 100)
	return &LSPReader{c: c}, &LSPWriter{c: c}
}

// ServerRequestHandler handles server-initiated requests and returns the response to send back.
type ServerRequestHandler func(ctx context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage

// LSPClient provides infrastructure for communicating with an LSP server in tests.
type LSPClient struct {
	Server       *lsp.Server
	inputWriter  *LSPWriter
	outputReader *LSPReader
	id           int32
	ctx          context.Context

	// OnServerRequest handles server-initiated requests (e.g., workspace/configuration).
	// If nil, all server requests receive a MethodNotFound error.
	onServerRequest ServerRequestHandler

	// Async message handling
	pendingRequests   map[jsonrpc.ID]chan *lsproto.ResponseMessage
	pendingRequestsMu sync.Mutex
}

// NewLSPClient creates an LSPClient wrapping the given server and pipes.
func NewLSPClient(t *testing.T, serverOpts lsp.ServerOptions, onServerRequest ServerRequestHandler) (*LSPClient, func() error) {
	inputReader, inputWriter := newLSPPipe()
	outputReader, outputWriter := newLSPPipe()
	serverOpts.In = inputReader
	serverOpts.Out = outputWriter

	server := lsp.NewServer(&serverOpts)

	ctx, cancel := context.WithCancel(t.Context())
	g, ctx := errgroup.WithContext(ctx)
	client := &LSPClient{
		Server:          server,
		inputWriter:     inputWriter,
		outputReader:    outputReader,
		pendingRequests: make(map[jsonrpc.ID]chan *lsproto.ResponseMessage),
		onServerRequest: onServerRequest,
		ctx:             ctx,
	}

	// Start server goroutine
	g.Go(func() error {
		defer outputWriter.Close()
		return server.Run(ctx)
	})

	// Start async message router
	g.Go(func() error {
		return client.MessageRouter(ctx)
	})

	return client, func() error {
		cancel()
		inputWriter.Close()
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
func (c *LSPClient) MessageRouter(ctx context.Context) error {
	for {
		if ctx.Err() != nil {
			return nil
		}

		msg, err := c.outputReader.Read()
		if err != nil {
			if errors.Is(err, io.EOF) || ctx.Err() != nil {
				return nil
			}
			return fmt.Errorf("failed to read message: %w", err)
		}

		// Validate message can be marshaled
		if err := json.MarshalWrite(io.Discard, msg); err != nil {
			if ctx.Err() != nil {
				return nil
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
			// Server-initiated notifications (e.g., publishDiagnostics) are currently ignored
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

	if err := c.inputWriter.Write(response.Message()); err != nil {
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
	if err := c.inputWriter.Write(msg); err != nil {
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
	result, ok := resp.Result.(Resp)
	return resp.Message(), result, ok
}

// This is an untyped version of SendRequest. Prefer to use SendRequest when possible.
func (c *LSPClient) SendRequestWorker(t *testing.T, req *lsproto.RequestMessage, reqID *jsonrpc.ID) (*lsproto.ResponseMessage, bool) {
	// Create response channel and register it
	responseChan := make(chan *lsproto.ResponseMessage, 1)
	c.pendingRequestsMu.Lock()
	c.pendingRequests[*reqID] = responseChan
	c.pendingRequestsMu.Unlock()

	// Send the request
	c.WriteMsg(t, req.Message())

	// Wait for response with context
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
