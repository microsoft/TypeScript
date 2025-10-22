package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsClassMemberImportTypeNodeParameter1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /generation.d.ts
export type GenerationConfigType = { max_length?: number };
// @FileName: /index.d.ts
export declare class PreTrainedModel {
  _get_generation_config(
    param: import("./generation.js").GenerationConfigType,
  ): import("./generation.js").GenerationConfigType;
}

export declare class BlenderbotSmallPreTrainedModel extends PreTrainedModel {
  /*1*/
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:               "_get_generation_config",
					InsertText:          PtrTo("_get_generation_config(param: import(\"./generation.js\").GenerationConfigType): import(\"./generation.js\").GenerationConfigType;"),
					FilterText:          PtrTo("_get_generation_config"),
					AdditionalTextEdits: fourslash.AnyTextEdits,
				},
			},
		},
	})
}
