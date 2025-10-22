package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_filteredByPackageJson_peerDependencies(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@noEmit: true
//@Filename: /package.json
{
  "peerDependencies": {
    "react": "*"
  }
}
//@Filename: /node_modules/react/index.d.ts
export declare var React: any;
//@Filename: /node_modules/react/package.json
{
  "name": "react",
  "types": "./index.d.ts"
}
//@Filename: /node_modules/fake-react/index.d.ts
export declare var ReactFake: any;
//@Filename: /node_modules/fake-react/package.json
{
  "name": "fake-react",
  "types": "./index.d.ts"
}
//@Filename: /src/index.ts
const x = Re/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:               "React",
					AdditionalTextEdits: fourslash.AnyTextEdits,
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "react",
						},
					})),
					SortText: PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
			Excludes: []string{
				"ReactFake",
			},
		},
	})
}
