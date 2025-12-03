package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpTaggedTemplatesNegatives3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(strs, ...rest) {
}

/*1*/fo/*2*/o /*3*/` + "`" + `abcd${0 + 1}abcd{1 + 1}abcd` + "`" + `/*4*/  /*5*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoSignatureHelpForMarkers(t, f.MarkerNames()...)
}
