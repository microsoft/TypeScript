package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceMultipleImplementsIntersection2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
interface I1 {
    x: number;
}
interface I2 {
    x: string;
}

class C implements I1,I2 {
    x: string;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFixNotAvailable(t)
}
