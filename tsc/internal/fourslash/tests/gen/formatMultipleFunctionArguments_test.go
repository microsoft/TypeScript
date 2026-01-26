package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatMultipleFunctionArguments(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
 someRandomFunction({
   prop1: 1,
   prop2: 2
 }, {
   prop3: 3,
   prop4: 4
 }, {
   prop5: 5,
   prop6: 6
 });

 someRandomFunction(
     { prop7: 1, prop8: 2 },
     { prop9: 3, prop10: 4 },
     {
       prop11: 5,
       prop2: 6
     }
 );`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `
someRandomFunction({
    prop1: 1,
    prop2: 2
}, {
    prop3: 3,
    prop4: 4
}, {
    prop5: 5,
    prop6: 6
});

someRandomFunction(
    { prop7: 1, prop8: 2 },
    { prop9: 3, prop10: 4 },
    {
        prop11: 5,
        prop2: 6
    }
);`)
}
