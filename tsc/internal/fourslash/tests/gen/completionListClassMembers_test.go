package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListClassMembers(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Class {
    private privateInstanceMethod() { }
    public publicInstanceMethod() { }

    private privateProperty = 1;
    public publicProperty = 1;

    private static privateStaticProperty = 1;
    public static publicStaticProperty = 1;

    private static privateStaticMethod() { }
    public static publicStaticMethod() {
        Class./*staticsInsideClassScope*/publicStaticMethod();
        var c = new Class();
        c./*instanceMembersInsideClassScope*/privateProperty;
    }
}

Class./*staticsOutsideClassScope*/publicStaticMethod();
var c = new Class();
c./*instanceMembersOutsideClassScope*/privateProperty;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "staticsInsideClassScope", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: completionFunctionMembersPlus([]fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "privateStaticMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "privateStaticProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicStaticMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicStaticProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "prototype"}}),
		},
	})
	f.VerifyCompletions(t, "instanceMembersInsideClassScope", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{"privateInstanceMethod", "publicInstanceMethod", "privateProperty", "publicProperty"},
		},
	})
	f.VerifyCompletions(t, "staticsOutsideClassScope", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: completionFunctionMembersPlus([]fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicStaticMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "publicStaticProperty"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "prototype"}}),
		},
	})
	f.VerifyCompletions(t, "instanceMembersOutsideClassScope", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{"publicInstanceMethod", "publicProperty"},
		},
	})
}
