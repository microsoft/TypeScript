package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInNamedFunctionExpression(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(a: number): string {
    /*insideFunctionDeclaration*/
    return "";
}

(function foo(): number {
    /*insideFunctionExpression*/
    fo/*referenceInsideFunctionExpression*/o;
    return "";
})

/*globalScope*/
fo/*referenceInGlobalScope*/o;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"globalScope", "insideFunctionDeclaration", "insideFunctionExpression"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"foo",
			},
		},
	})
	f.VerifyQuickInfoAt(t, "referenceInsideFunctionExpression", "(local function) foo(): number", "")
	f.VerifyQuickInfoAt(t, "referenceInGlobalScope", "function foo(a: number): string", "")
}
