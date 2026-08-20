package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRenameLocationsForClassExpression01(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Foo {
}

var x = [|class [|{| "contextRangeIndex": 0 |}Foo|] {
    doIt() {
        return [|Foo|];
    }

    static doItStatically() {
        return [|Foo|].y;
    }
}|]

var y = class {
   getSomeName() {
      return Foo
   }
}
var z = class Foo {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "Foo")
}
