package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestDocCommentTemplateClassDeclMethods02(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {
    /*0*/
    [Symbol.iterator]() {
        return undefined;
    }
    /*1*/
    [1 + 2 + 3 + Math.rand()](x: number, y: string, z = true) { }
}`
	capabilities := fourslash.GetDefaultCapabilities()
	capabilities.TextDocument.Completion.CompletionItem.SnippetSupport = new(false)
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()
	f.VerifyJSDocCompletion(t, "0", 11, `/**
     * 
     * @returns
     */`, nil)
	f.VerifyJSDocCompletion(t, "1", 11, `/**
     * 
     * @param x
     * @param y
     * @param z
     */`, nil)
}
