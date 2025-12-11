package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJsdocEnum(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @noLib: true
// @Filename: /a.js
/**
 * Doc
 * @enum {number}
 */
const E = {
    A: 0,
}

/** @type {/*type*/E} */
const x = /*value*/E.A;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyQuickInfoAt(t, "type", "type E = number", "Doc")
	f.VerifyQuickInfoAt(t, "value", "const E: {\n    A: number;\n}", "Doc")
}
