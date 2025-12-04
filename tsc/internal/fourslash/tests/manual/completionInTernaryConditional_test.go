package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionInTernaryConditional(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export enum Bar { }
export enum Foo { }


function foo(x: Foo) { return x; }
function bar(z: string, x: Foo) { return x; }

const a = '';

foo(/*1*/);
bar(a, a == '' ? /*2*/);
bar(a, a == '' ? /*3*/ : /*4*/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Test marker 1 - should have Foo preselected in simple call
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:     "Foo",
					Kind:      PtrTo(lsproto.CompletionItemKindEnum),
					Preselect: PtrTo(true),
				},
			},
		},
	})

	// Test marker 2 - should have Foo preselected after ? in incomplete ternary
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:     "Foo",
					Kind:      PtrTo(lsproto.CompletionItemKindEnum),
					Preselect: PtrTo(true),
				},
			},
		},
	})

	// Test marker 3 - should have Foo preselected after ? in ternary with colon
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:     "Foo",
					Kind:      PtrTo(lsproto.CompletionItemKindEnum),
					Preselect: PtrTo(true),
				},
			},
		},
	})

	// Test marker 4 - should have Foo preselected after : in ternary
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:     "Foo",
					Kind:      PtrTo(lsproto.CompletionItemKindEnum),
					Preselect: PtrTo(true),
				},
			},
		},
	})
}
