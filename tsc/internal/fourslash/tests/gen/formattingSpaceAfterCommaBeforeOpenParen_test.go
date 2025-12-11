package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingSpaceAfterCommaBeforeOpenParen(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `foo(a,(b))/*1*/
foo(a,(<b>c).d)/*2*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.Insert(t, ";")
	f.VerifyCurrentLineContentIs(t, "foo(a, (b));")
	f.GoToMarker(t, "2")
	f.Insert(t, ";")
	f.VerifyCurrentLineContentIs(t, "foo(a, (<b>c).d);")
}
