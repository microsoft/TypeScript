package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_ambient(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: a.d.ts
declare namespace foo { class Bar {} }
declare module 'path1' {
  import Bar = foo.Bar;
  export default Bar;
}
declare module 'path2longer' {
  import Bar = foo.Bar;
  export {Bar};
}

// @Filename: b.ts
Ba/**/`
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
						Label:    "foo",
						SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
					},
					&lsproto.CompletionItem{
						Label: "Bar",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "path1",
							},
						})),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "Bar",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "path2longer",
							},
						})),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "Bar",
		Source:      "path2longer",
		Description: "Add import from \"path2longer\"",
		NewFileContent: PtrTo(`import { Bar } from "path2longer";

Ba`),
	})
}
