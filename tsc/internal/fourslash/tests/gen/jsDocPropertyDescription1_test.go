package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocPropertyDescription1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface StringExample {
    /** Something generic */
    [p: string]: any; 
    /** Something specific */
    property: number;
}
function stringExample(e: StringExample) {
    console.log(e./*property*/property);
    console.log(e./*string*/anything); 
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "property", "(property) StringExample.property: number", "(property) StringExample.property: number")
	f.VerifyQuickInfoAt(t, "string", "(index) StringExample[string]: any", "(index) StringExample[string]: any")
}
