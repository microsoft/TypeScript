package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListAtNodeBoundary(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Iterator<T, U> {
    (value: T, index: any, list: any): U;
}

interface WrappedArray<T> {
    map<U>(iterator: Iterator<T, U>, context?: any): U[];
}

interface Underscore {
    <T>(list: T[]): WrappedArray<T>;
    map<T, U>(list: T[], iterator: Iterator<T, U>, context?: any): U[];
}

declare var _: Underscore;
var a: string[];
var e = a.map(x => x./**/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"charAt",
			},
		},
	})
}
