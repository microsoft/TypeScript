package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportNodeModules2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|f1/*0*/();|]
// @Filename: ../package.json
{ "dependencies": { "fake-module": "latest" } }
// @Filename: ../node_modules/fake-module/notindex.d.ts
export var v1 = 5;
export function f1();
// @Filename: ../node_modules/fake-module/notindex.js
module.exports = {
   v1: 5,
   f1: function () {}
};
// @Filename: ../node_modules/fake-module/package.json
{ "main":"./notindex.js", "typings":"./notindex.d.ts" }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyImportFixAtPosition(t, []string{
		`import { f1 } from "fake-module";

f1();`,
	}, nil /*preferences*/)
}
