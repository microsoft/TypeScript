package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetJavaScriptSyntacticDiagnostics23(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: a.js
function Person(age) {
    if (age >= 18) {
        this.canVote = true;
    } else {
        this.canVote = false;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyNonSuggestionDiagnostics(t, nil)
	f.VerifyNonSuggestionDiagnostics(t, nil)
}
