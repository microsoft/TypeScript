package jsnum

import (
	"fmt"
	"math"
	"testing"

	"gotest.tools/v3/assert"
)

func assertEqualNumber(t *testing.T, got, want Number) {
	t.Helper()

	if got.IsNaN() || want.IsNaN() {
		assert.Equal(t, got.IsNaN(), want.IsNaN(), "got: %v, want: %v", got, want)
	} else {
		assert.Equal(t, got, want)
	}
}

func numberFromBits(b uint64) Number {
	return Number(math.Float64frombits(b))
}

func numberToBits(n Number) uint64 {
	return math.Float64bits(float64(n))
}

var toInt32Tests = []struct {
	name  string
	input Number
	want  int32
	bench bool
}{
	{"0.0", 0, 0, true},
	{"-0.0", Number(negativeZero), 0, false},
	{"NaN", NaN(), 0, true},
	{"+Inf", Inf(1), 0, true},
	{"-Inf", Inf(-1), 0, true},
	{"MaxInt32", Number(math.MaxInt32), math.MaxInt32, false},
	{"MaxInt32+1", Number(int64(math.MaxInt32) + 1), math.MinInt32, true},
	{"MinInt32", Number(math.MinInt32), math.MinInt32, false},
	{"MinInt32-1", Number(int64(math.MinInt32) - 1), math.MaxInt32, true},
	{"MIN_SAFE_INTEGER", MinSafeInteger, 1, false},
	{"MIN_SAFE_INTEGER-1", MinSafeInteger - 1, 0, false},
	{"MIN_SAFE_INTEGER+1", MinSafeInteger + 1, 2, false},
	{"MAX_SAFE_INTEGER", MaxSafeInteger, -1, true},
	{"MAX_SAFE_INTEGER-1", MaxSafeInteger - 1, -2, true},
	{"MAX_SAFE_INTEGER+1", MaxSafeInteger + 1, 0, true},
	{"-8589934590", -8589934590, 2, false},
	{"0xDEADBEEF", 0xDEADBEEF, -559038737, true},
	{"4294967808", 4294967808, 512, false},
	{"-0.4", -0.4, 0, false},
	{"SmallestNonzeroFloat64", math.SmallestNonzeroFloat64, 0, false},
	{"-SmallestNonzeroFloat64", -math.SmallestNonzeroFloat64, 0, false},
	{"MaxFloat64", math.MaxFloat64, 0, false},
	{"-MaxFloat64", -math.MaxFloat64, 0, false},
	{"Largest subnormal number", numberFromBits(0x000FFFFFFFFFFFFF), 0, false},
	{"Smallest positive normal number", numberFromBits(0x0010000000000000), 0, false},
	{"Largest normal number", math.MaxFloat64, 0, false},
	{"-Largest normal number", -math.MaxFloat64, 0, false},
	{"1.0", 1.0, 1, false},
	{"-1.0", -1.0, -1, false},
	{"1e308", 1e308, 0, false},
	{"-1e308", -1e308, 0, false},
	{"math.Pi", math.Pi, 3, false},
	{"-math.Pi", -math.Pi, -3, false},
	{"math.E", math.E, 2, false},
	{"-math.E", -math.E, -2, false},
	{"0.5", 0.5, 0, false},
	{"-0.5", -0.5, 0, false},
	{"0.49999999999999994", 0.49999999999999994, 0, false},
	{"-0.49999999999999994", -0.49999999999999994, 0, false},
	{"0.5000000000000001", 0.5000000000000001, 0, false},
	{"-0.5000000000000001", -0.5000000000000001, 0, false},
	{"2^31 + 0.5", 2147483648.5, -2147483648, false},
	{"-2^31 - 0.5", -2147483648.5, -2147483648, false},
	{"2^40", 1099511627776, 0, false},
	{"-2^40", -1099511627776, 0, false},
	{"TypeFlagsNarrowable", 536624127, 536624127, true},
}

func TestToInt32(t *testing.T) {
	t.Parallel()

	for _, test := range toInt32Tests {
		t.Run(fmt.Sprintf("%s (%v)", test.name, float64(test.input)), func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, test.input.toInt32(), test.want)
		})
	}
}

func BenchmarkToInt32(b *testing.B) {
	for _, test := range toInt32Tests {
		if !test.bench {
			continue
		}

		b.Run(fmt.Sprintf("%s (%v)", test.name, float64(test.input)), func(b *testing.B) {
			for b.Loop() {
				test.input.toInt32()
			}
		})
	}
}

func TestBitwiseNOT(t *testing.T) {
	t.Parallel()

	tests := []struct {
		got, want Number
	}{
		{Number(-2147483649).BitwiseNOT(), Number(2147483647).BitwiseNOT()},
		{Number(-4294967296).BitwiseNOT(), Number(0).BitwiseNOT()},
		{Number(2147483648).BitwiseNOT(), Number(-2147483648).BitwiseNOT()},
		{Number(4294967296).BitwiseNOT(), Number(0).BitwiseNOT()},
	}

	for _, test := range tests {
		t.Run(test.got.String(), func(t *testing.T) {
			t.Parallel()
			assertEqualNumber(t, test.got, test.want)
		})
	}
}

func TestBitwiseAND(t *testing.T) {
	t.Parallel()

	tests := []struct {
		x, y, want Number
	}{
		{0, 0, 0},
		{0, 1, 0},
		{1, 0, 0},
		{1, 1, 1},
	}

	for _, test := range tests {
		t.Run(fmt.Sprintf("%v & %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			assertEqualNumber(t, test.x.BitwiseAND(test.y), test.want)
		})
	}
}

func TestBitwiseOR(t *testing.T) {
	t.Parallel()

	tests := []struct {
		x, y, want Number
	}{
		{0, 0, 0},
		{0, 1, 1},
		{1, 0, 1},
		{1, 1, 1},
	}

	for _, test := range tests {
		t.Run(fmt.Sprintf("%v | %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			assertEqualNumber(t, test.x.BitwiseOR(test.y), test.want)
		})
	}
}

func TestBitwiseXOR(t *testing.T) {
	t.Parallel()

	tests := []struct {
		x, y, want Number
	}{
		{0, 0, 0},
		{0, 1, 1},
		{1, 0, 1},
		{1, 1, 0},
	}

	for _, test := range tests {
		t.Run(fmt.Sprintf("%v ^ %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			assertEqualNumber(t, test.x.BitwiseXOR(test.y), test.want)
		})
	}
}

func TestSignedRightShift(t *testing.T) {
	t.Parallel()

	tests := []struct {
		x, y, want Number
	}{
		{1, 0, 1},
		{1, 1, 0},
		{1, 2, 0},
		{1, 31, 0},
		{1, 32, 1},
		{-4, 0, -4},
		{-4, 1, -2},
		{-4, 2, -1},
		{-4, 3, -1},
		{-4, 4, -1},
		{-4, 31, -1},
		{-4, 32, -4},
		{-4, 33, -2},
	}

	for _, test := range tests {
		t.Run(fmt.Sprintf("%v >> %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			assertEqualNumber(t, test.x.SignedRightShift(test.y), test.want)
		})
	}
}

func TestUnsignedRightShift(t *testing.T) {
	t.Parallel()

	tests := []struct {
		x, y, want Number
	}{
		{1, 0, 1},
		{1, 1, 0},
		{1, 2, 0},
		{1, 31, 0},
		{1, 32, 1},
		{-4, 0, 4294967292},
		{-4, 1, 2147483646},
		{-4, 2, 1073741823},
		{-4, 3, 536870911},
		{-4, 4, 268435455},
		{-4, 31, 1},
		{-4, 32, 4294967292},
		{-4, 33, 2147483646},
	}

	for _, test := range tests {
		t.Run(fmt.Sprintf("%v >>> %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			assertEqualNumber(t, test.x.UnsignedRightShift(test.y), test.want)
		})
	}
}

func TestLeftShift(t *testing.T) {
	t.Parallel()

	tests := []struct {
		x, y, want Number
	}{
		{1, 0, 1},
		{1, 1, 2},
		{1, 2, 4},
		{1, 31, -2147483648},
		{1, 32, 1},
		{-4, 0, -4},
		{-4, 1, -8},
		{-4, 2, -16},
		{-4, 3, -32},
		{-4, 31, 0},
		{-4, 32, -4},
	}

	for _, test := range tests {
		t.Run(fmt.Sprintf("%v << %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			assertEqualNumber(t, test.x.LeftShift(test.y), test.want)
		})
	}
}

func TestRemainder(t *testing.T) {
	t.Parallel()

	tests := []struct {
		x, y, want Number
	}{
		{NaN(), 1, NaN()},
		{1, NaN(), NaN()},
		{Inf(1), 1, NaN()},
		{Inf(-1), 1, NaN()},
		{123, Inf(1), 123},
		{123, Inf(-1), 123},
		{123, 0, NaN()},
		{123, negativeZero, NaN()},
		{0, 123, 0},
		{negativeZero, 123, negativeZero},
	}

	for _, test := range tests {
		t.Run(fmt.Sprintf("%v %% %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			assertEqualNumber(t, test.x.Remainder(test.y), test.want)
		})
	}
}

func TestExponentiate(t *testing.T) {
	t.Parallel()

	tests := []struct {
		x, y, want Number
	}{
		{2, 3, 8},
		{Inf(1), 3, Inf(1)},
		{Inf(1), -5, 0},
		{Inf(-1), 3, Inf(-1)},
		{Inf(-1), 4, Inf(1)},
		{Inf(-1), -3, negativeZero},
		{Inf(-1), -4, 0},
		{0, 3, 0},
		{0, -10, Inf(1)},
		{negativeZero, 3, negativeZero},
		{negativeZero, 4, 0},
		{negativeZero, -3, Inf(-1)},
		{negativeZero, -4, Inf(1)},
		{3, Inf(1), Inf(1)},
		{-3, Inf(1), Inf(1)},
		{3, Inf(-1), 0},
		{-3, Inf(-1), 0},
		{NaN(), 3, NaN()},
		{1, Inf(1), NaN()},
		{1, Inf(-1), NaN()},
		{-1, Inf(1), NaN()},
		{-1, Inf(-1), NaN()},
		{1, NaN(), NaN()},
	}

	for _, test := range tests {
		t.Run(fmt.Sprintf("%v ** %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			assertEqualNumber(t, test.x.Exponentiate(test.y), test.want)
		})
	}
}
