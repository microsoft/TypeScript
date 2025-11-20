package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationClassMethod_01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `abstract class AbstractBar {
    abstract he/*declaration*/llo(): void;
}

class Bar extends AbstractBar{
    [|hello|]() {}
}

function whatever(x: AbstractBar) {
    x.he/*reference*/llo();
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "reference", "declaration")
}
