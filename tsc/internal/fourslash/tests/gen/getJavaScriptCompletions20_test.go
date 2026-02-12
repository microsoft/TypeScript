package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetJavaScriptCompletions20(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @allowNonTsExtensions: true
// @Filename: file.js
/**
 * A person
 * @constructor
 * @param {string} name - The name of the person.
 * @param {number} age - The age of the person.
 */
function Person(name, age) {
    this.name = name;
    this.age = age;
}


Person.getName = 10;
Person.getNa/**/ = 10;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersWithPrototypePlus(
				[]fourslash.CompletionsExpectedItem{
					"getName",
					"getNa",
					&lsproto.CompletionItem{
						Label:    "Person",
						SortText: new(string(ls.SortTextJavascriptIdentifiers)),
					},
					&lsproto.CompletionItem{
						Label:    "name",
						SortText: new(string(ls.SortTextJavascriptIdentifiers)),
					},
					&lsproto.CompletionItem{
						Label:    "age",
						SortText: new(string(ls.SortTextJavascriptIdentifiers)),
					},
				}),
		},
	})
}
