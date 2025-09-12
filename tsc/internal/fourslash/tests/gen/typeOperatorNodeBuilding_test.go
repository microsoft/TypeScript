package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTypeOperatorNodeBuilding(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: keyof.ts
function doSomethingWithKeys<T>(...keys: (keyof T)[]) { }

const /*1*/utilityFunctions = {
  doSomethingWithKeys
};
// @Filename: typeof.ts
class Foo { static a: number; }
function doSomethingWithTypes(...statics: (typeof Foo)[]) {}

const /*2*/utilityFunctions = {
  doSomethingWithTypes
};`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "const utilityFunctions: {\n    doSomethingWithKeys: <T>(...keys: (keyof T)[]) => void;\n}", "")
	f.VerifyQuickInfoAt(t, "2", "const utilityFunctions: {\n    doSomethingWithTypes: (...statics: (typeof Foo)[]) => void;\n}", "")
}
