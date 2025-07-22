package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionFilterText1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
class Foo1 {
    #bar: number;
    constructor(bar: number) {
        this.[|b|]/*1*/
    }
}

class Foo5 {
	#bar: number;
	constructor(bar: number) {
		this./*5*/
	}
}

class Foo2 {
    #bar: number;
    constructor(bar: number) {
        this.[|#b|]/*2*/
    }
}

class Foo6 {
    #bar: number;
    constructor(bar: number) {
        this.[|#|]/*6*/
    }
}

class Foo3 {
    #bar: number;
    constructor(bar: number) {
       [|b|]/*3*/
    }
}

class Foo7 {
	#bar: number;
	constructor(bar: number) {
	   /*7*/
	}
}

class Foo4 {
    #bar: number;
    constructor(bar: number) {
       [|#b|]/*4*/
    }
}

class Foo8 {
    #bar: number;
    constructor(bar: number) {
       [|#|]/*8*/
    }
}
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange: &fourslash.EditRange{
				Insert:  f.Ranges()[0],
				Replace: f.Ranges()[0],
			},
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "#bar",
					Kind:       ptrTo(lsproto.CompletionItemKindField),
					SortText:   ptrTo(string(ls.SortTextLocationPriority)),
					FilterText: ptrTo("bar"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "#bar",
					Kind:       ptrTo(lsproto.CompletionItemKindField),
					SortText:   ptrTo(string(ls.SortTextLocationPriority)),
					FilterText: ptrTo("bar"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange: &fourslash.EditRange{
				Insert:  f.Ranges()[1],
				Replace: f.Ranges()[1],
			},
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "#bar",
					Kind:     ptrTo(lsproto.CompletionItemKindField),
					SortText: ptrTo(string(ls.SortTextLocationPriority)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "6", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange: &fourslash.EditRange{
				Insert:  f.Ranges()[2],
				Replace: f.Ranges()[2],
			},
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "#bar",
					Kind:     ptrTo(lsproto.CompletionItemKindField),
					SortText: ptrTo(string(ls.SortTextLocationPriority)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange: &fourslash.EditRange{
				Insert:  f.Ranges()[3],
				Replace: f.Ranges()[3],
			},
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "#bar",
					Kind:       ptrTo(lsproto.CompletionItemKindField),
					SortText:   ptrTo(string(ls.SortTextSuggestedClassMembers)),
					FilterText: ptrTo("bar"),
					InsertText: ptrTo("this.#bar"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "7", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "#bar",
					Kind:       ptrTo(lsproto.CompletionItemKindField),
					SortText:   ptrTo(string(ls.SortTextSuggestedClassMembers)),
					FilterText: ptrTo("bar"),
					InsertText: ptrTo("this.#bar"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange: &fourslash.EditRange{
				Insert:  f.Ranges()[4],
				Replace: f.Ranges()[4],
			},
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "#bar",
					Kind:       ptrTo(lsproto.CompletionItemKindField),
					SortText:   ptrTo(string(ls.SortTextSuggestedClassMembers)),
					InsertText: ptrTo("this.#bar"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "8", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange: &fourslash.EditRange{
				Insert:  f.Ranges()[5],
				Replace: f.Ranges()[5],
			},
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "#bar",
					Kind:       ptrTo(lsproto.CompletionItemKindField),
					SortText:   ptrTo(string(ls.SortTextSuggestedClassMembers)),
					InsertText: ptrTo("this.#bar"),
				},
			},
		},
	})
}
