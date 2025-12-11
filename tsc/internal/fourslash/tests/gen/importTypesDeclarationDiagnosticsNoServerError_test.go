package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportTypesDeclarationDiagnosticsNoServerError(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @declaration: true
// @Filename: node_modules/foo/index.d.ts
export function f(): I;
export interface I {
  x: number;
}
// @Filename: a.ts
import { f } from "foo";
export const x = f();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFileNumber(t, 1)
	f.VerifyNonSuggestionDiagnostics(t, nil)
}
