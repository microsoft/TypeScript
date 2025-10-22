package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_umdModules3_script(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /package.json
{ "dependencies": { "@types/classnames": "*" } }
// @filename: /tsconfig.json
{ "compilerOptions": { "module": "es2015" }}
// @filename: /node_modules/@types/classnames/package.json
{ "name": "@types/classnames", "types": "index.d.ts" }
// @filename: /node_modules/@types/classnames/index.d.ts
declare const classNames: () => string;
export = classNames;
export as namespace classNames;
// @filename: /SomeReactComponent.tsx

const el1 = <div className={class/*1*/}>foo</div>`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:               "classNames",
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
		},
	})
}
