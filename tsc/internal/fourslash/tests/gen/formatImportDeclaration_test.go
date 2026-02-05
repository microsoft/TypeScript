package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatImportDeclaration(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace Foo {/*1*/
}/*2*/

import bar  =    Foo;/*3*/

import bar2=Foo;/*4*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `namespace Foo {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `import bar = Foo;`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `import bar2 = Foo;`)
}
