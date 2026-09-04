package ipc

import (
	"context"
	"errors"
	"fmt"
	"io"
	"runtime/debug"
	"sync"
	"sync/atomic"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/jsonrpc"
)

// AsyncConn manages bidirectional JSON-RPC communication with async request handling.
// Each incoming request is handled in its own goroutine, allowing concurrent processing.
// This is the standard implementation for LSP-style JSON-RPC protocols.
type AsyncConn struct {
	rwc      io.ReadWriteCloser
	protocol Protocol
	handler  Handler

	// timing, when non-nil, accumulates the wall-clock time spent handling each
	// request. Clients retrieve the collected data via a getServerTiming request.
	timing *timingCollector

	// For server→client requests
	seq       atomic.Int64
	pending   map[jsonrpc.ID]chan *Message
	pendingMu sync.Mutex
	terminal  error
	writeMu   sync.Mutex
	handlers  sync.WaitGroup
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

// SetCollectTiming enables or disables per-request server processing-time
// measurement. When enabled, the connection accumulates timing that clients can
// retrieve via a getServerTiming request.
func (c *AsyncConn) SetCollectTiming(enabled bool) {
	if enabled {
		c.timing = newTimingCollector()
	} else {
		c.timing = nil
	}
}

// Run starts processing messages on the connection.
// It blocks until the context is cancelled or an error occurs.
func (c *AsyncConn) Run(ctx context.Context) (err error) {
	handlerCtx, cancelHandlers := context.WithCancel(ctx)
	defer func() {
		c.closePendingCalls(err)
		cancelHandlers()
		c.handlers.Wait()
	}()
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
			c.handlers.Go(func() {
				c.handleRequest(handlerCtx, msg)
			})
		} else if msg.IsNotification() {
			c.handlers.Go(func() {
				c.handleNotification(handlerCtx, msg)
			})
		}
	}
}

// closePendingCalls records that the read loop has exited and unblocks requests waiting for a response.
func (c *AsyncConn) closePendingCalls(runErr error) {
	c.pendingMu.Lock()
	defer c.pendingMu.Unlock()
	if c.terminal == nil {
		c.terminal = ErrConnClosed
		if runErr != nil {
			c.terminal = errors.Join(c.terminal, runErr)
		}
	}
	for id, ch := range c.pending {
		close(ch)
		delete(c.pending, id)
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
	// Intercept the meta-requests for collected server timing before dispatching
	// to the handler, so they are answered directly and not themselves recorded.
	switch msg.Method {
	case string(MethodGetServerTiming):
		c.writeMu.Lock()
		writeErr := c.protocol.WriteResponse(msg.ID, serverTimingSnapshot(c.timing))
		c.writeMu.Unlock()
		if writeErr != nil {
			panic(fmt.Sprintf("ipc: failed to write server timing response: %v", writeErr))
		}
		return
	case string(MethodResetServerTiming):
		if c.timing != nil {
			c.timing.reset()
		}
		c.writeMu.Lock()
		writeErr := c.protocol.WriteResponse(msg.ID, nil)
		c.writeMu.Unlock()
		if writeErr != nil {
			panic(fmt.Sprintf("ipc: failed to write reset server timing response: %v", writeErr))
		}
		return
	}

	var result any
	var err error

	start := time.Time{}
	if c.timing != nil {
		start = time.Now()
	}

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
				panic(fmt.Sprintf("ipc: failed to write panic error response: %v (original panic: %v)", writeErr, r))
			}
		}
	}()

	result, err = c.handler.HandleRequest(ctx, msg.Method, msg.Params)

	if c.timing != nil {
		c.timing.record(msg.Method, time.Since(start))
	}

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
		panic(fmt.Sprintf("ipc: failed to write response: %v", writeErr))
	}
}

// handleNotification processes an incoming notification.
func (c *AsyncConn) handleNotification(ctx context.Context, msg *Message) {
	_ = c.handler.HandleNotification(ctx, msg.Method, msg.Params)
}

// Call sends a request to the client and waits for a response.
func (c *AsyncConn) Call(ctx context.Context, method string, params any) (json.Value, error) {
	// Create unique request ID
	id := jsonrpc.NewIDString(fmt.Sprintf("api%d", c.seq.Add(1)))

	// Register response channel BEFORE sending request to avoid race
	responseChan := make(chan *Message, 1)
	c.pendingMu.Lock()
	if c.terminal != nil {
		err := c.terminal
		c.pendingMu.Unlock()
		return nil, err
	}
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
	case resp, ok := <-responseChan:
		if !ok {
			c.pendingMu.Lock()
			err := c.terminal
			c.pendingMu.Unlock()
			return nil, err
		}
		if resp.Error != nil {
			return nil, fmt.Errorf("ipc: remote error [%d]: %s", resp.Error.Code, resp.Error.Message)
		}
		return resp.Result, nil
	}
}

// Notify sends a notification to the client (no response expected).
func (c *AsyncConn) Notify(ctx context.Context, method string, params any) error {
	c.pendingMu.Lock()
	if c.terminal != nil {
		err := c.terminal
		c.pendingMu.Unlock()
		return err
	}
	c.pendingMu.Unlock()
	c.writeMu.Lock()
	defer c.writeMu.Unlock()
	return c.protocol.WriteNotification(method, params)
}
