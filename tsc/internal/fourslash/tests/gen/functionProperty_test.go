package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFunctionProperty(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var a = {
    x(a: number) { }
};

var b = {
    x: function (a: number) { }
};

var c = {
    x: (a: number) => { }
};
a.x(/*signatureA*/1);
b.x(/*signatureB*/1);
c.x(/*signatureC*/1);
a./*completionA*/;
b./*completionB*/;
c./*completionC*/;
a./*quickInfoA*/x;
b./*quickInfoB*/x;
c./*quickInfoC*/x;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "signatureA")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "x(a: number): void"})
	f.GoToMarker(t, "signatureB")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "x(a: number): void"})
	f.GoToMarker(t, "signatureC")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "x(a: number): void"})
	f.VerifyCompletions(t, "completionA", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "x",
					Detail: PtrTo("(method) x(a: number): void"),
				},
			},
		},
	})
	f.VerifyCompletions(t, []string{"completionB", "completionC"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "x",
					Detail: PtrTo("(property) x: (a: number) => void"),
				},
			},
		},
	})
	f.VerifyQuickInfoAt(t, "quickInfoA", "(method) x(a: number): void", "")
	f.VerifyQuickInfoAt(t, "quickInfoB", "(property) x: (a: number) => void", "")
	f.VerifyQuickInfoAt(t, "quickInfoC", "(property) x: (a: number) => void", "")
}
