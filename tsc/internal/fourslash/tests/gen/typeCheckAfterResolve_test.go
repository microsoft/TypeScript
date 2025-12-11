package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTypeCheckAfterResolve(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*start*/class Point implements /*IPointRef*/IPoint {
    getDist() {
        ssss;
    }
}/*end*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToEOF(t)
	f.InsertLine(t, "")
	f.VerifyQuickInfoAt(t, "IPointRef", "any", "")
	f.VerifyErrorExistsAfterMarker(t, "IPointRef")
	f.GoToEOF(t)
	f.InsertLine(t, "")
	f.VerifyErrorExistsAfterMarker(t, "IPointRef")
}
