package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestReferencesForNoContext(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace modTest {
    //Declare
    export var modVar:number;
    /*1*/

    //Increments
    modVar++;

    class testCls{
        /*2*/
    }

    function testFn(){
        //Increments
        modVar++;
    }  /*3*/
/*4*/
    namespace testMod {
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4")
}
