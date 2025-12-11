package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameInheritedProperties8(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C implements D {
    [|[|{| "contextRangeIndex": 0 |}prop1|]: string;|]
}

interface D extends C {
    [|[|{| "contextRangeIndex": 2 |}prop1|]: string;|]
}

var c: C;
c.[|prop1|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "prop1")
}
