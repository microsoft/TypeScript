package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsLiteralOverload(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /a.tsx
interface Events {
  "": any;
  drag: any;
  dragenter: any;
}
declare function addListener<K extends keyof Events>(type: K, listener: (ev: Events[K]) => any): void;

declare function ListenerComponent<K extends keyof Events>(props: { type: K, onWhatever: (ev: Events[K]) => void }): JSX.Element;

addListener("/*ts*/");
(<ListenerComponent type="/*tsx*/" />);
// @Filename: /b.js
addListener("/*js*/");`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"ts", "tsx", "js"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"",
				"drag",
				"dragenter",
			},
		},
	})
	f.Insert(t, "drag")
	f.VerifyCompletions(t, []string{"ts", "tsx", "js"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"",
				"drag",
				"dragenter",
			},
		},
	})
}
