package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
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

	// With lineFoldingOnly, end lines should be adjusted so closing brackets stay visible.
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
		{StartLine: 0, EndLine: 1},   // if block: end adjusted from line 2 to 1
		{StartLine: 2, EndLine: 7},   // else block: end adjusted from line 8 to 7
		{StartLine: 5, EndLine: 6},   // inner if block: end adjusted from line 7 to 6
		{StartLine: 10, EndLine: 11}, // function: end adjusted from line 12 to 11
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
		{StartLine: 2, EndLine: 3},  // function foo() block: end adjusted from line 4 to 3
		{StartLine: 7, EndLine: 12}, // #region Outer: NOT adjusted
		{StartLine: 9, EndLine: 11}, // #region Inner: NOT adjusted
	})
}
