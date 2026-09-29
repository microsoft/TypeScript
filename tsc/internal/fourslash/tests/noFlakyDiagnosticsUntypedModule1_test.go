package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNoFlakyDiagnosticsUntypedModule1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @noImplicitAny: true
// @declaration: true
// @Filename: /node_modules/untyped/index.js
// @noOpen: true
exports.x = 1;
// @Filename: /index.js
import { x } from "untyped";
x;`
	f, done := fourslash.NewFourslashWithOptions(t, content, &fourslash.FourslashOptions{
		TrackFlakyDiagnostics: new(lsproto.DiagnosticFlakeLogLevelPanic),
	})
	defer done()
	f.GoToFile(t, "/index.js")
	f.VerifySuggestionDiagnostics(t, nil)
}
