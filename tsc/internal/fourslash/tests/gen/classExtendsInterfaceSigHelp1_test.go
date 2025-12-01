package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestClassExtendsInterfaceSigHelp1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {
    public foo(x: string);
    public foo(x: number);
    public foo(x: any) { return x; }
}
interface I extends C {
    other(x: any): any;
}
var i: I;
i.foo(/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterSpan: "x: string", OverloadsCount: 2})
}
