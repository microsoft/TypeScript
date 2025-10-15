package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToTypeDefinition(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: goToTypeDefinition_Definition.ts
class /*definition*/C {
    p;
}
var c: C;
// @Filename: goToTypeDefinition_Consumption.ts
/*reference*/c = undefined;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToTypeDefinition(t, "reference")
}
