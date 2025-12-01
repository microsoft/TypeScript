package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpExpandedRestTuples(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export function complex(item: string, another: string, ...rest: [] | [settings: object, errorHandler: (err: Error) => void] | [errorHandler: (err: Error) => void, ...mixins: object[]]) {
    
}

complex(/*1*/);
complex("ok", "ok", /*2*/);
complex("ok", "ok", e => void e, {}, /*3*/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "complex(item: string, another: string): void", ParameterCount: 2, ParameterName: "item", ParameterSpan: "item: string", OverloadsCount: 3, IsVariadic: false, IsVariadicSet: true})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "complex(item: string, another: string, settings: object, errorHandler: (err: Error) => void): void", ParameterCount: 4, ParameterName: "settings", ParameterSpan: "settings: object", OverloadsCount: 3, IsVariadic: false, IsVariadicSet: true})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "complex(item: string, another: string, errorHandler: (err: Error) => void, ...mixins: object[]): void", OverloadsCount: 3, IsVariadic: true, IsVariadicSet: true})
}
