package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFindAllRefsWithShorthandPropertyAssignment2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var /*0*/dx = "Foo";

namespace M { export var /*1*/dx; }
namespace M {
   var z = 100;
   export var y = { /*2*/dx, z };
}
M.y./*3*/dx;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "0", "1", "2", "3")
}
