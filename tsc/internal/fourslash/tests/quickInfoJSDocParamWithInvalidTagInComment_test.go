package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJSDocParamWithInvalidTagInComment(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /a.js
/**
 * @param {string} x Checks @-rule here
 * @param {string} a see @foo*bar here
 * @param {string} b see @test(something) here
 * @param {string} c see @*not-ident here
 * @param {string} d see @(paren) here
 */
function /*fn*/foo(/**/x, /*a*/a, /*b*/b, /*c*/c, /*d*/d) {}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "fn", "function foo(x: string, a: string, b: string, c: string, d: string): void", ""+
		"\n\n*@param* `x` — Checks @-rule here\n"+
		"\n\n*@param* `a` — see \n"+
		"\n*@foo* — *bar here\n"+
		"\n\n*@param* `b` — see \n"+
		"\n*@test* — (something) here\n"+
		"\n\n*@param* `c` — see @*not-ident here\n"+
		"\n\n*@param* `d` — see @(paren) here\n")
	f.VerifyQuickInfoAt(t, "", "(parameter) x: string", "Checks @-rule here\n")
	f.VerifyQuickInfoAt(t, "a", "(parameter) a: string", "see ")
	f.VerifyQuickInfoAt(t, "b", "(parameter) b: string", "see ")
	f.VerifyQuickInfoAt(t, "c", "(parameter) c: string", "see @*not-ident here\n")
	f.VerifyQuickInfoAt(t, "d", "(parameter) d: string", "see @(paren) here\n")
}
