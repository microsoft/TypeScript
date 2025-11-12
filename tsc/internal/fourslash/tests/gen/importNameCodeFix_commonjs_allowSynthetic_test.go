package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_commonjs_allowSynthetic(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @moduleResolution: bundler
// @allowJs: true
// @checkJs: true
// @allowSyntheticDefaultImports: true
// @Filename: /test_module.js
const MY_EXPORTS = {}
module.exports = MY_EXPORTS;
// @Filename: /index.js
const newVar = {
  any: MY_EXPORTS/**/,
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`const MY_EXPORTS = require("./test_module");

const newVar = {
  any: MY_EXPORTS,
}`,
	}, nil /*preferences*/)
}
