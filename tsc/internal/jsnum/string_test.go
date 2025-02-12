package jsnum

import (
	"encoding/json"
	"flag"
	"fmt"
	"math"
	"os"
	"path/filepath"
	"slices"
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil/jstest"
	"gotest.tools/v3/assert"
)

type stringTest struct {
	number Number
	str    string
}

var stringTests = slices.Concat([]stringTest{
	{NaN(), "NaN"},
	{Inf(1), "Infinity"},
	{Inf(-1), "-Infinity"},
	{0, "0"},
	{negativeZero, "0"},
	{1, "1"},
	{-1, "-1"},
	{0.3, "0.3"},
	{-0.3, "-0.3"},
	{1.5, "1.5"},
	{-1.5, "-1.5"},
	{1e308, "1e+308"},
	{-1e308, "-1e+308"},
	{math.Pi, "3.141592653589793"},
	{-math.Pi, "-3.141592653589793"},
	{MaxSafeInteger, "9007199254740991"},
	{MinSafeInteger, "-9007199254740991"},
	{numberFromBits(0x000FFFFFFFFFFFFF), "2.225073858507201e-308"},
	{numberFromBits(0x0010000000000000), "2.2250738585072014e-308"},
	{1234567.8, "1234567.8"},
	{19686109595169230000, "19686109595169230000"},
	{123.456, "123.456"},
	{-123.456, "-123.456"},
	{444123, "444123"},
	{-444123, "-444123"},
	{444123.789123456789875436, "444123.7891234568"},
	{-444123.78963636363636363636, "-444123.7896363636"},
	{1e21, "1e+21"},
	{1e20, "100000000000000000000"},
}, ryuTests)

func TestString(t *testing.T) {
	t.Parallel()

	for _, test := range stringTests {
		fInput := float64(test.number)

		t.Run(fmt.Sprintf("%v", fInput), func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, test.number.String(), test.str)
		})
	}
}

var fromStringTests = []stringTest{
	{NaN(), "    NaN"},
	{Inf(1), "Infinity    "},
	{Inf(-1), "    -Infinity"},
	{1, "1."},
	{1, "1.0   "},
	{1, "+1"},
	{1, "+1."},
	{1, "+1.0"},
	{NaN(), "whoops"},
	{0, ""},
	{0, "0"},
	{0, "0."},
	{0, "0.0"},
	{0, "0.0000"},
	{0, ".0000"},
	{negativeZero, "-0"},
	{negativeZero, "-0."},
	{negativeZero, "-0.0"},
	{negativeZero, "-.0"},
	{NaN(), "."},
	{NaN(), "e"},
	{NaN(), ".e"},
	{NaN(), "+"},
	{0, "0X0"},
	{NaN(), "e0"},
	{NaN(), "E0"},
	{NaN(), "1e"},
	{NaN(), "1e+"},
	{NaN(), "1e-"},
	{1, "1e+0"},
	{NaN(), "++0"},
	{NaN(), "0_0"},
	{Inf(1), "1e1000"},
	{Inf(-1), "-1e1000"},
	{0, ".0e0"},
	{NaN(), "0e++0"},
	{10, "0XA"},
	{0b1010, "0b1010"},
	{0b1010, "0B1010"},
	{0o12, "0o12"},
	{0o12, "0O12"},
	{0x123456789abcdef0, "0x123456789abcdef0"},
	{0x123456789abcdef0, "0X123456789ABCDEF0"},
	{18446744073709552000, "0X10000000000000000"},
	{18446744073709597000, "0X1000000000000A801"},
	{NaN(), "0B0.0"},
	{1.231235345083403e+91, "12312353450834030486384068034683603046834603806830644850340602384608368034634603680348603864"},
	{NaN(), "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX8OOOOOOOOOOOOOOOOOOO"},
	{Inf(1), "+Infinity"},
	{1234.56, "  \t1234.56  "},
	{NaN(), "\u200b"},
	{0, " "},
	{0, "\n"},
	{0, "\r"},
	{0, "\r\n"},
	{0, "\u2028"},
	{0, "\u2029"},
	{0, "\t"},
	{0, "\v"},
	{0, "\f"},
	{0, "\uFEFF"},
	{0, "\u00A0"},
	{10000000000000000000, "010000000000000000000"},
	{NaN(), "0x1.fffffffffffffp1023"}, // Make sure Go's extended float syntax doesn't work.
	{NaN(), "0X_1FFFP-16"},
	{NaN(), "1_000"}, // NumberToString doesn't handle underscores.
	{0, "0x0"},
	{0, "0X0"},
	{NaN(), "0xOOPS"},
	{0xABCDEF, "0xABCDEF"},
	{0xABCDEF, "0xABCDEF"},
	{0, "0o0"},
	{0, "0O0"},
	{NaN(), "0o8"},
	{NaN(), "0O8"},
	{0o12345, "0o12345"},
	{0o12345, "0O12345"},
	{0, "0b0"},
	{0, "0B0"},
	{NaN(), "0b2"},
	{NaN(), "0b2"},
	{0b10101, "0b10101"},
	{0b10101, "0B10101"},
	{NaN(), "1.f"},
	{NaN(), "1.e"},
	{NaN(), "1.0ef"},
	{NaN(), "1.0e"},
	{NaN(), ".f"},
	{NaN(), ".e"},
	{NaN(), ".0ef"},
	{NaN(), ".0e"},
	{NaN(), "a.f"},
	{NaN(), "a.e"},
	{NaN(), "a.0ef"},
	{NaN(), "a.0e"},
}

func TestFromString(t *testing.T) {
	t.Parallel()

	t.Run("stringTests", func(t *testing.T) {
		t.Parallel()
		for _, test := range stringTests {
			t.Run(test.str, func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, FromString(test.str), test.number)
				assertEqualNumber(t, FromString(test.str+" "), test.number)
				assertEqualNumber(t, FromString(" "+test.str), test.number)
			})
		}
	})

	t.Run("fromStringTests", func(t *testing.T) {
		t.Parallel()
		for _, test := range fromStringTests {
			t.Run(test.str, func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, FromString(test.str), test.number)
			})
		}
	})
}

func TestStringRoundtrip(t *testing.T) {
	t.Parallel()

	for _, test := range stringTests {
		t.Run(test.str, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, FromString(test.str).String(), test.str)
		})
	}
}

func TestStringJS(t *testing.T) {
	t.Parallel()
	jstest.SkipIfNoNodeJS(t)

	t.Run("stringTests", func(t *testing.T) {
		t.Parallel()

		// These tests should roundtrip both ways.
		stringTestsResults := getStringResultsFromJS(t, stringTests)
		for i, test := range stringTests {
			t.Run(fmt.Sprintf("%v", float64(test.number)), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, stringTestsResults[i].number, test.number)
				assert.Equal(t, stringTestsResults[i].str, test.str)
			})
		}
	})

	t.Run("fromStringTests", func(t *testing.T) {
		t.Parallel()

		// These tests should convert the string to the same number.
		fromStringTestsResults := getStringResultsFromJS(t, fromStringTests)
		for i, test := range fromStringTests {
			t.Run(fmt.Sprintf("fromString %q", test.str), func(t *testing.T) {
				t.Parallel()
				assertEqualNumber(t, fromStringTestsResults[i].number, test.number)
			})
		}
	})
}

func isFuzzing() bool {
	return flag.CommandLine.Lookup("test.fuzz").Value.String() != ""
}

func FuzzStringJS(f *testing.F) {
	jstest.SkipIfNoNodeJS(f)

	if isFuzzing() {
		// Avoid running anything other than regressions in the fuzzing mode.
		for _, test := range stringTests {
			f.Add(float64(test.number))
		}
		for _, test := range fromStringTests {
			f.Add(float64(test.number))
		}
	}

	f.Fuzz(func(t *testing.T, f float64) {
		n := Number(f)
		nStr := n.String()

		results := getStringResultsFromJS(t, []stringTest{{number: n, str: nStr}})
		assert.Equal(t, len(results), 1)

		nToJSStr := results[0].str
		nStrToJSNumber := results[0].number

		assert.Equal(t, nStr, nToJSStr)
		assertEqualNumber(t, n, nStrToJSNumber)
	})
}

func FuzzFromStringJS(f *testing.F) {
	jstest.SkipIfNoNodeJS(f)

	if isFuzzing() {
		// Avoid running anything other than regressions in the fuzzing mode.
		for _, test := range stringTests {
			f.Add(test.str)
		}
		for _, test := range fromStringTests {
			f.Add(test.str)
		}
	}

	f.Fuzz(func(t *testing.T, s string) {
		if len(s) > 350 {
			t.Skip()
		}

		n := FromString(s)
		results := getStringResultsFromJS(t, []stringTest{{str: s}})
		assert.Equal(t, len(results), 1)
		assertEqualNumber(t, n, results[0].number)
	})
}

func getStringResultsFromJS(t testing.TB, tests []stringTest) []stringTest {
	t.Helper()
	tmpdir := t.TempDir()

	type data struct {
		Bits [2]uint32 `json:"bits"`
		Str  string    `json:"str"`
	}

	inputData := make([]data, len(tests))
	for i, test := range tests {
		inputData[i] = data{
			Bits: numberToUint32Array(test.number),
			Str:  test.str,
		}
	}

	jsonInput, err := json.Marshal(inputData)
	assert.NilError(t, err)

	jsonInputPath := filepath.Join(tmpdir, "input.json")
	err = os.WriteFile(jsonInputPath, jsonInput, 0o644)
	assert.NilError(t, err)

	script := `
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

			const output = input.map((input) => ({
				str: ""+fromBits(input.bits),
				bits: toBits(+input.str),	
			}));

			return output;
		};
	`

	outputData, err := jstest.EvalNodeScript[[]data](t, script, tmpdir, jsonInputPath)
	assert.NilError(t, err)
	assert.Equal(t, len(outputData), len(tests))

	output := make([]stringTest, len(tests))
	for i, outputDatum := range outputData {
		output[i] = stringTest{
			number: uint32ArrayToNumber(outputDatum.Bits),
			str:    outputDatum.Str,
		}
	}

	return output
}

func numberToUint32Array(n Number) [2]uint32 {
	bits := numberToBits(n)
	return [2]uint32{uint32(bits), uint32(bits >> 32)}
}

func uint32ArrayToNumber(a [2]uint32) Number {
	bits := uint64(a[0]) | uint64(a[1])<<32
	return numberFromBits(bits)
}
