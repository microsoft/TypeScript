package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatColonAndQMark(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class foo {/*1*/
    constructor (n?: number, m = 5, o?: string) { }/*2*/
    x:number = 1?2:3;/*3*/
}/*4*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `class foo {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    constructor(n?: number, m = 5, o?: string) { }`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    x: number = 1 ? 2 : 3;`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `}`)
}
