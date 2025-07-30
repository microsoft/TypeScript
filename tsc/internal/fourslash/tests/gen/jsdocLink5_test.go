package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocLink5(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function g() { }
/**
 * {@link g()} {@link g() } {@link g ()} {@link g () 0} {@link g()1} {@link g() 2}
 * {@link u()} {@link u() } {@link u ()} {@link u () 0} {@link u()1} {@link u() 2}
 */
function f(x) {
}
f/*3*/()`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
