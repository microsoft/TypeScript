package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpOnOverloadsDifferentArity2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function f(s: string);
declare function f(n: number);
declare function f(s: string, b: boolean);
declare function f(n: number, b: boolean);

f(1/**/ var`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f(n: number): any", ParameterName: "n", ParameterSpan: "n: number", OverloadsCount: 4})
	f.Insert(t, ", ")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f(n: number, b: boolean): any", ParameterName: "b", ParameterSpan: "b: boolean", OverloadsCount: 4})
}
