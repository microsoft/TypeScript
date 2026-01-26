package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSmartIndentNamedImport(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import {/*0*/
    numbers as bn,/*1*/
    list/*2*/
} from '@bykov/basics';/*3*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "0")
	f.VerifyCurrentLineContent(t, `import {`)
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `    numbers as bn,`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    list`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `} from '@bykov/basics';`)
}
