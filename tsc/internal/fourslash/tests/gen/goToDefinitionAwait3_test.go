package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionAwait3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {
    notAsync() {
      [|/*start1*/await|] Promise.resolve(0);
    }

    async /*end2*/foo() {
      [|/*start2*/await|] Promise.resolve(0);
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "start1", "start2")
}
