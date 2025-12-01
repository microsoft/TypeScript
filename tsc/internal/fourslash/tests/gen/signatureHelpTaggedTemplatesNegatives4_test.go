package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpTaggedTemplatesNegatives4(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(strs, ...rest) {
}

/*1*/fo/*2*/o /*3*/` + "`" + `` + "`" + `/*4*/  /*5*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyNoSignatureHelpForMarkers(t, f.MarkerNames()...)
}
