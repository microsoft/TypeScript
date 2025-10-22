package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_reExport_wrongName(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /a.ts
export const x = 0;
// @Filename: /index.ts
export { x as y } from "./a";
// @Filename: /c.ts
/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "x",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "./a",
						},
					})),
					Detail:              PtrTo("const x: 0"),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "y",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: ".",
						},
					})),
					Detail:              PtrTo("(alias) const y: 0\nexport y"),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "x",
		Source:      "./a",
		Description: "Add import from \"./a\"",
		NewFileContent: PtrTo(`import { x } from "./a";

`),
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "y",
		Source:      ".",
		Description: "Add import from \".\"",
		NewFileContent: PtrTo(`import { y } from ".";
import { x } from "./a";

`),
	})
}
