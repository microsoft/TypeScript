package api

import (
	"context"
	"fmt"
	iofs "io/fs"
	"strings"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

type callbackTestConn struct {
	responses map[string]json.Value
}

func (c *callbackTestConn) Run(context.Context) error {
	return nil
}

func (c *callbackTestConn) Call(_ context.Context, method string, _ any) (json.Value, error) {
	return c.responses[method], nil
}

func (c *callbackTestConn) Notify(context.Context, string, any) error {
	return nil
}

func TestCallbackFSDefaults(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{
		"/file.ts": "content",
	}, false)
	caseSensitive := true
	fs := newCallbackFS(base, []string{"realpath:identity", "stat:fakeStat"}, &caseSensitive)

	if !fs.UseCaseSensitiveFileNames() {
		t.Fatal("expected configured case sensitivity")
	}
	if got := fs.Realpath("/file.ts"); got != "/file.ts" {
		t.Fatalf("Realpath() = %q, want identity", got)
	}
	if info := fs.Stat("/file.ts"); info == nil || info.IsDir() || info.Size() != 0 {
		t.Fatalf("Stat(file) = %#v, want inferred file with default metadata", info)
	}
	if info := fs.Stat("/"); info == nil || !info.IsDir() {
		t.Fatalf("Stat(directory) = %#v, want inferred directory", info)
	}
	if info := fs.Stat("/missing"); info != nil {
		t.Fatalf("Stat(missing) = %#v, want nil", info)
	}
}

func TestCallbackFSStatAndEntries(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{}, true)
	fs := newCallbackFS(base, []string{"stat", "getAccessibleEntries"}, nil)
	conn := &callbackTestConn{
		responses: map[string]json.Value{
			callbackStat:                 []byte(`{"kind":"value","value":{"mode":33060,"size":12,"mtime":"2024-01-02T03:04:05.000Z"}}`),
			callbackGetAccessibleEntries: []byte(`{"kind":"value","value":{"files":["link.ts"],"directories":["pkg"],"symlinks":["link.ts","pkg"]}}`),
		},
	}
	fs.SetConnection(t.Context(), conn)

	info := fs.Stat("/link.ts")
	if info == nil || info.IsDir() || info.Size() != 12 {
		t.Fatalf("Stat() = %#v, want callback file metadata", info)
	}
	if info.Mode() != 0o444 {
		t.Fatalf("Mode() = %v, want translated regular-file mode 0444", info.Mode())
	}
	wantTime := time.Date(2024, time.January, 2, 3, 4, 5, 0, time.UTC)
	if !info.ModTime().Equal(wantTime) {
		t.Fatalf("ModTime() = %v, want %v", info.ModTime(), wantTime)
	}
	conn.responses[callbackStat] = []byte(`{"kind":"missing"}`)
	if info := fs.Stat("/missing.ts"); info != nil {
		t.Fatalf("Stat(missing) = %#v, want nil", info)
	}

	entries := fs.GetAccessibleEntries("/")
	if _, ok := entries.Symlinks["link.ts"]; !ok {
		t.Fatal("expected file symlink metadata")
	}
	if _, ok := entries.Symlinks["pkg"]; !ok {
		t.Fatal("expected directory symlink metadata")
	}

	conn.responses[callbackGetAccessibleEntries] = []byte(`{"kind":"value","value":{"files":[],"directories":["src"],"symlinks":[]}}`)
	entries = fs.GetAccessibleEntries("/")
	if entries.Symlinks == nil {
		t.Fatal("explicitly empty symlink metadata was treated as unavailable")
	}
}

func TestNodeFileModeToGoFileMode(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name   string
		node   uint32
		goMode iofs.FileMode
	}{
		{name: "directory", node: 0o040755, goMode: iofs.ModeDir | 0o755},
		{name: "regular", node: 0o100644, goMode: 0o644},
		{name: "symlink", node: 0o120777, goMode: iofs.ModeSymlink | 0o777},
		{name: "fifo", node: 0o010600, goMode: iofs.ModeNamedPipe | 0o600},
		{name: "socket", node: 0o140600, goMode: iofs.ModeSocket | 0o600},
		{name: "setuid", node: 0o104755, goMode: iofs.ModeSetuid | 0o755},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			if got := nodeFileModeToGoFileMode(test.node); got != test.goMode {
				t.Fatalf("nodeFileModeToGoFileMode(%#o) = %#o, want %#o", test.node, got, test.goMode)
			}
		})
	}
}

func TestCallbackFSWriteFilePassthrough(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{}, true)
	fs := newCallbackFS(base, []string{"writeFile"}, nil)
	conn := &callbackTestConn{responses: map[string]json.Value{callbackWriteFile: []byte(`{"kind":"useOS"}`)}}
	fs.SetConnection(t.Context(), conn)

	if err := fs.WriteFile("/use-os.ts", "content"); err != nil {
		t.Fatal(err)
	}
	if content, ok := base.ReadFile("/use-os.ts"); !ok || content != "content" {
		t.Fatalf("base ReadFile() = %q, %v, want OS filesystem content", content, ok)
	}

	conn.responses[callbackWriteFile] = []byte(`{"kind":"value"}`)
	if err := fs.WriteFile("/handled.ts", "content"); err != nil {
		t.Fatal(err)
	}
	if _, ok := base.ReadFile("/handled.ts"); ok {
		t.Fatal("handled callback write unexpectedly reached base filesystem")
	}

	conn.responses[callbackWriteFile] = []byte(`{"kind":"noop"}`)
	if err := fs.WriteFile("/noop.ts", "content"); err != nil {
		t.Fatal(err)
	}
	if _, ok := base.ReadFile("/noop.ts"); ok {
		t.Fatal("noop callback write unexpectedly reached base filesystem")
	}
}

func TestCallbackFSWriteFileNoop(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{}, true)
	fs := newCallbackFS(base, []string{"writeFile:noop"}, nil)

	if err := fs.WriteFile("/ignored.ts", "content"); err != nil {
		t.Fatal(err)
	}
	if _, ok := base.ReadFile("/ignored.ts"); ok {
		t.Fatal("noop write unexpectedly reached base filesystem")
	}
}

func TestCallbackFSPerCallFakeStat(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{}, true)
	fs := newCallbackFS(base, []string{"stat", "directoryExists", "fileExists"}, nil)
	fs.SetConnection(t.Context(), &callbackTestConn{
		responses: map[string]json.Value{
			callbackStat:            []byte(`{"kind":"fakeStat"}`),
			callbackDirectoryExists: []byte(`{"kind":"value","value":false}`),
			callbackFileExists:      []byte(`{"kind":"value","value":true}`),
		},
	})

	info := fs.Stat("/virtual.ts")
	if info == nil || info.IsDir() {
		t.Fatalf("Stat() = %#v, want fake file stat", info)
	}
}

func TestCallbackFSPerCallIdentityRealpath(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{}, true)
	fs := newCallbackFS(base, []string{"realpath"}, nil)
	fs.SetConnection(t.Context(), &callbackTestConn{
		responses: map[string]json.Value{
			callbackRealpath: []byte(`{"kind":"identity"}`),
		},
	})

	if got := fs.Realpath("/virtual.ts"); got != "/virtual.ts" {
		t.Fatalf("Realpath() = %q, want identity", got)
	}
}

func TestCallbackFSError(t *testing.T) {
	t.Parallel()

	names := []string{
		callbackReadFile,
		callbackFileExists,
		callbackDirectoryExists,
		callbackGetAccessibleEntries,
		callbackRealpath,
		callbackStat,
		callbackWriteFile,
	}
	callbacks := make([]string, len(names))
	for i, name := range names {
		callbacks[i] = name + ":error"
	}
	base := vfstest.FromMap(map[string]string{}, true)
	fs := newCallbackFS(base, callbacks, nil)
	for _, name := range names {
		if !fs.errorCallbacks[name] {
			t.Fatalf("%s was not configured to panic", name)
		}
	}
	assertPanicsWith(t, "serverFS.error: readFile", func() {
		fs.ReadFile("/unexpected.ts")
	})

	callbackFS := newCallbackFS(base, []string{"fileExists"}, nil)
	callbackFS.SetConnection(t.Context(), &callbackTestConn{
		responses: map[string]json.Value{
			callbackFileExists: []byte(`{"kind":"error"}`),
		},
	})
	assertPanicsWith(t, "serverFS.error: fileExists", func() {
		callbackFS.FileExists("/unexpected.ts")
	})
}

func assertPanicsWith(t *testing.T, expected string, cb func()) {
	t.Helper()
	defer func() {
		value := recover()
		if value == nil {
			t.Fatal("expected panic")
		}
		if message := fmt.Sprint(value); !strings.Contains(message, expected) {
			t.Fatalf("panic = %q, want substring %q", message, expected)
		}
	}()
	cb()
}
