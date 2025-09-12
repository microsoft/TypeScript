package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocCallbackTagRename01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowNonTsExtensions: true
// @Filename: jsDocCallback.js

/**
 * [|@callback [|{| "contextRangeIndex": 0 |}FooCallback|]
 * @param {string} eventName - Rename should work
 |]*/

/** @type {/*1*/[|FooCallback|]} */
var t;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1])
}
