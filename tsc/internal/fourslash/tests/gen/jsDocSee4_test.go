package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocSee4(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class [|/*def1*/A|] {
    foo () { }
}
declare const [|/*def2*/a|]: A;
/**
 * @see {/*use1*/[|A|]#foo}
 */
const t1 = 1
/**
 * @see {/*use2*/[|a|].foo()}
 */
const t2 = 1
/**
 * @see {@link /*use3*/[|a|].foo()}
 */
const t3 = 1`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "use1", "use2", "use3")
}
