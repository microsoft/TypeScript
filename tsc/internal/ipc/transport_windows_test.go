//go:build windows

package ipc

import (
	"fmt"
	"os"
	"testing"
	"time"

	"github.com/Microsoft/go-winio"
	"golang.org/x/sys/windows"
)

func TestPipeTransportPermissions(t *testing.T) {
	t.Parallel()

	transport, err := NewPrivatePipeTransport(fmt.Sprintf("tsgo-api-test-%d", os.Getpid()))
	if err != nil {
		t.Fatal(err)
	}
	defer transport.Close()

	accepted := make(chan error, 1)
	done := make(chan struct{})
	defer close(done)
	go func() {
		server, acceptErr := transport.Accept()
		if acceptErr == nil {
			defer server.Close()
		}
		accepted <- acceptErr
		<-done
	}()

	timeout := time.Second
	conn, err := winio.DialPipe(transport.Path(), &timeout)
	if err != nil {
		t.Fatalf("current user cannot connect: %v", err)
	}
	defer conn.Close()

	select {
	case acceptErr := <-accepted:
		if acceptErr != nil {
			t.Fatalf("failed to accept current user connection: %v", acceptErr)
		}
	case <-time.After(timeout):
		t.Fatal("timed out accepting current user connection")
	}

	handle := windows.Handle(conn.(interface{ Fd() uintptr }).Fd())
	sd, err := windows.GetSecurityInfo(handle, windows.SE_FILE_OBJECT, windows.DACL_SECURITY_INFORMATION)
	if err != nil {
		t.Fatal(err)
	}
	dacl, _, err := sd.DACL()
	if err != nil {
		t.Fatal(err)
	}
	if dacl == nil || dacl.AceCount != 1 {
		t.Fatalf("expected exactly one access-control entry: %s", sd.String())
	}
	user, err := windows.GetCurrentProcessToken().GetTokenUser()
	if err != nil {
		t.Fatal(err)
	}
	// Windows maps generic all access to file all access and may abbreviate well-known SIDs.
	expected, err := windows.SecurityDescriptorFromString("D:P(A;;FA;;;" + user.User.Sid.String() + ")")
	if err != nil {
		t.Fatal(err)
	}
	if got, want := sd.String(), expected.String(); got != want {
		t.Fatalf("pipe security descriptor = %s, want %s", got, want)
	}
}
