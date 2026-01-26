package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_addToNamedWithDifferentCacheValue(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "module": "commonjs" } }
// @Filename: /home/src/workspaces/project/packages/mylib/package.json
{ "name": "mylib", "version": "1.0.0", "main": "index.js" }
// @Filename: /home/src/workspaces/project/packages/mylib/index.ts
export * from "./mySubDir";
// @Filename: /home/src/workspaces/project/packages/mylib/mySubDir/index.ts
export * from "./myClass";
export * from "./myClass2";
// @Filename: /home/src/workspaces/project/packages/mylib/mySubDir/myClass.ts
export class MyClass {}
// @Filename: /home/src/workspaces/project/packages/mylib/mySubDir/myClass2.ts
export class MyClass2 {}
// @link: /home/src/workspaces/project/packages/mylib -> /home/src/workspaces/project/node_modules/mylib
// @Filename: /home/src/workspaces/project/src/index.ts

const a = new MyClass/*1*/();
const b = new MyClass2/*2*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "1")
	opts1251 := f.GetOptions()
	opts1251.FormatCodeSettings.NewLineCharacter = "\n"
	f.Configure(t, opts1251)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "MyClass",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "../packages/mylib",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo("1"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:          "MyClass",
		Source:        "../packages/mylib",
		Description:   "Add import from \"../packages/mylib\"",
		AutoImportFix: &lsproto.AutoImportFix{},
		NewFileContent: PtrTo(`import { MyClass } from "../packages/mylib";

const a = new MyClass();
const b = new MyClass2();`),
	})
	f.ReplaceLine(t, 0, "import { MyClass } from \"mylib\";")
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "MyClass2",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "mylib",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
}
