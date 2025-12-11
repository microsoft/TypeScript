package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsDestructureGetter(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Test {
    get /*x0*/x() { return 0; }

    set /*y0*/y(a: number) {}
}
const { /*x1*/x, /*y1*/y } = new Test();
/*x2*/x; /*y2*/y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "x0", "x1", "x2", "y0", "y1", "y2")
}
