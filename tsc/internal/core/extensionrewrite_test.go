package core_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"gotest.tools/v3/assert"
)

func TestRewriteExtension(t *testing.T) {
	t.Parallel()
	rewrites := []core.ExtensionRewrite{
		{Source: ".z", Target: ".js"},
		{Source: ".y.z", Target: ".mjs"},
	}

	rewritten, ok := core.RewriteExtension("./Widget.y.z", rewrites, false)
	assert.Assert(t, ok)
	assert.Equal(t, rewritten, "./Widget.mjs")

	rewritten, ok = core.RewriteExtension("./Widget.Y.Z", rewrites, true)
	assert.Assert(t, ok)
	assert.Equal(t, rewritten, "./Widget.mjs")

	rewritten, ok = core.RewriteExtension(".y", rewrites, false)
	assert.Assert(t, !ok)
	assert.Equal(t, rewritten, ".y")

	rewrites = append(rewrites, core.ExtensionRewrite{Source: ".identity.y.z", Target: ".identity.y.z"})
	rewritten, ok = core.RewriteExtension("./Widget.IDENTITY.Y.Z", rewrites, true)
	assert.Assert(t, !ok)
	assert.Equal(t, rewritten, "./Widget.IDENTITY.Y.Z")
	assert.Assert(t, !core.ShouldRewriteModuleSpecifierWithExtensions(
		"./Widget.identity.y.z", &core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue}, rewrites, false,
	))
}
