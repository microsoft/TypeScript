package ipc_test

import (
	"context"
	"errors"
	"io"
	"net"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/jsonrpc"
	"gotest.tools/v3/assert"
)

type noOpHandler struct{}

func (noOpHandler) HandleRequest(context.Context, string, json.Value) (any, error) {
	return nil, nil
}

func (noOpHandler) HandleNotification(context.Context, string, json.Value) error {
	return nil
}

type queuedProtocol struct {
	messages    []*ipc.Message
	responseErr error
}

func (p *queuedProtocol) ReadMessage() (*ipc.Message, error) {
	if len(p.messages) == 0 {
		return nil, io.EOF
	}
	message := p.messages[0]
	p.messages = p.messages[1:]
	return message, nil
}

func (p *queuedProtocol) WriteRequest(*jsonrpc.ID, string, any) error {
	return nil
}

func (p *queuedProtocol) WriteNotification(string, any) error {
	return nil
}

func (p *queuedProtocol) WriteResponse(*jsonrpc.ID, any) error {
	return p.responseErr
}

func (p *queuedProtocol) WriteError(*jsonrpc.ID, *jsonrpc.ResponseError) error {
	return p.responseErr
}

type blockingHandler struct {
	started chan struct{}
	release chan struct{}
}

func (h *blockingHandler) HandleRequest(context.Context, string, json.Value) (any, error) {
	h.started <- struct{}{}
	<-h.release
	return nil, nil
}

func (h *blockingHandler) HandleNotification(context.Context, string, json.Value) error {
	h.started <- struct{}{}
	<-h.release
	return nil
}

type contextHandler struct{}

func (contextHandler) HandleRequest(ctx context.Context, _ string, _ json.Value) (any, error) {
	<-ctx.Done()
	return nil, ctx.Err()
}

func (contextHandler) HandleNotification(ctx context.Context, _ string, _ json.Value) error {
	<-ctx.Done()
	return ctx.Err()
}

func TestAsyncConnRunWaitsForHandlers(t *testing.T) {
	t.Parallel()

	id := jsonrpc.NewIDString("1")
	protocol := &queuedProtocol{messages: []*ipc.Message{
		{ID: id, Method: "request"},
		{Method: "notification"},
	}}
	handler := &blockingHandler{
		started: make(chan struct{}, 2),
		release: make(chan struct{}),
	}
	conn := ipc.NewAsyncConnWithProtocol(nil, protocol, handler)

	runDone := make(chan error, 1)
	go func() { runDone <- conn.Run(t.Context()) }()

	<-handler.started
	<-handler.started
	runReturned := false
	select {
	case <-runDone:
		runReturned = true
	default:
		runReturned = false
	}
	assert.Assert(t, !runReturned, "Run returned while handlers were active")

	close(handler.release)
	assert.NilError(t, <-runDone)
}

func TestAsyncConnRunCancelsHandlersOnEOF(t *testing.T) {
	t.Parallel()

	id := jsonrpc.NewIDString("1")
	protocol := &queuedProtocol{messages: []*ipc.Message{{ID: id, Method: "request"}}}
	conn := ipc.NewAsyncConnWithProtocol(nil, protocol, contextHandler{})

	runDone := make(chan error, 1)
	go func() { runDone <- conn.Run(t.Context()) }()

	select {
	case err := <-runDone:
		assert.NilError(t, err)
	case <-time.After(time.Second):
		t.Fatal("Run did not cancel active handlers after EOF")
	}
}

func TestAsyncConnResponseWriteFailureWithNilTransport(t *testing.T) {
	t.Parallel()

	responseErr := errors.New("response write failed")
	id := jsonrpc.NewIDString("1")
	protocol := &queuedProtocol{
		messages:    []*ipc.Message{{ID: id, Method: "request"}},
		responseErr: responseErr,
	}
	conn := ipc.NewAsyncConnWithProtocol(nil, protocol, noOpHandler{})

	err := conn.Run(t.Context())
	assert.Assert(t, errors.Is(err, responseErr), "expected response write error, got %v", err)
}

type closeSignal struct {
	closed chan struct{}
	once   sync.Once
}

func (*closeSignal) Read([]byte) (int, error) {
	return 0, io.EOF
}

func (*closeSignal) Write(p []byte) (int, error) {
	return len(p), nil
}

func (c *closeSignal) Close() error {
	c.once.Do(func() { close(c.closed) })
	return nil
}

type failingResponseProtocol struct {
	closed      <-chan struct{}
	requestRead bool
	responseErr error
}

func (p *failingResponseProtocol) ReadMessage() (*ipc.Message, error) {
	if !p.requestRead {
		p.requestRead = true
		return &ipc.Message{ID: jsonrpc.NewIDInt(1), Method: "transform"}, nil
	}
	<-p.closed
	return nil, io.ErrClosedPipe
}

func (*failingResponseProtocol) WriteRequest(*jsonrpc.ID, string, any) error {
	return nil
}

func (*failingResponseProtocol) WriteNotification(string, any) error {
	return nil
}

func (p *failingResponseProtocol) WriteResponse(*jsonrpc.ID, any) error {
	return p.responseErr
}

func (p *failingResponseProtocol) WriteError(*jsonrpc.ID, *jsonrpc.ResponseError) error {
	return p.responseErr
}

func TestAsyncConnCallReturnsWhenPeerCloses(t *testing.T) {
	t.Parallel()
	client, server := net.Pipe()
	conn := ipc.NewAsyncConn(client, noOpHandler{})
	runDone := make(chan error, 1)
	go func() { runDone <- conn.Run(t.Context()) }()

	callDone := make(chan error, 1)
	go func() {
		_, err := conn.Call(t.Context(), "transform", nil)
		callDone <- err
	}()

	buffer := make([]byte, 1024)
	_, err := server.Read(buffer)
	assert.NilError(t, err)
	assert.NilError(t, server.Close())
	assert.NilError(t, <-runDone)
	assert.Assert(t, errors.Is(<-callDone, ipc.ErrConnClosed))
	assert.NilError(t, client.Close())
}

func TestAsyncConnCallAfterReadLoopFailureReturnsImmediately(t *testing.T) {
	t.Parallel()
	client, server := net.Pipe()
	defer client.Close()
	defer server.Close()
	conn := ipc.NewAsyncConn(client, noOpHandler{})
	runDone := make(chan error, 1)
	go func() { runDone <- conn.Run(t.Context()) }()

	_, err := server.Write([]byte("oops\n"))
	assert.NilError(t, err)
	assert.ErrorContains(t, <-runDone, "invalid header")
	go func() { _, _ = io.Copy(io.Discard, server) }()

	ctx, cancel := context.WithTimeout(t.Context(), time.Second)
	defer cancel()
	_, err = conn.Call(ctx, "transform", nil)
	assert.Assert(t, errors.Is(err, ipc.ErrConnClosed), "expected ErrConnClosed, got %v", err)
	assert.Assert(t, !errors.Is(err, context.DeadlineExceeded), "call waited for its context deadline: %v", err)
	err = conn.Notify(ctx, "changed", nil)
	assert.Assert(t, errors.Is(err, ipc.ErrConnClosed), "expected ErrConnClosed, got %v", err)
}

func TestAsyncConnTerminalErrorIncludesResponseWriteFailure(t *testing.T) {
	t.Parallel()
	responseErr := errors.New("response write failed")
	rwc := &closeSignal{closed: make(chan struct{})}
	protocol := &failingResponseProtocol{
		closed:      rwc.closed,
		responseErr: responseErr,
	}
	conn := ipc.NewAsyncConnWithProtocol(rwc, protocol, noOpHandler{})

	err := conn.Run(t.Context())
	assert.Assert(t, errors.Is(err, responseErr), "expected response write error, got %v", err)
	_, err = conn.Call(t.Context(), "transform", nil)
	assert.Assert(t, errors.Is(err, responseErr), "expected terminal response write error, got %v", err)
	assert.Equal(t, strings.Count(err.Error(), responseErr.Error()), 1)
}

func TestAsyncConnRunWaitsForRequestAfterPeerCloses(t *testing.T) {
	t.Parallel()
	client, server := net.Pipe()
	defer server.Close()
	handler := &blockingHandler{
		started: make(chan struct{}, 1),
		release: make(chan struct{}),
	}
	defer func() {
		select {
		case <-handler.release:
			return
		default:
			close(handler.release)
		}
	}()
	conn := ipc.NewAsyncConn(server, handler)
	runDone := make(chan error, 1)
	go func() { runDone <- conn.Run(t.Context()) }()

	clientProtocol := ipc.NewJSONRPCProtocol(client)
	assert.NilError(t, clientProtocol.WriteRequest(jsonrpc.NewIDInt(1), "transform", nil))
	select {
	case <-handler.started:
		break
	case <-time.After(time.Second):
		t.Fatal("request handler did not start")
	}
	assert.NilError(t, client.Close())

	handlerBlocked := false
	select {
	case err := <-runDone:
		t.Fatalf("connection stopped while request handler was blocked: %v", err)
	case <-time.After(100 * time.Millisecond):
		handlerBlocked = true
	}
	assert.Assert(t, handlerBlocked)

	close(handler.release)
	select {
	case err := <-runDone:
		assert.ErrorContains(t, err, "ipc: failed to write response")
		_, err = conn.Call(t.Context(), "transform", nil)
		assert.ErrorContains(t, err, "ipc: failed to write response")
		err = conn.Notify(t.Context(), "changed", nil)
		assert.ErrorContains(t, err, "ipc: failed to write response")
	case <-time.After(time.Second):
		t.Fatal("connection did not stop after request handler completed")
	}
}
