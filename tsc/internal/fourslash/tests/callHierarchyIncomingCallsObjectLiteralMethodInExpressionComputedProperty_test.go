package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCallHierarchyIncomingCallsObjectLiteralMethodInExpressionComputedProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const obj = {
  [1 + 2]: {
    method() {
      return ""./*split*/split(",");
    }
  }
};
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "split")
	f.VerifyBaselineCallHierarchy(t)
}
