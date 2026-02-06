package api

import (
	"context"
	"errors"
	"fmt"
	"io"
	"runtime/debug"
	"sync"
	"sync/atomic"

	"github.com/go-json-experiment/json/jsontext"
	"github.com/microsoft/typescript-go/internal/jsonrpc"
)

// AsyncConn manages bidirectional JSON-RPC communication with async request handling.
// Each incoming request is handled in its own goroutine, allowing concurrent processing.
// This is the standard implementation for LSP-style JSON-RPC protocols.
type AsyncConn struct {
	rwc      io.ReadWriteCloser
	protocol Protocol
	handler  Handler

	// For server→client requests
	seq       atomic.Int64
	pending   map[jsonrpc.ID]chan *Message
	pendingMu sync.Mutex
	writeMu   sync.Mutex
}

// NewAsyncConn creates a new async connection with the given transport and handler.
// It uses JSONRPCProtocol (LSP-style Content-Length framing) by default.
func NewAsyncConn(rwc io.ReadWriteCloser, handler Handler) *AsyncConn {
	return NewAsyncConnWithProtocol(rwc, NewJSONRPCProtocol(rwc), handler)
}

// NewAsyncConnWithProtocol creates a new async connection with a custom protocol.
func NewAsyncConnWithProtocol(rwc io.ReadWriteCloser, protocol Protocol, handler Handler) *AsyncConn {
	return &AsyncConn{
		rwc:      rwc,
		protocol: protocol,
		handler:  handler,
		pending:  make(map[jsonrpc.ID]chan *Message),
	}
}

// Run starts processing messages on the connection.
// It blocks until the context is cancelled or an error occurs.
func (c *AsyncConn) Run(ctx context.Context) error {
	for {
		if ctx.Err() != nil {
			return ctx.Err()
		}

		msg, err := c.protocol.ReadMessage()
		if err != nil {
			if errors.Is(err, io.EOF) {
				return nil
			}
			return err
		}

		if msg.IsResponse() {
			c.handleResponse(msg)
		} else if msg.IsRequest() {
			go c.handleRequest(ctx, msg)
		} else if msg.IsNotification() {
			go c.handleNotification(ctx, msg)
		}
	}
}

// handleResponse matches a response to a pending request.
func (c *AsyncConn) handleResponse(msg *Message) {
	c.pendingMu.Lock()
	ch, ok := c.pending[*msg.ID]
	if ok {
		delete(c.pending, *msg.ID)
	}
	c.pendingMu.Unlock()

	if ok {
		ch <- msg
		close(ch)
	}
}

// handleRequest processes an incoming request.
func (c *AsyncConn) handleRequest(ctx context.Context, msg *Message) {
	var result any
	var err error

	// Recover from panics and convert to error response with stack trace
	defer func() {
		if r := recover(); r != nil {
			stack := string(debug.Stack())
			err = fmt.Errorf("panic: %v\n%s", r, stack)

			c.writeMu.Lock()
			writeErr := c.protocol.WriteError(msg.ID, &jsonrpc.ResponseError{
				Code:    jsonrpc.CodeInternalError,
				Message: err.Error(),
			})
			c.writeMu.Unlock()

			if writeErr != nil {
				panic(fmt.Sprintf("api: failed to write panic error response: %v (original panic: %v)", writeErr, r))
			}
		}
	}()

	result, err = c.handler.HandleRequest(ctx, msg.Method, msg.Params)

	c.writeMu.Lock()
	defer c.writeMu.Unlock()

	var writeErr error
	if err != nil {
		writeErr = c.protocol.WriteError(msg.ID, &jsonrpc.ResponseError{
			Code:    jsonrpc.CodeInternalError,
			Message: err.Error(),
		})
	} else {
		writeErr = c.protocol.WriteResponse(msg.ID, result)
	}

	if writeErr != nil {
		panic(fmt.Sprintf("api: failed to write response: %v", writeErr))
	}
}

// handleNotification processes an incoming notification.
func (c *AsyncConn) handleNotification(ctx context.Context, msg *Message) {
	_ = c.handler.HandleNotification(ctx, msg.Method, msg.Params)
}

// Call sends a request to the client and waits for a response.
func (c *AsyncConn) Call(ctx context.Context, method string, params any) (jsontext.Value, error) {
	// Create unique request ID
	id := jsonrpc.NewIDString(fmt.Sprintf("api%d", c.seq.Add(1)))

	// Register response channel BEFORE sending request to avoid race
	responseChan := make(chan *Message, 1)
	c.pendingMu.Lock()
	c.pending[*id] = responseChan
	c.pendingMu.Unlock()

	defer func() {
		c.pendingMu.Lock()
		defer c.pendingMu.Unlock()
		if ch, ok := c.pending[*id]; ok {
			close(ch)
			delete(c.pending, *id)
		}
	}()

	// Send the request
	c.writeMu.Lock()
	err := c.protocol.WriteRequest(id, method, params)
	c.writeMu.Unlock()

	if err != nil {
		return nil, err
	}

	select {
	case <-ctx.Done():
		return nil, ctx.Err()
	case resp := <-responseChan:
		if resp.Error != nil {
			return nil, fmt.Errorf("api: remote error [%d]: %s", resp.Error.Code, resp.Error.Message)
		}
		return resp.Result, nil
	}
}

// Notify sends a notification to the client (no response expected).
func (c *AsyncConn) Notify(ctx context.Context, method string, params any) error {
	c.writeMu.Lock()
	defer c.writeMu.Unlock()
	return c.protocol.WriteNotification(method, params)
}
