package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsLiteralMatchingGenericSignature(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.tsx
declare function bar1<P extends "" | "bar" | "baz">(p: P): void;

bar1("/*ts*/")
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"ts"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"", "bar", "baz"},
		},
	})
}
