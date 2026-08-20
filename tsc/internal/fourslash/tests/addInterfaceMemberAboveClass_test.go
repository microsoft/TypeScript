package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAddInterfaceMemberAboveClass(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
interface Intersection {
    /*insertHere*/
}
interface Scene { }
class /*className*/Sphere {
    constructor() {
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "className", "class Sphere", "")
	f.GoToMarker(t, "insertHere")
	f.Insert(t, "ray: Ray;")
	f.VerifyQuickInfoAt(t, "className", "class Sphere", "")
}
