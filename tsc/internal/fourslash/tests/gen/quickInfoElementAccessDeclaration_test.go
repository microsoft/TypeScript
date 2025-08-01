package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoElementAccessDeclaration(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @checkJs: true
// @allowJs: true
// @Filename: a.js
const mod = {};
mod["@@thing1"] = {};
mod["/**/@@thing1"]["@@thing2"] = 0;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyQuickInfoIs(t, "module mod[\"@@thing1\"]\n(property) mod[\"@@thing1\"]: typeof mod.@@thing1", "")
}
