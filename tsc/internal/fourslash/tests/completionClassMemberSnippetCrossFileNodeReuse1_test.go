package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionClassMemberSnippetCrossFileNodeReuse1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @filename: KlassConstructor.ts
type GenericConstructor<T> = new (...args: any[]) => T;
export type KlassConstructor<Cls extends GenericConstructor<any>> =
  GenericConstructor<InstanceType<Cls>> & { [k in keyof Cls]: Cls[k] };
// @filename: ElementNode.ts
import { KlassConstructor } from "./KlassConstructor";

export type NodeKey = string;

export class ElementNode {
  ["constructor"]!: KlassConstructor<typeof ElementNode>;
}
// @filename: CollapsibleContainerNode.ts
import { ElementNode, NodeKey } from "./ElementNode";

export class CollapsibleContainerNode extends ElementNode {
  __open: boolean;

  /*1*/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts786 := f.GetOptions()
	opts786.FormatCodeSettings.InsertSpaceAfterConstructor = core.TSFalse
	f.Configure(t, opts786)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:               "[\"constructor\"]",
					InsertText:          new("[\"constructor\"]: KlassConstructor<typeof ElementNode>;"),
					FilterText:          new("[\"constructor\"]"),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					Data: &lsproto.CompletionItemData{
						Source: "ClassMemberSnippet/",
					},
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
}
