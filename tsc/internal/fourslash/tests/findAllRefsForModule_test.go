package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFindAllRefsForModule(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /a.ts
export const x = 0;
// @Filename: /b.ts
[|import { x } from "/*0*/[|{| "contextRangeIndex": 0 |}./a|]";|]
// @Filename: /c/sub.js
[|const a = require("/*1*/[|{| "contextRangeIndex": 2 |}../a|]");|]
// @Filename: /d.ts
 /// <reference path="/*2*/[|./a.ts|]" />`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "0", "1", "2")
	f.VerifyBaselineDocumentHighlightsWithOptions(t, nil /*preferences*/, []string{"/b.ts", "/c/sub.js", "/d.ts"}, f.Ranges()[1], f.Ranges()[3], f.Ranges()[4])
}
