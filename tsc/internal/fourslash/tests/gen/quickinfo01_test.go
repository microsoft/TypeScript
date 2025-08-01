package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickinfo01(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface One {
    commonProperty: number;
    commonFunction(): number;
}

interface Two {
    commonProperty: string
    commonFunction(): number;
}

var /*1*/x : One | Two;

x./*2*/commonProperty;
x./*3*/commonFunction;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var x: One | Two", "")
	f.VerifyQuickInfoAt(t, "2", "(property) commonProperty: string | number", "")
	f.VerifyQuickInfoAt(t, "3", "(method) commonFunction(): number", "")
}
