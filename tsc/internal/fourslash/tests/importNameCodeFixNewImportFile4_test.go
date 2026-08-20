package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFixNewImportFile4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|let t: A/*0*/.B.I;|]
// @Filename: ./module.ts
export namespace A {
   export namespace B {
       export interface I { }
   }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`import { A } from "./module";

let t: A.B.I;`,
	}, nil /*preferences*/)
}
