package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestProcessInvalidSyntax1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: decl.js
var obj = {};
// @Filename: unicode1.js
obj.𝒜 ;
// @Filename: unicode2.js
obj.¬ ;
// @Filename: unicode3.js
obj¬
// @Filename: forof.js
for (obj/**/.prop of arr) {

}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineRename(t, nil /*preferences*/, "")
}
