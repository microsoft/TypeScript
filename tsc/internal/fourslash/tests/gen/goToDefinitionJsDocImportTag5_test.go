package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionJsDocImportTag5(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJS: true
// @checkJs: true
// @Filename: /b.ts
export interface /*2*/A { }
// @Filename: /a.js
/**
 * @import { A } from "./b";
 */

/**
 * @param { [|A/*1*/|] } a
 */
function f(a) {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1")
}
