package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericCallsWithOptionalParams1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Collection<T> {
    public add(x: T) { }
}
interface Utils {
    fold<T, S>(c: Collection<T>, folder: (s: S, t: T) => T, init?: S): T;
}
var c = new Collection<string>();
var utils: Utils;
var /*1*/r = utils.fold(c, (s, t) => t, "");
var /*2*/r2 = utils.fold(c, (s, t) => t);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var r: string", "")
	f.VerifyQuickInfoAt(t, "2", "var r2: string", "")
}
