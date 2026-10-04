package stringutil

import (
	"strings"
	"unicode"
	"unicode/utf8"
)

func ToLowerJS(str string) string {
	if ascii, ok := toLowerASCII(str); ok {
		return ascii
	}

	var builder strings.Builder
	builder.Grow(len(str))
	// casedBefore tracks whether the most recent non-Case_Ignorable code point is
	// "cased", which is the backward half of the Final_Sigma context. We
	// accumulate it as we stream so we never have to scan (or decode) backwards.
	casedBefore := false
	for i := 0; i < len(str); {
		r, size := DecodeJSStringRune(str[i:])
		i += size
		if IsSurrogate(r) {
			// A lone surrogate has no case mapping; preserve it verbatim, matching
			// String.prototype.toLowerCase. EncodeJSStringRune restores the sentinel
			// bytes because WriteRune would re-encode the surrogate as U+FFFD.
			builder.WriteString(EncodeJSStringRune(r))
		} else if mapping, ok := specialCasingMappings[r]; ok {
			if mapping.condition == specialCasingConditionFinalSigma && isFinalSigmaContext(casedBefore, str, i) {
				builder.WriteString(mapping.conditionalLower)
			} else {
				builder.WriteString(mapping.lower)
			}
		} else {
			builder.WriteRune(r)
		}
		if !isUnicodeCaseIgnorable(r) {
			casedBefore = isSigmaCased(r)
		}
	}
	return builder.String()
}

func ToUpperJS(str string) string {
	if ascii, ok := toUpperASCII(str); ok {
		return ascii
	}

	var builder strings.Builder
	builder.Grow(len(str))
	for i := 0; i < len(str); {
		r, size := DecodeJSStringRune(str[i:])
		if IsSurrogate(r) {
			// A lone surrogate has no case mapping; preserve it verbatim, matching
			// String.prototype.toUpperCase. Copy the sentinel bytes directly because
			// WriteRune would re-encode the surrogate as U+FFFD.
			builder.WriteString(str[i : i+size])
		} else if mapping, ok := specialCasingMappings[r]; ok {
			builder.WriteString(mapping.upper)
		} else {
			builder.WriteRune(r)
		}
		i += size
	}

	return builder.String()
}

func toLowerASCII(str string) (string, bool) {
	needsMapping := false
	for i := range len(str) {
		ch := str[i]
		if ch >= utf8.RuneSelf {
			return "", false
		}
		needsMapping = needsMapping || ('A' <= ch && ch <= 'Z')
	}
	if !needsMapping {
		return str, true
	}

	buf := []byte(str)
	for i, ch := range buf {
		if 'A' <= ch && ch <= 'Z' {
			buf[i] = ch + ('a' - 'A')
		}
	}
	return string(buf), true
}

func toUpperASCII(str string) (string, bool) {
	needsMapping := false
	for i := range len(str) {
		ch := str[i]
		if ch >= utf8.RuneSelf {
			return "", false
		}
		needsMapping = needsMapping || ('a' <= ch && ch <= 'z')
	}
	if !needsMapping {
		return str, true
	}

	buf := []byte(str)
	for i, ch := range buf {
		if 'a' <= ch && ch <= 'z' {
			buf[i] = ch - ('a' - 'A')
		}
	}
	return string(buf), true
}

// isFinalSigmaContext reports whether a sigma at the current position is in
// Final_Sigma context: it is preceded by a cased code point and not followed by
// one. casedBefore carries the backward half (tracked incrementally by the
// caller so we never scan backwards); afterOffset is the byte offset just past
// the sigma, from which we scan forward.
//
// ECMAScript points at Unicode Default Case Conversion for toLowerCase, and
// modern V8 reaches that behavior through Intl::ConvertToLower, which uses
// ICU root-locale lowercasing for non-Latin1 strings like Greek sigma.
// We intentionally do not delegate this to golang.org/x/text/cases: x/text
// is a general Unicode casing library, but its root-locale behavior is not
// an exact match for the JS semantics exercised by String.prototype
// .toLowerCase(), especially around Final_Sigma context. TypeScript needs the
// JS behavior itself here, so we keep the context-sensitive part explicit.
// SpiderMonkey models Final_Sigma with a more explicit context walk, while
// Unicode Table 3-17 describes it in terms of Cased and Case_Ignorable.
// We model the exposed V8/ICU behavior directly here: skip Case_Ignorable code
// points and then look for a Cased code point, exactly as Unicode Table 3-17
// defines the Final_Sigma condition. The Cased property already subsumes
// lowercase, uppercase, and titlecase letters, including the
// DerivedCoreProperties Lowercase/Uppercase extras such as ª, º, and Roman
// numerals.
func isFinalSigmaContext(casedBefore bool, str string, afterOffset int) bool {
	return casedBefore && !hasSigmaCasedAfter(str, afterOffset)
}

func hasSigmaCasedAfter(str string, start int) bool {
	for i := start; i < len(str); {
		r, size := DecodeJSStringRune(str[i:])
		i += size
		if isUnicodeCaseIgnorable(r) {
			continue
		}
		return isSigmaCased(r)
	}
	return false
}

func isSigmaCased(r rune) bool {
	return unicode.Is(unicodeCasedRanges, r)
}

func isUnicodeCaseIgnorable(r rune) bool {
	return unicode.Is(unicodeCaseIgnorableRanges, r)
}
