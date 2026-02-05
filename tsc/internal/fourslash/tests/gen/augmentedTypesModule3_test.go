package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAugmentedTypesModule3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function m2g() { };
namespace m2g { export class C { foo(x: number) { } } }
var x: m2g./*1*/;
var /*2*/r = m2g/*3*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"C",
			},
		},
	})
	f.Insert(t, "C.")
	f.VerifyCompletions(t, nil, nil)
	f.Backspace(t, 1)
	f.VerifyQuickInfoAt(t, "2", "var r: typeof m2g", "")
	f.GoToMarker(t, "3")
	f.Insert(t, "(")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "m2g(): void"})
}
