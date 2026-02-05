package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoDisplayPartsInternalModuleAlias(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace m.m1 {
    export class c {
    }
}
namespace m2 {
    import /*1*/a1 = m;
    new /*2*/a1.m1.c();
    import /*3*/a2 = m.m1;
    new /*4*/a2.c();
    export import /*5*/a3 = m;
    new /*6*/a3.m1.c();
    export import /*7*/a4 = m.m1;
    new /*8*/a4.c();
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
