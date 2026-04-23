package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports_expandoNoDuplicates(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @declaration: true
// @isolatedDeclarations: true
// @Filename: /foo.mts
export function foo(): void {
}

foo.blah = 123;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Verify that only one code fix action is returned, not three identical ones.
	f.VerifyCodeFixAvailableExact(t, []string{
		"Annotate types of properties expando function in a namespace",
	})

	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Annotate types of properties expando function in a namespace",
		NewFileContent: `export function foo(): void {
}
export declare namespace foo {
    export var blah: number;
}

foo.blah = 123;`,
	})
}
