package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocPropertyDescription4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface MultipleExample {
    /** Something generic */
    [key: string | number | symbol]: string;
}
function multipleExample(e: MultipleExample) {
    console.log(e./*multiple*/anything);
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "multiple", "(index) MultipleExample[string | number | symbol]: string", "Something generic")
}
