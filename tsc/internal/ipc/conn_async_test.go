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
	"gotest.tools/v3/assert"
)

type noOpHandler struct{}

func (noOpHandler) HandleRequest(context.Context, string, json.Value) (any, error) {
	return nil, nil
}

func (noOpHandler) HandleNotification(context.Context, string, json.Value) error {
	return nil
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
