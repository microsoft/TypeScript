package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestStringCompletionsImportOrExportSpecifier(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: exports.ts
export let foo = 1;
let someValue = 2;
let someType = 3;
export {
  someValue as "__some value",
  someType as "__some type",
};
// @Filename: values.ts
import { "/*valueImport0*/" } from "./exports";
import { "/*valueImport1*/" as valueImport1 } from "./exports";
import { foo as "/*valueImport2*/" } from "./exports";
import { foo, "/*valueImport3*/" as valueImport3 } from "./exports";

export { "/*valueExport0*/" } from "./exports";
export { "/*valueExport1*/" as valueExport1 } from "./exports";
export { foo as "/*valueExport2*/" } from "./exports";
export { foo, "/*valueExport3*/" } from "./exports";
// @Filename: types.ts
import { type "/*typeImport0*/" } from "./exports";
import { type "/*typeImport1*/" as typeImport1 } from "./exports";
import { type foo as "/*typeImport2*/" } from "./exports";
import { type foo, type "/*typeImport3*/" as typeImport3 } from "./exports";

export { type "/*typeExport0*/" } from "./exports";
export { type "/*typeExport1*/" as typeExport1 } from "./exports";
export { type foo as "/*typeExport2*/" } from "./exports";
export { type foo, type "/*typeExport3*/" } from "./exports";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "valueImport0", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value", "foo"},
		},
	})
	f.VerifyCompletions(t, "valueImport1", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value", "foo"},
		},
	})
	f.VerifyCompletions(t, "valueImport2", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{},
		},
	})
	f.VerifyCompletions(t, "valueImport3", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value"},
		},
	})
	f.VerifyCompletions(t, "valueExport0", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value", "foo"},
		},
	})
	f.VerifyCompletions(t, "valueExport1", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value", "foo"},
		},
	})
	f.VerifyCompletions(t, "valueExport2", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{},
		},
	})
	f.VerifyCompletions(t, "valueExport3", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value"},
		},
	})
	f.VerifyCompletions(t, "typeImport0", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value", "foo"},
		},
	})
	f.VerifyCompletions(t, "typeImport1", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value", "foo"},
		},
	})
	f.VerifyCompletions(t, "typeImport2", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{},
		},
	})
	f.VerifyCompletions(t, "typeImport3", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value"},
		},
	})
	f.VerifyCompletions(t, "typeExport0", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value", "foo"},
		},
	})
	f.VerifyCompletions(t, "typeExport1", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value", "foo"},
		},
	})
	f.VerifyCompletions(t, "typeExport2", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{},
		},
	})
	f.VerifyCompletions(t, "typeExport3", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"__some type", "__some value"},
		},
	})
}
