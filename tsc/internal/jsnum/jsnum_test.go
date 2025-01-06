package jsnum

import (
	"fmt"
	"math"
	"testing"

	"gotest.tools/v3/assert"
)

const (
	maxSafeInteger = 1<<53 - 1
	minSafeInteger = -maxSafeInteger
)

var toInt32Tests = []struct {
	name  string
	input float64
	want  int32
	bench bool
}{
	{"0.0", 0, 0, true},
	{"-0.0", negativeZero, 0, false},
	{"NaN", math.NaN(), 0, true},
	{"+Inf", math.Inf(1), 0, true},
	{"-Inf", math.Inf(-1), 0, true},
	{"MaxInt32", float64(math.MaxInt32), math.MaxInt32, false},
	{"MaxInt32+1", float64(int64(math.MaxInt32) + 1), math.MinInt32, true},
	{"MinInt32", float64(math.MinInt32), math.MinInt32, false},
	{"MinInt32-1", float64(int64(math.MinInt32) - 1), math.MaxInt32, true},
	{"MIN_SAFE_INTEGER", minSafeInteger, 1, false},
	{"MIN_SAFE_INTEGER-1", minSafeInteger - 1, 0, false},
	{"MIN_SAFE_INTEGER+1", minSafeInteger + 1, 2, false},
	{"MAX_SAFE_INTEGER", maxSafeInteger, -1, true},
	{"MAX_SAFE_INTEGER-1", maxSafeInteger - 1, -2, true},
	{"MAX_SAFE_INTEGER+1", maxSafeInteger + 1, 0, true},
	{"-8589934590", -8589934590, 2, false},
	{"0xDEADBEEF", 0xDEADBEEF, -559038737, true},
	{"4294967808", 4294967808, 512, false},
	{"-0.4", -0.4, 0, false},
	{"SmallestNonzeroFloat64", math.SmallestNonzeroFloat64, 0, false},
	{"-SmallestNonzeroFloat64", -math.SmallestNonzeroFloat64, 0, false},
	{"MaxFloat64", math.MaxFloat64, 0, false},
	{"-MaxFloat64", -math.MaxFloat64, 0, false},
	{"Largest subnormal number", math.Float64frombits(0x000FFFFFFFFFFFFF), 0, false},
	{"Smallest positive normal number", math.Float64frombits(0x0010000000000000), 0, false},
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
		t.Run(fmt.Sprintf("%s (%v)", test.name, test.input), func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, toInt32(test.input), test.want)
		})
	}
}

var sink int32

func BenchmarkToInt32(b *testing.B) {
	for _, test := range toInt32Tests {
		if !test.bench {
			continue
		}

		b.Run(fmt.Sprintf("%s (%v)", test.name, test.input), func(b *testing.B) {
			for range b.N {
				sink = toInt32(test.input)
			}
		})
	}
}

func TestBitwiseNOT(t *testing.T) {
	t.Parallel()

	assert.Equal(t, BitwiseNOT(-2147483649), BitwiseNOT(2147483647))
	assert.Equal(t, BitwiseNOT(-4294967296), BitwiseNOT(0))
	assert.Equal(t, BitwiseNOT(-2147483648), BitwiseNOT(-2147483648))
	assert.Equal(t, BitwiseNOT(-4294967296), BitwiseNOT(0))
}

func TestBitwiseAND(t *testing.T) {
	t.Parallel()

	assert.Equal(t, BitwiseAND(1, 0), 0.0)
	assert.Equal(t, BitwiseAND(1, 1), 1.0)
}

func TestBitwiseOR(t *testing.T) {
	t.Parallel()

	assert.Equal(t, BitwiseOR(1, 0), 1.0)
	assert.Equal(t, BitwiseOR(1, 1), 1.0)
}

func TestBitwiseXOR(t *testing.T) {
	t.Parallel()

	assert.Equal(t, BitwiseXOR(1, 0), 1.0)
	assert.Equal(t, BitwiseXOR(1, 1), 0.0)
}

func TestSignedRightShift(t *testing.T) {
	t.Parallel()

	assert.Equal(t, SignedRightShift(1, 0), 1.0)
	assert.Equal(t, SignedRightShift(1, 1), 0.0)
	assert.Equal(t, SignedRightShift(1, 2), 0.0)
	assert.Equal(t, SignedRightShift(1, 31), 0.0)
	assert.Equal(t, SignedRightShift(1, 32), 1.0)

	assert.Equal(t, SignedRightShift(-4, 0), -4.0)
	assert.Equal(t, SignedRightShift(-4, 1), -2.0)
	assert.Equal(t, SignedRightShift(-4, 2), -1.0)
	assert.Equal(t, SignedRightShift(-4, 3), -1.0)
	assert.Equal(t, SignedRightShift(-4, 4), -1.0)
	assert.Equal(t, SignedRightShift(-4, 31), -1.0)
	assert.Equal(t, SignedRightShift(-4, 32), -4.0)
	assert.Equal(t, SignedRightShift(-4, 33), -2.0)
}

func TestUnsignedRightShift(t *testing.T) {
	t.Parallel()

	assert.Equal(t, UnsignedRightShift(1, 0), 1.0)
	assert.Equal(t, UnsignedRightShift(1, 1), 0.0)
	assert.Equal(t, UnsignedRightShift(1, 2), 0.0)
	assert.Equal(t, UnsignedRightShift(1, 31), 0.0)
	assert.Equal(t, UnsignedRightShift(1, 32), 1.0)

	assert.Equal(t, UnsignedRightShift(-4, 0), 4294967292.0)
	assert.Equal(t, UnsignedRightShift(-4, 1), 2147483646.0)
	assert.Equal(t, UnsignedRightShift(-4, 2), 1073741823.0)
	assert.Equal(t, UnsignedRightShift(-4, 3), 536870911.0)
	assert.Equal(t, UnsignedRightShift(-4, 4), 268435455.0)
	assert.Equal(t, UnsignedRightShift(-4, 31), 1.0)
	assert.Equal(t, UnsignedRightShift(-4, 32), 4294967292.0)
	assert.Equal(t, UnsignedRightShift(-4, 33), 2147483646.0)
}

func TestLeftShift(t *testing.T) {
	t.Parallel()

	assert.Equal(t, LeftShift(1, 0), 1.0)
	assert.Equal(t, LeftShift(1, 1), 2.0)
	assert.Equal(t, LeftShift(1, 2), 4.0)
	assert.Equal(t, LeftShift(1, 31), -2147483648.0)
	assert.Equal(t, LeftShift(1, 32), 1.0)

	assert.Equal(t, LeftShift(-4, 0), -4.0)
	assert.Equal(t, LeftShift(-4, 1), -8.0)
	assert.Equal(t, LeftShift(-4, 2), -16.0)
	assert.Equal(t, LeftShift(-4, 3), -32.0)
	assert.Equal(t, LeftShift(-4, 31), 0.0)
	assert.Equal(t, LeftShift(-4, 32), -4.0)
}

func TestRemainder(t *testing.T) {
	t.Parallel()

	assert.Assert(t, math.IsNaN(Remainder(math.NaN(), 1)))
	assert.Assert(t, math.IsNaN(Remainder(1, math.NaN())))

	assert.Assert(t, math.IsNaN(Remainder(math.Inf(1), 1)))
	assert.Assert(t, math.IsNaN(Remainder(math.Inf(-1), 1)))

	assert.Equal(t, Remainder(123, math.Inf(1)), 123.0)
	assert.Equal(t, Remainder(123, math.Inf(-1)), 123.0)

	assert.Assert(t, math.IsNaN(Remainder(123, 0)))
	assert.Assert(t, math.IsNaN(Remainder(123, negativeZero)))

	assert.Equal(t, Remainder(0, 123), 0.0)
	assert.Equal(t, Remainder(negativeZero, 123), negativeZero)
}

func TestExponentiate(t *testing.T) {
	t.Parallel()

	assert.Equal(t, Exponentiate(2, 3), 8.0)

	assert.Equal(t, Exponentiate(math.Inf(1), 3), math.Inf(1))
	assert.Equal(t, Exponentiate(math.Inf(1), -5), 0.0)

	assert.Equal(t, Exponentiate(math.Inf(-1), 3), math.Inf(-1))
	assert.Equal(t, Exponentiate(math.Inf(-1), 4), math.Inf(1))
	assert.Equal(t, Exponentiate(math.Inf(-1), -3), negativeZero)
	assert.Equal(t, Exponentiate(math.Inf(-1), -4), 0.0)

	assert.Equal(t, Exponentiate(0, 3), 0.0)
	assert.Equal(t, Exponentiate(0, -10), math.Inf(1))

	assert.Equal(t, Exponentiate(negativeZero, 3), negativeZero)
	assert.Equal(t, Exponentiate(negativeZero, 4), 0.0)
	assert.Equal(t, Exponentiate(negativeZero, -3), math.Inf(-1))
	assert.Equal(t, Exponentiate(negativeZero, -4), math.Inf(1))

	assert.Equal(t, Exponentiate(3, math.Inf(1)), math.Inf(1))
	assert.Equal(t, Exponentiate(-3, math.Inf(1)), math.Inf(1))

	assert.Equal(t, Exponentiate(3, math.Inf(-1)), 0.0)
	assert.Equal(t, Exponentiate(-3, math.Inf(-1)), 0.0)

	assert.Assert(t, math.IsNaN(Exponentiate(math.NaN(), 3)))
	assert.Assert(t, math.IsNaN(Exponentiate(1, math.Inf(1))))
	assert.Assert(t, math.IsNaN(Exponentiate(1, math.Inf(-1))))
	assert.Assert(t, math.IsNaN(Exponentiate(-1, math.Inf(1))))
	assert.Assert(t, math.IsNaN(Exponentiate(-1, math.Inf(-1))))
	assert.Assert(t, math.IsNaN(Exponentiate(1, math.NaN())))
}
