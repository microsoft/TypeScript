package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoDisplayPartsTypeParameterInFunction(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function /*1*/foo</*2*/U>(/*3*/a: /*4*/U) {
    return /*5*/a;
}
/*6*/foo("Hello");
function /*7*/foo2</*8*/U extends string>(/*9*/a: /*10*/U) {
    return /*11*/a;
}
/*12*/foo2("hello");`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
