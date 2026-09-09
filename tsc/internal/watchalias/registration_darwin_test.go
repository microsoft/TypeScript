//go:build darwin && (amd64 || arm64)

package watchalias

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestPhysicalRegistrationNativeEndpoints(t *testing.T) {
	t.Parallel()
	native := nativeComparer(t)
	f := &comparerFS{
		FS: vfstest.FromMap(map[string]string{}, false),
		get: func(path string) (fswatch.PathComparer, error) {
			if path == "/" {
				return fswatch.PathComparer{}, nil
			}
			return native, nil
		},
	}
	index := New(f)
	assert.NilError(t, index.Register(Registration{Name: "/Logical/dep.ts", Realpath: "/CaseMount/straße/ſ.ts", Dependency: true}))
	assert.NilError(t, index.Register(Registration{Name: "/Logical", Realpath: "/CaseMount/straße", Directory: true}))
	queries := len(f.calls)
	assert.Assert(t, slices.Contains(index.Expand("/CaseMount/STRASSE/s.ts"), "/Logical/dep.ts"))
	assert.Assert(t, slices.Contains(index.Expand("/CaseMount/STRASSE/new.ts"), "/Logical/new.ts"))
	assert.Assert(t, !slices.Contains(index.Expand("/casemount/STRASSE/s.ts"), "/Logical/dep.ts"))
	changes := index.Match(map[string]fswatch.EventKind{"/casemount/STRASSE": fswatch.EventDelete})
	_, matched := changes.Changes["/Logical/dep.ts"]
	assert.Assert(t, !matched, "the physical endpoint's sensitive ancestors must match")
	changes = index.Match(map[string]fswatch.EventKind{"/CaseMount/STRASSE": fswatch.EventDelete})
	assert.Equal(t, changes.Changes["/Logical/dep.ts"], fswatch.EventDelete)
	assert.Equal(t, len(f.calls), queries, "matching must not probe the filesystem")
}

func TestPhysicalRegistrationSensitiveSubtrees(t *testing.T) {
	t.Parallel()
	native := nativeComparer(t)
	f := &comparerFS{
		FS: vfstest.FromMap(map[string]string{}, false),
		get: func(path string) (fswatch.PathComparer, error) {
			if path == "/" || path == "/Sensitive" {
				return fswatch.PathComparer{}, nil
			}
			return native, nil
		},
	}
	index := New(f)
	assert.NilError(t, index.Register(Registration{Name: "/logical/one.ts", Realpath: "/Sensitive/Mount/a.ts", Dependency: true}))
	assert.NilError(t, index.Register(Registration{Name: "/logical/two.ts", Realpath: "/Sensitive/mount/a.ts", Dependency: true}))
	for _, test := range []struct{ directory, affected, unaffected string }{
		{"/Sensitive/Mount", "/logical/one.ts", "/logical/two.ts"},
		{"/Sensitive/mount", "/logical/two.ts", "/logical/one.ts"},
	} {
		matches := index.Match(map[string]fswatch.EventKind{test.directory: fswatch.EventDelete})
		assert.Equal(t, matches.Changes[test.affected], fswatch.EventDelete)
		_, extra := matches.Changes[test.unaffected]
		assert.Assert(t, !extra, "compiler keys must not merge volume-sensitive physical subtrees")
	}
}
