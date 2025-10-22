package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCompletionAmbientMergedModule1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @module: commonjs
// @filename: /node_modules/@types/vscode/index.d.ts
declare module "vscode" {
  export class Position {
    readonly line: number;
    readonly character: number;
  }
}
// @filename: src/motion.ts
import { Position } from "vscode";

export abstract class MoveQuoteMatch {
  public override async execActionWithCount(
    position: Position,
  ): Promise<void> {}
}

declare module "vscode" {
  interface Position {
    toString(): string;
  }
}
// @filename: src/smartQuotes.ts
import { MoveQuoteMatch } from "./motion";

export class MoveInsideNextQuote extends MoveQuoteMatch {/*1*/
  keys = ["i", "n", "q"];
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
					Label:               "execActionWithCount",
					InsertText:          PtrTo("public execActionWithCount(position: Position): Promise<void> {\n}"),
					FilterText:          PtrTo("execActionWithCount"),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					Data: PtrTo(any(&ls.CompletionItemData{
						Source: "ClassMemberSnippet/",
					})),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo("1"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "execActionWithCount",
		Source:      "ClassMemberSnippet/",
		Description: "Includes imports of types referenced by 'execActionWithCount'",
		NewFileContent: PtrTo(`import { Position } from "vscode";
import { MoveQuoteMatch } from "./motion";

export class MoveInsideNextQuote extends MoveQuoteMatch {
  keys = ["i", "n", "q"];
}`),
	})
}
