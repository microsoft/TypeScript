package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForAliasedGeneric(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module M {
    export module N {
        export class C<T> { }
        export class D { }
    }
}
import d = M.N;
var /*1*/aa: d.C<number>;
var /*2*/bb: d.D;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var aa: d.C<number>", "")
	f.VerifyQuickInfoAt(t, "2", "var bb: d.D", "")
}
