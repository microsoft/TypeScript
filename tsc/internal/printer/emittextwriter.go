package printer

import "github.com/microsoft/typescript-go/internal/ast"

// Externally opaque interface for printing text
type EmitTextWriter interface {
	write(s string)
	writeTrailingSemicolon(text string)
	writeComment(text string)
	writeKeyword(text string)
	writeOperator(text string)
	writePunctuation(text string)
	writeSpace(text string)
	writeStringLiteral(text string)
	writeParameter(text string)
	writeProperty(text string)
	writeSymbol(text string, symbol *ast.Symbol)
	writeLine()
	writeLineForce(force bool)
	increaseIndent()
	decreaseIndent()
	clear()
	getText() string
	rawWrite(s string)
	writeLiteral(s string)
	getTextPos() int
	getLine() int
	getColumn() int
	getIndent() int
	isAtStartOfLine() bool
	hasTrailingComment() bool
	hasTrailingWhitespace() bool
}
