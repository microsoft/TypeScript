package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnEmptyInterfaceLiteral(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/    function    foo  (  x  :    {    }    )    {    }

/*2*/foo    (  {     }   )    ;



/*3*/            interface    bar    {
/*4*/                x   :    {     }   ;
/*5*/       y  :       (         )    =>    {     }   ;
/*6*/                                                    }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `function foo(x: {}) { }`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `foo({});`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `interface bar {`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `    x: {};`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `    y: () => {};`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `}`)
}
