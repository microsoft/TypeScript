package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormattingSpaceBetweenOptionalChaining(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/a    ?.    b   ?.   c   .   d;
/*2*/o    .  m()   ?.   length;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `a?.b?.c.d;`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `o.m()?.length;`)
}
