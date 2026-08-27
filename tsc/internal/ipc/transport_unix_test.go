//go:build !windows

package ipc

import (
	"os"
	"os/exec"
	"path/filepath"
	"syscall"
	"testing"
)

const privatePipeHelperEnv = "TSGO_PRIVATE_PIPE_HELPER"

func TestPrivatePipeTransportPermissions(t *testing.T) {
	t.Parallel()

	if os.Getenv(privatePipeHelperEnv) == "1" {
		testPrivatePipeTransportPermissions(t)
		return
	}

	cmd := exec.Command(os.Args[0], "-test.run=^TestPrivatePipeTransportPermissions$")
	cmd.Env = append(os.Environ(), privatePipeHelperEnv+"=1")
	if output, err := cmd.CombinedOutput(); err != nil {
		t.Fatalf("helper process failed: %v\n%s", err, output)
	}
}

func testPrivatePipeTransportPermissions(t *testing.T) {
	syscall.Umask(0o002)

	transport, err := NewPrivatePipeTransport("tsgo-api-test")
	if err != nil {
		t.Fatal(err)
	}
	defer transport.Close()

	socketPath := transport.Path()
	assertMode(t, filepath.Dir(socketPath), 0o700)
	assertMode(t, socketPath, 0o600)
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
