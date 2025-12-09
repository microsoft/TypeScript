package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Test that string literal completions are suggested in tuple contexts
// even without typing a quote character.
func TestCompletionsInArrayLiteralWithContextualType(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	// Test 1: Completions after `[` in a tuple should suggest string literals
	const content1 = `let y: ["foo" | "bar", string] = [/*a*/];`
	f1, done1 := fourslash.NewFourslash(t, nil /*capabilities*/, content1)
	defer done1()
	f1.VerifyCompletions(t, "a", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"\"foo\"",
				"\"bar\"",
			},
		},
	})

	// Test 2: Completions after `,` in a tuple should provide contextual type for second element
	const content2 = `let z: ["a", "b" | "c"] = ["a", /*b*/];`
	f2, done2 := fourslash.NewFourslash(t, nil /*capabilities*/, content2)
	defer done2()
	f2.VerifyCompletions(t, "b", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"\"b\"",
				"\"c\"",
			},
		},
	})

	// Test 3: Verify that properties named "-1" are NOT suggested in array literals
	// This was a bug in the old implementation where passing -1 as an index would
	// check for a property named "-1" and suggest its value
	const content3 = `let x: { "-1": "hello" } = [/*c*/];`
	f3, done3 := fourslash.NewFourslash(t, nil /*capabilities*/, content3)
	defer done3()
	f3.VerifyCompletions(t, "c", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Excludes: []string{
				"\"hello\"",
			},
		},
	})

	// Test 4: Completions after `]` in a tuple should not crash (issue #2296)
	// When completing after the closing bracket, we're outside the array literal
	// so we shouldn't be getting contextual types for array elements
	const content4 = `let x: [number] = [123]/*d*/;`
	f4, done4 := fourslash.NewFourslash(t, nil /*capabilities*/, content4)
	defer done4()
	// Just verify that completions don't crash - accept any completion list
	f4.VerifyCompletions(t, "d", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{},
	})
}
