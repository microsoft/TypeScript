package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToDefinitionDefaultParamOuterBinding(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Regression for #65090: references in default parameters must resolve to the
	// outer binding, not a body function/class/enum/var of the same name.
	const content = `const /*stylesOuter*/styles = { root: "outer" };
export function read(value = /*stylesRef*/styles.root) {
  function /*stylesInner*/styles() {}
  /*stylesBody*/styles();
  return value;
}

const /*fooOuter*/Foo = 1;
export function readClass(value = /*fooRef*/Foo) {
  class /*fooInner*/Foo {}
  return new /*fooBody*/Foo();
}

const /*eOuter*/E = 1;
export function readEnum(value = /*eRef*/E) {
  enum /*eInner*/E { A }
  return /*eBody*/E.A;
}

const /*vOuter*/v = 1;
export function readVar(value = /*vRef*/v) {
  var /*vInner*/v = 2;
  return /*vBody*/v;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, false, "stylesRef", "stylesBody", "fooRef", "fooBody", "eRef", "eBody", "vRef", "vBody")
}
