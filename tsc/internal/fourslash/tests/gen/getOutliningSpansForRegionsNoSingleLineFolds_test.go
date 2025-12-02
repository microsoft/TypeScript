package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOutliningSpansForRegionsNoSingleLineFolds(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|//#region
function foo()[| {

}|]
[|//these
//should|]
//#endregion not you|]
[|// be
// together|]

[|//#region bla bla bla

function bar()[| { }|]

//#endregion|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.MarkTestAsStradaServer()
	f.VerifyOutliningSpans(t)
}
