package printer

import (
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

var _ EmitTextWriter = &textWriter{}

type textWriter struct {
	newLine                 string
	builder                 strings.Builder
	lastWritten             string
	indent                  int
	lineStart               bool
	lineCount               int
	linePos                 int
	hasTrailingCommentState bool
}

func (w *textWriter) Clear() {
	*w = textWriter{newLine: w.newLine, lineStart: true}
}

func (w *textWriter) DecreaseIndent() {
	w.indent--
}

func (w *textWriter) GetColumn() int {
	if w.lineStart {
		return w.indent * 4
	}
	return w.builder.Len() - w.linePos
}

func (w *textWriter) GetIndent() int {
	return w.indent
}

func (w *textWriter) GetLine() int {
	return w.lineCount
}

func (w *textWriter) String() string {
	return w.builder.String()
}

func (w *textWriter) GetTextPos() int {
	return w.builder.Len()
}

func (w textWriter) HasTrailingComment() bool {
	return w.hasTrailingCommentState
}

func (w *textWriter) HasTrailingWhitespace() bool {
	if w.builder.Len() == 0 {
		return false
	}
	ch, _ := utf8.DecodeLastRuneInString(w.lastWritten)
	if ch == utf8.RuneError {
		return false
	}
	return stringutil.IsWhiteSpaceLike(ch)
}

func (w *textWriter) IncreaseIndent() {
	w.indent++
}

func (w *textWriter) IsAtStartOfLine() bool {
	return w.lineStart
}

func (w *textWriter) RawWrite(s string) {
	if s != "" {
		w.builder.WriteString(s)
		w.lastWritten = s
		w.updateLineCountAndPosFor(s)
		w.hasTrailingCommentState = false
	}
}

func (w *textWriter) updateLineCountAndPosFor(s string) {
	lineStartsOfS := core.ComputeLineStarts(s)
	if len(lineStartsOfS) > 1 {
		w.lineCount += len(lineStartsOfS) - 1
		curLen := w.builder.Len()
		w.linePos = curLen - len(s) + int(lineStartsOfS[len(lineStartsOfS)-1])
		w.lineStart = (w.linePos - curLen) == 0
		return
	}
	w.lineStart = false
}

func getIndentString(indent int) string {
	switch indent {
	case 0:
		return ""
	case 1:
		return "    "
	default:
		// TODO: This is cached in tsc - should it be cached here?
		return strings.Repeat("    ", indent)
	}
}

func (w *textWriter) writeText(s string) {
	if s != "" {
		if w.lineStart {
			w.builder.WriteString(getIndentString(w.indent))
			w.lineStart = false
		}
		w.builder.WriteString(s)
		w.lastWritten = s
		w.updateLineCountAndPosFor(s)
	}
}

func (w *textWriter) Write(s string) {
	if s != "" {
		w.hasTrailingCommentState = false
	}
	w.writeText(s)
}

func (w *textWriter) WriteComment(text string) {
	if text != "" {
		w.hasTrailingCommentState = true
	}
	w.writeText(text)
}

func (w *textWriter) WriteKeyword(text string) {
	w.Write(text)
}

func (w *textWriter) writeLineRaw() {
	w.builder.WriteString(w.newLine)
	w.lastWritten = w.newLine
	w.lineCount++
	w.linePos = w.builder.Len()
	w.lineStart = true
	w.hasTrailingCommentState = false
}

func (w *textWriter) WriteLine() {
	if !w.lineStart {
		w.writeLineRaw()
	}
}

func (w *textWriter) WriteLineForce(force bool) {
	if !w.lineStart || force {
		w.writeLineRaw()
	}
}

func (w *textWriter) WriteLiteral(s string) {
	w.Write(s)
}

func (w *textWriter) WriteOperator(text string) {
	w.Write(text)
}

func (w *textWriter) WriteParameter(text string) {
	w.Write(text)
}

func (w *textWriter) WriteProperty(text string) {
	w.Write(text)
}

func (w *textWriter) WritePunctuation(text string) {
	w.Write(text)
}

func (w *textWriter) WriteSpace(text string) {
	w.Write(text)
}

func (w *textWriter) WriteStringLiteral(text string) {
	w.Write(text)
}

func (w *textWriter) WriteSymbol(text string, symbol *ast.Symbol) {
	w.Write(text)
}

func (w *textWriter) WriteTrailingSemicolon(text string) {
	w.Write(text)
}

func NewTextWriter(newLine string) EmitTextWriter {
	var w textWriter
	w.newLine = newLine
	w.Clear()
	return &w
}
