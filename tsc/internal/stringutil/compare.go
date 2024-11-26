package stringutil

import "strings"

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
	return strings.Compare(strings.ToUpper(a), strings.ToUpper(b))
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
