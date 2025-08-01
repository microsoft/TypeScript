package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJsPropertyAssignedAfterMethodDeclaration(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noLib: true
// @allowJs: true
// @noImplicitThis: true
// @Filename: /a.js
const o = {
    test/*1*/() {
        this./*2*/test = 0;
    }
};`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(method) test(): void", "")
	f.VerifyQuickInfoAt(t, "2", "(method) test(): void", "")
}
