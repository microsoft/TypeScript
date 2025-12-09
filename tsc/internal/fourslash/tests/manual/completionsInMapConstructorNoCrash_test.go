package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Test for issue: Completions crash in call to `new Map(...)`.
// When requesting completions inside a Map constructor's array literal,
// IndexOfNode returns -1 causing a panic in getContextualTypeForElementExpression
// when trying to access array elements without a bounds check.
func TestCompletionsInMapConstructorNoCrash(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	// Test completion at position /*a*/ - before the string literal
	const content1 = `const m = new Map([
    [/*a*/'0', ['0', false]],
]);`
	f1, done1 := fourslash.NewFourslash(t, nil /*capabilities*/, content1)
	defer done1()
	// Just verify that completions don't crash - accept any completion list
	f1.VerifyCompletions(t, "a", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{},
	})

	// Test completion at position /*b*/ - after the array literal
	const content2 = `const m = new Map([
    ['0', ['0', false]]/*b*/,
]);`
	f2, done2 := fourslash.NewFourslash(t, nil /*capabilities*/, content2)
	defer done2()
	// Just verify that completions don't crash - accept any completion list
	f2.VerifyCompletions(t, "b", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{},
	})
}
