package tspath

import (
	"strings"
	"testing"

	"gotest.tools/v3/assert"
)

// TestResolveLeadingDotSegments checks the leading "./" and "../" fast path in
// ResolveFile and ResolveDirectory against concatenation followed by full
// normalization, over every combination of a few segment kinds and roots.
func TestResolveLeadingDotSegments(t *testing.T) {
	t.Parallel()

	directories := []string{
		"/",
		"/a",
		"/a/b/c",
		"c:/",
		"c:/a/b",
		"//server/share",
		"//server/share/a/b",
		"file:///c:/a/b",
		"http://server/base/a",
		"^/untitled/ts-nul-authority/a/b",
	}
	segments := []string{".", "..", "x", "y.ts", ""}

	var specs []string
	var build func(prefix []string)
	build = func(prefix []string) {
		if len(prefix) > 0 {
			specs = append(specs, strings.Join(prefix, "/"))
		}
		if len(prefix) == 5 {
			return
		}
		for _, segment := range segments {
			build(append(prefix, segment))
		}
	}
	build(nil)

	fastPathHits := 0
	for _, directory := range directories {
		d := RootedDirectoryPathFromNormalized(directory)
		for _, spec := range specs {
			if !isNormalizedSlashesRelativePath(spec) {
				continue
			}
			if _, ok := appendPathWithLeadingDotSegments(d, spec); ok {
				fastPathHits++
			}
			expected, expectedPanic := capturePanic(func() string {
				return string(rootedFilePathFromResolved(getNormalizedAbsolutePathFromNormalizedSlashes(appendPathToDirectory(d, spec))))
			})
			file, filePanic := capturePanic(func() string { return d.ResolveFile(spec).AsString() })
			dir, dirPanic := capturePanic(func() string { return d.ResolveDirectory(spec).AsString() })
			assert.Equal(t, file, expected, "ResolveFile(%q, %q)", directory, spec)
			assert.Equal(t, filePanic, expectedPanic, "ResolveFile(%q, %q) panic", directory, spec)
			assert.Equal(t, dir, expected, "ResolveDirectory(%q, %q)", directory, spec)
			assert.Equal(t, dirPanic, expectedPanic, "ResolveDirectory(%q, %q) panic", directory, spec)
		}
	}
	assert.Assert(t, fastPathHits > 1000, "fast path hits: %d", fastPathHits)

	root := RootedDirectoryPathFromNormalized("/a/b")
	for spec, ok := range map[string]bool{
		"./x/y.ts":     true,
		"../x":         true,
		"./../.././x":  true,
		"../../x":      true,
		"../../../x":   false, // ascends past the root
		"./x/../y":     false, // dot segment after the leading ones
		"x/./y":        false,
		"./":           false,
		"..":           false,
		"./x//y":       false,
		"./x/y/":       false, // trailing separator needs normalization
		"../x/y/./":    false,
		"../x/y/../z/": false,
	} {
		_, got := appendPathWithLeadingDotSegments(root, spec)
		assert.Equal(t, got, ok, "%q", spec)
	}
}

func capturePanic(f func() string) (result string, panicked bool) {
	defer func() {
		if recover() != nil {
			panicked = true
		}
	}()
	return f(), false
}
