package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesForNoContext(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module modTest {
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
    module testMod {
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4")
}
