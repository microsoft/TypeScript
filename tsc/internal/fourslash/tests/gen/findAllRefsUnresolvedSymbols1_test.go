package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsUnresolvedSymbols1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `let a: /*a0*/Bar;
let b: /*a1*/Bar<string>;
let c: /*a2*/Bar<string, number>;
let d: /*b0*/Bar./*c0*/X;
let e: /*b1*/Bar./*c1*/X<string>;
let f: /*b2*/Bar./*d0*/X./*e0*/Y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "a0", "a1", "a2", "b0", "b1", "b2", "c0", "c1", "d0", "e0")
}
