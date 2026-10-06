package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestHoverImportEqualsAliasJSDoc(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare namespace a {
    /** on the declaration */
    export function fn(): void;
    /** on the declaration */
    export const value: number;
    /** on the declaration */
    export interface Shape {}
    export function bare(): void;
}
declare namespace b {
    /** on the alias */
    export import fn = a.fn;
    /** on the alias */
    export import value = a.value;
    /** on the alias */
    export import Shape = a.Shape;
    /** on the alias */
    export import bare = a.bare;
}
b./*fn*/fn;
b./*fnCall*/fn();
b./*value*/value;
let shape: b./*Shape*/Shape;
b./*bare*/bare;
b./*bareCall*/bare();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
	f.VerifyCompletions(t, "fn", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "fn",
					Detail: new("(alias) function a.fn(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "on the alias",
						},
					},
				},
			},
		},
	})
}
