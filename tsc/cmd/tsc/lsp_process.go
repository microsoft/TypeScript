//go:build !wasip1

package main

import (
	"io"
	"os/exec"
)

func getNpmInstall() func(cwd string, args []string) ([]byte, error) {
	return func(cwd string, args []string) ([]byte, error) {
		cmd := exec.Command("npm", args...)
		cmd.Dir = cwd
		return cmd.Output()
	}
}

func getLSPSpawn() func(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	return spawnProcess
}
