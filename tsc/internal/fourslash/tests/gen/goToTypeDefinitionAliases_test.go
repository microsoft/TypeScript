package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToTypeDefinitionAliases(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: goToTypeDefinitioAliases_module1.ts
interface /*definition*/I {
    p;
}
export {I as I2};
// @Filename: goToTypeDefinitioAliases_module2.ts
import {I2 as I3} from "./goToTypeDefinitioAliases_module1";
var v1: I3;
export {v1 as v2};
// @Filename: goToTypeDefinitioAliases_module3.ts
import {/*reference1*/v2 as v3} from "./goToTypeDefinitioAliases_module2";
/*reference2*/v3;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToTypeDefinition(t, "reference1", "reference2")
}
