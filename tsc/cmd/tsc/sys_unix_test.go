//go:build unix

package main

import (
	"bufio"
	"bytes"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"syscall"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/osutil"
	"gotest.tools/v3/assert"
)

func TestMain(m *testing.M) {
	if args := os.Getenv("TSGO_WATCH_SIGNAL_HELPER"); args != "" {
		os.Args = append([]string{os.Args[0]}, strings.Fields(args)...)
		os.Exit(runMain())
	}
	os.Exit(m.Run())
}

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

func TestWatchTerminatesOnInterrupt(t *testing.T) {
	t.Parallel()

	executable, err := osutil.Executable()
	assert.NilError(t, err)

	for _, test := range []struct {
		name string
		args string
	}{
		{name: "watch", args: "--watch --project tsconfig.json"},
		{name: "buildWatch", args: "--build --watch tsconfig.json"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			projectDir := t.TempDir()
			assert.NilError(t, os.WriteFile(filepath.Join(projectDir, "index.ts"), []byte("export const value = 1;\n"), 0o666))
			assert.NilError(t, os.WriteFile(filepath.Join(projectDir, "tsconfig.json"), []byte(`{"compilerOptions":{"pretty":false},"files":["index.ts"]}`), 0o666))

			output, outputErr := os.CreateTemp(t.TempDir(), "watch-output")
			assert.NilError(t, outputErr)
			defer output.Close()

			cmd := exec.Command(executable, "-test.run=^TestWatchTerminatesOnInterrupt$")
			cmd.Dir = projectDir
			cmd.Env = append(os.Environ(), "TSGO_WATCH_SIGNAL_HELPER="+test.args)
			cmd.Stdout = output
			cmd.Stderr = output
			assert.NilError(t, cmd.Start())
			t.Cleanup(func() {
				if cmd.ProcessState == nil {
					_ = cmd.Process.Kill()
					_ = cmd.Wait()
				}
			})

			waitForWatchOutput(t, output.Name(), "Watching for file changes.")
			assert.NilError(t, cmd.Process.Signal(os.Interrupt))

			waitDone := make(chan error, 1)
			go func() {
				waitDone <- cmd.Wait()
			}()
			var waitErr error
			select {
			case result := <-waitDone:
				waitErr = result
			case <-time.After(10 * time.Second):
				_ = cmd.Process.Kill()
				<-waitDone
				t.Fatal("timed out waiting for watch process to terminate")
			}
			var exitErr *exec.ExitError
			if !errors.As(waitErr, &exitErr) {
				t.Fatalf("watch process returned %v instead of terminating from SIGINT", waitErr)
			}
			status := exitErr.ProcessState.Sys().(syscall.WaitStatus)
			if !status.Signaled() || status.Signal() != syscall.SIGINT {
				t.Fatalf("watch process exited with %v instead of SIGINT", status)
			}
		})
	}
}

func waitForWatchOutput(t *testing.T, path string, expected string) {
	t.Helper()
	deadline := time.Now().Add(10 * time.Second)
	for {
		output, err := os.ReadFile(path)
		assert.NilError(t, err)
		if strings.Contains(string(output), expected) {
			return
		}
		if time.Now().After(deadline) {
			t.Fatalf("timed out waiting for %q in output:\n%s", expected, output)
		}
		time.Sleep(10 * time.Millisecond)
	}
}
