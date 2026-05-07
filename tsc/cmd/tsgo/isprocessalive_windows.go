//go:build windows

package main

import "syscall"

// isProcessAlive checks if a process with the given PID is still running.
// On Windows, we open the process with SYNCHRONIZE access and use
// WaitForSingleObject with a zero timeout. If the wait times out, the
// process is still running. If the object is signaled, it has exited.
func isProcessAlive(pid int) bool {
	const SYNCHRONIZE = 0x00100000
	handle, err := syscall.OpenProcess(SYNCHRONIZE, false, uint32(pid))
	if err != nil {
		return false
	}
	defer func() { _ = syscall.CloseHandle(handle) }()
	ret, err := syscall.WaitForSingleObject(handle, 0)
	if err != nil {
		return false
	}
	const WAIT_TIMEOUT = 258
	return ret == WAIT_TIMEOUT
}
