package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInTypeLiteralInTypeParameter12(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    kind: 'foo';
    one: string;
}
interface Bar {
    kind: 'bar';
    two: number;
}

declare function a<T extends Foo>(): void
declare function a<T extends Bar>(): void
a<{ kind: 'bar', /*0*/ }>();

declare function b<T extends Foo>(kind: 'foo'): void
declare function b<T extends Bar>(kind: 'bar'): void
b<{/*1*/}>('bar');`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "0", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"one",
				"two",
			},
		},
	})
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"kind",
				"one",
				"two",
			},
		},
	})
}
