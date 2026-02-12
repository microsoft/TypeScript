package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionCloneQuestionToken(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
// @Filename: /file2.ts
type TCallback<T = any> = (options: T) => any;
type InKeyOf<E> = { [K in keyof E]?: TCallback<E[K]>; };
export class Bar<A> {
    baz(a: InKeyOf<A>): void { }
}
// @Filename: /file1.ts
import { Bar } from './file2';
type TwoKeys = Record<'a' | 'b', { thisFails?: any; }>
class Foo extends Bar<TwoKeys> {
    /**/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "baz",
					InsertText: new("baz(a: { a?: (options: { thisFails?: any; }) => any; b?: (options: { thisFails?: any; }) => any; }): void {\n}"),
					FilterText: new("baz"),
				},
			},
		},
	})
}
