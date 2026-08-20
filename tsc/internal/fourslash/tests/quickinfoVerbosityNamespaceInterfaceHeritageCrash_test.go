package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// Regression test for crash when hovering with verbosity on a namespace
// containing interfaces with generic heritage clauses.
// See: https://github.com/microsoft/TypeScript/tsc/pull/3454#issuecomment-4285883568
func TestQuickinfoVerbosityNamespaceInterfaceHeritageCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
declare namespace NS/*1*/ {
    interface Config extends Record<string, any> {}
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"1": {0, 1}})
}
