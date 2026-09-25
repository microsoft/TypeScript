//go:build wasip1

package main

import (
	"syscall"
)

type wasiStdin struct{}

func (wasiStdin) Read(buffer []byte) (int, error) {
	return readWasiFD(syscall.Stdin, buffer)
}

func (wasiStdin) Close() error {
	return nil
}

var stdioStdin wasiStdin
