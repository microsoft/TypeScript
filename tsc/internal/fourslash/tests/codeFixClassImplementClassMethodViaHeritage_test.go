package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementClassMethodViaHeritage(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C1 {
    f1() {}
}

class C2 extends C1 {

}

class C3 implements C2 {[| 
    |]f2(){}
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRangeAfterCodeFix(t, `f1(): void{
    throw new Error("Method not implemented.");
}
`, false, 0, 0)
}
