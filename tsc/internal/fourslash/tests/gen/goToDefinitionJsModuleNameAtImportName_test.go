package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionJsModuleNameAtImportName(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /foo.js
 /*moduleDef*/function notExported() { }
 class Blah {
    abc = 123;
 }
 module.exports.Blah = Blah;
// @Filename: /bar.js
const [|/*importDef*/BlahModule|] = require("./foo.js");
new [|/*importUsage*/BlahModule|].Blah()
// @Filename: /barTs.ts
import [|/*importDefTs*/BlahModule|] = require("./foo.js");
new [|/*importUsageTs*/BlahModule|].Blah()`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "importDef", "importUsage", "importDefTs", "importUsageTs")
}
