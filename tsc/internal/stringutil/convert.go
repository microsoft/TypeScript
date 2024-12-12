package stringutil

import (
	"math"
	"strconv"
)

// This function should behave identically to the expression `"" + f` in JS
func FromNumber(f float64) string {
	// !!! verify that this is actually the same as JS.
	return strconv.FormatFloat(f, 'g', -1, 64)
}

// This function should behave identically to the expression `+s` in JS, including parsing binary, octal, and hex
// numeric strings
func ToNumber(s string) float64 {
	// !!! verify that this is actually the same as JS.
	floatValue, err := strconv.ParseFloat(s, 64)
	if err == nil {
		return floatValue
	}
	intValue, err := strconv.ParseInt(s, 0, 64)
	if err == nil {
		return float64(intValue)
	}
	return math.NaN()
}
