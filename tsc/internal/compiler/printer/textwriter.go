package printer

import (
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/stringutil"
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

func (w *textWriter) clear() {
	*w = textWriter{newLine: w.newLine, lineStart: true}
}

func (w *textWriter) decreaseIndent() {
	w.indent--
}

func (w *textWriter) getColumn() int {
	if w.lineStart {
		return w.indent * 4
	}
	return w.builder.Len() - w.linePos
}

func (w *textWriter) getIndent() int {
	return w.indent
}

func (w *textWriter) getLine() int {
	return w.lineCount
}

func (w *textWriter) getText() string {
	return w.builder.String()
}

func (w *textWriter) getTextPos() int {
	return w.builder.Len()
}

func (w textWriter) hasTrailingComment() bool {
	return w.hasTrailingCommentState
}

func (w *textWriter) hasTrailingWhitespace() bool {
	if w.builder.Len() == 0 {
		return false
	}
	ch, _ := utf8.DecodeLastRuneInString(w.lastWritten)
	if ch == utf8.RuneError {
		return false
	}
	return stringutil.IsWhiteSpaceLike(ch)
}

func (w *textWriter) increaseIndent() {
	w.indent++
}

func (w *textWriter) isAtStartOfLine() bool {
	return w.lineStart
}

func (w *textWriter) rawWrite(s string) {
	if s != "" {
		w.builder.WriteString(s)
		w.lastWritten = s
		w.updateLineCountAndPosFor(s)
		w.hasTrailingCommentState = false
	}
}

func (w *textWriter) updateLineCountAndPosFor(s string) {
	lineStartsOfS := stringutil.ComputeLineStarts(s)
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

func (w *textWriter) write(s string) {
	if s != "" {
		w.hasTrailingCommentState = false
	}
	w.writeText(s)
}

func (w *textWriter) writeComment(text string) {
	if text != "" {
		w.hasTrailingCommentState = true
	}
	w.writeText(text)
}

func (w *textWriter) writeKeyword(text string) {
	w.write(text)
}

func (w *textWriter) writeLineRaw() {
	w.builder.WriteString(w.newLine)
	w.lastWritten = w.newLine
	w.lineCount++
	w.linePos = w.builder.Len()
	w.lineStart = true
	w.hasTrailingCommentState = false
}

func (w *textWriter) writeLine() {
	if !w.lineStart {
		w.writeLineRaw()
	}
}

func (w *textWriter) writeLineForce(force bool) {
	if !w.lineStart || force {
		w.writeLineRaw()
	}
}

func (w *textWriter) writeLiteral(s string) {
	w.write(s)
}

func (w *textWriter) writeOperator(text string) {
	w.write(text)
}

func (w *textWriter) writeParameter(text string) {
	w.write(text)
}

func (w *textWriter) writeProperty(text string) {
	w.write(text)
}

func (w *textWriter) writePunctuation(text string) {
	w.write(text)
}

func (w *textWriter) writeSpace(text string) {
	w.write(text)
}

func (w *textWriter) writeStringLiteral(text string) {
	w.write(text)
}

func (w *textWriter) writeSymbol(text string, symbol ast.Symbol) {
	w.write(text)
}

func (w *textWriter) writeTrailingSemicolon(text string) {
	w.write(text)
}

func NewTextWriter(newLine string) EmitTextWriter {
	var w textWriter
	w.clear()
	return &w
}
