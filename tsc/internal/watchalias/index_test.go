package watchalias

import (
	"errors"
	"fmt"
	"io/fs"
	"reflect"
	"slices"
	"strconv"
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
	assert.Assert(t, index.added == nil, "exact matching must not retain native spellings")
	assert.Assert(t, index.directoryComparers == nil)
	assert.Assert(t, index.aliases == nil)
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

func TestIdentityRegistrations(t *testing.T) {
	t.Parallel()
	index := New(vfstest.FromMap(map[string]string{}, true))
	for _, name := range []string{"/project/a.ts", "/project/b.ts"} {
		assert.NilError(t, index.Register(Registration{Name: name, Realpath: name, Dependency: true}))
	}
	event := "/project/a.ts"
	assert.DeepEqual(t, index.Expand(event), []string{event})
	changes := index.Match(map[string]fswatch.EventKind{event: fswatch.EventUpdate})
	assert.DeepEqual(t, changes.Affected, []string{event})
	assert.Assert(t, !changes.NamespaceChanged)
	changes = index.Match(map[string]fswatch.EventKind{"/project": fswatch.EventDelete})
	assert.Equal(t, changes.Changes["/project/a.ts"], fswatch.EventDelete)
	assert.Equal(t, changes.Changes["/project/b.ts"], fswatch.EventDelete)
}

func TestRegistrationAtSharedEndpoint(t *testing.T) {
	t.Parallel()
	index := New(vfstest.FromMap(map[string]string{}, true))
	for _, registration := range []Registration{
		{Name: "/logical/a.ts", Realpath: "/shared/file.ts", Dependency: true},
		{Name: "/shared/file.ts", Realpath: "/shared/file.ts", Dependency: true},
		{Name: "/other/a.ts", Realpath: "/shared/file.ts", Dependency: true},
	} {
		assert.NilError(t, index.Register(registration))
	}
	for _, event := range []string{"/logical/a.ts", "/shared/file.ts", "/other/a.ts"} {
		result := index.Match(map[string]fswatch.EventKind{event: fswatch.EventDelete})
		for _, name := range []string{"/logical/a.ts", "/shared/file.ts", "/other/a.ts"} {
			assert.Equal(t, result.Changes[name], fswatch.EventDelete)
			assert.Assert(t, slices.Contains(result.Affected, name))
		}
	}
}

func TestRegistrationAtCanonicalEndpoint(t *testing.T) {
	t.Parallel()
	index := New(vfstest.FromMap(map[string]string{}, false))
	assert.NilError(t, index.Register(Registration{Name: "/project/A.ts", Realpath: "/project/a.ts", Dependency: true}))
	got := index.Expand("/PROJECT/a.ts")
	assert.Assert(t, slices.Contains(got, "/project/A.ts"))
	assert.Assert(t, slices.Contains(got, "/project/a.ts"))
}

func TestRegistrationAtCanonicalParent(t *testing.T) {
	t.Parallel()
	index := New(vfstest.FromMap(map[string]string{}, false))
	names := []string{"/project/SRC/a.ts", "/PROJECT/src/b.ts"}
	for _, name := range names {
		assert.NilError(t, index.Register(Registration{Name: name, Realpath: name, Dependency: true}))
	}
	result := index.Match(map[string]fswatch.EventKind{"/Project/Src": fswatch.EventDelete})
	slices.Sort(result.Affected)
	slices.Sort(names)
	assert.DeepEqual(t, result.Affected, names)
	for _, name := range names {
		assert.Equal(t, result.Changes[name], fswatch.EventDelete)
	}
}

func BenchmarkRegisteredIndex(b *testing.B) {
	for _, count := range []int{1000, 10000} {
		for _, mapped := range []bool{false, true} {
			b.Run(fmt.Sprintf("%d/mapped=%v", count, mapped), func(b *testing.B) {
				makeIndex := func() *Index {
					index := New(vfstest.FromMap(map[string]string{}, true))
					for i := range count {
						name := "/project/src/file" + strconv.Itoa(i) + ".ts"
						resolved := name
						if mapped && i%100 == 0 {
							resolved = "/packages/file" + strconv.Itoa(i) + ".ts"
						}
						if err := index.Register(Registration{Name: name, Realpath: resolved, Dependency: true}); err != nil {
							b.Fatal(err)
						}
					}
					return index
				}
				b.Run("construct", func(b *testing.B) {
					b.ReportAllocs()
					for b.Loop() {
						makeIndex()
					}
				})
				index := makeIndex()
				for _, event := range []string{"/project/src/file0.ts", "/project/src/file1.ts", "/project/src"} {
					b.Run(event, func(b *testing.B) {
						events := map[string]fswatch.EventKind{event: fswatch.EventUpdate}
						b.ReportAllocs()
						for b.Loop() {
							index.Match(events)
						}
					})
				}
			})
		}
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
