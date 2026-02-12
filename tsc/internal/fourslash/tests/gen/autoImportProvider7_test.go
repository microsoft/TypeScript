package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider7(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "lib": ["es5"], "module": "commonjs" } }
// @Filename: /home/src/workspaces/project/package.json
{ "dependencies": { "mylib": "file:packages/mylib" } }
// @Filename: /home/src/workspaces/project/packages/mylib/package.json
{ "name": "mylib", "version": "1.0.0", "main": "index.js", "types": "index" }
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
	opts1196 := f.GetOptions()
	opts1196.FormatCodeSettings.NewLineCharacter = "\n"
	f.Configure(t, opts1196)
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
							ModuleSpecifier: "mylib",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, new("1"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:          "MyClass",
		Source:        "mylib",
		Description:   "Add import from \"mylib\"",
		AutoImportFix: &lsproto.AutoImportFix{},
		NewFileContent: new(`import { MyClass } from "mylib";

const a = new MyClass();
const b = new MyClass2();`),
	})
}
