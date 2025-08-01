package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFixingTypeParametersQuickInfo(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function f<T>(x: T, y: (p: T) => T, z: (p: T) => T): T;
var /*1*/result = /*2*/f(0, /*3*/x => null, /*4*/x => x.blahblah);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var result: number", "")
	f.VerifyQuickInfoAt(t, "2", "function f<number>(x: number, y: (p: number) => number, z: (p: number) => number): number", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) x: number", "")
	f.VerifyQuickInfoAt(t, "4", "(parameter) x: number", "")
}
