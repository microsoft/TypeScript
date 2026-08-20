package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports38_unique_symbol_return(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019
// @Filename: /code.ts
const u: unique symbol = Symbol();
export const fn = () => ({ u } as const);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add return type '{ readonly u: typeof u; }'",
		NewFileContent: `const u: unique symbol = Symbol();
export const fn = (): {
    readonly u: typeof u;
} => ({ u } as const);`,
		Index: 0,
	})
}
