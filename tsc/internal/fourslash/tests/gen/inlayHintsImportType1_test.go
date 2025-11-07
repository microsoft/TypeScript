package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsImportType1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @Filename: /a.js
module.exports.a = 1
// @Filename: /b.js
const a = require('./a');`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/b.js")
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{IncludeInlayVariableTypeHints: true})
}
