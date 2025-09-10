package jsnum

import (
	"strings"
	"testing"

	"gotest.tools/v3/assert"
)

func TestParsePseudoBigInt(t *testing.T) {
	t.Parallel()

	var testNumbers []Number
	for i := range int64(1e3) {
		testNumbers = append(testNumbers, Number(i))
	}
	for bits := range 53 {
		testNumbers = append(testNumbers, Number(int64(1<<bits)), Number(int64(1<<bits)-1))
	}

	t.Run("strip base-10 strings", func(t *testing.T) {
		t.Parallel()
		for _, testNumber := range testNumbers {
			for leadingZeros := range 10 {
				assert.Equal(
					t,
					ParsePseudoBigInt(strings.Repeat("0", leadingZeros)+testNumber.String()+"n"),
					testNumber.String(),
				)
			}
		}
	})

	t.Run("parse non-decimal bases (small numbers)", func(t *testing.T) {
		t.Parallel()

		type tc struct {
			lit string
			out string
		}
		cases := []tc{
			// binary
			{lit: "0b0n", out: "0"},
			{lit: "0b1n", out: "1"},
			{lit: "0b1010n", out: "10"},
			{lit: "0b1010_0101n", out: "165"},
			{lit: "0B1101n", out: "13"}, // uppercase prefix

			// octal
			{lit: "0o0n", out: "0"},
			{lit: "0o7n", out: "7"},
			{lit: "0o755n", out: "493"},
			{lit: "0o7_5_5n", out: "493"},
			{lit: "0O12n", out: "10"}, // uppercase prefix

			// hex
			{lit: "0x0n", out: "0"},
			{lit: "0xFn", out: "15"},
			{lit: "0xFFn", out: "255"},
			{lit: "0xF_Fn", out: "255"},
			{lit: "0X1Fn", out: "31"}, // uppercase prefix
		}

		for _, c := range cases {
			got := ParsePseudoBigInt(c.lit)
			assert.Equal(t, got, c.out, "literal: %q", c.lit)
		}
	})

	t.Run("can parse large literals", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, ParsePseudoBigInt("123456789012345678901234567890n"), "123456789012345678901234567890")
		assert.Equal(t, ParsePseudoBigInt("0b1100011101110100100001111111101101100001101110011111000001110111001001110001111110000101011010010n"), "123456789012345678901234567890")
		assert.Equal(t, ParsePseudoBigInt("0o143564417755415637016711617605322n"), "123456789012345678901234567890")
		assert.Equal(t, ParsePseudoBigInt("0x18ee90ff6c373e0ee4e3f0ad2n"), "123456789012345678901234567890")
	})
}
