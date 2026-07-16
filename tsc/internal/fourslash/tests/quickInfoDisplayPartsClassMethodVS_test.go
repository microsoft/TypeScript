package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoDisplayPartsClassMethodVS(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class c {
    public /*1*/publicMethod() { }
    private /*2*/privateMethod() { }
    protected /*21*/protectedMethod() { }
    static /*3*/staticMethod() { }
    private static /*4*/privateStaticMethod() { }
    protected static /*41*/protectedStaticMethod() { }
    method() {
        this./*5*/publicMethod();
        this./*6*/privateMethod();
        this./*61*/protectedMethod();
        c./*7*/staticMethod();
        c./*8*/privateStaticMethod();
        c./*81*/protectedStaticMethod();
    }
}
var cInstance = new c();
/*9*/cInstance./*10*/publicMethod();
/*11*/c./*12*/staticMethod();`
	f, done := fourslash.NewFourslash(t, &lsproto.ClientCapabilities{VSSupportsVisualStudioExtensions: new(true)}, content)
	defer done()
	f.VerifyBaselineVSHover(t)
}
