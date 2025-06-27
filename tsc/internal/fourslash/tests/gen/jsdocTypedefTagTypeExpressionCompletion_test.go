package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocTypedefTagTypeExpressionCompletion(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    age: number;
}
 class Foo {
     property1: string;
     constructor(value: number) { this.property1 = "hello"; }
     static method1() {}
     method3(): number { return 3; }
     /**
      * @param {string} foo A value.
      * @returns {number} Another value
      * @mytag
      */
     method4(foo: string) { return 3; }
 }
 namespace Foo.Namespace { export interface SomeType { age2: number } }
 /**
  * @type { /*type1*/Foo./*typeFooMember*/Namespace./*NamespaceMember*/SomeType }
  */
var x;
/*globalValue*/
x./*valueMemberOfSomeType*/
var x1: Foo;
x1./*valueMemberOfFooInstance*/;
Foo./*valueMemberOfFoo*/;
 /**
  * @type { {/*propertyName*/ageX: number} }
  */
var y;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "type1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindClass), Label: "Foo"}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindInterface), Label: "I"}},
			Excludes: []string{"Namespace", "SomeType", "x", "x1", "y", "method1", "property1", "method3", "method4", "foo"},
		},
	})
	f.VerifyCompletions(t, "typeFooMember", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindModule), Label: "Namespace"}},
		},
	})
	f.VerifyCompletions(t, "NamespaceMember", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindInterface), Label: "SomeType"}},
		},
	})
	f.VerifyCompletions(t, "globalValue", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindClass), Label: "Foo"}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindVariable), Label: "x"}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindVariable), Label: "x1"}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindVariable), Label: "y"}},
			Excludes: []string{"I", "Namespace", "SomeType", "method1", "property1", "method3", "method4", "foo"},
		},
	})
	f.VerifyCompletions(t, "valueMemberOfSomeType", nil)
	f.VerifyCompletions(t, "valueMemberOfFooInstance", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindMethod), Label: "method3"}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindMethod), Label: "method4"}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), Label: "property1"}},
		},
	})
	f.VerifyCompletions(t, "valueMemberOfFoo", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: completionFunctionMembersPlus([]fourslash.CompletionsExpectedItem{&lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindMethod), SortText: ptrTo(string(ls.SortTextLocalDeclarationPriority)), Label: "method1"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "prototype"}}),
		},
	})
	f.VerifyCompletions(t, "propertyName", nil)
}
