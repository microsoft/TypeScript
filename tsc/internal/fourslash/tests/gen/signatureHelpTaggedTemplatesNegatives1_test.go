package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpTaggedTemplatesNegatives1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f(templateStrings, x, y, z) { return 10; }
function g(templateStrings, x, y, z) { return ""; }

/*1*/f/*2*/ /*3*/` + "`" + ` qwerty ${ 123 } asdf ${   41234   }  zxcvb ${ g ` + "`" + `    ` + "`" + ` }     ` + "`" + `/*4*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyNoSignatureHelpForMarkers(t, f.MarkerNames()...)
}
