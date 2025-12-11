package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpFunctionOverload(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function functionOverload();
function functionOverload(test: string);
function functionOverload(test?: string) { }
functionOverload(/*functionOverload1*/);
functionOverload(""/*functionOverload2*/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "functionOverload1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "functionOverload(): any", ParameterCount: 0, OverloadsCount: 2})
	f.GoToMarker(t, "functionOverload2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "functionOverload(test: string): any", ParameterName: "test", ParameterSpan: "test: string", OverloadsCount: 2})
}
