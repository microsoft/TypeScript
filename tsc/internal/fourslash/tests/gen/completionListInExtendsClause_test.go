package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInExtendsClause(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IFoo {
    method();
}

class Foo {
    property: number;
    method() { }
    static staticMethod() { }
}
class test1 extends Foo./*1*/ {}
class test2 implements IFoo./*2*/ {}
interface test3 extends IFoo./*3*/ {}
interface test4 implements Foo./*4*/ {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: completionFunctionMembersPlus([]fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "staticMethod"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "prototype"}}),
		},
	})
	f.VerifyCompletions(t, []string{"2", "3", "4"}, nil)
}
