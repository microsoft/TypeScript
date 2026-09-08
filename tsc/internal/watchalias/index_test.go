package watchalias

import (
	"errors"
	"io/fs"
	"reflect"
	"syscall"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type exactFS struct{ vfs.FS }

type comparerFS struct {
	vfs.FS
	calls []string
	get   func(string) (fswatch.PathComparer, error)
}

func (f *comparerFS) WatchPathComparer(path string) (fswatch.PathComparer, error) {
	f.calls = append(f.calls, path)
	return f.get(path)
}

func TestExactFilesystemDoesNotProbe(t *testing.T) {
	t.Parallel()
	index := New(exactFS{})
	for _, path := range []string{"/project/A.ts", "/project/straße.ts"} {
		if err := index.Add(path); err != nil {
			t.Fatal(err)
		}
	}
	for _, event := range []string{"/project/a.ts", "/project/STRASSE.ts", "/project/new.ts"} {
		if got := index.Expand(event); !reflect.DeepEqual(got, []string{event}) {
			t.Fatalf("Expand(%q) = %q", event, got)
		}
	}
}

func TestExistingAncestorComparer(t *testing.T) {
	t.Parallel()
	f := &comparerFS{get: func(path string) (fswatch.PathComparer, error) {
		if path == "/project/new" {
			return fswatch.PathComparer{}, &fs.PathError{Op: "pathconf", Path: path, Err: fs.ErrNotExist}
		}
		return fswatch.PathComparer{}, nil
	}}
	index := New(f)
	for _, path := range []string{"/project/new/a.ts", "/project/new/b.ts", "/project/new/a.ts"} {
		if err := index.Add(path); err != nil {
			t.Fatal(err)
		}
	}
	if want := []string{"/project/new", "/project", "/"}; !reflect.DeepEqual(f.calls, want) {
		t.Fatalf("probes = %q, want %q", f.calls, want)
	}
	before := len(f.calls)
	for _, name := range []string{"/", "/project", "/project/new", "/project/new/a.ts"} {
		if !index.Contains(name) {
			t.Fatalf("missing original registration %q", name)
		}
	}
	if index.Contains("/project/new/c.ts") || index.Contains("/project/NEW/a.ts") {
		t.Fatal("unregistered original spelling was considered covered")
	}
	index.Expand("/project/new/deleted.ts")
	if len(f.calls) != before {
		t.Fatal("event expansion must not access the filesystem")
	}
}

func TestProbeFailureIsNotSilentlyIgnored(t *testing.T) {
	t.Parallel()
	f := &comparerFS{get: func(path string) (fswatch.PathComparer, error) {
		return fswatch.PathComparer{}, &fs.PathError{Op: "pathconf", Path: path, Err: fs.ErrPermission}
	}}
	index := New(f)
	if err := index.Add("/project/a.ts"); !errors.Is(err, fs.ErrPermission) {
		t.Fatalf("Add error = %v", err)
	}

	if got := index.Expand("/project/a.ts"); !reflect.DeepEqual(got, []string{"/project/a.ts"}) {
		t.Fatalf("failed Add changed index: %q", got)
	}
}

func TestNonDirectoryLookupUsesExistingAncestor(t *testing.T) {
	t.Parallel()
	f := &comparerFS{get: func(path string) (fswatch.PathComparer, error) {
		if path == "/project/package.json/child" {
			return fswatch.PathComparer{}, &fs.PathError{Op: "pathconf", Path: path, Err: syscall.ENOTDIR}
		}
		return fswatch.PathComparer{}, nil
	}}
	if err := New(f).Add("/project/package.json/child/module.ts"); err != nil {
		t.Fatal(err)
	}
}
