package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsInteractiveOverloadCall(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Call {
    (a: number): void
    (b: number, c: number): void
    new (d: number): Call
}
declare const call: Call;
call(1);
call(1, 2);
new call(1);
declare function foo(w: number): void
declare function foo(a: number, b: number): void;
declare function foo(a: number | undefined, b: number | undefined): void;
foo(1)
foo(1, 2)
class Class {
    constructor(a: number);
    constructor(b: number, c: number);
    constructor(b: number, c?: number) { }
}
new Class(1)
new Class(1, 2)`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsLiterals}})
}
