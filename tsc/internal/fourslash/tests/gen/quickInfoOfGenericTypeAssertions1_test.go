package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOfGenericTypeAssertions1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f<T>(x: T): T { return null; }
var /*1*/r = <T>(x: T) => x;
var /*2*/r2 = < <T>(x: T) => T>f;
var a;
var /*3*/r3 = < <T>(x: <A>(y: A) => A) => T>a;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var r: <T>(x: T) => T", "")
	f.VerifyQuickInfoAt(t, "2", "var r2: <T>(x: T) => T", "")
	f.VerifyQuickInfoAt(t, "3", "var r3: <T>(x: <A>(y: A) => A) => T", "")
}
