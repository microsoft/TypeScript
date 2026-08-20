package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoUntypedModuleImport(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
// @Filename: node_modules/foo/index.js
 /*index*/{}
// @Filename: a.ts
import /*foo*/foo from /*fooModule*/"foo";
/*fooCall*/foo();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "a.ts")
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
	f.GoToMarker(t, "fooModule")
	f.VerifyQuickInfoIs(t, "", "")
	f.GoToMarker(t, "foo")
	f.VerifyQuickInfoIs(t, "import foo", "")
	f.VerifyBaselineFindAllReferences(t, "foo", "fooModule", "fooCall")
	f.VerifyBaselineGoToDefinition(t, false, "fooModule", "foo")
}
