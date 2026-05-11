package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCallHierarchyIncomingCallsObjectLiteralMethodInIdentifierComputedProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const key = "x";
const obj = {
  [key]: {
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
