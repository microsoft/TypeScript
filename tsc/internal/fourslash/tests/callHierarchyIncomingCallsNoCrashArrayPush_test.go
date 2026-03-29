package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCallHierarchyIncomingCallsNoCrashArrayPush(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function splitNames(name: string) {
  return (name || "").split(",").filter(Boolean);
}

async function trim(packageNames: string[]) {
  const nameOrPkgs = packageNames.filter(Boolean);
  const names = [];
  for (const nameOrPkg of nameOrPkgs) {
    try {
      names./*push*/push(nameOrPkg);
    } catch (error) {
    }
  }
  return names;
}
	`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "push")
	f.VerifyBaselineCallHierarchy(t)
}
