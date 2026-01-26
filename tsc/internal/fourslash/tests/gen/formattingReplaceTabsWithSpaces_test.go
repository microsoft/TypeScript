package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingReplaceTabsWithSpaces(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module Foo {
/*1*/				class Test { }
/*2*/			class Test { }
/*3*/class Test { }
/*4*/			 class Test { }
/*5*/   class Test { }
/*6*/    class Test { }
/*7*/     class Test { }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `    class Test { }`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    class Test { }`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    class Test { }`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `    class Test { }`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `    class Test { }`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    class Test { }`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `    class Test { }`)
}
