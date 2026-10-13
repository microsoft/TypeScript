//go:build !windows

package ipc

import (
	"io"
	"os"
	"testing"
	"time"

	"gotest.tools/v3/assert"
)

func TestPollingReader(t *testing.T) {
	t.Parallel()

	t.Run("returns readers unchanged when polling is disabled", func(t *testing.T) {
		t.Parallel()
		r, w, err := os.Pipe()
		assert.NilError(t, err)
		defer w.Close()
		assert.Equal(t, NewPollingReader(r, 0), io.ReadCloser(r))
		r.Close()
	})

	t.Run("reads data that arrives during and after the poll window", func(t *testing.T) {
		t.Parallel()
		r, w, err := os.Pipe()
		assert.NilError(t, err)
		reader := NewPollingReader(r, 50*time.Microsecond)
		defer reader.Close()
		assert.Assert(t, reader != io.ReadCloser(r))

		buf := make([]byte, 16)
		_, err = w.WriteString("now")
		assert.NilError(t, err)
		n, err := reader.Read(buf)
		assert.NilError(t, err)
		assert.Equal(t, string(buf[:n]), "now")

		// Arrives long after the poll window, so the read must block.
		go func() {
			time.Sleep(20 * time.Millisecond)
			_, _ = w.WriteString("later")
			w.Close()
		}()
		n, err = reader.Read(buf)
		assert.NilError(t, err)
		assert.Equal(t, string(buf[:n]), "later")

		_, err = reader.Read(buf)
		assert.Equal(t, err, io.EOF)
	})
}
