package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionListForGenericInstance1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
interface Iterator<T, U> {
    (value: T, index: any, list: any): U
}
var i: Iterator<string, number>;
i/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i",
					Detail: new("var i: Iterator<string, number>"),
				},
			},
		},
	})
}

func TestGenericMemberLookupBeforeAndAfterCompletion(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
interface Base<T> { inherited: T; shared: string }
interface Derived<T> extends Base<T[]> { own: T; shared: "derived" }
declare const instance: Derived<number>;
instance./*inherited*/inherited;
instance./*shared*/shared;
instance./*completion*/
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "inherited", "(property) Base<number[]>.inherited: number[]", "")
	f.VerifyQuickInfoAt(t, "shared", `(property) Derived<number>.shared: "derived"`, "")
	f.VerifyCompletions(t, "completion", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{"inherited", "own", "shared"},
		},
	})
	f.VerifyQuickInfoAt(t, "inherited", "(property) Base<number[]>.inherited: number[]", "")
	f.VerifyQuickInfoAt(t, "shared", `(property) Derived<number>.shared: "derived"`, "")
}
