package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoIndexSignatureOwnerNamespace(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Like TS6, index signature owners are displayed without an enclosing container.
	const content = `
namespace Outer {
    export namespace Inner {
        export interface Dictionary { [k: string]: number; }
        declare const inside: Dictionary;
        inside./*inside*/insideKey;
    }
}
namespace Other {
    export interface Dictionary { [k: string]: number; }
}
declare const outside: Outer.Inner.Dictionary;
outside./*outside*/outsideKey;
declare const other: Other.Dictionary;
other./*other*/otherKey;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "inside", "(index) Dictionary[string]: number", "")
	f.VerifyQuickInfoAt(t, "outside", "(index) Dictionary[string]: number", "")
	f.VerifyQuickInfoAt(t, "other", "(index) Dictionary[string]: number", "")
}
