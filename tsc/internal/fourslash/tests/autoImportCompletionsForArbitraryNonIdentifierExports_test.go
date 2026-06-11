package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	util "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCompletionsForArbitraryNonIdentifierExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @module: esnext
// @Filename: /a.ts
const foo = 0;
export { foo as "foo-bar" };
export const fooBar = 1;

// @Filename: /b.ts
foo/**/
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		Items: &fourslash.CompletionsExpectedItems{
			Excludes: []string{"foo-bar"},
			Includes: []fourslash.CompletionsExpectedItem{"fooBar"},
		},
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &util.DefaultCommitCharacters,
			EditRange:        util.Ignored,
		},
	})
}
