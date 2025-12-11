package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIncrementalParsingDynamicImport3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es2015
// @Filename: ./foo.ts
export function bar() { return 1; }
// @Filename: ./0.ts
var x = import/*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
	f.GoToMarker(t, "1")
	f.Insert(t, "(")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
