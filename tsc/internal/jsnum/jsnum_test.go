package jsnum

import (
	"fmt"
	"math"
	"os"
	"path/filepath"
	"testing"

	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/testutil/jstest"
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

// assertWithinOneULP checks that got and want are either equal or differ by
// at most 1 ULP (unit in the last place).
func assertWithinOneULP(t *testing.T, got, want Number) {
	t.Helper()

	if got.IsNaN() || want.IsNaN() {
		assert.Equal(t, got.IsNaN(), want.IsNaN(), "got: %v, want: %v", got, want)
		return
	}

	if got == want {
		return
	}

	gotBits := math.Float64bits(float64(got))
	wantBits := math.Float64bits(float64(want))
	if gotBits == wantBits {
		return
	}

	var ulpDist uint64
	if gotBits > wantBits {
		ulpDist = gotBits - wantBits
	} else {
		ulpDist = wantBits - gotBits
	}

	if ulpDist > 1 {
		t.Errorf("got %v (%016x), want %v (%016x) within 1 ULP (off by %d ULPs)",
			got, gotBits, want, wantBits, ulpDist)
	}
}

func numberFromBits(b uint64) Number {
	return Number(math.Float64frombits(b))
}

func numberToBits(n Number) uint64 {
	return math.Float64bits(float64(n))
}

type binaryInput struct {
	X [2]uint32 `json:"x"`
	Y [2]uint32 `json:"y"`
}

type binaryResult struct {
	X      [2]uint32 `json:"x"`
	Y      [2]uint32 `json:"y"`
	Result [2]uint32 `json:"result"`
}

type unaryInput struct {
	X [2]uint32 `json:"x"`
}

type unaryResult struct {
	X      [2]uint32 `json:"x"`
	Result [2]uint32 `json:"result"`
}

func numToUint32s(n Number) [2]uint32 {
	bits := numberToBits(n)
	return [2]uint32{uint32(bits), uint32(bits >> 32)}
}

func uint32sToNum(a [2]uint32) Number {
	bits := uint64(a[0]) | uint64(a[1])<<32
	return numberFromBits(bits)
}

// evalBinaryOp evaluates a binary JS expression on all cases using Node.js.
// Skips the calling test if Node.js is not available.
func evalBinaryOp(t *testing.T, op string, xs, ys []Number) []Number {
	t.Helper()
	jstest.SkipIfNoNodeJS(t)

	tmpdir := t.TempDir()
	inputs := make([]binaryInput, len(xs))
	for i := range xs {
		inputs[i] = binaryInput{X: numToUint32s(xs[i]), Y: numToUint32s(ys[i])}
	}

	jsonInput, err := json.Marshal(inputs)
	assert.NilError(t, err)

	inputPath := filepath.Join(tmpdir, "input.json")
	err = os.WriteFile(inputPath, jsonInput, 0o644)
	assert.NilError(t, err)

	script := fmt.Sprintf(`
		import fs from 'fs';

		function fromBits(bits) {
			const buffer = new ArrayBuffer(8);
			(new Uint32Array(buffer))[0] = bits[0];
			(new Uint32Array(buffer))[1] = bits[1];
			return new Float64Array(buffer)[0];
		}

		function toBits(number) {
			const buffer = new ArrayBuffer(8);
			(new Float64Array(buffer))[0] = number;
			return [(new Uint32Array(buffer))[0], (new Uint32Array(buffer))[1]];
		}

		export default function(inputFile) {
			const input = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
			return input.map(({x, y}) => {
				const a = fromBits(x);
				const b = fromBits(y);
				return { x, y, result: toBits(%s) };
			});
		};
	`, op)

	results, err := jstest.EvalNodeScript[[]binaryResult](t, script, tmpdir, inputPath)
	assert.NilError(t, err)
	assert.Equal(t, len(results), len(xs))

	out := make([]Number, len(results))
	for i, r := range results {
		out[i] = uint32sToNum(r.Result)
	}
	return out
}

// evalUnaryOp evaluates a unary JS expression on all cases using Node.js.
// Skips the calling test if Node.js is not available.
func evalUnaryOp(t *testing.T, op string, xs []Number) []Number {
	t.Helper()
	jstest.SkipIfNoNodeJS(t)

	tmpdir := t.TempDir()
	inputs := make([]unaryInput, len(xs))
	for i, x := range xs {
		inputs[i] = unaryInput{X: numToUint32s(x)}
	}

	jsonInput, err := json.Marshal(inputs)
	assert.NilError(t, err)

	inputPath := filepath.Join(tmpdir, "input.json")
	err = os.WriteFile(inputPath, jsonInput, 0o644)
	assert.NilError(t, err)

	script := fmt.Sprintf(`
		import fs from 'fs';

		function fromBits(bits) {
			const buffer = new ArrayBuffer(8);
			(new Uint32Array(buffer))[0] = bits[0];
			(new Uint32Array(buffer))[1] = bits[1];
			return new Float64Array(buffer)[0];
		}

		function toBits(number) {
			const buffer = new ArrayBuffer(8);
			(new Float64Array(buffer))[0] = number;
			return [(new Uint32Array(buffer))[0], (new Uint32Array(buffer))[1]];
		}

		export default function(inputFile) {
			const input = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
			return input.map(({x}) => {
				const a = fromBits(x);
				return { x, result: toBits(%s) };
			});
		};
	`, op)

	results, err := jstest.EvalNodeScript[[]unaryResult](t, script, tmpdir, inputPath)
	assert.NilError(t, err)
	assert.Equal(t, len(results), len(xs))

	out := make([]Number, len(results))
	for i, r := range results {
		out[i] = uint32sToNum(r.Result)
	}
	return out
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

	inputs := make([]Number, len(toInt32Tests))
	zeros := make([]Number, len(toInt32Tests))
	for i, test := range toInt32Tests {
		inputs[i] = test.input
	}
	for _, test := range toInt32Tests {
		t.Run(fmt.Sprintf("%s (%v)", test.name, float64(test.input)), func(t *testing.T) {
			t.Parallel()
			got := test.input.toInt32()
			assert.Equal(t, got, test.want)
		})
	}

	t.Run("Node", func(t *testing.T) {
		jsResults := evalBinaryOp(t, "a | b", inputs, zeros)
		for i, test := range toInt32Tests {
			t.Run(fmt.Sprintf("%s (%v)", test.name, float64(test.input)), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, Number(test.input.toInt32()), jsResults[i])
			})
		}
	})
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
		x, want Number
	}{
		// Original pairs: ~(-2147483649) == ~(2147483647)
		{Number(-2147483649), -2147483648},
		{Number(2147483647), -2147483648},
		// Original pairs: ~(-4294967296) == ~(0)
		{Number(-4294967296), -1},
		{0, -1},
		// Original pairs: ~(2147483648) == ~(-2147483648)
		{Number(2147483648), 2147483647},
		{Number(-2147483648), 2147483647},
		// Original pairs: ~(4294967296) == ~(0)
		{Number(4294967296), -1},
	}

	xs := make([]Number, len(tests))
	for i, test := range tests {
		xs[i] = test.x
	}
	for _, test := range tests {
		t.Run(fmt.Sprintf("~%v", test.x), func(t *testing.T) {
			t.Parallel()
			got := test.x.BitwiseNOT()
			assertEqualNumber(t, got, test.want)
		})
	}

	t.Run("Node", func(t *testing.T) {
		jsResults := evalUnaryOp(t, "~a", xs)
		for i, test := range tests {
			t.Run(fmt.Sprintf("~%v", test.x), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, test.x.BitwiseNOT(), jsResults[i])
			})
		}
	})
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

	xs := make([]Number, len(tests))
	ys := make([]Number, len(tests))
	for i, test := range tests {
		xs[i] = test.x
		ys[i] = test.y
	}
	for _, test := range tests {
		t.Run(fmt.Sprintf("%v & %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			got := test.x.BitwiseAND(test.y)
			assertEqualNumber(t, got, test.want)
		})
	}

	t.Run("Node", func(t *testing.T) {
		jsResults := evalBinaryOp(t, "a & b", xs, ys)
		for i, test := range tests {
			t.Run(fmt.Sprintf("%v & %v", test.x, test.y), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, test.x.BitwiseAND(test.y), jsResults[i])
			})
		}
	})
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

	xs := make([]Number, len(tests))
	ys := make([]Number, len(tests))
	for i, test := range tests {
		xs[i] = test.x
		ys[i] = test.y
	}
	for _, test := range tests {
		t.Run(fmt.Sprintf("%v | %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			got := test.x.BitwiseOR(test.y)
			assertEqualNumber(t, got, test.want)
		})
	}

	t.Run("Node", func(t *testing.T) {
		jsResults := evalBinaryOp(t, "a | b", xs, ys)
		for i, test := range tests {
			t.Run(fmt.Sprintf("%v | %v", test.x, test.y), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, test.x.BitwiseOR(test.y), jsResults[i])
			})
		}
	})
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

	xs := make([]Number, len(tests))
	ys := make([]Number, len(tests))
	for i, test := range tests {
		xs[i] = test.x
		ys[i] = test.y
	}
	for _, test := range tests {
		t.Run(fmt.Sprintf("%v ^ %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			got := test.x.BitwiseXOR(test.y)
			assertEqualNumber(t, got, test.want)
		})
	}

	t.Run("Node", func(t *testing.T) {
		jsResults := evalBinaryOp(t, "a ^ b", xs, ys)
		for i, test := range tests {
			t.Run(fmt.Sprintf("%v ^ %v", test.x, test.y), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, test.x.BitwiseXOR(test.y), jsResults[i])
			})
		}
	})
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

	xs := make([]Number, len(tests))
	ys := make([]Number, len(tests))
	for i, test := range tests {
		xs[i] = test.x
		ys[i] = test.y
	}
	for _, test := range tests {
		t.Run(fmt.Sprintf("%v >> %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			got := test.x.SignedRightShift(test.y)
			assertEqualNumber(t, got, test.want)
		})
	}

	t.Run("Node", func(t *testing.T) {
		jsResults := evalBinaryOp(t, "a >> b", xs, ys)
		for i, test := range tests {
			t.Run(fmt.Sprintf("%v >> %v", test.x, test.y), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, test.x.SignedRightShift(test.y), jsResults[i])
			})
		}
	})
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

	xs := make([]Number, len(tests))
	ys := make([]Number, len(tests))
	for i, test := range tests {
		xs[i] = test.x
		ys[i] = test.y
	}
	for _, test := range tests {
		t.Run(fmt.Sprintf("%v >>> %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			got := test.x.UnsignedRightShift(test.y)
			assertEqualNumber(t, got, test.want)
		})
	}

	t.Run("Node", func(t *testing.T) {
		jsResults := evalBinaryOp(t, "a >>> b", xs, ys)
		for i, test := range tests {
			t.Run(fmt.Sprintf("%v >>> %v", test.x, test.y), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, test.x.UnsignedRightShift(test.y), jsResults[i])
			})
		}
	})
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

	xs := make([]Number, len(tests))
	ys := make([]Number, len(tests))
	for i, test := range tests {
		xs[i] = test.x
		ys[i] = test.y
	}
	for _, test := range tests {
		t.Run(fmt.Sprintf("%v << %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			got := test.x.LeftShift(test.y)
			assertEqualNumber(t, got, test.want)
		})
	}

	t.Run("Node", func(t *testing.T) {
		jsResults := evalBinaryOp(t, "a << b", xs, ys)
		for i, test := range tests {
			t.Run(fmt.Sprintf("%v << %v", test.x, test.y), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, test.x.LeftShift(test.y), jsResults[i])
			})
		}
	})
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
		// Normal cases
		{10, 3, 1},
		{-10, 3, -1},
		{10, -3, 1},
		{-10, -3, -1},
		{5.5, 2, 1.5},
		{-5.5, 2, -1.5},
		{1, 0.5, 0},
		{-1, 0.5, negativeZero},
		{1.5, 1, 0.5},
		{-1.5, 1, -0.5},
		// Edge cases that prove the bug in the manual formula:
		// The manual formula n - d*(n/d).trunc() accumulates floating-point
		// rounding errors that IEEE 754 fmod (math.Mod) avoids.
		{7, 0.1, Number(math.Mod(7, 0.1))},
		{7, 0.2, Number(math.Mod(7, 0.2))},
		{7, 0.3, Number(math.Mod(7, 0.3))},
		{100, 0.3, Number(math.Mod(100, 0.3))},
	}

	xs := make([]Number, len(tests))
	ys := make([]Number, len(tests))
	for i, test := range tests {
		xs[i] = test.x
		ys[i] = test.y
	}
	for _, test := range tests {
		t.Run(fmt.Sprintf("%v %% %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			got := test.x.Remainder(test.y)
			assertEqualNumber(t, got, test.want)
		})
	}

	t.Run("Node", func(t *testing.T) {
		jsResults := evalBinaryOp(t, "a % b", xs, ys)
		for i, test := range tests {
			t.Run(fmt.Sprintf("%v %% %v", test.x, test.y), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, test.x.Remainder(test.y), jsResults[i])
			})
		}
	})
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
		// Cases where math.Pow diverges from V8 by >1 ULP.
		// Expected values are the correctly-rounded IEEE 754 results
		// computed via exact integer arithmetic (big.Int).
		// Cross-engine testing (V8, SpiderMonkey, QuickJS, XS via jsvu)
		// confirmed these match the majority of JS engines.
		{10, 308, numberFromBits(0x7fe1ccf385ebc8a0)},
		{5, 210, numberFromBits(0x5e68557f31326bbb)},
		{10, 200, numberFromBits(0x6974e718d7d7625a)},
	}

	xs := make([]Number, len(tests))
	ys := make([]Number, len(tests))
	for i, test := range tests {
		xs[i] = test.x
		ys[i] = test.y
	}
	for _, test := range tests {
		t.Run(fmt.Sprintf("%v ** %v", test.x, test.y), func(t *testing.T) {
			t.Parallel()
			got := test.x.Exponentiate(test.y)
			assertEqualNumber(t, got, test.want)
		})
	}

	// The ES spec says exponentiate is "implementation-approximated".
	// Different JS engines (V8, SpiderMonkey, JSC) use different pow
	// implementations that can differ by 1 ULP. Allow that tolerance.
	t.Run("Node", func(t *testing.T) {
		jsResults := evalBinaryOp(t, "a ** b", xs, ys)
		for i, test := range tests {
			t.Run(fmt.Sprintf("%v ** %v", test.x, test.y), func(t *testing.T) {
				t.Parallel()
				assertWithinOneULP(t, test.x.Exponentiate(test.y), jsResults[i])
			})
		}
	})
}

func BenchmarkExponentiate(b *testing.B) {
	cases := []struct {
		name     string
		base     Number
		exponent Number
	}{
		{"2**10_exact", 2, 10},           // small, fits in 53 bits → math.Pow
		{"2**53_exact", 2, 53},           // boundary, exactly 53 bits → math.Pow
		{"10**20_bigint", 10, 20},        // exceeds 53 bits → big.Int
		{"10**308_bigint", 10, 308},      // large exponent → big.Int
		{"3**34_bigint", 3, 34},          // medium → big.Int
		{"0.5**-0.5_mathpow", 0.5, -0.5}, // non-integer → math.Pow
	}

	for _, c := range cases {
		b.Run(c.name, func(b *testing.B) {
			for b.Loop() {
				c.base.Exponentiate(c.exponent)
			}
		})
	}
}
