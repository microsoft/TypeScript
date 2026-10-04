package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestDocCommentTemplateInterfacePropertyFunctionType(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    /**/
    foo: (a: number, b: string) => void;
}`
	capabilities := fourslash.GetDefaultCapabilities()
	capabilities.TextDocument.Completion.CompletionItem.SnippetSupport = new(false)
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()
	f.VerifyJSDocCompletion(t, "", 11, `/**
     * 
     * @param a
     * @param b
     * @returns
     */`, nil)
	f.VerifyJSDocCompletion(t, "", 11, `/**
     * 
     * @param a
     * @param b
     */`, new(false))
}
