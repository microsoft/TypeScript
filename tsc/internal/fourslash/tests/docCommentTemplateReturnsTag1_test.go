package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestDocCommentTemplateReturnsTag1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*0*/
function f1() {}
/*1*/
function f2() {
    return 1;
}
/*2*/
const f3 = () => 1;
/*3*/
const f3 = () => {
    return 1;
}
class Foo {
    /*4*/
    m1() {}

    /*5*/
    m2() {
       return 1;
    }
}`
	capabilities := fourslash.GetDefaultCapabilities()
	capabilities.TextDocument.Completion.CompletionItem.SnippetSupport = new(false)
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()
	f.VerifyJSDocCompletion(t, "0", 3, `/** */`, nil)
	f.VerifyJSDocCompletion(t, "1", 7, `/**
 * 
 * @returns
 */`, nil)
	f.VerifyJSDocCompletion(t, "2", 7, `/**
 * 
 * @returns
 */`, nil)
	f.VerifyJSDocCompletion(t, "3", 7, `/**
 * 
 * @returns
 */`, nil)
	f.VerifyJSDocCompletion(t, "4", 3, `/** */`, nil)
	f.VerifyJSDocCompletion(t, "5", 11, `/**
     * 
     * @returns
     */`, nil)
}
