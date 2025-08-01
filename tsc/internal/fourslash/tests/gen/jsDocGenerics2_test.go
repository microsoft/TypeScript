package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocGenerics2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowNonTsExtensions: true
// @Filename: Foo.js
/**
 * @param {T[]} arr
 * @param {(function(T):T)} valuator
 * @template T
 */
function SortFilter(arr,valuator)
{
    return arr;
}
var a/*1*/ = SortFilter([0, 1, 2], q/*2*/ => q);
var b/*3*/ = SortFilter([0, 1, 2], undefined);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var a: number[]", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) q: number", "")
	f.VerifyQuickInfoAt(t, "3", "var b: number[]", "")
}
