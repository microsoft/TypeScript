package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_duplicatePackages_scopedTypes(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @esModuleInterop: true
// @Filename: /node_modules/@types/scope__react-dom/package.json
{ "name": "react-dom", "version": "1.0.0", "types": "./index.d.ts" }
// @Filename: /node_modules/@types/scope__react-dom/index.d.ts
import * as React from "react";
export function render(): void;
// @Filename: /node_modules/@types/scope__react/package.json
{ "name": "react", "version": "1.0.0", "types": "./index.d.ts" }
// @Filename: /node_modules/@types/scope__react/index.d.ts
import "./other";
export declare function useState(): void;
// @Filename: /node_modules/@types/scope__react/other.d.ts
export declare function useRef(): void;
// @Filename: /packages/a/node_modules/@types/scope__react/package.json
{ "name": "react", "version": "1.0.1", "types": "./index.d.ts" }
// @Filename: /packages/a/node_modules/@types/scope__react/index.d.ts
export declare function useState(): void;
// @Filename: /packages/a/index.ts
import "@scope/react-dom";
import "@scope/react";
// @Filename: /packages/a/foo.ts
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
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label: "render",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "@scope/react-dom",
							},
						})),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "useState",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "@scope/react",
							},
						})),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
}
