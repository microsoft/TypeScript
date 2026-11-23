package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionForStringLiteralUrlQueryOrFragmentNoCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
declare function require(id: string): any;
require("https://example.com/a?b/c/*1*/");
require("http://localhost/#/routes//*2*/");
require("./foo https://example.com/?x/y/*3*/");
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, []string{"1", "2", "3"}, nil)
}
