package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNumericLiteralCompletionsFromReducedUnion(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @target: esnext
declare let numeric: 1 | 2 | number;
numeric = /*numeric*/;
declare let big: 1n | 2n | bigint;
big = /*big*/;
declare let legacyNumeric: 1 | 2 | (number & {});
legacyNumeric = /*legacyNumeric*/;
declare let legacyBig: 1n | 2n | (bigint & {});
legacyBig = /*legacyBig*/;
type Numeric = 1 | number;
declare let merged: Numeric | 2 | number | undefined;
merged = /*merged*/;
declare let plainNumber: number;
plainNumber = /*plainNumber*/;
declare let plainBigint: bigint;
plainBigint = /*plainBigint*/;`
	f, done := fourslash.NewFourslash(t, nil, content)
	defer done()
	for _, test := range []struct {
		markers  []string
		includes []fourslash.CompletionsExpectedItem
		excludes []string
	}{
		{[]string{"numeric", "legacyNumeric", "merged"}, []fourslash.CompletionsExpectedItem{"1", "2"}, []string{"1n", "2n"}},
		{[]string{"big", "legacyBig"}, []fourslash.CompletionsExpectedItem{"1n", "2n"}, []string{"1", "2"}},
		{[]string{"plainNumber", "plainBigint"}, nil, []string{"1", "2", "1n", "2n"}},
	} {
		f.VerifyCompletions(t, test.markers, &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &DefaultCommitCharacters,
				EditRange:        Ignored,
			},
			Items: &fourslash.CompletionsExpectedItems{
				Includes: test.includes,
				Excludes: test.excludes,
			},
		})
	}
}
