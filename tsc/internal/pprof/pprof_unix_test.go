//go:build unix

package pprof

import (
	"compress/gzip"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"syscall"
	"testing"
	"time"
)

func TestProfileSessionFlushesOnInterrupt(t *testing.T) {
	if profileDir := os.Getenv("TSGO_PPROF_SIGNAL_HELPER"); profileDir != "" {
		BeginProfiling(profileDir, os.Stdout)
		fmt.Println("profile-ready")
		for {
			runtime.Gosched()
		}
	}
	t.Parallel()

	profileDir := t.TempDir()
	output, createErr := os.CreateTemp(t.TempDir(), "profile-output")
	if createErr != nil {
		t.Fatal(createErr)
	}
	defer output.Close()

	cmd := exec.Command(os.Args[0], "-test.run=^TestProfileSessionFlushesOnInterrupt$")
	cmd.Env = append(os.Environ(), "TSGO_PPROF_SIGNAL_HELPER="+profileDir)
	cmd.Stdout = output
	cmd.Stderr = output
	if startErr := cmd.Start(); startErr != nil {
		t.Fatal(startErr)
	}
	t.Cleanup(func() {
		if cmd.ProcessState == nil {
			_ = cmd.Process.Kill()
			_ = cmd.Wait()
		}
	})

	waitForOutput(t, output.Name(), "profile-ready")
	time.Sleep(100 * time.Millisecond)
	if signalErr := cmd.Process.Signal(os.Interrupt); signalErr != nil {
		t.Fatal(signalErr)
	}

	waitErr := cmd.Wait()
	var exitErr *exec.ExitError
	if !errors.As(waitErr, &exitErr) {
		t.Fatalf("profile process returned %v instead of terminating from SIGINT", waitErr)
	}
	status := exitErr.ProcessState.Sys().(syscall.WaitStatus)
	if !status.Signaled() || status.Signal() != syscall.SIGINT {
		t.Fatalf("profile process exited with %v instead of SIGINT", status)
	}

	profiles, globErr := filepath.Glob(filepath.Join(profileDir, "*.pb.gz"))
	if globErr != nil {
		t.Fatal(globErr)
	}
	if len(profiles) != 2 {
		t.Fatalf("expected CPU and memory profiles, got %v", profiles)
	}
	for _, profile := range profiles {
		assertReadableGzip(t, profile)
	}
}

func waitForOutput(t *testing.T, path string, expected string) {
	t.Helper()
	deadline := time.Now().Add(10 * time.Second)
	for {
		output, readErr := os.ReadFile(path)
		if readErr != nil {
			t.Fatal(readErr)
		}
		if strings.Contains(string(output), expected) {
			return
		}
		if time.Now().After(deadline) {
			t.Fatalf("timed out waiting for %q in output:\n%s", expected, output)
		}
		time.Sleep(10 * time.Millisecond)
	}
}

func assertReadableGzip(t *testing.T, path string) {
	t.Helper()
	file, openErr := os.Open(path)
	if openErr != nil {
		t.Fatal(openErr)
	}
	defer file.Close()
	reader, gzipErr := gzip.NewReader(file)
	if gzipErr != nil {
		t.Fatal(gzipErr)
	}
	defer reader.Close()
	if _, readErr := io.Copy(io.Discard, reader); readErr != nil {
		t.Fatal(readErr)
	}
}
