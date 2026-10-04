package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToDefinitionUndefinedSymbols(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `some/*undefinedValue*/Variable;
var a: some/*undefinedType*/Type;
var x = {}; x.some/*undefinedProperty*/Property;
var a: any; a.some/*unkownProperty*/Property;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, f.MarkerNames()...)
}
