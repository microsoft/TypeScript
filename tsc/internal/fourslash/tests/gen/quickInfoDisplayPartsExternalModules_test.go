package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoDisplayPartsExternalModules(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export namespace /*1*/m {
    var /*2*/namespaceElemWithoutExport = 10;
    export var /*3*/namespaceElemWithExport = 10;
}
export var /*4*/a = /*5*/m;
export var /*6*/b: typeof /*7*/m;
export namespace /*8*/m1./*9*/m2 {
    var /*10*/namespaceElemWithoutExport = 10;
    export var /*11*/namespaceElemWithExport = 10;
}
export var /*12*/x = /*13*/m1./*14*/m2;
export var /*15*/y: typeof /*16*/m1./*17*/m2;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
