package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsGenericIndexedAccess6(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: component.tsx
interface CustomElements {
  'component-one': {
      foo?: string;
  },
  'component-two': {
      bar?: string;
  }
}

type Options<T extends keyof CustomElements> = { kind: T } & Required<{ x: CustomElements[(T extends string ? T : never) & string] }['x']>;

declare function Component<T extends keyof CustomElements>(props: Options<T>): void;

const c = <Component /**/ kind="component-one" />`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "foo",
				},
			},
		},
	})
}
