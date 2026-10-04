package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionListsStringLiteralTypeAsIndexedAccessTypeObject(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `let firstCase: "a/*case_1*/"["foo"]
let secondCase: "b/*case_2*/"["bar"]
let thirdCase: "c/*case_3*/"["baz"]
let fourthCase: "en/*case_4*/"["qux"]
interface Foo {
 bar: string;
 qux: string;
}
let fifthCase: Foo["b/*case_5*/"]
let sixthCase: Foo["qu/*case_6*/"]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, []string{"case_1", "case_2", "case_3", "case_4"}, nil)
	f.VerifyCompletions(t, "case_5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "bar",
				},
			},
		},
	})
	f.VerifyCompletions(t, "case_6", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "qux",
				},
			},
		},
	})
}
