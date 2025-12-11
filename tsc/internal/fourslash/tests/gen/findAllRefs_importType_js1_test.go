package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefs_importType_js1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @Filename: /a.js
module.exports = class /**/C {};
module.exports.D = class D {};
// @Filename: /b.js
/** @type {import("./a")} */
const x = 0;
/** @type {import("./a").D} */
const y = 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineFindAllReferences(t, "")
}
