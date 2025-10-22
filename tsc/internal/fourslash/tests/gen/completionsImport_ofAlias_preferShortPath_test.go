package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_ofAlias_preferShortPath(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: node10
// @module: commonJs
// @noLib: true
// @Filename: /foo/index.ts
export { foo } from "./lib/foo";
// @Filename: /foo/lib/foo.ts
export const foo = 0;
// @Filename: /user.ts
fo/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label: "foo",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "/foo/lib/foo",
							},
						})),
						Detail:              PtrTo("const foo: 0"),
						Kind:                PtrTo(lsproto.CompletionItemKindVariable),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, true),
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "foo",
		Source:      "/foo/lib/foo",
		Description: "Add import from \"./foo\"",
		NewFileContent: PtrTo(`import { foo } from "./foo";

fo`),
	})
}
