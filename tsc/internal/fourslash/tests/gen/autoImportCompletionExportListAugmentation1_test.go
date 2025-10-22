package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCompletionExportListAugmentation1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /node_modules/@sapphire/pieces/index.d.ts
interface Container {
  stores: unknown;
}

declare class Piece {
  container: Container;
}

export { Piece, type Container };
// @FileName: /augmentation.ts
declare module "@sapphire/pieces" {
  interface Container {
    client: unknown;
  }
  export { Container };
}
// @Filename: /index.ts
import { Piece } from "@sapphire/pieces";
class FullPiece extends Piece {
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
					Label:               "container",
					InsertText:          PtrTo("container: Container;"),
					FilterText:          PtrTo("container"),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					Data: PtrTo(any(&ls.CompletionItemData{
						Source: "ClassMemberSnippet/",
					})),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo("1"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "container",
		Source:      "ClassMemberSnippet/",
		Description: "Includes imports of types referenced by 'container'",
		NewFileContent: PtrTo(`import { Container, Piece } from "@sapphire/pieces";
class FullPiece extends Piece {
  
}`),
	})
}
