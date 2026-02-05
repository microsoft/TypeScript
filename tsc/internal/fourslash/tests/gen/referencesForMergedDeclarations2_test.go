package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesForMergedDeclarations2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace ATest {
    export interface Bar { }
}

function ATest() { }

/*1*/import /*2*/alias = ATest; // definition

var a: /*3*/alias.Bar; // namespace
/*4*/alias.call(this); // value`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4")
}
