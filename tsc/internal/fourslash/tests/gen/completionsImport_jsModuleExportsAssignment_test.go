package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_jsModuleExportsAssignment(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "module": "commonjs", "allowJs": true, "lib": ["es5"] } }
// @Filename: /home/src/workspaces/project/third_party/marked/src/defaults.js
function getDefaults() {
  return {
    baseUrl: null,
  };
}

function changeDefaults(newDefaults) {
  module.exports.defaults = newDefaults;
}

module.exports = {
  defaults: getDefaults(),
  getDefaults,
  changeDefaults
};
// @Filename: /home/src/workspaces/project/index.ts
/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	opts666 := f.GetOptions()
	opts666.FormatCodeSettings.NewLineCharacter = "\n"
	f.Configure(t, opts666)
	f.GoToMarker(t, "")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{},
	})
	f.Insert(t, "d")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "defaults",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "./third_party/marked/src/defaults",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
			Excludes: []string{
				"newDefaults",
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "defaults",
		Source:      "./third_party/marked/src/defaults",
		Description: "Add import from \"./third_party/marked/src/defaults\"",
		AutoImportFix: &lsproto.AutoImportFix{
			ModuleSpecifier: "./third_party/marked/src/defaults",
		},
		NewFileContent: PtrTo(`import { defaults } from "./third_party/marked/src/defaults";

d`),
	})
}
