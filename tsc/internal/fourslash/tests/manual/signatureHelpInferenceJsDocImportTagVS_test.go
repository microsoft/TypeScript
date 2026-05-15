package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpInferenceJsDocImportTagVS(t *testing.T) {
	t.Parallel()
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
	f, done := fourslash.NewFourslash(t, &lsproto.ClientCapabilities{VSSupportsVisualStudioExtensions: new(true)}, content)
	defer done()
	f.VerifyBaselineSignatureHelp(t)
}
