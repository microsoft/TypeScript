//go:build !unix && !windows

package main

// isProcessAlive on unsupported platforms always returns true,
// meaning the watchdog will never fire. This is safe: the server
// simply won't detect a dead parent on these platforms.
func isProcessAlive(pid int) bool {
	return true
}
