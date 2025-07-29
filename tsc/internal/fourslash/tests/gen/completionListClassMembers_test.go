package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
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
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:    "privateStaticMethod",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "privateStaticProperty",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "publicStaticMethod",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "publicStaticProperty",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "prototype",
						SortText: PtrTo(string(ls.SortTextLocationPriority)),
					},
				}),
		},
	})
	f.VerifyCompletions(t, "instanceMembersInsideClassScope", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"privateInstanceMethod",
				"publicInstanceMethod",
				"privateProperty",
				"publicProperty",
			},
		},
	})
	f.VerifyCompletions(t, "staticsOutsideClassScope", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:    "publicStaticMethod",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "publicStaticProperty",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "prototype",
						SortText: PtrTo(string(ls.SortTextLocationPriority)),
					},
				}),
		},
	})
	f.VerifyCompletions(t, "instanceMembersOutsideClassScope", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"publicInstanceMethod",
				"publicProperty",
			},
		},
	})
}
