//go:build unix

package main

import (
	"bufio"
	"bytes"
	"compress/gzip"
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"os/signal"
	"path/filepath"
	"strconv"
	"strings"
	"syscall"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/osutil"
	"gotest.tools/v3/assert"
)

func TestMain(m *testing.M) {
	if os.Getenv("TSGO_IGNORE_INTERRUPT") != "" {
		signal.Ignore(syscall.SIGINT)
		if err := os.Unsetenv("TSGO_IGNORE_INTERRUPT"); err != nil {
			panic(err)
		}
		executable, err := osutil.Executable()
		if err != nil {
			panic(err)
		}
		if err := syscall.Exec(executable, os.Args, os.Environ()); err != nil {
			panic(err)
		}
	}
	if args := os.Getenv("TSGO_COMMAND_LINE_HELPER"); args != "" {
		var commandLine []string
		if err := json.Unmarshal([]byte(args), &commandLine); err != nil {
			panic(err)
		}
		os.Args = append([]string{os.Args[0]}, commandLine...)
		os.Exit(runMain())
	}
	if mode := os.Getenv("TSGO_TERMINATION_HELPER"); mode != "" {
		os.Exit(runWithSignals(func(ctx context.Context) int {
			if mode == "normal" {
				return 42
			}
			defer fmt.Println("cleanup complete")
			fmt.Println("ready")
			<-ctx.Done()
			fmt.Println("cancelled")
			if _, err := io.ReadFull(os.Stdin, make([]byte, 1)); err != nil {
				panic(err)
			}
			return 0
		}))
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

func TestCommandLineTermination(t *testing.T) {
	t.Parallel()

	executable, executableErr := osutil.Executable()
	assert.NilError(t, executableErr)

	for _, test := range []struct {
		name            string
		args            string
		profiled        bool
		ignoreInterrupt bool
		lsp             bool
		api             bool
		syncAPI         bool
		pipeAPI         bool
	}{
		{name: "watch", args: "--watch --project tsconfig.json"},
		{name: "buildWatch", args: "--build --watch tsconfig.json"},
		{name: "watchProfile", args: "--watch --project tsconfig.json", profiled: true},
		{name: "buildWatchProfile", args: "--build --watch tsconfig.json", profiled: true},
		{name: "watchIgnoredInterrupt", args: "--watch --project tsconfig.json", ignoreInterrupt: true},
		{name: "watchProfileIgnoredInterrupt", args: "--watch --project tsconfig.json", profiled: true, ignoreInterrupt: true},
		{name: "lsp", args: "--lsp --stdio", lsp: true},
		{name: "lspProfile", args: "--lsp --stdio", lsp: true, profiled: true},
		{name: "apiAsync", args: "--api --async", api: true},
		{name: "apiSync", args: "--api", api: true, syncAPI: true},
		{name: "apiWaitingForConnection", args: "--api --pipe", pipeAPI: true},
	} {
		for _, sig := range []syscall.Signal{syscall.SIGINT, syscall.SIGTERM} {
			t.Run(fmt.Sprintf("%s/%s", test.name, sig), func(t *testing.T) {
				t.Parallel()

				projectDir := t.TempDir()
				assert.NilError(t, os.WriteFile(filepath.Join(projectDir, "index.ts"), []byte("export const value = 1;\n"), 0o666))
				// Exercise termination without loading and checking libraries in every subprocess.
				assert.NilError(t, os.WriteFile(filepath.Join(projectDir, "tsconfig.json"), []byte(`{"compilerOptions":{"pretty":false,"noLib":true,"noCheck":true},"files":["index.ts"]}`), 0o666))

				output, outputErr := os.CreateTemp(t.TempDir(), "watch-output")
				assert.NilError(t, outputErr)
				defer output.Close()

				args := strings.Fields(test.args)
				pipePath := filepath.Join(projectDir, "api.sock")
				if test.pipeAPI {
					args = append(args, pipePath)
				}
				if test.profiled {
					args = append(args, "--pprofDir", filepath.Join(projectDir, "profiles"))
				}
				encodedArgs, err := json.Marshal(args)
				assert.NilError(t, err)
				cmd := exec.Command(executable, "-test.run=^TestCommandLineTermination$")
				cmd.Dir = projectDir
				cmd.Env = append(os.Environ(), "TSGO_COMMAND_LINE_HELPER="+string(encodedArgs))
				if test.ignoreInterrupt {
					cmd.Env = append(cmd.Env, "TSGO_IGNORE_INTERRUPT=1")
				}
				cmd.Stdout = output
				cmd.Stderr = output
				stdin, err := cmd.StdinPipe()
				assert.NilError(t, err)
				defer stdin.Close()
				assert.NilError(t, cmd.Start())
				t.Cleanup(func() {
					if cmd.ProcessState == nil {
						_ = cmd.Process.Kill()
						_ = cmd.Wait()
					}
				})

				if test.pipeAPI {
					deadline := time.Now().Add(10 * time.Second)
					for {
						_, err := os.Stat(pipePath)
						if err == nil {
							break
						}
						assert.Assert(t, os.IsNotExist(err), "stat pipe: %v", err)
						if time.Now().After(deadline) {
							t.Fatal("timed out waiting for API pipe")
						}
						time.Sleep(10 * time.Millisecond)
					}
				} else if test.lsp || test.api {
					request := `{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"processId":null,"rootUri":null,"capabilities":{}}}`
					expected := `"capabilities"`
					if test.api {
						request = `{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}`
						expected = `"currentDirectory"`
					}
					if test.syncAPI {
						// MessagePack request tuple: [1, "initialize", "{}"].
						_, err = io.WriteString(stdin, "\x93\x01\xc4\x0ainitialize\xc4\x02{}")
					} else {
						_, err = fmt.Fprintf(stdin, "Content-Length: %d\r\n\r\n%s", len(request), request)
					}
					assert.NilError(t, err)
					waitForWatchOutput(t, output.Name(), expected)
				} else {
					waitForWatchOutput(t, output.Name(), "Watching for file changes.")
				}
				assert.NilError(t, cmd.Process.Signal(sig))
				status := waitForSignalExit(t, cmd)
				if test.ignoreInterrupt && sig == syscall.SIGINT {
					assert.Equal(t, status.ExitStatus(), 128+int(sig))
				} else {
					assert.Assert(t, status.Signaled(), "expected signal termination, got %v", status)
					assert.Equal(t, status.Signal(), sig)
				}
				if test.profiled {
					profiles, err := filepath.Glob(filepath.Join(projectDir, "profiles", "*.pb.gz"))
					assert.NilError(t, err)
					assert.Equal(t, len(profiles), 2)
					for _, profile := range profiles {
						data, err := os.ReadFile(profile)
						assert.NilError(t, err)
						reader, err := gzip.NewReader(bytes.NewReader(data))
						assert.NilError(t, err)
						content, err := io.ReadAll(reader)
						assert.NilError(t, err)
						assert.NilError(t, reader.Close())
						assert.Assert(t, len(content) > 0, "empty profile: %s", profile)
					}
				}
			})
		}
	}
}

func waitForSignalExit(t *testing.T, cmd *exec.Cmd) syscall.WaitStatus {
	t.Helper()
	waitDone := make(chan error, 1)
	go func() { waitDone <- cmd.Wait() }()
	var waitErr error
	select {
	case result := <-waitDone:
		waitErr = result
	case <-time.After(10 * time.Second):
		_ = cmd.Process.Kill()
		<-waitDone
		t.Fatal("timed out waiting for process to terminate")
	}
	var exitErr *exec.ExitError
	if !errors.As(waitErr, &exitErr) {
		t.Fatalf("process returned %v instead of terminating", waitErr)
	}
	return exitErr.ProcessState.Sys().(syscall.WaitStatus)
}

func TestTerminationCleanup(t *testing.T) {
	t.Parallel()
	executable, executableErr := osutil.Executable()
	assert.NilError(t, executableErr)
	for _, test := range []struct {
		name            string
		secondSignal    syscall.Signal
		ignoreInterrupt bool
	}{
		{name: "cleanup"},
		{name: "secondSignal", secondSignal: syscall.SIGTERM},
		{name: "secondIgnoredInterrupt", secondSignal: syscall.SIGINT, ignoreInterrupt: true},
		{name: "normal"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			output, err := os.CreateTemp(t.TempDir(), "termination-output")
			assert.NilError(t, err)
			defer output.Close()
			cmd := exec.Command(executable, "-test.run=^TestTerminationCleanup$")
			cmd.Env = append(os.Environ(), "TSGO_TERMINATION_HELPER="+test.name)
			if test.ignoreInterrupt {
				cmd.Env = append(cmd.Env, "TSGO_IGNORE_INTERRUPT=1")
			}
			cmd.Stdout = output
			cmd.Stderr = output
			stdin, err := cmd.StdinPipe()
			assert.NilError(t, err)
			defer stdin.Close()
			assert.NilError(t, cmd.Start())
			t.Cleanup(func() {
				if cmd.ProcessState == nil {
					_ = cmd.Process.Kill()
					_ = cmd.Wait()
				}
			})
			if test.name == "normal" {
				assert.Equal(t, waitForSignalExit(t, cmd).ExitStatus(), 42)
				return
			}
			waitForWatchOutput(t, output.Name(), "ready")
			assert.NilError(t, cmd.Process.Signal(syscall.SIGINT))
			waitForWatchOutput(t, output.Name(), "cancelled")
			if test.secondSignal != 0 {
				assert.NilError(t, cmd.Process.Signal(test.secondSignal))
			} else {
				_, writeErr := stdin.Write([]byte{1})
				assert.NilError(t, writeErr)
			}
			status := waitForSignalExit(t, cmd)
			expected := syscall.SIGINT
			if test.secondSignal != 0 {
				expected = test.secondSignal
			}
			if test.ignoreInterrupt {
				assert.Equal(t, status.ExitStatus(), 128+int(expected))
			} else {
				assert.Assert(t, status.Signaled(), "expected signal termination, got %v", status)
				assert.Equal(t, status.Signal(), expected)
			}
			text, err := os.ReadFile(output.Name())
			assert.NilError(t, err)
			assert.Equal(t, strings.Contains(string(text), "cleanup complete"), test.secondSignal == 0)
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
