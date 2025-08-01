package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetJavaScriptQuickInfo7(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowNonTsExtensions: true
// @Filename: file.js
/**
 * This is a very cool function that is very nice.
 * @returns something
 * @param p anotherthing
 */
function a1(p) {
	try {
		throw new Error('x');
	} catch (x) { x--; }
	return 23;
}

x - /**/a1()`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "function a1(p: any): number", "function a1(p: any): number")
}
