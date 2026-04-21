package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Regression test for crash when hovering with verbosity on a namespace
// containing an interface that extends an intersection type alias.
// The base type resolves to an intersection (TypeFlagsIntersection),
// causing Type.Target() to panic with "Unhandled case in Type.Target".
// See: https://github.com/microsoft/typescript-go/issues/3466
func TestQuickinfoVerbosityNamespaceInterfaceHeritageIntersectionCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
declare namespace NS/*1*/ {
    type Mixin = { a: string } & { b: number };
    interface Config extends Mixin {}
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"1": {0, 1}})
}
