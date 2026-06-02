package ls

import (
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

var _ printer.EmitTextWriter = &displayPartsWriter{}

// displayPartsWriter implements EmitTextWriter and captures classified text runs
// for VS colorized labels, while also building a plain string.
// When vsCapability is false, only the plain string is built; runs are skipped.
type displayPartsWriter struct {
	builder      strings.Builder
	runs         []*lsproto.VSClassifiedTextRun
	vsCapability bool
	lastWritten  string
}

func newDisplayPartsWriter(vsCapability bool) *displayPartsWriter {
	return &displayPartsWriter{vsCapability: vsCapability}
}

func (w *displayPartsWriter) addRun(classification lsproto.ClassificationTypeName, text string) {
	if text == "" {
		return
	}
	if w.vsCapability {
		w.runs = append(w.runs, &lsproto.VSClassifiedTextRun{
			ClassificationTypeName: string(classification),
			Text:                   text,
		})
	}
	w.lastWritten = text
	w.builder.WriteString(text)
}

// WriteClassified writes text with an explicit classification type.
func (w *displayPartsWriter) WriteClassified(text string, classification lsproto.ClassificationTypeName) {
	w.addRun(classification, text)
}

// WriteFrom copies the accumulated content from another displayPartsWriter.
func (w *displayPartsWriter) WriteFrom(other *displayPartsWriter) {
	w.builder.WriteString(other.String())
	if w.vsCapability {
		w.runs = append(w.runs, other.GetRuns()...)
	}
	if other.lastWritten != "" {
		w.lastWritten = other.lastWritten
	}
}

func (w *displayPartsWriter) GetRuns() []*lsproto.VSClassifiedTextRun {
	return w.runs
}

func (w *displayPartsWriter) String() string {
	return w.builder.String()
}

func (w *displayPartsWriter) Clear() {
	w.lastWritten = ""
	w.builder.Reset()
	w.runs = nil
}

func (w displayPartsWriter) DecreaseIndent() {}

func (w displayPartsWriter) GetColumn() core.UTF16Offset { return 0 }

func (w displayPartsWriter) GetIndent() int { return 0 }

func (w displayPartsWriter) GetLine() int { return 0 }

func (w displayPartsWriter) GetTextPos() int {
	return w.builder.Len()
}

func (w displayPartsWriter) HasTrailingComment() bool { return false }

func (w displayPartsWriter) HasTrailingWhitespace() bool {
	if w.builder.Len() == 0 {
		return false
	}
	ch, _ := utf8.DecodeLastRuneInString(w.lastWritten)
	if ch == utf8.RuneError {
		return false
	}
	return stringutil.IsWhiteSpaceLike(ch)
}

func (w displayPartsWriter) IncreaseIndent() {}

func (w displayPartsWriter) IsAtStartOfLine() bool { return false }

func (w *displayPartsWriter) RawWrite(s string) {
	w.addRun(lsproto.ClassificationTypeNameText, s)
}

func (w *displayPartsWriter) Write(s string) {
	w.addRun(lsproto.ClassificationTypeNameText, s)
}

func (w *displayPartsWriter) WriteComment(text string) {
	// Strada's writeComment uses unknownWrite → SymbolDisplayPartKind.text → "text"
	w.addRun(lsproto.ClassificationTypeNameText, text)
}

func (w *displayPartsWriter) WriteKeyword(text string) {
	w.addRun(lsproto.ClassificationTypeNameKeyword, text)
}

func (w *displayPartsWriter) WriteLine() {
	w.addRun(lsproto.ClassificationTypeNameWhiteSpace, " ")
}

func (w *displayPartsWriter) WriteLineForce(force bool) {
	w.addRun(lsproto.ClassificationTypeNameWhiteSpace, " ")
}

func (w *displayPartsWriter) WriteLiteral(s string) {
	// Strada's writeLiteral → SymbolDisplayPartKind.stringLiteral → "string"
	w.addRun(lsproto.ClassificationTypeNameString, s)
}

func (w *displayPartsWriter) WriteOperator(text string) {
	w.addRun(lsproto.ClassificationTypeNameOperator, text)
}

func (w *displayPartsWriter) WriteParameter(text string) {
	w.addRun(lsproto.ClassificationTypeNameParameterName, text)
}

func (w *displayPartsWriter) WriteProperty(text string) {
	w.addRun(lsproto.ClassificationTypeNamePropertyName, text)
}

func (w *displayPartsWriter) WritePunctuation(text string) {
	w.addRun(lsproto.ClassificationTypeNamePunctuation, text)
}

func (w *displayPartsWriter) WriteSpace(text string) {
	w.addRun(lsproto.ClassificationTypeNameWhiteSpace, text)
}

func (w *displayPartsWriter) WriteStringLiteral(text string) {
	w.addRun(lsproto.ClassificationTypeNameString, text)
}

func (w *displayPartsWriter) WriteSymbol(text string, symbol *ast.Symbol) {
	classification := classificationForSymbol(symbol)
	w.addRun(classification, text)
}

func (w *displayPartsWriter) WriteTrailingSemicolon(text string) {
	w.addRun(lsproto.ClassificationTypeNamePunctuation, text)
}

// classificationForSymbol determines the Roslyn classification type name based on a symbol's flags.
// Matches the Strada translation chain: displayPartKind() → GetClassificationName().
func classificationForSymbol(symbol *ast.Symbol) lsproto.ClassificationTypeName {
	if symbol == nil {
		return lsproto.ClassificationTypeNameText
	}
	flags := symbol.Flags
	switch {
	case flags&ast.SymbolFlagsVariable != 0:
		if isFirstDeclarationOfSymbolParameter(symbol) {
			return lsproto.ClassificationTypeNameParameterName
		}
		return lsproto.ClassificationTypeNameLocalName
	case flags&ast.SymbolFlagsProperty != 0:
		return lsproto.ClassificationTypeNamePropertyName
	case flags&ast.SymbolFlagsGetAccessor != 0:
		return lsproto.ClassificationTypeNamePropertyName
	case flags&ast.SymbolFlagsSetAccessor != 0:
		return lsproto.ClassificationTypeNamePropertyName
	case flags&ast.SymbolFlagsEnumMember != 0:
		return lsproto.ClassificationTypeNameFieldName
	case flags&ast.SymbolFlagsFunction != 0:
		return lsproto.ClassificationTypeNameMethodName
	case flags&ast.SymbolFlagsClass != 0:
		return lsproto.ClassificationTypeNameClassName
	case flags&ast.SymbolFlagsInterface != 0:
		return lsproto.ClassificationTypeNameInterfaceName
	case flags&ast.SymbolFlagsEnum != 0:
		return lsproto.ClassificationTypeNameEnumName
	case flags&ast.SymbolFlagsModule != 0:
		return lsproto.ClassificationTypeNameModuleName
	case flags&ast.SymbolFlagsMethod != 0:
		return lsproto.ClassificationTypeNameMethodName
	case flags&ast.SymbolFlagsTypeParameter != 0:
		return lsproto.ClassificationTypeNameTypeParameterName
	case flags&ast.SymbolFlagsTypeAlias != 0:
		return lsproto.ClassificationTypeNameIdentifier
	case flags&ast.SymbolFlagsAlias != 0:
		return lsproto.ClassificationTypeNameIdentifier
	default:
		return lsproto.ClassificationTypeNameText
	}
}

// isFirstDeclarationOfSymbolParameter checks if the symbol's first declaration is a parameter.
func isFirstDeclarationOfSymbolParameter(symbol *ast.Symbol) bool {
	declarations := symbol.Declarations
	if len(declarations) == 0 {
		return false
	}
	return declarations[0].Kind == ast.KindParameter
}
