package ipc_test

import (
	"context"
	"errors"
	"io"
	"net"
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
	messages []*ipc.Message
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
	return nil
}

func (p *queuedProtocol) WriteError(*jsonrpc.ID, *jsonrpc.ResponseError) error {
	return nil
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
