package ls

import (
	"context"
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

const (
	symbolFormatFlags = checker.SymbolFormatFlagsWriteTypeParametersOrArguments | checker.SymbolFormatFlagsUseOnlyExternalAliasing | checker.SymbolFormatFlagsAllowAnyNodeKind | checker.SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope
	typeFormatFlags   = checker.TypeFormatFlagsUseAliasDefinedOutsideCurrentScope
)

func (l *LanguageService) ProvideHover(ctx context.Context, documentURI lsproto.DocumentUri, position lsproto.Position) (lsproto.HoverResponse, error) {
	program, file := l.getProgramAndFile(documentURI)
	node := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))
	if node.Kind == ast.KindSourceFile {
		// Avoid giving quickInfo for the sourceFile as a whole.
		return lsproto.HoverOrNull{}, nil
	}
	c, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()
	quickInfo, documentation := getQuickInfoAndDocumentation(c, node)
	if quickInfo == "" {
		return lsproto.HoverOrNull{}, nil
	}
	return lsproto.HoverOrNull{
		Hover: &lsproto.Hover{
			Contents: lsproto.MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings{
				MarkupContent: &lsproto.MarkupContent{
					Kind:  lsproto.MarkupKindMarkdown,
					Value: formatQuickInfo(quickInfo) + documentation,
				},
			},
		},
	}, nil
}

func getQuickInfoAndDocumentation(c *checker.Checker, node *ast.Node) (string, string) {
	return getQuickInfoAndDocumentationForSymbol(c, c.GetSymbolAtLocation(node), getNodeForQuickInfo(node))
}

func getQuickInfoAndDocumentationForSymbol(c *checker.Checker, symbol *ast.Symbol, node *ast.Node) (string, string) {
	quickInfo, declaration := getQuickInfoAndDeclarationAtLocation(c, symbol, node)
	if quickInfo == "" {
		return "", ""
	}
	var b strings.Builder
	if declaration != nil {
		if jsdoc := getJSDocOrTag(declaration); jsdoc != nil && !containsTypedefTag(jsdoc) {
			writeComments(&b, jsdoc.Comments())
			if jsdoc.Kind == ast.KindJSDoc {
				if tags := jsdoc.AsJSDoc().Tags; tags != nil {
					for _, tag := range tags.Nodes {
						if tag.Kind == ast.KindJSDocTypeTag {
							continue
						}
						b.WriteString("\n\n*@")
						b.WriteString(tag.TagName().Text())
						b.WriteString("*")
						switch tag.Kind {
						case ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag:
							writeOptionalEntityName(&b, tag.Name())
						case ast.KindJSDocAugmentsTag:
							writeOptionalEntityName(&b, tag.AsJSDocAugmentsTag().ClassName)
						case ast.KindJSDocSeeTag:
							writeOptionalEntityName(&b, tag.AsJSDocSeeTag().NameExpression)
						case ast.KindJSDocTemplateTag:
							for i, tp := range tag.TypeParameters() {
								if i != 0 {
									b.WriteString(",")
								}
								writeOptionalEntityName(&b, tp.Name())
							}
						}
						comments := tag.Comments()
						if len(comments) != 0 {
							if commentHasPrefix(comments, "```") {
								b.WriteString("\n")
							} else {
								b.WriteString(" ")
								if !commentHasPrefix(comments, "-") {
									b.WriteString("— ")
								}
							}
							writeComments(&b, comments)
						}
					}
				}
			}
		}
	}
	return quickInfo, b.String()
}

func formatQuickInfo(quickInfo string) string {
	var b strings.Builder
	b.Grow(32)
	writeCode(&b, "tsx", quickInfo)
	return b.String()
}

func getQuickInfoAndDeclarationAtLocation(c *checker.Checker, symbol *ast.Symbol, node *ast.Node) (string, *ast.Node) {
	isAlias := symbol != nil && symbol.Flags&ast.SymbolFlagsAlias != 0
	if isAlias {
		symbol = c.GetAliasedSymbol(symbol)
	}
	if symbol == nil || symbol == c.GetUnknownSymbol() {
		return "", nil
	}
	declaration := symbol.ValueDeclaration
	if symbol.Flags&ast.SymbolFlagsClass != 0 && inConstructorContext(node) {
		if s := symbol.Members[ast.InternalSymbolNameConstructor]; s != nil {
			symbol = s
			declaration = core.Find(symbol.Declarations, func(d *ast.Node) bool {
				return ast.IsConstructorDeclaration(d) || ast.IsConstructSignatureDeclaration(d)
			})
		}
	}
	flags := symbol.Flags
	if flags&ast.SymbolFlagsType != 0 && (ast.IsPartOfTypeNode(node) || ast.IsTypeDeclarationName(node)) {
		// If the symbol has a type meaning and we're in a type context, remove value-only meanings
		flags &^= ast.SymbolFlagsVariable | ast.SymbolFlagsFunction
	}
	container := getContainerNode(node)
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
		b.WriteString(c.SymbolToStringEx(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags))
		b.WriteString(": ")
		b.WriteString(c.TypeToStringEx(c.GetTypeOfSymbolAtLocation(symbol, node), container, typeFormatFlags))
	case flags&ast.SymbolFlagsEnumMember != 0:
		b.WriteString("(enum member) ")
		t := c.GetTypeOfSymbol(symbol)
		b.WriteString(c.TypeToStringEx(t, container, typeFormatFlags))
		if t.Flags()&checker.TypeFlagsLiteral != 0 {
			b.WriteString(" = ")
			b.WriteString(t.AsLiteralType().String())
		}
	case flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod) != 0:
		signatures := getSignaturesAtLocation(c, symbol, checker.SignatureKindCall, node)
		if len(signatures) == 1 && signatures[0].Declaration() != nil {
			declaration = signatures[0].Declaration()
		}
		prefix := core.IfElse(symbol.Flags&ast.SymbolFlagsMethod != 0, "(method) ", "function ")
		writeSignatures(&b, c, signatures, container, prefix, symbol)
	case flags&ast.SymbolFlagsConstructor != 0:
		signatures := getSignaturesAtLocation(c, symbol.Parent, checker.SignatureKindConstruct, node)
		if len(signatures) == 1 && signatures[0].Declaration() != nil {
			declaration = signatures[0].Declaration()
		}
		writeSignatures(&b, c, signatures, container, "constructor ", symbol.Parent)
	case flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0:
		if node.Kind == ast.KindThisKeyword || ast.IsThisInTypeQuery(node) {
			b.WriteString("this")
		} else {
			b.WriteString(core.IfElse(symbol.Flags&ast.SymbolFlagsClass != 0, "class ", "interface "))
			b.WriteString(c.SymbolToStringEx(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags))
			params := c.GetDeclaredTypeOfSymbol(symbol).AsInterfaceType().LocalTypeParameters()
			writeTypeParams(&b, c, params)
		}
		if flags&ast.SymbolFlagsInterface != 0 {
			declaration = core.Find(symbol.Declarations, ast.IsInterfaceDeclaration)
		}
	case flags&ast.SymbolFlagsEnum != 0:
		b.WriteString("enum ")
		b.WriteString(c.SymbolToStringEx(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags))
	case flags&ast.SymbolFlagsModule != 0:
		b.WriteString(core.IfElse(symbol.ValueDeclaration != nil && ast.IsSourceFile(symbol.ValueDeclaration), "module ", "namespace "))
		b.WriteString(c.SymbolToStringEx(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags))
	case flags&ast.SymbolFlagsTypeParameter != 0:
		b.WriteString("(type parameter) ")
		tp := c.GetDeclaredTypeOfSymbol(symbol)
		b.WriteString(c.SymbolToStringEx(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags))
		cons := c.GetConstraintOfTypeParameter(tp)
		if cons != nil {
			b.WriteString(" extends ")
			b.WriteString(c.TypeToStringEx(cons, container, typeFormatFlags))
		}
		declaration = core.Find(symbol.Declarations, ast.IsTypeParameterDeclaration)
	case flags&ast.SymbolFlagsTypeAlias != 0:
		b.WriteString("type ")
		b.WriteString(c.SymbolToStringEx(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags))
		writeTypeParams(&b, c, c.GetTypeAliasTypeParameters(symbol))
		if len(symbol.Declarations) != 0 {
			b.WriteString(" = ")
			b.WriteString(c.TypeToStringEx(c.GetDeclaredTypeOfSymbol(symbol), container, typeFormatFlags|checker.TypeFormatFlagsInTypeAlias))
		}
		declaration = core.Find(symbol.Declarations, ast.IsTypeAliasDeclaration)
	case flags&ast.SymbolFlagsAlias != 0:
		b.WriteString("import ")
		b.WriteString(c.SymbolToStringEx(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags))
	default:
		b.WriteString(c.TypeToStringEx(c.GetTypeOfSymbol(symbol), container, typeFormatFlags))
	}
	return b.String(), declaration
}

func getNodeForQuickInfo(node *ast.Node) *ast.Node {
	if node.Parent == nil {
		return node
	}
	if ast.IsNewExpression(node.Parent) && node.Pos() == node.Parent.Pos() {
		return node.Parent.Expression()
	}
	if ast.IsNamedTupleMember(node.Parent) && node.Pos() == node.Parent.Pos() {
		return node.Parent
	}
	if ast.IsImportMeta(node.Parent) && node.Parent.Name() == node {
		return node.Parent
	}
	if ast.IsJsxNamespacedName(node.Parent) {
		return node.Parent
	}
	return node
}

func inConstructorContext(node *ast.Node) bool {
	if node.Kind == ast.KindConstructorKeyword {
		return true
	}
	if ast.IsIdentifier(node) {
		for ast.IsRightSideOfQualifiedNameOrPropertyAccess(node) {
			node = node.Parent
		}
		if ast.IsNewExpression(node.Parent) {
			return true
		}
	}
	return false
}

func getSignaturesAtLocation(c *checker.Checker, symbol *ast.Symbol, kind checker.SignatureKind, node *ast.Node) []*checker.Signature {
	signatures := c.GetSignaturesOfType(c.GetTypeOfSymbol(symbol), kind)
	if len(signatures) > 1 || len(signatures) == 1 && len(signatures[0].TypeParameters()) != 0 {
		if callNode := getCallOrNewExpression(node); callNode != nil {
			signature := c.GetResolvedSignature(callNode)
			// If we have a resolved signature, make sure it isn't a synthetic signature
			if signature != nil && (slices.Contains(signatures, signature) || signature.Target() != nil && slices.Contains(signatures, signature.Target())) {
				return []*checker.Signature{signature}
			}
		}
	}
	return signatures
}

func getCallOrNewExpression(node *ast.Node) *ast.Node {
	if ast.IsSourceFile(node) {
		return nil
	}
	if ast.IsPropertyAccessExpression(node.Parent) && node.Parent.Name() == node {
		node = node.Parent
	}
	if ast.IsCallExpression(node.Parent) || ast.IsNewExpression(node.Parent) {
		return node.Parent
	}
	return nil
}

func writeTypeParams(b *strings.Builder, c *checker.Checker, params []*checker.Type) {
	if len(params) > 0 {
		b.WriteString("<")
		for i, tp := range params {
			if i != 0 {
				b.WriteString(", ")
			}
			symbol := tp.Symbol()
			b.WriteString(c.SymbolToStringEx(symbol, nil, ast.SymbolFlagsNone, symbolFormatFlags))
			cons := c.GetConstraintOfTypeParameter(tp)
			if cons != nil {
				b.WriteString(" extends ")
				b.WriteString(c.TypeToStringEx(cons, nil, typeFormatFlags))
			}
		}
		b.WriteString(">")
	}
}

func writeSignatures(b *strings.Builder, c *checker.Checker, signatures []*checker.Signature, container *ast.Node, prefix string, symbol *ast.Symbol) {
	for i, sig := range signatures {
		if i != 0 {
			b.WriteString("\n")
		}
		if i == 3 && len(signatures) >= 5 {
			b.WriteString(fmt.Sprintf("// +%v more overloads", len(signatures)-3))
			break
		}
		b.WriteString(prefix)
		b.WriteString(c.SymbolToStringEx(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags))
		b.WriteString(c.SignatureToStringEx(sig, container, typeFormatFlags|checker.TypeFormatFlagsWriteCallStyleSignature|checker.TypeFormatFlagsWriteTypeArgumentsOfSignature))
	}
}

func containsTypedefTag(jsdoc *ast.Node) bool {
	if jsdoc.Kind == ast.KindJSDoc {
		if tags := jsdoc.AsJSDoc().Tags; tags != nil {
			for _, tag := range tags.Nodes {
				if tag.Kind == ast.KindJSDocTypedefTag {
					return true
				}
			}
		}
	}
	return false
}

func commentHasPrefix(comments []*ast.Node, prefix string) bool {
	return comments[0].Kind == ast.KindJSDocText && strings.HasPrefix(comments[0].Text(), prefix)
}

func getJSDoc(node *ast.Node) *ast.Node {
	return core.LastOrNil(node.JSDoc(nil))
}

func getJSDocOrTag(node *ast.Node) *ast.Node {
	if jsdoc := getJSDoc(node); jsdoc != nil {
		return jsdoc
	}
	switch {
	case ast.IsParameter(node):
		return getMatchingJSDocTag(node.Parent, node.Name().Text(), isMatchingParameterTag)
	case ast.IsTypeParameterDeclaration(node):
		return getMatchingJSDocTag(node.Parent, node.Name().Text(), isMatchingTemplateTag)
	case ast.IsVariableDeclaration(node) && ast.IsVariableDeclarationList(node.Parent) && core.FirstOrNil(node.Parent.AsVariableDeclarationList().Declarations.Nodes) == node:
		return getJSDocOrTag(node.Parent.Parent)
	case (ast.IsFunctionExpressionOrArrowFunction(node) || ast.IsClassExpression(node)) &&
		(ast.IsVariableDeclaration(node.Parent) || ast.IsPropertyDeclaration(node.Parent) || ast.IsPropertyAssignment(node.Parent)) && node.Parent.Initializer() == node:
		return getJSDocOrTag(node.Parent)
	}
	return nil
}

func getMatchingJSDocTag(node *ast.Node, name string, match func(*ast.Node, string) bool) *ast.Node {
	if jsdoc := getJSDocOrTag(node); jsdoc != nil && jsdoc.Kind == ast.KindJSDoc {
		if tags := jsdoc.AsJSDoc().Tags; tags != nil {
			for _, tag := range tags.Nodes {
				if match(tag, name) {
					return tag
				}
			}
		}
	}
	return nil
}

func isMatchingParameterTag(tag *ast.Node, name string) bool {
	return tag.Kind == ast.KindJSDocParameterTag && isNodeWithName(tag, name)
}

func isMatchingTemplateTag(tag *ast.Node, name string) bool {
	return tag.Kind == ast.KindJSDocTemplateTag && core.Some(tag.TypeParameters(), func(tp *ast.Node) bool { return isNodeWithName(tp, name) })
}

func isNodeWithName(node *ast.Node, name string) bool {
	nodeName := node.Name()
	return ast.IsIdentifier(nodeName) && nodeName.Text() == name
}

func writeCode(b *strings.Builder, lang string, code string) {
	if code == "" {
		return
	}
	ticks := 3
	for strings.Contains(code, strings.Repeat("`", ticks)) {
		ticks++
	}
	for range ticks {
		b.WriteByte('`')
	}
	b.WriteString(lang)
	b.WriteByte('\n')
	b.WriteString(code)
	b.WriteByte('\n')
	for range ticks {
		b.WriteByte('`')
	}
	b.WriteByte('\n')
}

func writeComments(b *strings.Builder, comments []*ast.Node) {
	for _, comment := range comments {
		switch comment.Kind {
		case ast.KindJSDocText:
			b.WriteString(comment.Text())
		case ast.KindJSDocLink:
			name := comment.Name()
			text := comment.AsJSDocLink().Text()
			if name != nil {
				if text == "" {
					writeEntityName(b, name)
				} else {
					writeEntityNameParts(b, name)
				}
			}
			b.WriteString(text)
		case ast.KindJSDocLinkCode:
			// !!! TODO: This is a temporary placeholder implementation that needs to be updated later
			name := comment.Name()
			text := comment.AsJSDocLinkCode().Text()
			if name != nil {
				if text == "" {
					writeEntityName(b, name)
				} else {
					writeEntityNameParts(b, name)
				}
			}
			b.WriteString(text)
		case ast.KindJSDocLinkPlain:
			// !!! TODO: This is a temporary placeholder implementation that needs to be updated later
			name := comment.Name()
			text := comment.AsJSDocLinkPlain().Text()
			if name != nil {
				if text == "" {
					writeEntityName(b, name)
				} else {
					writeEntityNameParts(b, name)
				}
			}
			b.WriteString(text)
		}
	}
}

func writeOptionalEntityName(b *strings.Builder, name *ast.Node) {
	if name != nil {
		b.WriteString(" ")
		writeEntityName(b, name)
	}
}

func writeEntityName(b *strings.Builder, name *ast.Node) {
	b.WriteString("`")
	writeEntityNameParts(b, name)
	b.WriteString("`")
}

func writeEntityNameParts(b *strings.Builder, node *ast.Node) {
	switch node.Kind {
	case ast.KindIdentifier:
		b.WriteString(node.Text())
	case ast.KindQualifiedName:
		writeEntityNameParts(b, node.AsQualifiedName().Left)
		b.WriteByte('.')
		writeEntityNameParts(b, node.AsQualifiedName().Right)
	case ast.KindPropertyAccessExpression:
		writeEntityNameParts(b, node.Expression())
		b.WriteByte('.')
		writeEntityNameParts(b, node.Name())
	case ast.KindParenthesizedExpression, ast.KindExpressionWithTypeArguments:
		writeEntityNameParts(b, node.Expression())
	case ast.KindJSDocNameReference:
		writeEntityNameParts(b, node.Name())
	}
}
