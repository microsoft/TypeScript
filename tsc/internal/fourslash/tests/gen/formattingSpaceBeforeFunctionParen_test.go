package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingSpaceBeforeFunctionParen(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/function foo() { }
/*2*/function boo  () { }
/*3*/var bar = function foo() { };
/*4*/var foo = { bar() { } };
/*5*/function tmpl <T> () { }
/*6*/var f = function*() { };
/*7*/function* g () { }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts333 := f.GetOptions()
	opts333.FormatCodeSettings.InsertSpaceBeforeFunctionParenthesis = core.TSTrue
	f.Configure(t, opts333)
	opts414 := f.GetOptions()
	opts414.FormatCodeSettings.InsertSpaceAfterFunctionKeywordForAnonymousFunctions = core.TSFalse
	f.Configure(t, opts414)
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `function foo () { }`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `function boo () { }`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `var bar = function foo () { };`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `var foo = { bar () { } };`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `function tmpl<T> () { }`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `var f = function*() { };`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `function* g () { }`)
}
