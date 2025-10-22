package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_quoteStyle(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @Filename: /a.ts
export const foo = 0;
// @Filename: /b.ts
fo/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "foo",
		Source:      "/a",
		Description: "Add import from \"./a\"",
		NewFileContent: PtrTo(`import { foo } from './a';

fo`),
	})
}
