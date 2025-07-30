package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoTypedefTag(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: a.js
/**
 * The typedef tag should not appear in the quickinfo.
 * @typedef {{ foo: 'foo' }} Foo
 */
function f() { }
f/*1*/()
/**
 * A removed comment
 * @tag Usage shows that non-param tags in comments explain the typedef instead of using it
 * @typedef {{ nope: any }} Nope not here
 * @tag comment 2
 */
function g() { }
g/*2*/()
/**
 * The whole thing is kept
 * @param {Local} keep
 * @typedef {{ local: any }} Local kept too
 * @returns {void} also kept
 */
function h(keep) { }
h/*3*/({ nope: 1 })`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
