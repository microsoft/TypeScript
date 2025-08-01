package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForContextuallyTypedArrowFunctionInSuperCall(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A<T1, T2> {
    constructor(private map: (value: T1) => T2) {

    }
}

class B extends A<number, string> {
    constructor() { super(va/*1*/lue => String(va/*2*/lue.toExpone/*3*/ntial())); }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) value: number", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) value: number", "")
	f.VerifyQuickInfoAt(t, "3", "(method) Number.toExponential(fractionDigits?: number): string", "Returns a string containing a number represented in exponential notation.")
}
