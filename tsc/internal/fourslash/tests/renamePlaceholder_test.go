package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRenamePlaceholder(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name         string
		content      string
		placeholders []string
	}{
		{
			name: "quoted and computed properties",
			content: `const obj = {
    [|a|]: 1,
    '[|b|]': 1,
    ['[|c|]']: 1,
};
obj.[|a|];
obj['[|a|]'];
obj.[|b|];
obj.[|c|];`,
			placeholders: []string{"a", "b", "c", "a", "a", "b", "c"},
		},
		{
			name: "double quotes and templates",
			content: "const obj = { \"[|b|]\": 1, [`[|c|]`]: 1 };\n" +
				"obj[\"[|b|]\"]; obj[`[|c|]`]; obj.[|b|]; obj.[|c|];",
			placeholders: []string{"b", "c", "b", "c", "b", "c"},
		},
		{
			name: "escaped and unicode properties",
			content: `const obj = { '[|\u0062|]': 1, ['[|𐐀|]']: 2 };
obj.[|b|]; obj['[|\u0062|]']; obj.[|𐐀|]; obj['[|𐐀|]'];`,
			placeholders: []string{"b", "𐐀", "b", "b", "𐐀", "𐐀"},
		},
		{
			name:         "private identifiers",
			content:      `class C { [|#foo|] = 1; method() { return this.[|#foo|]; } }`,
			placeholders: []string{"#foo", "#foo"},
		},
		{
			name:         "numeric properties",
			content:      `const obj = { [|0|]: 1, [[|1|]]: 2 }; obj[[|0|]]; obj[[|1|]];`,
			placeholders: []string{"0", "1", "0", "1"},
		},
		{
			name: "import aliases",
			content: `// @Filename: /a.ts
export const original = 1;
// @Filename: /b.ts
import { original as [|local|] } from "./a";
[|local|];`,
			placeholders: []string{"local", "local"},
		},
		{
			name:         "named default export",
			content:      `export default class [|C|] {} const obj = new [|C|]();`,
			placeholders: []string{"C", "C"},
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, test.content)
			defer done()
			for i, r := range f.Ranges() {
				f.GoToRangeStart(t, r)
				f.VerifyRenameRange(t, r.LSRange, test.placeholders[i], nil /*preferences*/)
			}
		})
	}
}

func TestRenamePlaceholderEdits(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name     string
		content  string
		expected string
	}{
		{"b", "const obj = { 'b': 1 };\nobj.[|/*rename*/b|];", "const obj = { 'b1': 1 };\nobj.b1;"},
		{"c", "const obj = { ['c']: 1 };\nobj.[|/*rename*/c|];", "const obj = { ['c1']: 1 };\nobj.c1;"},
	} {
		t.Run(test.name, func(t *testing.T) {
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, "// @Filename: /a.ts\n"+test.content)
			defer done()
			f.GoToMarker(t, "rename")
			f.VerifyRenameRange(t, f.Ranges()[0].LSRange, test.name, nil /*preferences*/)
			f.VerifyRename(t, "rename", test.name+"1", map[string]string{
				"/a.ts": test.expected,
			})
		})
	}
}
