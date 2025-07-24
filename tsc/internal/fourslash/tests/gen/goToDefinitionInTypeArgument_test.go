package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionInTypeArgument(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class /*fooDefinition*/Foo<T> { }

class /*barDefinition*/Bar { }

var x = new Fo/*fooReference*/o<Ba/*barReference*/r>();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "barReference", "fooReference")
}
