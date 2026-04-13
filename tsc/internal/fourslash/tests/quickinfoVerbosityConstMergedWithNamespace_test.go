package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Tests namespace expansion where a const variable is merged with a namespace (function+namespace pattern).
func TestQuickinfoVerbosityConstMergedWithNamespace(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
declare function create/*1*/(x: string): number;
declare namespace create/*2*/ {
    var version: string;
    function reset(): void;
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{
		"1": {0, 1},
		"2": {0, 1},
	})
}
