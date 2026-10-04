package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports39_extract_arr_to_variable(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019
// @Filename: /code.ts
let c: string[] = [];
export let o = {
    p: [
        ...c
    ]
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Mark array literal as const",
		NewFileContent: `let c: string[] = [];
export let o = {
    p: [
        ...c
    ] as const
}`,
		Index:        2,
		ApplyChanges: true,
	})
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Extract to variable and replace with 'newLocal as typeof newLocal'",
		NewFileContent: `let c: string[] = [];
const newLocal = [
    ...c
] as const;
export let o = {
    p: newLocal as typeof newLocal
}`,
		Index:        1,
		ApplyChanges: true,
	})
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add annotation of type 'readonly string[]'",
		NewFileContent: `let c: string[] = [];
const newLocal: readonly string[] = [
    ...c
] as const;
export let o = {
    p: newLocal as typeof newLocal
}`,
		Index:        0,
		ApplyChanges: true,
	})
}
