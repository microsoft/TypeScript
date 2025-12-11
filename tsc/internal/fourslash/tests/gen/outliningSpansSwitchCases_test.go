package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOutliningSpansSwitchCases(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `switch (undefined)[| {
 case 0:[|
   console.log(1)
   console.log(2)
   break;
   console.log(3);|]
 case 1:[|
   break;|]
 case 2:[|
   break;
   console.log(3);|]
 case 3:[|
   console.log(4);|]
 
 case 4:
 case 5:
 case 6:[|


   console.log(5);|]
 
 case 7:[| console.log(6);|]

 case 8:[| [|{
   console.log(8);
   break;
 }|]
 console.log(8);|]

 default:[|
   console.log(7);
   console.log(8);|]
}|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
