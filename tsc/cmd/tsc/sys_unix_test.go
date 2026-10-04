//go:build unix

package main

import (
	"bufio"
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"syscall"
	"testing"
	"time"

	"gotest.tools/v3/assert"
)

func TestChildProcessCloseDoesNotWaitForLauncherDescendants(t *testing.T) {
	const (
		launcherArg   = "child-process-launcher"
		descendantArg = "child-process-descendant"
	)
	if len(os.Args) > 1 {
		switch os.Args[len(os.Args)-1] {
		case launcherArg:
			cmd := exec.Command(os.Args[0], "-test.run=^TestChildProcessCloseDoesNotWaitForLauncherDescendants$", "--", descendantArg)
			cmd.Stdout = os.Stdout
			cmd.Stderr = os.Stderr
			assert.NilError(t, cmd.Start())
			fmt.Println(cmd.Process.Pid)
			assert.NilError(t, cmd.Wait())
			return
		case descendantArg:
			time.Sleep(time.Minute)
			return
		}
	}

	t.Parallel()
	process, err := spawnProcess(
		[]string{os.Args[0], "-test.run=^TestChildProcessCloseDoesNotWaitForLauncherDescendants$", "--", launcherArg},
		"",
		&bytes.Buffer{},
	)
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
