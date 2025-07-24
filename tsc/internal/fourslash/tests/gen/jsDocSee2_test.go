package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocSee2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** @see {/*use1*/[|foooo|]} unknown reference*/
const a = ""
/** @see {/*use2*/[|@bar|]} invalid tag*/
const b = ""
/** @see /*use3*/[|foooo|] unknown reference without brace*/
const c = ""
/** @see /*use4*/[|@bar|] invalid tag without brace*/
const [|/*def1*/d|] = ""
/** @see {/*use5*/[|d@fff|]} partial reference */
const e = ""
/** @see /*use6*/[|@@@@@@|] total invalid tag*/
const f = ""
/** @see d@{/*use7*/[|fff|]} partial reference */
const g = ""`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "use1", "use2", "use3", "use4", "use5", "use6", "use7")
}
