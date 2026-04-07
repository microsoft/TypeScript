package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListAlreadyImportedNamespaceExportAlias(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /values.ts
export const A = 1;
export const B = 2;

// @Filename: /namespace.ts
import * as Group from "./values.js";
type Group = (typeof Group)[keyof typeof Group];
export { Group };

// @Filename: /index.ts
import { Group } from "./namespace.js";

console.log(Grou/**/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	result := f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{Label: "Group"},
			},
		},
	})
	result.AndHasNoCodeAction(t, &fourslash.CompletionsExpectedCodeAction{
		Name:   "Group",
		Source: "./namespace.js",
	})
}
