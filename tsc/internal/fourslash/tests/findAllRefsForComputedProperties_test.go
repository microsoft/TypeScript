package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFindAllRefsForComputedProperties(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    ["/*0*/prop1"]: () => void;
}

class C implements I {
    ["/*1*/prop1"]: any;
}

var x: I = {
    ["/*2*/prop1"]: function () { },
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "0", "1", "2")
}
