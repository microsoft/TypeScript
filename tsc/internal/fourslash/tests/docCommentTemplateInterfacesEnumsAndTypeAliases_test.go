package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestDocCommentTemplateInterfacesEnumsAndTypeAliases(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*interfaceFoo*/
interface Foo {
    /*propertybar*/
    bar: any;

    /*methodbaz*/
    baz(message: any): void;

    /*methodUnit*/
    unit(): void;
}

/*enumStatus*/
const enum Status {
    /*memberOpen*/
    Open,

    /*memberClosed*/
    Closed
}

/*aliasBar*/
type Bar = Foo & any;`
	capabilities := fourslash.GetDefaultCapabilities()
	capabilities.TextDocument.Completion.CompletionItem.SnippetSupport = new(false)
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()
	f.VerifyJSDocCompletion(t, "interfaceFoo", 3, `/** */`, nil)
	f.VerifyJSDocCompletion(t, "propertybar", 3, `/** */`, nil)
	f.VerifyJSDocCompletion(t, "methodbaz", 11, `/**
     * 
     * @param message
     */`, nil)
	f.VerifyJSDocCompletion(t, "methodUnit", 3, `/** */`, nil)
	f.VerifyJSDocCompletion(t, "enumStatus", 3, `/** */`, nil)
	f.VerifyJSDocCompletion(t, "memberOpen", 3, `/** */`, nil)
	f.VerifyJSDocCompletion(t, "memberClosed", 3, `/** */`, nil)
}
