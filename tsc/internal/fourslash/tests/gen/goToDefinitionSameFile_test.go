package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionSameFile(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var /*localVariableDefinition*/localVariable;
function /*localFunctionDefinition*/localFunction() { }
class /*localClassDefinition*/localClass { }
interface /*localInterfaceDefinition*/localInterface{ }
module /*localModuleDefinition*/localModule{ export var foo = 1;}


/*localVariableReference*/localVariable = 1;
/*localFunctionReference*/localFunction();
var foo = new /*localClassReference*/localClass();
class fooCls implements /*localInterfaceReference*/localInterface { }
var fooVar = /*localModuleReference*/localModule.foo;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "localVariableReference", "localFunctionReference", "localClassReference", "localInterfaceReference", "localModuleReference")
}
