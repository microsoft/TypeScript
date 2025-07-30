package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoDisplayPartsClassProperty(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class c {
    public /*1*/publicProperty: string;
    private /*2*/privateProperty: string;
    protected /*21*/protectedProperty: string;
    static /*3*/staticProperty: string;
    private static /*4*/privateStaticProperty: string;
    protected static /*41*/protectedStaticProperty: string;
    method() {
        this./*5*/publicProperty;
        this./*6*/privateProperty;
        this./*61*/protectedProperty;
        c./*7*/staticProperty;
        c./*8*/privateStaticProperty;
        c./*81*/protectedStaticProperty;
    }
}
var cInstance = new c();
/*9*/cInstance./*10*/publicProperty;
/*11*/c./*12*/staticProperty;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
