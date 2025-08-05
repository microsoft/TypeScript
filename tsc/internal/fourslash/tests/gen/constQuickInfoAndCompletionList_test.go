package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestConstQuickInfoAndCompletionList(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const /*1*/a = 10;
var x = /*2*/a;
/*3*/
function foo() {
    const /*4*/b = 20;
    var y = /*5*/b;
    var z = /*6*/a;
    /*7*/
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("const a: 10"),
				},
			},
			Excludes: []string{
				"b",
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("const a: 10"),
				},
			},
			Excludes: []string{
				"b",
			},
		},
	})
	f.VerifyCompletions(t, []string{"5", "6"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("const a: 10"),
				},
				&lsproto.CompletionItem{
					Label:  "b",
					Detail: PtrTo("const b: 20"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "7", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("const a: 10"),
				},
				&lsproto.CompletionItem{
					Label:  "b",
					Detail: PtrTo("const b: 20"),
				},
			},
		},
	})
	f.VerifyQuickInfoAt(t, "1", "const a: 10", "")
	f.VerifyQuickInfoAt(t, "2", "const a: 10", "")
	f.VerifyQuickInfoAt(t, "4", "const b: 20", "")
	f.VerifyQuickInfoAt(t, "5", "const b: 20", "")
	f.VerifyQuickInfoAt(t, "6", "const a: 10", "")
}
