package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionListInTemplateLiteralPartsNegatives1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `` + "`" + `/*0*/ /*1*/$ /*2*/{ /*3*/$/*4*/{ 10 + 1.1 }/*5*/ 12312/*6*/` + "`" + `

` + "`" + `asdasd$/*7*/{ 2 + 1.1 }/*8*/ 12312 /*9*/{/*10*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, f.Markers(), nil)
}
