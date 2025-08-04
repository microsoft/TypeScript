package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpTypeArguments2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** some documentation
 * @template T some documentation 2
 * @template W
 * @template U,V others
 * @param a ok
 * @param b not ok
 */
function f<T, U, V, W>(a: number, b: string, c: boolean): void { }
f</*f0*/;
f<number, /*f1*/;
f<number, string, /*f2*/;
f<number, string, boolean, /*f3*/;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineSignatureHelp(t)
}
