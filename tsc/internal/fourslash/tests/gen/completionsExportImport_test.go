package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsExportImport(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare global {
    namespace N {
        const foo: number;
    }
}
export import foo = N.foo;
/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: completionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:  "foo",
						Kind:   ptrTo(lsproto.CompletionItemKindVariable),
						Detail: ptrTo("(alias) const foo: number\nimport foo = N.foo"),
					},
					&lsproto.CompletionItem{
						Label:  "N",
						Kind:   ptrTo(lsproto.CompletionItemKindModule),
						Detail: ptrTo("namespace N"),
					},
				}, false),
		},
	})
}
