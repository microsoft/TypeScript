package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJsDocTags1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: quickInfoJsDocTags1.ts
/**
 * Doc
 * @author Me <me@domain.tld>
 * @augments {C<T>} Augments it
 * @template T A template
 * @type {number | string} A type
 * @typedef {number | string} NumOrStr
 * @property {number} x The prop
 * @param {number} x The param
 * @returns The result
 * @see x (the parameter)
 */
function /**/foo(x) {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
