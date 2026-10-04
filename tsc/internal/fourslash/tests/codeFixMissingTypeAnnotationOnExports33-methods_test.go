package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports33_methods(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
// @Filename: /code.ts
export class Foo {
  m() {
  }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFixAvailable(t, []string{"Add return type 'void'"})
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add return type 'void'",
		NewFileContent: `export class Foo {
  m(): void {
  }
}`,
		Index: 0,
	})
}
