package parser

import "github.com/microsoft/TypeScript/tsc/internal/ast"

// typeParser is an immutable grammar context shared by type productions without changing
// the recovering parser used by nested expressions or JSDoc. A speculative type
// production returns nil when its structure cannot be established. Diagnostics
// on a recognized type, such as an invalid literal, do not imply failure.
// Optional productions return (nil, true) when absent and (nil, false) on failure.
type typeParser struct {
	*Parser
	allowAmbiguity bool
}

func (p *typeParser) lookAhead(callback func(p *typeParser) bool) bool {
	state := p.mark()
	result := callback(p)
	p.rewind(state)
	return result
}

func (p *typeParser) doInContext(flags ast.NodeFlags, value bool, callback func(p *typeParser) *ast.Node) *ast.Node {
	saveContextFlags := p.contextFlags
	p.setContextFlags(flags, value)
	result := callback(p)
	p.contextFlags = saveContextFlags
	return result
}

func (p *typeParser) parseDelimitedList(kind ParsingContext, parseElement func(p *typeParser) *ast.Node) *ast.NodeList {
	return p.Parser.parseDelimitedListEx(kind, func(_ *Parser) *ast.Node { return parseElement(p) }, p.allowAmbiguity)
}

func (p *typeParser) parseBracketedList(kind ParsingContext, parseElement func(p *typeParser) *ast.Node, opening ast.Kind, closing ast.Kind) *ast.NodeList {
	return p.Parser.parseBracketedListEx(kind, func(_ *Parser) *ast.Node { return parseElement(p) }, opening, closing, p.allowAmbiguity)
}

func (p *typeParser) parseList(kind ParsingContext, parseElement func(p *typeParser) *ast.Node) *ast.NodeList {
	return p.Parser.parseListEx(kind, func(_ *Parser) *ast.Node { return parseElement(p) }, p.allowAmbiguity)
}

func (p *Parser) parseType() *ast.TypeNode {
	types := &p.recoveringTypes
	return types.parseType()
}

func (p *Parser) parseTypeArguments() *ast.NodeList {
	types := &p.recoveringTypes
	return types.parseTypeArguments()
}

func (p *Parser) parseImportAttributes(token ast.Kind, skipKeyword bool) *ast.Node {
	types := &p.recoveringTypes
	return types.parseImportAttributes(token, skipKeyword)
}

func (p *Parser) parseTypeParameters() *ast.NodeList {
	types := &p.recoveringTypes
	result, _ := types.parseTypeParameters()
	return result
}

func (p *Parser) parseParameters(flags ParseFlags) *ast.NodeList {
	types := &p.recoveringTypes
	return types.parseParameters(flags)
}

func (p *Parser) parseParametersWorker(flags ParseFlags, allowAmbiguity bool) *ast.NodeList {
	types := &p.recoveringTypes
	return types.parseParametersWorker(flags, allowAmbiguity)
}

func (p *Parser) parseReturnType(returnToken ast.Kind, isType bool) *ast.TypeNode {
	types := &p.recoveringTypes
	result, _ := types.parseReturnType(returnToken, isType)
	return result
}

func (p *Parser) parseTypeOrTypePredicate() *ast.TypeNode {
	types := &p.recoveringTypes
	return types.parseTypeOrTypePredicate()
}

func (p *Parser) parseTypeMemberSemicolon() {
	types := &p.recoveringTypes
	types.parseTypeMemberSemicolon()
}

func (p *Parser) parseAccessorDeclaration(pos int, jsdoc jsdocScannerInfo, modifiers *ast.ModifierList, kind ast.Kind, flags ParseFlags) *ast.Node {
	types := &p.recoveringTypes
	return types.parseAccessorDeclaration(pos, jsdoc, modifiers, kind, flags)
}

func (p *Parser) parsePropertyName() *ast.Node {
	types := &p.recoveringTypes
	return types.parsePropertyName()
}

func (p *Parser) parseObjectTypeMembers() *ast.NodeList {
	types := &p.recoveringTypes
	return types.parseObjectTypeMembers()
}

func (p *Parser) parseTypeLiteral() *ast.Node {
	types := &p.recoveringTypes
	return types.parseTypeLiteral()
}

func (p *Parser) parseIndexSignatureDeclaration(pos int, jsdoc jsdocScannerInfo, modifiers *ast.ModifierList) *ast.Node {
	types := &p.recoveringTypes
	return types.parseIndexSignatureDeclaration(pos, jsdoc, modifiers)
}

func (p *Parser) parseTypeAnnotation() *ast.TypeNode {
	types := &p.recoveringTypes
	result, _ := types.parseTypeAnnotation()
	return result
}

func (p *typeParser) parseLiteralOfTemplateSpan(isTaggedTemplate bool) *ast.Node {
	if !p.allowAmbiguity && p.token != ast.KindCloseBraceToken {
		return nil
	}
	return p.Parser.parseLiteralOfTemplateSpan(isTaggedTemplate)
}
