package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionUnionTypeProperty3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Array<T> {
    /*definition*/specialPop(): T
}

var strings: string[];
var numbers: number[];

var x = (strings || numbers).[|/*usage*/specialPop|]()`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "usage")
}
