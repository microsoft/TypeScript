package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// TestAutoImportCJSWithNodeModuleKind verifies that auto-imports use require()
// syntax in CJS files when using node16/node20/nodenext module kinds with a
// package.json that has "type": "commonjs".
func TestAutoImportCJSWithNodeModuleKind(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "module": "node20",
    "checkJs": true,
    "noEmit": true
  }
}
// @Filename: /package.json
{ "type": "commonjs" }
// @Filename: /lib.js
module.exports = { LIB_VERSION: 1 };
// @Filename: /main.js
module.exports.foo = 0;
LIB_VERSION/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`const { LIB_VERSION } = require("./lib");

module.exports.foo = 0;
LIB_VERSION`,
	}, nil /*preferences*/)
}

// TestAutoImportCJSWithNodeModuleKindEmptyFile verifies that auto-imports use
// require() syntax even in empty CJS files when using node module kinds.
func TestAutoImportCJSWithNodeModuleKindEmptyFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "module": "node20",
    "checkJs": true,
    "noEmit": true
  }
}
// @Filename: /package.json
{ "type": "commonjs" }
// @Filename: /lib.js
module.exports = { LIB_VERSION: 1 };
// @Filename: /main.js
LIB_VERSION/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`const { LIB_VERSION } = require("./lib");

LIB_VERSION`,
	}, nil /*preferences*/)
}

// TestAutoImportCJSWithModuleDetectionForce verifies that auto-imports use
// require() syntax in JS files with CJS syntax when moduleDetection is "force",
// even with --module preserve where GetImpliedNodeFormatForEmit won't help.
func TestAutoImportCJSWithModuleDetectionForce(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "module": "preserve",
    "moduleDetection": "force",
    "checkJs": true,
    "noEmit": true
  }
}
// @Filename: /lib.js
export const LIB_VERSION = 1;
// @Filename: /main.js
const path = require("path");
LIB_VERSION/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`const path = require("path");
const { LIB_VERSION } = require("./lib");
LIB_VERSION`,
	}, nil /*preferences*/)
}
