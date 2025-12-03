package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsFunctionParameterTypes1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type F1 = (a: string, b: number) => void
const f1: F1 = (a, b) => { }
const f2: F1 = (a, b: number) => { }
function foo1 (cb: (a: string) => void) {}
foo1((a) => { })
function foo2 (cb: (a: Exclude<1 | 2 | 3, 1>) => void) {}
foo2((a) => { })
function foo3 (a: (b: (c: (d: Exclude<1 | 2 | 3, 1>) => void) => void) => void) {}
foo3(a => {
    a(d => {})
})
function foo4<T>(v: T, a: (v: T) => void) {}
foo4(1, a => { })
type F2 = (a: {
    a: number
    b: string
}) => void
const foo5: F2 = (a) => { }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayFunctionParameterTypeHints: true}})
}
