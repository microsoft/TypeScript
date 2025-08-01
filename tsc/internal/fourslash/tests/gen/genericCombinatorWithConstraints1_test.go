package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericCombinatorWithConstraints1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function apply<T, U extends Date>(source: T[], selector: (x: T) => U) {
    var /*1*/xs = source.map(selector); // any[]
    var /*2*/xs2 = source.map((x: T, a, b): U => { return null }); // any[] 
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(local var) xs: U[]", "")
	f.VerifyQuickInfoAt(t, "2", "(local var) xs2: U[]", "")
}
