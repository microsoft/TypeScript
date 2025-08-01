package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnObjectLiteralWithOnlySetter(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function /*1*/makePoint(x: number) {
    return {
        b: 10,
        set x(a: number) { this.b = a; }
    };
};
var /*3*/point = makePoint(2);
point./*2*/x = 30;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "b",
					Detail: PtrTo("(property) b: number"),
				},
				&lsproto.CompletionItem{
					Label:  "x",
					Detail: PtrTo("(property) x: number"),
				},
			},
		},
	})
	f.VerifyQuickInfoAt(t, "1", "function makePoint(x: number): {\n    b: number;\n    x: number;\n}", "")
	f.VerifyQuickInfoAt(t, "2", "(property) x: number", "")
	f.VerifyQuickInfoAt(t, "3", "var point: {\n    b: number;\n    x: number;\n}", "")
}
