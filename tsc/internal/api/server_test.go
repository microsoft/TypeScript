package api

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"gotest.tools/v3/assert"
)

type blockingReadProtocol struct {
	ipc.Protocol
	started chan struct{}
	release chan struct{}
}

func (p *blockingReadProtocol) ReadMessage() (*ipc.Message, error) {
	close(p.started)
	<-p.release
	return nil, errors.New("read released")
}

func TestCancellableProtocol(t *testing.T) {
	t.Parallel()
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()
	underlying := &blockingReadProtocol{
		started: make(chan struct{}),
		release: make(chan struct{}),
	}
	defer close(underlying.release)
	protocol := newCancellableProtocol(ctx, underlying)
	done := make(chan error, 1)
	go func() {
		_, err := protocol.ReadMessage()
		done <- err
	}()
	<-underlying.started
	cancel()
	select {
	case err := <-done:
		assert.ErrorIs(t, err, context.Canceled)
	case <-time.After(10 * time.Second):
		t.Fatal("cancellation did not unblock ReadMessage")
	}
}

func TestServerRunError(t *testing.T) {
	t.Parallel()

	t.Run("EOF", func(t *testing.T) {
		t.Parallel()
		assert.NilError(t, serverRunError(context.Background(), nil))
	})

	t.Run("context cancellation", func(t *testing.T) {
		t.Parallel()
		ctx, cancel := context.WithCancel(context.Background())
		cancel()
		assert.NilError(t, serverRunError(ctx, context.Canceled))
	})

	t.Run("unrelated cancellation", func(t *testing.T) {
		t.Parallel()
		err := context.Canceled
		assert.ErrorIs(t, serverRunError(context.Background(), err), err)
	})

	t.Run("context cancellation supersedes server error", func(t *testing.T) {
		t.Parallel()
		ctx, cancel := context.WithCancel(context.Background())
		cancel()
		assert.NilError(t, serverRunError(ctx, errors.New("server failed")))
	})
}
