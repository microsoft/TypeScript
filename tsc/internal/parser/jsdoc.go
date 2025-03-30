package parser

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type jsdocState int32

const (
	jsdocStateBeginningOfLine jsdocState = iota
	jsdocStateSawAsterisk
	jsdocStateSavingComments
	jsdocStateSavingBackticks
)

type propertyLikeParse int32

const (
	propertyLikeParseProperty propertyLikeParse = 1 << iota
	propertyLikeParseParameter
	propertyLikeParseCallbackParameter
)

func (p *Parser) withJSDoc(node *ast.Node, hasJSDoc bool) {
	if !hasJSDoc {
		return
	}

	if p.jsdocCache == nil {
		p.jsdocCache = make(map[*ast.Node][]*ast.Node)
	} else if _, ok := p.jsdocCache[node]; ok {
		panic("tried to set JSDoc on a node with existing JSDoc")
	}
	// Should only be called once per node
	p.hasDeprecatedTag = false
	ranges := getJSDocCommentRanges(&p.factory, p.jsdocCommentRangesSpace, node, p.sourceText)
	p.jsdocCommentRangesSpace = ranges[:0]
	jsDoc := p.nodeSlicePool.NewSlice(len(ranges))[:0]
	pos := node.Pos()
	for _, comment := range ranges {
		if parsed := p.parseJSDocComment(node, comment.Pos(), comment.End(), pos); parsed != nil {
			jsDoc = append(jsDoc, parsed)
			pos = parsed.End()
		}
	}
	if len(jsDoc) != 0 {
		if node.Flags&ast.NodeFlagsHasJSDoc == 0 {
			node.Flags |= ast.NodeFlagsHasJSDoc
		}
		if p.hasDeprecatedTag {
			p.hasDeprecatedTag = false
			node.Flags |= ast.NodeFlagsDeprecated
		}
		p.jsdocCache[node] = jsDoc
	}
}

func (p *Parser) parseJSDocTypeExpression(mayOmitBraces bool) *ast.Node {
	pos := p.nodePos()
	var hasBrace bool
	if mayOmitBraces {
		hasBrace = p.parseOptional(ast.KindOpenBraceToken)
	} else {
		hasBrace = p.parseExpected(ast.KindOpenBraceToken)
	}
	saveContextFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsJSDoc, true)
	t := p.parseJSDocType()
	p.contextFlags = saveContextFlags
	if hasBrace {
		p.parseExpectedJSDoc(ast.KindCloseBraceToken)
	}

	result := p.factory.NewJSDocTypeExpression(t)
	// normally parent references are set during binding. However, for clients that only need
	// a syntax tree, and no semantic features, then the binding process is an unnecessary
	// overhead.  This functions allows us to set all the parents, without all the expense of
	// binding.
	ast.SetParentInChildren(result)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJSDocNameReference() *ast.Node {
	pos := p.nodePos()
	hasBrace := p.parseOptional(ast.KindOpenBraceToken)
	p2 := p.nodePos()
	entityName := p.parseEntityName(false, nil)
	for p.token == ast.KindPrivateIdentifier {
		p.scanner.ReScanHashToken() // rescan #id as # id
		p.nextTokenJSDoc()          // then skip the #
		entityName = p.factory.NewQualifiedName(entityName, p.parseIdentifier())
		p.finishNode(entityName, p2)
	}
	if hasBrace {
		p.parseExpectedJSDoc(ast.KindCloseBraceToken)
	}

	result := p.factory.NewJSDocNameReference(entityName)
	ast.SetParentInChildren(result)
	p.finishNode(result, pos)
	return result
}

// Pass end=-1 to parse the text to the end
func (p *Parser) parseJSDocComment(parent *ast.Node, start int, end int, fullStart int) *ast.Node {
	if end == -1 {
		end = len(p.sourceText)
	}
	// Check for /** (JSDoc opening part)
	if !isJSDocLikeText(p.sourceText[start:]) {
		// TODO: This should be a panic, unless parseSingleJSDocComment is calling this (not ported yet)
		return nil
	}

	saveSourceText := p.sourceText
	saveToken := p.token
	saveContextFlags := p.contextFlags
	saveParsingContexts := p.parsingContexts
	saveParsingMode := p.scanner.JSDocParsingMode
	saveScannerState := p.scanner.Mark()
	saveDiagnosticsLength := len(p.diagnostics)
	saveHasParseError := p.hasParseError

	// initial indent is start+4 to account for leading `/** `
	// + 1 because \n is one character before the first character in the line and,
	// if there is no \n before start, -1 is one index before the first character in the string
	initialIndent := start + 4 - (strings.LastIndex(p.sourceText[:start], "\n") + 1)
	// -2 for trailing `*/`
	p.sourceText = p.sourceText[:end-2]
	p.scanner.SetText(p.sourceText)
	// +3 for leading `/**`
	p.scanner.ResetPos(start + 3)
	p.setContextFlags(ast.NodeFlagsJSDoc, true)
	p.parsingContexts = p.parsingContexts | ParsingContexts(PCJSDocComment)

	comment := p.parseJSDocCommentWorker(start, end, fullStart, initialIndent)
	comment.Parent = parent
	// move jsdoc diagnostics to jsdocDiagnostics -- for JS files only
	if p.contextFlags&ast.NodeFlagsJavaScriptFile != 0 {
		p.jsdocDiagnostics = append(p.jsdocDiagnostics, p.diagnostics[saveDiagnosticsLength:]...)
	}
	p.diagnostics = p.diagnostics[0:saveDiagnosticsLength]

	p.sourceText = saveSourceText
	p.scanner.SetText(p.sourceText)
	p.parsingContexts = saveParsingContexts
	p.contextFlags = saveContextFlags
	p.scanner.JSDocParsingMode = saveParsingMode
	p.scanner.Rewind(saveScannerState)
	p.token = saveToken
	p.hasParseError = saveHasParseError

	return comment
}

/**
 * @param offset - the offset in the containing file
 * @param indent - the number of spaces to consider as the margin (applies to non-first lines only)
 */
func (p *Parser) parseJSDocCommentWorker(start int, end int, fullStart int, indent int) *ast.Node {
	// Initially we can parse out a tag.  We also have seen a starting asterisk.
	// This is so that /** * @type */ doesn't parse.
	tags := p.nodeSlicePool.NewSlice(1)[:0]
	tagsPos := -1
	tagsEnd := -1
	state := jsdocStateSawAsterisk
	commentParts := p.nodeSlicePool.NewSlice(1)[:0]
	comments := p.jsdocCommentsSpace
	commentsPos := -1
	linkEnd := start
	margin := -1
	pushComment := func(text string) {
		if margin == -1 {
			margin = indent
		}
		comments = append(comments, text)
		indent += len(text)
	}

	p.nextTokenJSDoc()
	for p.parseOptionalJsdoc(ast.KindWhitespaceTrivia) {
	}
	if p.parseOptionalJsdoc(ast.KindNewLineTrivia) {
		state = jsdocStateBeginningOfLine
		indent = 0
	}
loop:
	for {
		switch p.token {
		case ast.KindAtToken:
			comments = removeTrailingWhitespace(comments)
			if commentsPos == -1 {
				commentsPos = p.nodePos()
			}
			tag := p.parseTag(tags, indent)
			if tagsPos == -1 {
				tagsPos = tag.Pos()
			}
			tags = append(tags, tag)
			tagsEnd = tag.End()
			// NOTE: According to usejsdoc.org, a tag goes to end of line, except the last tag.
			// Real-world comments may break this rule, so "BeginningOfLine" will not be a real line beginning
			// for malformed examples like `/** @param {string} x @returns {number} the length */`
			state = jsdocStateBeginningOfLine
			margin = -1
		case ast.KindNewLineTrivia:
			comments = append(comments, p.scanner.TokenText())
			state = jsdocStateBeginningOfLine
			indent = 0
		case ast.KindAsteriskToken:
			asterisk := p.scanner.TokenText()
			if state == jsdocStateSawAsterisk {
				// If we've already seen an asterisk, then we can no longer parse a tag on this line
				state = jsdocStateSavingComments
				pushComment(asterisk)
			} else {
				if state != jsdocStateBeginningOfLine {
					panic("state must be BeginningOfLine")
				}
				// Ignore the first asterisk on a line
				state = jsdocStateSawAsterisk
				indent += len(asterisk)
			}
		case ast.KindWhitespaceTrivia:
			if state == jsdocStateSavingComments {
				panic("whitespace shouldn't come from the scanner while saving top-level comment text")
			}
			// only collect whitespace if we're already saving comments or have just crossed the comment indent margin
			whitespace := p.scanner.TokenText()
			if margin > -1 && indent+len(whitespace) > margin {
				existingIndent := margin - indent
				if existingIndent < 0 {
					existingIndent += len(whitespace)
				}
				if existingIndent < 0 {
					existingIndent = 0
				}
				comments = append(comments, whitespace[existingIndent:])
			}
			indent += len(whitespace)
		case ast.KindEndOfFile:
			break loop
		case ast.KindJSDocCommentTextToken:
			state = jsdocStateSavingComments
			pushComment(p.scanner.TokenValue())
		case ast.KindOpenBraceToken:
			state = jsdocStateSavingComments
			commentEnd := p.scanner.TokenFullStart()
			linkStart := p.scanner.TokenEnd() - 1
			link := p.parseJSDocLink(linkStart)
			if link != nil {
				if linkEnd == start {
					comments = removeLeadingNewlines(comments)
				}
				jsdocText := p.factory.NewJSDocText(strings.Join(comments, ""))
				p.finishNodeWithEnd(jsdocText, linkEnd, commentEnd)
				commentParts = append(commentParts, jsdocText, link)
				comments = comments[:0]
				linkEnd = p.scanner.TokenEnd()
				break
			}
			fallthrough
		default:
			// Anything else is doc comment text. We just save it. Because it
			// wasn't a tag, we can no longer parse a tag on this line until we hit the next
			// line break.
			state = jsdocStateSavingComments
			pushComment(p.scanner.TokenText())
		}
		if state == jsdocStateSavingComments {
			p.nextJSDocCommentTextToken(false)
		} else {
			p.nextTokenJSDoc()
		}
	}
	p.jsdocCommentsSpace = comments[:0] // Reuse this slice for further parses
	if commentsPos == -1 {
		commentsPos = p.scanner.TokenFullStart()
	}
	trimmedComments := trimEnd(strings.Join(comments, ""))
	if len(trimmedComments) > 0 {
		jsdocText := p.factory.NewJSDocText(trimmedComments)
		p.finishNodeWithEnd(jsdocText, linkEnd, commentsPos)
		commentParts = append(commentParts, jsdocText)
	}
	if len(commentParts) > 0 && len(tags) > 0 && commentsPos == -1 {
		panic("having parsed tags implies that the end of the comment span should be set")
	}
	jsdocComment := p.factory.NewJSDoc(
		p.newNodeList(core.NewTextRange(start, commentsPos), commentParts),
		core.IfElse(tagsPos != -1, p.newNodeList(core.NewTextRange(tagsPos, tagsEnd), tags), nil))
	p.finishNodeWithEnd(jsdocComment, fullStart, end)
	return jsdocComment
}

func removeLeadingNewlines(comments []string) []string {
	i := 0
	for i < len(comments) && (comments[i] == "\n" || comments[i] == "\r") {
		i++
	}
	return comments[i:]
}

func trimEnd(s string) string {
	return strings.TrimRightFunc(s, stringutil.IsWhiteSpaceLike)
}

func removeTrailingWhitespace(comments []string) []string {
	end := len(comments)
	for i := len(comments) - 1; i >= 0; i-- {
		trimmed := trimEnd(comments[i])
		if trimmed == "" {
			end = i
		} else {
			comments[i] = trimmed
			break
		}
	}
	return comments[:end]
}

func (p *Parser) isNextNonwhitespaceTokenEndOfFile() bool {
	// We must use infinite lookahead, as there could be any number of newlines :(
	for {
		p.nextTokenJSDoc()
		if p.token == ast.KindEndOfFile {
			return true
		}
		if !(p.token == ast.KindWhitespaceTrivia || p.token == ast.KindNewLineTrivia) {
			return false
		}
	}
}

func (p *Parser) skipWhitespace() {
	if p.token == ast.KindWhitespaceTrivia || p.token == ast.KindNewLineTrivia {
		if p.lookAhead((*Parser).isNextNonwhitespaceTokenEndOfFile) {
			return
			// Don't skip whitespace prior to EoF (or end of comment) - that shouldn't be included in any node's range
		}
	}
	for p.token == ast.KindWhitespaceTrivia || p.token == ast.KindNewLineTrivia {
		p.nextTokenJSDoc()
	}
}

func (p *Parser) skipWhitespaceOrAsterisk() string {
	if p.token == ast.KindWhitespaceTrivia || p.token == ast.KindNewLineTrivia {
		if p.lookAhead((*Parser).isNextNonwhitespaceTokenEndOfFile) {
			return ""
			// Don't skip whitespace prior to EoF (or end of comment) - that shouldn't be included in any node's range
		}
	}

	precedingLineBreak := p.scanner.HasPrecedingLineBreak()
	seenLineBreak := false
	indentText := ""
	for (precedingLineBreak && p.token == ast.KindAsteriskToken) || p.token == ast.KindWhitespaceTrivia || p.token == ast.KindNewLineTrivia {
		indentText += p.scanner.TokenText()
		if p.token == ast.KindNewLineTrivia {
			precedingLineBreak = true
			seenLineBreak = true
			indentText = ""
		} else if p.token == ast.KindAsteriskToken {
			precedingLineBreak = false
		}
		p.nextTokenJSDoc()
	}
	if seenLineBreak {
		return indentText
	} else {
		return ""
	}
}

func (p *Parser) parseTag(tags []*ast.Node, margin int) *ast.Node {
	if p.token != ast.KindAtToken {
		panic("should be called only at the start of a tag")
	}
	start := p.scanner.TokenStart()
	p.nextTokenJSDoc()

	tagName := p.parseJSDocIdentifierName(nil)
	indentText := p.skipWhitespaceOrAsterisk()

	var tag *ast.Node
	switch tagName.Text() {
	case "implements":
		tag = p.parseImplementsTag(start, tagName, margin, indentText)
	case "augments", "extends":
		tag = p.parseAugmentsTag(start, tagName, margin, indentText)
	case "public":
		tag = p.parseSimpleTag(start, func(tagName *ast.IdentifierNode, comments *ast.NodeList) *ast.Node {
			return p.factory.NewJSDocPublicTag(tagName, comments)
		}, tagName, margin, indentText)
	case "private":
		tag = p.parseSimpleTag(start, func(tagName *ast.IdentifierNode, comments *ast.NodeList) *ast.Node {
			return p.factory.NewJSDocPrivateTag(tagName, comments)
		}, tagName, margin, indentText)
	case "protected":
		tag = p.parseSimpleTag(start, func(tagName *ast.IdentifierNode, comments *ast.NodeList) *ast.Node {
			return p.factory.NewJSDocProtectedTag(tagName, comments)
		}, tagName, margin, indentText)
	case "readonly":
		tag = p.parseSimpleTag(start, func(tagName *ast.IdentifierNode, comments *ast.NodeList) *ast.Node {
			return p.factory.NewJSDocReadonlyTag(tagName, comments)
		}, tagName, margin, indentText)
	case "override":
		tag = p.parseSimpleTag(start, func(tagName *ast.IdentifierNode, comments *ast.NodeList) *ast.Node {
			return p.factory.NewJSDocOverrideTag(tagName, comments)
		}, tagName, margin, indentText)
	case "deprecated":
		p.hasDeprecatedTag = true
		tag = p.parseSimpleTag(start, func(tagName *ast.IdentifierNode, comments *ast.NodeList) *ast.Node {
			return p.factory.NewJSDocDeprecatedTag(tagName, comments)
		}, tagName, margin, indentText)
	case "this":
		tag = p.parseThisTag(start, tagName, margin, indentText)
	case "arg", "argument", "param":
		tag = p.parseParameterOrPropertyTag(start, tagName, propertyLikeParseParameter, margin)
	case "return", "returns":
		tag = p.parseReturnTag(tags, start, tagName, margin, indentText)
	case "template":
		tag = p.parseTemplateTag(start, tagName, margin, indentText)
	case "type":
		tag = p.parseTypeTag(tags, start, tagName, margin, indentText)
	case "typedef":
		tag = p.parseTypedefTag(start, tagName, margin, indentText)
	case "callback":
		tag = p.parseCallbackTag(start, tagName, margin, indentText)
	case "overload":
		tag = p.parseOverloadTag(start, tagName, margin, indentText)
	case "satisfies":
		tag = p.parseSatisfiesTag(start, tagName, margin, indentText)
	case "see":
		tag = p.parseSeeTag(start, tagName, margin, indentText)
	case "import":
		tag = p.parseImportTag(start, tagName, margin, indentText)
	default:
		tag = p.parseUnknownTag(start, tagName, margin, indentText)
	}
	if tag == nil {
		panic("tag should not be nil")
	}
	return tag
}

func (p *Parser) parseTrailingTagComments(pos int, end int, margin int, indentText string) *ast.NodeList {
	// some tags, like typedef and callback, have already parsed their comments earlier
	if len(indentText) == 0 {
		margin += end - pos
	}
	var initialMargin string
	if margin < len(indentText) {
		initialMargin = indentText[margin:]
	}
	return p.parseTagComments(margin, &initialMargin)
}

func (p *Parser) parseTagComments(indent int, initialMargin *string) *ast.NodeList {
	commentsPos := p.nodePos()
	comments := p.jsdocTagCommentsSpace
	p.jsdocTagCommentsSpace = nil // !!! can parseTagComments call itself?
	var parts []*ast.Node
	linkEnd := -1
	state := jsdocStateBeginningOfLine
	if indent < 0 {
		panic("indent must be a natural number")
	}
	margin := -1
	pushComment := func(text string) {
		if margin == -1 {
			margin = indent
		}
		comments = append(comments, text)
		indent += len(text)
	}

	if initialMargin != nil {
		// jump straight to saving comments if there is some initial indentation
		if *initialMargin != "" {
			pushComment(*initialMargin)
		}
		state = jsdocStateSawAsterisk
	}
	tok := p.token
loop:
	for {
		switch tok {
		case ast.KindNewLineTrivia:
			state = jsdocStateBeginningOfLine
			// don't use pushComment here because we want to keep the margin unchanged
			comments = append(comments, p.scanner.TokenText())
			indent = 0
		case ast.KindAtToken:
			p.scanner.ResetPos(p.scanner.TokenEnd() - 1)
			break loop
		case ast.KindEndOfFile:
			// Done
			break loop
		case ast.KindWhitespaceTrivia:
			if state == jsdocStateSavingComments || state == jsdocStateSavingBackticks {
				panic("whitespace shouldn't come from the scanner while saving comment text")
			}
			whitespace := p.scanner.TokenText()
			// if the whitespace crosses the margin, take only the whitespace that passes the margin
			if margin > -1 && indent+len(whitespace) > margin {
				comments = append(comments, whitespace[max(margin-indent, 0):])
				state = jsdocStateSavingComments
			}
			indent += len(whitespace)
		case ast.KindOpenBraceToken:
			state = jsdocStateSavingComments
			commentEnd := p.scanner.TokenFullStart()
			linkStart := p.scanner.TokenEnd() - 1
			link := p.parseJSDocLink(linkStart)
			if link != nil {
				text := p.factory.NewJSDocText(strings.Join(comments, ""))
				var commentStart int
				if linkEnd > -1 {
					commentStart = linkEnd
				} else {
					commentStart = commentsPos
				}
				p.finishNodeWithEnd(text, commentStart, commentEnd)
				parts = append(parts, text)
				parts = append(parts, link)
				comments = comments[:0]
				linkEnd = p.scanner.TokenEnd()
			} else {
				pushComment(p.scanner.TokenText())
			}
		case ast.KindBacktickToken:
			if state == jsdocStateSavingBackticks {
				state = jsdocStateSavingComments
			} else {
				state = jsdocStateSavingBackticks
			}
			pushComment(p.scanner.TokenText())
		case ast.KindJSDocCommentTextToken:
			if state != jsdocStateSavingBackticks {
				state = jsdocStateSavingComments
				// leading identifiers start recording as well
			}
			pushComment(p.scanner.TokenValue())
		case ast.KindAsteriskToken:
			if state == jsdocStateBeginningOfLine {
				// leading asterisks start recording on the *next* (non-whitespace) token
				state = jsdocStateSawAsterisk
				indent += 1
				break
			}
			// record the * as a comment
			fallthrough
		default:
			if state != jsdocStateSavingBackticks {
				state = jsdocStateSavingComments
				// leading identifiers start recording as well
			}
			pushComment(p.scanner.TokenText())
		}
		if state == jsdocStateSavingComments || state == jsdocStateSavingBackticks {
			tok = p.nextJSDocCommentTextToken(state == jsdocStateSavingBackticks)
		} else {
			tok = p.nextTokenJSDoc()
		}
	}

	p.jsdocTagCommentsSpace = comments[:0]

	comments = removeLeadingNewlines(comments)
	trimmedComments := trimEnd(strings.Join(comments, ""))
	if len(trimmedComments) > 0 {
		var commentStart int
		if linkEnd > -1 {
			commentStart = linkEnd
		} else {
			commentStart = commentsPos
		}
		text := p.factory.NewJSDocText(trimmedComments)
		p.finishNode(text, commentStart)
		parts = append(parts, text)
	}
	if len(parts) > 0 {
		return p.newNodeList(core.NewTextRange(commentsPos, p.scanner.TokenEnd()), parts)
	}
	return nil
}

func (p *Parser) parseJSDocLink(start int) *ast.Node {
	state := p.mark()
	linkType, ok := p.parseJSDocLinkPrefix()
	if !ok {
		p.rewind(state)
		return nil
	}
	p.nextTokenJSDoc()
	// start at token after link, then skip any whitespace
	p.skipWhitespace()
	name := p.parseJSDocLinkName()
	var text []string
	for p.token != ast.KindCloseBraceToken && p.token != ast.KindNewLineTrivia && p.token != ast.KindEndOfFile {
		text = append(text, p.scanner.TokenText())
		p.nextTokenJSDoc() // Couldn't this be nextTokenCommentJSDoc?
	}
	var create *ast.Node
	switch linkType {
	case "link":
		create = p.factory.NewJSDocLink(name, strings.Join(text, ""))
	case "linkcode":
		create = p.factory.NewJSDocLinkCode(name, strings.Join(text, ""))
	default:
		create = p.factory.NewJSDocLinkPlain(name, strings.Join(text, ""))
	}
	p.finishNodeWithEnd(create, start, p.scanner.TokenEnd())
	return create
}

func (p *Parser) parseJSDocLinkName() *ast.Node {
	if tokenIsIdentifierOrKeyword(p.token) {
		pos := p.nodePos()

		name := p.parseIdentifierName()
		for p.parseOptional(ast.KindDotToken) {
			var right *ast.IdentifierNode
			if p.token == ast.KindPrivateIdentifier {
				right = p.createMissingIdentifier()
			} else {
				right = p.parseIdentifierName()
			}
			name = p.factory.NewQualifiedName(name, right)
			p.finishNode(name, pos)
		}

		for p.token == ast.KindPrivateIdentifier {
			p.scanner.ReScanHashToken()
			p.nextTokenJSDoc()
			name = p.factory.NewQualifiedName(name, p.parseIdentifier())
			p.finishNode(name, pos)
		}
		return name
	}
	return nil
}

func (p *Parser) parseJSDocLinkPrefix() (string, bool) {
	p.skipWhitespaceOrAsterisk()
	if p.token == ast.KindOpenBraceToken && p.nextTokenJSDoc() == ast.KindAtToken && tokenIsIdentifierOrKeyword(p.nextTokenJSDoc()) {
		kind := p.scanner.TokenValue()
		if isJSDocLinkTag(kind) {
			return kind, true
		}
	}
	return "NONE", false
}

func isJSDocLinkTag(kind string) bool {
	return kind == "link" || kind == "linkcode" || kind == "linkplain"
}

func (p *Parser) parseUnknownTag(start int, tagName *ast.IdentifierNode, indent int, indentText string) *ast.Node {
	tag := p.factory.NewJSDocUnknownTag(tagName, p.parseTrailingTagComments(start, p.nodePos(), indent, indentText))
	p.finishNode(tag, start)
	return tag
}

func (p *Parser) tryParseTypeExpression() *ast.Node {
	p.skipWhitespaceOrAsterisk()
	if p.token == ast.KindOpenBraceToken {
		return p.parseJSDocTypeExpression(false /*mayOmitBraces*/)
	} else {
		return nil
	}
}

func (p *Parser) parseBracketNameInPropertyAndParamTag() (name *ast.EntityName, isBracketed bool) {
	// Looking for something like '[foo]', 'foo', '[foo.bar]' or 'foo.bar'
	isBracketed = p.parseOptionalJsdoc(ast.KindOpenBracketToken)
	if isBracketed {
		p.skipWhitespace()
	}
	// a markdown-quoted name: `arg` is not legal jsdoc, but occurs in the wild
	isBackquoted := p.parseOptionalJsdoc(ast.KindBacktickToken)
	name = p.parseJSDocEntityName()
	if isBackquoted {
		p.parseExpectedTokenJSDoc(ast.KindBacktickToken)
	}
	if isBracketed {
		p.skipWhitespace()
		// May have an optional default, e.g. '[foo = 42]'
		if p.parseOptionalToken(ast.KindEqualsToken) != nil {
			p.parseExpression()
		}

		p.parseExpected(ast.KindCloseBracketToken)
	}

	return name, isBracketed
}

func isObjectOrObjectArrayTypeReference(node *ast.TypeNode) bool {
	switch node.Kind {
	case ast.KindObjectKeyword:
		return true
	case ast.KindArrayType:
		return isObjectOrObjectArrayTypeReference(node.AsArrayTypeNode().ElementType)
	default:
		if ast.IsTypeReferenceNode(node) {
			ref := node.AsTypeReferenceNode()
			return ast.IsIdentifier(ref.TypeName) && ref.TypeName.AsIdentifier().Text == "Object" && ref.TypeArguments == nil
		}
		return false
	}
}

func (p *Parser) parseParameterOrPropertyTag(start int, tagName *ast.IdentifierNode, target propertyLikeParse, indent int) *ast.Node {
	typeExpression := p.tryParseTypeExpression()
	isNameFirst := typeExpression == nil
	p.skipWhitespaceOrAsterisk()

	name, isBracketed := p.parseBracketNameInPropertyAndParamTag()
	indentText := p.skipWhitespaceOrAsterisk()

	if isNameFirst && p.lookAhead(func(p *Parser) bool { _, ok := p.parseJSDocLinkPrefix(); return !ok }) {
		typeExpression = p.tryParseTypeExpression()
	}

	comment := p.parseTrailingTagComments(start, p.nodePos(), indent, indentText)

	nestedTypeLiteral := p.parseNestedTypeLiteral(typeExpression, name, target, indent)
	if nestedTypeLiteral != nil {
		typeExpression = nestedTypeLiteral
		isNameFirst = true
	}
	var result *ast.Node /* JSDocPropertyTag | JSDocParameterTag */
	if target == propertyLikeParseProperty {
		result = p.factory.NewJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment)
	} else {
		result = p.factory.NewJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment)
	}
	p.finishNode(result, start)
	return result
}

func (p *Parser) parseNestedTypeLiteral(typeExpression *ast.Node, name *ast.EntityName, target propertyLikeParse, indent int) *ast.Node {
	if typeExpression != nil && isObjectOrObjectArrayTypeReference(typeExpression.Type()) {
		pos := p.nodePos()
		var children []*ast.Node
		for {
			state := p.mark()
			child := p.parseChildParameterOrPropertyTag(target, indent, name)
			if child == nil {
				p.rewind(state)
				break
			}
			if child.Kind == ast.KindJSDocParameterTag || child.Kind == ast.KindJSDocPropertyTag {
				children = append(children, child)
			} else if child.Kind == ast.KindJSDocTemplateTag {
				p.parseErrorAtRange(child.AsJSDocTemplateTag().TagName.Loc, diagnostics.A_JSDoc_template_tag_may_not_follow_a_typedef_callback_or_overload_tag)
			}
		}
		if children != nil {
			literal := p.factory.NewJSDocTypeLiteral(children, typeExpression.Type().Kind == ast.KindArrayType)
			p.finishNode(literal, pos)
			result := p.factory.NewJSDocTypeExpression(literal)
			p.finishNode(result, pos)
			return result
		}
	}
	return nil
}

func (p *Parser) parseReturnTag(previousTags []*ast.Node, start int, tagName *ast.IdentifierNode, indent int, indentText string) *ast.Node {
	if core.Some(previousTags, ast.IsJSDocReturnTag) {
		p.parseErrorAt(tagName.Pos(), p.scanner.TokenStart(), diagnostics.X_0_tag_already_specified, tagName.Text())
	}

	typeExpression := p.tryParseTypeExpression()
	result := p.factory.NewJSDocReturnTag(tagName, typeExpression, p.parseTrailingTagComments(start, p.nodePos(), indent, indentText))
	p.finishNode(result, start)
	return result
}

// pass indent=-1 to skip parsing trailing comments (as when a type tag is nested in a typedef)
func (p *Parser) parseTypeTag(previousTags []*ast.Node, start int, tagName *ast.IdentifierNode, indent int, indentText string) *ast.Node {
	if core.Some(previousTags, ast.IsJSDocTypeTag) {
		p.parseErrorAt(tagName.Pos(), p.scanner.TokenStart(), diagnostics.X_0_tag_already_specified, tagName.Text())
	}

	typeExpression := p.parseJSDocTypeExpression(true)
	var comments *ast.NodeList
	if indent != -1 {
		comments = p.parseTrailingTagComments(start, p.nodePos(), indent, indentText)
	}
	result := p.factory.NewJSDocTypeTag(tagName, typeExpression, comments)
	p.finishNode(result, start)
	return result
}

func (p *Parser) parseSeeTag(start int, tagName *ast.IdentifierNode, indent int, indentText string) *ast.Node {
	isMarkdownOrJSDocLink := p.token == ast.KindOpenBracketToken || p.lookAhead(func(p *Parser) bool {
		return p.nextTokenJSDoc() == ast.KindAtToken && tokenIsIdentifierOrKeyword(p.nextTokenJSDoc()) && isJSDocLinkTag(p.scanner.TokenValue())
	})
	var nameExpression *ast.Node
	if !isMarkdownOrJSDocLink {
		nameExpression = p.parseJSDocNameReference()
	}
	comments := p.parseTrailingTagComments(start, p.nodePos(), indent, indentText)
	result := p.factory.NewJSDocSeeTag(tagName, nameExpression, comments)
	p.finishNode(result, start)
	return result
}

func (p *Parser) parseImplementsTag(start int, tagName *ast.IdentifierNode, margin int, indentText string) *ast.Node {
	className := p.parseExpressionWithTypeArgumentsForAugments()
	result := p.factory.NewJSDocImplementsTag(tagName, className, p.parseTrailingTagComments(start, p.nodePos(), margin, indentText))
	p.finishNode(result, start)
	return result
}

func (p *Parser) parseAugmentsTag(start int, tagName *ast.IdentifierNode, margin int, indentText string) *ast.Node {
	className := p.parseExpressionWithTypeArgumentsForAugments()
	result := p.factory.NewJSDocAugmentsTag(tagName, className, p.parseTrailingTagComments(start, p.nodePos(), margin, indentText))
	p.finishNode(result, start)
	return result
}

func (p *Parser) parseSatisfiesTag(start int, tagName *ast.IdentifierNode, margin int, indentText string) *ast.Node {
	typeExpression := p.parseJSDocTypeExpression(false)
	comments := p.parseTrailingTagComments(start, p.nodePos(), margin, indentText)
	result := p.factory.NewJSDocSatisfiesTag(tagName, typeExpression, comments)
	p.finishNode(result, start)
	return result
}

func (p *Parser) parseImportTag(start int, tagName *ast.IdentifierNode, margin int, indentText string) *ast.Node {
	afterImportTagPos := p.scanner.TokenFullStart()

	var identifier *ast.IdentifierNode
	if p.isIdentifier() {
		identifier = p.parseIdentifier()
	}

	importClause := p.tryParseImportClause(identifier, afterImportTagPos, true /*isTypeOnly*/, true /*skipJsDocLeadingAsterisks*/)
	moduleSpecifier := p.parseModuleSpecifier()
	attributes := p.tryParseImportAttributes()

	comments := p.parseTrailingTagComments(start, p.nodePos(), margin, indentText)
	result := p.factory.NewJSDocImportTag(tagName, importClause, moduleSpecifier, attributes, comments)
	p.finishNode(result, start)
	return result
}

func (p *Parser) parseExpressionWithTypeArgumentsForAugments() *ast.Node {
	usedBrace := p.parseOptional(ast.KindOpenBraceToken)
	pos := p.nodePos()
	expression := p.parsePropertyAccessEntityNameExpression()
	p.scanner.SetSkipJsDocLeadingAsterisks(true)
	typeArguments := p.parseTypeArguments()
	p.scanner.SetSkipJsDocLeadingAsterisks(false)
	node := p.factory.NewExpressionWithTypeArguments(expression, typeArguments)
	res := node
	p.finishNode(node, pos)
	if usedBrace {
		p.parseExpected(ast.KindCloseBraceToken)
	}
	return res
}

func (p *Parser) parsePropertyAccessEntityNameExpression() *ast.Node {
	pos := p.nodePos()
	node := p.parseJSDocIdentifierName(nil)
	for p.parseOptional(ast.KindDotToken) {
		name := p.parseJSDocIdentifierName(nil)
		node = p.factory.NewPropertyAccessExpression(node, nil, name, ast.NodeFlagsNone)
		p.finishNode(node, pos)
	}
	return node
}

func (p *Parser) parseSimpleTag(start int, createTag func(tagName *ast.IdentifierNode, comment *ast.NodeList) *ast.Node, tagName *ast.IdentifierNode, margin int, indentText string) *ast.Node {
	tag := createTag(tagName, p.parseTrailingTagComments(start, p.nodePos(), margin, indentText))
	p.finishNode(tag, start)
	return tag
}

func (p *Parser) parseThisTag(start int, tagName *ast.IdentifierNode, margin int, indentText string) *ast.Node {
	typeExpression := p.parseJSDocTypeExpression(true)
	p.skipWhitespace()
	result := p.factory.NewJSDocThisTag(tagName, typeExpression, p.parseTrailingTagComments(start, p.nodePos(), margin, indentText))
	p.finishNode(result, start)
	return result
}

func (p *Parser) parseTypedefTag(start int, tagName *ast.IdentifierNode, indent int, indentText string) *ast.Node {
	typeExpression := p.tryParseTypeExpression()
	p.skipWhitespaceOrAsterisk()

	fullName := p.parseJSDocTypeNameWithNamespace(false /*nested*/)
	p.skipWhitespace()
	comment := p.parseTagComments(indent, nil)

	end := -1
	hasChildren := false
	if typeExpression == nil || isObjectOrObjectArrayTypeReference(typeExpression.Type()) {
		var child *ast.Node
		var childTypeTag *ast.JSDocTypeTag
		var jsDocPropertyTags []*ast.Node
		for {
			state := p.mark()
			child = p.parseChildPropertyTag(indent)
			if child == nil {
				p.rewind(state)
				break
			}
			if child.Kind == ast.KindJSDocTemplateTag {
				break
			}
			hasChildren = true
			if child.Kind == ast.KindJSDocTypeTag {
				if childTypeTag == nil {
					childTypeTag = child.AsJSDocTypeTag()
				} else {
					lastError := p.parseErrorAtCurrentToken(diagnostics.A_JSDoc_typedef_comment_may_not_contain_multiple_type_tags)
					if lastError != nil {
						related := ast.NewDiagnostic(nil, core.NewTextRange(0, 0), diagnostics.The_tag_was_first_specified_here)
						lastError.AddRelatedInfo(related)
					}
					break
				}
			} else {
				jsDocPropertyTags = append(jsDocPropertyTags, child)
			}
		}
		if hasChildren {
			isArrayType := typeExpression != nil && typeExpression.Type().Kind == ast.KindArrayType
			jsdocTypeLiteral := p.factory.NewJSDocTypeLiteral(jsDocPropertyTags, isArrayType)
			if childTypeTag != nil && childTypeTag.TypeExpression != nil && !isObjectOrObjectArrayTypeReference(childTypeTag.TypeExpression.Type()) {
				typeExpression = childTypeTag.TypeExpression
			} else {
				p.finishNode(jsdocTypeLiteral, start)
				typeExpression = jsdocTypeLiteral
			}
		}
	}

	// Only include the characters between the name end and the next token if a comment was actually parsed out - otherwise it's just whitespace
	if end == -1 {
		if hasChildren && typeExpression != nil {
			end = typeExpression.End()
		} else if comment != nil {
			end = p.nodePos()
		} else if fullName != nil {
			end = fullName.End()
		} else if typeExpression != nil {
			end = typeExpression.End()
		} else {
			end = tagName.End()
		}
	}

	if comment == nil {
		comment = p.parseTrailingTagComments(start, end, indent, indentText)
	}

	typedefTag := p.factory.NewJSDocTypedefTag(tagName, typeExpression, fullName, comment)
	p.finishNodeWithEnd(typedefTag, start, end)
	return typedefTag
}

func (p *Parser) parseJSDocTypeNameWithNamespace(nested bool) *ast.Node {
	start := p.scanner.TokenStart()
	typeNameOrNamespaceName := p.parseJSDocIdentifierName(nil)
	if p.parseOptional(ast.KindDotToken) {
		body := p.parseJSDocTypeNameWithNamespace(true)
		jsDocNamespaceNode := p.factory.NewModuleDeclaration(nil /*modifiers*/, ast.KindModuleKeyword, typeNameOrNamespaceName, body)
		p.finishNode(jsDocNamespaceNode, start)
		return jsDocNamespaceNode
	}

	return typeNameOrNamespaceName
}

func (p *Parser) parseCallbackTagParameters(indent int) *ast.NodeList {
	var child *ast.Node
	var parameters []*ast.Node
	pos := p.nodePos()
	for {
		state := p.mark()
		child = p.parseChildParameterOrPropertyTag(propertyLikeParseCallbackParameter, indent, nil)
		if child == nil {
			p.rewind(state)
			break
		}
		if child.Kind == ast.KindJSDocTemplateTag {
			p.parseErrorAtRange(child.AsJSDocTemplateTag().TagName.Loc, diagnostics.A_JSDoc_template_tag_may_not_follow_a_typedef_callback_or_overload_tag)
			break
		}
		parameters = append(parameters, child)
	}
	return p.newNodeList(core.NewTextRange(pos, p.nodePos()), parameters)
}

func (p *Parser) parseJSDocSignature(start int, indent int) *ast.Node {
	parameters := p.parseCallbackTagParameters(indent)
	var returnTag *ast.JSDocTag
	state := p.mark()
	if p.parseOptionalJsdoc(ast.KindAtToken) {
		tag := p.parseTag(nil, indent)
		if tag.Kind == ast.KindJSDocReturnTag {
			returnTag = tag
		}
	}
	if returnTag == nil {
		p.rewind(state)
	}
	result := p.factory.NewJSDocSignature(nil, parameters, returnTag)
	p.finishNode(result, start)
	return result
}

func (p *Parser) parseCallbackTag(start int, tagName *ast.IdentifierNode, indent int, indentText string) *ast.Node {
	fullName := p.parseJSDocTypeNameWithNamespace(false /*nested*/)
	p.skipWhitespace()
	comment := p.parseTagComments(indent, nil)
	typeExpression := p.parseJSDocSignature(start, indent)
	if comment == nil {
		comment = p.parseTrailingTagComments(start, p.nodePos(), indent, indentText)
	}
	var end int
	if comment != nil {
		end = p.nodePos()
	} else {
		end = typeExpression.End()
	}
	result := p.factory.NewJSDocCallbackTag(tagName, typeExpression, fullName, comment)
	p.finishNodeWithEnd(result, start, end)
	return result
}

func (p *Parser) parseOverloadTag(start int, tagName *ast.IdentifierNode, indent int, indentText string) *ast.Node {
	p.skipWhitespace()
	comment := p.parseTagComments(indent, nil)
	typeExpression := p.parseJSDocSignature(start, indent)
	if comment == nil {
		comment = p.parseTrailingTagComments(start, p.nodePos(), indent, indentText)
	}
	var end int
	if comment != nil {
		end = p.nodePos()
	} else {
		end = typeExpression.End()
	}
	result := p.factory.NewJSDocOverloadTag(tagName, typeExpression, comment)
	p.finishNodeWithEnd(result, start, end)
	return result
}

func textsEqual(a *ast.EntityName, b *ast.EntityName) bool {
	for !ast.IsIdentifier(a) || !ast.IsIdentifier(b) {
		if !ast.IsIdentifier(a) && !ast.IsIdentifier(b) && a.AsQualifiedName().Right.Text() == b.AsQualifiedName().Right.Text() {
			a = a.AsQualifiedName().Left
			b = b.AsQualifiedName().Left
		} else {
			return false
		}
	}
	return a.AsIdentifier().Text == b.AsIdentifier().Text
}

func (p *Parser) parseChildPropertyTag(indent int) *ast.Node {
	return p.parseChildParameterOrPropertyTag(propertyLikeParseProperty, indent, nil)
}

func (p *Parser) parseChildParameterOrPropertyTag(target propertyLikeParse, indent int, name *ast.EntityName) *ast.Node {
	canParseTag := true
	seenAsterisk := false
	for {
		switch p.nextTokenJSDoc() {
		case ast.KindAtToken:
			if canParseTag {
				child := p.tryParseChildTag(target, indent)
				if child != nil && name != nil &&
					(child.Kind == ast.KindJSDocParameterTag || child.Kind == ast.KindJSDocPropertyTag) &&
					(ast.IsIdentifier(child.Name()) || !textsEqual(name, child.Name().AsQualifiedName().Left)) {
					return nil
				}
				return child
			}
			seenAsterisk = false
		case ast.KindNewLineTrivia:
			canParseTag = true
			seenAsterisk = false
		case ast.KindAsteriskToken:
			if seenAsterisk {
				canParseTag = false
			}
			seenAsterisk = true
		case ast.KindIdentifier:
			canParseTag = false
		case ast.KindEndOfFile:
			return nil
		}
	}
}

func (p *Parser) tryParseChildTag(target propertyLikeParse, indent int) *ast.Node {
	if p.token != ast.KindAtToken {
		panic("should only be called when at @")
	}
	start := p.scanner.TokenFullStart()
	p.nextTokenJSDoc()

	tagName := p.parseJSDocIdentifierName(nil)
	indentText := p.skipWhitespaceOrAsterisk()
	var t propertyLikeParse
	switch tagName.Text() {
	case "type":
		if target == propertyLikeParseProperty {
			return p.parseTypeTag(nil, start, tagName, -1, "")
		}
	case "prop", "property":
		t = propertyLikeParseProperty
	case "arg", "argument", "param":
		t = propertyLikeParseParameter | propertyLikeParseCallbackParameter
	case "template":
		return p.parseTemplateTag(start, tagName, indent, indentText)
	case "this":
		return p.parseThisTag(start, tagName, indent, indentText)
	default:
		return nil
	}
	if (target & t) == 0 {
		return nil
	}
	return p.parseParameterOrPropertyTag(start, tagName, target, indent)
}

func (p *Parser) parseTemplateTagTypeParameter() *ast.Node {
	typeParameterPos := p.nodePos()
	isBracketed := p.parseOptionalJsdoc(ast.KindOpenBracketToken)
	if isBracketed {
		p.skipWhitespace()
	}

	modifiers := p.parseModifiersEx(false, true /*permitConstAsModifier*/, false)
	name := p.parseJSDocIdentifierName(diagnostics.Unexpected_token_A_type_parameter_name_was_expected_without_curly_braces)
	var defaultType *ast.Node
	if isBracketed {
		p.skipWhitespace()
		p.parseExpected(ast.KindEqualsToken)
		saveContextFlags := p.contextFlags
		p.setContextFlags(ast.NodeFlagsJSDoc, true)
		defaultType = p.parseJSDocType()
		p.contextFlags = saveContextFlags
		p.parseExpected(ast.KindCloseBracketToken)
	}

	if ast.NodeIsMissing(name) {
		return nil
	}
	result := p.factory.NewTypeParameterDeclaration(modifiers, name /*constraint*/, nil, defaultType)
	p.finishNode(result, typeParameterPos)
	return result
}

func (p *Parser) parseTemplateTagTypeParameters() *ast.TypeParameterList {
	typeParameters := ast.TypeParameterList{}
	for ok := true; ok; ok = p.parseOptionalJsdoc(ast.KindCommaToken) { // do-while loop
		p.skipWhitespace()
		node := p.parseTemplateTagTypeParameter()
		if node != nil {
			typeParameters.Nodes = append(typeParameters.Nodes, node)
		}
		p.skipWhitespaceOrAsterisk()
	}
	return &typeParameters
}

func (p *Parser) parseTemplateTag(start int, tagName *ast.IdentifierNode, indent int, indentText string) *ast.Node {
	// The template tag looks like one of the following:
	//   @template T,U,V
	//   @template {Constraint} T
	//
	// According to the [closure docs](https://github.com/google/closure-compiler/wiki/Generic-Types#multiple-bounded-template-types):
	//   > Multiple bounded generics cannot be declared on the same line. For the sake of clarity, if multiple templates share the same
	//   > type bound they must be declared on separate lines.
	//
	// TODO: Determine whether we should enforce this in the checker.
	// TODO: Consider moving the `constraint` to the first type parameter as we could then remove `getEffectiveConstraintOfTypeParameter`.
	// TODO: Consider only parsing a single type parameter if there is a constraint.
	var constraint *ast.Node
	if p.token == ast.KindOpenBraceToken {
		constraint = p.parseJSDocTypeExpression(false)
	}
	typeParameters := p.parseTemplateTagTypeParameters()
	result := p.factory.NewJSDocTemplateTag(tagName, constraint, typeParameters, p.parseTrailingTagComments(start, p.nodePos(), indent, indentText))
	p.finishNode(result, start)
	return result
}

func (p *Parser) parseOptionalJsdoc(t ast.Kind) bool {
	if p.token == t {
		p.nextTokenJSDoc()
		return true
	}
	return false
}

func (p *Parser) parseJSDocEntityName() *ast.EntityName {
	var entity *ast.EntityName = p.parseJSDocIdentifierName(nil)
	if p.parseOptional(ast.KindOpenBracketToken) {
		p.parseExpected(ast.KindCloseBracketToken)
		// Note that y[] is accepted as an entity name, but the postfix brackets are not saved for checking.
		// Technically usejsdoc.org requires them for specifying a property of a type equivalent to Array<{ x: ...}>
		// but it's not worth it to enforce that restriction.
	}
	for p.parseOptional(ast.KindDotToken) {
		name := p.parseJSDocIdentifierName(nil)
		if p.parseOptional(ast.KindOpenBracketToken) {
			p.parseExpected(ast.KindCloseBracketToken)
		}
		pos := entity.Pos()
		entity = p.factory.NewQualifiedName(entity, name)
		p.finishNode(entity, pos)
	}
	return entity
}

func (p *Parser) parseJSDocIdentifierName(diagnosticMessage *diagnostics.Message) *ast.IdentifierNode {
	if !tokenIsIdentifierOrKeyword(p.token) {
		if diagnosticMessage != nil {
			p.parseErrorAtCurrentToken(diagnosticMessage)
		} else if isReservedWord(p.token) {
			p.parseErrorAtCurrentToken(diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, p.scanner.TokenText())
		} else {
			p.parseErrorAtCurrentToken(diagnostics.Identifier_expected)
		}
		result := p.newIdentifier("")
		p.finishNode(result, p.nodePos())
		return result
	}
	pos := p.scanner.TokenStart()
	end := p.scanner.TokenEnd()
	text := p.scanner.TokenValue()
	p.internIdentifier(text)
	p.nextTokenJSDoc()
	result := p.newIdentifier(text)
	p.finishNodeWithEnd(result, pos, end)
	return result
}
