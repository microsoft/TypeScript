package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Tests for signature help with binding pattern parameters.
// This covers the crash fix for binding patterns and various combinations
// as requested in the issue.
func TestSignatureHelpBindingPattern(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
/**
 * @param options An empty object binding pattern.
 */
function emptyObj({}) {}
emptyObj(/*emptyObj*/)

/**
 * @param items An empty array binding pattern.
 */
function emptyArr([]) {}
emptyArr(/*emptyArr*/)

/**
 * @param param An object with a and b properties.
 */
function nonEmptyObj({a, b}: {a: number, b: string}) {}
nonEmptyObj(/*nonEmptyObj*/)

/**
 * @param tuple A tuple with two elements.
 */
function nonEmptyArr([x, y]: [number, string]) {}
nonEmptyArr(/*nonEmptyArr*/)

/**
 * @param first The first number parameter.
 * @param second An object with a and b properties.
 */
function idLeading(first: number, {a, b}: {a: number, b: string}) {}
idLeading(123/*idLeading*/, { a: 1, b: 2 }/*bindingTrailing*/)

/**
 * @param first An object with a and b properties.
 * @param last The last number parameter.
 */
function bindingLeading({a, b}: {a: number, b: string}, last: number) {}
bindingLeading(/*bindingLeading*/{ a: 1, b: 2 }, 123 /*idTrailing*/)

/**
 * @param param1 {Object} The first parameter
 * @param param1.a {number} Comment a
 * @param param1.b {string} Comment b
 * @param param2 {Object} The second parameter
 * @param param2.c {boolean} Comment c
 * @param param2.d {unknown} Comment d
 */
function multipleBindings({ a, b }, { c, d }) {}
multipleBindings({ a: 0, b: "" }/*firstObjParam*/, { c: true, d: "" }/*secondObjParam*/)
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineSignatureHelp(t)
}
