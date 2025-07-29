package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsLiteralFromInferenceWithinInferredType2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.tsx
type Values<T> = T[keyof T];

type GetStates<T> = T extends { states: object } ? T["states"] : never;

type IsNever<T> = [T] extends [never] ? 1 : 0;

type GetIds<T, Gathered extends string = never> = IsNever<T> extends 1
  ? Gathered
  : "id" extends keyof T
  ? GetIds<Values<GetStates<T>>, Gathered | ` + "`" + `#${T["id"] & string}` + "`" + `>
  : GetIds<Values<GetStates<T>>, Gathered>;

type StateConfig<
  TStates extends Record<string, StateConfig> = Record<
    string,
    StateConfig<any>
  >,
  TIds extends string = string
> = {
  id?: string;
  initial?: keyof TStates & string;
  states?: {
    [K in keyof TStates]: StateConfig<GetStates<TStates[K]>, TIds>;
  };
  on?: Record<string, TIds | ` + "`" + `.${keyof TStates & string}` + "`" + `>;
};

declare function createMachine<const T extends StateConfig<GetStates<T>, GetIds<T>>>(
  config: T
): void;

createMachine({
  initial: "child",
  states: {
    child: {
      initial: "foo",
      states: {
        foo: {
          id: "wow_deep_id",
        },
      },
    },
  },
  on: {
    EV: "/*ts*/",
  },
});`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"ts"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"#wow_deep_id",
				".child",
			},
		},
	})
}
