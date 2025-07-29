package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionOfInterfaceAndVar(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface AnalyserNode {
}
declare var AnalyserNode: {
    prototype: AnalyserNode;
    new(): AnalyserNode;
};
/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "AnalyserNode",
					Detail: PtrTo("interface AnalyserNode\nvar AnalyserNode: {\n    new (): AnalyserNode;\n    prototype: AnalyserNode;\n}"),
					Kind:   PtrTo(lsproto.CompletionItemKindVariable),
				},
			},
		},
	})
}
