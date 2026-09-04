//go:build wasip1

package main

import (
	"runtime"
	"syscall"
)

type wasiStdin struct{}

func (wasiStdin) Read(buffer []byte) (int, error) {
	for {
		n, err := syscall.Read(syscall.Stdin, buffer)
		if err != syscall.EAGAIN {
			return n, err
		}
		runtime.Gosched()
	}
}

var lspStdin wasiStdin
