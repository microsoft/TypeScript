package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingMultilineCommentsWithTabs1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var f = function (j) {

	switch (j) {
		case 1:
/*1*/				/* when current checkbox has focus, Firefox has changed check state already
/*2*/				on SPACE bar press only
/*3*/				IE does not have issue, use the CSS class
/*4*/				input:focus[type=checkbox] (z-index = 31290)
/*5*/				to determine whether checkbox has focus or not
				*/
			break;
		case 2:
		break;
	}
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `            /* when current checkbox has focus, Firefox has changed check state already`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `            on SPACE bar press only`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `            IE does not have issue, use the CSS class`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `            input:focus[type=checkbox] (z-index = 31290)`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `            to determine whether checkbox has focus or not`)
}
