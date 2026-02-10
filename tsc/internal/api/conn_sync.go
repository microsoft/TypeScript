package api

import (
	"context"
	"errors"
	"fmt"
	"io"
	"runtime/debug"
	"sync"

	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/jsonrpc"
)

// SyncConn manages bidirectional communication with synchronous request handling.
// Requests are handled one at a time inline, and outgoing calls are serialized.
type SyncConn struct {
	rwc      io.ReadWriteCloser
	protocol Protocol
	handler  Handler

	// mu serializes all protocol operations (reads and writes).
	// This ensures that concurrent calls from handler goroutines (e.g., project code
	// spawning goroutines that invoke filesystem callbacks) don't corrupt the stream.
	mu sync.Mutex
}

// NewSyncConn creates a new sync connection with the given transport and handler.
func NewSyncConn(rwc io.ReadWriteCloser, protocol Protocol, handler Handler) *SyncConn {
	return &SyncConn{
		rwc:      rwc,
		protocol: protocol,
		handler:  handler,
	}
}

// Run starts processing messages on the connection.
// It blocks until the context is cancelled or an error occurs.
func (c *SyncConn) Run(ctx context.Context) error {
	for {
		if ctx.Err() != nil {
			return ctx.Err()
		}

		c.mu.Lock()
		msg, err := c.protocol.ReadMessage()
		c.mu.Unlock()

		if err != nil {
			if errors.Is(err, io.EOF) {
				return nil
			}
			return err
		}

		if msg.IsRequest() {
			c.handleRequest(ctx, msg)
		} else if msg.IsNotification() {
			c.handleNotification(ctx, msg)
		} else {
			// Responses are not expected in the main loop - they are read inline by Call().
			return errors.New("api: unexpected response message in sync connection")
		}
	}
}

// handleRequest processes an incoming request.
func (c *SyncConn) handleRequest(ctx context.Context, msg *Message) {
	var result any
	var err error

	// Recover from panics and convert to error response with stack trace
	defer func() {
		if r := recover(); r != nil {
			stack := string(debug.Stack())
			err = fmt.Errorf("panic: %v\n%s", r, stack)

			c.mu.Lock()
			writeErr := c.protocol.WriteError(msg.ID, &jsonrpc.ResponseError{
				Code:    jsonrpc.CodeInternalError,
				Message: err.Error(),
			})
			c.mu.Unlock()

			if writeErr != nil {
				panic(fmt.Sprintf("api: failed to write panic error response: %v (original panic: %v)", writeErr, r))
			}
		}
	}()

	result, err = c.handler.HandleRequest(ctx, msg.Method, msg.Params)

	c.mu.Lock()
	defer c.mu.Unlock()

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
func (c *SyncConn) handleNotification(ctx context.Context, msg *Message) {
	_ = c.handler.HandleNotification(ctx, msg.Method, msg.Params)
}

// Call sends a request to the client and waits for a response.
// This method is safe to call from multiple goroutines - calls are serialized.
func (c *SyncConn) Call(ctx context.Context, method string, params any) (json.Value, error) {
	// Serialize all Call operations. This is critical because:
	// 1. The msgpack protocol uses method names as response IDs
	// 2. The handler code (project internals) may spawn goroutines that call
	//    filesystem callbacks concurrently
	// 3. We need to ensure write/read pairs are atomic
	c.mu.Lock()
	defer c.mu.Unlock()

	id := jsonrpc.NewIDString(method)

	if err := c.protocol.WriteRequest(id, method, params); err != nil {
		return nil, err
	}

	if ctx.Err() != nil {
		return nil, ctx.Err()
	}

	// Read the response inline.
	msg, err := c.protocol.ReadMessage()
	if err != nil {
		return nil, err
	}

	if msg.IsResponse() && msg.ID != nil && msg.ID.String() == method {
		if msg.Error != nil {
			return nil, fmt.Errorf("api: remote error [%d]: %s", msg.Error.Code, msg.Error.Message)
		}
		return msg.Result, nil
	}

	// Unexpected message while waiting for response
	return nil, fmt.Errorf("api: unexpected message while waiting for %q response", method)
}

// Notify sends a notification to the client (no response expected).
func (c *SyncConn) Notify(ctx context.Context, method string, params any) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.protocol.WriteNotification(method, params)
}
