package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExportEqualsInterfaceA(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: exportEqualsInterface_A.ts
interface A {
    p1: number;
}
export = A;
/**/
var i: I1;
var n: number = i.p1;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.Insert(t, "import I1 = require(\"exportEqualsInterface_A\");")
}
