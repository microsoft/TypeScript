package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFix_require_addToExisting(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @Filename: blah.js
export default class Blah {}
export const Named1 = 0;
export const Named2 = 1;
// @Filename: index.js
var path = require('path')
  , { promisify } = require('util')
  , { Named1 } = require('./blah')

new Blah`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "index.js")
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Update import from \"./blah\"",
		NewFileContent: `var path = require('path')
  , { promisify } = require('util')
  , { Named1, default: Blah } = require('./blah')

new Blah`,
		Index: 0,
	})
}
