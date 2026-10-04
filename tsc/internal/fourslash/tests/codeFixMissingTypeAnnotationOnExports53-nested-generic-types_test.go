package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports53_nested_generic_types(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
export interface Foo<T, U = T[]> {}
export function foo(x: Map<number, Foo<string>>) {
    return x;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add return type 'Map<number, Foo<string, string[]>>'",
		NewFileContent: `export interface Foo<T, U = T[]> {}
export function foo(x: Map<number, Foo<string>>): Map<number, Foo<string, string[]>> {
    return x;
}`,
		Index: 0,
	})
}
