package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocTypedefTagRename03(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form3.js

/**
 * [|@typedef /*1*/[|{| "contextRangeIndex": 0 |}Person|]
 * @type {Object}
 * @property {number} age
 * @property {string} name
 |]*/

/** @type {/*2*/[|Person|]} */
var person;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToFile(t, "jsDocTypedef_form3.js")
	f.VerifyBaselineRename(t, nil /*preferences*/, ToAny(f.GetRangesByText().Get("Person"))...)
}
