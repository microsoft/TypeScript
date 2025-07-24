package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionDynamicImport2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: foo.ts
export function /*Destination*/bar() { return "bar"; }
var x = import("./foo");
x.then(foo => {
    foo.[|b/*1*/ar|](); 
})`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1")
}
