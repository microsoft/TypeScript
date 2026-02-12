package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsxAttributeSnippetCompletionClosed(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
//@Filename: file.tsx
interface NestedInterface {
    Foo: NestedInterface;
    (props: {className?: string, onClick?: () => void}): any;
}

declare const Foo: NestedInterface;

function fn1() {
    return <Foo>
        <Foo /*1*/ />
    </Foo>
}
function fn2() {
    return <Foo>
        <Foo.Foo /*2*/ />
    </Foo>
}
function fn3() {
    return <Foo>
        <Foo.Foo cla/*3*/ />
    </Foo>
}
function fn4() {
    return <Foo>
        <Foo.Foo cla/*4*/ something />
    </Foo>
}
function fn5() {
    return <Foo>
        <Foo.Foo something /*5*/ />
    </Foo>
}
function fn6() {
    return <Foo>
        <Foo.Foo something cla/*6*/ />
    </Foo>
}
function fn7() {
    return <Foo /*7*/ />
}
function fn8() {
    return <Foo cla/*8*/ />
}
function fn9() {
    return <Foo cla/*9*/ something />
}
function fn10() {
    return <Foo something /*10*/ />
}
function fn11() {
    return <Foo something cla/*11*/ />
}
function fn12() {
    return <Foo something={false} cla/*12*/ />
}
function fn13() {
    return <Foo something={false} /*13*/ foo />
}
function fn14() {
    return <Foo something={false} cla/*14*/ foo />
}
function fn15() {
    return <Foo onC/*15*/="" />
}
function fn16() {
    return <Foo something={false} onC/*16*/="" foo />
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "7", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "8", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "9", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "10", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "11", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "12", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "13", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "14", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "className?",
					InsertText:       new("className={$1}"),
					FilterText:       new("className"),
					Detail:           new("(property) className?: string"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "15", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "onClick?",
					InsertText: new("onClick"),
					FilterText: new("onClick"),
					Detail:     new("(property) onClick?: () => void"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "16", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "onClick?",
					InsertText: new("onClick"),
					FilterText: new("onClick"),
					Detail:     new("(property) onClick?: () => void"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
}
