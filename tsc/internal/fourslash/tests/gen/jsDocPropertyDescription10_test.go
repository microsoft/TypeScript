package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocPropertyDescription10(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class MultipleClass {
    /** Something generic */
    [key: number | symbol | ` + "`" + `data-${string}` + "`" + ` | ` + "`" + `data-${number}` + "`" + `]: string;
}
function multipleClass(e: typeof MultipleClass) {
    console.log(e./*multipleClass*/anything);
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "multipleClass", "any", "")
}
