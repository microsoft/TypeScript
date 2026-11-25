package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports14(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
function foo() {
    return { x: 1, y: 1};
}
export const { x, y = 0} = foo(), z= 42;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Extract binding expressions to variable",
		NewFileContent: `function foo() {
    return { x: 1, y: 1};
}
const dest = foo();
export const x: number = dest.x;
const temp = dest.y;
export const y: number = temp === undefined ? 0 : dest.y;
export const z = 42;`,
		Index: 0,
	})
}

func TestCodeFixMissingTypeAnnotationOnExportsNonIdentifierProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
function foo() {
    return { 0: 1, "a\\u0062": 1 };
}
export const { 0: x, "a\\u0062": y } = foo();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Extract binding expressions to variable",
		NewFileContent: `function foo() {
    return { 0: 1, "a\\u0062": 1 };
}
const dest = foo();
export const x: number = dest[0];
export const y: number = dest["a\\u0062"];`,
		Index: 0,
	})
}
