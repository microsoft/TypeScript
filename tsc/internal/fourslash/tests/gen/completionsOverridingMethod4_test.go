package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsOverridingMethod4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
// @Filename: secret.ts
class Secret {
    #secret(): string {
        return "secret";
    }

    private tell(): string {
        return this.#secret();
    }

    protected hint(): string {
        return "hint";
    }

    public refuse(): string {
        return "no comments";
    }
}

class Gossip extends Secret {
    /* no telling secrets */
    /*a*/
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "a", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &[]string{},
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "hint", InsertText: ptrTo("protected hint(): string {\n}"), FilterText: ptrTo("hint")}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "refuse", InsertText: ptrTo("public refuse(): string {\n}"), FilterText: ptrTo("refuse")}},
			Excludes: []string{"tell", "#secret"},
		},
	})
}
