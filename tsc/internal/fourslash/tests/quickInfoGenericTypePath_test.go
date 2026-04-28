package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoGenericTypePath(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
function f<T>(x: T) {
  class C {
    value = x
  }
  return new C()
}

class Box<T> {
  public value: T;
  constructor(value: T) {
    this.value = value;
  }
}

const instance = f/*callF*/("hello");
const b1/*b1*/ = new Box/*newBox*/(instance);
declare const b2/*b2*/: Box<typeof instance>;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
