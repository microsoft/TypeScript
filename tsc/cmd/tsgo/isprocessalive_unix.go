//go:build unix

package main

import (
	"errors"
	"os"
	"syscall"
)

// isProcessAlive checks if a process with the given PID is still running.
// On Unix, FindProcess always succeeds, so we send signal 0 to probe the
// process. If the signal returns nil or EPERM, the process exists (EPERM
// means it exists but we lack permission to signal it). ESRCH or any
// other error indicates the process is gone.
func isProcessAlive(pid int) bool {
	proc, err := os.FindProcess(pid)
	if err != nil {
		return false
	}
	err = proc.Signal(syscall.Signal(0))
	return err == nil || errors.Is(err, syscall.EPERM)
}
