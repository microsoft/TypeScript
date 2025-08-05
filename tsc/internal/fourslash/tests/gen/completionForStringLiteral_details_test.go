package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteral_details(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /other.ts
export const x = 0;
// @Filename: /a.ts
import {} from ".//*path*/";

const x: "a" = "[|/*type*/|]";

interface I {
    /** Prop doc */
    x: number;
    /** Method doc */
    m(): void;
}
declare const o: I;
o["[|/*prop*/|]"];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "path", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "other",
					Detail: PtrTo("other"),
					Kind:   PtrTo(lsproto.CompletionItemKindFile),
				},
			},
		},
	})
	f.VerifyCompletions(t, "type", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("a"),
					Kind:   PtrTo(lsproto.CompletionItemKindConstant),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "a",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "prop", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "m",
					Detail: PtrTo("(method) I.m(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Method doc",
						},
					},
					Kind: PtrTo(lsproto.CompletionItemKindMethod),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "m",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "x",
					Detail: PtrTo("(property) I.x: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Prop doc",
						},
					},
					Kind: PtrTo(lsproto.CompletionItemKindField),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "x",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
			},
		},
	})
}
