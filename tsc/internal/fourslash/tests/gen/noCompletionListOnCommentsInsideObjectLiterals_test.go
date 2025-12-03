package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNoCompletionListOnCommentsInsideObjectLiterals(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module ObjectLiterals {
	interface MyPoint {
		x1: number;
		y1: number;
	}

	var p1: MyPoint = {
		/* /*1*/ Comment /*2*/ */
	};
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, f.Markers(), nil)
}
