package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormattingOnNestedStatements(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `{
/*1*/{
/*3*/test
}/*2*/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatSelection(t, "1", "2")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `    {`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `        test`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    }`)
}
