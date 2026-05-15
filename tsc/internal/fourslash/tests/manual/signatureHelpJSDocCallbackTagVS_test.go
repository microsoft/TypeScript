package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpJSDocCallbackTagVS(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @allowNonTsExtensions: true
// @Filename: jsdocCallbackTag.js
/**
 * @callback FooHandler - A kind of magic
 * @param {string} eventName - So many words
 * @param eventName2 {number | string} - Silence is golden
 * @param eventName3 - Osterreich mos def
 * @return {number} - DIVEKICK
 */
/**
 * @type {FooHandler} callback
 */
var t;

/**
 * @callback FooHandler2 - What, another one?
 * @param {string=} eventName - it keeps happening
 * @param {string} [eventName2] - i WARNED you dog
 */
/**
 * @type {FooHandler2} callback
 */
var t2;
t(/*4*/"!", /*5*/12, /*6*/false);`
	f, done := fourslash.NewFourslash(t, &lsproto.ClientCapabilities{VSSupportsVisualStudioExtensions: new(true)}, content)
	defer done()
	f.VerifyBaselineSignatureHelp(t)
}
