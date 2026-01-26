package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSpaceBeforeAndAfterBinaryOperators(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `let i = 0;
/*1*/(i++,i++);
/*2*/(i++,++i);
/*3*/(1,2);
/*4*/(i++,2);
/*5*/(i++,i++,++i,i--,2);
let s = 'foo';
/*6*/for (var i = 0,ii = 2; i < s.length; ii++,i++) {
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `(i++, i++);`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `(i++, ++i);`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `(1, 2);`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `(i++, 2);`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `(i++, i++, ++i, i--, 2);`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `for (var i = 0, ii = 2; i < s.length; ii++, i++) {`)
}
