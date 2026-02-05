package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInFunctionDeclaration(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
var a = 0;
function foo(/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", nil)
	f.Insert(t, "a")
	f.VerifyCompletions(t, nil, nil)
	f.Insert(t, " , ")
	f.VerifyCompletions(t, nil, nil)
	f.Insert(t, "b")
	f.VerifyCompletions(t, nil, nil)
	f.Insert(t, ":")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalTypes,
		},
	})
	f.Insert(t, "number, ")
	f.VerifyCompletions(t, nil, nil)
}
