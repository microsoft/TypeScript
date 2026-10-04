package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFix_all_js(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @allowJs: true
// @checkJs: true
// @Filename: /a.js
export class C {}
/** @typedef {number} T */
// @Filename: /b.js
C;
/** @type {T} */
const x = 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/b.js")
	f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
		FixID: "fixMissingImport",
		NewFileContent: `import { C } from "./a";

C;
/** @type {import("./a").T} */
const x = 0;`,
	})
}
