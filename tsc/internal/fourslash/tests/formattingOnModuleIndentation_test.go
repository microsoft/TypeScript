package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormattingOnModuleIndentation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `  namespace     Foo    {
    export    namespace    A  .   B  .   C     {      }/**/
               }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToBOF(t)
	f.VerifyCurrentLineContent(t, `namespace Foo {`)
	f.GoToMarker(t, "")
	f.VerifyCurrentLineContent(t, `    export namespace A.B.C { }`)
	f.GoToEOF(t)
	f.VerifyCurrentLineContent(t, `}`)
}
