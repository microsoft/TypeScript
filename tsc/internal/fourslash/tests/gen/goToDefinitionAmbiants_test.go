package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionAmbiants(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare var /*ambientVariableDefinition*/ambientVar;
declare function /*ambientFunctionDefinition*/ambientFunction();
declare class ambientClass {
    /*constructorDefinition*/constructor();
    static /*staticMethodDefinition*/method();
    public /*instanceMethodDefinition*/method();
}

/*ambientVariableReference*/ambientVar = 1;
/*ambientFunctionReference*/ambientFunction();
var ambientClassVariable = new /*constructorReference*/ambientClass();
ambientClass./*staticMethodReference*/method();
ambientClassVariable./*instanceMethodReference*/method();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "ambientVariableReference", "ambientFunctionReference", "constructorReference", "staticMethodReference", "instanceMethodReference")
}
