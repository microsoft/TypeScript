package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestArityErrorAfterSignatureHelp(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true

declare function f(x: string, y: number): any;

/*1*/f/*2*/(/*3*/)`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{})
	f.Insert(t, "\"")
	f.Insert(t, "\"")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{})
	f.VerifyCodeFixNotAvailable(t)
	f.VerifyErrorExistsBetweenMarkers(t, "1", "2")
}
