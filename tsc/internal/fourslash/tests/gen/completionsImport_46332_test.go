package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_46332(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @moduleResolution: bundler
// @Filename: /node_modules/vue/package.json
{
  "name": "vue",
  "types": "dist/vue.d.ts"
}
// @Filename: /node_modules/vue/dist/vue.d.ts
export * from "@vue/runtime-dom"
// @Filename: /node_modules/@vue/runtime-dom/package.json
{
  "name": "@vue/runtime-dom",
  "types": "dist/runtime-dom.d.ts"
}
// @Filename: /node_modules/@vue/runtime-dom/dist/runtime-dom.d.ts
export * from "@vue/runtime-core";
export {}
declare module '@vue/reactivity' {
  export interface RefUnwrapBailTypes {
    runtimeDOMBailTypes: any
  }
}
// @Filename: /node_modules/@vue/runtime-core/package.json
{
  "name": "@vue/runtime-core",
  "types": "dist/runtime-core.d.ts"
}
// @Filename: /node_modules/@vue/runtime-core/dist/runtime-core.d.ts
import { ref } from '@vue/reactivity';
export { ref };
declare module '@vue/reactivity' {
  export interface RefUnwrapBailTypes {
    runtimeCoreBailTypes: any
  }
}
// @Filename: /node_modules/@vue/reactivity/package.json
{
  "name": "@vue/reactivity",
  "types": "dist/reactivity.d.ts"
}
// @Filename: /node_modules/@vue/reactivity/dist/reactivity.d.ts
export declare function ref<T = any>(): T;
// @Filename: /package.json
{
  "dependencies": {
    "vue": "*"
  }
}
// @Filename: /index.ts
import {} from "vue";
ref/**/`
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
					Label: "ref",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "vue",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "ref",
		Source:      "vue",
		Description: "Update import from \"vue\"",
		AutoImportData: &ls.AutoImportData{
			ExportName: "ref",
			FileName:   "/node_modules/vue/dist/vue.d.ts",
		},
		NewFileContent: PtrTo(`import { ref } from "vue";
ref`),
	})
}
