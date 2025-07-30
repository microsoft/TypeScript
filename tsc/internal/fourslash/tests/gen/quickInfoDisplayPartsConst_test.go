package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoDisplayPartsConst(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const /*1*/a = 10;
function foo() {
    const /*2*/b = /*3*/a;
    if (b) {
        const /*4*/b1 = 10;
    }
}
module m {
    const /*5*/c = 10;
    export const /*6*/d = 10;
    if (c) {
        const /*7*/e = 10;
    }
}
const /*8*/f: () => number = () => 10;
const /*9*/g = /*10*/f;
/*11*/f();
const /*12*/h: { (a: string): number; (a: number): string; } = a => a;
const /*13*/i = /*14*/h;
/*15*/h(10);
/*16*/h("hello");`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
