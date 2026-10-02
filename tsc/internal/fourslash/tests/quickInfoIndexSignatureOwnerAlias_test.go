package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoIndexSignatureOwnerAlias(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Like TS6, index signature owners do not use the alias available at the hover location.
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
