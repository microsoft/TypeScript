package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAugmentedTypesModule2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function /*11*/m2f(x: number) { };
namespace m2f { export interface I { foo(): void } }
var x: m2f./*1*/
var /*2*/r = m2f/*3*/;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "11", "function m2f(x: number): void\nnamespace m2f", "")
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"I",
			},
		},
	})
	f.Insert(t, "I.")
	f.VerifyCompletions(t, nil, nil)
	f.Backspace(t, 1)
	f.VerifyQuickInfoAt(t, "2", "var r: (x: number) => void", "")
	f.GoToMarker(t, "3")
	f.Insert(t, "(")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "m2f(x: number): void"})
}
