package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsGenericTypeWithMultipleBases1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export interface iBaseScope {
    watch: () => void;
}
export interface iMover {
    moveUp: () => void;
}
export interface iScope<TModel> extends iBaseScope, iMover {
    family: TModel;
}
var x: iScope<number>;
x./**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "family",
					Detail: new("(property) iScope<number>.family: number"),
				},
				&lsproto.CompletionItem{
					Label:  "moveUp",
					Detail: new("(property) iMover.moveUp: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "watch",
					Detail: new("(property) iBaseScope.watch: () => void"),
				},
			},
		},
	})
}
