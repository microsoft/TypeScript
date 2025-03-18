package jsnum

import (
	"fmt"
	"math/big"
	"strings"
)

// PseudoBigInt represents a JS-like bigint.
type PseudoBigInt struct {
	Negative    bool
	Base10Value string
}

func (value PseudoBigInt) String() string {
	if len(value.Base10Value) == 0 || value.Base10Value == "0" {
		return "0"
	}
	if value.Negative {
		return "-" + value.Base10Value
	}
	return value.Base10Value
}

func (value PseudoBigInt) Sign() int {
	if len(value.Base10Value) == 0 || value.Base10Value == "0" {
		return 0
	}
	if value.Negative {
		return -1
	}
	return 1
}

func ParseValidBigInt(text string) PseudoBigInt {
	text, negative := strings.CutPrefix(text, "-")
	return PseudoBigInt{
		Negative:    negative,
		Base10Value: ParsePseudoBigInt(text),
	}
}

func ParsePseudoBigInt(stringValue string) string {
	stringValue = strings.TrimSuffix(stringValue, "n")

	var b1 byte
	if len(stringValue) > 1 {
		b1 = stringValue[1]
	}

	switch b1 {
	case 'b', 'B', 'o', 'O', 'x', 'X':
		// Not decimal.
	default:
		stringValue = strings.TrimLeft(stringValue, "0")
		if stringValue == "" {
			return "0"
		}
		return stringValue
	}

	bi, ok := new(big.Int).SetString(stringValue, 0)
	if !ok {
		panic(fmt.Sprintf("Failed to parse big int: %q", stringValue))
	}
	return bi.String() // !!!
}
