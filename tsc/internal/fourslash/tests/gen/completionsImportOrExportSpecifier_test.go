package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImportOrExportSpecifier(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: exports.ts
export let foo = 1;
let someValue = 2;
let someType = 3;
type someType2 = 4;
export {
  someValue as "__some value",
  someType as "__some type",
  type someType2 as "__some type2",
};
// @Filename: values.ts
import { /*valueImport0*/ } from "./exports";
import { /*valueImport1*/ as valueImport1 } from "./exports";
import { foo as /*valueImport2*/ } from "./exports";
import { foo, /*valueImport3*/ as valueImport3 } from "./exports";
import * as _a from "./exports";
_a./*namespaceImport1*/;

export { /*valueExport0*/ } from "./exports";
export { /*valueExport1*/ as valueExport1 } from "./exports";
export { foo as /*valueExport2*/ } from "./exports";
export { foo, /*valueExport3*/ } from "./exports";
// @Filename: types.ts
import { type /*typeImport0*/ } from "./exports";
import { type /*typeImport1*/ as typeImport1 } from "./exports";
import { type foo as /*typeImport2*/ } from "./exports";
import { type foo, type /*typeImport3*/ as typeImport3 } from "./exports";
import * as _a from "./exports";

export { type /*typeExport0*/ } from "./exports";
export { type /*typeExport1*/ as typeExport1 } from "./exports";
export { type foo as /*typeExport2*/ } from "./exports";
export { type foo, type /*typeExport3*/ } from "./exports";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "valueImport0", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\" as __some_type"),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\" as __some_type2"),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\" as __some_value"),
				},
				"foo",
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "valueImport1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\""),
				},
				"foo",
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "valueImport2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{},
		},
	})
	f.VerifyCompletions(t, "valueImport3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\""),
				},
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "namespaceImport1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"foo",
			},
		},
	})
	f.VerifyCompletions(t, "valueExport0", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\""),
				},
				"foo",
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "valueExport1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\""),
				},
				"foo",
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "valueExport2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{},
		},
	})
	f.VerifyCompletions(t, "valueExport3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\""),
				},
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "typeImport0", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\" as __some_type"),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\" as __some_type2"),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\" as __some_value"),
				},
				"foo",
			},
		},
	})
	f.VerifyCompletions(t, "typeImport1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\""),
				},
				"foo",
			},
		},
	})
	f.VerifyCompletions(t, "typeImport2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{},
		},
	})
	f.VerifyCompletions(t, "typeImport3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\""),
				},
			},
		},
	})
	f.VerifyCompletions(t, "typeExport0", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\""),
				},
				"foo",
			},
		},
	})
	f.VerifyCompletions(t, "typeExport1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\""),
				},
				"foo",
			},
		},
	})
	f.VerifyCompletions(t, "typeExport2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{},
		},
	})
	f.VerifyCompletions(t, "typeExport3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "__some type",
					InsertText: PtrTo("\"__some type\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some type2",
					InsertText: PtrTo("\"__some type2\""),
				},
				&lsproto.CompletionItem{
					Label:      "__some value",
					InsertText: PtrTo("\"__some value\""),
				},
			},
		},
	})
}
