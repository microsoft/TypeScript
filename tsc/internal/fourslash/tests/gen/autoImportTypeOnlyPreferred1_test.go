package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportTypeOnlyPreferred1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @verbatimModuleSyntax: true
// @module: esnext
// @moduleResolution: bundler
// @Filename: /ts.d.ts
declare namespace ts {
  interface SourceFile {
      text: string;
  }
  function createSourceFile(): SourceFile;
}
export = ts;
// @Filename: /types.ts
export interface VFS {
  getSourceFile(path: string): ts/**/
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "ts",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "./ts",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	}).AndApplyCodeAction(t, &fourslash.CompletionsExpectedCodeAction{
		Name:        "ts",
		Source:      "./ts",
		Description: "Add import from \"./ts\"",
		NewFileContent: `import type ts from "./ts";

export interface VFS {
  getSourceFile(path: string): ts
}`,
	})
}
