package jsnum

import (
	"encoding/json"
	"errors"
	"math"
	"math/big"
	"strconv"
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/stringutil"
)

// https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-tostring
func (n Number) String() string {
	switch {
	case n.IsNaN():
		return "NaN"
	case n.IsInf():
		if n < 0 {
			return "-Infinity"
		}
		return "Infinity"
	}

	// Fast path: for safe integers, directly convert to string.
	if MinSafeInteger <= n && n <= MaxSafeInteger {
		if i := int64(n); float64(i) == float64(n) {
			return strconv.FormatInt(i, 10)
		}
	}

	// Otherwise, the Go json package handles this correctly.
	b, _ := json.Marshal(float64(n)) //nolint:errchkjson
	return string(b)
}

// https://tc39.es/ecma262/2024/multipage/abstract-operations.html#sec-stringtonumber
func FromString(s string) Number {
	// Implementing StringToNumber exactly as written in the spec involves
	// writing a parser, along with the conversion of the parsed AST into the
	// actual value.
	//
	// We've already implemented a number parser in the scanner, but we can't
	// import it here. We also do not have the conversion implemented since we
	// previously just wrote `+literal` and let the runtime handle it.
	//
	// The strategy below is to instead break the number apart and fix it up
	// such that Go's own parsing functionality can handle it. This won't be
	// the fastest method, but it saves us from writing the full parser and
	// conversion logic.

	s = strings.TrimFunc(s, isStrWhiteSpace)

	switch s {
	case "":
		return 0
	case "Infinity", "+Infinity":
		return Inf(1)
	case "-Infinity":
		return Inf(-1)
	}

	for _, r := range s {
		if !isNumberRune(r) {
			return NaN()
		}
	}

	if n, ok := tryParseInt(s); ok {
		return n
	}

	// Cut this off first so we can ensure -0 is returned as -0.
	s, negative := strings.CutPrefix(s, "-")

	if !negative {
		s, _ = strings.CutPrefix(s, "+")
	}

	if first, _ := utf8.DecodeRuneInString(s); !stringutil.IsDigit(first) && first != '.' {
		return NaN()
	}

	f := parseFloatString(s)
	if math.IsNaN(f) {
		return NaN()
	}

	sign := 1.0
	if negative {
		sign = -1.0
	}
	return Number(math.Copysign(f, sign))
}

func isStrWhiteSpace(r rune) bool {
	// This is different than stringutil.IsWhiteSpaceLike.

	// https://tc39.es/ecma262/2024/multipage/ecmascript-language-lexical-grammar.html#prod-LineTerminator
	// https://tc39.es/ecma262/2024/multipage/ecmascript-language-lexical-grammar.html#prod-WhiteSpace

	switch r {
	// LineTerminator
	case '\n', '\r', 0x2028, 0x2029:
		return true
	// WhiteSpace
	case '\t', '\v', '\f', 0xFEFF:
		return true
	}

	// WhiteSpace
	return unicode.Is(unicode.Zs, r)
}

var errUnknownPrefix = errors.New("unknown number prefix")

func tryParseInt(s string) (Number, bool) {
	var i int64
	var err error
	var hasIntResult bool

	if len(s) > 2 {
		prefix, rest := s[:2], s[2:]
		switch prefix {
		case "0b", "0B":
			if !isAllBinaryDigits(rest) {
				return NaN(), true
			}
			i, err = strconv.ParseInt(rest, 2, 64)
			hasIntResult = true
		case "0o", "0O":
			if !isAllOctalDigits(rest) {
				return NaN(), true
			}
			i, err = strconv.ParseInt(rest, 8, 64)
			hasIntResult = true
		case "0x", "0X":
			if !isAllHexDigits(rest) {
				return NaN(), true
			}
			i, err = strconv.ParseInt(rest, 16, 64)
			hasIntResult = true
		}
	}

	if !hasIntResult {
		// StringToNumber does not parse leading zeros as octal.
		s = trimLeadingZeros(s)
		if !isAllDigits(s) {
			return 0, false
		}
		i, err = strconv.ParseInt(s, 10, 64)
		hasIntResult = true
	}

	if hasIntResult && err == nil {
		return Number(i), true
	}

	// Using this to parse large integers.
	bi, ok := new(big.Int).SetString(s, 0)
	if !ok {
		return NaN(), true
	}

	f, _ := bi.Float64()
	return Number(f), true
}

func parseFloatString(s string) float64 {
	var hasDot, hasExp bool

	// <a>
	// <a>.<b>
	// <a>.<b>e<c>
	// <a>e<c>
	var a, b, c, rest string

	a, rest, hasDot = strings.Cut(s, ".")
	if hasDot {
		// <a>.<b>
		// <a>.<b>e<c>
		b, c, hasExp = cutAny(rest, "eE")
	} else {
		// <a>
		// <a>e<c>
		a, c, hasExp = cutAny(s, "eE")
	}

	var sb strings.Builder
	sb.Grow(len(a) + len(b) + len(c) + 3)

	if a == "" {
		if hasDot && b == "" {
			return math.NaN()
		}
		if hasExp && c == "" {
			return math.NaN()
		}
		sb.WriteString("0")
	} else {
		a = trimLeadingZeros(a)
		if !isAllDigits(a) {
			return math.NaN()
		}
		sb.WriteString(a)
	}

	if hasDot {
		sb.WriteString(".")
		if b == "" {
			sb.WriteString("0")
		} else {
			b = trimTrailingZeros(b)
			if !isAllDigits(b) {
				return math.NaN()
			}
			sb.WriteString(b)
		}
	}

	if hasExp {
		sb.WriteString("e")

		c, negative := strings.CutPrefix(c, "-")
		if negative {
			sb.WriteString("-")
		} else {
			c, _ = strings.CutPrefix(c, "+")
		}
		c = trimLeadingZeros(c)
		if !isAllDigits(c) {
			return math.NaN()
		}
		sb.WriteString(c)
	}

	return stringToFloat64(sb.String())
}

func cutAny(s string, cutset string) (before, after string, found bool) {
	if i := strings.IndexAny(s, cutset); i >= 0 {
		before = s[:i]
		afterAndFound := s[i:]
		_, size := utf8.DecodeRuneInString(afterAndFound)
		after = afterAndFound[size:]
		return before, after, true
	}
	return s, "", false
}

func trimLeadingZeros(s string) string {
	if strings.HasPrefix(s, "0") {
		s = strings.TrimLeft(s, "0")
		if s == "" {
			return "0"
		}
	}
	return s
}

func trimTrailingZeros(s string) string {
	if strings.HasSuffix(s, "0") {
		s = strings.TrimRight(s, "0")
		if s == "" {
			return "0"
		}
	}
	return s
}

func stringToFloat64(s string) float64 {
	if f, err := strconv.ParseFloat(s, 64); err == nil {
		return f
	} else {
		if errors.Is(err, strconv.ErrRange) {
			return f
		}
	}
	return math.NaN()
}

func isAllDigits(s string) bool {
	for _, r := range s {
		if !stringutil.IsDigit(r) {
			return false
		}
	}
	return true
}

func isAllBinaryDigits(s string) bool {
	for _, r := range s {
		if r != '0' && r != '1' {
			return false
		}
	}
	return true
}

func isAllOctalDigits(s string) bool {
	for _, r := range s {
		if !stringutil.IsOctalDigit(r) {
			return false
		}
	}
	return true
}

func isAllHexDigits(s string) bool {
	for _, r := range s {
		if !stringutil.IsHexDigit(r) {
			return false
		}
	}
	return true
}

func isNumberRune(r rune) bool {
	if stringutil.IsDigit(r) {
		return true
	}

	if 'a' <= r && r <= 'f' {
		return true
	}

	if 'A' <= r && r <= 'F' {
		return true
	}

	switch r {
	case '.', '-', '+', 'x', 'X', 'o', 'O':
		return true
	}

	return false
}
