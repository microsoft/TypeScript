package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocTypeTagQuickInfo2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: jsDocTypeTag2.js
/** @type {string} */
var /*1*/s;
/** @type {number} */
var /*2*/n;
/** @type {boolean} */
var /*3*/b;
/** @type {void} */
var /*4*/v;
/** @type {undefined} */
var /*5*/u;
/** @type {null} */
var /*6*/nl;
/** @type {array} */
var /*7*/a;
/** @type {promise} */
var /*8*/p;
/** @type {?number} */
var /*9*/nullable;
/** @type {function} */
var /*10*/func;
/** @type {function (number): number} */
var /*11*/func1;
/** @type {string | number} */
var /*12*/sOrn;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
