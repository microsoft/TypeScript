package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToDefinitionNewExpressionTargetNotClass(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C2 {
}
let /*I*/I: {
    /*constructSignature*/new(): C2;
};
new [|/*invokeExpression1*/I|]();
let /*symbolDeclaration*/I2: {
};
new [|/*invokeExpression2*/I2|]();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "invokeExpression1", "invokeExpression2")
}
