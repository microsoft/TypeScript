package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImportYieldExpression(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export function a() {}
// @Filename: /b.ts
function *f() {
  yield a/**/
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "a",
		Source:      "./a",
		Description: "Add import from \"./a\"",
		NewFileContent: PtrTo(`import { a } from "./a";

function *f() {
  yield a
}`),
	})
}
