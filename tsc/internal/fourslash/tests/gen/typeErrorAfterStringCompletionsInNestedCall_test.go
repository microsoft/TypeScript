package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTypeErrorAfterStringCompletionsInNestedCall(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true

type GreetingEvent =
  | { type: "MORNING" }
  | { type: "LUNCH_TIME" }
  | { type: "ALOHA" };

interface RaiseActionObject<TEvent extends { type: string }> {
  type: "raise";
  event: TEvent;
}

declare function raise<TEvent extends { type: string }>(
  ev: TEvent
): RaiseActionObject<TEvent>;

declare function createMachine<TEvent extends { type: string }>(config: {
  actions: RaiseActionObject<TEvent>;
}): void;

createMachine<GreetingEvent>({
  [|/*error*/actions|]: raise({ type: "ALOHA/*1*/" }),
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
				"ALOHAx",
				"ALOHA",
				"LUNCH_TIME",
				"MORNING",
			},
		},
	})
	f.VerifyNonSuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code:    &lsproto.IntegerOrString{Integer: PtrTo[int32](2322)},
			Message: "Type 'RaiseActionObject<{ type: \"ALOHAx\"; }>' is not assignable to type 'RaiseActionObject<GreetingEvent>'.\n  Type '{ type: \"ALOHAx\"; }' is not assignable to type 'GreetingEvent'.\n    Type '{ type: \"ALOHAx\"; }' is not assignable to type '{ type: \"ALOHA\"; }'.\n      Types of property 'type' are incompatible.\n        Type '\"ALOHAx\"' is not assignable to type '\"ALOHA\"'.",
		},
	})
}
