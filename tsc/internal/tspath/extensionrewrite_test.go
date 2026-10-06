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
		{Source: ".y.z", Target: ".mjs"},
	}

	rewritten, ok := tspath.ToModuleSpecifier("./Widget.y.z").RewriteExtension(rewrites, tspath.CaseSensitive)
	assert.Assert(t, ok)
	assert.Equal(t, rewritten, tspath.ToModuleSpecifier("./Widget.mjs"))

	rewritten, ok = tspath.ToModuleSpecifier("./Widget.Y.Z").RewriteExtension(rewrites, tspath.CaseInsensitive)
	assert.Assert(t, ok)
	assert.Equal(t, rewritten, tspath.ToModuleSpecifier("./Widget.mjs"))

	rewritten, ok = tspath.ToModuleSpecifier(".y").RewriteExtension(rewrites, tspath.CaseSensitive)
	assert.Assert(t, !ok)
	assert.Equal(t, rewritten, tspath.ToModuleSpecifier(".y"))

	rewrites = append(rewrites, tspath.ExtensionRewrite{Source: ".identity.y.z", Target: ".identity.y.z"})
	rewritten, ok = tspath.ToModuleSpecifier("./Widget.IDENTITY.Y.Z").RewriteExtension(rewrites, tspath.CaseInsensitive)
	assert.Assert(t, !ok)
	assert.Equal(t, rewritten, tspath.ToModuleSpecifier("./Widget.IDENTITY.Y.Z"))
	assert.Assert(t, !tspath.ToModuleSpecifier("./Widget.identity.y.z").ShouldRewriteExtension(rewrites, tspath.CaseSensitive))
}

func TestRootedFilePathRewriteExtension(t *testing.T) {
	t.Parallel()
	rewrites := []tspath.ExtensionRewrite{
		{Source: ".z", Target: ".js"},
		{Source: ".y.z", Target: ".mjs"},
		{Source: ".identity.y.z", Target: ".identity.y.z"},
	}
	for _, test := range []struct {
		path, expected  string
		caseSensitivity tspath.CaseSensitivity
		changed         bool
	}{
		{"/src/Widget.y.z", "/src/Widget.mjs", tspath.CaseSensitive, true},
		{"/src/Widget.Y.Z", "/src/Widget.mjs", tspath.CaseInsensitive, true},
		{"/src/Widget.Y.Z", "/src/Widget.Y.Z", tspath.CaseSensitive, false},
		{"/src/Widget.IDENTITY.Y.Z", "/src/Widget.IDENTITY.Y.Z", tspath.CaseInsensitive, false},
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
