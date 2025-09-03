package stringutil

import (
	"strings"
	"unicode"
	"unicode/utf8"
)

func EquateStringCaseInsensitive(a, b string) bool {
	// !!!
	// return a == b || strings.ToUpper(a) == strings.ToUpper(b)
	return strings.EqualFold(a, b)
}

func EquateStringCaseSensitive(a, b string) bool {
	return a == b
}

func GetStringEqualityComparer(ignoreCase bool) func(a, b string) bool {
	if ignoreCase {
		return EquateStringCaseInsensitive
	}
	return EquateStringCaseSensitive
}

type Comparison = int

const (
	ComparisonLessThan    Comparison = -1
	ComparisonEqual       Comparison = 0
	ComparisonGreaterThan Comparison = 1
)

func CompareStringsCaseInsensitive(a string, b string) Comparison {
	if a == b {
		return ComparisonEqual
	}
	for {
		ca, sa := utf8.DecodeRuneInString(a)
		cb, sb := utf8.DecodeRuneInString(b)
		if sa == 0 {
			if sb == 0 {
				return ComparisonEqual
			}
			return ComparisonLessThan
		}
		if sb == 0 {
			return ComparisonGreaterThan
		}
		lca := unicode.ToLower(ca)
		lcb := unicode.ToLower(cb)
		if lca != lcb {
			if lca < lcb {
				return ComparisonLessThan
			}
			return ComparisonGreaterThan
		}
		a = a[sa:]
		b = b[sb:]
	}
}

func CompareStringsCaseSensitive(a string, b string) Comparison {
	return strings.Compare(a, b)
}

func GetStringComparer(ignoreCase bool) func(a, b string) Comparison {
	if ignoreCase {
		return CompareStringsCaseInsensitive
	}
	return CompareStringsCaseSensitive
}

func HasPrefix(s string, prefix string, caseSensitive bool) bool {
	if caseSensitive {
		return strings.HasPrefix(s, prefix)
	}
	if len(prefix) > len(s) {
		return false
	}
	return strings.EqualFold(s[0:len(prefix)], prefix)
}

func HasSuffix(s string, suffix string, caseSensitive bool) bool {
	if caseSensitive {
		return strings.HasSuffix(s, suffix)
	}
	if len(suffix) > len(s) {
		return false
	}
	return strings.EqualFold(s[len(s)-len(suffix):], suffix)
}

func CompareStringsCaseInsensitiveThenSensitive(a, b string) Comparison {
	cmp := CompareStringsCaseInsensitive(a, b)
	if cmp != ComparisonEqual {
		return cmp
	}
	return CompareStringsCaseSensitive(a, b)
}
