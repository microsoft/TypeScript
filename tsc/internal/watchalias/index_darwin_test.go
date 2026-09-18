//go:build darwin && (amd64 || arm64)

package watchalias

import (
	"fmt"
	"reflect"
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func nativeComparer(t testing.TB) fswatch.PathComparer {
	t.Helper()
	c, err := fswatch.PathComparerForPath(".")
	if err != nil {
		t.Fatal(err)
	}
	if c.Key("A") == "A" {
		t.Skip("test requires a case-insensitive volume")
	}
	return c
}

func TestNativeAliasesAndAncestors(t *testing.T) {
	t.Parallel()
	c := nativeComparer(t)
	f := &comparerFS{get: func(string) (fswatch.PathComparer, error) { return c, nil }}
	index := New(f)
	for _, path := range []string{"/work/straße/İ.ts", "/work/STRASSE/i\u0307.ts", "/work/straße/İ.ts"} {
		if err := index.Add(path); err != nil {
			t.Fatal(err)
		}
	}
	before := len(f.calls)
	for _, test := range []struct {
		event string
		want  []string
	}{
		{"/work/strasse/i\u0307.ts", []string{"/work/straße/İ.ts", "/work/STRASSE/i\u0307.ts"}},
		{"/work/strasse/new/tsconfig.json", []string{"/work/straße/new/tsconfig.json", "/work/STRASSE/new/tsconfig.json"}},
		{"/work/strasse/new/generated.ts", []string{"/work/straße/new/generated.ts", "/work/STRASSE/new/generated.ts"}},
	} {
		got := index.Expand(test.event)
		if got[0] != test.event {
			t.Fatalf("original event lost: %q", got)
		}
		for _, want := range test.want {
			if !slices.Contains(got, want) {
				t.Errorf("Expand(%q) = %q, missing %q", test.event, got, want)
			}
		}
		unique := make(map[string]bool)
		for _, name := range got {
			if unique[name] {
				t.Errorf("duplicate expansion: %q", got)
			}
			unique[name] = true
		}
	}
	for _, event := range []string{"/work/strasse2/new.ts", "/work/strasse/\u0131.ts"} {
		if got := index.Expand(event); slices.Contains(got, "/work/straße/İ.ts") {
			t.Errorf("unrelated file matched: %q", got)
		}
	}
	if len(f.calls) != before {
		t.Fatal("Expand probed filesystem")
	}
}

func TestVolumeComparersAreIndependent(t *testing.T) {
	t.Parallel()
	native := nativeComparer(t)
	f := &comparerFS{get: func(path string) (fswatch.PathComparer, error) {
		if path == "/sensitive" {
			return fswatch.PathComparer{}, nil
		}
		return native, nil
	}}
	index := New(f)
	for _, path := range []string{"/sensitive/straße.ts", "/insensitive/straße.ts"} {
		if err := index.Add(path); err != nil {
			t.Fatal(err)
		}
	}
	if got := index.Expand("/sensitive/STRASSE.ts"); !reflect.DeepEqual(got, []string{"/sensitive/STRASSE.ts"}) {
		t.Fatalf("sensitive volume aliased: %q", got)
	}
	if got := index.Expand("/insensitive/STRASSE.ts"); !slices.Contains(got, "/insensitive/straße.ts") {
		t.Fatalf("insensitive volume did not alias: %q", got)
	}
}

func TestNativeVolumeDoesNotFoldSensitiveAncestors(t *testing.T) {
	t.Parallel()
	native := nativeComparer(t)
	f := &comparerFS{get: func(path string) (fswatch.PathComparer, error) {
		if path == "/" {
			return fswatch.PathComparer{}, nil
		}
		return native, nil
	}}
	index := New(f)
	if err := index.Add("/CaseMount/straße.ts"); err != nil {
		t.Fatal(err)
	}
	event := "/casemount/STRASSE.ts"
	if got := index.Expand(event); !reflect.DeepEqual(got, []string{event}) {
		t.Fatalf("native volume folded its sensitive mount name: %q", got)
	}
	if got := index.Expand("/CaseMount/STRASSE.ts"); !slices.Contains(got, "/CaseMount/straße.ts") {
		t.Fatalf("native leaf alias lost: %q", got)
	}
}

func TestNativeIndexKeysMatchWholePaths(t *testing.T) {
	t.Parallel()
	native := nativeComparer(t)
	comparer := func(directory string) fswatch.PathComparer {
		if directory == "/" || directory == "/Sensitive" {
			return fswatch.PathComparer{}
		}
		return native
	}
	index := New(&comparerFS{get: func(directory string) (fswatch.PathComparer, error) {
		return comparer(directory), nil
	}})
	names := []string{
		"/Sensitive/Stra\u00dfe/FILE.ts",
		"/Sensitive/Stra\u00dfe/other.ts",
		"/Sensitive/STRASSE/\u0130.ts",
		"/Sensitive/STRASSE/i\u0307.ts",
		"/Sensitive/e\u0301/\ufb03.ts",
		"/Sensitive/\u00e9/FFI.ts",
		"/Sensitive/I\u0307/\u0301.ts",
		"/Sensitive/plain/lower.ts",
		"/Sensitive/invalid\xff/FILE.ts",
		"/Sensitive/Stra\u00dfe/invalid\xff.ts",
		"/Sensitive/nul\x00/FILE.ts",
		"/Sensitive/Stra\u00dfe/nul\x00.ts",
	}
	for _, name := range names {
		if err := index.Add(name); err != nil {
			t.Fatal(err)
		}
	}
	expected := make(map[fswatch.PathComparer]map[string][]string)
	for name := range index.added {
		c := comparer(tspath.GetDirectoryPath(name))
		if c == (fswatch.PathComparer{}) {
			continue
		}
		if expected[c] == nil {
			expected[c] = make(map[string][]string)
		}
		key := c.Key(name)
		expected[c][key] = append(expected[c][key], name)
	}
	for c, aliases := range expected {
		if len(index.aliases[c]) != len(aliases) {
			t.Fatalf("comparison key count = %d, want %d", len(index.aliases[c]), len(aliases))
		}
		for key, names := range aliases {
			got := slices.Clone(index.aliases[c][key])
			slices.Sort(got)
			slices.Sort(names)
			if !slices.Equal(got, names) {
				t.Errorf("aliases for %q = %q, want %q", key, got, names)
			}
		}
	}
}

func BenchmarkIndex(b *testing.B) {
	c := nativeComparer(b)
	for _, count := range []int{1000, 10000, 50000} {
		for _, spelling := range []string{"ascii", "unicode"} {
			names := make([]string, count)
			for i := range names {
				dir := "Package"
				if spelling == "unicode" {
					dir = "Straße"
				}
				names[i] = fmt.Sprintf("/work/%s%d/File%d.ts", dir, i/10, i)
			}
			makeIndex := func() *Index {
				f := &comparerFS{get: func(string) (fswatch.PathComparer, error) { return c, nil }}
				index := New(f)
				for _, name := range names {
					if err := index.Add(name); err != nil {
						b.Fatal(err)
					}
				}
				return index
			}
			b.Run(fmt.Sprintf("%s/%d/construct", spelling, count), func(b *testing.B) {
				b.ReportAllocs()
				for b.Loop() {
					makeIndex()
				}
			})
			index := makeIndex()
			event := fmt.Sprintf("/work/package%d/file%d.ts", (count-1)/10, count-1)
			if spelling == "unicode" {
				event = fmt.Sprintf("/work/STRASSE%d/file%d.ts", (count-1)/10, count-1)
			}
			b.Run(fmt.Sprintf("%s/%d/match", spelling, count), func(b *testing.B) {
				b.ReportAllocs()
				for b.Loop() {
					index.Expand(event)
				}
			})
			if spelling == "unicode" {
				unicodeEvent := fmt.Sprintf("/work/straße%d/file%d.ts", (count-1)/10, count-1)
				b.Run(fmt.Sprintf("%s/%d/match-native", spelling, count), func(b *testing.B) {
					b.ReportAllocs()
					for b.Loop() {
						index.Expand(unicodeEvent)
					}
				})
			}
			b.Run(fmt.Sprintf("%s/%d/unknown", spelling, count), func(b *testing.B) {
				b.ReportAllocs()
				for b.Loop() {
					index.Expand(event + "/new/generated.ts")
				}
			})
		}
	}
}

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
