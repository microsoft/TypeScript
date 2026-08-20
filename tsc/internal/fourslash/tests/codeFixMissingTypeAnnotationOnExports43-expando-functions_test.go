package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports43_expando_functions(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019
// @Filename: /code.ts
const foo = (): void => {}
foo.a = "A";
foo.b = "C"`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add annotation of type '{ (): void; a: string; b: string; }'",
		NewFileContent: `const foo: {
    (): void;
    a: string;
    b: string;
} = (): void => {}
foo.a = "A";
foo.b = "C"`,
		Index: 0,
	})
}
