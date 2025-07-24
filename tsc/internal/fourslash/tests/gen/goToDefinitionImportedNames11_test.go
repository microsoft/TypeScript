package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionImportedNames11(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowjs: true
// @Filename: a.js
 class /*classDefinition*/Class {
     f;
 }
 module.exports = { Class };
// @Filename: b.js
const { Class } = require("./a");
 [|/*classAliasDefinition*/Class|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "classAliasDefinition")
}
