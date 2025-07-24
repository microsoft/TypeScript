package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionApparentTypeProperties(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Number {
    /*definition*/myObjectMethod(): number;
}

var o = 0;
o.[|/*reference1*/myObjectMethod|]();
o[[|"/*reference2*/myObjectMethod"|]]();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "reference1", "reference2")
}
