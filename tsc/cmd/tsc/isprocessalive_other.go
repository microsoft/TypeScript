//go:build !unix && !windows

package main

const processAliveSupported = false

func isProcessAlive(pid int) bool {
	panic("isProcessAlive is not supported on this platform")
}
