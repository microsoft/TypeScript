package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigationBarItemsModules1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare module "X.Y.Z" {}

declare module 'X2.Y2.Z2' {}

declare module "foo";

namespace A.B.C {
    export var x;
}

namespace A.B {
    export var y;
}

namespace A {
    export var z;
}

namespace A {
    namespace B {
        namespace C {
            declare var x;
        }
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
