package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsWithOptionalPropertiesGenericConstructor(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
interface Options {
    someFunction?: () => string
    anotherFunction?: () => string
}

export class Clazz<T extends Options> {
    constructor(public a: T) {}
}

new Clazz({ /*1*/ })`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextOptionalMember)), Label: "someFunction?", InsertText: ptrTo("someFunction"), FilterText: ptrTo("someFunction")}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextOptionalMember)), Label: "anotherFunction?", InsertText: ptrTo("anotherFunction"), FilterText: ptrTo("anotherFunction")}},
		},
	})
}
