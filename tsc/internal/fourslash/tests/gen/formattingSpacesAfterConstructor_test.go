package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingSpacesAfterConstructor(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/class test { constructor                   () { } }
/*2*/class test { constructor                   () { } }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `class test { constructor() { } }`)
	opts319 := f.GetOptions()
	opts319.FormatCodeSettings.InsertSpaceAfterConstructor = core.TSTrue
	f.Configure(t, opts319)
	f.FormatDocument(t, "")
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `class test { constructor () { } }`)
}
