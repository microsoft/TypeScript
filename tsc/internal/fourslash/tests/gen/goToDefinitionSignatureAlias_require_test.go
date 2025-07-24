package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionSignatureAlias_require(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /a.js
module.exports = function /*f*/f() {}
// @Filename: /b.js
const f = require("./a");
[|/*use*/f|]();
// @Filename: /bar.ts
import f = require("./a");
[|/*useTs*/f|]();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "use", "useTs")
}
