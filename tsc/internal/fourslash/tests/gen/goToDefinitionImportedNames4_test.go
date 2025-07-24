package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionImportedNames4(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: b.ts
import {Class as [|/*classAliasDefinition*/ClassAlias|]} from "./a";
// @Filename: a.ts
export module Module {
}
export class /*classDefinition*/Class {
    private f;
}
export interface Interface {
    x;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "classAliasDefinition")
}
