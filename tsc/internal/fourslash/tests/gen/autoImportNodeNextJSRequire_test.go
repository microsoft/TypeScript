package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportNodeNextJSRequire(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: /matrix.js
exports.variants = [];
// @Filename: /main.js
exports.dedupeLines = data => {
  variants/**/
}
// @Filename: /totally-irrelevant-no-way-this-changes-things-right.js
export default 0;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/main.js")
	f.VerifyImportFixAtPosition(t, []string{
		`const { variants } = require("./matrix")

exports.dedupeLines = data => {
  variants
}`,
	}, nil /*preferences*/)
}
