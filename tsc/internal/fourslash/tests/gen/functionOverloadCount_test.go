package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFunctionOverloadCount(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C1 {
    public attr(): string;
    public attr(i: number): string;
    public attr(i: number, x: boolean): string;
    public attr(i?: any, x?: any) {
        return "hi";
    }
}
var i = new C1;
i.attr(/*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 3})
}
