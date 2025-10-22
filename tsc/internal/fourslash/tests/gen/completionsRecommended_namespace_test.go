package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsRecommended_namespace(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noLib: true
// @Filename: /a.ts
export namespace Name {
    export class C {}
}
export function f(c: Name.C) {}
f(new N/*a0*/);
f(new /*a1*/);
// @Filename: /b.ts
import { f } from "./a";
f(new N/*b0*/);
f(new /*b1*/);
// @Filename: /c.ts
import * as alpha from "./a";
alpha.f(new a/*c0*/);
alpha.f(new /*c1*/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"a0", "a1"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:     "Name",
					Detail:    PtrTo("namespace Name"),
					Kind:      PtrTo(lsproto.CompletionItemKindModule),
					Preselect: PtrTo(true),
				},
			},
		},
	})
	f.VerifyCompletions(t, []string{"b0", "b1"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "Name",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "./a",
						},
					})),
					Detail:              PtrTo("namespace Name"),
					Kind:                PtrTo(lsproto.CompletionItemKindModule),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					Preselect:           PtrTo(true),
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.VerifyCompletions(t, []string{"c0", "c1"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:     "alpha",
					Detail:    PtrTo("import alpha"),
					Kind:      PtrTo(lsproto.CompletionItemKindVariable),
					Preselect: PtrTo(true),
				},
			},
		},
	})
}
