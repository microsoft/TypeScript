package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestClassInterfaceInsert(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Intersection {
    dist: number;
}
/*interfaceGoesHere*/
class /*className*/Sphere {
    constructor(private center) {
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "className", "class Sphere", "")
	f.GoToMarker(t, "interfaceGoesHere")
	f.Insert(t, "\ninterface Surface {\n    reflect: () => number;\n}\n")
	f.VerifyQuickInfoAt(t, "className", "class Sphere", "")
}
