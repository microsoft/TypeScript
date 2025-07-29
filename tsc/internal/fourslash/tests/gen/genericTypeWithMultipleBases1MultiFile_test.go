package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericTypeWithMultipleBases1MultiFile(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: genericTypeWithMultipleBases_0.ts
interface iBaseScope {
    watch: () => void;
}
// @Filename: genericTypeWithMultipleBases_1.ts
interface iMover {
    moveUp: () => void;
}
// @Filename: genericTypeWithMultipleBases_2.ts
interface iScope<TModel> extends iBaseScope, iMover {
    family: TModel;
}
// @Filename: genericTypeWithMultipleBases_3.ts
var x: iScope<number>;
// @Filename: genericTypeWithMultipleBases_4.ts
x./**/`
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
					Label:  "watch",
					Detail: PtrTo("(property) iBaseScope.watch: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "moveUp",
					Detail: PtrTo("(property) iMover.moveUp: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "family",
					Detail: PtrTo("(property) iScope<number>.family: number"),
				},
			},
		},
	})
}
