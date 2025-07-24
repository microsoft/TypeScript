package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocSee1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface [|/*def1*/Foo|] {
    foo: string
}
namespace NS {
    export interface [|/*def2*/Bar|] {
        baz: Foo
    }
}
/** @see {/*use1*/[|Foo|]} foooo*/
const a = ""
/** @see {NS./*use2*/[|Bar|]} ns.bar*/
const b = ""
/** @see /*use3*/[|Foo|] f1*/
const c = ""
/** @see NS./*use4*/[|Bar|] ns.bar*/
const [|/*def3*/d|] = ""
/** @see /*use5*/[|d|] dd*/
const e = ""`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "use1", "use2", "use3", "use4", "use5")
}
