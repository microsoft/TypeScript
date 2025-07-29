package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsForStringDependingOnContexSensitiveSignature(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true

type ActorRef<TEvent extends { type: string }> = {
  send: (ev: TEvent) => void
}

type Action<TContext> = {
  (ctx: TContext): void
}

type Config<TContext> = {
  entry: Action<TContext>
}

declare function createMachine<TContext>(config: Config<TContext>): void

type EventFrom<T> = T extends ActorRef<infer TEvent> ? TEvent : never

declare function sendTo<
  TContext,
  TActor extends ActorRef<any>
>(
  actor: ((ctx: TContext) => TActor),
  event: EventFrom<TActor>
): Action<TContext>

createMachine<{
  child: ActorRef<{ type: "EVENT" }>;
}>({
  entry: sendTo((ctx) => ctx.child, { type: /*1*/ }),
});

createMachine<{
  child: ActorRef<{ type: "EVENT" }>;
}>({
  entry: sendTo((ctx) => ctx.child, { type: "/*2*/" }),
});`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"\"EVENT\"",
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"EVENT",
			},
		},
	})
}
