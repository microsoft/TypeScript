package tspath_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestRewriteExtension(t *testing.T) {
	t.Parallel()
	rewrites := []tspath.ExtensionRewrite{
		{Source: ".z", Target: ".js"},
		{Source: ".vue", Target: ".part.mjs"},
	}

	rewritten, ok := tspath.ToModuleSpecifier("./Widget.part.vue").RewriteExtension(rewrites, tspath.CaseSensitive)
	assert.Assert(t, ok)
	assert.Equal(t, rewritten, tspath.ToModuleSpecifier("./Widget.part.part.mjs"))

	rewritten, ok = tspath.ToModuleSpecifier("./Widget.part.VUE").RewriteExtension(rewrites, tspath.CaseInsensitive)
	assert.Assert(t, ok)
	assert.Equal(t, rewritten, tspath.ToModuleSpecifier("./Widget.part.part.mjs"))

	rewritten, ok = tspath.ToModuleSpecifier(".y").RewriteExtension(rewrites, tspath.CaseSensitive)
	assert.Assert(t, !ok)
	assert.Equal(t, rewritten, tspath.ToModuleSpecifier(".y"))
}

func TestRootedFilePathRewriteExtension(t *testing.T) {
	t.Parallel()
	rewrites := []tspath.ExtensionRewrite{
		{Source: ".z", Target: ".js"},
		{Source: ".vue", Target: ".mjs"},
	}
	for _, test := range []struct {
		path, expected  string
		caseSensitivity tspath.CaseSensitivity
		changed         bool
	}{
		{"/src/Widget.part.vue", "/src/Widget.part.mjs", tspath.CaseSensitive, true},
		{"/src/Widget.part.VUE", "/src/Widget.part.mjs", tspath.CaseInsensitive, true},
		{"/src/Widget.part.VUE", "/src/Widget.part.VUE", tspath.CaseSensitive, false},
		{"/src/Widget.part.IDENTITY", "/src/Widget.part.IDENTITY", tspath.CaseInsensitive, false},
		{"/src/Widget.txt", "/src/Widget.txt", tspath.CaseSensitive, false},
	} {
		file := tspath.RootedFilePathFromNormalized(test.path)
		rewritten, changed := file.RewriteExtension(rewrites, test.caseSensitivity)
		assert.Equal(t, rewritten, tspath.RootedFilePathFromNormalized(test.expected))
		assert.Equal(t, changed, test.changed)
	}
}

func TestModuleSpecifierShouldRewriteExtension(t *testing.T) {
	t.Parallel()
	rewrites := []tspath.ExtensionRewrite{{Source: ".astro", Target: ".js"}}
	for _, test := range []struct {
		specifier string
		expected  bool
	}{
		{"./Card.astro", true},
		{"../Card.astro", true},
		{"./file.ts", true},
		{"./file.d.ts", false},
		{"./file.d.astro.ts", false},
		{"./file.js", false},
		{"package.astro", false},
		{"/Card.astro", false},
	} {
		assert.Equal(t, tspath.ToModuleSpecifier(test.specifier).ShouldRewriteExtension(rewrites, tspath.CaseSensitive), test.expected)
	}
}
