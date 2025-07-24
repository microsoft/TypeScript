package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionUnionTypeProperty2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface HasAOrB {
    /*propertyDefinition1*/a: string;
    b: string;
}

interface One {
    common: { /*propertyDefinition2*/a : number; };
}

interface Two {
    common: HasAOrB;
}

var x : One | Two;

x.common.[|/*propertyReference*/a|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "propertyReference")
}
