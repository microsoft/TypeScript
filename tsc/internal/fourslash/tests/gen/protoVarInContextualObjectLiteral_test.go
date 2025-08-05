package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestProtoVarInContextualObjectLiteral(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var o1 : {
    __proto__: number;
    p: number;
} = {
        /*1*/
    };
var o2: {
    __proto__: number;
    p: number;
} = {
        /*2*/
    };
var o3: {
    "__proto__": number;
    p: number;
} = {
        /*3*/
    };
var o4: {
    "__proto__": number;
    p: number;
} = {
        /*4*/
    };
var o5: {
    __proto__: number;
    ___proto__: string;
    p: number;
} = {
        /*5*/
    };
var o6: {
    __proto__: number;
    ___proto__: string;
    p: number;
} = {
        /*6*/
    };`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "__proto__",
					Detail: PtrTo("(property) __proto__: number"),
				},
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.Insert(t, "__proto__: 10,")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "__proto__",
					Detail: PtrTo("(property) __proto__: number"),
				},
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.Insert(t, "\"__proto__\": 10,")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "__proto__",
					Detail: PtrTo("(property) \"__proto__\": number"),
				},
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.Insert(t, "__proto__: 10,")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "__proto__",
					Detail: PtrTo("(property) \"__proto__\": number"),
				},
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.Insert(t, "\"__proto__\": 10,")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "__proto__",
					Detail: PtrTo("(property) __proto__: number"),
				},
				&lsproto.CompletionItem{
					Label:  "___proto__",
					Detail: PtrTo("(property) ___proto__: string"),
				},
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.Insert(t, "__proto__: 10,")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "___proto__",
					Detail: PtrTo("(property) ___proto__: string"),
				},
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.Insert(t, "\"___proto__\": \"10\",")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "6", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "__proto__",
					Detail: PtrTo("(property) __proto__: number"),
				},
				&lsproto.CompletionItem{
					Label:  "___proto__",
					Detail: PtrTo("(property) ___proto__: string"),
				},
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.Insert(t, "___proto__: \"10\",")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "__proto__",
					Detail: PtrTo("(property) __proto__: number"),
				},
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
	f.Insert(t, "\"__proto__\": 10,")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "p",
					Detail: PtrTo("(property) p: number"),
				},
			},
		},
	})
}
