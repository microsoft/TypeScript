package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocTypedefTagRename04(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form2.js

function test1() {
   /** @typedef {(string | number)} NumberLike */

   /** @type {/*1*/NumberLike} */
   var numberLike;
}
function test2() {
   /** @typedef {(string | number)} NumberLike2 */

   /** @type {NumberLike2} */
   var n/*2*/umberLike2;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "2")
	f.VerifyQuickInfoExists(t)
	f.GoToMarker(t, "1")
	f.Insert(t, "111")
	f.GoToMarker(t, "2")
	f.VerifyQuickInfoExists(t)
}
