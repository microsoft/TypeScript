//go:build wasip1

package main

import (
	"io"
	"syscall"
	"time"
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
