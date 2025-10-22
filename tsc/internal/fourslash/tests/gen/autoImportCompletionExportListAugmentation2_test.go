package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCompletionExportListAugmentation2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /node_modules/@sapphire/pieces/index.d.ts
interface Container {
  stores: unknown;
}

declare class Piece {
  get container(): Container;
}

declare class AliasPiece extends Piece {}

export { AliasPiece, type Container };
// @Filename: /node_modules/@sapphire/framework/index.d.ts
import { AliasPiece } from "@sapphire/pieces";

declare class Command extends AliasPiece {}

declare module "@sapphire/pieces" {
  interface Container {
    client: unknown;
  }
}

export { Command };
// @Filename: /index.ts
import "@sapphire/pieces";
import { Command } from "@sapphire/framework";
class PingCommand extends Command {
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
					InsertText:          PtrTo("get container(): Container {\n}"),
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
		NewFileContent: PtrTo(`import "@sapphire/pieces";
import { Command } from "@sapphire/framework";
import { Container } from "@sapphire/pieces";
class PingCommand extends Command {
  
}`),
	})
}
