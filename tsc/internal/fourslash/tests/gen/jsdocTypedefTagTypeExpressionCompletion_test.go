package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocTypedefTagTypeExpressionCompletion(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
interface I {
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
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "type1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "Foo",
					Kind:  new(lsproto.CompletionItemKindClass),
				},
				&lsproto.CompletionItem{
					Label: "I",
					Kind:  new(lsproto.CompletionItemKindInterface),
				},
			},
			Excludes: []string{
				"Namespace",
				"SomeType",
				"x",
				"x1",
				"y",
				"method1",
				"property1",
				"method3",
				"method4",
				"foo",
			},
		},
	})
	f.VerifyCompletions(t, "typeFooMember", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "Namespace",
					Kind:  new(lsproto.CompletionItemKindModule),
				},
			},
		},
	})
	f.VerifyCompletions(t, "NamespaceMember", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "SomeType",
					Kind:  new(lsproto.CompletionItemKindInterface),
				},
			},
		},
	})
	f.VerifyCompletions(t, "globalValue", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "Foo",
					Kind:  new(lsproto.CompletionItemKindClass),
				},
				&lsproto.CompletionItem{
					Label: "x",
					Kind:  new(lsproto.CompletionItemKindVariable),
				},
				&lsproto.CompletionItem{
					Label: "x1",
					Kind:  new(lsproto.CompletionItemKindVariable),
				},
				&lsproto.CompletionItem{
					Label: "y",
					Kind:  new(lsproto.CompletionItemKindVariable),
				},
			},
			Excludes: []string{
				"I",
				"Namespace",
				"SomeType",
				"method1",
				"property1",
				"method3",
				"method4",
				"foo",
			},
		},
	})
	f.VerifyCompletions(t, "valueMemberOfSomeType", nil)
	f.VerifyCompletions(t, "valueMemberOfFooInstance", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "method3",
					Kind:  new(lsproto.CompletionItemKindMethod),
				},
				&lsproto.CompletionItem{
					Label: "method4",
					Kind:  new(lsproto.CompletionItemKindMethod),
				},
				&lsproto.CompletionItem{
					Label: "property1",
					Kind:  new(lsproto.CompletionItemKindField),
				},
			},
		},
	})
	f.VerifyCompletions(t, "valueMemberOfFoo", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:    "method1",
						Kind:     new(lsproto.CompletionItemKindMethod),
						SortText: new(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "prototype",
						SortText: new(string(ls.SortTextLocationPriority)),
					},
				}),
		},
	})
	f.VerifyCompletions(t, "propertyName", nil)
}
