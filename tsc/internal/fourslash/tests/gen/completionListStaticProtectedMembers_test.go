package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListStaticProtectedMembers(t *testing.T) {
	t.Parallel()

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
	f.VerifyCompletions(t, []string{"1", "2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "privateMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "privateProperty",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "protectedMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "protectedProperty",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "publicMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "publicProperty",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "protectedOverriddenMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "protectedOverriddenProperty",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
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
					Label:    "privateMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "privateProperty",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "protectedMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "protectedProperty",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "publicMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "publicProperty",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
			},
			Excludes: []string{
				"protectedOverriddenMethod",
				"protectedOverriddenProperty",
			},
		},
	})
}
