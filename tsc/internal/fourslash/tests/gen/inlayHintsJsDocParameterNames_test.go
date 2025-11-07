package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsJsDocParameterNames(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @Filename: /a.js
var x
x.foo(1, 2);
/**
 * @type {{foo: (a: number, b: number) => void}}
 */
var y
y.foo(1, 2)
/**
 * @type {string}
 */
var z = ""`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/a.js")
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsLiterals})
}
