//go:build windows

package ipc

import (
	"fmt"
	"os"
	"strings"
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

	sd, err := windows.GetNamedSecurityInfo(transport.Path(), windows.SE_FILE_OBJECT, windows.DACL_SECURITY_INFORMATION)
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
	if !strings.Contains(sd.String(), ";;;"+user.User.Sid.String()+")") {
		t.Fatalf("pipe access is not restricted to the current user: %s", sd.String())
	}

	timeout := time.Second
	conn, err := winio.DialPipe(transport.Path(), &timeout)
	if err != nil {
		t.Fatalf("current user cannot connect: %v", err)
	}
	defer conn.Close()
}
