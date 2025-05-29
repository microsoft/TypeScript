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
	"github.com/microsoft/typescript-go/internal/printer"
)

const (
	symbolFormatFlags = checker.SymbolFormatFlagsWriteTypeParametersOrArguments | checker.SymbolFormatFlagsUseOnlyExternalAliasing | checker.SymbolFormatFlagsAllowAnyNodeKind | checker.SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope
	typeFormatFlags   = checker.TypeFormatFlagsNone
)

func writeTypeParam(c *checker.Checker, tp *checker.Type, file *ast.SourceFile, p printer.EmitTextWriter) {
	symbol := tp.Symbol()
	c.WriteSymbol(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags, p)
	cons := c.GetConstraintOfTypeParameter(tp)
	if cons != nil {
		p.RawWrite(" extends ")
		c.WriteType(cons, file.AsNode(), typeFormatFlags, p)
	}
}

func writeTypeParams(params []*checker.Type, c *checker.Checker, file *ast.SourceFile, p printer.EmitTextWriter) {
	if len(params) > 0 {
		p.WritePunctuation("<")
		var tail bool
		for _, param := range params {
			if tail {
				p.WritePunctuation(",")
				p.WriteSpace(" ")
			}
			writeTypeParam(c, param, file, p)
			tail = true
		}
		p.WritePunctuation(">")
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
	if symbol != nil && symbol == c.GetUnknownSymbol() {
		flags := symbol.Flags
		if flags&ast.SymbolFlagsType != 0 && (ast.IsPartOfTypeNode(node) || ast.IsTypeDeclarationName(node)) {
			// If the symbol has a type meaning and we're in a type context, remove value-only meanings
			flags &^= ast.SymbolFlagsVariable | ast.SymbolFlagsFunction
		}
		p := printer.NewTextWriter("")
		if isAlias {
			p.RawWrite("(alias) ")
		}
		switch {
		case flags&(ast.SymbolFlagsVariable|ast.SymbolFlagsProperty|ast.SymbolFlagsAccessor) != 0:
			switch {
			case flags&ast.SymbolFlagsProperty != 0:
				p.RawWrite("(property) ")
			case flags&ast.SymbolFlagsAccessor != 0:
				p.RawWrite("(accessor) ")
			default:
				decl := symbol.ValueDeclaration
				if decl != nil {
					switch {
					case ast.IsParameter(decl):
						p.RawWrite("(parameter) ")
					case ast.IsVarLet(decl):
						p.RawWrite("let ")
					case ast.IsVarConst(decl):
						p.RawWrite("const ")
					case ast.IsVarUsing(decl):
						p.RawWrite("using ")
					case ast.IsVarAwaitUsing(decl):
						p.RawWrite("await using ")
					default:
						p.RawWrite("var ")
					}
				}
			}
			c.WriteSymbol(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags, p)
			p.RawWrite(": ")
			c.WriteType(c.GetTypeOfSymbolAtLocation(symbol, node), file.AsNode(), typeFormatFlags, p)
		case flags&ast.SymbolFlagsEnumMember != 0:
			p.RawWrite("(enum member) ")
			t := c.GetTypeOfSymbol(symbol)
			c.WriteType(t, file.AsNode(), typeFormatFlags, p)
			if t.Flags()&checker.TypeFlagsLiteral != 0 {
				p.RawWrite(" = ")
				p.WriteLiteral(t.AsLiteralType().String())
			}
		case flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod) != 0:
			t := c.GetTypeOfSymbol(symbol)
			signatures := c.GetSignaturesOfType(t, checker.SignatureKindCall)
			prefix := core.IfElse(symbol.Flags&ast.SymbolFlagsMethod != 0, "(method) ", "function ")
			for i, sig := range signatures {
				if i != 0 {
					p.RawWrite("\n")
				}
				if i == 3 && len(signatures) >= 5 {
					p.RawWrite(fmt.Sprintf("// +%v more overloads", len(signatures)-3))
					break
				}
				p.RawWrite(prefix)
				c.WriteSignature(sig, file.AsNode(), typeFormatFlags, p)
			}
		case flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0:
			p.RawWrite(core.IfElse(symbol.Flags&ast.SymbolFlagsClass != 0, "class ", "interface "))
			c.WriteSymbol(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags, p)
			params := c.GetDeclaredTypeOfSymbol(symbol).AsInterfaceType().LocalTypeParameters()
			writeTypeParams(params, c, file, p)
		case flags&ast.SymbolFlagsEnum != 0:
			p.RawWrite("enum ")
			c.WriteSymbol(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags, p)
		case flags&ast.SymbolFlagsModule != 0:
			p.RawWrite(core.IfElse(symbol.ValueDeclaration != nil && ast.IsSourceFile(symbol.ValueDeclaration), "module ", "namespace "))
			c.WriteSymbol(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags, p)
		case flags&ast.SymbolFlagsTypeParameter != 0:
			p.RawWrite("(type parameter) ")
			tp := c.GetDeclaredTypeOfSymbol(symbol)
			c.WriteSymbol(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags, p)
			cons := c.GetConstraintOfTypeParameter(tp)
			if cons != nil {
				p.RawWrite(" extends ")
				c.WriteType(cons, file.AsNode(), typeFormatFlags, p)
			}
		case flags&ast.SymbolFlagsTypeAlias != 0:
			p.RawWrite("type ")
			c.WriteSymbol(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags, p)
			writeTypeParams(c.GetTypeAliasTypeParameters(symbol), c, file, p)
			if len(symbol.Declarations) != 0 {
				p.RawWrite(" = ")
				c.WriteType(c.GetDeclaredTypeOfSymbol(symbol), file.AsNode(), typeFormatFlags|checker.TypeFormatFlagsInTypeAlias, p)
			}
		case flags&ast.SymbolFlagsAlias != 0:
			p.RawWrite("import ")
			c.WriteSymbol(symbol, file.AsNode(), ast.SymbolFlagsNone, symbolFormatFlags, p)
		default:
			c.WriteType(c.GetTypeOfSymbol(symbol), file.AsNode(), typeFormatFlags, p)
		}
		result = p.String()
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
