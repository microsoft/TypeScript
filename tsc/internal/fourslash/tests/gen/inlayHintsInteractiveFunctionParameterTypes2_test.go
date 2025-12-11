package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsInteractiveFunctionParameterTypes2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {}
namespace N { export class Foo {} }
interface Foo {}
function f1(a = 1) {}
function f2(a = "a") {}
function f3(a = true) {}
function f4(a = { } as Foo) {}
function f5(a = <Foo>{}) {}
function f6(a = {} as const) {}
function f7(a = (({} as const))) {}
function f8(a = new C()) {}
function f9(a = new N.C()) {}
function f10(a = ((((new C()))))) {}
function f11(a = { a: 1, b: 1 }) {}
function f12(a = ((({ a: 1, b: 1 })))) {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayFunctionParameterTypeHints: true}})
}
