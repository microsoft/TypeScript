package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports36_conditional_releative(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
// @Filename: /code.ts
const A = "A"
const B = "B"
export const AB = Math.random()? A: B;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFixAvailable(t, []string{"Add annotation of type '\"A\" | \"B\"'", "Add annotation of type 'typeof A | typeof B'", "Add annotation of type 'string'", "Add satisfies and an inline type assertion with '\"A\" | \"B\"'", "Add satisfies and an inline type assertion with 'typeof A | typeof B'", "Add satisfies and an inline type assertion with 'string'"})
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add satisfies and an inline type assertion with 'typeof A | typeof B'",
		NewFileContent: `const A = "A"
const B = "B"
export const AB = (Math.random() ? A : B) satisfies typeof A | typeof B as typeof A | typeof B;`,
		Index: 4,
	})
}
