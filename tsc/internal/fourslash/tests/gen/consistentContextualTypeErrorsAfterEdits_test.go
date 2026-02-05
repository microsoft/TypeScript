package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestConsistentContextualTypeErrorsAfterEdits(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
class A {
    foo: string;
}
class C {
    foo: string;
}
var xs /*1*/ = [(x: A) => { return x.foo; }, (x: C) => { return x.foo; }];
xs.forEach(y => y(new /*2*/A()));`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
	f.GoToMarker(t, "1")
	f.Insert(t, ": {}[]")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
	f.GoToMarker(t, "2")
	f.DeleteAtCaret(t, 1)
	f.Insert(t, "C")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
