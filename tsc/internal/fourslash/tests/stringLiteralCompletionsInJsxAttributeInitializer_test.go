package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
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

func TestStringLiteralCompletionsInJsxAttributeEscaping(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @filename: /a.tsx
declare function Foo(args: { value: "a'b&c\\z" | "a\"b" | "&amp;" }): any;
const a = <Foo value="[|/*raw*/|]" />;
const b = <Foo value=[|"/*container*/"|] />;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	textEdit := func(lsRange lsproto.Range, text string) *lsproto.TextEditOrInsertReplaceEdit {
		return &lsproto.TextEditOrInsertReplaceEdit{
			TextEdit: &lsproto.TextEdit{NewText: text, Range: lsRange},
		}
	}
	verify := func(marker string, items ...fourslash.CompletionsExpectedItem) {
		f.VerifyCompletions(t, marker, &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &DefaultCommitCharacters,
				EditRange:        Ignored,
			},
			Items: &fourslash.CompletionsExpectedItems{Includes: items},
		})
	}
	verify("raw", &lsproto.CompletionItem{
		Label:    `a'b&c\z`,
		TextEdit: textEdit(f.Ranges()[0].LSRange, `a'b&c\z`),
	})
	verify("container",
		&lsproto.CompletionItem{
			Label:      `a"b`,
			InsertText: new(`{"a\"b"}`),
			FilterText: new(`"a"b`),
			TextEdit:   textEdit(f.Ranges()[1].LSRange, `{"a\"b"}`),
		},
		&lsproto.CompletionItem{
			Label:      `&amp;`,
			InsertText: new(`{"&amp;"}`),
			FilterText: new(`"&amp;`),
			TextEdit:   textEdit(f.Ranges()[1].LSRange, `{"&amp;"}`),
		},
	)
}
