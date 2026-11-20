package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionForStringLiteralRelativeImport4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @rootDirs: /sub/src1,/src2
// @Filename: /src2/test0.ts
 import * as foo1 from "./mo/*import_as0*/
 import foo2 = require("./mo/*import_equals0*/
 var foo3 = require("./mo/*require0*/
// @Filename: /src2/inner/inner0.ts
import * as s from ".//*inner*/";
// @Filename: /src2/inner/inner1.ts
export const x = 0;
// @Filename: /src2/module0.ts
 export var w = 0;
// @Filename: /sub/src1/module1.ts
 export var x = 0;
// @Filename: /sub/src1/module2.ts
 export var y = 0;
// @Filename: /sub/src1/more/module3.ts
 export var z = 0;
// @Filename: f1.ts

// @Filename: f2.tsx

// @Filename: folder/f1.ts

// @Filename: f3.js

// @Filename: f4.jsx

// @Filename: e1.ts

// @Filename: e2.js
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, []string{"import_as0", "import_equals0", "require0"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"module1",
				"module2",
				"more",
				"module0",
				"inner",
			},
		},
	})
	f.VerifyCompletions(t, "inner", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"inner1",
			},
		},
	})
}

func TestPathCompletionEscaping(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/main.ts
import "./[|a/*double*/|]";
import './[|a/*single*/|]';
// @Filename: /src/a"b.ts
export {};
// @Filename: /src/a'b.ts
export {};
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	for i, test := range []struct {
		marker     string
		label      string
		insertText string
		newText    string
	}{
		{"double", `a"b`, `a\"b`, `a\"b`},
		{"single", `a'b`, `a\'b`, `a\'b`},
	} {
		item := &lsproto.CompletionItem{
			Label:  test.label,
			Detail: new(test.label + ".ts"),
			TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
				TextEdit: &lsproto.TextEdit{NewText: test.newText, Range: f.Ranges()[i].LSRange},
			},
		}
		if test.insertText != "" {
			item.InsertText = &test.insertText
		}
		f.VerifyCompletions(t, test.marker, &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &[]string{},
				EditRange:        Ignored,
			},
			Items: &fourslash.CompletionsExpectedItems{Includes: []fourslash.CompletionsExpectedItem{item}},
		})
	}
}

func TestPathCompletionEscapedDirectory(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/main.ts
import "./a\"b/c/*escaped*/";
import "./\u0061\x2fc/*escapedSeparator*/";
// @Filename: /src/a"b/cd.ts
export {};
// @Filename: /src/a/cd.ts
export {};
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	for _, test := range []struct {
		marker string
		// Character offset of the replaced text; the "c" is at 15 and 20 respectively.
		character uint32
	}{
		{"escaped", 15},
		{"escapedSeparator", 20},
	} {
		line := f.MarkerByName(t, test.marker).LSPos().Line
		f.VerifyCompletions(t, test.marker, &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &[]string{},
				EditRange:        Ignored,
			},
			Items: &fourslash.CompletionsExpectedItems{
				Includes: []fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:  "cd",
						Detail: new("cd.ts"),
						TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
							TextEdit: &lsproto.TextEdit{
								NewText: "cd",
								Range: lsproto.Range{
									Start: lsproto.Position{Line: line, Character: test.character},
									End:   lsproto.Position{Line: line, Character: test.character + 1},
								},
							},
						},
					},
				},
			},
		})
	}
}

func TestTripleSlashReferenceCompletionQuotes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/main.ts
/// <reference path="./a/*reference*/" />
// @Filename: /src/a"b.ts
export {};
// @Filename: /src/a'b.ts
export {};
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "reference", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"a'b.ts", `a"b.ts`},
		},
	})
}
