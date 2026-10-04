package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestJsDocPropertyDescription3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface LiteralExample {
    /** Something generic */
    [key: ` + "`" + `data-${string}` + "`" + `]: string;
     /** Something else */
    [key: ` + "`" + `prefix${number}` + "`" + `]: number;
}
function literalExample(e: LiteralExample) {
    console.log(e./*literal*/anything);
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "literal", "any", "")
}
