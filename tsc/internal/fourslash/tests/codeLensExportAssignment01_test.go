package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeLensExportAssignment01(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `
// @module: preserve

// @filename: ./arrow.ts
const arrowFn = () => {};
export default arrowFn;

// @filename: ./klass.ts
class Klass {}
export default Klass;

// @filename: ./value.ts
export default 123;

// @filename: ./equals.cts
const equalsValue = 1;
export = equalsValue;

// @filename: ./importer.ts
import arrowFn from "./arrow";
import Klass from "./klass";
import equalsValue = require("./equals.cjs");

arrowFn();
new Klass();
console.log(equalsValue);
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{
		ReferencesCodeLensEnabled: core.TSTrue,
	})
}
