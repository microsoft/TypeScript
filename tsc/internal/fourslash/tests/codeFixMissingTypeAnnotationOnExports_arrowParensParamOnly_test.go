package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports_arrowParensParamOnly(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
export const func = /*a*/x/*b*/ => 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "a")
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description:    `Add annotation of type 'any'`,
		NewFileContent: `export const func = (x: any) => 0;`,
		ApplyChanges:   true,
	})
}
