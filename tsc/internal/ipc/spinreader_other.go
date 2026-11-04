//go:build !unix

package ipc

import (
	"io"
	"time"
)

// NewSpinReadCloser returns r unchanged: spin-polling needs poll(2) on the
// input descriptor, which is only available on Unix.
func NewSpinReadCloser(r io.ReadCloser, _ time.Duration, _ bool) io.ReadCloser {
	return r
}
