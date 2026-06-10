package stringutil

import "testing"

func TestJSCasing(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		got  string
		want string
	}{
		{name: "ascii lowercase", got: ToLowerJS("HELLO"), want: "hello"},
		{name: "ascii uppercase", got: ToUpperJS("hello"), want: "HELLO"},
		{name: "lowercase dotted i", got: ToLowerJS("İSPANYOL"), want: "i̇spanyol"},
		{name: "lowercase lone sigma", got: ToLowerJS("Σ"), want: "σ"},
		{name: "lowercase final sigma", got: ToLowerJS("ΟΣ"), want: "ος"},
		{name: "uppercase sharp s", got: ToUpperJS("ßfoo"), want: "SSFOO"},
		{name: "uppercase ligature", got: ToUpperJS("ﬁoo"), want: "FIOO"},
		{name: "capitalize-style uppercase", got: ToUpperJS("ß") + "foo", want: "SSfoo"},
		{name: "uncapitalize-style lowercase", got: ToLowerJS("İ") + "foo", want: "i̇foo"},
		{name: "lowercase final sigma after lowercase letter without uppercase mapping", got: ToLowerJS("ʕΣ"), want: "ʕς"},
		{name: "lowercase sigma after modifier letter", got: ToLowerJS("ʰΣ"), want: "ʰσ"},
		{name: "lowercase sigma after case ignorable ypogegrammeni", got: ToLowerJS("ͅΣ"), want: "ͅσ"},
		{name: "lowercase final sigma after feminine ordinal indicator", got: ToLowerJS("ªΣ"), want: "ªς"},
		{name: "lowercase final sigma after masculine ordinal indicator", got: ToLowerJS("ºΣ"), want: "ºς"},
		{name: "lowercase final sigma after roman numeral", got: ToLowerJS("ⅠΣ"), want: "ⅰς"},
		{name: "lowercase sigma after uppercase property added after unicode 15", got: ToLowerJS("\u1C89Σ"), want: "\u1C89σ"},
		{name: "lowercase sigma after uppercase property skewed from local v8 unicode data", got: ToLowerJS("\uA7CBΣ"), want: "\uA7CBσ"},
		{name: "lowercase sigma before immediate latin letter", got: ToLowerJS("ΣA"), want: "σa"},
		{name: "lowercase sigma before immediate roman numeral letter", got: ToLowerJS("ΣⅠ"), want: "σⅰ"},
		{name: "lowercase sigma before case ignorable then latin letter", got: ToLowerJS("ΣͅA"), want: "σͅa"},
		{name: "uppercase lone surrogate", got: ToUpperJS(EncodeJSStringRune(0xD800)), want: EncodeJSStringRune(0xD800)},
		{name: "lowercase lone surrogate", got: ToLowerJS("A" + EncodeJSStringRune(0xD800) + "B"), want: "a" + EncodeJSStringRune(0xD800) + "b"},
		{name: "uppercase lone low surrogate with text", got: ToUpperJS(EncodeJSStringRune(0xDC00) + "x"), want: EncodeJSStringRune(0xDC00) + "X"},
		{name: "lowercase lone surrogate before sigma", got: ToLowerJS(EncodeJSStringRune(0xD800) + "Σ"), want: EncodeJSStringRune(0xD800) + "σ"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if tt.got != tt.want {
				t.Fatalf("got %q, want %q", tt.got, tt.want)
			}
		})
	}
}
