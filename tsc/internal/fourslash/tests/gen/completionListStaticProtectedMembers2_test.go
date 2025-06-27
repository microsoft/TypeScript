package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListStaticProtectedMembers2(t *testing.T) {
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
}

class C2 extends Base {
    protected static protectedOverriddenMethod() { }
    protected static protectedOverriddenProperty;

    static test() {
        Base./*1*/;
        C2./*2*/;
        this./*3*/;
        super./*4*/;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: completionFunctionMembersPlus([]fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedOverriddenMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedOverriddenProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "prototype"}}),
		},
	})
	f.VerifyCompletions(t, []string{"2", "3"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: completionFunctionMembersPlus([]fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedOverriddenMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedOverriddenProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "test"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "prototype"}}),
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "protectedOverriddenMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "apply"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "bind"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "call"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "toString"}},
		},
	})
}
