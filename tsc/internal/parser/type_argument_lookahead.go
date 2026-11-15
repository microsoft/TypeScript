package parser

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

type typeArgumentDelimiter struct {
	kind       ast.Kind
	angleStart int
}

// typeArgumentsMayClose only rejects lists whose closing angle cannot belong
// to the opening token. Parentheses, brackets, and braces fence off inner
// angles, so a comparison inside a group cannot close an outer type list.
// All openings encountered by a scan share its closure facts; nested attempts
// do not repeatedly scan the same suffix. A lexical ambiguity leaves the
// decision to the type grammar, including its diagnostics and recovery.
// A negative proof uses only group fences, semicolons, and EOF in the normal
// lexical goal. Unknown lexical goals and mismatched groups are inconclusive;
// new lexical goals must also defer to grammar instead of rejecting a list.
func (p *Parser) typeArgumentsMayClose() bool {
	start := p.scanner.TokenStart()
	if mayClose, known := p.typeArgumentClosures[start]; known {
		return mayClose
	}
	if p.hasParseError || p.contextFlags&ast.NodeFlagsJSDoc != 0 {
		return true
	}
	state := p.mark()
	defer p.rewind(state)
	angles := make([]int, 1, 8)
	angles[0] = start
	hasNestedSyntax := p.token == ast.KindLessThanLessThanToken
	if hasNestedSyntax {
		angles = append(angles, start+1)
	}
	var groups []typeArgumentDelimiter
	for {
		p.nextToken()
		if p.hasParseError {
			p.recordTypeArgumentClosures(angles, true)
			return true
		}
		switch p.token {
		case ast.KindSlashToken, ast.KindSlashEqualsToken, ast.KindTemplateHead:
			// Selecting the regular-expression/template lexical goal needs grammar.
			p.recordTypeArgumentClosures(angles, true)
			return true
		case ast.KindLessThanToken, ast.KindLessThanLessThanToken:
			angles = append(angles, p.scanner.TokenStart())
			if p.token == ast.KindLessThanLessThanToken {
				angles = append(angles, p.scanner.TokenStart()+1)
			}
			// Nested starts may require the JSX lexical goal.
			if p.languageVariant == core.LanguageVariantJSX && len(groups) != 0 {
				p.recordTypeArgumentClosures(angles, true)
				return true
			}
			hasNestedSyntax = true
		case ast.KindOpenParenToken, ast.KindOpenBracketToken, ast.KindOpenBraceToken:
			groups = append(groups, typeArgumentDelimiter{kind: p.token, angleStart: len(angles)})
			hasNestedSyntax = true
		case ast.KindCloseParenToken, ast.KindCloseBracketToken, ast.KindCloseBraceToken:
			if len(groups) == 0 {
				p.recordTypeArgumentClosures(angles, false)
				return false
			}
			group := groups[len(groups)-1]
			groups = groups[:len(groups)-1]
			if !matchingTypeArgumentDelimiter(group.kind, p.token) {
				p.recordTypeArgumentClosures(angles, true)
				return true
			}
			p.recordTypeArgumentClosures(angles[group.angleStart:], false)
			angles = angles[:group.angleStart]
		case ast.KindEndOfFile:
			p.recordTypeArgumentClosures(angles, false)
			return false
		case ast.KindSemicolonToken:
			angleStart := 0
			if len(groups) != 0 {
				angleStart = groups[len(groups)-1].angleStart
			}
			p.recordTypeArgumentClosures(angles[angleStart:], false)
			angles = angles[:angleStart]
			if len(groups) == 0 {
				return false
			}
		case ast.KindGreaterThanToken:
			// Scan returns one '>' at a time; this lookahead never rescans it.
			angleStart := 0
			if len(groups) != 0 {
				angleStart = groups[len(groups)-1].angleStart
			}
			remaining := max(angleStart, len(angles)-1)
			// Simple lists need no index allocation: the grammar consumes them
			// immediately, and their lookahead contains no recursive work.
			if hasNestedSyntax {
				p.recordTypeArgumentClosures(angles[remaining:], true)
			}
			angles = angles[:remaining]
			if remaining == 0 {
				return true
			}
		}
	}
}

func (p *Parser) recordTypeArgumentClosures(angles []int, mayClose bool) {
	if len(angles) == 0 {
		return
	}
	if p.typeArgumentClosures == nil {
		p.typeArgumentClosures = make(map[int]bool)
	}
	for _, position := range angles {
		// A proof of non-closure takes precedence over an inconclusive scan.
		if previous, known := p.typeArgumentClosures[position]; !known || previous {
			p.typeArgumentClosures[position] = mayClose
		}
	}
}

func matchingTypeArgumentDelimiter(opening ast.Kind, closing ast.Kind) bool {
	switch opening {
	case ast.KindOpenParenToken:
		return closing == ast.KindCloseParenToken
	case ast.KindOpenBracketToken:
		return closing == ast.KindCloseBracketToken
	case ast.KindOpenBraceToken:
		return closing == ast.KindCloseBraceToken
	default:
		panic("Unexpected type-argument delimiter")
	}
}
