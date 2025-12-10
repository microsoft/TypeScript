package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_uriStyleNodeCoreModules3(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /node_modules/@types/node/index.d.ts
declare module "path" { function join(...segments: readonly string[]): string; }
declare module "node:path" { export * from "path"; }
declare module "fs" { function writeFile(): void }
declare module "fs/promises" { function writeFile(): Promise<void> }
declare module "node:fs" { export * from "fs"; }
declare module "node:fs/promises" { export * from "fs/promises"; }
// @Filename: /other.ts
import "node:fs/promises";
// @Filename: /noPrefix.ts
import "path";
write/*noPrefix*/
// @Filename: /prefix.ts
import "node:path";
write/*prefix*/
// @Filename: /mixed1.ts
import "path";
import "node:path";
write/*mixed1*/
// @Filename: /mixed2.ts
import "node:path";
import "path";
write/*mixed2*/
// @Filename: /test1.ts
import "node:test";
import "path";
writeFile/*test1*/
// @Filename: /test2.ts
import "node:test";
writeFile/*test2*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "noPrefix", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "fs",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "fs/promises",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
	f.VerifyCompletions(t, "prefix", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "node:fs",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "node:fs/promises",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
	f.VerifyCompletions(t, "mixed1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "node:fs",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "node:fs/promises",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
	f.VerifyCompletions(t, "mixed2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "node:fs",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "node:fs/promises",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
	f.VerifyImportFixModuleSpecifiers(t, "test1", []string{"fs", "fs/promises"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "test2", []string{"node:fs", "node:fs/promises"}, nil /*preferences*/)
	f.VerifyCompletions(t, "test1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "fs",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "fs/promises",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
	f.VerifyCompletions(t, "test2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "node:fs",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "writeFile",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportData{
								ModuleSpecifier: "node:fs/promises",
							},
						},
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
}
