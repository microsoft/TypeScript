package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionConstructorOverloads(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class ConstructorOverload {
    [|/*constructorOverload1*/constructor|]();
    /*constructorOverload2*/constructor(foo: string);
    /*constructorDefinition*/constructor(foo: any)  { }
}

var constructorOverload = new [|/*constructorOverloadReference1*/ConstructorOverload|]();
var constructorOverload = new [|/*constructorOverloadReference2*/ConstructorOverload|]("foo");

class Extended extends ConstructorOverload {
    readonly name = "extended";
}
var extended1 = new [|/*extendedRef1*/Extended|]();
var extended2 = new [|/*extendedRef2*/Extended|]("foo");`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "constructorOverloadReference1", "constructorOverloadReference2", "constructorOverload1", "extendedRef1", "extendedRef2")
}
