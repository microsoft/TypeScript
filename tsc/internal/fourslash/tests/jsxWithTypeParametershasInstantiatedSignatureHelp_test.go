package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestJsxWithTypeParametershasInstantiatedSignatureHelp(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare namespace JSX {
    interface Element {
        render(): Element | string | false;
    }
}

function SFC<T>(_props: Record<string, T>) {
    return '';
}

(</*1*/SFC/>);
(</*2*/SFC<string>/>);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "SFC(_props: Record<string, unknown>): string"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "SFC(_props: Record<string, string>): string"})
}
