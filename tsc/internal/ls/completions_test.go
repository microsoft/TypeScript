package ls_test

import (
	"context"
	"slices"
	"testing"

	"github.com/google/go-cmp/cmp/cmpopts"
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
	name           string
	files          map[string]string
	expectedResult map[string]*testCaseResult
	mainFileName   string
}

type testCaseResult struct {
	list       *lsproto.CompletionList
	isIncludes bool
	excludes   []string
}

const (
	defaultMainFileName     = "/index.ts"
	defaultTsconfigFileName = "/tsconfig.json"
)

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
	sortTextLocationPriority := ptrTo(string(ls.SortTextLocationPriority))
	sortTextLocalDeclarationPriority := ptrTo(string(ls.SortTextLocalDeclarationPriority))
	sortTextDeprecatedLocationPriority := ptrTo(string(ls.DeprecateSortText(ls.SortTextLocationPriority)))
	sortTextGlobalsOrKeywords := ptrTo(string(ls.SortTextGlobalsOrKeywords))
	fieldKind := ptrTo(lsproto.CompletionItemKindField)
	methodKind := ptrTo(lsproto.CompletionItemKindMethod)
	functionKind := ptrTo(lsproto.CompletionItemKindFunction)
	variableKind := ptrTo(lsproto.CompletionItemKindVariable)
	classKind := ptrTo(lsproto.CompletionItemKindClass)
	keywordKind := ptrTo(lsproto.CompletionItemKindKeyword)
	propertyKind := ptrTo(lsproto.CompletionItemKindProperty)
	constantKind := ptrTo(lsproto.CompletionItemKindConstant)
	enumMemberKind := ptrTo(lsproto.CompletionItemKindEnumMember)

	stringMembers := []*lsproto.CompletionItem{
		{Label: "charAt", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "charCodeAt", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "concat", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "indexOf", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "lastIndexOf", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "length", Kind: fieldKind, SortText: sortTextLocationPriority},
		{Label: "localeCompare", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "match", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "replace", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "search", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "slice", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "split", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "substring", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "toLocaleLowerCase", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "toLocaleUpperCase", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "toLowerCase", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "toString", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "toUpperCase", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "trim", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "valueOf", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "substr", Kind: methodKind, SortText: sortTextDeprecatedLocationPriority},
	}

	arrayMembers := []*lsproto.CompletionItem{
		{Label: "concat", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "every", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "filter", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "forEach", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "indexOf", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "join", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "lastIndexOf", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "length", Kind: fieldKind, SortText: sortTextLocationPriority},
		{Label: "map", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "pop", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "push", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "reduce", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "reduceRight", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "reverse", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "shift", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "slice", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "some", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "sort", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "splice", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "toLocaleString", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "toString", Kind: methodKind, SortText: sortTextLocationPriority},
		{Label: "unshift", Kind: methodKind, SortText: sortTextLocationPriority},
	}

	testCases := []testCase{
		{
			name: "basicInterfaceMembers",
			files: map[string]string{
				defaultMainFileName: `export {};
interface Point {
    x: number;
    y: number;
}
declare const p: Point;
p./*a*/`,
			},
			expectedResult: map[string]*testCaseResult{
				"a": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:      "x",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".x"),

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
								Label:      "y",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".y"),

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
		},
		{
			name: "basicInterfaceMembersOptional",
			files: map[string]string{
				"/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
				defaultMainFileName: `export {};
interface Point {
    x: number;
    y: number;
}
declare const p: Point | undefined;
p./*a*/`,
			},
			expectedResult: map[string]*testCaseResult{
				"a": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:      "x",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".?.x"),
								InsertText: ptrTo("?.x"),

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
								Label:      "y",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".?.y"),
								InsertText: ptrTo("?.y"),

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
		},
		{
			name: "objectLiteralType",
			files: map[string]string{
				defaultMainFileName: `export {};
let x = { foo: 123 };
x./*a*/`,
			},
			expectedResult: map[string]*testCaseResult{
				"a": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:      "foo",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".foo"),
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
		},
		{
			name: "basicClassMembers",
			files: map[string]string{
				defaultMainFileName: `
class n {
    constructor (public x: number, public y: number, private z: string) { }
}
var t = new n(0, 1, '');t./*a*/`,
			},
			expectedResult: map[string]*testCaseResult{
				"a": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:      "x",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".x"),

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
								Label:      "y",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".y"),

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
		},
		{
			name: "cloduleAsBaseClass",
			files: map[string]string{
				defaultMainFileName: `
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
			expectedResult: map[string]*testCaseResult{
				"a": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{ // !!! `funcionMembersPlus`
							{
								Label:      "bar",
								Kind:       methodKind,
								SortText:   sortTextLocalDeclarationPriority,
								FilterText: ptrTo(".bar"),

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
								Label:      "bar2",
								Kind:       methodKind,
								SortText:   sortTextLocalDeclarationPriority,
								FilterText: ptrTo(".bar2"),

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
								Label:      "apply",
								Kind:       methodKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".apply"),

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
								Label:      "arguments",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".arguments"),

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
								Label:      "baz",
								Kind:       functionKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".baz"),

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
								Label:      "bind",
								Kind:       methodKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".bind"),

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
								Label:      "call",
								Kind:       methodKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".call"),

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
								Label:      "caller",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".caller"),

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
								Label:      "length",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".length"),

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
								Label:      "prototype",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".prototype"),

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
								Label:      "toString",
								Kind:       methodKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".toString"),

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
								Label:      "x",
								Kind:       variableKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".x"),

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
		},
		{
			name: "lambdaThisMembers",
			files: map[string]string{
				defaultMainFileName: `class Foo {
    a: number;
    b() {
        var x = () => {
            this./**/;
        }
    }
}`,
			},
			expectedResult: map[string]*testCaseResult{
				"": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:      "a",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".a"),

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
								Label:      "b",
								Kind:       methodKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo(".b"),

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
		},
		{
			name: "memberCompletionInForEach1",
			files: map[string]string{
				defaultMainFileName: `var x: string[] = [];
x.forEach(function (y) { y./*1*/`,
			},
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
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
		},
		{
			name: "completionsTuple",
			files: map[string]string{
				defaultMainFileName: `declare const x: [number, number];
x./**/;`,
			},
			expectedResult: map[string]*testCaseResult{
				"": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: append([]*lsproto.CompletionItem{
							{
								Label:      "0",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								InsertText: ptrTo("[0]"),

								FilterText: ptrTo(".[0]"),
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
								Label:      "1",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								InsertText: ptrTo("[1]"),

								FilterText: ptrTo(".[1]"),
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
		},
		{
			name: "augmentedTypesClass3Fourslash",
			files: map[string]string{
				defaultMainFileName: `class c5b { public foo() { } }
namespace c5b { export var y = 2; } // should be ok
/*3*/`,
			},
			expectedResult: map[string]*testCaseResult{
				"3": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "c5b",
								Kind:     classKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
					isIncludes: true,
				},
			},
		},
		{
			name: "objectLiteralBindingInParameter",
			files: map[string]string{
				defaultMainFileName: `interface I { x1: number; x2: string }
function f(cb: (ev: I) => any) { }
f(({/*1*/}) => 0);

[<I>null].reduce(({/*2*/}, b) => b);

interface Foo {
    m(x: { x1: number, x2: number }): void;
    prop: I;
}
let x: Foo = {
    m({ /*3*/ }) {
    },
    get prop(): I { return undefined; },
    set prop({ /*4*/ }) {
    }
};`,
			},
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "x1",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "x2",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"2": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "x1",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "x2",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"3": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "x1",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "x2",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
			},
		},
		{
			name: "completionListInTypeLiteralInTypeParameter3",
			files: map[string]string{
				defaultMainFileName: `interface Foo {
    one: string;
    two: number;
}

interface Bar<T extends Foo> {
    foo: T;
}

var foobar: Bar<{ one: string, /**/`,
			},
			expectedResult: map[string]*testCaseResult{
				"": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: &lsproto.CompletionItemDefaults{
							CommitCharacters: &[]string{},
						},
						Items: []*lsproto.CompletionItem{
							{
								Label:    "two",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
			},
		},
		{
			name: "completionListInImportClause04",
			files: map[string]string{
				defaultMainFileName: `import {/*1*/} from './foo';`,
				"/foo.d.ts": `declare class Foo {
    static prop1(x: number): number;
    static prop1(x: string): string;
    static prop2(x: boolean): boolean;
}
export = Foo;`,
			},
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "prop1",
								Kind:     methodKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "prop2",
								Kind:     methodKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "prototype",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "type",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
						},
					},
				},
			},
		},
		{
			name: "completionListForImportAttributes",
			files: map[string]string{
				defaultMainFileName: `declare global {
    interface ImportAttributes {
        type: "json",
        "resolution-mode": "import"
    }
}
const str = "hello";

import * as t1 from "./a" with { /*1*/ };
import * as t3 from "./a" with { type: "json", /*3*/ };
import * as t4 from "./a" with { type: /*4*/ };`,
				"/a.ts":          `export default {};`,
				"/tsconfig.json": `{ "compilerOptions": { "module": "esnext", "target": "esnext" } }`,
			},
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "resolution-mode",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "type",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
			},
		},
		{
			name: "completionsInExport_invalid",
			files: map[string]string{
				defaultMainFileName: `function topLevel() {}
if (!!true) {
  const blockScoped = 0;
  export { /**/ };
}`,
			},
			expectedResult: map[string]*testCaseResult{
				"": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "topLevel",
								Kind:     functionKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "type",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
						},
					},
				},
			},
		},
		{
			name: "completionListAtIdentifierDefinitionLocations_parameters",
			files: map[string]string{
				defaultMainFileName: `var aa = 1;
class bar5{ constructor(public /*constructorParameter1*/`,
			},
			expectedResult: map[string]*testCaseResult{
				"constructorParameter1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: &lsproto.CompletionItemDefaults{
							CommitCharacters: &[]string{},
						},
						Items: []*lsproto.CompletionItem{
							{
								Label:    "override",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "private",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "protected",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "public",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "readonly",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
						},
					},
				},
			},
		},
		{
			name: "completionEntryForClassMembers_StaticWhenBaseTypeIsNotResolved",
			files: map[string]string{
				defaultMainFileName: `import React from 'react'
class Slider extends React.Component {
    static defau/**/ltProps = {
        onMouseDown: () => { },
        onMouseUp: () => { },
        unit: 'px',
    }
    handleChange = () => 10;
}`,
				"/node_modules/@types/react/index.d.ts": `export = React;
export as namespace React;
declare namespace React {
    function createElement(): any;
    interface Component<P = {}, S = {}, SS = any> { }
    class Component<P, S> {
        static contextType?: any;
        context: any;
        constructor(props: Readonly<P>);
        setState<K extends keyof S>(
            state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
            callback?: () => void
        ): void;
    }
}`,
			},
			expectedResult: map[string]*testCaseResult{
				"": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: &lsproto.CompletionItemDefaults{
							CommitCharacters: &[]string{},
						},
						Items: []*lsproto.CompletionItem{
							{
								Label:      "contextType?",
								Kind:       fieldKind,
								SortText:   sortTextLocationPriority,
								FilterText: ptrTo("contextType"),
								InsertText: ptrTo("contextType"),

								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									InsertReplaceEdit: &lsproto.InsertReplaceEdit{
										NewText: "contextType",
										Insert: lsproto.Range{
											Start: lsproto.Position{Line: 2, Character: 11},
											End:   lsproto.Position{Line: 2, Character: 16},
										},
										Replace: lsproto.Range{
											Start: lsproto.Position{Line: 2, Character: 11},
											End:   lsproto.Position{Line: 2, Character: 23},
										},
									},
								},
							},
							{
								Label:    "abstract",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "accessor",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "async",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "constructor",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "declare",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "get",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "override",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "private",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "protected",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "public",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "readonly",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "set",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
							{
								Label:    "static",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
						},
					},
				},
			},
		},
		{
			name:         "completionsInJsxTag",
			mainFileName: "/index.tsx",
			files: map[string]string{
				"/index.tsx": `declare namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        div: {
            /** Doc */
            foo: string
            /** Label docs */
            "aria-label": string
        }
    }
}
class Foo {
    render() {
        <div /*1*/ ></div>;
        <div  /*2*/ />
    }
}`,
				"/tsconfig.json": `{ "compilerOptions": { "jsx": "preserve" } }`,
			},
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "aria-label",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "foo",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"2": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "aria-label",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "foo",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
			},
		},
		{
			name: "completionsDotDotDotInObjectLiteral1",
			files: map[string]string{
				defaultMainFileName: `const foo = { b: 100 };
const bar: {
  a: number;
  b: number;
} = {
  a: 42,
  .../*1*/
};`,
			},
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "foo",
								Kind:     variableKind,
								SortText: sortTextLocationPriority,

								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									InsertReplaceEdit: &lsproto.InsertReplaceEdit{
										NewText: "foo",
										Insert: lsproto.Range{
											Start: lsproto.Position{Line: 6, Character: 5},
											End:   lsproto.Position{Line: 6, Character: 5},
										},
										Replace: lsproto.Range{
											Start: lsproto.Position{Line: 6, Character: 5},
											End:   lsproto.Position{Line: 6, Character: 5},
										},
									},
								},
							},
						},
					},
					isIncludes: true,
					excludes:   []string{"b"},
				},
			},
		},
		{
			name: "extendsKeywordCompletion2",
			files: map[string]string{
				defaultMainFileName: `function f1<T /*1*/>() {}
function f2<T ext/*2*/>() {}`,
			},
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "extends",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
						},
					},
					isIncludes: true,
				},
				"2": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "extends",
								Kind:     keywordKind,
								SortText: sortTextGlobalsOrKeywords,
							},
						},
					},
					isIncludes: true,
				},
			},
		},
		{
			name: "paths.ts",
			files: map[string]string{
				defaultMainFileName: `import {
    CharacterCodes,
    compareStringsCaseInsensitive,
    compareStringsCaseSensitive,
    compareValues,
    Comparison,
    Debug,
    endsWith,
    equateStringsCaseInsensitive,
    equateStringsCaseSensitive,
    GetCanonicalFileName,
    getDeclarationFileExtension,
    getStringComparer,
    identity,
    lastOrUndefined,
    Path,
    some,
    startsWith,
} from "./_namespaces/ts.js";

/**
 * Internally, we represent paths as strings with '/' as the directory separator.
 * When we make system calls (eg: LanguageServiceHost.getDirectory()),
 * we expect the host to correctly handle paths in our specified format.
 *
 * @internal
 */
export const directorySeparator = "/";
/** @internal */
export const altDirectorySeparator = "\\";
const urlSchemeSeparator = "://";
const backslashRegExp = /\\/g;

b/*a*/

//// Path Tests

/**
 * Determines whether a charCode corresponds to '/' or '\'.
 *
 * @internal
 */
export function isAnyDirectorySeparator(charCode: number): boolean {
    return charCode === CharacterCodes.slash || charCode === CharacterCodes.backslash;
}`,
			},
			expectedResult: map[string]*testCaseResult{
				"a": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "CharacterCodes",
								Kind:     variableKind,
								SortText: sortTextLocationPriority,
								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									InsertReplaceEdit: &lsproto.InsertReplaceEdit{
										NewText: "CharacterCodes",
										Insert: lsproto.Range{
											Start: lsproto.Position{Line: 27, Character: 0},
											End:   lsproto.Position{Line: 27, Character: 1},
										},
										Replace: lsproto.Range{
											Start: lsproto.Position{Line: 27, Character: 0},
											End:   lsproto.Position{Line: 27, Character: 1},
										},
									},
								},
							},
						},
					},
					isIncludes: true,
				},
			},
		},
		{
			name: "jsxTagNameCompletionUnderElementUnclosed",
			files: map[string]string{
				"/index.tsx": `declare namespace JSX {
    interface IntrinsicElements {
        button: any;
        div: any;
    }
}
function fn() {
    return <>
        <butto/*1*/
    </>;
}
function fn2() {
    return <>
        preceding junk <butto/*2*/
    </>;
}
function fn3() {
    return <>
        <butto/*3*/ style=""
    </>;
}`,
			},
			mainFileName: "/index.tsx",
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "button",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
					isIncludes: true,
				},
				"2": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "button",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
					isIncludes: true,
				},
				"3": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "button",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
					isIncludes: true,
				},
			},
		},
		{
			name: "tsxCompletionOnClosingTagWithoutJSX1",
			files: map[string]string{
				"/index.tsx": `var x1 = <div><//**/`,
			},
			mainFileName: "/index.tsx",
			expectedResult: map[string]*testCaseResult{
				"": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "div>",
								Kind:     classKind,
								SortText: sortTextLocationPriority,

								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									InsertReplaceEdit: &lsproto.InsertReplaceEdit{
										NewText: "div>",
										Insert: lsproto.Range{
											Start: lsproto.Position{Line: 0, Character: 16},
											End:   lsproto.Position{Line: 0, Character: 16},
										},
										Replace: lsproto.Range{
											Start: lsproto.Position{Line: 0, Character: 16},
											End:   lsproto.Position{Line: 0, Character: 16},
										},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "completionListWithLabel",
			files: map[string]string{
				defaultMainFileName: `label: while (true) {
   break /*1*/
   continue /*2*/
   testlabel: while (true) {
       break /*3*/
       continue /*4*/
       break tes/*5*/
       continue tes/*6*/
   }
   break /*7*/
   break; /*8*/
}`,
			},
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "label",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"2": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "label",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"7": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "label",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"3": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "testlabel",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "label",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"4": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "testlabel",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "label",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"5": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "testlabel",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "label",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"6": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "testlabel",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "label",
								Kind:     propertyKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"8": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items:        []*lsproto.CompletionItem{},
					},
					isIncludes: true,
					excludes:   []string{"label"},
				},
			},
		},
		{
			name: "completionForStringLiteral",
			files: map[string]string{
				defaultMainFileName: `type Options = "Option 1" | "Option 2" | "Option 3";
var x: Options = "/*1*/Option 3";`,
			},
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "Option 1",
								Kind:     constantKind,
								SortText: sortTextLocationPriority,

								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									TextEdit: &lsproto.TextEdit{
										NewText: "Option 1",
										Range: lsproto.Range{
											Start: lsproto.Position{Line: 1, Character: 18},
											End:   lsproto.Position{Line: 1, Character: 26},
										},
									},
								},
							},
							{
								Label:    "Option 2",
								Kind:     constantKind,
								SortText: sortTextLocationPriority,

								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									TextEdit: &lsproto.TextEdit{
										NewText: "Option 2",
										Range: lsproto.Range{
											Start: lsproto.Position{Line: 1, Character: 18},
											End:   lsproto.Position{Line: 1, Character: 26},
										},
									},
								},
							},
							{
								Label:    "Option 3",
								Kind:     constantKind,
								SortText: sortTextLocationPriority,

								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									TextEdit: &lsproto.TextEdit{
										NewText: "Option 3",
										Range: lsproto.Range{
											Start: lsproto.Position{Line: 1, Character: 18},
											End:   lsproto.Position{Line: 1, Character: 26},
										},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "switchCompletions",
			files: map[string]string{
				defaultMainFileName: `enum E { A, B }
declare const e: E;
switch (e) {
    case E.A:
        return 0;
    case E./*1*/
}
declare const f: 1 | 2 | 3;
switch (f) {
    case 1:
        return 1;
    case /*2*/
}
declare const f2: 'foo' | 'bar' | 'baz';
switch (f2) {
    case 'bar':
        return 1;
    case '/*3*/'
}
// repro from #52874
declare let x: "foo" | "bar";
switch (x) {
    case ('/*4*/')
}`,
			},
			expectedResult: map[string]*testCaseResult{
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "B",
								Kind:     enumMemberKind,
								SortText: sortTextLocationPriority,

								FilterText: ptrTo(".B"),
								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									InsertReplaceEdit: &lsproto.InsertReplaceEdit{
										NewText: "B",
										Insert: lsproto.Range{
											Start: lsproto.Position{Line: 5, Character: 11},
											End:   lsproto.Position{Line: 5, Character: 11},
										},
										Replace: lsproto.Range{
											Start: lsproto.Position{Line: 5, Character: 11},
											End:   lsproto.Position{Line: 5, Character: 11},
										},
									},
								},
							},
						},
					},
					isIncludes: true,
					excludes:   []string{"A"},
				},
				"2": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:            "2",
								Kind:             constantKind,
								SortText:         sortTextLocationPriority,
								CommitCharacters: &[]string{},
							},
							{
								Label:            "3",
								Kind:             constantKind,
								SortText:         sortTextLocationPriority,
								CommitCharacters: &[]string{},
							},
						},
					},
					isIncludes: true,
					excludes:   []string{"1"},
				},
				"3": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "foo",
								Kind:     constantKind,
								SortText: sortTextLocationPriority,
								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									TextEdit: &lsproto.TextEdit{
										NewText: "foo",
										Range: lsproto.Range{
											Start: lsproto.Position{Line: 17, Character: 10},
											End:   lsproto.Position{Line: 17, Character: 10},
										},
									},
								},
							},
							{
								Label:    "baz",
								Kind:     constantKind,
								SortText: sortTextLocationPriority,
								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									TextEdit: &lsproto.TextEdit{
										NewText: "baz",
										Range: lsproto.Range{
											Start: lsproto.Position{Line: 17, Character: 10},
											End:   lsproto.Position{Line: 17, Character: 10},
										},
									},
								},
							},
						},
					},
					isIncludes: true,
					excludes:   []string{"bar"},
				},
				"4": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "foo",
								Kind:     constantKind,
								SortText: sortTextLocationPriority,
								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									TextEdit: &lsproto.TextEdit{
										NewText: "foo",
										Range: lsproto.Range{
											Start: lsproto.Position{Line: 22, Character: 11},
											End:   lsproto.Position{Line: 22, Character: 11},
										},
									},
								},
							},
							{
								Label:    "bar",
								Kind:     constantKind,
								SortText: sortTextLocationPriority,
								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									TextEdit: &lsproto.TextEdit{
										NewText: "bar",
										Range: lsproto.Range{
											Start: lsproto.Position{Line: 22, Character: 11},
											End:   lsproto.Position{Line: 22, Character: 11},
										},
									},
								},
							},
						},
					},
					isIncludes: true,
				},
			},
		},
		{
			name: "completionForQuotedPropertyInPropertyAssignment1",
			files: map[string]string{
				defaultMainFileName: `export interface Configfiles {
  jspm: string;
  'jspm:browser': string;
}

let files: Configfiles;
files = {
   /*0*/: '',
   '/*1*/': ''
}`,
			},
			expectedResult: map[string]*testCaseResult{
				"0": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    `"jspm:browser"`,
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
							{
								Label:    "jspm",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
							},
						},
					},
				},
				"1": {
					list: &lsproto.CompletionList{
						IsIncomplete: false,
						ItemDefaults: itemDefaults,
						Items: []*lsproto.CompletionItem{
							{
								Label:    "jspm",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									TextEdit: &lsproto.TextEdit{
										NewText: "jspm",
										Range: lsproto.Range{
											Start: lsproto.Position{Line: 8, Character: 4},
											End:   lsproto.Position{Line: 8, Character: 4},
										},
									},
								},
							},
							{
								Label:    "jspm:browser",
								Kind:     fieldKind,
								SortText: sortTextLocationPriority,
								TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
									TextEdit: &lsproto.TextEdit{
										NewText: "jspm:browser",
										Range: lsproto.Range{
											Start: lsproto.Position{Line: 8, Character: 4},
											End:   lsproto.Position{Line: 8, Character: 4},
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}
	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()
			runTest(t, testCase.files, testCase.expectedResult, testCase.mainFileName)
		})
	}
}

func runTest(t *testing.T, files map[string]string, expected map[string]*testCaseResult, mainFileName string) {
	if mainFileName == "" {
		mainFileName = defaultMainFileName
	}
	parsedFiles := make(map[string]any)
	parsedFiles[defaultTsconfigFileName] = `{}`
	var markerPositions map[string]*lstestutil.Marker
	for fileName, content := range files {
		if fileName == mainFileName {
			testData := lstestutil.ParseTestData("", content, fileName)
			markerPositions = testData.MarkerPositions
			parsedFiles[fileName] = testData.Files[0].Content // !!! Assumes no usage of @filename, markers only on main file
		} else {
			parsedFiles[fileName] = content
		}
	}
	ctx := projecttestutil.WithRequestID(t.Context())
	languageService, done := createLanguageService(ctx, mainFileName, parsedFiles)
	defer done()
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
		completionList, err := languageService.ProvideCompletion(
			ctx,
			ls.FileNameToDocumentURI(mainFileName),
			marker.LSPosition,
			context,
			capabilities,
			preferences)
		assert.NilError(t, err)
		if expectedResult.isIncludes {
			assertIncludesItem(t, completionList, expectedResult.list)
		} else {
			assert.DeepEqual(t, completionList, expectedResult.list)
		}
		for _, excludedLabel := range expectedResult.excludes {
			for _, item := range completionList.Items {
				if item.Label == excludedLabel {
					t.Fatalf("Label %s should not be included in completion list", excludedLabel)
				}
			}
		}
	}
}

func assertIncludesItem(t *testing.T, actual *lsproto.CompletionList, expected *lsproto.CompletionList) bool {
	assert.DeepEqual(t, actual, expected, cmpopts.IgnoreFields(lsproto.CompletionList{}, "Items"))
	for _, item := range expected.Items {
		index := slices.IndexFunc(actual.Items, func(actualItem *lsproto.CompletionItem) bool {
			return actualItem.Label == item.Label
		})
		if index == -1 {
			t.Fatalf("Label %s not found in actual items. Actual items: %v", item.Label, actual.Items)
		}
		assert.DeepEqual(t, actual.Items[index], item)
	}
	return false
}

func createLanguageService(ctx context.Context, fileName string, files map[string]any) (*ls.LanguageService, func()) {
	projectService, _ := projecttestutil.Setup(files)
	projectService.OpenFile(fileName, files[fileName].(string), core.ScriptKindTS, "")
	project := projectService.Projects()[0]
	return project.GetLanguageServiceForRequest(ctx)
}

func ptrTo[T any](v T) *T {
	return &v
}
