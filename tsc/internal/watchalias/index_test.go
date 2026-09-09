package watchalias

import (
	"errors"
	"io/fs"
	"reflect"
	"slices"
	"syscall"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
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

func TestPhysicalRegistrations(t *testing.T) {
	t.Parallel()
	for _, sensitive := range []bool{false, true} {
		index := New(vfstest.FromMap(map[string]string{}, sensitive))
		for _, registration := range []Registration{
			{Name: "/var", Realpath: "/private", Directory: true},
			{Name: "/var/project/node_modules/pkg", Realpath: "/packages/one", Directory: true},
			{Name: "/var/project/node_modules/pkg/a.ts", Realpath: "/packages/one/a.ts", Dependency: true},
			{Name: "/other/link.ts", Realpath: "/packages/one/a.ts", Dependency: true},
			{Name: "/unrelated/a.ts", Realpath: "/unrelated/a.ts", Dependency: true},
		} {
			assert.NilError(t, index.Register(registration))
			assert.Assert(t, index.Covers(registration))
		}
		assert.Assert(t, !index.Covers(Registration{Name: "/other/link.ts", Realpath: "/packages/two/a.ts", Dependency: true}))
		for _, name := range []string{"/packages/one/a.ts", "/var/project/node_modules/pkg/a.ts", "/private/project/node_modules/pkg/a.ts"} {
			result := index.Match(map[string]fswatch.EventKind{name: fswatch.EventUpdate})
			assert.Equal(t, result.Changes["/var/project/node_modules/pkg/a.ts"], fswatch.EventUpdate)
			assert.Equal(t, result.Changes["/other/link.ts"], fswatch.EventUpdate)
			assert.Assert(t, !slices.Contains(result.Affected, "/unrelated/a.ts"))
		}
		result := index.Match(map[string]fswatch.EventKind{
			"/packages":          fswatch.EventDelete,
			"/packages/one":      fswatch.EventDelete,
			"/packages/one/a.ts": fswatch.EventUpdate,
		})
		assert.Equal(t, result.Changes["/other/link.ts"], fswatch.EventDelete)
		assert.Equal(t, result.Changes["/var/project/node_modules/pkg/a.ts"], fswatch.EventDelete)
		assert.Assert(t, !slices.Contains(result.Affected, "/unrelated/a.ts"))
		assert.Assert(t, !slices.Contains(index.Expand("/packages/one-other/a.ts"), "/other/link.ts"))
		assert.Assert(t, slices.Contains(index.Expand("/packages/one/new.ts"), "/var/project/node_modules/pkg/new.ts"))
		got := index.Expand("/PACKAGES/ONE/a.ts")
		assert.Equal(t, slices.Contains(got, "/other/link.ts"), !sensitive)
	}
}

func TestPhysicalRegistrationsDoNotInferDirectoryLinks(t *testing.T) {
	t.Parallel()
	index := New(vfstest.FromMap(map[string]string{}, true))
	assert.NilError(t, index.Register(Registration{Name: "/logical/file.ts", Realpath: "/physical/other.ts", Dependency: true}))
	assert.DeepEqual(t, index.Expand("/physical/new.ts"), []string{"/physical/new.ts"})
	result := index.Match(map[string]fswatch.EventKind{"/physical": fswatch.EventDelete})
	assert.Equal(t, result.Changes["/logical/file.ts"], fswatch.EventDelete)
}

func TestPhysicalRegistrationExpansionIsFinite(t *testing.T) {
	t.Parallel()
	index := New(vfstest.FromMap(map[string]string{}, true))
	assert.NilError(t, index.Register(Registration{Name: "/a/link", Realpath: "/a", Directory: true}))
	result := index.Expand("/a/link/link/file.ts")
	assert.Assert(t, len(result) < 10, "explicit endpoint matching must not recursively rewrite directory links")
}

func TestPhysicalRegistrationRootEndpoints(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		logical, physical, event, expected string
	}{
		{"/link", "/", "/new.ts", "/link/new.ts"},
		{"/", "/physical", "/physical/new.ts", "/new.ts"},
		{"C:/link", "D:/", "D:/new.ts", "C:/link/new.ts"},
		{"C:/", "D:/physical", "D:/physical/new.ts", "C:/new.ts"},
	} {
		t.Run(test.logical+"->"+test.physical, func(t *testing.T) {
			t.Parallel()
			index := New(vfstest.FromMap(map[string]string{}, true))
			assert.NilError(t, index.Register(Registration{Name: test.logical, Realpath: test.physical, Directory: true}))
			assert.Assert(t, slices.Contains(index.Expand(test.event), test.expected))
		})
	}
}

func TestPhysicalRegistrationEmptyDirectoryUpdate(t *testing.T) {
	t.Parallel()
	index := New(vfstest.FromMap(map[string]string{}, true))
	assert.NilError(t, index.Register(Registration{Name: "/logical", Realpath: "/physical", Directory: true}))
	result := index.Match(map[string]fswatch.EventKind{"/physical": fswatch.EventUpdate})
	assert.Assert(t, result.NamespaceChanged)
	assert.DeepEqual(t, result.Affected, []string{"/logical"})
}

func TestPhysicalRegistrationMatchExpanded(t *testing.T) {
	t.Parallel()
	index := New(vfstest.FromMap(map[string]string{}, true))
	assert.NilError(t, index.Register(Registration{Name: "/a/link", Realpath: "/a", Directory: true}))
	assert.NilError(t, index.Register(Registration{Name: "/a/link/file.ts", Realpath: "/a/file.ts", Dependency: true}))
	events := make(map[string]fswatch.EventKind)
	for _, name := range index.Expand("/a/file.ts") {
		events[name] = fswatch.EventUpdate
	}
	result := index.MatchExpanded(events)
	assert.DeepEqual(t, result.Changes, events)
	assert.Assert(t, slices.Contains(result.Affected, "/a/link/file.ts"))

	events = map[string]fswatch.EventKind{"/a": fswatch.EventDelete}
	result = index.MatchExpanded(events)
	assert.Equal(t, result.Changes["/a/link/file.ts"], fswatch.EventDelete)
	assert.Equal(t, len(events), 1, "matching must not mutate its input")
}
