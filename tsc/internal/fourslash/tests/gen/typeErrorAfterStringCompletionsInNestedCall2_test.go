package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTypeErrorAfterStringCompletionsInNestedCall2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true

type ActionFunction<
  TExpressionEvent extends { type: string },
  out TEvent extends { type: string }
> = {
  ({ event }: { event: TExpressionEvent }): void;
  _out_TEvent?: TEvent;
};

interface MachineConfig<TEvent extends { type: string }> {
  types: {
    events: TEvent;
  };
  on: {
    [K in TEvent["type"]]?: ActionFunction<
      Extract<TEvent, { type: K }>,
      TEvent
    >;
  };
}

declare function raise<
  TExpressionEvent extends { type: string },
  TEvent extends { type: string }
>(
  resolve: ({ event }: { event: TExpressionEvent }) => TEvent
): {
  ({ event }: { event: TExpressionEvent }): void;
  _out_TEvent?: TEvent;
};

declare function createMachine<TEvent extends { type: string }>(
  config: MachineConfig<TEvent>
): void;

createMachine({
  types: {
    events: {} as { type: "FOO" } | { type: "BAR" },
  },
  on: {
    [|/*error*/FOO|]: raise(({ event }) => {
      return {
        type: "BAR/*1*/" as const,
      };
    }),
  },
});`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.Insert(t, "x")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"BAR",
				"FOO",
			},
		},
	})
	f.VerifyBaselineNonSuggestionDiagnostics(t)
}
