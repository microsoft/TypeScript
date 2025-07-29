package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionNoAutoInsertQuestionDotForThis(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
class Address {
    city: string = "";
    "postal code": string = "";
    method() {
        this[|./**/|]
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "city",
					Detail: PtrTo("(property) Address.city: string"),
				},
				&lsproto.CompletionItem{
					Label: "method",
				},
				&lsproto.CompletionItem{
					Label:      "postal code",
					InsertText: PtrTo("[\"postal code\"]"),
					Detail:     PtrTo("(property) Address[\"postal code\"]: string"),
				},
			},
		},
	})
}
