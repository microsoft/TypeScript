package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoNumericLiteralOrigin(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @target: esnext
declare let numeric/*numeric*/: 1 | 2 | number;
declare let big/*big*/: 1n | 2n | bigint;
declare let legacyNumeric/*legacyNumeric*/: 1 | 2 | (number & {});
declare let legacyBig/*legacyBig*/: 1n | 2n | (bigint & {});
type Numeric = 1 | number;
type Big = 1n | bigint;
declare let merged/*merged*/: Numeric | 2 | number;
declare let mergedBig/*mergedBig*/: Big | 2n | bigint;
declare let plainNumber/*plainNumber*/: number;
declare let plainBigint/*plainBigint*/: bigint;
declare let unrelated/*unrelated*/: number | 1n;
if (numeric === 1) numeric/*narrowed*/;
if (big === 1n) big/*narrowedBig*/;`
	f, done := fourslash.NewFourslash(t, nil, content)
	defer done()
	f.VerifyQuickInfoAt(t, "numeric", "let numeric: number (origin: number | 1 | 2)", "")
	f.VerifyQuickInfoAt(t, "big", "let big: bigint (origin: bigint | 1n | 2n)", "")
	f.VerifyQuickInfoAt(t, "legacyNumeric", "let legacyNumeric: number (origin: number | 1 | 2)", "")
	f.VerifyQuickInfoAt(t, "legacyBig", "let legacyBig: bigint (origin: bigint | 1n | 2n)", "")
	f.VerifyQuickInfoAt(t, "merged", "let merged: number (origin: number | 1 | 2)", "")
	f.VerifyQuickInfoAt(t, "mergedBig", "let mergedBig: bigint (origin: bigint | 1n | 2n)", "")
	f.VerifyQuickInfoAt(t, "plainNumber", "let plainNumber: number", "")
	f.VerifyQuickInfoAt(t, "plainBigint", "let plainBigint: bigint", "")
	f.VerifyQuickInfoAt(t, "unrelated", "let unrelated: number | 1n", "")
	f.VerifyQuickInfoAt(t, "narrowed", "let numeric: 1", "")
	f.VerifyQuickInfoAt(t, "narrowedBig", "let big: 1n", "")
}
