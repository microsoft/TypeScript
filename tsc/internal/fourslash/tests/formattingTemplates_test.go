package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormattingTemplates(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `String.call ` + "`" + `${123}` + "`" + `/*1*/
String.call ` + "`" + `${123} ${456}` + "`" + `/*2*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.Insert(t, ";")
	f.VerifyCurrentLineContent(t, "String.call`${123}`;")
	f.GoToMarker(t, "2")
	f.Insert(t, ";")
	f.VerifyCurrentLineContent(t, "String.call`${123} ${456}`;")
}
