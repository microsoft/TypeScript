package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocFunctionSignatures6(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: Foo.js
/**
 * @param {string} p1 - A string param
 * @param {string?} p2 - An optional param
 * @param {string} [p3] - Another optional param
 * @param {string} [p4="test"] - An optional param with a default value
 */
function f1(p1, p2, p3, p4){}
f1(/*1*/'foo', /*2*/'bar', /*3*/'baz', /*4*/'qux');`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineSignatureHelp(t)
}
