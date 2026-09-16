package api

import (
	"context"
	"errors"
	"testing"

	"gotest.tools/v3/assert"
)

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
