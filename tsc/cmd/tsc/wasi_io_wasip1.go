//go:build wasip1

package main

import (
	"io"
	"syscall"
	"time"
)

const maxWasiPollDelay = 50 * time.Millisecond

func readWasiFD(fd int, buffer []byte) (int, error) {
	delay := time.Millisecond
	for {
		n, err := syscall.Read(fd, buffer)
		if n > 0 {
			return n, nil
		}
		if err == nil {
			return 0, io.EOF
		}
		if err != syscall.EAGAIN {
			return 0, err
		}
		// These descriptors are not registered with Go's WASI poller.
		time.Sleep(delay)
		delay = min(delay*2, maxWasiPollDelay)
	}
}
