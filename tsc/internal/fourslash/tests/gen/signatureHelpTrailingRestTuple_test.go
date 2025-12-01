package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpTrailingRestTuple(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export function leading(allCaps: boolean, ...names: string[]): void {
}

leading(/*1*/);
leading(false, /*2*/);
leading(false, "ok", /*3*/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "leading(allCaps: boolean, ...names: string[]): void", ParameterCount: 2, ParameterName: "allCaps", ParameterSpan: "allCaps: boolean", OverloadsCount: 1, IsVariadic: true, IsVariadicSet: true})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "leading(allCaps: boolean, ...names: string[]): void", ParameterCount: 2, ParameterName: "names", ParameterSpan: "...names: string[]", OverloadsCount: 1, IsVariadic: true, IsVariadicSet: true})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "leading(allCaps: boolean, ...names: string[]): void", ParameterCount: 2, ParameterName: "names", ParameterSpan: "...names: string[]", OverloadsCount: 1, IsVariadic: true, IsVariadicSet: true})
}
