//go:build wasip1

package main

import (
	"context"
	"errors"
	"io"
	"os"
	"syscall"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

const maxStdinPollDelay = 50 * time.Millisecond

type wasiStdin struct{}

func (wasiStdin) Read(buffer []byte) (int, error) {
	delay := time.Millisecond
	for {
		n, err := syscall.Read(syscall.Stdin, buffer)
		if n > 0 {
			return n, nil
		}
		if err == nil {
			return 0, io.EOF
		}
		if err != syscall.EAGAIN {
			return 0, err
		}
		// Stdin is not registered with Go's WASI poller.
		time.Sleep(delay)
		delay = min(delay*2, maxStdinPollDelay)
	}
}

func (wasiStdin) Close() error {
	return nil
}

var stdioStdin wasiStdin

func getCurrentDirectory() (string, error) {
	cwd := os.Getenv("PWD")
	if !tspath.IsRootedDiskPath(cwd) {
		cwd = "/"
	}
	return cwd, nil
}

func notifyContext(parent context.Context, _ ...os.Signal) (context.Context, context.CancelFunc) {
	return context.WithCancel(parent)
}

func getNpmInstall() func(context.Context, string, []string) ([]byte, error) {
	return func(context.Context, string, []string) ([]byte, error) {
		return nil, errors.New("installing npm packages is not supported in WebAssembly")
	}
}

func getLSPSpawn() func(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	return nil
}
