package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsInJsxTag(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @Filename: /a.tsx
declare namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        div: {
            /** Doc */
            foo: string
            /** Label docs */
            "aria-label": string
        }
    }
}
class Foo {
    render() {
        <div /*1*/ ></div>;
        <div  /*2*/ />
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "aria-label",
					Detail: PtrTo("(property) \"aria-label\": string"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Label docs",
						},
					},
					Kind: PtrTo(lsproto.CompletionItemKindField),
				},
				&lsproto.CompletionItem{
					Label:  "foo",
					Detail: PtrTo("(property) foo: string"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Doc",
						},
					},
					Kind: PtrTo(lsproto.CompletionItemKindField),
				},
			},
		},
	})
}
