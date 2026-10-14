//go:build !windows

package ipc

import (
	"errors"
	"fmt"
	"net"
	"os"
	"os/exec"
	"path/filepath"
	"syscall"
	"testing"
	"time"
)

const privatePipeHelperEnv = "TSGO_PRIVATE_PIPE_HELPER"

func TestPipeTransportClosePreservesReplacement(t *testing.T) {
	t.Parallel()

	transport, err := NewPrivatePipeTransport("tsgo-api-test")
	if err != nil {
		t.Fatal(err)
	}
	socketPath := transport.Path()
	if closeErr := transport.Close(); closeErr != nil {
		t.Fatal(closeErr)
	}

	replacement, err := NewPipeTransport(filepath.Dir(socketPath))
	if err != nil {
		t.Fatal(err)
	}
	defer replacement.Close()

	if closeErr := transport.Close(); !errors.Is(closeErr, net.ErrClosed) {
		t.Fatalf("second Close returned %v, want net.ErrClosed", closeErr)
	}
	conn, err := net.DialTimeout("unix", socketPath, time.Second)
	if err != nil {
		t.Fatalf("replacement socket is unreachable: %v", err)
	}
	defer conn.Close()
}

func TestPipeTransportPermissions(t *testing.T) {
	t.Parallel()

	if os.Getenv(privatePipeHelperEnv) == "1" {
		testPipeTransportPermissions(t)
		return
	}

	cmd := exec.Command(os.Args[0], "-test.run=^TestPipeTransportPermissions$")
	cmd.Env = append(os.Environ(), privatePipeHelperEnv+"=1")
	if output, err := cmd.CombinedOutput(); err != nil {
		t.Fatalf("helper process failed: %v\n%s", err, output)
	}
}

func testPipeTransportPermissions(t *testing.T) {
	syscall.Umask(0o002)

	transport, err := NewPrivatePipeTransport("tsgo-api-test")
	if err != nil {
		t.Fatal(err)
	}
	defer transport.Close()

	socketPath := transport.Path()
	assertMode(t, filepath.Dir(socketPath), 0o700)
	assertMode(t, socketPath, 0o600)

	explicitDir := filepath.Join(os.TempDir(), fmt.Sprintf("tsgo-api-%d", os.Getpid()))
	explicitTransport, err := NewPipeTransport(explicitDir)
	if err != nil {
		t.Fatal(err)
	}
	assertMode(t, explicitDir, 0o700)
	assertMode(t, filepath.Join(explicitDir, "socket"), 0o600)

	if _, err := NewPipeTransport(explicitDir); err == nil {
		t.Fatal("NewPipeTransport succeeded with an existing directory")
	}
	if err := explicitTransport.Close(); err != nil {
		t.Fatal(err)
	}
	if _, err := os.Stat(explicitDir); !os.IsNotExist(err) {
		t.Fatalf("socket directory still exists after close: %v", err)
	}
}

func assertMode(t *testing.T, path string, want os.FileMode) {
	t.Helper()
	info, err := os.Stat(path)
	if err != nil {
		t.Fatal(err)
	}
	if got := info.Mode().Perm(); got != want {
		t.Fatalf("%s mode = %04o, want %04o", path, got, want)
	}
}
