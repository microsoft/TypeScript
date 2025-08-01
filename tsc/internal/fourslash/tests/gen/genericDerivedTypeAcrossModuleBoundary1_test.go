package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericDerivedTypeAcrossModuleBoundary1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module M {
   export class C1 { }
   export class C2<T> { }
}
var c = new M.C2<number>();
module N {
   export class D1 extends M.C1 { }
   export class D2<T> extends M.C2<T> { }
}
var n = new N.D1();
var /*1*/n2 = new N.D2<number>();
var /*2*/n3 = new N.D2();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var n2: N.D2<number>", "")
	f.VerifyQuickInfoAt(t, "2", "var n3: N.D2<unknown>", "")
}
