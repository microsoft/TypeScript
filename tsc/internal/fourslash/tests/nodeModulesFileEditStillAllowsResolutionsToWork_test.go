package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNodeModulesFileEditStillAllowsResolutionsToWork(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{ "compilerOptions": { "module": "nodenext", "strict": true } }
// @Filename: /package.json
{ "type": "module", "imports": { "#foo": "./foo.cjs" } }
// @Filename: /foo.cts
export const x = 1;
// @Filename: /index.ts
import * as mod from "#foo";
/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.Insert(t, "mod.x")
	f.VerifyNoErrors(t)
	f.VerifySuggestionDiagnostics(t, nil)
}
