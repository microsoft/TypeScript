package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports_arrowParens(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
export const func = x => x.substring("foo");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
		FixID:          "fixMissingTypeAnnotationOnExports",
		NewFileContent: `export const func = (x: any): any => x.substring("foo");`,
	})
}
