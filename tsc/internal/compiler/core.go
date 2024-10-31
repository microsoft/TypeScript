package compiler

import "strings"

func EquateStringsCaseInsensitive(a, b string) bool {
	// !!!
	// return a == b || strings.ToUpper(a) == strings.ToUpper(b)
	return strings.EqualFold(a, b)
}

func EquateStringsCaseSensitive(a, b string) bool {
	return a == b
}
