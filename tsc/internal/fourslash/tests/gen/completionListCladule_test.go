package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListCladule(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Foo {
    doStuff(): number { return 0; }
    static staticMethod() {}
}
module Foo {
    export var x: number;
}
Foo/*c1*/; // should get "x", "prototype"
var s: Foo/*c2*/; // no types, in Foo, so shouldnt have anything
var f = new Foo();
f/*c3*/;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "c1")
	f.Insert(t, ".")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "x",
					SortText: PtrTo(string(ls.SortTextLocationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "prototype",
					SortText: PtrTo(string(ls.SortTextLocationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "staticMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
			},
		},
	})
	f.GoToMarker(t, "c2")
	f.Insert(t, ".")
	f.VerifyCompletions(t, nil, nil)
	f.GoToMarker(t, "c3")
	f.Insert(t, ".")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"doStuff",
			},
		},
	})
}
