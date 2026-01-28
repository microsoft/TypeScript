package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Test for issue: Completions crash after `import` when statement is preceded by JSDoc.
// When requesting completions after an import keyword preceded by JSDoc,
// getSingleLineReplacementSpanForImportCompletionNode panics because it assumes
// the ImportKeyword is on a single line, but node.Pos() includes JSDoc comments.
func TestCompletionAfterImportWithJSDoc(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /index.ts
/** hello! */
import /**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Should not crash when requesting completions after import preceded by JSDoc
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{},
	})
}
