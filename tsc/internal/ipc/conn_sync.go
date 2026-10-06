package ipc

import (
	"context"
	"errors"
	"fmt"
	"io"
	"runtime/debug"
	"sync"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/jsonrpc"
)

// SyncConn manages bidirectional communication with synchronous request handling.
// A single pump owns the protocol and completes nested exchanges in stack order.
type SyncConn struct {
	rwc      io.ReadWriteCloser
	protocol Protocol
	handler  Handler

	// timing, when non-nil, accumulates the wall-clock time spent handling each
	// request. Clients retrieve the collected data via a getServerTiming request.
	timing *timingCollector

	// Run or a standalone Call/Notify takes ownership of the pump. While a handler
	// runs, the pump accepts operations from other goroutines; while a callback
	// runs, only nested client requests can admit further operations.
	owner      chan struct{}
	operations chan syncOperation
	handlers   sync.WaitGroup
	closed     chan struct{}
	closeOnce  sync.Once
	terminal   error
}

type syncOperation struct {
	ctx          context.Context
	method       string
	params       any
	notification bool
	result       chan syncCallResult
}

type syncCallResult struct {
	value json.Value
	err   error
}

type syncHandlerResult struct {
	value      any
	err        error
	panicValue any
}

// NewSyncConn creates a new sync connection with the given transport and handler.
func NewSyncConn(rwc io.ReadWriteCloser, protocol Protocol, handler Handler) *SyncConn {
	c := &SyncConn{
		rwc:        rwc,
		protocol:   protocol,
		handler:    handler,
		owner:      make(chan struct{}, 1),
		operations: make(chan syncOperation),
		closed:     make(chan struct{}),
	}
	c.owner <- struct{}{}
	return c
}

// SetCollectTiming enables or disables per-request server processing-time
// measurement. When enabled, the connection accumulates timing that clients can
// retrieve via a getServerTiming request.
func (c *SyncConn) SetCollectTiming(enabled bool) {
	if enabled {
		c.timing = newTimingCollector()
	} else {
		c.timing = nil
	}
}

// Run starts processing messages on the connection.
// It blocks until the context is cancelled or an error occurs.
func (c *SyncConn) Run(ctx context.Context) (retErr error) {
	select {
	case <-ctx.Done():
		return ctx.Err()
	case <-c.closed:
		return c.terminal
	case <-c.owner:
		ctx, release, err := c.ownPump(ctx)
		defer release()
		defer func() { c.close(retErr) }()
		if err != nil {
			return err
		}
		return c.run(ctx)
	}
}

func (c *SyncConn) run(ctx context.Context) error {
	for {
		if ctx.Err() != nil {
			return ctx.Err()
		}

		msg, err := c.protocol.ReadMessage()
		if err != nil {
			if ctx.Err() != nil {
				return ctx.Err()
			}
			if errors.Is(err, io.EOF) {
				return nil
			}
			return err
		}

		if msg.IsRequest() {
			if err := c.handleRequest(ctx, msg); err != nil {
				return err
			}
		} else if msg.IsNotification() {
			if err := c.handleNotification(ctx, msg); err != nil {
				return err
			}
		} else {
			// Responses are read by the pump's active callback exchange.
			return errors.New("ipc: unexpected response message in sync connection")
		}
	}
}

// handleRequest processes an incoming request.
func (c *SyncConn) handleRequest(ctx context.Context, msg *Message) (retErr error) {
	// Intercept the meta-requests for collected server timing before dispatching
	// to the handler, so they are answered directly and not themselves recorded.
	switch msg.Method {
	case string(MethodGetServerTiming):
		writeErr := c.protocol.WriteResponse(msg.ID, serverTimingSnapshot(c.timing))
		if writeErr != nil {
			return fmt.Errorf("ipc: failed to write server timing response: %w", writeErr)
		}
		return nil
	case string(MethodResetServerTiming):
		if c.timing != nil {
			c.timing.reset()
		}
		writeErr := c.protocol.WriteResponse(msg.ID, nil)
		if writeErr != nil {
			return fmt.Errorf("ipc: failed to write reset server timing response: %w", writeErr)
		}
		return nil
	}

	// Response writes can panic as well as handlers.
	defer func() {
		if r := recover(); r != nil {
			stack := string(debug.Stack())
			err := fmt.Errorf("panic: %v\n%s", r, stack)

			writeErr := c.protocol.WriteError(msg.ID, &jsonrpc.ResponseError{
				Code:    jsonrpc.CodeInternalError,
				Message: err.Error(),
			})
			if writeErr != nil {
				retErr = fmt.Errorf("ipc: failed to write panic error response: %w (original panic: %v)", writeErr, r)
			}
		}
	}()

	result, err := c.waitForHandler(ctx, msg)
	if err != nil {
		return err
	}

	var writeErr error
	if result.err != nil {
		writeErr = c.protocol.WriteError(msg.ID, &jsonrpc.ResponseError{
			Code:    jsonrpc.CodeInternalError,
			Message: result.err.Error(),
		})
	} else {
		writeErr = c.protocol.WriteResponse(msg.ID, result.value)
	}

	if writeErr != nil {
		if result.panicValue != nil {
			return fmt.Errorf("ipc: failed to write panic error response: %w (original panic: %v)", writeErr, result.panicValue)
		}
		return fmt.Errorf("ipc: failed to write response: %w", writeErr)
	}
	return nil
}

// handleNotification processes an incoming notification.
func (c *SyncConn) handleNotification(ctx context.Context, msg *Message) error {
	result, err := c.waitForHandler(ctx, msg)
	if err != nil {
		return err
	}
	if result.panicValue != nil {
		panic(result.panicValue)
	}
	return nil
}

func (c *SyncConn) waitForHandler(ctx context.Context, msg *Message) (syncHandlerResult, error) {
	results := c.startHandler(ctx, msg)
	for {
		select {
		case <-ctx.Done():
			return syncHandlerResult{}, ctx.Err()
		case result := <-results:
			return result, nil
		case operation := <-c.operations:
			if err := c.serveOperation(ctx, operation); err != nil {
				return syncHandlerResult{}, err
			}
		}
	}
}

func (c *SyncConn) startHandler(ctx context.Context, msg *Message) <-chan syncHandlerResult {
	results := make(chan syncHandlerResult, 1)
	c.handlers.Go(func() {
		var result syncHandlerResult
		defer func() {
			if r := recover(); r != nil {
				result.panicValue = r
				result.err = fmt.Errorf("panic: %v\n%s", r, debug.Stack())
			}
			results <- result
		}()
		if msg.IsNotification() {
			result.err = c.handler.HandleNotification(ctx, msg.Method, msg.Params)
			return
		}
		start := time.Time{}
		if c.timing != nil {
			start = time.Now()
		}
		result.value, result.err = c.handler.HandleRequest(ctx, msg.Method, msg.Params)
		if c.timing != nil {
			c.timing.record(msg.Method, time.Since(start))
		}
	})
	return results
}

// Call sends a request to the client and waits for a response.
// This method is safe to call from multiple goroutines - calls are serialized.
func (c *SyncConn) Call(ctx context.Context, method string, params any) (json.Value, error) {
	result := c.submit(syncOperation{ctx: ctx, method: method, params: params})
	return result.value, result.err
}

// Notify sends a notification to the client (no response expected).
func (c *SyncConn) Notify(ctx context.Context, method string, params any) error {
	return c.submit(syncOperation{ctx: ctx, method: method, params: params, notification: true}).err
}

func (c *SyncConn) submit(operation syncOperation) syncCallResult {
	if err := operation.ctx.Err(); err != nil {
		return syncCallResult{err: err}
	}
	operation.result = make(chan syncCallResult, 1)

	select {
	case <-operation.ctx.Done():
		return syncCallResult{err: operation.ctx.Err()}
	case <-c.closed:
		return syncCallResult{err: c.terminal}
	case c.operations <- operation:
		select {
		case result := <-operation.result:
			return result
		case <-operation.ctx.Done():
			// The pump still drains an accepted exchange before admitting others.
			return syncCallResult{err: operation.ctx.Err()}
		case <-c.closed:
			return syncCallResult{err: c.terminal}
		}
	case <-c.owner:
		ctx, release, err := c.ownPump(operation.ctx)
		defer release()
		if err != nil {
			return syncCallResult{err: err}
		}
		if err := c.serveOperation(ctx, operation); err != nil {
			c.close(err)
		}
		return <-operation.result
	}
}

func (c *SyncConn) serveOperation(ctx context.Context, operation syncOperation) (retErr error) {
	var result syncCallResult
	defer func() {
		if r := recover(); r != nil {
			retErr = fmt.Errorf("panic: %v\n%s", r, debug.Stack())
			result.err = retErr
		}
		operation.result <- result
	}()
	if err := operation.ctx.Err(); err != nil {
		result.err = err
		return nil
	}
	if operation.notification {
		err := c.protocol.WriteNotification(operation.method, operation.params)
		result.err = err
		return err
	}
	result, retErr = c.serveCall(ctx, operation)
	return retErr
}

func (c *SyncConn) serveCall(ctx context.Context, operation syncOperation) (syncCallResult, error) {
	id := jsonrpc.NewIDString(operation.method)
	if err := c.protocol.WriteRequest(id, operation.method, operation.params); err != nil {
		return syncCallResult{err: err}, err
	}
	for {
		msg, err := c.protocol.ReadMessage()
		if err != nil {
			if ctx.Err() != nil {
				err = ctx.Err()
			}
			return syncCallResult{err: err}, err
		}

		if msg.IsResponse() && msg.ID != nil && msg.ID.String() == operation.method {
			if msg.Error != nil {
				return syncCallResult{err: fmt.Errorf("ipc: remote error [%d]: %s", msg.Error.Code, msg.Error.Message)}, nil
			}
			return syncCallResult{value: msg.Result}, nil
		}
		if msg.IsRequest() {
			if err := c.handleRequest(ctx, msg); err != nil {
				return syncCallResult{err: err}, err
			}
			continue
		}
		if msg.IsNotification() {
			if err := c.handleNotification(ctx, msg); err != nil {
				return syncCallResult{err: err}, err
			}
			continue
		}
		err = fmt.Errorf("ipc: unexpected message while waiting for %q response", operation.method)
		return syncCallResult{err: err}, err
	}
}

func (c *SyncConn) close(err error) {
	c.closeOnce.Do(func() {
		c.terminal = ErrConnClosed
		if err != nil {
			c.terminal = errors.Join(c.terminal, err)
		}
		close(c.closed)
		if c.rwc != nil {
			_ = c.rwc.Close()
		}
	})
}

// ownPump is called after taking the ownership token.
func (c *SyncConn) ownPump(ctx context.Context) (context.Context, func(), error) {
	ctx, cancel := context.WithCancel(ctx)
	release := func() {
		cancel()
		c.handlers.Wait()
		c.owner <- struct{}{}
	}
	select {
	case <-c.closed:
		return ctx, release, c.terminal
	default:
		if err := ctx.Err(); err != nil {
			return ctx, release, err
		}
	}
	stop := context.AfterFunc(ctx, func() {
		c.close(ctx.Err())
	})
	return ctx, func() {
		stop()
		release()
	}, nil
}
