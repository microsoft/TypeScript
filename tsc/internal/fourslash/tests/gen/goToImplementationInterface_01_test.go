package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterface_01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Fo/*interface_definition*/o { hello(): void }

class [|SuperBar|] implements Foo {
    hello () {}
}

abstract class [|AbstractBar|] implements Foo {
    abstract hello (): void;
}

class [|Bar|] extends SuperBar {
}

class [|NotAbstractBar|] extends AbstractBar {
    hello () {}
}

var x = new SuperBar();
var y: SuperBar = new SuperBar();
var z: AbstractBar = new NotAbstractBar();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "interface_definition")
}
