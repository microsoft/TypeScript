//go:build wasip1

package main

import (
	"syscall"
)

type wasiStdin struct{}

func (wasiStdin) Read(buffer []byte) (int, error) {
	return readWasiFD(syscall.Stdin, buffer)
}

var lspStdin wasiStdin
