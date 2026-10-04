package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRenameInConfiguredProject(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: referencesForGlobals_1.ts
[|var [|{| "contextRangeIndex": 0 |}globalName|] = 0;|]
// @Filename: referencesForGlobals_2.ts
var y = [|globalName|];
// @Filename: tsconfig.json
{ "files": ["referencesForGlobals_1.ts", "referencesForGlobals_2.ts"], "compilerOptions": { "lib": ["es5"] } }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyBaselineRename(t, nil /*preferences*/, ToAny(f.Ranges()[1:])...)
}
