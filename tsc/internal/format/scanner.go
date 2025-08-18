package format

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/scanner"
)

type TextRangeWithKind struct {
	Loc  core.TextRange
	Kind ast.Kind
}

func NewTextRangeWithKind(pos int, end int, kind ast.Kind) TextRangeWithKind {
	return TextRangeWithKind{
		Loc:  core.NewTextRange(pos, end),
		Kind: kind,
	}
}

type tokenInfo struct {
	leadingTrivia  []TextRangeWithKind
	token          TextRangeWithKind
	trailingTrivia []TextRangeWithKind
}

type formattingScanner struct {
	s                *scanner.Scanner
	startPos         int
	endPos           int
	savedPos         int
	hasLastTokenInfo bool
	lastTokenInfo    tokenInfo
	lastScanAction   scanAction
	leadingTrivia    []TextRangeWithKind
	trailingTrivia   []TextRangeWithKind
	wasNewLine       bool
}

func newFormattingScanner(text string, languageVariant core.LanguageVariant, startPos int, endPos int, worker *formatSpanWorker) []core.TextChange {
	scan := scanner.NewScanner()
	scan.Reset()
	scan.SetSkipTrivia(false)
	scan.SetLanguageVariant(languageVariant)
	scan.SetText(text)

	fmtScn := &formattingScanner{
		s:          scan,
		startPos:   startPos,
		endPos:     endPos,
		wasNewLine: true,
	}

	res := worker.execute(fmtScn)

	fmtScn.hasLastTokenInfo = false
	scan.Reset()

	return res
}

func (s *formattingScanner) advance() {
	s.hasLastTokenInfo = false
	isStarted := s.s.TokenFullStart() != s.startPos

	if isStarted {
		s.wasNewLine = len(s.trailingTrivia) > 0 && core.LastOrNil(s.trailingTrivia).Kind == ast.KindNewLineTrivia
	} else {
		s.s.Scan()
	}

	s.leadingTrivia = nil
	s.trailingTrivia = nil

	pos := s.s.TokenFullStart()

	// Read leading trivia and token
	for pos < s.endPos {
		t := s.s.Token()
		if !ast.IsTrivia(t) {
			break
		}

		// consume leading trivia
		s.s.Scan()
		item := NewTextRangeWithKind(pos, s.s.TokenFullStart(), t)

		pos = s.s.TokenFullStart()

		s.leadingTrivia = append(s.leadingTrivia, item)
	}

	s.savedPos = s.s.TokenFullStart()
}

func shouldRescanGreaterThanToken(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindGreaterThanEqualsToken,
		ast.KindGreaterThanGreaterThanEqualsToken,
		ast.KindGreaterThanGreaterThanGreaterThanEqualsToken,
		ast.KindGreaterThanGreaterThanGreaterThanToken,
		ast.KindGreaterThanGreaterThanToken:
		return true
	}
	return false
}

func shouldRescanJsxIdentifier(node *ast.Node) bool {
	if node.Parent != nil {
		switch node.Parent.Kind {
		case ast.KindJsxAttribute,
			ast.KindJsxOpeningElement,
			ast.KindJsxClosingElement,
			ast.KindJsxSelfClosingElement:
			// May parse an identifier like `module-layout`; that will be scanned as a keyword at first, but we should parse the whole thing to get an identifier.
			return ast.IsKeywordKind(node.Kind) || node.Kind == ast.KindIdentifier
		}
	}
	return false
}

func (s *formattingScanner) shouldRescanJsxText(node *ast.Node) bool {
	if ast.IsJsxText(node) {
		return true
	}
	if !ast.IsJsxElement(node) || s.hasLastTokenInfo == false {
		return false
	}

	return s.lastTokenInfo.token.Kind == ast.KindJsxText
}

func shouldRescanSlashToken(container *ast.Node) bool {
	return container.Kind == ast.KindRegularExpressionLiteral
}

func shouldRescanTemplateToken(container *ast.Node) bool {
	return container.Kind == ast.KindTemplateMiddle ||
		container.Kind == ast.KindTemplateTail
}

func shouldRescanJsxAttributeValue(node *ast.Node) bool {
	return node.Parent != nil && ast.IsJsxAttribute(node.Parent) && node.Parent.Initializer() == node
}

func startsWithSlashToken(t ast.Kind) bool {
	return t == ast.KindSlashToken || t == ast.KindSlashEqualsToken
}

type scanAction int

const (
	actionScan scanAction = iota
	actionRescanGreaterThanToken
	actionRescanSlashToken
	actionRescanTemplateToken
	actionRescanJsxIdentifier
	actionRescanJsxText
	actionRescanJsxAttributeValue
)

func fixTokenKind(tokenInfo tokenInfo, container *ast.Node) tokenInfo {
	if ast.IsTokenKind(container.Kind) && tokenInfo.token.Kind != container.Kind {
		tokenInfo.token.Kind = container.Kind
	}
	return tokenInfo
}

func (s *formattingScanner) readTokenInfo(n *ast.Node) tokenInfo {
	debug.Assert(s.isOnToken())

	// normally scanner returns the smallest available token
	// check the kind of context node to determine if scanner should have more greedy behavior and consume more text.

	var expectedScanAction scanAction
	if shouldRescanGreaterThanToken(n) {
		expectedScanAction = actionRescanGreaterThanToken
	} else if shouldRescanSlashToken(n) {
		expectedScanAction = actionRescanSlashToken
	} else if shouldRescanTemplateToken(n) {
		expectedScanAction = actionRescanTemplateToken
	} else if shouldRescanJsxIdentifier(n) {
		expectedScanAction = actionRescanJsxIdentifier
	} else if s.shouldRescanJsxText(n) {
		expectedScanAction = actionRescanJsxText
	} else if shouldRescanJsxAttributeValue(n) {
		expectedScanAction = actionRescanJsxAttributeValue
	} else {
		expectedScanAction = actionScan
	}

	if s.hasLastTokenInfo && expectedScanAction == s.lastScanAction {
		// readTokenInfo was called before with the same expected scan action.
		// No need to re-scan text, return existing 'lastTokenInfo'
		// it is ok to call fixTokenKind here since it does not affect
		// what portion of text is consumed. In contrast rescanning can change it,
		// i.e. for '>=' when originally scanner eats just one character
		// and rescanning forces it to consume more.
		s.lastTokenInfo = fixTokenKind(s.lastTokenInfo, n)
		return s.lastTokenInfo
	}

	if s.s.TokenFullStart() != s.savedPos {
		// readTokenInfo was called before but scan action differs - rescan text
		s.s.ResetTokenState(s.savedPos)
		s.s.Scan()
	}

	currentToken := s.getNextToken(n, expectedScanAction)

	token := NewTextRangeWithKind(
		s.s.TokenFullStart(),
		s.s.TokenEnd(),
		currentToken,
	)

	// consume trailing trivia
	s.trailingTrivia = nil
	for s.s.TokenFullStart() < s.endPos {
		currentToken = s.s.Scan()
		if !ast.IsTrivia(currentToken) {
			break
		}
		trivia := NewTextRangeWithKind(
			s.s.TokenFullStart(),
			s.s.TokenEnd(),
			currentToken,
		)

		s.trailingTrivia = append(s.trailingTrivia, trivia)

		if currentToken == ast.KindNewLineTrivia {
			// move past new line
			s.s.Scan()
			break
		}
	}

	s.hasLastTokenInfo = true
	s.lastTokenInfo = tokenInfo{
		leadingTrivia:  slices.Clone(s.leadingTrivia),
		token:          token,
		trailingTrivia: slices.Clone(s.trailingTrivia),
	}
	s.lastTokenInfo = fixTokenKind(s.lastTokenInfo, n)

	return s.lastTokenInfo
}

func (s *formattingScanner) getNextToken(n *ast.Node, expectedScanAction scanAction) ast.Kind {
	token := s.s.Token()
	s.lastScanAction = actionScan
	switch expectedScanAction {
	case actionRescanGreaterThanToken:
		if token == ast.KindGreaterThanToken {
			s.lastScanAction = actionRescanGreaterThanToken
			newToken := s.s.ReScanGreaterThanToken()
			debug.Assert(n.Kind == newToken)
			return newToken
		}
	case actionRescanSlashToken:
		if startsWithSlashToken(token) {
			s.lastScanAction = actionRescanSlashToken
			newToken := s.s.ReScanSlashToken()
			debug.Assert(n.Kind == newToken)
			return newToken
		}
	case actionRescanTemplateToken:
		if token == ast.KindCloseBraceToken {
			s.lastScanAction = actionRescanTemplateToken
			return s.s.ReScanTemplateToken( /*isTaggedTemplate*/ false)
		}
	case actionRescanJsxIdentifier:
		s.lastScanAction = actionRescanJsxIdentifier
		return s.s.ScanJsxIdentifier()
	case actionRescanJsxText:
		s.lastScanAction = actionRescanJsxText
		return s.s.ReScanJsxToken( /*allowMultilineJsxText*/ false)
	case actionRescanJsxAttributeValue:
		s.lastScanAction = actionRescanJsxAttributeValue
		return s.s.ReScanJsxAttributeValue()
	case actionScan:
		break
	default:
		debug.AssertNever(expectedScanAction, "unhandled scan action kind")
	}
	return token
}

func (s *formattingScanner) readEOFTokenRange() TextRangeWithKind {
	debug.Assert(s.isOnEOF())
	return NewTextRangeWithKind(
		s.s.TokenFullStart(),
		s.s.TokenEnd(),
		ast.KindEndOfFile,
	)
}

func (s *formattingScanner) isOnToken() bool {
	current := s.s.Token()
	if s.hasLastTokenInfo {
		current = s.lastTokenInfo.token.Kind
	}
	return current != ast.KindEndOfFile && !ast.IsTrivia(current)
}

func (s *formattingScanner) isOnEOF() bool {
	current := s.s.Token()
	if s.hasLastTokenInfo {
		current = s.lastTokenInfo.token.Kind
	}
	return current == ast.KindEndOfFile
}

func (s *formattingScanner) skipToEndOf(r *core.TextRange) {
	s.s.ResetTokenState(r.End())
	s.savedPos = s.s.TokenFullStart()
	s.lastScanAction = actionScan
	s.hasLastTokenInfo = false
	s.wasNewLine = false
	s.leadingTrivia = nil
	s.trailingTrivia = nil
}

func (s *formattingScanner) skipToStartOf(r *core.TextRange) {
	s.s.ResetTokenState(r.Pos())
	s.savedPos = s.s.TokenFullStart()
	s.lastScanAction = actionScan
	s.hasLastTokenInfo = false
	s.wasNewLine = false
	s.leadingTrivia = nil
	s.trailingTrivia = nil
}

func (s *formattingScanner) getCurrentLeadingTrivia() []TextRangeWithKind {
	return s.leadingTrivia
}

func (s *formattingScanner) lastTrailingTriviaWasNewLine() bool {
	return s.wasNewLine
}

func (s *formattingScanner) getTokenFullStart() int {
	if s.hasLastTokenInfo {
		return s.lastTokenInfo.token.Loc.Pos()
	}
	return s.s.TokenFullStart()
}

func (s *formattingScanner) getStartPos() int { // TODO: redundant?
	return s.getTokenFullStart()
}
