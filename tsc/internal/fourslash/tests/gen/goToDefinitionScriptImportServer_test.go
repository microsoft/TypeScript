package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionScriptImportServer(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/scriptThing.ts
/*1d*/console.log("woooo side effects")
// @Filename: /home/src/workspaces/project/stylez.css
/*2d*/div {
  color: magenta;
}
// @Filename: /home/src/workspaces/project/moduleThing.ts
import [|/*1*/"./scriptThing"|];
import [|/*2*/"./stylez.css"|];
import [|/*3*/"./foo.txt"|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1", "2", "3")
}
