package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoLinkCodePlain(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export class C {
     /**
      * @deprecated Use {@linkplain PerspectiveCamera#setFocalLength .setFocalLength()} and {@linkcode PerspectiveCamera#filmGauge .filmGauge} instead.
      */
    m() { }
}
new C().m/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineHover(t)
}
