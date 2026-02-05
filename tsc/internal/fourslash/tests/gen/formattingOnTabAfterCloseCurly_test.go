package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnTabAfterCloseCurly(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace Tools {/*1*/
    export enum NodeType {/*2*/
        Error,/*3*/
        Comment,/*4*/
    }   /*5*/
    export enum foob/*6*/
    {
        Blah=1, Bleah=2/*7*/
    }/*8*/
}/*9*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `namespace Tools {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    export enum NodeType {`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `        Error,`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `        Comment,`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    export enum foob {`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `        Blah = 1, Bleah = 2`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `}`)
}
