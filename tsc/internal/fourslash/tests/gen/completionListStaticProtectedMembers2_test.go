package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
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
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:    "protectedMethod",
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
						Label:    "prototype",
						SortText: PtrTo(string(ls.SortTextLocationPriority)),
					},
				}),
		},
	})
	f.VerifyCompletions(t, []string{"2", "3"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:    "protectedMethod",
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
						Label:    "test",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "prototype",
						SortText: PtrTo(string(ls.SortTextLocationPriority)),
					},
				}),
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "protectedMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "protectedOverriddenMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "publicMethod",
					SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "apply",
					SortText: PtrTo(string(ls.SortTextLocationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "bind",
					SortText: PtrTo(string(ls.SortTextLocationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "call",
					SortText: PtrTo(string(ls.SortTextLocationPriority)),
				},
				&lsproto.CompletionItem{
					Label:    "toString",
					SortText: PtrTo(string(ls.SortTextLocationPriority)),
				},
			},
		},
	})
}
