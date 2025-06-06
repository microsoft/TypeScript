package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListStaticProtectedMembers(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Base {
    private static privateMethod() { }
    private static privateProperty;

    protected static protectedMethod() { }
    protected static protectedProperty;

    public static publicMethod() { }
    public static publicProperty;

    protected static protectedOverriddenMethod() { }
    protected static protectedOverriddenProperty;

    static test() {
        Base./*1*/;
        this./*2*/;
        C1./*3*/;
    }
}

class C1 extends Base {
    protected static protectedOverriddenMethod() { }
    protected static protectedOverriddenProperty;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "2"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "privateMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "privateProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedOverriddenMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedOverriddenProperty"}},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "privateMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "privateProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicProperty"}},
			Excludes: []string{"protectedOverriddenMethod", "protectedOverriddenProperty"},
		},
	})
}
