package printer

import (
	"fmt"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"gotest.tools/v3/assert"
)

func TestEscapeString(t *testing.T) {
	t.Parallel()
	data := []struct {
		s         string
		quoteChar QuoteChar
		expected  string
	}{
		{s: "", quoteChar: QuoteCharDoubleQuote, expected: ``},
		{s: "abc", quoteChar: QuoteCharDoubleQuote, expected: `abc`},
		{s: "ab\"c", quoteChar: QuoteCharDoubleQuote, expected: `ab\"c`},
		{s: "ab\tc", quoteChar: QuoteCharDoubleQuote, expected: `ab\tc`},
		{s: "ab\nc", quoteChar: QuoteCharDoubleQuote, expected: `ab\nc`},
		{s: "ab'c", quoteChar: QuoteCharDoubleQuote, expected: `ab'c`},
		{s: "ab'c", quoteChar: QuoteCharSingleQuote, expected: `ab\'c`},
		{s: "ab\"c", quoteChar: QuoteCharSingleQuote, expected: `ab"c`},
		{s: "ab`c", quoteChar: QuoteCharBacktick, expected: "ab\\`c"},
		{s: "\u001f", quoteChar: QuoteCharBacktick, expected: "\\u001F"},
	}
	for i, rec := range data {
		t.Run(fmt.Sprintf("[%d] escapeString(%q, %v)", i, rec.s, rec.quoteChar), func(t *testing.T) {
			t.Parallel()
			actual := EscapeString(rec.s, rec.quoteChar)
			assert.Equal(t, actual, rec.expected)
		})
	}
}

func TestEscapeNonAsciiString(t *testing.T) {
	t.Parallel()
	data := []struct {
		s         string
		quoteChar QuoteChar
		expected  string
	}{
		{s: "", quoteChar: QuoteCharDoubleQuote, expected: ``},
		{s: "abc", quoteChar: QuoteCharDoubleQuote, expected: `abc`},
		{s: "ab\"c", quoteChar: QuoteCharDoubleQuote, expected: `ab\"c`},
		{s: "ab\tc", quoteChar: QuoteCharDoubleQuote, expected: `ab\tc`},
		{s: "ab\nc", quoteChar: QuoteCharDoubleQuote, expected: `ab\nc`},
		{s: "ab'c", quoteChar: QuoteCharDoubleQuote, expected: `ab'c`},
		{s: "ab'c", quoteChar: QuoteCharSingleQuote, expected: `ab\'c`},
		{s: "ab\"c", quoteChar: QuoteCharSingleQuote, expected: `ab"c`},
		{s: "ab`c", quoteChar: QuoteCharBacktick, expected: "ab\\`c"},
		{s: "ab\u008fc", quoteChar: QuoteCharDoubleQuote, expected: `ab\u008Fc`},
		{s: "𝟘𝟙", quoteChar: QuoteCharDoubleQuote, expected: `\uD835\uDFD8\uD835\uDFD9`},
	}
	for i, rec := range data {
		t.Run(fmt.Sprintf("[%d] escapeNonAsciiString(%q, %v)", i, rec.s, rec.quoteChar), func(t *testing.T) {
			t.Parallel()
			actual := escapeNonAsciiString(rec.s, rec.quoteChar)
			assert.Equal(t, actual, rec.expected)
		})
	}
}

func TestEscapeJsxAttributeString(t *testing.T) {
	t.Parallel()
	data := []struct {
		s         string
		quoteChar QuoteChar
		expected  string
	}{
		{s: "", quoteChar: QuoteCharDoubleQuote, expected: ""},
		{s: "abc", quoteChar: QuoteCharDoubleQuote, expected: "abc"},
		{s: "ab\"c", quoteChar: QuoteCharDoubleQuote, expected: "ab&quot;c"},
		{s: "ab\tc", quoteChar: QuoteCharDoubleQuote, expected: "ab&#x9;c"},
		{s: "ab\nc", quoteChar: QuoteCharDoubleQuote, expected: "ab&#xA;c"},
		{s: "ab'c", quoteChar: QuoteCharDoubleQuote, expected: "ab'c"},
		{s: "ab'c", quoteChar: QuoteCharSingleQuote, expected: "ab&apos;c"},
		{s: "ab\"c", quoteChar: QuoteCharSingleQuote, expected: "ab\"c"},
		{s: "ab\u008fc", quoteChar: QuoteCharDoubleQuote, expected: "ab\u008Fc"},
		{s: "𝟘𝟙", quoteChar: QuoteCharDoubleQuote, expected: "𝟘𝟙"},
	}
	for i, rec := range data {
		t.Run(fmt.Sprintf("[%d] escapeJsxAttributeString(%q, %v)", i, rec.s, rec.quoteChar), func(t *testing.T) {
			t.Parallel()
			actual := escapeJsxAttributeString(rec.s, rec.quoteChar)
			assert.Equal(t, actual, rec.expected)
		})
	}
}

func TestIsRecognizedTripleSlashComment(t *testing.T) {
	t.Parallel()
	data := []struct {
		s            string
		commentRange ast.CommentRange
		expected     bool
	}{
		{s: "", commentRange: ast.CommentRange{Kind: ast.KindMultiLineCommentTrivia}, expected: false},
		{s: "", commentRange: ast.CommentRange{Kind: ast.KindSingleLineCommentTrivia}, expected: false},
		{s: "/a", expected: false},
		{s: "//", expected: false},
		{s: "//a", expected: false},
		{s: "///", expected: false},
		{s: "///a", expected: false},
		{s: "///<reference path=\"foo\" />", expected: true},
		{s: "///<reference types=\"foo\" />", expected: true},
		{s: "///<reference lib=\"foo\" />", expected: true},
		{s: "///<reference no-default-lib=\"foo\" />", expected: true},
		{s: "///<amd-dependency path=\"foo\" />", expected: true},
		{s: "///<amd-module />", expected: true},
		{s: "/// <reference path=\"foo\" />", expected: true},
		{s: "/// <reference types=\"foo\" />", expected: true},
		{s: "/// <reference lib=\"foo\" />", expected: true},
		{s: "/// <reference no-default-lib=\"foo\" />", expected: true},
		{s: "/// <amd-dependency path=\"foo\" />", expected: true},
		{s: "/// <amd-module />", expected: true},
		{s: "/// <reference path=\"foo\"/>", expected: true},
		{s: "/// <reference types=\"foo\"/>", expected: true},
		{s: "/// <reference lib=\"foo\"/>", expected: true},
		{s: "/// <reference no-default-lib=\"foo\"/>", expected: true},
		{s: "/// <amd-dependency path=\"foo\"/>", expected: true},
		{s: "/// <amd-module/>", expected: true},
		{s: "/// <reference path='foo' />", expected: true},
		{s: "/// <reference types='foo' />", expected: true},
		{s: "/// <reference lib='foo' />", expected: true},
		{s: "/// <reference no-default-lib='foo' />", expected: true},
		{s: "/// <amd-dependency path='foo' />", expected: true},
		{s: "/// <reference path=\"foo\" />  ", expected: true},
		{s: "/// <reference types=\"foo\" />  ", expected: true},
		{s: "/// <reference lib=\"foo\" />  ", expected: true},
		{s: "/// <reference no-default-lib=\"foo\" />  ", expected: true},
		{s: "/// <amd-dependency path=\"foo\" />  ", expected: true},
		{s: "/// <amd-module />  ", expected: true},
		{s: "/// <foo />", expected: false},
		{s: "/// <reference />", expected: false},
		{s: "/// <amd-dependency />", expected: false},
	}
	for i, rec := range data {
		t.Run(fmt.Sprintf("[%d] isRecognizedTripleSlashComment()", i), func(t *testing.T) {
			t.Parallel()
			commentRange := rec.commentRange
			if commentRange.Kind == ast.KindUnknown {
				commentRange.Kind = ast.KindSingleLineCommentTrivia
				commentRange.TextRange = core.NewTextRange(0, len(rec.s))
			}
			actual := IsRecognizedTripleSlashComment(rec.s, commentRange)
			assert.Equal(t, actual, rec.expected)
		})
	}
}
