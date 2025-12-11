package ls

import (
	"context"
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

const (
	symbolFormatFlags = checker.SymbolFormatFlagsWriteTypeParametersOrArguments | checker.SymbolFormatFlagsUseOnlyExternalAliasing | checker.SymbolFormatFlagsAllowAnyNodeKind | checker.SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope
	typeFormatFlags   = checker.TypeFormatFlagsUseAliasDefinedOutsideCurrentScope
)

func (l *LanguageService) ProvideHover(ctx context.Context, documentURI lsproto.DocumentUri, position lsproto.Position) (lsproto.HoverResponse, error) {
	caps := lsproto.GetClientCapabilities(ctx)
	contentFormat := lsproto.PreferredMarkupKind(caps.TextDocument.Hover.ContentFormat)

	program, file := l.getProgramAndFile(documentURI)
	node := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))
	if node.Kind == ast.KindSourceFile {
		// Avoid giving quickInfo for the sourceFile as a whole.
		return lsproto.HoverOrNull{}, nil
	}
	c, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()
	rangeNode := getNodeForQuickInfo(node)
	symbol := getSymbolAtLocationForQuickInfo(c, node)
	quickInfo, documentation := l.getQuickInfoAndDocumentationForSymbol(c, symbol, rangeNode, contentFormat)
	if quickInfo == "" {
		return lsproto.HoverOrNull{}, nil
	}
	hoverRange := l.getLspRangeOfNode(rangeNode, nil, nil)

	var content string
	if contentFormat == lsproto.MarkupKindMarkdown {
		content = formatQuickInfo(quickInfo) + documentation
	} else {
		content = quickInfo + documentation
	}

	return lsproto.HoverOrNull{
		Hover: &lsproto.Hover{
			Contents: lsproto.MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings{
				MarkupContent: &lsproto.MarkupContent{
					Kind:  contentFormat,
					Value: content,
				},
			},
			Range: hoverRange,
		},
	}, nil
}

func (l *LanguageService) getQuickInfoAndDocumentationForSymbol(c *checker.Checker, symbol *ast.Symbol, node *ast.Node, contentFormat lsproto.MarkupKind) (string, string) {
	if symbol == nil {
		return "", ""
	}
	quickInfo, declaration := getQuickInfoAndDeclarationAtLocation(c, symbol, node)
	if quickInfo == "" {
		return "", ""
	}
	return quickInfo, l.getDocumentationFromDeclaration(c, declaration, contentFormat)
}

func (l *LanguageService) getDocumentationFromDeclaration(c *checker.Checker, declaration *ast.Node, contentFormat lsproto.MarkupKind) string {
	if declaration == nil {
		return ""
	}
	isMarkdown := contentFormat == lsproto.MarkupKindMarkdown
	var b strings.Builder
	if jsdoc := getJSDocOrTag(c, declaration); jsdoc != nil && !containsTypedefTag(jsdoc) {
		l.writeComments(&b, c, jsdoc.Comments(), isMarkdown)
		if jsdoc.Kind == ast.KindJSDoc {
			if tags := jsdoc.AsJSDoc().Tags; tags != nil {
				for _, tag := range tags.Nodes {
					if tag.Kind == ast.KindJSDocTypeTag {
						continue
					}
					b.WriteString("\n\n")
					if isMarkdown {
						b.WriteString("*@")
						b.WriteString(tag.TagName().Text())
						b.WriteString("*")
					} else {
						b.WriteString("@")
						b.WriteString(tag.TagName().Text())
					}
					switch tag.Kind {
					case ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag:
						writeOptionalEntityName(&b, tag.Name())
					case ast.KindJSDocAugmentsTag:
						writeOptionalEntityName(&b, tag.ClassName())
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
					if tag.Kind == ast.KindJSDocTag && tag.TagName().Text() == "example" {
						b.WriteString("\n")
						commentText := strings.TrimRight(getCommentText(comments), " \t\r\n")
						if len(commentText) > 6 && strings.HasPrefix(commentText, "```") && strings.HasSuffix(commentText, "```") && strings.Contains(commentText, "\n") {
							b.WriteString(commentText)
							b.WriteString("\n")
						} else {
							writeCode(&b, "tsx", commentText)
						}
					} else if len(comments) != 0 {
						b.WriteString(" ")
						if !commentHasPrefix(comments, "-") {
							b.WriteString("— ")
						}
						l.writeComments(&b, c, comments, isMarkdown)
					}
				}
			}
		}
	}
	return b.String()
}

func getCommentText(comments []*ast.Node) string {
	var b strings.Builder
	for _, comment := range comments {
		switch comment.Kind {
		case ast.KindJSDocText:
			b.WriteString(comment.Text())
		case ast.KindJSDocLink, ast.KindJSDocLinkCode, ast.KindJSDocLinkPlain:
			b.WriteString(scanner.GetTextOfNode(comment))
		}
	}
	return b.String()
}

func formatQuickInfo(quickInfo string) string {
	var b strings.Builder
	b.Grow(32)
	writeCode(&b, "tsx", quickInfo)
	return b.String()
}

func getQuickInfoAndDeclarationAtLocation(c *checker.Checker, symbol *ast.Symbol, node *ast.Node) (string, *ast.Node) {
	var b strings.Builder
	var visitedAliases collections.Set[*ast.Symbol]
	container := getContainerNode(node)
	if node.Kind == ast.KindThisKeyword && ast.IsInExpressionContext(node) {
		return c.TypeToStringEx(c.GetTypeAtLocation(node), container, typeFormatFlags), nil
	}
	writeSymbolMeaning := func(symbol *ast.Symbol, meaning ast.SymbolFlags, isAlias bool) *ast.Node {
		flags := symbol.Flags & meaning
		if flags == 0 {
			return nil
		}
		declaration := symbol.ValueDeclaration
		if flags&ast.SymbolFlagsProperty != 0 && declaration != nil && ast.IsMethodDeclaration(declaration) {
			flags = ast.SymbolFlagsMethod
		}
		if b.Len() != 0 {
			b.WriteString("\n")
		}
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
			if symbol.Name == ast.InternalSymbolNameExportEquals && symbol.Parent != nil && symbol.Parent.Flags&ast.SymbolFlagsModule != 0 {
				b.WriteString("exports")
			} else {
				b.WriteString(c.SymbolToStringEx(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags))
			}
			b.WriteString(": ")
			if callNode := getCallOrNewExpression(node); callNode != nil {
				b.WriteString(c.SignatureToStringEx(c.GetResolvedSignature(callNode), container, typeFormatFlags|checker.TypeFormatFlagsWriteCallStyleSignature|checker.TypeFormatFlagsWriteTypeArgumentsOfSignature|checker.TypeFormatFlagsWriteArrowStyleSignature))
			} else {
				b.WriteString(c.TypeToStringEx(c.GetTypeOfSymbolAtLocation(symbol, node), container, typeFormatFlags))
			}
		case flags&ast.SymbolFlagsEnumMember != 0:
			b.WriteString("(enum member) ")
			t := c.GetTypeOfSymbol(symbol)
			b.WriteString(c.TypeToStringEx(t, container, typeFormatFlags))
			if t.Flags()&checker.TypeFlagsLiteral != 0 {
				b.WriteString(" = ")
				b.WriteString(t.AsLiteralType().String())
			}
		case flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod) != 0:
			prefix := core.IfElse(flags&ast.SymbolFlagsMethod != 0, "(method) ", "function ")
			if ast.IsIdentifier(node) && ast.IsFunctionLikeDeclaration(node.Parent) && node.Parent.Name() == node {
				declaration = node.Parent
				signatures := []*checker.Signature{c.GetSignatureFromDeclaration(declaration)}
				writeSignatures(&b, c, signatures, container, isAlias, prefix, symbol)
			} else {
				signatures := getSignaturesAtLocation(c, symbol, checker.SignatureKindCall, node)
				if len(signatures) == 1 {
					if d := signatures[0].Declaration(); d != nil && d.Flags&ast.NodeFlagsJSDoc == 0 {
						declaration = d
					}
				}
				writeSignatures(&b, c, signatures, container, isAlias, prefix, symbol)
			}
		case flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0:
			if node.Kind == ast.KindThisKeyword || ast.IsThisInTypeQuery(node) {
				b.WriteString("this")
			} else if node.Kind == ast.KindConstructorKeyword && (ast.IsConstructorDeclaration(node.Parent) || ast.IsConstructSignatureDeclaration(node.Parent)) {
				declaration = node.Parent
				signatures := []*checker.Signature{c.GetSignatureFromDeclaration(declaration)}
				writeSignatures(&b, c, signatures, container, isAlias, "constructor ", symbol)
			} else {
				var signatures []*checker.Signature
				if flags&ast.SymbolFlagsClass != 0 && getCallOrNewExpression(node) != nil {
					signatures = getSignaturesAtLocation(c, symbol, checker.SignatureKindConstruct, node)
				}
				if len(signatures) == 1 {
					if d := signatures[0].Declaration(); d != nil && d.Flags&ast.NodeFlagsJSDoc == 0 {
						declaration = d
					}
					writeSignatures(&b, c, signatures, container, isAlias, "constructor ", symbol)
				} else {
					b.WriteString(core.IfElse(flags&ast.SymbolFlagsClass != 0, "class ", "interface "))
					b.WriteString(c.SymbolToStringEx(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags))
					params := c.GetDeclaredTypeOfSymbol(symbol).AsInterfaceType().LocalTypeParameters()
					writeTypeParams(&b, c, params)
				}
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
		default:
			b.WriteString(c.TypeToStringEx(c.GetTypeOfSymbol(symbol), container, typeFormatFlags))
		}
		return declaration
	}
	var writeSymbol func(*ast.Symbol, bool) *ast.Node
	writeSymbol = func(symbol *ast.Symbol, isAlias bool) *ast.Node {
		var declaration *ast.Node
		// Recursively write all meanings of alias
		if symbol.Flags&ast.SymbolFlagsAlias != 0 && visitedAliases.AddIfAbsent(symbol) {
			if aliasedSymbol := c.GetAliasedSymbol(symbol); aliasedSymbol != c.GetUnknownSymbol() {
				declaration = writeSymbol(aliasedSymbol, true /*isAlias*/)
			}
		}
		// Write the value meaning, if any
		declaration = core.OrElse(declaration, writeSymbolMeaning(symbol, ast.SymbolFlagsValue|ast.SymbolFlagsSignature, isAlias))
		// Write the type meaning, if any
		declaration = core.OrElse(declaration, writeSymbolMeaning(symbol, ast.SymbolFlagsType&^ast.SymbolFlagsValue, isAlias))
		// Write the namespace meaning, if any
		declaration = core.OrElse(declaration, writeSymbolMeaning(symbol, ast.SymbolFlagsNamespace&^ast.SymbolFlagsValue, isAlias))
		// Return the first declaration
		return declaration
	}
	firstDeclaration := writeSymbol(symbol, false /*isAlias*/)
	return b.String(), firstDeclaration
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

func getSymbolAtLocationForQuickInfo(c *checker.Checker, node *ast.Node) *ast.Symbol {
	if objectElement := getContainingObjectLiteralElement(node); objectElement != nil {
		if contextualType := c.GetContextualType(objectElement.Parent, checker.ContextFlagsNone); contextualType != nil {
			if properties := c.GetPropertySymbolsFromContextualType(objectElement, contextualType, false /*unionSymbolOk*/); len(properties) == 1 {
				return properties[0]
			}
		}
	}
	return c.GetSymbolAtLocation(node)
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
	if (ast.IsCallExpression(node.Parent) || ast.IsNewExpression(node.Parent)) && node.Parent.Expression() == node {
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

func writeSignatures(b *strings.Builder, c *checker.Checker, signatures []*checker.Signature, container *ast.Node, isAlias bool, prefix string, symbol *ast.Symbol) {
	for i, sig := range signatures {
		if i != 0 {
			b.WriteString("\n")
			if isAlias {
				b.WriteString("(alias) ")
			}
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
				if tag.Kind == ast.KindJSDocTypedefTag || tag.Kind == ast.KindJSDocCallbackTag {
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

func getJSDocOrTag(c *checker.Checker, node *ast.Node) *ast.Node {
	if jsdoc := getJSDoc(node); jsdoc != nil {
		return jsdoc
	}
	switch {
	case ast.IsParameter(node):
		return getMatchingJSDocTag(c, node.Parent, node.Name().Text(), isMatchingParameterTag)
	case ast.IsTypeParameterDeclaration(node):
		return getMatchingJSDocTag(c, node.Parent, node.Name().Text(), isMatchingTemplateTag)
	case ast.IsVariableDeclaration(node) && ast.IsVariableDeclarationList(node.Parent) && core.FirstOrNil(node.Parent.AsVariableDeclarationList().Declarations.Nodes) == node:
		return getJSDocOrTag(c, node.Parent.Parent)
	case (ast.IsFunctionExpressionOrArrowFunction(node) || ast.IsClassExpression(node)) &&
		(ast.IsVariableDeclaration(node.Parent) || ast.IsPropertyDeclaration(node.Parent) || ast.IsPropertyAssignment(node.Parent)) && node.Parent.Initializer() == node:
		return getJSDocOrTag(c, node.Parent)
	}
	if symbol := node.Symbol(); symbol != nil && node.Parent != nil && ast.IsClassOrInterfaceLike(node.Parent) {
		isStatic := ast.HasStaticModifier(node)
		for _, baseType := range c.GetBaseTypes(c.GetDeclaredTypeOfSymbol(node.Parent.Symbol())) {
			t := baseType
			if isStatic {
				t = c.GetTypeOfSymbol(baseType.Symbol())
			}
			if prop := c.GetPropertyOfType(t, symbol.Name); prop != nil && prop.ValueDeclaration != nil {
				if jsDoc := getJSDocOrTag(c, prop.ValueDeclaration); jsDoc != nil {
					return jsDoc
				}
			}
		}
	}
	return nil
}

func getMatchingJSDocTag(c *checker.Checker, node *ast.Node, name string, match func(*ast.Node, string) bool) *ast.Node {
	if jsdoc := getJSDocOrTag(c, node); jsdoc != nil && jsdoc.Kind == ast.KindJSDoc {
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

func (l *LanguageService) writeComments(b *strings.Builder, c *checker.Checker, comments []*ast.Node, isMarkdown bool) {
	for _, comment := range comments {
		switch comment.Kind {
		case ast.KindJSDocText:
			b.WriteString(comment.Text())
		case ast.KindJSDocLink, ast.KindJSDocLinkPlain:
			l.writeJSDocLink(b, c, comment, false /*quote*/, isMarkdown)
		case ast.KindJSDocLinkCode:
			l.writeJSDocLink(b, c, comment, true /*quote*/, isMarkdown)
		}
	}
}

func (l *LanguageService) writeJSDocLink(b *strings.Builder, c *checker.Checker, link *ast.Node, quote bool, isMarkdown bool) {
	name := link.Name()
	text := strings.Trim(link.Text(), " ")
	if name == nil {
		writeQuotedString(b, text, quote && isMarkdown)
		return
	}
	if ast.IsIdentifier(name) && (name.Text() == "http" || name.Text() == "https") && strings.HasPrefix(text, "://") {
		linkText := name.Text() + text
		linkUri := linkText
		if commentPos := strings.IndexFunc(linkText, func(ch rune) bool { return ch == ' ' || ch == '|' }); commentPos >= 0 {
			linkUri = linkText[:commentPos]
			linkText = trimCommentPrefix(linkText[commentPos:])
			if linkText == "" {
				linkText = linkUri
			}
		}
		if isMarkdown {
			writeMarkdownLink(b, linkText, linkUri, quote)
		} else {
			writeQuotedString(b, linkText, false)
			if linkText != linkUri {
				b.WriteString(" (")
				b.WriteString(linkUri)
				b.WriteString(")")
			}
		}
		return
	}
	declarations := getDeclarationsFromLocation(c, name)
	if len(declarations) != 0 {
		declaration := declarations[0]
		file := ast.GetSourceFileOfNode(declaration)
		node := core.OrElse(ast.GetNameOfDeclaration(declaration), declaration)
		loc := l.getMappedLocation(file.FileName(), createRangeFromNode(node, file))
		prefixLen := core.IfElse(strings.HasPrefix(text, "()"), 2, 0)
		linkText := trimCommentPrefix(text[prefixLen:])
		if linkText == "" {
			linkText = getEntityNameString(name) + text[:prefixLen]
		}
		if isMarkdown {
			linkUri := fmt.Sprintf("%s#%d,%d-%d,%d", loc.Uri, loc.Range.Start.Line+1, loc.Range.Start.Character+1, loc.Range.End.Line+1, loc.Range.End.Character+1)
			writeMarkdownLink(b, linkText, linkUri, quote)
		} else {
			writeQuotedString(b, linkText, false)
		}
		return
	}
	writeQuotedString(b, getEntityNameString(name)+" "+text, quote && isMarkdown)
}

func trimCommentPrefix(text string) string {
	return strings.TrimLeft(strings.TrimPrefix(strings.TrimLeft(text, " "), "|"), " ")
}

func writeMarkdownLink(b *strings.Builder, text string, uri string, quote bool) {
	b.WriteString("[")
	writeQuotedString(b, text, quote)
	b.WriteString("](")
	b.WriteString(uri)
	b.WriteString(")")
}

func writeOptionalEntityName(b *strings.Builder, name *ast.Node) {
	if name != nil {
		b.WriteString(" ")
		writeQuotedString(b, getEntityNameString(name), true /*quote*/)
	}
}

func writeQuotedString(b *strings.Builder, str string, quote bool) {
	if quote && !strings.Contains(str, "`") {
		b.WriteString("`")
		b.WriteString(str)
		b.WriteString("`")
	} else {
		b.WriteString(str)
	}
}

func getEntityNameString(name *ast.Node) string {
	var b strings.Builder
	writeEntityNameParts(&b, name)
	return b.String()
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
