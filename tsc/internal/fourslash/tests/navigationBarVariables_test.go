package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNavigationBarVariables(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x = 0;
let y = 1;
const z = 2;
// @Filename: file2.ts
var {a} = 0;
let {a: b} = 0;
const [c] = 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
	f.GoToFile(t, "file2.ts")
	f.VerifyBaselineDocumentSymbol(t)
}
