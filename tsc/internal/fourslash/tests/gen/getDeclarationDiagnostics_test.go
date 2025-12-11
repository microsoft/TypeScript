package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetDeclarationDiagnostics(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @declaration: true
// @outFile: true
// @Filename: inputFile1.ts
module m {
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
