package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCodeFixCannotFindModule_suggestion_falsePositive(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @resolveJsonModule: true
// @strict: true
// @Filename: /node_modules/foo/bar.json
{ "a": 0 }
// @Filename: /a.ts
import abs = require([|"foo/bar.json"|]);
abs;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.GoToFile(t, "/a.ts")
	f.VerifySuggestionDiagnostics(t, nil)
}
