package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionScriptImport(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: scriptThing.ts
/*1d*/console.log("woooo side effects")
// @filename: stylez.css
/*2d*/div {
  color: magenta;
}
// @filename: moduleThing.ts
import [|/*1*/"./scriptThing"|];
import [|/*2*/"./stylez.css"|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1", "2")
}
