package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsForModule(t *testing.T) {
	t.Parallel()
	t.Skip()
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
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "0", "1", "2")
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[3], f.Ranges()[4])
}
