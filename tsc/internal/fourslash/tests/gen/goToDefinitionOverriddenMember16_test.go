package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionOverriddenMember16(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: goToDefinitionOverrideJsdoc.ts
// @allowJs: true
// @checkJs: true
export class C extends CompletelyUndefined {
    /**
     * @override/*1*/
     * @returns {{}}
     */
    static foo() {
        return {}
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1")
}
