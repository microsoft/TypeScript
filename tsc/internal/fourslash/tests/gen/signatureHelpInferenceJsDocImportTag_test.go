package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpInferenceJsDocImportTag(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJS: true
// @checkJs: true
// @module: esnext
// @filename: a.ts
export interface Foo {}
// @filename: b.js
/**
 * @import {
 *     Foo
 * } from './a'
 */

/**
 * @param {Foo} a
 */
function foo(a) {}
foo(/**/)`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineSignatureHelp(t)
}
