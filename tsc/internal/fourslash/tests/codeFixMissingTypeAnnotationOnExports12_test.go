package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports12(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
function foo() {
    return { x: 1, y: 1 };
}
export const { x, y } = foo();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Extract binding expressions to variable",
		NewFileContent: `function foo() {
    return { x: 1, y: 1 };
}
const dest = foo();
export const x: number = dest.x;
export const y: number = dest.y;`,
		Index: 0,
	})
}
