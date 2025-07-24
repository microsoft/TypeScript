package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionFunctionType(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const /*constDefinition*/c: () => void;
/*constReference*/c();
function test(/*cbDefinition*/cb: () => void) {
    /*cbReference*/cb();
}
class C {
    /*propDefinition*/prop: () => void;
    m() {
        this./*propReference*/prop();
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "constReference", "cbReference", "propReference")
}
