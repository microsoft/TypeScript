//go:build !windows

package api

import (
	"net"
	"os"
	"path"
)

// newPipeListener creates a Unix domain socket listener.
func newPipeListener(path string) (net.Listener, error) {
	// Remove any existing socket file
	_ = os.Remove(path) //nolint:forbidigo
	return net.Listen("unix", path)
}

// GeneratePipePath returns a platform-appropriate pipe path for the given name.
func GeneratePipePath(name string) string {
	//nolint:forbidigo
	return path.Join(os.TempDir(), name)
}
