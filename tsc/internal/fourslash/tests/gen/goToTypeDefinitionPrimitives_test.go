package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToTypeDefinitionPrimitives(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: module1.ts
var w: {a: number};
var x = "string";
var y: number | string;
var z; // any
// @Filename: module2.ts
w./*reference1*/a;
/*reference2*/x;
/*reference3*/y;
/*reference4*/y;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToTypeDefinition(t, "reference1", "reference2", "reference3", "reference4")
}
