package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRestArgSignatureHelp(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f(...x: any[]) { }
f(/**/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "x", IsVariadic: true, IsVariadicSet: true})
}
