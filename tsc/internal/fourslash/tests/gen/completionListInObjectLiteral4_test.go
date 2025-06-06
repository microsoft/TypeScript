package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInObjectLiteral4(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strictNullChecks: true
interface Thing {
    hello: number;
    world: string;
}

declare function funcA(x : Thing): void;
declare function funcB(x?: Thing): void;
declare function funcC(x : Thing | null): void;
declare function funcD(x : Thing | undefined): void;
declare function funcE(x : Thing | null | undefined): void;
declare function funcF(x?: Thing | null | undefined): void;

funcA({ /*A*/ });
funcB({ /*B*/ });
funcC({ /*C*/ });
funcD({ /*D*/ });
funcE({ /*E*/ });
funcF({ /*F*/ });`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, f.Markers(), &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"hello", "world"},
		},
	})
}
