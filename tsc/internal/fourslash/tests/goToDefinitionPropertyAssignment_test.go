package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToDefinitionPropertyAssignment(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export const /*FunctionResult*/Component = () => { return "OK"}
Component./*PropertyResult*/displayName = 'Component'

[|/*FunctionClick*/Component|]

Component.[|/*PropertyClick*/displayName|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "FunctionClick", "PropertyClick")
}
