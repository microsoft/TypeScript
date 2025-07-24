package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionReturn2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo() {
    return /*end*/() => {
        [|/*start*/return|] 10;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "start")
}
