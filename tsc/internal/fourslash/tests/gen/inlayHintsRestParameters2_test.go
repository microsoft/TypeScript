package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsRestParameters2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(a: unknown, b: unknown, c: unknown) { }
function foo1(...x: [number, number | undefined]) {
    foo(...x, 3);
}
function foo2(...x: []) {
    foo(...x, 1, 2, 3);
}
function foo3(...x: [number, number?]) {
    foo(1, ...x);
}
function foo4(...x: [number, number?]) {
    foo(...x, 3);
}
function foo5(...x: [number, number]) {
    foo(...x, 3);
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsAll})
}
