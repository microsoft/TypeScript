package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsWithDeprecatedTag1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @filename: /foobar.ts
/** @deprecated */
export function foobar() {}
// @filename: /foo.ts
import { foobar/*4*/ } from "./foobar";

/** @deprecated */
interface Foo {
    /** @deprecated */
    bar(): void
    /** @deprecated */
    prop: number
}
declare const foo: Foo;
declare const foooo: Fo/*1*/;
foo.ba/*2*/;
foo.pro/*3*/;

fooba/*5*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "Foo",
					Kind:     new(lsproto.CompletionItemKindInterface),
					SortText: new(string(ls.DeprecateSortText(ls.SortTextLocationPriority))),
					Tags:     &[]lsproto.CompletionItemTag{lsproto.CompletionItemTagDeprecated},
				},
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "bar",
					Kind:     new(lsproto.CompletionItemKindMethod),
					SortText: new(string(ls.DeprecateSortText(ls.SortTextLocationPriority))),
					Tags:     &[]lsproto.CompletionItemTag{lsproto.CompletionItemTagDeprecated},
				},
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "prop",
					Kind:     new(lsproto.CompletionItemKindField),
					SortText: new(string(ls.DeprecateSortText(ls.SortTextLocationPriority))),
					Tags:     &[]lsproto.CompletionItemTag{lsproto.CompletionItemTagDeprecated},
				},
			},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "foobar",
					Kind:     new(lsproto.CompletionItemKindFunction),
					SortText: new(string(ls.DeprecateSortText(ls.SortTextLocationPriority))),
					Tags:     &[]lsproto.CompletionItemTag{lsproto.CompletionItemTagDeprecated},
				},
			},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "foobar",
					Kind:     new(lsproto.CompletionItemKindVariable),
					SortText: new(string(ls.DeprecateSortText(ls.SortTextLocationPriority))),
					Tags:     &[]lsproto.CompletionItemTag{lsproto.CompletionItemTagDeprecated},
				},
			},
		},
	})
}
