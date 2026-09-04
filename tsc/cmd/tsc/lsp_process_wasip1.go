//go:build wasip1

package main

import (
	"errors"
	"io"
)

func getNpmInstall() func(cwd string, args []string) ([]byte, error) {
	return func(string, []string) ([]byte, error) {
		return nil, errors.New("installing npm packages is not supported in WebAssembly")
	}
}

func getLSPSpawn() func(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	return nil
}
