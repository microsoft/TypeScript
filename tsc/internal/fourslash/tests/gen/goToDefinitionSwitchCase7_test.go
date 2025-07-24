package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionSwitchCase7(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `switch (null) {
  case null:
    export [|/*start*/default|] 123;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "start")
}
