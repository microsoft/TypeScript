package ls_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/lstestutil"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

var defaultCommitCharacters = []string{".", ",", ";"}

type testCase struct {
	name     string
	files    map[string]string
	expected map[string]*lsproto.CompletionList
}

const mainFileName = "/index.ts"

func TestCompletions(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	itemDefaults := &lsproto.CompletionItemDefaults{
		CommitCharacters: &defaultCommitCharacters,
	}
	insertTextFormatPlainText := ptrTo(lsproto.InsertTextFormatPlainText)
	sortTextLocationPriority := ptrTo(string(ls.SortTextLocationPriority))
	sortTextLocalDeclarationPriority := ptrTo(string(ls.SortTextLocalDeclarationPriority))
	sortTextDeprecatedLocationPriority := ptrTo(string(ls.DeprecateSortText(ls.SortTextLocationPriority)))
	fieldKind := ptrTo(lsproto.CompletionItemKindField)
	methodKind := ptrTo(lsproto.CompletionItemKindMethod)
	functionKind := ptrTo(lsproto.CompletionItemKindFunction)
	variableKind := ptrTo(lsproto.CompletionItemKindVariable)

	stringMembers := []*lsproto.CompletionItem{
		{Label: "charAt", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "charCodeAt", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "concat", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "indexOf", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "lastIndexOf", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "length", Kind: fieldKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "localeCompare", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "match", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "replace", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "search", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "slice", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "split", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "substring", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "toLocaleLowerCase", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "toLocaleUpperCase", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "toLowerCase", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "toString", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "toUpperCase", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "trim", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "valueOf", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "substr", Kind: methodKind, SortText: sortTextDeprecatedLocationPriority, InsertTextFormat: insertTextFormatPlainText},
	}

	arrayMembers := []*lsproto.CompletionItem{
		{Label: "concat", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "every", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "filter", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "forEach", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "indexOf", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "join", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "lastIndexOf", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "length", Kind: fieldKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "map", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "pop", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "push", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "reduce", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "reduceRight", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "reverse", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "shift", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "slice", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "some", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "sort", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "splice", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "toLocaleString", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "toString", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
		{Label: "unshift", Kind: methodKind, SortText: sortTextLocationPriority, InsertTextFormat: insertTextFormatPlainText},
	}

	testCases := []testCase{
		{
			name: "basicInterfaceMembers",
			files: map[string]string{
				mainFileName: `export {};
interface Point {
    x: number;
    y: number;
}
declare const p: Point;
p./*a*/`,
			},
			expected: map[string]*lsproto.CompletionList{
				"a": {
					IsIncomplete: false,
					ItemDefaults: itemDefaults,
					Items: []*lsproto.CompletionItem{
						{
							Label:            "x",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".x"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "x",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 6, Character: 2},
										End:   lsproto.Position{Line: 6, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 6, Character: 2},
										End:   lsproto.Position{Line: 6, Character: 2},
									},
								},
							},
						},
						{
							Label:            "y",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".y"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "y",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 6, Character: 2},
										End:   lsproto.Position{Line: 6, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 6, Character: 2},
										End:   lsproto.Position{Line: 6, Character: 2},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "basicInterfaceMembersOptional",
			files: map[string]string{
				"/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
				mainFileName: `export {};
interface Point {
    x: number;
    y: number;
}
declare const p: Point | undefined;
p./*a*/`,
			},
			expected: map[string]*lsproto.CompletionList{
				"a": {
					IsIncomplete: false,
					ItemDefaults: itemDefaults,
					Items: []*lsproto.CompletionItem{
						{
							Label:            "x",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".?.x"),
							InsertText:       ptrTo("?.x"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								TextEdit: &lsproto.TextEdit{
									NewText: "?.x",
									Range: lsproto.Range{
										Start: lsproto.Position{Line: 6, Character: 1},
										End:   lsproto.Position{Line: 6, Character: 2},
									},
								},
							},
						},
						{
							Label:            "y",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".?.y"),
							InsertText:       ptrTo("?.y"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								TextEdit: &lsproto.TextEdit{
									NewText: "?.y",
									Range: lsproto.Range{
										Start: lsproto.Position{Line: 6, Character: 1},
										End:   lsproto.Position{Line: 6, Character: 2},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "objectLiteralType",
			files: map[string]string{
				mainFileName: `export {};
let x = { foo: 123 };
x./*a*/`,
			},
			expected: map[string]*lsproto.CompletionList{
				"a": {
					IsIncomplete: false,
					ItemDefaults: itemDefaults,
					Items: []*lsproto.CompletionItem{
						{
							Label:            "foo",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".foo"),
							InsertTextFormat: ptrTo(lsproto.InsertTextFormatPlainText),
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "foo",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 2, Character: 2},
										End:   lsproto.Position{Line: 2, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 2, Character: 2},
										End:   lsproto.Position{Line: 2, Character: 2},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "basicClassMembers",
			files: map[string]string{
				mainFileName: `
class n {
    constructor (public x: number, public y: number, private z: string) { }
}
var t = new n(0, 1, '');t./*a*/`,
			},
			expected: map[string]*lsproto.CompletionList{
				"a": {
					IsIncomplete: false,
					ItemDefaults: itemDefaults,
					Items: []*lsproto.CompletionItem{
						{
							Label:            "x",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".x"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "x",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 3, Character: 26},
										End:   lsproto.Position{Line: 3, Character: 26},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 3, Character: 26},
										End:   lsproto.Position{Line: 3, Character: 26},
									},
								},
							},
						},
						{
							Label:            "y",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".y"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "y",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 3, Character: 26},
										End:   lsproto.Position{Line: 3, Character: 26},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 3, Character: 26},
										End:   lsproto.Position{Line: 3, Character: 26},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "cloduleAsBaseClass",
			files: map[string]string{
				mainFileName: `
class A {
    constructor(x: number) { }
    foo() { }
    static bar() { }
}

module A {
    export var x = 1;
    export function baz() { }
}

class D extends A {
    constructor() {
        super(1);
    }
    foo2() { }
    static bar2() { }
}

D./*a*/`,
			},
			expected: map[string]*lsproto.CompletionList{
				"a": {
					IsIncomplete: false,
					ItemDefaults: itemDefaults,
					Items: []*lsproto.CompletionItem{ // !!! `funcionMembersPlus`
						{
							Label:            "bar",
							Kind:             methodKind,
							SortText:         sortTextLocalDeclarationPriority,
							FilterText:       ptrTo(".bar"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "bar",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "bar2",
							Kind:             methodKind,
							SortText:         sortTextLocalDeclarationPriority,
							FilterText:       ptrTo(".bar2"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "bar2",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "apply",
							Kind:             methodKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".apply"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "apply",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "arguments",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".arguments"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "arguments",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "baz",
							Kind:             functionKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".baz"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "baz",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "bind",
							Kind:             methodKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".bind"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "bind",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "call",
							Kind:             methodKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".call"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "call",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "caller",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".caller"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "caller",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "length",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".length"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "length",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "prototype",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".prototype"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "prototype",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "toString",
							Kind:             methodKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".toString"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "toString",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
						{
							Label:            "x",
							Kind:             variableKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".x"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "x",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 19, Character: 2},
										End:   lsproto.Position{Line: 19, Character: 2},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "lambdaThisMembers",
			files: map[string]string{
				mainFileName: `class Foo {
    a: number;
    b() {
        var x = () => {
            this./**/;
        }
    }
}`,
			},
			expected: map[string]*lsproto.CompletionList{
				"": {
					IsIncomplete: false,
					ItemDefaults: itemDefaults,
					Items: []*lsproto.CompletionItem{
						{
							Label:            "a",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".a"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "a",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 4, Character: 17},
										End:   lsproto.Position{Line: 4, Character: 17},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 4, Character: 17},
										End:   lsproto.Position{Line: 4, Character: 17},
									},
								},
							},
						},
						{
							Label:            "b",
							Kind:             methodKind,
							SortText:         sortTextLocationPriority,
							FilterText:       ptrTo(".b"),
							InsertTextFormat: insertTextFormatPlainText,
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								InsertReplaceEdit: &lsproto.InsertReplaceEdit{
									NewText: "b",
									Insert: lsproto.Range{
										Start: lsproto.Position{Line: 4, Character: 17},
										End:   lsproto.Position{Line: 4, Character: 17},
									},
									Replace: lsproto.Range{
										Start: lsproto.Position{Line: 4, Character: 17},
										End:   lsproto.Position{Line: 4, Character: 17},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "memberCompletionInForEach1",
			files: map[string]string{
				mainFileName: `var x: string[] = [];
x.forEach(function (y) { y./*1*/`,
			},
			expected: map[string]*lsproto.CompletionList{
				"1": {
					IsIncomplete: false,
					ItemDefaults: itemDefaults,
					Items: core.Map(stringMembers, func(basicItem *lsproto.CompletionItem) *lsproto.CompletionItem {
						item := *basicItem
						item.FilterText = ptrTo("." + item.Label)
						item.TextEdit = &lsproto.TextEditOrInsertReplaceEdit{
							InsertReplaceEdit: &lsproto.InsertReplaceEdit{
								NewText: item.Label,
								Insert: lsproto.Range{
									Start: lsproto.Position{Line: 1, Character: 27},
									End:   lsproto.Position{Line: 1, Character: 27},
								},
								Replace: lsproto.Range{
									Start: lsproto.Position{Line: 1, Character: 27},
									End:   lsproto.Position{Line: 1, Character: 27},
								},
							},
						}
						return &item
					}),
				},
			},
		},
		{
			name: "completionsTuple",
			files: map[string]string{
				mainFileName: `declare const x: [number, number];
x./**/;`,
			},
			expected: map[string]*lsproto.CompletionList{
				"": {
					IsIncomplete: false,
					ItemDefaults: itemDefaults,
					Items: append([]*lsproto.CompletionItem{
						{
							Label:            "0",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							InsertText:       ptrTo("[0]"),
							InsertTextFormat: insertTextFormatPlainText,
							FilterText:       ptrTo(".[0]"),
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								TextEdit: &lsproto.TextEdit{
									NewText: "[0]",
									Range: lsproto.Range{
										Start: lsproto.Position{Line: 1, Character: 1},
										End:   lsproto.Position{Line: 1, Character: 2},
									},
								},
							},
						},
						{
							Label:            "1",
							Kind:             fieldKind,
							SortText:         sortTextLocationPriority,
							InsertText:       ptrTo("[1]"),
							InsertTextFormat: insertTextFormatPlainText,
							FilterText:       ptrTo(".[1]"),
							TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
								TextEdit: &lsproto.TextEdit{
									NewText: "[1]",
									Range: lsproto.Range{
										Start: lsproto.Position{Line: 1, Character: 1},
										End:   lsproto.Position{Line: 1, Character: 2},
									},
								},
							},
						},
					}, core.Map(arrayMembers, func(basicItem *lsproto.CompletionItem) *lsproto.CompletionItem {
						item := *basicItem
						item.FilterText = ptrTo("." + item.Label)
						item.TextEdit = &lsproto.TextEditOrInsertReplaceEdit{
							InsertReplaceEdit: &lsproto.InsertReplaceEdit{
								NewText: item.Label,
								Insert: lsproto.Range{
									Start: lsproto.Position{Line: 1, Character: 2},
									End:   lsproto.Position{Line: 1, Character: 2},
								},
								Replace: lsproto.Range{
									Start: lsproto.Position{Line: 1, Character: 2},
									End:   lsproto.Position{Line: 1, Character: 2},
								},
							},
						}
						return &item
					})...),
				},
			},
		},
	}
	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()
			runTest(t, testCase.files, testCase.expected)
		})
	}
}

func runTest(t *testing.T, files map[string]string, expected map[string]*lsproto.CompletionList) {
	parsedFiles := make(map[string]string)
	var markerPositions map[string]*lstestutil.Marker
	for fileName, content := range files {
		if fileName == mainFileName {
			testData := lstestutil.ParseTestData("", content, fileName)
			markerPositions = testData.MarkerPositions
			parsedFiles[fileName] = testData.Files[0].Content // !!! Assumes no usage of @filename
		} else {
			parsedFiles[fileName] = content
		}
	}
	languageService := createLanguageService(mainFileName, parsedFiles)
	context := &lsproto.CompletionContext{
		TriggerKind: lsproto.CompletionTriggerKindInvoked,
	}
	ptrTrue := ptrTo(true)
	capabilities := &lsproto.CompletionClientCapabilities{
		CompletionItem: &lsproto.ClientCompletionItemOptions{
			SnippetSupport:          ptrTrue,
			CommitCharactersSupport: ptrTrue,
			PreselectSupport:        ptrTrue,
			LabelDetailsSupport:     ptrTrue,
			InsertReplaceSupport:    ptrTrue,
		},
		CompletionList: &lsproto.CompletionListCapabilities{
			ItemDefaults: &[]string{"commitCharacters"},
		},
	}
	preferences := &ls.UserPreferences{}

	for markerName, expectedResult := range expected {
		marker, ok := markerPositions[markerName]
		if !ok {
			t.Fatalf("No marker found for '%s'", markerName)
		}
		completionList := languageService.ProvideCompletion(
			"/index.ts",
			marker.Position,
			context,
			capabilities,
			preferences)
		assert.DeepEqual(t, completionList, expectedResult)
	}
}

func createLanguageService(fileName string, files map[string]string) *ls.LanguageService {
	projectService, _ := projecttestutil.Setup(files)
	projectService.OpenFile(fileName, files[fileName], core.ScriptKindTS, "")
	project := projectService.Projects()[0]
	return project.LanguageService()
}

func ptrTo[T any](v T) *T {
	return &v
}
