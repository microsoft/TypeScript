package main

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"testing"

	"gotest.tools/v3/assert"
)

func TestAPIExitStatus(t *testing.T) {
	t.Parallel()

	t.Run("EOF", func(t *testing.T) {
		t.Parallel()
		var stderr bytes.Buffer
		assert.Equal(t, apiExitStatus(&stderr, context.Background(), nil), 0)
		assert.Equal(t, stderr.String(), "")
	})

	t.Run("signal cancellation", func(t *testing.T) {
		t.Parallel()
		ctx, cancel := context.WithCancel(context.Background())
		cancel()
		var stderr bytes.Buffer
		assert.Equal(t, apiExitStatus(&stderr, ctx, fmt.Errorf("API stopped: %w", context.Canceled)), 0)
		assert.Equal(t, stderr.String(), "")
	})

	t.Run("unrelated cancellation", func(t *testing.T) {
		t.Parallel()
		var stderr bytes.Buffer
		assert.Equal(t, apiExitStatus(&stderr, context.Background(), context.Canceled), 1)
		assert.Equal(t, stderr.String(), "context canceled\n")
	})

	t.Run("server error after signal cancellation", func(t *testing.T) {
		t.Parallel()
		ctx, cancel := context.WithCancel(context.Background())
		cancel()
		var stderr bytes.Buffer
		assert.Equal(t, apiExitStatus(&stderr, ctx, errors.New("server failed")), 1)
		assert.Equal(t, stderr.String(), "server failed\n")
	})

	t.Run("server error", func(t *testing.T) {
		t.Parallel()
		var stderr bytes.Buffer
		assert.Equal(t, apiExitStatus(&stderr, context.Background(), errors.New("server failed")), 1)
		assert.Equal(t, stderr.String(), "server failed\n")
	})
}
