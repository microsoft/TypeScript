package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpLeadingRestTuple(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export function leading(...args: [...names: string[], allCaps: boolean]): void {
}

leading(/*1*/);
leading("ok", /*2*/);
leading("ok", "ok", /*3*/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "leading(...names: string[], allCaps: boolean): void", ParameterCount: 2, OverloadsCount: 1, IsVariadic: true, IsVariadicSet: true})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "leading(...names: string[], allCaps: boolean): void", ParameterCount: 2, OverloadsCount: 1, IsVariadic: true, IsVariadicSet: true})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "leading(...names: string[], allCaps: boolean): void", ParameterCount: 2, OverloadsCount: 1, IsVariadic: true, IsVariadicSet: true})
}
