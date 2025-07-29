package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListStaticProtectedMembers3(t *testing.T) {
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

class C3 extends Base {
    protected static protectedOverriddenMethod() { }
    protected static protectedOverriddenProperty;
}

Base./*1*/;
C3./*2*/;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersPlus(
				[]fourslash.CompletionsExpectedItem{
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
}
