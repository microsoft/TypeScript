package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCallHierarchyContainerName(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function /**/f() {}

class A {
  static sameName() {
    f();
  }
}

class B {
  sameName() {
    A.sameName();
  }
}

const Obj = {
  get sameName() {
    return new B().sameName;
  }
};

namespace Foo {
  function sameName() {
    return Obj.sameName;
  }

  export class C {
    constructor() {
      sameName();
    }
  }
}

module Foo.Bar {
  const sameName = () => new Foo.C();
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyBaselineCallHierarchy(t)
}
