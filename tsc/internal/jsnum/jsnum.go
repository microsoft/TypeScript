// Package jsnum provides JS-like number handling.
package jsnum

import (
	"math"
	"math/big"
)

const (
	MaxSafeInteger Number = 1<<53 - 1
	MinSafeInteger Number = -MaxSafeInteger
)

// Number represents a JS-like number.
//
// All operations that can be performed directly on this type
// (e.g., conversion, arithmetic, etc.) behave as they would in JavaScript,
// but any other operation should use this type's methods,
// not the "math" package and conversions.
type Number float64

func NaN() Number {
	return Number(math.NaN())
}

func (n Number) IsNaN() bool {
	return math.IsNaN(float64(n))
}

func Inf(sign int) Number {
	return Number(math.Inf(sign))
}

func (n Number) IsInf() bool {
	return math.IsInf(float64(n), 0)
}

func isNonFinite(x float64) bool {
	// This is equivalent to checking `math.IsNaN(x) || math.IsInf(x, 0)` in one operation.
	const mask = 0x7FF0000000000000
	return math.Float64bits(x)&mask == mask
}

// https://tc39.es/ecma262/2024/multipage/abstract-operations.html#sec-touint32
func (x Number) toUint32() uint32 {
	// The only difference between ToUint32 and ToInt32 is the interpretation of the bits.
	return uint32(x.toInt32())
}

// https://tc39.es/ecma262/2024/multipage/abstract-operations.html#sec-toint32
func (n Number) toInt32() int32 {
	x := float64(n)

	// Fast path: if the number is in the range (-2^31, 2^32), i.e. an SMI,
	// then we don't need to do any special mapping.
	if smi := int32(x); float64(smi) == x {
		return smi
	}

	// 2. If number is not finite or number is either +0𝔽 or -0𝔽, return +0𝔽.
	// Zero was covered by the test above.
	if isNonFinite(x) {
		return 0
	}

	// Let int be truncate(ℝ(number)).
	x = math.Trunc(x)
	// Let int32bit be int modulo 2**32.
	x = math.Mod(x, 1<<32)
	// If int32bit ≥ 2**31, return 𝔽(int32bit - 2**32); otherwise return 𝔽(int32bit).
	return int32(int64(x))
}

func (x Number) toShiftCount() uint32 {
	return x.toUint32() & 31
}

// https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-signedRightShift
func (x Number) SignedRightShift(y Number) Number {
	return Number(x.toInt32() >> y.toShiftCount())
}

// https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-unsignedRightShift
func (x Number) UnsignedRightShift(y Number) Number {
	return Number(x.toUint32() >> y.toShiftCount())
}

// https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-leftShift
func (x Number) LeftShift(y Number) Number {
	return Number(x.toInt32() << y.toShiftCount())
}

// https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseNOT
func (x Number) BitwiseNOT() Number {
	return Number(^x.toInt32())
}

// The below are implemented by https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numberbitwiseop.

// https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseOR
func (x Number) BitwiseOR(y Number) Number {
	return Number(x.toInt32() | y.toInt32())
}

// https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseAND
func (x Number) BitwiseAND(y Number) Number {
	return Number(x.toInt32() & y.toInt32())
}

// https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseXOR
func (x Number) BitwiseXOR(y Number) Number {
	return Number(x.toInt32() ^ y.toInt32())
}

func (x Number) trunc() Number {
	return Number(math.Trunc(float64(x)))
}

func (x Number) Floor() Number {
	return Number(math.Floor(float64(x)))
}

func (x Number) Abs() Number {
	return Number(math.Abs(float64(x)))
}

var negativeZero = Number(math.Copysign(0, -1))

// https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-remainder
func (n Number) Remainder(d Number) Number {
	switch {
	case n.IsNaN() || d.IsNaN():
		return NaN()
	case n.IsInf():
		return NaN()
	case d.IsInf():
		return n
	case d == 0:
		return NaN()
	case n == 0:
		return n
	}
	return Number(math.Mod(float64(n), float64(d)))
}

// https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-exponentiate
func (base Number) Exponentiate(exponent Number) Number {
	switch {
	case (base == 1 || base == -1) && exponent.IsInf():
		return NaN()
	case base == 1 && exponent.IsNaN():
		return NaN()
	}

	b := float64(base)
	e := float64(exponent)

	// For integer base ** integer exponent where the result exceeds 53 bits,
	// math.Pow can be off by multiple ULPs vs JS engines. Use exact big.Int
	// arithmetic and IEEE 754 round-to-nearest-even conversion instead.
	// The ES spec (§6.1.6.1.3) says exponentiate returns an
	// "implementation-approximated" value, so engines are allowed to differ.
	// This won't exactly match every engine (V8's fdlibm-compiled pow can
	// round halfway ties differently), but will always be within 1 ULP
	// (unit in the last place, i.e. the least significant bit of the result).
	if b >= math.MinInt64 && b <= math.MaxInt64 && b == math.Trunc(b) &&
		e >= 0 && e <= math.MaxInt64 && e == math.Trunc(e) && !math.IsInf(e, 0) {
		magnitude := e * math.Log2(math.Abs(b))
		if magnitude > 53 && magnitude <= math.Log2(math.MaxFloat64) {
			ri := new(big.Int).Exp(big.NewInt(int64(b)), big.NewInt(int64(e)), nil)
			result, _ := new(big.Float).SetPrec(256).SetInt(ri).Float64()
			return Number(result)
		}
	}

	return Number(math.Pow(b, e))
}
