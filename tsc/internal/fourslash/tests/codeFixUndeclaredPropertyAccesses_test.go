package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixUndeclaredPropertyAccesses(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I { x: number; }
let i: I;
i.y;
i.foo();
enum E { a,b }
let e: typeof E;
e.a;
e.c;
let obj = { a: 1, b: "asdf"};
obj.c;
type T<U> = I | U;
let t: T<number>;
t.x;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFixAvailable(t, nil)
}
