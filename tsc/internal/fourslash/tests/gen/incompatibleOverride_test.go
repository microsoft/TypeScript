package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIncompatibleOverride(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Foo { xyz: string; }
class Bar extends Foo { /*1*/xyz/*2*/: number = 1; }
class Baz extends Foo { public /*3*/xyz/*4*/: number = 2; }
class /*5*/Baf/*6*/ extends Foo {
   constructor(public xyz: number) {
      super();
   }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyErrorExistsBetweenMarkers(t, "1", "2")
	f.VerifyErrorExistsBetweenMarkers(t, "3", "4")
	f.VerifyErrorExistsBetweenMarkers(t, "5", "6")
	f.VerifyNumberOfErrorsInCurrentFile(t, 3)
}
