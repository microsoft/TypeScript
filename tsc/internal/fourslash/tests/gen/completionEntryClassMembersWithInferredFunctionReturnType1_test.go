package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionEntryClassMembersWithInferredFunctionReturnType1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /tokenizer.ts
export default abstract class Tokenizer {
  errorBuilder() {
    return (pos: number, lineStart: number, curLine: number) => {};
  }
}
// @filename: /expression.ts
import Tokenizer from "./tokenizer.js";

export default abstract class ExpressionParser extends Tokenizer {
  /**/
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "errorBuilder",
					InsertText: PtrTo("errorBuilder(): (pos: number, lineStart: number, curLine: number) => void {\n}"),
					FilterText: PtrTo("errorBuilder"),
				},
			},
		},
	})
}
