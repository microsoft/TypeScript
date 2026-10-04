package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToDefinitionImportedNames(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: b.ts
export {[|/*classAliasDefinition*/Class|]} from "./a";
// @Filename: a.ts
export namespace Module {
}
export class /*classDefinition*/Class {
    private f;
}
export interface Interface {
    x;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "classAliasDefinition")
}
