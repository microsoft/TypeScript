package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocLink4(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare class I {
  /** {@link I} */
  bar/*1*/(): void
}
/** {@link I} */
var n/*2*/ = 1
/**
 * A real, very serious {@link I to an interface}. Right there.
 * @param x one {@link Pos here too}
 */
function f(x) {
}
f/*3*/()
type Pos = [number, number]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
