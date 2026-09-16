//go:build windows

package ipc

import (
	"net"

	"github.com/Microsoft/go-winio"
)

// newPipeListener creates a Windows named pipe listener.
func newPipeListener(path string) (net.Listener, func() error, error) {
	listener, err := winio.ListenPipe(path, nil)
	return listener, nil, err
}

func newPrivatePipeListener(name string) (net.Listener, func() error, error) {
	return newPipeListener(GeneratePipePath(name))
}

// GeneratePipePath returns a platform-appropriate pipe path for the given name.
func GeneratePipePath(name string) string {
	return `\\.\pipe\` + name
}
