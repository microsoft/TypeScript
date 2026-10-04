package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports19(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019
export const a = {
    z: Symbol()
} as const;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add annotation of type '{ readonly z: symbol; }'",
		NewFileContent: `export const a: {
    readonly z: symbol;
} = {
    z: Symbol()
} as const;`,
		Index: 0,
	})
}
