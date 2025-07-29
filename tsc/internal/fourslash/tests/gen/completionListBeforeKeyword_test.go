package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListBeforeKeyword(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// Completion after dot in named type, when the following line has a keyword
module TypeModule1 {
    export class C1 {}
    export class C2 {}
}
var x : TypeModule1./*TypeReference*/
module TypeModule2 {
    export class Test3 {}
}

// Completion after dot in named type, when the following line has a keyword
TypeModule1./*ValueReference*/
module TypeModule3 {
    export class Test3 {}
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, f.Markers(), &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"C1",
				"C2",
			},
		},
	})
}
