package ls

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

const (
	symbolFormatFlags = checker.SymbolFormatFlagsWriteTypeParametersOrArguments | checker.SymbolFormatFlagsUseOnlyExternalAliasing | checker.SymbolFormatFlagsAllowAnyNodeKind | checker.SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope
	typeFormatFlags   = checker.TypeFormatFlagsNone
)

func writeTypeParam(c *checker.Checker, tp *checker.Type, file *ast.SourceFile, b *strings.Builder) {
	symbol := tp.Symbol()
	b.WriteString(c.SymbolToStringEx(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags))
	cons := c.GetConstraintOfTypeParameter(tp)
	if cons != nil {
		b.WriteString(" extends ")
		b.WriteString(c.TypeToStringEx(cons, file.AsNode(), typeFormatFlags))
	}
}

func writeTypeParams(params []*checker.Type, c *checker.Checker, file *ast.SourceFile, b *strings.Builder) {
	if len(params) > 0 {
		b.WriteString("<")
		var tail bool
		for _, param := range params {
			if tail {
				b.WriteString(",")
				b.WriteString(" ")
			}
			writeTypeParam(c, param, file, b)
			tail = true
		}
		b.WriteString(">")
	}
}

func (l *LanguageService) ProvideHover(ctx context.Context, documentURI lsproto.DocumentUri, position lsproto.Position) (*lsproto.Hover, error) {
	program, file := l.getProgramAndFile(documentURI)
	node := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))
	if node.Kind == ast.KindSourceFile {
		// Avoid giving quickInfo for the sourceFile as a whole.
		return nil, nil
	}
	c, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()

	var result string
	symbol := c.GetSymbolAtLocation(node)
	isAlias := symbol != nil && symbol.Flags&ast.SymbolFlagsAlias != 0
	if isAlias {
		symbol = c.GetAliasedSymbol(symbol)
	}
	if symbol != nil && symbol != c.GetUnknownSymbol() {
		flags := symbol.Flags
		if flags&ast.SymbolFlagsType != 0 && (ast.IsPartOfTypeNode(node) || ast.IsTypeDeclarationName(node)) {
			// If the symbol has a type meaning and we're in a type context, remove value-only meanings
			flags &^= ast.SymbolFlagsVariable | ast.SymbolFlagsFunction
		}
		var b strings.Builder
		if isAlias {
			b.WriteString("(alias) ")
		}
		switch {
		case flags&(ast.SymbolFlagsVariable|ast.SymbolFlagsProperty|ast.SymbolFlagsAccessor) != 0:
			switch {
			case flags&ast.SymbolFlagsProperty != 0:
				b.WriteString("(property) ")
			case flags&ast.SymbolFlagsAccessor != 0:
				b.WriteString("(accessor) ")
			default:
				decl := symbol.ValueDeclaration
				if decl != nil {
					switch {
					case ast.IsParameter(decl):
						b.WriteString("(parameter) ")
					case ast.IsVarLet(decl):
						b.WriteString("let ")
					case ast.IsVarConst(decl):
						b.WriteString("const ")
					case ast.IsVarUsing(decl):
						b.WriteString("using ")
					case ast.IsVarAwaitUsing(decl):
						b.WriteString("await using ")
					default:
						b.WriteString("var ")
					}
				}
			}
			b.WriteString(c.SymbolToStringEx(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags))
			b.WriteString(": ")
			b.WriteString(c.TypeToStringEx(c.GetTypeOfSymbolAtLocation(symbol, node), file.AsNode(), typeFormatFlags))
		case flags&ast.SymbolFlagsEnumMember != 0:
			b.WriteString("(enum member) ")
			t := c.GetTypeOfSymbol(symbol)
			b.WriteString(c.TypeToStringEx(t, file.AsNode(), typeFormatFlags))
			if t.Flags()&checker.TypeFlagsLiteral != 0 {
				b.WriteString(" = ")
				b.WriteString(t.AsLiteralType().String())
			}
		case flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod) != 0:
			t := c.GetTypeOfSymbol(symbol)
			signatures := c.GetSignaturesOfType(t, checker.SignatureKindCall)
			prefix := core.IfElse(symbol.Flags&ast.SymbolFlagsMethod != 0, "(method) ", "function ")
			for i, sig := range signatures {
				if i != 0 {
					b.WriteString("\n")
				}
				if i == 3 && len(signatures) >= 5 {
					b.WriteString(fmt.Sprintf("// +%v more overloads", len(signatures)-3))
					break
				}
				b.WriteString(prefix)
				b.WriteString(c.SignatureToStringEx(sig, file.AsNode(), typeFormatFlags))
			}
		case flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0:
			b.WriteString(core.IfElse(symbol.Flags&ast.SymbolFlagsClass != 0, "class ", "interface "))
			b.WriteString(c.SymbolToStringEx(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags))
			params := c.GetDeclaredTypeOfSymbol(symbol).AsInterfaceType().LocalTypeParameters()
			writeTypeParams(params, c, file, &b)
		case flags&ast.SymbolFlagsEnum != 0:
			b.WriteString("enum ")
			b.WriteString(c.SymbolToStringEx(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags))
		case flags&ast.SymbolFlagsModule != 0:
			b.WriteString(core.IfElse(symbol.ValueDeclaration != nil && ast.IsSourceFile(symbol.ValueDeclaration), "module ", "namespace "))
			b.WriteString(c.SymbolToStringEx(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags))
		case flags&ast.SymbolFlagsTypeParameter != 0:
			b.WriteString("(type parameter) ")
			tp := c.GetDeclaredTypeOfSymbol(symbol)
			b.WriteString(c.SymbolToStringEx(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags))
			cons := c.GetConstraintOfTypeParameter(tp)
			if cons != nil {
				b.WriteString(" extends ")
				b.WriteString(c.TypeToStringEx(cons, file.AsNode(), typeFormatFlags))
			}
		case flags&ast.SymbolFlagsTypeAlias != 0:
			b.WriteString("type ")
			b.WriteString(c.SymbolToStringEx(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags))
			writeTypeParams(c.GetTypeAliasTypeParameters(symbol), c, file, &b)
			if len(symbol.Declarations) != 0 {
				b.WriteString(" = ")
				b.WriteString(c.TypeToStringEx(c.GetDeclaredTypeOfSymbol(symbol), file.AsNode(), typeFormatFlags|checker.TypeFormatFlagsInTypeAlias))
			}
		case flags&ast.SymbolFlagsAlias != 0:
			b.WriteString("import ")
			b.WriteString(c.SymbolToStringEx(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags))
		default:
			b.WriteString(c.TypeToStringEx(c.GetTypeOfSymbol(symbol), file.AsNode(), typeFormatFlags))
		}
		result = b.String()
	}
	if result != "" {
		return &lsproto.Hover{
			Contents: lsproto.MarkupContentOrMarkedStringOrMarkedStrings{
				MarkupContent: &lsproto.MarkupContent{
					Kind:  lsproto.MarkupKindMarkdown,
					Value: codeFence("typescript", result),
				},
			},
		}, nil
	}
	return nil, nil
}

func codeFence(lang string, code string) string {
	if code == "" {
		return ""
	}
	ticks := 3
	for strings.Contains(code, strings.Repeat("`", ticks)) {
		ticks++
	}
	var result strings.Builder
	result.Grow(len(code) + len(lang) + 2*ticks + 2)
	for range ticks {
		result.WriteByte('`')
	}
	result.WriteString(lang)
	result.WriteByte('\n')
	result.WriteString(code)
	result.WriteByte('\n')
	for range ticks {
		result.WriteByte('`')
	}
	return result.String()
}
