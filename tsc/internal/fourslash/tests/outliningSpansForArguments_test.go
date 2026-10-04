package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOutliningSpansForArguments(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `console.log(123, 456)l;
console.log(
);
console.log[|(
    123, 456
)|];
console.log[|(
    123,
    456
)|];
() =>[| console.log[|(
    123,
    456
)|]|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
