//go:build !windows

package ipc

import (
	"errors"
	"fmt"
	"io/fs"
	"net"
	"os"
	"path/filepath"
)

func newPipeListener(dir string) (net.Listener, func() error, error) {
	if err := os.Mkdir(dir, 0o700); err != nil { //nolint:forbidigo
		return nil, nil, fmt.Errorf("create private socket directory: %w", err)
	}
	return listenInPrivatePipeDirectory(dir)
}

func newPrivatePipeListener(_ string) (net.Listener, func() error, error) {
	dir, err := os.MkdirTemp("", "tsgo-api-") //nolint:forbidigo
	if err != nil {
		return nil, nil, fmt.Errorf("create private socket directory: %w", err)
	}
	return listenInPrivatePipeDirectory(dir)
}

func listenInPrivatePipeDirectory(dir string) (net.Listener, func() error, error) {
	socketPath := filepath.Join(dir, "socket") //nolint:forbidigo
	cleanup := func() error {
		socketErr := os.Remove(socketPath) //nolint:forbidigo
		if errors.Is(socketErr, fs.ErrNotExist) {
			socketErr = nil
		}
		dirErr := os.Remove(dir) //nolint:forbidigo
		if errors.Is(dirErr, fs.ErrNotExist) {
			dirErr = nil
		}
		return errors.Join(socketErr, dirErr)
	}

	if err := os.Chmod(dir, 0o700); err != nil { //nolint:forbidigo
		return nil, nil, errors.Join(fmt.Errorf("set private socket directory permissions: %w", err), cleanup())
	}

	listener, err := net.Listen("unix", socketPath)
	if err != nil {
		return nil, nil, errors.Join(fmt.Errorf("listen on private socket: %w", err), cleanup())
	}
	if err := os.Chmod(socketPath, 0o600); err != nil { //nolint:forbidigo
		return nil, nil, errors.Join(fmt.Errorf("set private socket permissions: %w", err), listener.Close(), cleanup())
	}
	return listener, cleanup, nil
}

// GeneratePipePath returns a platform-appropriate pipe path for the given name.
func GeneratePipePath(name string) string {
	//nolint:forbidigo
	return filepath.Join(os.TempDir(), name)
}
