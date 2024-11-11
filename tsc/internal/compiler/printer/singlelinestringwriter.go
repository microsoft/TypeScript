package printer

import (
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/compiler/stringutil"
)

var SingleLineStringWriter EmitTextWriter = &singleLineStringWriter{}

type singleLineStringWriter struct {
	builder     strings.Builder
	lastWritten string
}

func (w *singleLineStringWriter) clear() {
	w.lastWritten = ""
	w.builder.Reset()
}

func (w singleLineStringWriter) decreaseIndent() {
	// Do Nothing
}

func (w singleLineStringWriter) getColumn() int {
	return 0
}

func (w singleLineStringWriter) getIndent() int {
	return 0
}

func (w singleLineStringWriter) getLine() int {
	return 0
}

func (w singleLineStringWriter) getText() string {
	return w.builder.String()
}

func (w singleLineStringWriter) getTextPos() int {
	return w.builder.Len()
}

func (w singleLineStringWriter) hasTrailingComment() bool {
	return false
}

func (w singleLineStringWriter) hasTrailingWhitespace() bool {
	if w.builder.Len() == 0 {
		return false
	}
	ch, _ := utf8.DecodeLastRuneInString(w.lastWritten)
	if ch == utf8.RuneError {
		return false
	}
	return stringutil.IsWhiteSpaceLike(ch)
}

func (w singleLineStringWriter) increaseIndent() {
	// Do Nothing
}

func (w singleLineStringWriter) isAtStartOfLine() bool {
	return false
}

func (w *singleLineStringWriter) rawWrite(s string) {
	w.lastWritten = s
	w.builder.WriteString(s)
}

func (w *singleLineStringWriter) write(s string) {
	w.lastWritten = s
	w.builder.WriteString(s)
}

func (w *singleLineStringWriter) writeComment(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) writeKeyword(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) writeLine() {
	w.lastWritten = " "
	w.builder.WriteString(" ")
}

func (w *singleLineStringWriter) writeLineForce(force bool) {
	w.lastWritten = " "
	w.builder.WriteString(" ")
}

func (w *singleLineStringWriter) writeLiteral(s string) {
	w.lastWritten = s
	w.builder.WriteString(s)
}

func (w *singleLineStringWriter) writeOperator(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) writeParameter(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) writeProperty(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) writePunctuation(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) writeSpace(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) writeStringLiteral(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) writeSymbol(text string, symbol compiler.Symbol) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) writeTrailingSemicolon(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}
