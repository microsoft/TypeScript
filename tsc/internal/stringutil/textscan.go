// Builds with GOEXPERIMENT=simd use portable, vector-size-agnostic SIMD for
// long text scans. Normal builds retain scalar implementations.
package stringutil

// ASCIIPrefixLen returns the length in bytes of the leading ASCII portion of text.
func ASCIIPrefixLen(text string) int {
	// Every supported vector is at least 16 bytes. Keep short strings out of
	// the experimental SIMD runtime dispatch.
	if len(text) < 16 {
		return asciiPrefixLen(text)
	}
	return asciiPrefixLenLong(text)
}

func asciiPrefixLen(text string) int {
	for i := range len(text) {
		if text[i] >= 0x80 {
			return i
		}
	}
	return len(text)
}

// ASCIISingleLineWhitespacePrefixLen returns the length of the leading run of
// ASCII whitespace other than line breaks. Non-ASCII whitespace is left to the caller.
func ASCIISingleLineWhitespacePrefixLen(text string) int {
	if len(text) < 16 || text[0] != ' ' && text[0] != '\t' && text[0] != '\v' && text[0] != '\f' {
		return asciiSingleLineWhitespacePrefixLen(text)
	}
	return asciiSingleLineWhitespacePrefixLenLong(text)
}

func asciiSingleLineWhitespacePrefixLen(text string) int {
	for i := range len(text) {
		if b := text[i]; b != ' ' && b != '\t' && b != '\v' && b != '\f' {
			return i
		}
	}
	return len(text)
}

func lineBreakPrefixLen(text string) int {
	for i := range len(text) {
		if b := text[i]; b == '\r' || b == '\n' || b == 0xe2 {
			return i
		}
	}
	return len(text)
}

func unescapedASCIIPrefixLen(text string, quote byte) int {
	for i := range len(text) {
		b := text[i]
		if b < 0x20 || b >= 0x80 || b == '\\' || b == quote || quote == '`' && b == '$' {
			return i
		}
	}
	return len(text)
}
