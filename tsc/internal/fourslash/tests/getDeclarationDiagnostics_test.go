package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetDeclarationDiagnostics(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
// @declaration: true
// @outDir: out
// @Filename: inputFile1.ts
namespace m {
   export function foo() {
       class C implements I { private a; }
       interface I { }
       return C;
   }
} /*1*/
// @Filename: input2.ts
var x = "hello world"; /*2*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
	f.GoToMarker(t, "2")
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
}
