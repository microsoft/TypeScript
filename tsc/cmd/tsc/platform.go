//go:build !wasip1

package main

import (
	"context"
	"io"
	"os"
	"os/exec"
	"os/signal"
)

var stdioStdin = os.Stdin

func getCurrentDirectory() (string, error) {
	return os.Getwd()
}

func notifySignals(ch chan<- os.Signal, signals ...os.Signal) func() {
	signal.Notify(ch, signals...)
	return func() { signal.Stop(ch) }
}

func getNpmInstall() func(ctx context.Context, cwd string, args []string) ([]byte, error) {
	return func(ctx context.Context, cwd string, args []string) ([]byte, error) {
		cmd := exec.CommandContext(ctx, "npm", args...)
		cmd.Dir = cwd
		return cmd.Output()
	}
}

func getLSPSpawn() func(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	return spawnProcess
}
