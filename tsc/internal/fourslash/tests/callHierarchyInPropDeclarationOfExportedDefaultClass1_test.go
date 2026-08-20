package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCallHierarchyInPropDeclarationOfExportedDefaultClass1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /main.ts
export default class {
  onSave = () => {
    const values = [];
    values./*m1*/push(1);
  };
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "m1")
	f.VerifyBaselineCallHierarchy(t)
}
