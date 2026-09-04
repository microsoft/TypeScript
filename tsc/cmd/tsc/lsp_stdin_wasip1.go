//go:build wasip1

package main

import (
	"io"
	"runtime"
	"syscall"
)

type wasiStdin struct{}

func (wasiStdin) Read(buffer []byte) (int, error) {
	for {
		n, err := syscall.Read(syscall.Stdin, buffer)
		if n == 0 && err == nil {
			return 0, io.EOF
		}
		if err != syscall.EAGAIN {
			return n, err
		}
		runtime.Gosched()
	}
}

var lspStdin wasiStdin
