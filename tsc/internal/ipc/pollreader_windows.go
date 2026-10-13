package ipc

import (
	"io"
	"time"
)

// NewPollingReader returns r unchanged; polling reads are only implemented for POSIX pipes.
func NewPollingReader(r io.ReadCloser, window time.Duration) io.ReadCloser {
	return r
}
