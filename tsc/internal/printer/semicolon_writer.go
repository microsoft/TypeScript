package printer

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

type trailingSemicolonDeferringWriter struct {
	inner               EmitTextWriter
	hasPendingSemicolon bool
}

func getTrailingSemicolonDeferringWriter(writer EmitTextWriter) EmitTextWriter {
	return &trailingSemicolonDeferringWriter{inner: writer}
}

func (w *trailingSemicolonDeferringWriter) commitSemicolon() {
	if w.hasPendingSemicolon {
		w.inner.WriteTrailingSemicolon(";")
		w.hasPendingSemicolon = false
	}
}

func (w *trailingSemicolonDeferringWriter) Write(s string) {
	w.commitSemicolon()
	w.inner.Write(s)
}

func (w *trailingSemicolonDeferringWriter) WriteTrailingSemicolon(_ string) {
	w.hasPendingSemicolon = true
}

func (w *trailingSemicolonDeferringWriter) WriteComment(text string) {
	w.commitSemicolon()
	w.inner.WriteComment(text)
}

func (w *trailingSemicolonDeferringWriter) WriteKeyword(text string) {
	w.commitSemicolon()
	w.inner.WriteKeyword(text)
}

func (w *trailingSemicolonDeferringWriter) WriteOperator(text string) {
	w.commitSemicolon()
	w.inner.WriteOperator(text)
}

func (w *trailingSemicolonDeferringWriter) WritePunctuation(text string) {
	w.commitSemicolon()
	w.inner.WritePunctuation(text)
}

func (w *trailingSemicolonDeferringWriter) WriteSpace(text string) {
	w.commitSemicolon()
	w.inner.WriteSpace(text)
}

func (w *trailingSemicolonDeferringWriter) WriteStringLiteral(text string) {
	w.commitSemicolon()
	w.inner.WriteStringLiteral(text)
}

func (w *trailingSemicolonDeferringWriter) WriteParameter(text string) {
	w.commitSemicolon()
	w.inner.WriteParameter(text)
}

func (w *trailingSemicolonDeferringWriter) WriteProperty(text string) {
	w.commitSemicolon()
	w.inner.WriteProperty(text)
}

func (w *trailingSemicolonDeferringWriter) WriteSymbol(text string, symbol *ast.Symbol) {
	w.commitSemicolon()
	w.inner.WriteSymbol(text, symbol)
}

func (w *trailingSemicolonDeferringWriter) WriteLine() {
	w.commitSemicolon()
	w.inner.WriteLine()
}

func (w *trailingSemicolonDeferringWriter) WriteLineForce(force bool) {
	w.commitSemicolon()
	w.inner.WriteLineForce(force)
}

func (w *trailingSemicolonDeferringWriter) IncreaseIndent() {
	w.commitSemicolon()
	w.inner.IncreaseIndent()
}

func (w *trailingSemicolonDeferringWriter) DecreaseIndent() {
	w.commitSemicolon()
	w.inner.DecreaseIndent()
}

func (w *trailingSemicolonDeferringWriter) Clear() {
	w.hasPendingSemicolon = false
	w.inner.Clear()
}

func (w *trailingSemicolonDeferringWriter) String() string {
	return w.inner.String()
}

func (w *trailingSemicolonDeferringWriter) RawWrite(s string) {
	w.commitSemicolon()
	w.inner.RawWrite(s)
}

func (w *trailingSemicolonDeferringWriter) WriteLiteral(s string) {
	w.commitSemicolon()
	w.inner.WriteLiteral(s)
}

func (w *trailingSemicolonDeferringWriter) GetTextPos() int {
	return w.inner.GetTextPos()
}

func (w *trailingSemicolonDeferringWriter) GetLine() int {
	return w.inner.GetLine()
}

func (w *trailingSemicolonDeferringWriter) GetColumn() core.UTF16Offset {
	return w.inner.GetColumn()
}

func (w *trailingSemicolonDeferringWriter) GetIndent() int {
	return w.inner.GetIndent()
}

func (w *trailingSemicolonDeferringWriter) IsAtStartOfLine() bool {
	return w.inner.IsAtStartOfLine()
}

func (w *trailingSemicolonDeferringWriter) HasTrailingComment() bool {
	return w.inner.HasTrailingComment()
}

func (w *trailingSemicolonDeferringWriter) HasTrailingWhitespace() bool {
	return w.inner.HasTrailingWhitespace()
}
