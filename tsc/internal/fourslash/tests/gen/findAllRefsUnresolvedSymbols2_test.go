package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsUnresolvedSymbols2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { /*a0*/Bar } from "does-not-exist";

let a: /*a1*/Bar;
let b: /*a2*/Bar<string>;
let c: /*a3*/Bar<string, number>;
let d: /*a4*/Bar./*b0*/X;
let e: /*a5*/Bar./*b1*/X<string>;
let f: /*a6*/Bar./*c0*/X./*d0*/Y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "a0", "a1", "a2", "a3", "a4", "a5", "a6", "b0", "b1", "c0", "d0")
}
