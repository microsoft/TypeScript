package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsNonModule(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @checkJs: true
// @Filename: /script.ts
console.log("I'm a script!");
// @Filename: /import.ts
import "./script/*1*/";
// @Filename: /require.js
require("./script/*2*/");
console.log("./script/*3*/");
// @Filename: /tripleSlash.ts
/// <reference path="script.ts" />
// @Filename: /stringLiteral.ts
console.log("./script");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3")
}
