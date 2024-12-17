package printer

import (
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

var SingleLineStringWriter EmitTextWriter = &singleLineStringWriter{}

type singleLineStringWriter struct {
	builder     strings.Builder
	lastWritten string
}

func (w *singleLineStringWriter) Clear() {
	w.lastWritten = ""
	w.builder.Reset()
}

func (w singleLineStringWriter) DecreaseIndent() {
	// Do Nothing
}

func (w singleLineStringWriter) GetColumn() int {
	return 0
}

func (w singleLineStringWriter) GetIndent() int {
	return 0
}

func (w singleLineStringWriter) GetLine() int {
	return 0
}

func (w singleLineStringWriter) String() string {
	return w.builder.String()
}

func (w singleLineStringWriter) GetTextPos() int {
	return w.builder.Len()
}

func (w singleLineStringWriter) HasTrailingComment() bool {
	return false
}

func (w singleLineStringWriter) HasTrailingWhitespace() bool {
	if w.builder.Len() == 0 {
		return false
	}
	ch, _ := utf8.DecodeLastRuneInString(w.lastWritten)
	if ch == utf8.RuneError {
		return false
	}
	return stringutil.IsWhiteSpaceLike(ch)
}

func (w singleLineStringWriter) IncreaseIndent() {
	// Do Nothing
}

func (w singleLineStringWriter) IsAtStartOfLine() bool {
	return false
}

func (w *singleLineStringWriter) RawWrite(s string) {
	w.lastWritten = s
	w.builder.WriteString(s)
}

func (w *singleLineStringWriter) Write(s string) {
	w.lastWritten = s
	w.builder.WriteString(s)
}

func (w *singleLineStringWriter) WriteComment(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) WriteKeyword(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) WriteLine() {
	w.lastWritten = " "
	w.builder.WriteString(" ")
}

func (w *singleLineStringWriter) WriteLineForce(force bool) {
	w.lastWritten = " "
	w.builder.WriteString(" ")
}

func (w *singleLineStringWriter) WriteLiteral(s string) {
	w.lastWritten = s
	w.builder.WriteString(s)
}

func (w *singleLineStringWriter) WriteOperator(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) WriteParameter(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) WriteProperty(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) WritePunctuation(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) WriteSpace(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) WriteStringLiteral(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) WriteSymbol(text string, symbol *ast.Symbol) {
	w.lastWritten = text
	w.builder.WriteString(text)
}

func (w *singleLineStringWriter) WriteTrailingSemicolon(text string) {
	w.lastWritten = text
	w.builder.WriteString(text)
}
