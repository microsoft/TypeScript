package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestDocCommentTemplateReturnsTag2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*0*/
function f1(x: number, y: number) {
    return 1;
}`
	capabilities := fourslash.GetDefaultCapabilities()
	capabilities.TextDocument.Completion.CompletionItem.SnippetSupport = new(false)
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()
	f.VerifyJSDocCompletion(t, "0", 7, `/**
 * 
 * @param x
 * @param y
 * @returns
 */`, new(true))
	f.VerifyJSDocCompletion(t, "0", 7, `/**
 * 
 * @param x
 * @param y
 */`, new(false))
}
