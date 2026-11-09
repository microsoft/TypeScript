package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestFoldingRangeLineFoldingOnly(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `if (EMPTY_TAGs.has(tag)) {
  output += "/>";
} else {
  output += ">";

  if (!html && kidcount > 0) {
    //
  }
}

export function use<T>(ctx: any): T | undefined {
  //
}`
	ptrTrue := true
	capabilities := &lsproto.ClientCapabilities{
		TextDocument: &lsproto.TextDocumentClientCapabilities{
			FoldingRange: &lsproto.FoldingRangeClientCapabilities{
				LineFoldingOnly: &ptrTrue,
				FoldingRange: &lsproto.ClientFoldingRangeOptions{
					CollapsedText: &ptrTrue,
				},
			},
		},
	}
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()

	// With lineFoldingOnly, closing lines are included unless followed by non-trivia on the same line.
	// Line 0: if (EMPTY_TAGs.has(tag)) {
	// Line 1:   output += "/>";
	// Line 2: } else {
	// Line 3:   output += ">";
	// Line 4:
	// Line 5:   if (!html && kidcount > 0) {
	// Line 6:     //
	// Line 7:   }
	// Line 8: }
	// Line 9:
	// Line 10: export function use<T>(ctx: any): T | undefined {
	// Line 11:   //
	// Line 12: }
	f.VerifyFoldingRangeLines(t, []fourslash.FoldingRangeLineExpected{
		{StartLine: 0, EndLine: 1},   // if block: keep the trailing else visible
		{StartLine: 2, EndLine: 8},   // else block: closing line included
		{StartLine: 5, EndLine: 7},   // inner if block: closing line included
		{StartLine: 10, EndLine: 12}, // function: closing line at EOF included
	})
}

func TestFoldingRangeLineFoldingOnlyWithRegions(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// #region MyRegion
const x = 1;
function foo() {
  return x;
}
// #endregion

// #region Outer
const y = 2;
// #region Inner
const z = 3;
// #endregion
// #endregion`
	ptrTrue := true
	capabilities := &lsproto.ClientCapabilities{
		TextDocument: &lsproto.TextDocumentClientCapabilities{
			FoldingRange: &lsproto.FoldingRangeClientCapabilities{
				LineFoldingOnly: &ptrTrue,
				FoldingRange: &lsproto.ClientFoldingRangeOptions{
					CollapsedText: &ptrTrue,
				},
			},
		},
	}
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()

	// Line 0: // #region MyRegion
	// Line 1: const x = 1;
	// Line 2: function foo() {
	// Line 3:   return x;
	// Line 4: }
	// Line 5: // #endregion
	// Line 6:
	// Line 7: // #region Outer
	// Line 8: const y = 2;
	// Line 9: // #region Inner
	// Line 10: const z = 3;
	// Line 11: // #endregion
	// Line 12: // #endregion
	f.VerifyFoldingRangeLines(t, []fourslash.FoldingRangeLineExpected{
		{StartLine: 0, EndLine: 5},  // #region MyRegion: NOT adjusted (ends with "n", not a closing pair)
		{StartLine: 2, EndLine: 4},  // function foo() block: closing line included
		{StartLine: 7, EndLine: 12}, // #region Outer: NOT adjusted
		{StartLine: 9, EndLine: 11}, // #region Inner: NOT adjusted
	})
}

func TestFoldingRangeTerminatingLine(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `if (Math.random()) {

}
else if (Math.random()) {

}

if (Math.random()) {

} else if (Math.random()) {

}

if (Math.random()) {

} /*strange, but valid*/ console.log("hi there what're you doin' on this line?")

if (Math.random()) {

}
/* Normal - this is totally normal code! That is why I am saying so! */
console.log("Hello world!");

if (Math.random()) {

};

if (Math.random()) {

} // finally out of that ` + "`if`" + `

if (Math.random()) {

console.log("Jumping into the last carriage!") }

if (Math.random()) {

}`
	for _, test := range []struct {
		lineFoldingOnly bool
		expected        []fourslash.FoldingRangeLineExpected
	}{
		{
			expected: []fourslash.FoldingRangeLineExpected{
				{StartLine: 0, EndLine: 2},   // else on following line: if block
				{StartLine: 3, EndLine: 5},   // else on following line: else-if block
				{StartLine: 7, EndLine: 9},   // else on same line: if block
				{StartLine: 9, EndLine: 11},  // else on same line: else-if block
				{StartLine: 13, EndLine: 15}, // statement on same line
				{StartLine: 17, EndLine: 19}, // contents on following lines: if block
				{StartLine: 20, EndLine: 20}, // contents on following lines: block comment
				{StartLine: 23, EndLine: 25}, // empty statement on same line
				{StartLine: 27, EndLine: 29}, // comment on same line
				{StartLine: 31, EndLine: 33}, // statement before closing brace
				{StartLine: 35, EndLine: 37}, // end-of-file on same line
			},
		},
		{
			lineFoldingOnly: true,
			expected: []fourslash.FoldingRangeLineExpected{
				{StartLine: 0, EndLine: 2},   // else on following line: if block
				{StartLine: 3, EndLine: 5},   // else on following line: else-if block
				{StartLine: 7, EndLine: 8},   // else on same line: if block
				{StartLine: 9, EndLine: 11},  // else on same line: else-if block
				{StartLine: 13, EndLine: 14}, // statement on same line
				{StartLine: 17, EndLine: 19}, // contents on following lines: if block
				{StartLine: 20, EndLine: 20}, // contents on following lines: block comment
				{StartLine: 23, EndLine: 24}, // empty statement on same line
				{StartLine: 27, EndLine: 28}, // comment on same line
				{StartLine: 31, EndLine: 33}, // statement before closing brace
				{StartLine: 35, EndLine: 37}, // end-of-file on same line
			},
		},
	} {
		capabilities := &lsproto.ClientCapabilities{
			TextDocument: &lsproto.TextDocumentClientCapabilities{
				FoldingRange: &lsproto.FoldingRangeClientCapabilities{
					LineFoldingOnly: &test.lineFoldingOnly,
				},
			},
		}
		f, done := fourslash.NewFourslash(t, capabilities, content)
		defer done()
		f.VerifyFoldingRangeLines(t, test.expected)
	}
}

func TestFoldingRangeLineFoldingOnlyWithTrailingJSXText(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @Filename: /a.tsx
<main>
    <div>
        Hello
    </div> // Keep me visible
</main>`
	ptrTrue := true
	capabilities := &lsproto.ClientCapabilities{
		TextDocument: &lsproto.TextDocumentClientCapabilities{
			FoldingRange: &lsproto.FoldingRangeClientCapabilities{
				LineFoldingOnly: &ptrTrue,
			},
		},
	}
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()

	f.VerifyFoldingRangeLines(t, []fourslash.FoldingRangeLineExpected{
		{StartLine: 0, EndLine: 4},
		{StartLine: 1, EndLine: 2},
	})
}

func TestFoldingRangeLineFoldingOnlyWithUnmappedTrailingMarkup(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The mapper produces this virtual TypeScript:
	//
	//   function f() {
	//       const value = 1;
	//   }
	//   function __render() {
	//   }
	//   export default {};
	//
	content := `// @Filename: /tsconfig.json
{
    "compilerOptions": { "strict": true },
    "contentMappers": [
        { "package": "mapper", "extensions": [".component"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
` + contentmappertest.PackageJSON(contentmappertest.ComponentMapper) + `

// @Filename: /app.component
<script>function f() {
    const value = 1;
}</script><div>Keep me visible</div>
`
	ptrTrue := true
	f, done := fourslash.NewFourslashWithOptions(t, content, &fourslash.FourslashOptions{
		Capabilities: &lsproto.ClientCapabilities{
			TextDocument: &lsproto.TextDocumentClientCapabilities{
				FoldingRange: &lsproto.FoldingRangeClientCapabilities{
					LineFoldingOnly: &ptrTrue,
				},
			},
		},
		ContentMapperSpawner: contentmappertest.NewSpawner(),
		RunExternalCode:      true,
	})
	defer done()

	f.GoToFile(t, "/app.component")
	f.VerifyFoldingRangeLines(t, []fourslash.FoldingRangeLineExpected{
		{StartLine: 0, EndLine: 1}, // keep trailing host markup on line 2 visible
	})
}
