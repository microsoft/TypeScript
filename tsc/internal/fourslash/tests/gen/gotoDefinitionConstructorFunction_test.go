package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGotoDefinitionConstructorFunction(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: gotoDefinitionConstructorFunction.js
function /*end*/StringStreamm() {
}
StringStreamm.prototype = {
};

function runMode () {
new [|/*start*/StringStreamm|]()
};`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "start")
}
