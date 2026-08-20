package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports8(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
function foo() {return 42;}
export const g = function () { return foo(); };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFixAvailable(t, []string{"Add return type 'number'"})
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add return type 'number'",
		NewFileContent: `function foo() {return 42;}
export const g = function (): number { return foo(); };`,
		Index: 0,
	})
}
