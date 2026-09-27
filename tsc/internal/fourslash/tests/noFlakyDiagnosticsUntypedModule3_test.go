package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNoFlakyDiagnosticsUntypedModule3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: nodenext
// @noImplicitAny: true
// @declaration: true
// @Filename: /untyped.mjs
export const x = 1;
// @Filename: /index.mts
// @ts-expect-error
import { x } from "./untyped.mjs";
x;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/index.mts")
	f.VerifySuggestionDiagnostics(t, nil)
}
