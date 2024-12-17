package printer

import "github.com/microsoft/typescript-go/internal/ast"

// Externally opaque interface for printing text
type EmitTextWriter interface {
	Write(s string)
	WriteTrailingSemicolon(text string)
	WriteComment(text string)
	WriteKeyword(text string)
	WriteOperator(text string)
	WritePunctuation(text string)
	WriteSpace(text string)
	WriteStringLiteral(text string)
	WriteParameter(text string)
	WriteProperty(text string)
	WriteSymbol(text string, symbol *ast.Symbol)
	WriteLine()
	WriteLineForce(force bool)
	IncreaseIndent()
	DecreaseIndent()
	Clear()
	String() string
	RawWrite(s string)
	WriteLiteral(s string)
	GetTextPos() int
	GetLine() int
	GetColumn() int
	GetIndent() int
	IsAtStartOfLine() bool
	HasTrailingComment() bool
	HasTrailingWhitespace() bool
}
