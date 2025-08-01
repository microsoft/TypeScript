package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocFunctionSignatures12(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: jsDocFunctionSignatures.js
/**
 * @param {{
 *   stringProp: string,
 *   numProp: number,
 *   boolProp: boolean,
 *   anyProp: *,
 *   anotherAnyProp:
 *   *,
 *   functionProp:
 *   function(string,
 *   *):
 *   *
 * }} o
 */
function f1(o) {
    o/**/;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyQuickInfoIs(t, "(parameter) o: {\n    stringProp: string;\n    numProp: number;\n    boolProp: boolean;\n    anyProp: any;\n    anotherAnyProp: any;\n    functionProp: (arg0: string, arg1: any) => any;\n}", "")
}
