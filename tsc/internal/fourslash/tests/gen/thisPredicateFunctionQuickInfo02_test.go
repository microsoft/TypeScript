package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestThisPredicateFunctionQuickInfo02(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Sundries {
    broken: boolean;
}

interface Supplies {
    spoiled: boolean;
}

interface Crate<T> {
    contents: T;
    /*1*/isSundries(): this is Crate<Sundries>;
    /*2*/isSupplies(): this is Crate<Supplies>;
    /*3*/isPackedTight(): this is (this & {extraContents: T});
}
const crate: Crate<any>;
if (crate.isPackedTight/*4*/()) {
    crate.;
}
if (crate.isSundries/*5*/()) {
    crate.contents.;
    if (crate.isPackedTight/*6*/()) {
       crate.;
    }
}
if (crate.isSupplies/*7*/()) {
    crate.contents.;
    if (crate.isPackedTight/*8*/()) {
       crate.;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(method) Crate<T>.isSundries(): this is Crate<Sundries>", "")
	f.VerifyQuickInfoAt(t, "2", "(method) Crate<T>.isSupplies(): this is Crate<Supplies>", "")
	f.VerifyQuickInfoAt(t, "3", "(method) Crate<T>.isPackedTight(): this is (this & {\n    extraContents: T;\n})", "")
	f.VerifyQuickInfoAt(t, "4", "(method) Crate<any>.isPackedTight(): this is (Crate<any> & {\n    extraContents: any;\n})", "")
	f.VerifyQuickInfoAt(t, "5", "(method) Crate<any>.isSundries(): this is Crate<Sundries>", "")
	f.VerifyQuickInfoAt(t, "6", "(method) Crate<Sundries>.isPackedTight(): this is (Crate<Sundries> & {\n    extraContents: Sundries;\n})", "")
	f.VerifyQuickInfoAt(t, "7", "(method) Crate<any>.isSupplies(): this is Crate<Supplies>", "")
	f.VerifyQuickInfoAt(t, "8", "(method) Crate<Supplies>.isPackedTight(): this is (Crate<Supplies> & {\n    extraContents: Supplies;\n})", "")
}
