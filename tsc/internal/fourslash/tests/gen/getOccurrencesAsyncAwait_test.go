package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesAsyncAwait(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|async|] function f() {
 [|await|] 100;
 [|a/**/wait|] [|await|] 200;
class Foo {
    async memberFunction() {
        await 1;
    }
}
 return [|await|] async function () {
   await 300;
 }
}
async function g() {
    await 300;
    async function f() {
        await 400;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges())...)
}
