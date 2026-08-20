package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestJsdocTypedefTagRename01(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form1.js

/** @typedef {(string | number)} */
[|var [|{| "contextRangeIndex": 0 |}NumberLike|];|]

[|NumberLike|] = 10;

/** @type {[|NumberLike|]} */
var numberLike;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyBaselineRename(t, nil /*preferences*/, ToAny(f.Ranges()[1:])...)
}
