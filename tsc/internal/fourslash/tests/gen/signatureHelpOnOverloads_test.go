package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpOnOverloads(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function fn(x: string);
declare function fn(x: string, y: number);
fn(/*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "fn(x: string): any", ParameterName: "x", ParameterSpan: "x: string", OverloadsCount: 2})
	f.Insert(t, "'',")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "fn(x: string, y: number): any", ParameterName: "y", ParameterSpan: "y: number", OverloadsCount: 2})
}
