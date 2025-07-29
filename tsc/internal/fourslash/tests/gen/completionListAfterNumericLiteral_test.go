package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListAfterNumericLiteral(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: f1.ts
0./*dotOnNumberExpressions1*/
// @Filename: f2.ts
0.0./*dotOnNumberExpressions2*/
// @Filename: f3.ts
0.0.0./*dotOnNumberExpressions3*/
// @Filename: f4.ts
0./** comment *//*dotOnNumberExpressions4*/
// @Filename: f5.ts
(0)./*validDotOnNumberExpressions1*/
// @Filename: f6.ts
(0.)./*validDotOnNumberExpressions2*/
// @Filename: f7.ts
(0.0)./*validDotOnNumberExpressions3*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"dotOnNumberExpressions1", "dotOnNumberExpressions4"}, nil)
	f.VerifyCompletions(t, []string{"dotOnNumberExpressions2", "dotOnNumberExpressions3", "validDotOnNumberExpressions1", "validDotOnNumberExpressions2", "validDotOnNumberExpressions3"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"toExponential",
			},
		},
	})
}
