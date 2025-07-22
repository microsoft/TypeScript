package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestMemberListOnThisInClassWithPrivates(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C1 {
   public pubMeth() {this./**/} // test on 'this.'
   private privMeth() {}
   public pubProp = 0;
   private privProp = 0;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "privMeth",
					Detail: ptrTo("(method) C1.privMeth(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "privProp",
					Detail: ptrTo("(property) C1.privProp: number"),
				},
				&lsproto.CompletionItem{
					Label:  "pubMeth",
					Detail: ptrTo("(method) C1.pubMeth(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "pubProp",
					Detail: ptrTo("(property) C1.pubProp: number"),
				},
			},
		},
	})
}
