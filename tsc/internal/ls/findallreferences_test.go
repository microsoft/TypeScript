package ls_test

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func runFindReferencesTest(t *testing.T, input string, expectedLocations map[string]*collections.Set[string]) {
	testData := fourslash.ParseTestData(t, input, "/file1.ts")
	markerPositions := testData.MarkerPositions
	ctx := projecttestutil.WithRequestID(t.Context())
	service, done := createLanguageService(ctx, testData.Files[0].FileName(), map[string]string{
		testData.Files[0].FileName(): testData.Files[0].Content,
	})
	defer done()

	// for each marker location, calculate the expected ref location ahead of time so we don't have to re-calculate each location for every reference call
	allExpectedLocations := map[lsproto.Location]string{}
	for _, expectedRange := range testData.Ranges {
		allExpectedLocations[*service.GetExpectedReferenceFromMarker(expectedRange.FileName(), expectedRange.Position)] = *expectedRange.Name
	}

	for requestMarkerName, expectedSet := range expectedLocations {
		marker, ok := markerPositions[requestMarkerName]
		if !ok {
			t.Fatalf("No marker found for '%s'", requestMarkerName)
		}

		referencesResult := service.TestProvideReferences(marker.FileName(), marker.Position)
		libReference := 0

		for _, loc := range referencesResult {
			if name, ok := allExpectedLocations[loc]; ok {
				// check if returned ref location is in this request's expected set
				assert.Assert(t, expectedSet.Has(name), "Reference to '%s' not expected when find all references requested at %s", name, requestMarkerName)
			} else if strings.Contains(string(loc.Uri), "//bundled") && strings.Contains(string(loc.Uri), "//libs") {
				libReference += 1
			} else {
				t.Fatalf("Found reference at loc '%v' when find all references triggered at '%s'", loc, requestMarkerName)
			}
		}
		expectedNum := expectedSet.Len() + libReference
		assert.Assert(t, len(referencesResult) == expectedNum, "assertion failed: expected %d references at marker %s, got %d", expectedNum, requestMarkerName, len(referencesResult))
	}
}

func TestFindReferences(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		title             string
		input             string
		expectedLocations map[string]*collections.Set[string]
	}{
		{
			title: "getOccurencesIsDefinitionOfParameter",
			input: `function f([|/*1*/x|]: number) {
	return [|/*2*/x|] + 1
}`,
			expectedLocations: map[string]*collections.Set[string]{
				"1": collections.NewSetFromItems("1", "2"),
				"2": collections.NewSetFromItems("1", "2"),
			},
		},
		{
			title: "findAllRefsUnresolvedSymbols1",
			input: `let a: [|/*a0*/Bar|];
let b: [|/*a1*/Bar|]<string>;
let c: [|/*a2*/Bar|]<string, number>;
let d: [|/*b0*/Bar|].[|/*c0*/X|];
let e: [|/*b1*/Bar|].[|/*c1*/X|]<string>;
let f: [|/*b2*/Bar|].[|/*d0*/X|].[|/*e0*/Y|];`,
			expectedLocations: map[string]*collections.Set[string]{
				"a0": collections.NewSetFromItems("a0", "a1", "a2"),
				"a1": collections.NewSetFromItems("a0", "a1", "a2"),
				"a2": collections.NewSetFromItems("a0", "a1", "a2"),
				"b0": collections.NewSetFromItems("b0", "b1", "b2"),
				"b1": collections.NewSetFromItems("b0", "b1", "b2"),
				"b2": collections.NewSetFromItems("b0", "b1", "b2"),
				"c0": collections.NewSetFromItems("c0", "c1"),
				"c1": collections.NewSetFromItems("c0", "c1"),
				"d0": collections.NewSetFromItems("d0"),
				"e0": collections.NewSetFromItems("e0"),
			},
		},
		{
			title: "findAllRefsPrimitive partial-",
			input: `const x: [|/*1*/any|] = 0;
const any = 2;
const y: [|/*2*/any|] = any;
function f(b: [|/*3*/boolean|]): [|/*4*/boolean|];
type T = [|/*5*/never|]; type U = [|/*6*/never|];
function n(x: [|/*7*/number|]): [|/*8*/number|];
function o(x: [|/*9*/object|]): [|/*10*/object|];
function s(x: [|/*11*/string|]): [|/*12*/string|];
function sy(s: [|/*13*/symbol|]): [|/*14*/symbol|];
function v(v: [|/*15*/void|]): [|/*16*/void|];
`,
			expectedLocations: map[string]*collections.Set[string]{
				"1":  collections.NewSetFromItems("1", "2"),
				"2":  collections.NewSetFromItems("1", "2"),
				"3":  collections.NewSetFromItems("3", "4"),
				"4":  collections.NewSetFromItems("3", "4"),
				"5":  collections.NewSetFromItems("5", "6"),
				"6":  collections.NewSetFromItems("5", "6"),
				"7":  collections.NewSetFromItems("7", "8"),
				"8":  collections.NewSetFromItems("7", "8"),
				"9":  collections.NewSetFromItems("9", "10"),
				"10": collections.NewSetFromItems("9", "10"),
				"11": collections.NewSetFromItems("11", "12"),
				"12": collections.NewSetFromItems("11", "12"),
				"13": collections.NewSetFromItems("13", "14"),
				"14": collections.NewSetFromItems("13", "14"),
				"15": collections.NewSetFromItems("15", "16"),
				"16": collections.NewSetFromItems("15", "16"),
			},
		},
		{
			title: "findAllReferencesDynamicImport1 Partial",
			input: `export function foo() { return "foo"; }
[|/*1*/import([|"/*2*/./foo"|])|]
[|/*3*/var x = import([|"/*4*/./foo"|])|]`,
			expectedLocations: map[string]*collections.Set[string]{
				"1": {},
			},
		},
		{
			title: "findAllRefsForDefaultExport02 partial",
			input: `[|/*1*/export default function [|/*2*/DefaultExportedFunction|]() {
   return [|/*3*/DefaultExportedFunction|];
}|]

var x: typeof [|/*4*/DefaultExportedFunction|];

var y = [|/*5*/DefaultExportedFunction|]();

[|/*6*/namespace [|/*7*/DefaultExportedFunction|] {
}|]`,
			expectedLocations: map[string]*collections.Set[string]{
				"2": collections.NewSetFromItems("2", "3", "4", "5"),
				"3": collections.NewSetFromItems("2", "3", "4", "5"),
				"4": collections.NewSetFromItems("2", "3", "4", "5"),
				"5": collections.NewSetFromItems("2", "3", "4", "5"),
				"7": collections.NewSetFromItems("7"),
			},
		},
		{
			title: "findAllReferPropertyAccessExpressionHeritageClause",
			input: `class B {}
function foo() {
    return {[|/*1*/B|]: B};
}
class C extends (foo()).[|/*2*/B|] {}
class C1 extends foo().[|/*3*/B|] {}`,
			expectedLocations: map[string]*collections.Set[string]{
				"1": collections.NewSetFromItems("1", "2", "3"),
				"2": collections.NewSetFromItems("1", "2", "3"),
				"3": collections.NewSetFromItems("1", "2", "3"),
			},
		},
		{
			title: "findAllRefsForFunctionExpression01 partial-",
			input: `var foo = [|/*1*/function [|/*2*/foo|](a = [|/*3*/foo|](), b = () => [|/*4*/foo|]) {
   [|/*5*/foo|]([|/*6*/foo|], [|/*7*/foo|]);
}|]`,
			expectedLocations: map[string]*collections.Set[string]{
				"2": collections.NewSetFromItems("2", "3", "4", "5", "6", "7"),
				"3": collections.NewSetFromItems("2", "3", "4", "5", "6", "7"),
				"4": collections.NewSetFromItems("2", "3", "4", "5", "6", "7"),
				"5": collections.NewSetFromItems("2", "3", "4", "5", "6", "7"),
				"6": collections.NewSetFromItems("2", "3", "4", "5", "6", "7"),
				"7": collections.NewSetFromItems("2", "3", "4", "5", "6", "7"),
			},
		},
		{
			title: "findAllRefsForObjectSpread-",
			input: `interface A1 { readonly [|/*0*/a|]: string };
interface A2 { [|/*1*/a|]?: number };
let a1: A1;
let a2: A2;
let a12 = { ...a1, ...a2 };
a12.[|/*2*/a|];
a1.[|/*3*/a|];`,
			expectedLocations: map[string]*collections.Set[string]{
				"0": collections.NewSetFromItems("0", "2", "3"),
				"1": collections.NewSetFromItems("1", "2"),
				"2": collections.NewSetFromItems("0", "1", "2", "3"),
				"3": collections.NewSetFromItems("0", "2", "3"),
			},
		},
		{
			title: "findAllRefsForObjectLiteralProperties-",
			input: `var x = {
   [|/*1*/property|]: {}
};

x.[|/*2*/property|];

[|/*3*/let {[|/*4*/property|]: pVar} = x;|]`,
			expectedLocations: map[string]*collections.Set[string]{
				"1": collections.NewSetFromItems("1", "2", "4"),
				"2": collections.NewSetFromItems("1", "2", "4"),
				"4": collections.NewSetFromItems("1", "2", "4"),
			},
		},
		{
			title: "findAllRefsImportEquals-",
			input: `import j = N.[|/*0*/q|];
namespace N { export const [|/*1*/q|] = 0; }`,
			expectedLocations: map[string]*collections.Set[string]{
				// "0": collections.NewSetFromItems("0", "1"),
			},
		},
		{
			title: "findAllRefsForRest",
			input: `interface Gen {
x: number
[|/*0*/parent|]: Gen;
millennial: string;
}
let t: Gen;
var { x, ...rest } = t;
rest.[|/*1*/parent|];`,
			expectedLocations: map[string]*collections.Set[string]{
				"0": collections.NewSetFromItems("0", "1"),
				"1": collections.NewSetFromItems("0", "1"),
			},
		},
		{
			title: "findAllRefsForVariableInExtendsClause01 -",
			input: `[|/*1*/var [|/*2*/Base|] = class { };|]
class C extends [|/*3*/Base|] { }`,
			expectedLocations: map[string]*collections.Set[string]{
				"2": collections.NewSetFromItems("2", "3"),
				"3": collections.NewSetFromItems("2", "3"),
			},
		},
		{
			title: "findAllRefsTrivia",
			input: `export interface A {
    /** Comment */
    [|/*m1*/method|](): string;
    /** Comment */
    [|/*m2*/method|](format: string): string;
}`,
			expectedLocations: map[string]*collections.Set[string]{
				"m1": collections.NewSetFromItems("m1", "m2"),
				"m2": collections.NewSetFromItems("m1", "m2"),
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.title, func(t *testing.T) {
			t.Parallel()
			runFindReferencesTest(t, testCase.input, testCase.expectedLocations)
		})
	}
}
