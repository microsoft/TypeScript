package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoLocalTypeInGenericFunctionCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function /*1*/foo<A>() {
    class /*2*/X {
        /*3*/m<B, C>() {
            return (function <D>() {
                class /*4*/Y<E> {
                }
                return new /*5*/Y<string>();
            })<Date>();
        }
    }
    var /*6*/x = new X();
    return x./*7*/m<number, boolean>();
}
var /*8*/x = foo<void>();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
