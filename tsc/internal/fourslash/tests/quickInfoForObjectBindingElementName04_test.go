package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoForObjectBindingElementName04(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Options {
   /**
    * A description of 'a'
    */
    a: {
       /**
        * A description of 'b'
        */
       b: string;
   }
}

function f({ a, a: { b } }: Options) {
    a/*1*/;
    b/*2*/;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
