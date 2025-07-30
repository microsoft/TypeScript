package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoDisplayPartsLiteralLikeNames01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {
    public /*1*/1() { }
    private /*2*/Infinity() { }
    protected /*3*/NaN() { }
    static /*4*/"stringLiteralName"() { }
    method() {
        this[/*5*/1]();
        this[/*6*/"1"]();
        this./*7*/Infinity();
        this[/*8*/"Infinity"]();
        this./*9*/NaN();
        C./*10*/stringLiteralName();
    }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
