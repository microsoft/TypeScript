//go:build unix

package main

import (
	"bufio"
	"bytes"
	"strconv"
	"strings"
	"syscall"
	"testing"
	"time"

	"gotest.tools/v3/assert"
)

func TestChildProcessCloseDoesNotWaitForLauncherDescendants(t *testing.T) {
	t.Parallel()
	process, err := spawnProcess([]string{"sh", "-c", "nohup sleep 60 & echo $!; wait"}, "", &bytes.Buffer{})
	assert.NilError(t, err)
	pidText, err := bufio.NewReader(process).ReadString('\n')
	assert.NilError(t, err)
	descendantPID, err := strconv.Atoi(strings.TrimSpace(pidText))
	assert.NilError(t, err)
	done := make(chan error, 1)
	go func() { done <- process.Close() }()

	completed := false
	select {
	case err := <-done:
		assert.NilError(t, err)
		completed = true
	case <-time.After(2 * time.Second):
		_ = syscall.Kill(descendantPID, syscall.SIGKILL)
		<-done
		completed = false
	}
	assert.Assert(t, completed, "child process shutdown waited for a launcher descendant")
	if isProcessAlive(descendantPID) {
		_ = syscall.Kill(descendantPID, syscall.SIGKILL)
	}
}
