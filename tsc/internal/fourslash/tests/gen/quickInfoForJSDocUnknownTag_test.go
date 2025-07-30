package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForJSDocUnknownTag(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/**
 * @example
 * if (true) {
 *     foo()
 * }
 */
function fo/*1*/o() {
    return '2';
}
/**
 @example
 {
     foo()
 }
 */
function fo/*2*/o2() {
    return '2';
}
/**
 * @example
 *   x y
 *   12345
 *      b
 */
function m/*3*/oo() {
    return '2';
}
/**
 * @func
 * @example
 *   x y
 *   12345
 *      b
 */
function b/*4*/oo() {
    return '2';
}
/**
 * @func
 * @example    x y
 *             12345
 *                b
 */
function go/*5*/o() {
    return '2';
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
