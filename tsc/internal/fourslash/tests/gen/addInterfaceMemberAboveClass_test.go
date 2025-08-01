package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
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
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "className", "class Sphere", "")
	f.GoToMarker(t, "insertHere")
	f.Insert(t, "ray: Ray;")
	f.VerifyQuickInfoAt(t, "className", "class Sphere", "")
}
