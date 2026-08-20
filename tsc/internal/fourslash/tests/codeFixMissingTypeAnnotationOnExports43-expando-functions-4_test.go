package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports43_expando_functions_4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019
// @Filename: /code.ts
function foo(): void {}
// cannot name this property because it's an invalid variable name.
foo["@bar"] = 42;
foo.x = 1;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Annotate types of properties expando function in a namespace",
		NewFileContent: `function foo(): void {}
declare namespace foo {
    export var x: number;
}
// cannot name this property because it's an invalid variable name.
foo["@bar"] = 42;
foo.x = 1;`,
		Index: 0,
	})
}
