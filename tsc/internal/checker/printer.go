package checker

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
)

// TODO: Memoize once per checker to retain threadsafety
func createPrinterWithDefaults(emitContext *printer.EmitContext) *printer.Printer {
	return printer.NewPrinter(printer.PrinterOptions{}, printer.PrintHandlers{}, emitContext)
}

func createPrinterWithRemoveComments(emitContext *printer.EmitContext) *printer.Printer {
	return printer.NewPrinter(printer.PrinterOptions{RemoveComments: true}, printer.PrintHandlers{}, emitContext)
}

func createPrinterWithRemoveCommentsOmitTrailingSemicolon(emitContext *printer.EmitContext) *printer.Printer {
	// TODO: OmitTrailingSemicolon support
	return printer.NewPrinter(printer.PrinterOptions{RemoveComments: true}, printer.PrintHandlers{}, emitContext)
}

func createPrinterWithRemoveCommentsNeverAsciiEscape(emitContext *printer.EmitContext) *printer.Printer {
	return printer.NewPrinter(printer.PrinterOptions{
		RemoveComments:   true,
		NeverAsciiEscape: true,
	}, printer.PrintHandlers{}, emitContext)
}

type semicolonRemoverWriter struct {
	hasPendingSemicolon bool
	inner               printer.EmitTextWriter
}

func (s *semicolonRemoverWriter) commitSemicolon() {
	if s.hasPendingSemicolon {
		s.inner.WriteTrailingSemicolon(";")
		s.hasPendingSemicolon = false
	}
}

func (s *semicolonRemoverWriter) Clear() {
	s.inner.Clear()
}

func (s *semicolonRemoverWriter) DecreaseIndent() {
	s.commitSemicolon()
	s.inner.DecreaseIndent()
}

func (s *semicolonRemoverWriter) GetColumn() int {
	return s.inner.GetColumn()
}

func (s *semicolonRemoverWriter) GetIndent() int {
	return s.inner.GetIndent()
}

func (s *semicolonRemoverWriter) GetLine() int {
	return s.inner.GetLine()
}

func (s *semicolonRemoverWriter) GetTextPos() int {
	return s.inner.GetTextPos()
}

func (s *semicolonRemoverWriter) HasTrailingComment() bool {
	return s.inner.HasTrailingComment()
}

func (s *semicolonRemoverWriter) HasTrailingWhitespace() bool {
	return s.inner.HasTrailingWhitespace()
}

func (s *semicolonRemoverWriter) IncreaseIndent() {
	s.commitSemicolon()
	s.inner.IncreaseIndent()
}

func (s *semicolonRemoverWriter) IsAtStartOfLine() bool {
	return s.inner.IsAtStartOfLine()
}

func (s *semicolonRemoverWriter) RawWrite(s1 string) {
	s.commitSemicolon()
	s.inner.RawWrite(s1)
}

func (s *semicolonRemoverWriter) String() string {
	s.commitSemicolon()
	return s.inner.String()
}

func (s *semicolonRemoverWriter) Write(s1 string) {
	s.commitSemicolon()
	s.inner.Write(s1)
}

func (s *semicolonRemoverWriter) WriteComment(text string) {
	s.commitSemicolon()
	s.inner.WriteComment(text)
}

func (s *semicolonRemoverWriter) WriteKeyword(text string) {
	s.commitSemicolon()
	s.inner.WriteKeyword(text)
}

func (s *semicolonRemoverWriter) WriteLine() {
	s.commitSemicolon()
	s.inner.WriteLine()
}

func (s *semicolonRemoverWriter) WriteLineForce(force bool) {
	s.commitSemicolon()
	s.inner.WriteLineForce(force)
}

func (s *semicolonRemoverWriter) WriteLiteral(s1 string) {
	s.commitSemicolon()
	s.inner.WriteLiteral(s1)
}

func (s *semicolonRemoverWriter) WriteOperator(text string) {
	s.commitSemicolon()
	s.inner.WriteOperator(text)
}

func (s *semicolonRemoverWriter) WriteParameter(text string) {
	s.commitSemicolon()
	s.inner.WriteParameter(text)
}

func (s *semicolonRemoverWriter) WriteProperty(text string) {
	s.commitSemicolon()
	s.inner.WriteProperty(text)
}

func (s *semicolonRemoverWriter) WritePunctuation(text string) {
	s.commitSemicolon()
	s.inner.WritePunctuation(text)
}

func (s *semicolonRemoverWriter) WriteSpace(text string) {
	s.commitSemicolon()
	s.inner.WriteSpace(text)
}

func (s *semicolonRemoverWriter) WriteStringLiteral(text string) {
	s.commitSemicolon()
	s.inner.WriteStringLiteral(text)
}

func (s *semicolonRemoverWriter) WriteSymbol(text string, symbol *ast.Symbol) {
	s.commitSemicolon()
	s.inner.WriteSymbol(text, symbol)
}

func (s *semicolonRemoverWriter) WriteTrailingSemicolon(text string) {
	s.hasPendingSemicolon = true
}

func getTrailingSemicolonDeferringWriter(writer printer.EmitTextWriter) printer.EmitTextWriter {
	return &semicolonRemoverWriter{false, writer}
}

func (c *Checker) TypeToString(t *Type) string {
	return c.typeToString(t, nil)
}

func (c *Checker) typeToString(t *Type, enclosingDeclaration *ast.Node) string {
	return c.typeToStringEx(t, enclosingDeclaration, TypeFormatFlagsAllowUniqueESSymbolType|TypeFormatFlagsUseAliasDefinedOutsideCurrentScope)
}

func toNodeBuilderFlags(flags TypeFormatFlags) nodebuilder.Flags {
	return nodebuilder.Flags(flags & TypeFormatFlagsNodeBuilderFlagsMask)
}

func (c *Checker) TypeToStringEx(t *Type, enclosingDeclaration *ast.Node, flags TypeFormatFlags) string {
	return c.typeToStringEx(t, enclosingDeclaration, flags)
}

func (c *Checker) typeToStringEx(t *Type, enclosingDeclaration *ast.Node, flags TypeFormatFlags) string {
	writer := printer.NewTextWriter("")
	noTruncation := (c.compilerOptions.NoErrorTruncation == core.TSTrue) || (flags&TypeFormatFlagsNoTruncation != 0)
	combinedFlags := toNodeBuilderFlags(flags) | nodebuilder.FlagsIgnoreErrors
	if noTruncation {
		combinedFlags = combinedFlags | nodebuilder.FlagsNoTruncation
	}
	nodeBuilder := c.getNodeBuilder()
	typeNode := nodeBuilder.TypeToTypeNode(t, enclosingDeclaration, combinedFlags, nodebuilder.InternalFlagsNone, nil)
	if typeNode == nil {
		panic("should always get typenode")
	}
	// The unresolved type gets a synthesized comment on `any` to hint to users that it's not a plain `any`.
	// Otherwise, we always strip comments out.
	var printer *printer.Printer
	if t == c.unresolvedType {
		printer = createPrinterWithDefaults(nodeBuilder.EmitContext())
	} else {
		printer = createPrinterWithRemoveComments(nodeBuilder.EmitContext())
	}
	var sourceFile *ast.SourceFile
	if enclosingDeclaration != nil {
		sourceFile = ast.GetSourceFileOfNode(enclosingDeclaration)
	}
	printer.Write(typeNode /*sourceFile*/, sourceFile, writer, nil)
	result := writer.String()

	maxLength := defaultMaximumTruncationLength * 2
	if noTruncation {
		maxLength = noTruncationMaximumTruncationLength * 2
	}
	if maxLength > 0 && result != "" && len(result) >= maxLength {
		return result[0:maxLength-len("...")] + "..."
	}
	return result
}

func (c *Checker) SymbolToString(s *ast.Symbol) string {
	return c.symbolToString(s)
}

func (c *Checker) symbolToString(symbol *ast.Symbol) string {
	return c.symbolToStringEx(symbol, nil, ast.SymbolFlagsAll, SymbolFormatFlagsAllowAnyNodeKind)
}

func (c *Checker) SymbolToStringEx(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags, flags SymbolFormatFlags) string {
	return c.symbolToStringEx(symbol, enclosingDeclaration, meaning, flags)
}

func (c *Checker) symbolToStringEx(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags, flags SymbolFormatFlags) string {
	writer, putWriter := printer.GetSingleLineStringWriter()
	defer putWriter()

	nodeFlags := nodebuilder.FlagsIgnoreErrors
	internalNodeFlags := nodebuilder.InternalFlagsNone
	if flags&SymbolFormatFlagsUseOnlyExternalAliasing != 0 {
		nodeFlags |= nodebuilder.FlagsUseOnlyExternalAliasing
	}
	if flags&SymbolFormatFlagsWriteTypeParametersOrArguments != 0 {
		nodeFlags |= nodebuilder.FlagsWriteTypeParametersInQualifiedName
	}
	if flags&SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope != 0 {
		nodeFlags |= nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope
	}
	if flags&SymbolFormatFlagsDoNotIncludeSymbolChain != 0 {
		internalNodeFlags |= nodebuilder.InternalFlagsDoNotIncludeSymbolChain
	}
	if flags&SymbolFormatFlagsWriteComputedProps != 0 {
		internalNodeFlags |= nodebuilder.InternalFlagsWriteComputedProps
	}

	nodeBuilder := c.getNodeBuilder()
	var sourceFile *ast.SourceFile
	if enclosingDeclaration != nil {
		sourceFile = ast.GetSourceFileOfNode(enclosingDeclaration)
	}
	var printer_ *printer.Printer
	// add neverAsciiEscape for GH#39027
	if enclosingDeclaration != nil && enclosingDeclaration.Kind == ast.KindSourceFile {
		printer_ = createPrinterWithRemoveCommentsNeverAsciiEscape(nodeBuilder.EmitContext())
	} else {
		printer_ = createPrinterWithRemoveComments(nodeBuilder.EmitContext())
	}

	var builder func(symbol *ast.Symbol, meaning ast.SymbolFlags, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node
	if flags&SymbolFormatFlagsAllowAnyNodeKind != 0 {
		builder = nodeBuilder.SymbolToNode
	} else {
		builder = nodeBuilder.SymbolToEntityName
	}
	entity := builder(symbol, meaning, enclosingDeclaration, nodeFlags, internalNodeFlags, nil)         // TODO: GH#18217
	printer_.Write(entity /*sourceFile*/, sourceFile, getTrailingSemicolonDeferringWriter(writer), nil) // TODO: GH#18217
	return writer.String()
}

func (c *Checker) signatureToString(signature *Signature) string {
	return c.signatureToStringEx(signature, nil, TypeFormatFlagsNone)
}

func (c *Checker) SignatureToStringEx(signature *Signature, enclosingDeclaration *ast.Node, flags TypeFormatFlags) string {
	return c.signatureToStringEx(signature, enclosingDeclaration, flags)
}

func (c *Checker) signatureToStringEx(signature *Signature, enclosingDeclaration *ast.Node, flags TypeFormatFlags) string {
	isConstructor := signature.flags&SignatureFlagsConstruct != 0 && flags&TypeFormatFlagsWriteCallStyleSignature == 0
	var sigOutput ast.Kind
	if flags&TypeFormatFlagsWriteArrowStyleSignature != 0 {
		if isConstructor {
			sigOutput = ast.KindConstructorType
		} else {
			sigOutput = ast.KindFunctionType
		}
	} else {
		if isConstructor {
			sigOutput = ast.KindConstructSignature
		} else {
			sigOutput = ast.KindCallSignature
		}
	}
	writer, putWriter := printer.GetSingleLineStringWriter()
	defer putWriter()

	nodeBuilder := c.getNodeBuilder()
	combinedFlags := toNodeBuilderFlags(flags) | nodebuilder.FlagsIgnoreErrors | nodebuilder.FlagsWriteTypeParametersInQualifiedName
	sig := nodeBuilder.SignatureToSignatureDeclaration(signature, sigOutput, enclosingDeclaration, combinedFlags, nodebuilder.InternalFlagsNone, nil)
	printer_ := createPrinterWithRemoveCommentsOmitTrailingSemicolon(nodeBuilder.EmitContext())
	var sourceFile *ast.SourceFile
	if enclosingDeclaration != nil {
		sourceFile = ast.GetSourceFileOfNode(enclosingDeclaration)
	}
	printer_.Write(sig /*sourceFile*/, sourceFile, getTrailingSemicolonDeferringWriter(writer), nil) // TODO: GH#18217
	return writer.String()
}

func (c *Checker) typePredicateToString(typePredicate *TypePredicate) string {
	return c.typePredicateToStringEx(typePredicate, nil, TypeFormatFlagsUseAliasDefinedOutsideCurrentScope)
}

func (c *Checker) typePredicateToStringEx(typePredicate *TypePredicate, enclosingDeclaration *ast.Node, flags TypeFormatFlags) string {
	writer, putWriter := printer.GetSingleLineStringWriter()
	defer putWriter()
	nodeBuilder := c.getNodeBuilder()
	combinedFlags := toNodeBuilderFlags(flags) | nodebuilder.FlagsIgnoreErrors | nodebuilder.FlagsWriteTypeParametersInQualifiedName
	predicate := nodeBuilder.TypePredicateToTypePredicateNode(typePredicate, enclosingDeclaration, combinedFlags, nodebuilder.InternalFlagsNone, nil) // TODO: GH#18217
	printer_ := createPrinterWithRemoveComments(nodeBuilder.EmitContext())
	var sourceFile *ast.SourceFile
	if enclosingDeclaration != nil {
		sourceFile = ast.GetSourceFileOfNode(enclosingDeclaration)
	}
	printer_.Write(predicate /*sourceFile*/, sourceFile, writer, nil)
	return writer.String()
}

func (c *Checker) valueToString(value any) string {
	return ValueToString(value)
}

func (c *Checker) formatUnionTypes(types []*Type) []*Type {
	var result []*Type
	var flags TypeFlags
	for i := 0; i < len(types); i++ {
		t := types[i]
		flags |= t.flags
		if t.flags&TypeFlagsNullable == 0 {
			if t.flags&(TypeFlagsBooleanLiteral|TypeFlagsEnumLike) != 0 {
				var baseType *Type
				if t.flags&TypeFlagsBooleanLiteral != 0 {
					baseType = c.booleanType
				} else {
					baseType = c.getBaseTypeOfEnumLikeType(t)
				}
				if baseType.flags&TypeFlagsUnion != 0 {
					count := len(baseType.AsUnionType().types)
					if i+count <= len(types) && c.getRegularTypeOfLiteralType(types[i+count-1]) == c.getRegularTypeOfLiteralType(baseType.AsUnionType().types[count-1]) {
						result = append(result, baseType)
						i += count - 1
						continue
					}
				}
			}
			result = append(result, t)
		}
	}
	if flags&TypeFlagsNull != 0 {
		result = append(result, c.nullType)
	}
	if flags&TypeFlagsUndefined != 0 {
		result = append(result, c.undefinedType)
	}
	return result
}

func (c *Checker) TypeToTypeNode(t *Type, enclosingDeclaration *ast.Node, flags nodebuilder.Flags) *ast.TypeNode {
	nodeBuilder := c.getNodeBuilder()
	return nodeBuilder.TypeToTypeNode(t, enclosingDeclaration, flags, nodebuilder.InternalFlagsNone, nil)
}
