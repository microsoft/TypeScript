package fourslash_test

import (
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSignatureHelpUnclosedTypeArgumentHang(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `<()(/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")

	finished := make(chan struct{})
	go func() {
		defer close(finished)
		f.VerifyNoSignatureHelp(t)
	}()
	select {
	case <-finished:
	case <-time.After(10 * time.Second):
		t.Fatal("signature help request did not complete within 10 seconds")
	}
}
