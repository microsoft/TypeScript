package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestStringLiteralCompletionsInJsxAttributeInitializer(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @filename: /a.tsx
type Props = { a: number } | { b: "somethingelse", c: 0 | 1 };
declare function Foo(args: Props): any

const a1 = <Foo b={"/*1*/"} />
const a2 = <Foo b="/*2*/" />
const a3 = <Foo b="somethingelse"/*3*/ />
const a4 = <Foo b={"somethingelse"} /*4*/ />
const a5 = <Foo b={"somethingelse"} c={0} /*5*/ />`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"somethingelse",
			},
		},
	})
	f.VerifyCompletions(t, []string{"3", "4"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Excludes: []string{
				"\"somethingelse\"",
			},
		},
	})
	f.VerifyCompletions(t, []string{"5"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Excludes: []string{
				"0",
				"1",
			},
		},
	})
}
