package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixMissingTypeAnnotationOnExports30_inline_import(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @isolatedDeclarations: true
// @declaration: true
// @Filename: /person-code.ts
export type Person = { x: string; }
export function getPerson() : Person {
  return null!
}
// @Filename: /code.ts
import { getPerson } from "./person-code";
export const exp = {
  person: getPerson()
};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/code.ts")
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add satisfies and an inline type assertion with 'Person'",
		NewFileContent: `import { getPerson, Person } from "./person-code";
export const exp = {
  person: getPerson() satisfies Person as Person
};`,
		Index: 1,
	})
}
