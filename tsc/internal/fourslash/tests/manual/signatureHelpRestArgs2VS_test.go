package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpRestArgs2VS(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @allowJs: true
// @checkJs: true
// @filename: index.js
const promisify = function (thisArg, fnName) {
    const fn = thisArg[fnName];
    return function () {
        return new Promise((resolve) => {
            fn.call(thisArg, ...arguments, /*1*/);
        });
    };
};`
	f, done := fourslash.NewFourslash(t, &lsproto.ClientCapabilities{VSSupportsVisualStudioExtensions: new(true)}, content)
	defer done()
	f.VerifyBaselineSignatureHelp(t)
}
