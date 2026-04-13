package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Tests that expanded interface members are ordered correctly:
// index signatures, then construct signatures, then call signatures, then properties.
func TestQuickinfoVerbosityInterfaceMemberOrdering(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
interface Callable/*1*/ {
    (x: string): boolean;
    new (x: string): Callable;
    [key: string]: any;
    name: string;
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"1": {0, 1}})
}
