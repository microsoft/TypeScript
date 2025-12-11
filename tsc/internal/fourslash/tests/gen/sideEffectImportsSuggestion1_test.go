package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSideEffectImportsSuggestion1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @noEmit: true
// @module: commonjs
// @noUncheckedSideEffectImports: true
// @filename: moduleA/a.js
import "b";
import "c";
// @filename: node_modules/b.ts
var a = 10;
// @filename: node_modules/c.js
exports.a = 10;
c = 10;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySuggestionDiagnostics(t, nil)
}
