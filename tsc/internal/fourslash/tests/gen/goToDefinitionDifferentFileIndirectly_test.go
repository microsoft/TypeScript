package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionDifferentFileIndirectly(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: Remote2.ts
var /*remoteVariableDefinition*/rem2Var;
function /*remoteFunctionDefinition*/rem2Fn() { }
class /*remoteClassDefinition*/rem2Cls { }
interface /*remoteInterfaceDefinition*/rem2Int{}
module /*remoteModuleDefinition*/rem2Mod { export var foo; }
// @Filename: Remote1.ts
var remVar;
function remFn() { }
class remCls { }
interface remInt{}
module remMod { export var foo; }
// @Filename: Definition.ts
/*remoteVariableReference*/rem2Var = 1;
/*remoteFunctionReference*/rem2Fn();
var rem2foo = new /*remoteClassReference*/rem2Cls();
class rem2fooCls implements /*remoteInterfaceReference*/rem2Int { }
var rem2fooVar = /*remoteModuleReference*/rem2Mod.foo;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "remoteVariableReference", "remoteFunctionReference", "remoteClassReference", "remoteInterfaceReference", "remoteModuleReference")
}
