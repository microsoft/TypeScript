//go:build !windows

package ipc

import (
	"fmt"
	"net"
	"os"
	"path/filepath"
)

// newPipeListener creates a Unix domain socket listener.
func newPipeListener(path string) (net.Listener, error) {
	// Remove any existing socket file
	_ = os.Remove(path) //nolint:forbidigo
	return net.Listen("unix", path)
}

func newPrivatePipeListener(_ string) (net.Listener, func() error, error) {
	dir, err := os.MkdirTemp("", "tsgo-api-") //nolint:forbidigo
	if err != nil {
		return nil, nil, fmt.Errorf("create private socket directory: %w", err)
	}

	socketPath := filepath.Join(dir, "socket") //nolint:forbidigo
	listener, err := net.Listen("unix", socketPath)
	if err != nil {
		_ = os.RemoveAll(dir) //nolint:forbidigo
		return nil, nil, fmt.Errorf("listen on private socket: %w", err)
	}
	if err := os.Chmod(socketPath, 0o600); err != nil { //nolint:forbidigo
		_ = listener.Close()
		_ = os.RemoveAll(dir) //nolint:forbidigo
		return nil, nil, fmt.Errorf("set private socket permissions: %w", err)
	}

	cleanup := func() error {
		return os.RemoveAll(dir) //nolint:forbidigo
	}
	return listener, cleanup, nil
}

// GeneratePipePath returns a platform-appropriate pipe path for the given name.
func GeneratePipePath(name string) string {
	//nolint:forbidigo
	return filepath.Join(os.TempDir(), name)
}
