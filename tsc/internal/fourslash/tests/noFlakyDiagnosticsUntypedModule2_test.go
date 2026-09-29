package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNoFlakyDiagnosticsUntypedModule2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noImplicitAny: true
// @declaration: true
// @Filename: /untyped.js
exports.x = 1;
// @Filename: /index.ts
// @ts-expect-error
import { x } from "./untyped";
x;`
	f, done := fourslash.NewFourslashWithOptions(t, content, &fourslash.FourslashOptions{
		TrackFlakyDiagnostics: new(lsproto.DiagnosticFlakeLogLevelPanic),
	})
	defer done()
	f.GoToFile(t, "/index.ts")
	f.VerifySuggestionDiagnostics(t, nil)
}
