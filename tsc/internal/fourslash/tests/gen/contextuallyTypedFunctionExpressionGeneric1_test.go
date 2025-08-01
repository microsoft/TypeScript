package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestContextuallyTypedFunctionExpressionGeneric1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Comparable<T> {
   compareTo(other: T): T;
}
interface Comparer {
   <T extends Comparable<T>>(x: T, y: T): T;
}
var max2: Comparer = (x/*1*/x, y/*2*/y) => { return x/*3*/x.compareTo(y/*4*/y) };`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) xx: T extends Comparable<T>", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) yy: T extends Comparable<T>", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) xx: T extends Comparable<T>", "")
	f.VerifyQuickInfoAt(t, "4", "(parameter) yy: T extends Comparable<T>", "")
}
