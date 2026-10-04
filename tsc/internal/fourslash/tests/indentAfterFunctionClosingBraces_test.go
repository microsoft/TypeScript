package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestIndentAfterFunctionClosingBraces(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class foo {
    public f() {
        return 0;
    /*1*/}/*2*/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "2")
	f.InsertLine(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `    }`)
}
