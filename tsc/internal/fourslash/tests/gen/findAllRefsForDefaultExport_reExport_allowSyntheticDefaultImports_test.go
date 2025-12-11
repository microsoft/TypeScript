package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsForDefaultExport_reExport_allowSyntheticDefaultImports(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowSyntheticDefaultImports: true
// @Filename: /export.ts
const /*0*/foo = 1;
export = /*1*/foo;
// @Filename: /re-export.ts
export { /*2*/default } from "./export";
// @Filename: /re-export-dep.ts
import /*3*/fooDefault from "./re-export";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineFindAllReferences(t, "0", "1", "2", "3")
}
