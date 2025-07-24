package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionShorthandProperty01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var /*valueDeclaration1*/name = "hello";
var /*valueDeclaration2*/id = 100000;
declare var /*valueDeclaration3*/id;
var obj = {[|/*valueDefinition1*/name|], [|/*valueDefinition2*/id|]};
obj.[|/*valueReference1*/name|];
obj.[|/*valueReference2*/id|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "valueDefinition1", "valueDefinition2", "valueReference1", "valueReference2")
}
