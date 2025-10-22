package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_typeOnly(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @target: esnext
// @moduleResolution: bundler
// @Filename: /a.ts
export class A {}
export class B {}
// @Filename: /b.ts
import type { A } from './a';
const b: B/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/b.ts")
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "B",
		Source:      "./a",
		Description: "Update import from \"./a\"",
		NewFileContent: PtrTo(`import type { A, B } from './a';
const b: B`),
	})
}
