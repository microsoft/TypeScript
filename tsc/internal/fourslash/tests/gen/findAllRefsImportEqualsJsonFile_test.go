package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsImportEqualsJsonFile(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @resolveJsonModule: true
// @Filename: /a.ts
import /*0*/j = require("/*1*/./j.json");
/*2*/j;
// @Filename: /b.js
const /*3*/j = require("/*4*/./j.json");
/*5*/j;
// @Filename: /j.json
/*6*/{ "x": 0 }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineFindAllReferences(t, "0", "2", "1", "4", "3", "5", "6")
}
