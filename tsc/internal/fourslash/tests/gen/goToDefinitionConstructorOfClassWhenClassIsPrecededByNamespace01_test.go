package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionConstructorOfClassWhenClassIsPrecededByNamespace01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace Foo {
    export var x;
}

class Foo {
    /*definition*/constructor() {
    }
}

var x = new [|/*usage*/Foo|]();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "usage")
}
