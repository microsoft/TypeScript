package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestIncrementalParsingDynamicImport1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es6
// @module: commonjs
// @Filename: ./foo.ts
export function bar() { return 1; }
var x1 = import("./foo");
x1.then(foo => {
   var s: string = foo.bar();
})
/*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
	f.GoToMarker(t, "1")
	f.Insert(t, "  ")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
