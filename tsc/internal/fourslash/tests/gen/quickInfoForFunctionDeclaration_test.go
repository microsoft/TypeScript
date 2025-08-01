package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForFunctionDeclaration(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface A<T> { }

function ma/*makeA*/keA<T>(t: T): A<T> { return null; }

function /*f*/f<T>(t: T) {
    return makeA(t);
}

var x = f(0);
var y = makeA(0);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "makeA", "function makeA<T>(t: T): A<T>", "")
	f.VerifyQuickInfoAt(t, "f", "function f<T>(t: T): A<T>", "")
}
