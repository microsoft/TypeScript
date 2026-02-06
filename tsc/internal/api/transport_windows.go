//go:build windows

package api

import (
	"net"

	"github.com/Microsoft/go-winio"
)

// newPipeListener creates a Windows named pipe listener.
func newPipeListener(path string) (net.Listener, error) {
	return winio.ListenPipe(path, nil)
}

// GeneratePipePath returns a platform-appropriate pipe path for the given name.
func GeneratePipePath(name string) string {
	return `\\.\pipe\` + name
}
