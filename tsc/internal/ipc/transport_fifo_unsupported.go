//go:build js || wasip1

package ipc

import "errors"

// NewSyncTransport is unavailable on WebAssembly platforms.
func NewSyncTransport(_ string) (Transport, error) {
	return nil, errors.New("synchronous FIFO transports are not supported on WebAssembly")
}
