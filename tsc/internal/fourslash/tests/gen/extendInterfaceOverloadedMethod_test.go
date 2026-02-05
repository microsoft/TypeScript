package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExtendInterfaceOverloadedMethod(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
interface A<T> {
    foo(a: T): B<T>;
    foo(): void ;
    foo2(): B<number>;
}
interface B<T> extends A<T> {
    bar(): void ;
}
var b: B<number>;
var /**/x = b.foo2().foo(5).foo(); // 'x' is of type 'void'`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "", "var x: void", "")
	f.VerifyNoErrors(t)
}
