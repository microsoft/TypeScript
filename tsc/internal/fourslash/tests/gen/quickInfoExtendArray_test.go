package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoExtendArray(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo<T> extends Array<T> { }
var x: Foo<string>;
var /*1*/r = x[0];
interface Foo2 extends Array<string> { }
var x2: Foo2;
var /*2*/r2 = x2[0];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var r: string", "")
	f.VerifyQuickInfoAt(t, "2", "var r2: string", "")
}
