package semver

import (
	"fmt"
	"strings"
	"testing"

	"gotest.tools/v3/assert"
)

func TestWildcardsHaveSameString(t *testing.T) {
	t.Parallel()
	majorWildcardStrings := []string{
		"",
		"*",
		"*.*",
		"*.*.*",
		"x",
		"x.x",
		"x.x.x",
		"X",
		"X.X",
		"X.X.X",
	}

	minorWildcardStrings := []string{
		"1",
		"1.*",
		"1.*.*",
		"1.x",
		"1.x.x",
		"1.X",
		"1.X.X",
	}

	patchWildcardStrings := []string{
		"1.2",
		"1.2.*",
		"1.2.x",
		"1.2.X",
	}

	mixedCaseWildcardStrings := []string{
		"x",
		"X",
		"*",
		"x.X.x",
		"X.x.*",
	}

	assertAllVersionRangesHaveIdenticalStrings(t, "majorWildcardStrings", majorWildcardStrings)
	assertAllVersionRangesHaveIdenticalStrings(t, "minorWildcardStrings", minorWildcardStrings)
	assertAllVersionRangesHaveIdenticalStrings(t, "patchWildcardStrings", patchWildcardStrings)
	assertAllVersionRangesHaveIdenticalStrings(t, "mixedCaseWildcardStrings", mixedCaseWildcardStrings)
}

func assertAllVersionRangesHaveIdenticalStrings(t *testing.T, name string, strs []string) {
	t.Run(name, func(t *testing.T) {
		t.Parallel()
		for _, s1 := range strs {
			for _, s2 := range strs {
				t.Run(s1+" == "+s2, func(t *testing.T) {
					v1, ok := TryParseVersionRange(s1)
					assert.Assert(t, ok)
					v2, ok := TryParseVersionRange(s2)
					assert.Assert(t, ok)
					assert.DeepEqual(t, v1.String(), v2.String())
				})
			}
		}
	})
}

type testGoodBad struct {
	good []string
	bad  []string
}

func TestVersionRanges(t *testing.T) {
	t.Parallel()
	assertRangesGoodBad(t, "1", testGoodBad{
		good: []string{"1.0.0", "1.9.9", "1.0.0-pre", "1.0.0+build"},
		bad:  []string{"0.0.0", "2.0.0", "0.0.0-pre", "0.0.0+build"},
	})
	assertRangesGoodBad(t, "1.2", testGoodBad{
		good: []string{"1.2.0", "1.2.9", "1.2.0-pre", "1.2.0+build"},
		bad:  []string{"1.1.0", "1.3.0", "1.1.0-pre", "1.1.0+build"},
	})

	assertRangesGoodBad(t, "1.2.3", testGoodBad{
		good: []string{"1.2.3", "1.2.3+build"},
		bad:  []string{"1.2.2", "1.2.4", "1.2.2-pre", "1.2.2+build", "1.2.3-pre"},
	})

	assertRangesGoodBad(t, "1.2.3-pre", testGoodBad{
		good: []string{"1.2.3-pre", "1.2.3-pre+build.stuff"},
		bad:  []string{"1.2.3", "1.2.3-pre.0", "1.2.3-pre.9", "1.2.3-pre.0+build", "1.2.3-pre.9+build", "1.2.3+build", "1.2.4"},
	})

	assertRangesGoodBad(t, "<3.8.0", testGoodBad{
		good: []string{"3.6", "3.7"},
		bad:  []string{"3.8", "3.9", "4.0"},
	})

	assertRangesGoodBad(t, "<=3.8.0", testGoodBad{
		good: []string{"3.6", "3.7", "3.8"},
		bad:  []string{"3.9", "4.0"},
	})
	assertRangesGoodBad(t, ">3.8.0", testGoodBad{
		good: []string{"3.9", "4.0"},
		bad:  []string{"3.6", "3.7", "3.8"},
	})
	assertRangesGoodBad(t, ">=3.8.0", testGoodBad{
		good: []string{"3.8", "3.9", "4.0"},
		bad:  []string{"3.6", "3.7"},
	})

	assertRangesGoodBad(t, "<3.8.0-0", testGoodBad{
		good: []string{"3.6", "3.7"},
		bad:  []string{"3.8", "3.9", "4.0"},
	})

	assertRangesGoodBad(t, "<=3.8.0-0", testGoodBad{
		good: []string{"3.6", "3.7"},
		bad:  []string{"3.8", "3.9", "4.0"},
	})

	// Big numbers in prerelease strings.
	lotsaOnes := strings.Repeat("1", 320)
	assertRangesGoodBad(t, ">=1.2.3-1"+lotsaOnes, testGoodBad{
		good: []string{"1.2.3-1" + lotsaOnes, "1.2.3-11" + lotsaOnes + ".1", "1.2.3-1" + lotsaOnes + ".1+build"},
		bad:  []string{"1.2.3-" + lotsaOnes + ".1+build"},
	})
}

func TestComparatorsOfVersionRanges(t *testing.T) {
	t.Parallel()
	comparatorsTests := []testForRangeOnVersion{
		// empty (matches everything)
		{"", "2.0.0", true},
		{"", "2.0.0-0", true},
		{"", "1.1.0", true},
		{"", "1.1.0-0", true},
		{"", "1.0.1", true},
		{"", "1.0.1-0", true},
		{"", "1.0.0", true},
		{"", "1.0.0-0", true},
		{"", "0.0.0", true},
		{"", "0.0.0-0", true},

		// wildcard major (matches everything)
		{"*", "2.0.0", true},
		{"*", "2.0.0-0", true},
		{"*", "1.1.0", true},
		{"*", "1.1.0-0", true},
		{"*", "1.0.1", true},
		{"*", "1.0.1-0", true},
		{"*", "1.0.0", true},
		{"*", "1.0.0-0", true},
		{"*", "0.0.0", true},
		{"*", "0.0.0-0", true},

		// wildcard minor
		{"1", "2.0.0", false},
		{"1", "2.0.0-0", false},
		{"1", "1.1.0", true},
		{"1", "1.1.0-0", true},
		{"1", "1.0.1", true},
		{"1", "1.0.1-0", true},
		{"1", "1.0.0", true},
		{"1", "1.0.0-0", true},
		{"1", "0.0.0", false},
		{"1", "0.0.0-0", false},

		// wildcard patch
		{"1.1", "2.0.0", false},
		{"1.1", "2.0.0-0", false},
		{"1.1", "1.1.0", true},
		{"1.1", "1.1.0-0", true},
		{"1.1", "1.0.1", false},
		{"1.1", "1.0.1-0", false},
		{"1.1", "1.0.0", false},
		{"1.1", "1.0.0-0", false},
		{"1.1", "0.0.0", false},
		{"1.1", "0.0.0-0", false},
		{"1.0", "2.0.0", false},
		{"1.0", "2.0.0-0", false},
		{"1.0", "1.1.0", false},
		{"1.0", "1.1.0-0", false},
		{"1.0", "1.0.1", true},
		{"1.0", "1.0.1-0", true},
		{"1.0", "1.0.0", true},
		{"1.0", "1.0.0-0", true},
		{"1.0", "0.0.0", false},
		{"1.0", "0.0.0-0", false},

		// exact
		{"1.1.0", "2.0.0", false},
		{"1.1.0", "2.0.0-0", false},
		{"1.1.0", "1.1.0", true},
		{"1.1.0", "1.1.0-0", false},
		{"1.1.0", "1.0.1", false},
		{"1.1.0", "1.0.1-0", false},
		{"1.1.0", "1.0.0-0", false},
		{"1.1.0", "1.0.0", false},
		{"1.1.0", "0.0.0", false},
		{"1.1.0", "0.0.0-0", false},
		{"1.1.0-0", "2.0.0", false},
		{"1.1.0-0", "2.0.0-0", false},
		{"1.1.0-0", "1.1.0", false},
		{"1.1.0-0", "1.1.0-0", true},
		{"1.1.0-0", "1.0.1", false},
		{"1.1.0-0", "1.0.1-0", false},
		{"1.1.0-0", "1.0.0-0", false},
		{"1.1.0-0", "1.0.0", false},
		{"1.1.0-0", "0.0.0", false},
		{"1.1.0-0", "0.0.0-0", false},
		{"1.0.1", "2.0.0", false},
		{"1.0.1", "2.0.0-0", false},
		{"1.0.1", "1.1.0", false},
		{"1.0.1", "1.1.0-0", false},
		{"1.0.1", "1.0.1", true},
		{"1.0.1", "1.0.1-0", false},
		{"1.0.1", "1.0.0-0", false},
		{"1.0.1", "1.0.0", false},
		{"1.0.1", "0.0.0", false},
		{"1.0.1", "0.0.0-0", false},
		{"1.0.1-0", "2.0.0", false},
		{"1.0.1-0", "2.0.0-0", false},
		{"1.0.1-0", "1.1.0", false},
		{"1.0.1-0", "1.1.0-0", false},
		{"1.0.1-0", "1.0.1", false},
		{"1.0.1-0", "1.0.1-0", true},
		{"1.0.1-0", "1.0.0-0", false},
		{"1.0.1-0", "1.0.0", false},
		{"1.0.1-0", "0.0.0", false},
		{"1.0.1-0", "0.0.0-0", false},
		{"1.0.0", "2.0.0", false},
		{"1.0.0", "2.0.0-0", false},
		{"1.0.0", "1.1.0", false},
		{"1.0.0", "1.1.0-0", false},
		{"1.0.0", "1.0.1", false},
		{"1.0.0", "1.0.1-0", false},
		{"1.0.0", "1.0.0-0", false},
		{"1.0.0", "1.0.0", true},
		{"1.0.0", "0.0.0", false},
		{"1.0.0", "0.0.0-0", false},
		{"1.0.0-0", "2.0.0", false},
		{"1.0.0-0", "2.0.0-0", false},
		{"1.0.0-0", "1.1.0", false},
		{"1.0.0-0", "1.1.0-0", false},
		{"1.0.0-0", "1.0.1", false},
		{"1.0.0-0", "1.0.1-0", false},
		{"1.0.0-0", "1.0.0", false},
		{"1.0.0-0", "1.0.0-0", true},

		// = wildcard major (matches everything)
		{"=*", "2.0.0", true},
		{"=*", "2.0.0-0", true},
		{"=*", "1.1.0", true},
		{"=*", "1.1.0-0", true},
		{"=*", "1.0.1", true},
		{"=*", "1.0.1-0", true},
		{"=*", "1.0.0", true},
		{"=*", "1.0.0-0", true},
		{"=*", "0.0.0", true},
		{"=*", "0.0.0-0", true},

		// = wildcard minor
		{"=1", "2.0.0", false},
		{"=1", "2.0.0-0", false},
		{"=1", "1.1.0", true},
		{"=1", "1.1.0-0", true},
		{"=1", "1.0.1", true},
		{"=1", "1.0.1-0", true},
		{"=1", "1.0.0", true},
		{"=1", "1.0.0-0", true},
		{"=1", "0.0.0", false},
		{"=1", "0.0.0-0", false},

		// = wildcard patch
		{"=1.1", "2.0.0", false},
		{"=1.1", "2.0.0-0", false},
		{"=1.1", "1.1.0", true},
		{"=1.1", "1.1.0-0", true},
		{"=1.1", "1.0.1", false},
		{"=1.1", "1.0.1-0", false},
		{"=1.1", "1.0.0", false},
		{"=1.1", "1.0.0-0", false},
		{"=1.1", "0.0.0", false},
		{"=1.1", "0.0.0-0", false},
		{"=1.0", "2.0.0", false},
		{"=1.0", "2.0.0-0", false},
		{"=1.0", "1.1.0", false},
		{"=1.0", "1.1.0-0", false},
		{"=1.0", "1.0.1", true},
		{"=1.0", "1.0.1-0", true},
		{"=1.0", "1.0.0", true},
		{"=1.0", "1.0.0-0", true},
		{"=1.0", "0.0.0", false},
		{"=1.0", "0.0.0-0", false},

		// = exact
		{"=1.1.0", "2.0.0", false},
		{"=1.1.0", "2.0.0-0", false},
		{"=1.1.0", "1.1.0", true},
		{"=1.1.0", "1.1.0-0", false},
		{"=1.1.0", "1.0.1", false},
		{"=1.1.0", "1.0.1-0", false},
		{"=1.1.0", "1.0.0-0", false},
		{"=1.1.0", "1.0.0", false},
		{"=1.1.0", "0.0.0", false},
		{"=1.1.0", "0.0.0-0", false},
		{"=1.1.0-0", "2.0.0", false},
		{"=1.1.0-0", "2.0.0-0", false},
		{"=1.1.0-0", "1.1.0", false},
		{"=1.1.0-0", "1.1.0-0", true},
		{"=1.1.0-0", "1.0.1", false},
		{"=1.1.0-0", "1.0.1-0", false},
		{"=1.1.0-0", "1.0.0-0", false},
		{"=1.1.0-0", "1.0.0", false},
		{"=1.1.0-0", "0.0.0", false},
		{"=1.1.0-0", "0.0.0-0", false},
		{"=1.0.1", "2.0.0", false},
		{"=1.0.1", "2.0.0-0", false},
		{"=1.0.1", "1.1.0", false},
		{"=1.0.1", "1.1.0-0", false},
		{"=1.0.1", "1.0.1", true},
		{"=1.0.1", "1.0.1-0", false},
		{"=1.0.1", "1.0.0-0", false},
		{"=1.0.1", "1.0.0", false},
		{"=1.0.1", "0.0.0", false},
		{"=1.0.1", "0.0.0-0", false},
		{"=1.0.1-0", "2.0.0", false},
		{"=1.0.1-0", "2.0.0-0", false},
		{"=1.0.1-0", "1.1.0", false},
		{"=1.0.1-0", "1.1.0-0", false},
		{"=1.0.1-0", "1.0.1", false},
		{"=1.0.1-0", "1.0.1-0", true},
		{"=1.0.1-0", "1.0.0-0", false},
		{"=1.0.1-0", "1.0.0", false},
		{"=1.0.1-0", "0.0.0", false},
		{"=1.0.1-0", "0.0.0-0", false},
		{"=1.0.0", "2.0.0", false},
		{"=1.0.0", "2.0.0-0", false},
		{"=1.0.0", "1.1.0", false},
		{"=1.0.0", "1.1.0-0", false},
		{"=1.0.0", "1.0.1", false},
		{"=1.0.0", "1.0.1-0", false},
		{"=1.0.0", "1.0.0-0", false},
		{"=1.0.0", "1.0.0", true},
		{"=1.0.0", "0.0.0", false},
		{"=1.0.0", "0.0.0-0", false},
		{"=1.0.0-0", "2.0.0", false},
		{"=1.0.0-0", "2.0.0-0", false},
		{"=1.0.0-0", "1.1.0", false},
		{"=1.0.0-0", "1.1.0-0", false},
		{"=1.0.0-0", "1.0.1", false},
		{"=1.0.0-0", "1.0.1-0", false},
		{"=1.0.0-0", "1.0.0", false},
		{"=1.0.0-0", "1.0.0-0", true},

		// > wildcard major (matches nothing)
		{">*", "2.0.0", false},
		{">*", "2.0.0-0", false},
		{">*", "1.1.0", false},
		{">*", "1.1.0-0", false},
		{">*", "1.0.1", false},
		{">*", "1.0.1-0", false},
		{">*", "1.0.0", false},
		{">*", "1.0.0-0", false},
		{">*", "0.0.0", false},
		{">*", "0.0.0-0", false},

		// > wildcard minor
		{">1", "2.0.0", true},
		{">1", "2.0.0-0", true},
		{">1", "1.1.0", false},
		{">1", "1.1.0-0", false},
		{">1", "1.0.1", false},
		{">1", "1.0.1-0", false},
		{">1", "1.0.0", false},
		{">1", "1.0.0-0", false},
		{">1", "0.0.0", false},
		{">1", "0.0.0-0", false},

		// > wildcard patch
		{">1.1", "2.0.0", true},
		{">1.1", "2.0.0-0", true},
		{">1.1", "1.1.0", false},
		{">1.1", "1.1.0-0", false},
		{">1.1", "1.0.1", false},
		{">1.1", "1.0.1-0", false},
		{">1.1", "1.0.0", false},
		{">1.1", "1.0.0-0", false},
		{">1.1", "0.0.0", false},
		{">1.1", "0.0.0-0", false},
		{">1.0", "2.0.0", true},
		{">1.0", "2.0.0-0", true},
		{">1.0", "1.1.0", true},
		{">1.0", "1.1.0-0", true},
		{">1.0", "1.0.1", false},
		{">1.0", "1.0.1-0", false},
		{">1.0", "1.0.0", false},
		{">1.0", "1.0.0-0", false},
		{">1.0", "0.0.0", false},
		{">1.0", "0.0.0-0", false},

		// > exact
		{">1.1.0", "2.0.0", true},
		{">1.1.0", "2.0.0-0", true},
		{">1.1.0", "1.1.0", false},
		{">1.1.0", "1.1.0-0", false},
		{">1.1.0", "1.0.1", false},
		{">1.1.0", "1.0.1-0", false},
		{">1.1.0", "1.0.0", false},
		{">1.1.0", "1.0.0-0", false},
		{">1.1.0", "0.0.0", false},
		{">1.1.0", "0.0.0-0", false},
		{">1.1.0-0", "2.0.0", true},
		{">1.1.0-0", "2.0.0-0", true},
		{">1.1.0-0", "1.1.0", true},
		{">1.1.0-0", "1.1.0-0", false},
		{">1.1.0-0", "1.0.1", false},
		{">1.1.0-0", "1.0.1-0", false},
		{">1.1.0-0", "1.0.0", false},
		{">1.1.0-0", "1.0.0-0", false},
		{">1.1.0-0", "0.0.0", false},
		{">1.1.0-0", "0.0.0-0", false},
		{">1.0.1", "2.0.0", true},
		{">1.0.1", "2.0.0-0", true},
		{">1.0.1", "1.1.0", true},
		{">1.0.1", "1.1.0-0", true},
		{">1.0.1", "1.0.1", false},
		{">1.0.1", "1.0.1-0", false},
		{">1.0.1", "1.0.0", false},
		{">1.0.1", "1.0.0-0", false},
		{">1.0.1", "0.0.0", false},
		{">1.0.1", "0.0.0-0", false},
		{">1.0.1-0", "2.0.0", true},
		{">1.0.1-0", "2.0.0-0", true},
		{">1.0.1-0", "1.1.0", true},
		{">1.0.1-0", "1.1.0-0", true},
		{">1.0.1-0", "1.0.1", true},
		{">1.0.1-0", "1.0.1-0", false},
		{">1.0.1-0", "1.0.0", false},
		{">1.0.1-0", "1.0.0-0", false},
		{">1.0.1-0", "0.0.0", false},
		{">1.0.1-0", "0.0.0-0", false},
		{">1.0.0", "2.0.0", true},
		{">1.0.0", "2.0.0-0", true},
		{">1.0.0", "1.1.0", true},
		{">1.0.0", "1.1.0-0", true},
		{">1.0.0", "1.0.1", true},
		{">1.0.0", "1.0.1-0", true},
		{">1.0.0", "1.0.0", false},
		{">1.0.0", "1.0.0-0", false},
		{">1.0.0", "0.0.0", false},
		{">1.0.0", "0.0.0-0", false},
		{">1.0.0-0", "2.0.0", true},
		{">1.0.0-0", "2.0.0-0", true},
		{">1.0.0-0", "1.1.0", true},
		{">1.0.0-0", "1.1.0-0", true},
		{">1.0.0-0", "1.0.1", true},
		{">1.0.0-0", "1.0.1-0", true},
		{">1.0.0-0", "1.0.0", true},
		{">1.0.0-0", "1.0.0-0", false},
		{">1.0.0-0", "0.0.0", false},
		{">1.0.0-0", "0.0.0-0", false},

		// >= wildcard major (matches everything)
		{">=*", "2.0.0", true},
		{">=*", "2.0.0-0", true},
		{">=*", "1.1.0", true},
		{">=*", "1.1.0-0", true},
		{">=*", "1.0.1", true},
		{">=*", "1.0.1-0", true},
		{">=*", "1.0.0", true},
		{">=*", "1.0.0-0", true},
		{">=*", "0.0.0", true},
		{">=*", "0.0.0-0", true},

		// >= wildcard minor
		{">=1", "2.0.0", true},
		{">=1", "2.0.0-0", true},
		{">=1", "1.1.0", true},
		{">=1", "1.1.0-0", true},
		{">=1", "1.0.1", true},
		{">=1", "1.0.1-0", true},
		{">=1", "1.0.0", true},
		{">=1", "1.0.0-0", true},
		{">=1", "0.0.0", false},
		{">=1", "0.0.0-0", false},

		// >= wildcard patch
		{">=1.1", "2.0.0", true},
		{">=1.1", "2.0.0-0", true},
		{">=1.1", "1.1.0", true},
		{">=1.1", "1.1.0-0", true},
		{">=1.1", "1.0.1", false},
		{">=1.1", "1.0.1-0", false},
		{">=1.1", "1.0.0", false},
		{">=1.1", "1.0.0-0", false},
		{">=1.1", "0.0.0", false},
		{">=1.1", "0.0.0-0", false},
		{">=1.0", "2.0.0", true},
		{">=1.0", "2.0.0-0", true},
		{">=1.0", "1.1.0", true},
		{">=1.0", "1.1.0-0", true},
		{">=1.0", "1.0.1", true},
		{">=1.0", "1.0.1-0", true},
		{">=1.0", "1.0.0", true},
		{">=1.0", "1.0.0-0", true},
		{">=1.0", "0.0.0", false},
		{">=1.0", "0.0.0-0", false},

		// >= exact
		{">=1.1.0", "2.0.0", true},
		{">=1.1.0", "2.0.0-0", true},
		{">=1.1.0", "1.1.0", true},
		{">=1.1.0", "1.1.0-0", false},
		{">=1.1.0", "1.0.1", false},
		{">=1.1.0", "1.0.1-0", false},
		{">=1.1.0", "1.0.0", false},
		{">=1.1.0", "1.0.0-0", false},
		{">=1.1.0", "0.0.0", false},
		{">=1.1.0", "0.0.0-0", false},
		{">=1.1.0-0", "2.0.0", true},
		{">=1.1.0-0", "2.0.0-0", true},
		{">=1.1.0-0", "1.1.0", true},
		{">=1.1.0-0", "1.1.0-0", true},
		{">=1.1.0-0", "1.0.1", false},
		{">=1.1.0-0", "1.0.1-0", false},
		{">=1.1.0-0", "1.0.0", false},
		{">=1.1.0-0", "1.0.0-0", false},
		{">=1.1.0-0", "0.0.0", false},
		{">=1.1.0-0", "0.0.0-0", false},
		{">=1.0.1", "2.0.0", true},
		{">=1.0.1", "2.0.0-0", true},
		{">=1.0.1", "1.1.0", true},
		{">=1.0.1", "1.1.0-0", true},
		{">=1.0.1", "1.0.1", true},
		{">=1.0.1", "1.0.1-0", false},
		{">=1.0.1", "1.0.0", false},
		{">=1.0.1", "1.0.0-0", false},
		{">=1.0.1", "0.0.0", false},
		{">=1.0.1", "0.0.0-0", false},
		{">=1.0.1-0", "2.0.0", true},
		{">=1.0.1-0", "2.0.0-0", true},
		{">=1.0.1-0", "1.1.0", true},
		{">=1.0.1-0", "1.1.0-0", true},
		{">=1.0.1-0", "1.0.1", true},
		{">=1.0.1-0", "1.0.1-0", true},
		{">=1.0.1-0", "1.0.0", false},
		{">=1.0.1-0", "1.0.0-0", false},
		{">=1.0.1-0", "0.0.0", false},
		{">=1.0.1-0", "0.0.0-0", false},
		{">=1.0.0", "2.0.0", true},
		{">=1.0.0", "2.0.0-0", true},
		{">=1.0.0", "1.1.0", true},
		{">=1.0.0", "1.1.0-0", true},
		{">=1.0.0", "1.0.1", true},
		{">=1.0.0", "1.0.1-0", true},
		{">=1.0.0", "1.0.0", true},
		{">=1.0.0", "1.0.0-0", false},
		{">=1.0.0", "0.0.0", false},
		{">=1.0.0", "0.0.0-0", false},
		{">=1.0.0-0", "2.0.0", true},
		{">=1.0.0-0", "2.0.0-0", true},
		{">=1.0.0-0", "1.1.0", true},
		{">=1.0.0-0", "1.1.0-0", true},
		{">=1.0.0-0", "1.0.1", true},
		{">=1.0.0-0", "1.0.1-0", true},
		{">=1.0.0-0", "1.0.0", true},
		{">=1.0.0-0", "1.0.0-0", true},
		{">=1.0.0-0", "0.0.0", false},
		{">=1.0.0-0", "0.0.0-0", false},

		// < wildcard major (matches nothing)
		{"<*", "2.0.0", false},
		{"<*", "2.0.0-0", false},
		{"<*", "1.1.0", false},
		{"<*", "1.1.0-0", false},
		{"<*", "1.0.1", false},
		{"<*", "1.0.1-0", false},
		{"<*", "1.0.0", false},
		{"<*", "1.0.0-0", false},
		{"<*", "0.0.0", false},
		{"<*", "0.0.0-0", false},

		// < wildcard minor
		{"<1", "2.0.0", false},
		{"<1", "2.0.0-0", false},
		{"<1", "1.1.0", false},
		{"<1", "1.1.0-0", false},
		{"<1", "1.0.1", false},
		{"<1", "1.0.1-0", false},
		{"<1", "1.0.0", false},
		{"<1", "1.0.0-0", false},
		{"<1", "0.0.0", true},
		{"<1", "0.0.0-0", true},

		// < wildcard patch
		{"<1.1", "2.0.0", false},
		{"<1.1", "2.0.0-0", false},
		{"<1.1", "1.1.0", false},
		{"<1.1", "1.1.0-0", false},
		{"<1.1", "1.0.1", true},
		{"<1.1", "1.0.1-0", true},
		{"<1.1", "1.0.0", true},
		{"<1.1", "1.0.0-0", true},
		{"<1.1", "0.0.0", true},
		{"<1.1", "0.0.0-0", true},
		{"<1.0", "2.0.0", false},
		{"<1.0", "2.0.0-0", false},
		{"<1.0", "1.1.0", false},
		{"<1.0", "1.1.0-0", false},
		{"<1.0", "1.0.1", false},
		{"<1.0", "1.0.1-0", false},
		{"<1.0", "1.0.0", false},
		{"<1.0", "1.0.0-0", false},
		{"<1.0", "0.0.0", true},
		{"<1.0", "0.0.0-0", true},

		// < exact
		{"<1.1.0", "2.0.0", false},
		{"<1.1.0", "2.0.0-0", false},
		{"<1.1.0", "1.1.0", false},
		{"<1.1.0", "1.1.0-0", true},
		{"<1.1.0", "1.0.1", true},
		{"<1.1.0", "1.0.1-0", true},
		{"<1.1.0", "1.0.0", true},
		{"<1.1.0", "1.0.0-0", true},
		{"<1.1.0", "0.0.0", true},
		{"<1.1.0", "0.0.0-0", true},
		{"<1.1.0-0", "2.0.0", false},
		{"<1.1.0-0", "2.0.0-0", false},
		{"<1.1.0-0", "1.1.0", false},
		{"<1.1.0-0", "1.1.0-0", false},
		{"<1.1.0-0", "1.0.1", true},
		{"<1.1.0-0", "1.0.1-0", true},
		{"<1.1.0-0", "1.0.0", true},
		{"<1.1.0-0", "1.0.0-0", true},
		{"<1.1.0-0", "0.0.0", true},
		{"<1.1.0-0", "0.0.0-0", true},
		{"<1.0.1", "2.0.0", false},
		{"<1.0.1", "2.0.0-0", false},
		{"<1.0.1", "1.1.0", false},
		{"<1.0.1", "1.1.0-0", false},
		{"<1.0.1", "1.0.1", false},
		{"<1.0.1", "1.0.1-0", true},
		{"<1.0.1", "1.0.0", true},
		{"<1.0.1", "1.0.0-0", true},
		{"<1.0.1", "0.0.0", true},
		{"<1.0.1", "0.0.0-0", true},
		{"<1.0.1-0", "2.0.0", false},
		{"<1.0.1-0", "2.0.0-0", false},
		{"<1.0.1-0", "1.1.0", false},
		{"<1.0.1-0", "1.1.0-0", false},
		{"<1.0.1-0", "1.0.1", false},
		{"<1.0.1-0", "1.0.1-0", false},
		{"<1.0.1-0", "1.0.0", true},
		{"<1.0.1-0", "1.0.0-0", true},
		{"<1.0.1-0", "0.0.0", true},
		{"<1.0.1-0", "0.0.0-0", true},
		{"<1.0.0", "2.0.0", false},
		{"<1.0.0", "2.0.0-0", false},
		{"<1.0.0", "1.1.0", false},
		{"<1.0.0", "1.1.0-0", false},
		{"<1.0.0", "1.0.1", false},
		{"<1.0.0", "1.0.1-0", false},
		{"<1.0.0", "1.0.0", false},
		{"<1.0.0", "1.0.0-0", true},
		{"<1.0.0", "0.0.0", true},
		{"<1.0.0", "0.0.0-0", true},
		{"<1.0.0-0", "2.0.0", false},
		{"<1.0.0-0", "2.0.0-0", false},
		{"<1.0.0-0", "1.1.0", false},
		{"<1.0.0-0", "1.1.0-0", false},
		{"<1.0.0-0", "1.0.1", false},
		{"<1.0.0-0", "1.0.1-0", false},
		{"<1.0.0-0", "1.0.0", false},
		{"<1.0.0-0", "1.0.0-0", false},
		{"<1.0.0-0", "0.0.0", true},
		{"<1.0.0-0", "0.0.0-0", true},

		// <= wildcard major (matches everything)
		{"<=*", "2.0.0", true},
		{"<=*", "2.0.0-0", true},
		{"<=*", "1.1.0", true},
		{"<=*", "1.1.0-0", true},
		{"<=*", "1.0.1", true},
		{"<=*", "1.0.1-0", true},
		{"<=*", "1.0.0", true},
		{"<=*", "1.0.0-0", true},
		{"<=*", "0.0.0", true},
		{"<=*", "0.0.0-0", true},

		// <= wildcard minor
		{"<=1", "2.0.0", false},
		{"<=1", "2.0.0-0", false},
		{"<=1", "1.1.0", true},
		{"<=1", "1.1.0-0", true},
		{"<=1", "1.0.1", true},
		{"<=1", "1.0.1-0", true},
		{"<=1", "1.0.0", true},
		{"<=1", "1.0.0-0", true},
		{"<=1", "0.0.0", true},
		{"<=1", "0.0.0-0", true},

		// <= wildcard patch
		{"<=1.1", "2.0.0", false},
		{"<=1.1", "2.0.0-0", false},
		{"<=1.1", "1.1.0", true},
		{"<=1.1", "1.1.0-0", true},
		{"<=1.1", "1.0.1", true},
		{"<=1.1", "1.0.1-0", true},
		{"<=1.1", "1.0.0", true},
		{"<=1.1", "1.0.0-0", true},
		{"<=1.1", "0.0.0", true},
		{"<=1.1", "0.0.0-0", true},
		{"<=1.0", "2.0.0", false},
		{"<=1.0", "2.0.0-0", false},
		{"<=1.0", "1.1.0", false},
		{"<=1.0", "1.1.0-0", false},
		{"<=1.0", "1.0.1", true},
		{"<=1.0", "1.0.1-0", true},
		{"<=1.0", "1.0.0", true},
		{"<=1.0", "1.0.0-0", true},
		{"<=1.0", "0.0.0", true},
		{"<=1.0", "0.0.0-0", true},

		// <= exact
		{"<=1.1.0", "2.0.0", false},
		{"<=1.1.0", "2.0.0-0", false},
		{"<=1.1.0", "1.1.0", true},
		{"<=1.1.0", "1.1.0-0", true},
		{"<=1.1.0", "1.0.1", true},
		{"<=1.1.0", "1.0.1-0", true},
		{"<=1.1.0", "1.0.0", true},
		{"<=1.1.0", "1.0.0-0", true},
		{"<=1.1.0", "0.0.0", true},
		{"<=1.1.0", "0.0.0-0", true},
		{"<=1.1.0-0", "2.0.0", false},
		{"<=1.1.0-0", "2.0.0-0", false},
		{"<=1.1.0-0", "1.1.0", false},
		{"<=1.1.0-0", "1.1.0-0", true},
		{"<=1.1.0-0", "1.0.1", true},
		{"<=1.1.0-0", "1.0.1-0", true},
		{"<=1.1.0-0", "1.0.0", true},
		{"<=1.1.0-0", "1.0.0-0", true},
		{"<=1.1.0-0", "0.0.0", true},
		{"<=1.1.0-0", "0.0.0-0", true},
		{"<=1.0.1", "2.0.0", false},
		{"<=1.0.1", "2.0.0-0", false},
		{"<=1.0.1", "1.1.0", false},
		{"<=1.0.1", "1.1.0-0", false},
		{"<=1.0.1", "1.0.1", true},
		{"<=1.0.1", "1.0.1-0", true},
		{"<=1.0.1", "1.0.0", true},
		{"<=1.0.1", "1.0.0-0", true},
		{"<=1.0.1", "0.0.0", true},
		{"<=1.0.1", "0.0.0-0", true},
		{"<=1.0.1-0", "2.0.0", false},
		{"<=1.0.1-0", "2.0.0-0", false},
		{"<=1.0.1-0", "1.1.0", false},
		{"<=1.0.1-0", "1.1.0-0", false},
		{"<=1.0.1-0", "1.0.1", false},
		{"<=1.0.1-0", "1.0.1-0", true},
		{"<=1.0.1-0", "1.0.0", true},
		{"<=1.0.1-0", "1.0.0-0", true},
		{"<=1.0.1-0", "0.0.0", true},
		{"<=1.0.1-0", "0.0.0-0", true},
		{"<=1.0.0", "2.0.0", false},
		{"<=1.0.0", "2.0.0-0", false},
		{"<=1.0.0", "1.1.0", false},
		{"<=1.0.0", "1.1.0-0", false},
		{"<=1.0.0", "1.0.1", false},
		{"<=1.0.0", "1.0.1-0", false},
		{"<=1.0.0", "1.0.0", true},
		{"<=1.0.0", "1.0.0-0", true},
		{"<=1.0.0", "0.0.0", true},
		{"<=1.0.0", "0.0.0-0", true},
		{"<=1.0.0-0", "2.0.0", false},
		{"<=1.0.0-0", "2.0.0-0", false},
		{"<=1.0.0-0", "1.1.0", false},
		{"<=1.0.0-0", "1.1.0-0", false},
		{"<=1.0.0-0", "1.0.1", false},
		{"<=1.0.0-0", "1.0.1-0", false},
		{"<=1.0.0-0", "1.0.0", false},
		{"<=1.0.0-0", "1.0.0-0", true},
		{"<=1.0.0-0", "0.0.0", true},
		{"<=1.0.0-0", "0.0.0-0", true},

		// https://github.com/microsoft/TypeScript/issues/50909
		{">4.8", "4.9.0-beta", true},
		{">=4.9", "4.9.0-beta", true},
		{"<4.9", "4.9.0-beta", false},
		{"<=4.8", "4.9.0-beta", false},
	}
	for _, test := range comparatorsTests {
		assertRangeTest(t, "comparators", test.rangeText, test.versionText, test.expected)
	}
}

func TestConjunctionsOfVersionRanges(t *testing.T) {
	t.Parallel()
	conjunctionTests := []testForRangeOnVersion{
		{">1.0.0 <2.0.0", "1.0.1", true},
		{">1.0.0 <2.0.0", "2.0.0", false},
		{">1.0.0 <2.0.0", "1.0.0", false},
		{">1 >2", "3.0.0", true},
	}
	for _, test := range conjunctionTests {
		assertRangeTest(t, "conjunctions", test.rangeText, test.versionText, test.expected)
	}
}

func TestDisjunctionsOfVersionRanges(t *testing.T) {
	t.Parallel()
	disjunctionTests := []testForRangeOnVersion{
		{">1.0.0 || <1.0.0", "1.0.1", true},
		{">1.0.0 || <1.0.0", "0.0.1", true},
		{">1.0.0 || <1.0.0", "1.0.0", false},
		{">1.0.0 || <1.0.0", "0.0.0", true},
		{">=1.0.0 <2.0.0 || >=3.0.0 <4.0.0", "1.0.0", true},
		{">=1.0.0 <2.0.0 || >=3.0.0 <4.0.0", "2.0.0", false},
		{">=1.0.0 <2.0.0 || >=3.0.0 <4.0.0", "3.0.0", true},
	}
	for _, test := range disjunctionTests {
		assertRangeTest(t, "disjunctions", test.rangeText, test.versionText, test.expected)
	}
}

func TestHyphensOfVersionRanges(t *testing.T) {
	t.Parallel()
	hyphenTests := []testForRangeOnVersion{
		{"1.0.0 - 2.0.0", "1.0.0", true},
		{"1.0.0 - 2.0.0", "1.0.1", true},
		{"1.0.0 - 2.0.0", "2.0.0", true},
		{"1.0.0 - 2.0.0", "2.0.1", false},
		{"1.0.0 - 2.0.0", "0.9.9", false},
		{"1.0.0 - 2.0.0", "3.0.0", false},
	}
	for _, test := range hyphenTests {
		assertRangeTest(t, "hyphens", test.rangeText, test.versionText, test.expected)
	}
}

func TestTildesOfVersionRanges(t *testing.T) {
	t.Parallel()
	tildeTests := []testForRangeOnVersion{
		{"~0", "0.0.0", true},
		{"~0", "0.1.0", true},
		{"~0", "0.1.2", true},
		{"~0", "0.1.9", true},
		{"~0", "1.0.0", false},
		{"~0.1", "0.1.0", true},
		{"~0.1", "0.1.2", true},
		{"~0.1", "0.1.9", true},
		{"~0.1", "0.2.0", false},
		{"~0.1.2", "0.1.2", true},
		{"~0.1.2", "0.1.9", true},
		{"~0.1.2", "0.2.0", false},
		{"~1.0.0", "1.0.0", true},
		{"~1.0.0", "1.0.1", true},
		{"~1", "1.0.0", true},
		{"~1", "1.2.0", true},
		{"~1", "1.2.3", true},
		{"~1", "0.0.0", false},
		{"~1", "2.0.0", false},
		{"~1.2", "1.2.0", true},
		{"~1.2", "1.2.3", true},
		{"~1.2", "1.1.0", false},
		{"~1.2", "1.3.0", false},
		{"~1.2.3", "1.2.3", true},
		{"~1.2.3", "1.2.9", true},
		{"~1.2.3", "1.1.0", false},
		{"~1.2.3", "1.3.0", false},
	}
	for _, test := range tildeTests {
		assertRangeTest(t, "tilde", test.rangeText, test.versionText, test.expected)
	}
}

func TestCaretsOfVersionRanges(t *testing.T) {
	t.Parallel()
	caretTests := []testForRangeOnVersion{
		{"^0", "0.0.0", true},
		{"^0", "0.1.0", true},
		{"^0", "0.9.0", true},
		{"^0", "0.1.2", true},
		{"^0", "0.1.9", true},
		{"^0", "1.0.0", false},
		{"^0.1", "0.1.0", true},
		{"^0.1", "0.1.2", true},
		{"^0.1", "0.1.9", true},
		{"^0.1.2", "0.1.2", true},
		{"^0.1.2", "0.1.9", true},
		{"^0.1.2", "0.0.0", false},
		{"^0.1.2", "0.2.0", false},
		{"^0.1.2", "1.0.0", false},
		{"^1", "1.0.0", true},
		{"^1", "1.2.0", true},
		{"^1", "1.2.3", true},
		{"^1", "1.9.0", true},
		{"^1", "0.0.0", false},
		{"^1", "2.0.0", false},
		{"^1.2", "1.2.0", true},
		{"^1.2", "1.2.3", true},
		{"^1.2", "1.9.0", true},
		{"^1.2", "1.1.0", false},
		{"^1.2", "2.0.0", false},
		{"^1.2.3", "1.2.3", true},
		{"^1.2.3", "1.9.0", true},
		{"^1.2.3", "1.2.2", false},
		{"^1.2.3", "2.0.0", false},
	}
	for _, test := range caretTests {
		assertRangeTest(t, "caret", test.rangeText, test.versionText, test.expected)
	}
}

type testForRangeOnVersion struct {
	rangeText   string
	versionText string
	expected    bool
}

func assertRangesGoodBad(t *testing.T, versionRangeString string, tests testGoodBad) {
	t.Run(versionRangeString, func(t *testing.T) {
		t.Parallel()
		versionRange, ok := TryParseVersionRange(versionRangeString)
		assert.Assert(t, ok)
		for _, good := range tests.good {
			v, ok := TryParseVersion(good)
			assert.Assert(t, ok)
			assert.Assert(t, versionRange.Test(&v), "%s should be matched by range %s", good, versionRangeString)
		}

		for _, bad := range tests.bad {
			v, ok := TryParseVersion(bad)
			assert.Assert(t, ok)
			assert.Assert(t, !versionRange.Test(&v), "%s should not be matched by range %s", bad, versionRangeString)
		}
	})
}

func assertRangeTest(t *testing.T, name string, rangeText string, versionText string, inRange bool) {
	testName := fmt.Sprintf("%s (version %s in range %s) == %t", name, versionText, rangeText, inRange)
	t.Run(testName, func(t *testing.T) {
		t.Parallel()
		versionRange, ok := TryParseVersionRange(rangeText)
		assert.Assert(t, ok)
		version, err := TryParseVersion(versionText)
		assert.NilError(t, err)
		assert.Equal(t, versionRange.Test(&version), inRange)
	})
}
