package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInTypeLiteralInTypeParameter16(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    one: string;
    two: number;
}
interface Bar {
    three: boolean;
    four: {
        five: unknown;
    };
}

(<T extends Foo>() => {})<{/*0*/}>;

(class <T extends Foo>{})<{/*1*/}>;

declare const a: {
    new <T extends Foo>(): {};
    <T extends Bar>(): {};
}
a<{/*2*/}>;

declare const b: {
    new <T extends { one: true }>(): {};
    <T extends { one: false }>(): {};
}
b<{/*3*/}>;`
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
				"one",
				"two",
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"one",
				"two",
				"three",
				"four",
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{},
		},
	})
}
