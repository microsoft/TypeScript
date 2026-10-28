package osutil

import "time"

// Args returns the command-line arguments with platform-specific launcher details removed.
func Args() []string {
	return args()
}

// Executable returns the path of the current executable, accounting for platform-specific launchers.
func Executable() (string, error) {
	return executable()
}

// ProcessCPUTime returns cumulative user and system CPU time across all threads
// of the current process, excluding child processes.
func ProcessCPUTime() (time.Duration, error) {
	return processCPUTime()
}
