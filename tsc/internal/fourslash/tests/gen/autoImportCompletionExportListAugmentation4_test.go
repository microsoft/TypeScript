package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCompletionExportListAugmentation4(t *testing.T) {
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

export { Piece as Alias, type Container };
// @Filename: /node_modules/@sapphire/framework/index.d.ts
import { Alias } from "@sapphire/pieces";

declare class Command extends Alias {}

declare module "@sapphire/pieces" {
  interface Container {
    client: unknown;
  }
}

export { Command as CommandAlias };
// @Filename: /index.ts
import "@sapphire/pieces";
import { CommandAlias } from "@sapphire/framework";
class PingCommand extends CommandAlias {
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
import { CommandAlias } from "@sapphire/framework";
import { Container } from "@sapphire/pieces";
class PingCommand extends CommandAlias {
  
}`),
	})
}
