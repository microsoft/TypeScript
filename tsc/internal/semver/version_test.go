package semver

import (
	"testing"

	"gotest.tools/v3/assert"
)

func TestTryParseSemver(t *testing.T) {
	t.Parallel()
	tests := []struct {
		in  string
		out Version
	}{
		{"1.2.3-pre.4+build.5", Version{major: 1, minor: 2, patch: 3, prerelease: []string{"pre", "4"}, build: []string{"build", "5"}}},
		{"1.2.3-pre.4", Version{major: 1, minor: 2, patch: 3, prerelease: []string{"pre", "4"}}},
		{"1.2.3+build.4", Version{major: 1, minor: 2, patch: 3, build: []string{"build", "4"}}},
		{"1.2.3", Version{major: 1, minor: 2, patch: 3}},
	}

	for _, test := range tests {
		t.Run(test.in, func(t *testing.T) {
			t.Parallel()
			v, err := TryParseVersion(test.in)
			assert.NilError(t, err)
			assertVersion(t, v, test.out)
		})
	}
}

func TestVersionString(t *testing.T) {
	t.Parallel()
	tests := []struct {
		in  Version
		out string
	}{
		{Version{major: 1, minor: 2, patch: 3, prerelease: []string{"pre", "4"}, build: []string{"build", "5"}}, "1.2.3-pre.4+build.5"},
		{Version{major: 1, minor: 2, patch: 3, prerelease: []string{"pre", "4"}, build: []string{"build"}}, "1.2.3-pre.4+build"},
		{Version{major: 1, minor: 2, patch: 3, build: []string{"build"}}, "1.2.3+build"},
		{Version{major: 1, minor: 2, patch: 3, prerelease: []string{"pre", "4"}}, "1.2.3-pre.4"},
		{Version{major: 1, minor: 2, patch: 3, build: []string{"build", "4"}}, "1.2.3+build.4"},
		{Version{major: 1, minor: 2, patch: 3}, "1.2.3"},
	}

	for _, test := range tests {
		t.Run(test.out, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, test.in.String(), test.out)
		})
	}
}

func TestVersionCompare(t *testing.T) {
	t.Parallel()
	tests := []struct {
		v1, v2 string
		want   int
	}{
		// https://semver.org/#spec-item-11
		// > Precedence is determined by the first difference when comparing each of these
		// > identifiers from left to right as follows: Major, minor, and patch versions are
		// > always compared numerically.
		{"1.0.0", "2.0.0", comparisonLessThan},
		{"1.0.0", "1.1.0", comparisonLessThan},
		{"1.0.0", "1.0.1", comparisonLessThan},
		{"2.0.0", "1.0.0", comparisonGreaterThan},
		{"1.1.0", "1.0.0", comparisonGreaterThan},
		{"1.0.1", "1.0.0", comparisonGreaterThan},
		{"1.0.0", "1.0.0", comparisonEqualTo},

		// https://semver.org/#spec-item-11
		// > When major, minor, and patch are equal, a pre-release version has lower
		// > precedence than a normal version.
		{"1.0.0", "1.0.0-pre", comparisonGreaterThan},
		{"1.0.1-pre", "1.0.0", comparisonGreaterThan},
		{"1.0.0-pre", "1.0.0", comparisonLessThan},

		// https://semver.org/#spec-item-11
		// > identifiers consisting of only digits are compared numerically
		{"1.0.0-0", "1.0.0-1", comparisonLessThan},
		{"1.0.0-1", "1.0.0-0", comparisonGreaterThan},
		{"1.0.0-2", "1.0.0-10", comparisonLessThan},
		{"1.0.0-10", "1.0.0-2", comparisonGreaterThan},
		{"1.0.0-0", "1.0.0-0", comparisonEqualTo},

		// https://semver.org/#spec-item-11
		// > identifiers with letters or hyphens are compared lexically in ASCII sort order.
		{"1.0.0-a", "1.0.0-b", comparisonLessThan},
		{"1.0.0-a-2", "1.0.0-a-10", comparisonGreaterThan},
		{"1.0.0-b", "1.0.0-a", comparisonGreaterThan},
		{"1.0.0-a", "1.0.0-a", comparisonEqualTo},
		{"1.0.0-A", "1.0.0-a", comparisonLessThan},

		// https://semver.org/#spec-item-11
		// > Numeric identifiers always have lower precedence than non-numeric identifiers.
		{"1.0.0-0", "1.0.0-alpha", comparisonLessThan},
		{"1.0.0-alpha", "1.0.0-0", comparisonGreaterThan},
		{"1.0.0-0", "1.0.0-0", comparisonEqualTo},
		{"1.0.0-alpha", "1.0.0-alpha", comparisonEqualTo},

		// https://semver.org/#spec-item-11
		// > A larger set of pre-release fields has a higher precedence than a smaller set, if all
		// > of the preceding identifiers are equal.
		{"1.0.0-alpha", "1.0.0-alpha.0", comparisonLessThan},
		{"1.0.0-alpha.0", "1.0.0-alpha", comparisonGreaterThan},

		// https://semver.org/#spec-item-11
		// > Precedence for two pre-release versions with the same major, minor, and patch version
		// > MUST be determined by comparing each dot separated identifier from left to right until
		// > a difference is found [...]
		{"1.0.0-a.0.b.1", "1.0.0-a.0.b.2", comparisonLessThan},
		{"1.0.0-a.0.b.1", "1.0.0-b.0.a.1", comparisonLessThan},
		{"1.0.0-a.0.b.2", "1.0.0-a.0.b.1", comparisonGreaterThan},
		{"1.0.0-b.0.a.1", "1.0.0-a.0.b.1", comparisonGreaterThan},

		// https://semver.org/#spec-item-11
		// > Build metadata does not figure into precedence
		{"1.0.0+build", "1.0.0", comparisonEqualTo},
		{"1.0.0+build.stuff", "1.0.0", comparisonEqualTo},
		{"1.0.0", "1.0.0+build", comparisonEqualTo},
		{"1.0.0+build", "1.0.0+stuff", comparisonEqualTo},

		// https://semver.org/#spec-item-11
		// Edge cases for numeric and lexical comparison of prerelease identifiers.
		{"1.0.0-alpha.99999", "1.0.0-alpha.100000", comparisonLessThan},
		{"1.0.0-alpha.beta", "1.0.0-alpha.alpha", comparisonGreaterThan},
	}

	for _, test := range tests {
		t.Run(test.v1+" <=> "+test.v2, func(t *testing.T) {
			t.Parallel()
			v1, err1 := TryParseVersion(test.v1)
			assert.NilError(t, err1, test.v1)
			v2, err2 := TryParseVersion(test.v2)
			assert.NilError(t, err2, test.v2)
			assert.Equal(t, v1.Compare(&v2), test.want)
		})
	}
}

func assertVersion(t *testing.T, a, b Version) {
	assert.Equal(t, a.major, b.major)
	assert.Equal(t, a.minor, b.minor)
	assert.Equal(t, a.patch, b.patch)
	assert.DeepEqual(t, a.prerelease, b.prerelease)
	assert.DeepEqual(t, a.build, b.build)
}
