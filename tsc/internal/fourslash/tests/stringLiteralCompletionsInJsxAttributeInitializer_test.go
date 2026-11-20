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

func TestJsxAttributeInitializerLiteralCompletions(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @filename: /a.tsx
declare function Foo(args: { value: "a'b&c\\z" | "a\"b" | "&amp;"; count: 1 }): any;
const a = <Foo value=/*value*/ />;
const b = <Foo count=/*count*/ />;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	for _, test := range []struct {
		marker     string
		label      string
		insertText string
	}{
		{"value", `"a'b&c\\z"`, `"a'b&c\z"`},
		{"value", `"a\"b"`, `'a"b'`},
		{"value", `"&amp;"`, `{"&amp;"}`},
		{"count", "1", "{1}"},
	} {
		item := &lsproto.CompletionItem{Label: test.label, CommitCharacters: &[]string{}}
		if test.insertText != "" {
			item.InsertText = &test.insertText
		}
		f.VerifyCompletions(t, test.marker, &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &DefaultCommitCharacters,
				EditRange:        Ignored,
			},
			Items: &fourslash.CompletionsExpectedItems{Includes: []fourslash.CompletionsExpectedItem{item}},
		})
	}
}

func TestJsxAttributeCompletionLoneSurrogate(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @filename: /a.tsx
declare function Foo(args: { value: "\uD800" }): any;
const a = <Foo value=[|"/*quoted*/"|] />;
const b = <Foo value=/*initializer*/ />;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// A lone surrogate cannot be sent over LSP, so raw text containing one
	// arrives as replacement characters.
	const replaced = "\uFFFD\uFFFD\uFFFD"
	f.VerifyCompletions(t, "quoted", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      replaced,
					InsertText: new(`{"\uD800"}`),
					FilterText: new(`"` + replaced),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{NewText: `{"\uD800"}`, Range: f.Ranges()[0].LSRange},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "initializer", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            `"` + replaced + `"`,
					InsertText:       new(`{"\uD800"}`),
					CommitCharacters: &[]string{},
				},
			},
		},
	})
}
