package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_details_withMisspelledName(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export const abc = 0;
// @Filename: /b.ts
acb/*1*/;
// @Filename: /c.ts
acb/*2*/;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo("1"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "abc",
		Source:      "./a",
		Description: "Add import from \"./a\"",
		NewFileContent: PtrTo(`import { abc } from "./a";

acb;`),
	})
	f.GoToMarker(t, "2")
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo("2"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:   "abc",
		Source: "./a",
		AutoImportData: &ls.AutoImportData{
			ExportName:      "abc",
			FileName:        "/a.ts",
			ModuleSpecifier: "./a",
		},
		Description: "Add import from \"./a\"",
		NewFileContent: PtrTo(`import { abc } from "./a";

acb;`),
	})
}
