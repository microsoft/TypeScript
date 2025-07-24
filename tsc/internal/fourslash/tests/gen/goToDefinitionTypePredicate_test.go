package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionTypePredicate(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class /*classDeclaration*/A {}
function f(/*parameterDeclaration*/parameter: any): [|/*parameterName*/parameter|] is [|/*typeReference*/A|] {
    return typeof parameter === "string";
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "parameterName", "typeReference")
}
