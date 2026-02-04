package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesIfElse5(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `if/*1*/ (true) {
    if/*2*/ (false) {
    }
    else/*3*/ {
    }
    if/*4*/ (true) {
    }
    else/*5*/ {
        if/*6*/ (false)
            if/*7*/ (true)
                var x = undefined;
    }
}
else/*8*/            if (null) {
}
else/*9*/ /* whar garbl */ if/*10*/ (undefined) {
}
else/*11*/
if/*12*/ (false) {
}
else/*13*/ { }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Markers())...)
}
