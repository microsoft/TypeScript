package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestStringLiteralCompletionsWithinInferredObjectWhenItsKeysAreUsedOutsideOfIt(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
declare function createMachine<T>(config: {
  initial: keyof T;
  states: {
    [K in keyof T]: {
      on?: Record<string, keyof T>;
    };
  };
}): void;

createMachine({
  initial: "a",
  states: {
    a: {
      on: {
        NEXT: "/*1*/",
      },
    },
    b: {
      on: {
        NEXT: "/*2*/",
      },
    },
  },
});`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, []string{"1", "2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"a",
				"b",
			},
		},
	})
}
