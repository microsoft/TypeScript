package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsGenericIndexedAccess2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export type GetMethodsForType<T, G extends string> = { [K in keyof T]:
  T[K] extends () => any ? { name: K, group: G, } : T[K] extends (s: infer U) => any ? { name: K, group: G, payload: U } : never }[keyof T];


class Sample {
  count = 0;
  books: { name: string, year: number }[] = []
  increment() {
      this.count++
      this.count++
  }

  addBook(book: Sample["books"][0]) {
      this.books.push(book)
  }
}
export declare function testIt<T, G extends string>(): (input: any, method: GetMethodsForType<T, G>) => any


const t = testIt<Sample, "Sample">()

const i = t(null, { name: "addBook", group: "Sample", payload: { /**/ } })`
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
					Label: "name",
				},
				&lsproto.CompletionItem{
					Label: "year",
				},
			},
		},
	})
}
