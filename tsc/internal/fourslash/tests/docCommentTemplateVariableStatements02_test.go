package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestDocCommentTemplateVariableStatements02(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*a*/
var a1 = 10, a2 = 20;

/*b*/
let b1 = "", b2 = true;

/*c*/
const c1 = 30, c2 = 40;

/*d*/
let d1 = function d(x, y, z) {
    return +(x + y + z);
}, d2 = 50;

/*e*/
let e1 = class E {
    constructor(a, b, c) {
        this.a = a;
        this.b = b || (this.c = c);
    }
}, e2 = () => 100;

/*f*/
let f1 = {
    foo: 10,
    bar: "20"
}, f2 = null;`
	capabilities := fourslash.GetDefaultCapabilities()
	capabilities.TextDocument.Completion.CompletionItem.SnippetSupport = new(false)
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()
	for _, varName := range []string{"a", "b", "c", "d", "e", "f"} {
		f.VerifyJSDocCompletion(t, varName, 3, `/** */`, nil)
	}
}
