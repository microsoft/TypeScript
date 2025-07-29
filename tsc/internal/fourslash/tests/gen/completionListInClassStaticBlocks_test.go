package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInClassStaticBlocks(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @target: esnext
class Foo {
    static #a = 1;
    static a() {
        this./*1*/
    }
    static b() {
        Foo./*2*/
    }
    static {
        this./*3*/
    }
    static {
        Foo./*4*/
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "2", "3", "4"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:    "#a",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "a",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "b",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label: "prototype",
					},
				}),
		},
	})
}
