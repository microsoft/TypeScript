package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsGenericTypeWithMultipleBases1(t *testing.T) {
	t.Parallel()
	t.Skip()
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
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
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
					Detail: PtrTo("(property) iScope<number>.family: number"),
				},
				&lsproto.CompletionItem{
					Label:  "moveUp",
					Detail: PtrTo("(property) iMover.moveUp: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "watch",
					Detail: PtrTo("(property) iBaseScope.watch: () => void"),
				},
			},
		},
	})
}
