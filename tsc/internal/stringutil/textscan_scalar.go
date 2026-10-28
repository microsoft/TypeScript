//go:build !goexperiment.simd

package stringutil

func asciiPrefixLenLong(text string) int {
	return asciiPrefixLen(text)
}

func asciiSingleLineWhitespacePrefixLenLong(text string) int {
	return asciiSingleLineWhitespacePrefixLen(text)
}

// LineBreakPrefixLen returns the byte offset of the first possible ECMAScript
// line break (CR, LF, or the leading byte of U+2028/U+2029), or len(text).
func LineBreakPrefixLen(text string) int {
	return lineBreakPrefixLen(text)
}

// UnescapedASCIIPrefixLen returns the length of the ASCII prefix that needs no
// escaping. It conservatively stops at all controls, backslashes, and template dollars.
func UnescapedASCIIPrefixLen(text string, quote byte) int {
	return unescapedASCIIPrefixLen(text, quote)
}
