package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpWithInterfaceAsIdentifier(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface C {
    (): void;
}
C(/*1*/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyNoSignatureHelpForMarkers(t, "1")
}
