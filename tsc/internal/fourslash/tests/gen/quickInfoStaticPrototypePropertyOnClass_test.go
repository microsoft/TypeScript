package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoStaticPrototypePropertyOnClass(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class c1 {
}
class c2<T> {
}
class c3 {
    constructor() {
    }
}
class c4 {
    constructor(param: string);
    constructor(param: number);
    constructor(param: any) {
    }
}
c1./*1*/prototype;
c2./*2*/prototype;
c3./*3*/prototype;
c4./*4*/prototype;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) c1.prototype: c1", "")
	f.VerifyQuickInfoAt(t, "2", "(property) c2<T>.prototype: c2<any>", "")
	f.VerifyQuickInfoAt(t, "3", "(property) c3.prototype: c3", "")
	f.VerifyQuickInfoAt(t, "4", "(property) c4.prototype: c4", "")
}
