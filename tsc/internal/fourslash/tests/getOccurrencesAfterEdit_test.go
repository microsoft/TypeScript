package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetOccurrencesAfterEdit(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*0*/
interface A {
    foo: string;
}
function foo(x: A) {
    x.f/*1*/oo
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, "1")
	f.GoToMarker(t, "0")
	f.Insert(t, "\n")
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, "1")
}
