package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestStringLiteralCompletionsInPositionTypedUsingRest(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;
declare function pick2<T extends object, K extends (keyof T)[]>(obj: T, ...keys: K): Pick<T, K[number]>;

const obj = { aaa: 1, bbb: '2', ccc: true };

pick(obj, 'aaa', '/*ts1*/');
pick2(obj, 'aaa', '/*ts2*/');
class Q<T> {
  public select<Keys extends keyof T>(...args: Keys[]) {}
}
new Q<{ id: string; name: string }>().select("name", "/*ts3*/");`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"ts1", "ts2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"aaa",
				"bbb",
				"ccc",
			},
		},
	})
	f.VerifyCompletions(t, []string{"ts3"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"name",
				"id",
			},
		},
	})
}
