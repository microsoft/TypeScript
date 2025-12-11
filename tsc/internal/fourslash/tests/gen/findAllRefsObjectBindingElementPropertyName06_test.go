package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsObjectBindingElementPropertyName06(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    /*0*/property1: number;
    property2: string;
}

var elems: I[];
for (let { /*1*/property1: p } of elems) {
}
for (let { /*2*/property1 } of elems) {
}
for (var { /*3*/property1: p1 } of elems) {
}
var p2;
for ({ /*4*/property1 : p2 } of elems) {
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "0", "1", "3", "4", "2")
}
