package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestJsDocDontBreakWithNamespacesVS(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: jsDocDontBreakWithNamespaces.js
/**
 * @returns {module:@nodefuel/web~Webserver~wsServer#hello} Websocket server object
 */
function foo() { }
foo(''/*foo*/);

/**
 * @type {module:xxxxx} */
 */
function bar() { }
bar(''/*bar*/);

/** @type {function(module:xxxx, module:xxxx): module:xxxxx} */
function zee() { }
zee(''/*zee*/);`
	f, done := fourslash.NewFourslash(t, &lsproto.ClientCapabilities{VSSupportsVisualStudioExtensions: new(true)}, content)
	defer done()
	f.VerifyBaselineSignatureHelp(t)
}
