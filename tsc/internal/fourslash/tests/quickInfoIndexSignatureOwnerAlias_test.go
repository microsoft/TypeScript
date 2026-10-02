package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoIndexSignatureOwnerAlias(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The nil enclosing container keeps the owner unqualified, even when an alias is available.
	// This covers the container choice, not UseOnlyExternalAliasing: nil bypasses symbol-chain lookup.
	const content = `
namespace Outer {
    export namespace Inner {
        export interface Dictionary { [k: string]: number; }
    }
}
import Alias = Outer.Inner;
declare const dictionary: Alias.Dictionary;
dictionary./*alias*/aliasKey;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "alias", "(index) Dictionary[string]: number", "")
}
