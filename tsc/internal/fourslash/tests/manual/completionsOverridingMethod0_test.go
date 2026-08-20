package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsOverridingMethod0(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
// @Filename: a.ts
abstract class ABase {
    abstract foo(param1: string, param2: boolean): Promise<void>;
}

class ASub extends ABase {
    [|f/*a*/|]
}
// @Filename: b.ts
class BBase {
    foo(a: string, b: string): string {
        return a + b;
    }
}

class BSub extends BBase {
    [|f/*b*/|]
}
// @Filename: c.ts
class CBase {
    foo(a: string | number): string {
        return a + "";
    }
}

class CSub extends CBase {
    foo(a: string): string {
        return add;
    }
}

class CSub2 extends CSub {
    [|f/*c*/|]
}
// @Filename: d.ts
abstract class DBase {
    abstract foo(a: string): string;
}

abstract class DSub extends DBase {
    [|f/*d*/|]
}
// @Filename: e.ts
interface EBase {
    foo(a: string): string;
}

class ESub implements EBase {
    [|f/*e*/|]
}
// @Filename: f.ts
interface FBase {
    foo(a: string): string;
}

abstract class FSub implements FBase {
    [|f/*f*/|]
}
// @Filename: g.ts
interface GBase {
    foo(a: string): string;
    foo(a: undefined, b: number): string;
}

class GSub implements GBase {
    [|f/*g*/|]
}
// @Filename: h.ts
class HBase {
    static met(n: number): number {
        return n;
    }
}

class HSub extends HBase {
    /*h1*/
    static /*h2*/
}
// @Filename: i.ts
class IBase {
    met<T>(t: T): T {
        return t;
    }
    metcons<T extends string | number>(t: T): T {
        return t;
    }
}

class ISub extends IBase {
    /*i*/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "a", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "foo",
					TextEdit:   InsertReplaceTextEdit("foo(param1: string, param2: boolean): Promise<void> {\n}", f.Ranges()[0].LSRange),
					FilterText: new("foo"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
	f.VerifyCompletions(t, "b", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "foo",
					TextEdit:   InsertReplaceTextEdit("foo(a: string, b: string): string {\n}", f.Ranges()[1].LSRange),
					FilterText: new("foo"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
	f.VerifyCompletions(t, "c", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "foo",
					TextEdit:   InsertReplaceTextEdit("foo(a: string): string {\n}", f.Ranges()[2].LSRange),
					FilterText: new("foo"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
	f.VerifyCompletions(t, "d", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "foo",
					TextEdit:   InsertReplaceTextEdit("foo(a: string): string {\n}", f.Ranges()[3].LSRange),
					FilterText: new("foo"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
	f.VerifyCompletions(t, "e", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "foo",
					TextEdit:   InsertReplaceTextEdit("foo(a: string): string {\n}", f.Ranges()[4].LSRange),
					FilterText: new("foo"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
	f.VerifyCompletions(t, "f", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "foo",
					TextEdit:   InsertReplaceTextEdit("foo(a: string): string {\n}", f.Ranges()[5].LSRange),
					FilterText: new("foo"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
	f.VerifyCompletions(t, "g", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "foo",
					TextEdit:   InsertReplaceTextEdit("foo(a: string): string;\nfoo(a: undefined, b: number): string;\nfoo(a: unknown, b?: unknown): string {\n}", f.Ranges()[6].LSRange),
					FilterText: new("foo"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
	f.VerifyCompletions(t, "h1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Excludes: []string{
				"met",
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
	f.VerifyCompletions(t, "h2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:               "met",
					InsertText:          new("static met(n: number): number {\n}"),
					FilterText:          new("met"),
					SortText:            new(string(ls.SortTextLocationPriority)),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					Data: &lsproto.CompletionItemData{
						Source: "ClassMemberSnippet/",
					},
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
	f.VerifyCompletions(t, "i", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "met",
					InsertText: new("met<T>(t: T): T {\n}"),
					FilterText: new("met"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
				&lsproto.CompletionItem{
					Label:      "metcons",
					InsertText: new("metcons<T extends string | number>(t: T): T {\n}"),
					FilterText: new("metcons"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
}
