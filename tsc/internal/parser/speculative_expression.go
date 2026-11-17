package parser

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
)

type speculationKey struct {
	position                    int
	tokenEnd                    int
	lastDiagnosticPosition      int
	contextFlags                ast.NodeFlags
	parsingContexts             ParsingContexts
	token                       ast.Kind
	tokenFlags                  ast.TokenFlags
	hasParseError               bool
	statementHasAwaitIdentifier bool
}

type probeExpressionKind uint8

const (
	probeExpression probeExpressionKind = iota
	probeAssignment
	probeAssignmentWithoutArrowReturn
)

type probeExpressionKey struct {
	speculationKey
	kind probeExpressionKind
}

type probeExpressionBoundary struct {
	scannerState  scanner.ScannerState
	loc           core.TextRange
	flags         ast.NodeFlags
	hasParseError bool
}

func (p *Parser) speculationKey() speculationKey {
	position := p.nodePos()
	lastDiagnosticPosition := -1
	if len(p.diagnostics) != 0 {
		lastPosition := p.diagnostics[len(p.diagnostics)-1].Pos()
		// Earlier diagnostics cannot suppress errors within this expression.
		if lastPosition >= position {
			lastDiagnosticPosition = lastPosition
		}
	}
	return speculationKey{
		position:                    position,
		tokenEnd:                    p.scanner.TokenEnd(),
		lastDiagnosticPosition:      lastDiagnosticPosition,
		contextFlags:                p.contextFlags,
		parsingContexts:             p.parsingContexts,
		token:                       p.token,
		tokenFlags:                  p.scanner.TokenFlags(),
		hasParseError:               p.hasParseError,
		statementHasAwaitIdentifier: p.statementHasAwaitIdentifier,
	}
}

// parseValueExpression and parseComputedPropertyExpression may return a
// placeholder during speculation. Only its range and flags are meaningful;
// callers must not inspect its kind or children to choose a grammar production.
func (p *Parser) parseValueExpression(allowReturnTypeInArrowFunction bool) *ast.Expression {
	if !p.inExpressionProbe || p.contextFlags&ast.NodeFlagsJSDoc != 0 {
		return p.parseAssignmentExpressionOrHigherWorker(allowReturnTypeInArrowFunction)
	}
	kind := probeAssignment
	if !allowReturnTypeInArrowFunction {
		kind = probeAssignmentWithoutArrowReturn
	}
	return p.parseProbeExpression(kind)
}

func (p *Parser) parseComputedPropertyExpression() *ast.Expression {
	if !p.inExpressionProbe || p.contextFlags&ast.NodeFlagsJSDoc != 0 {
		return p.parseExpressionAllowIn()
	}
	saveContextFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsDisallowInContext, false)
	result := p.parseProbeExpression(probeExpression)
	p.contextFlags = saveContextFlags
	return result
}

func (p *Parser) parseProbeExpression(kind probeExpressionKind) *ast.Expression {
	debug.Assert(p.inExpressionProbe && p.contextFlags&ast.NodeFlagsJSDoc == 0, "Expression caching requires speculation outside JSDoc")
	key := probeExpressionKey{speculationKey: p.speculationKey(), kind: kind}
	if boundary, known := p.probeExpressions[key]; known {
		p.scanner.RewindPosition(boundary.scannerState)
		p.token = p.scanner.Token()
		p.hasParseError = boundary.hasParseError
		p.usedExpressionCache = true
		result := p.factory.NewIdentifier("")
		result.Loc = boundary.loc
		result.Flags = boundary.flags
		p.identifierCount++
		return result
	}
	state := p.mark()
	var result *ast.Expression
	switch kind {
	case probeExpression:
		result = p.parseExpression()
	case probeAssignment:
		result = p.parseAssignmentExpressionOrHigherWorker(true /*allowReturnTypeInArrowFunction*/)
	case probeAssignmentWithoutArrowReturn:
		result = p.parseAssignmentExpressionOrHigherWorker(false /*allowReturnTypeInArrowFunction*/)
	}
	// Existing lexical diagnostics forbid reuse even if a preceding operator
	// has already cleared hasParseError.
	if result != nil && !state.hasParseError && key.lastDiagnosticPosition < 0 &&
		len(p.diagnostics) == state.diagnosticsLen && len(p.jsDiagnostics) == state.jsDiagnosticsLen &&
		len(p.jsdocDiagnostics) == state.jsdocDiagnosticsLen && len(p.reparseList) == len(state.reparseList) &&
		p.commonJSModuleIndicator == state.commonJSModuleIndicator && p.jsdocHasCommonJSConstruct == state.jsdocHasCommonJSConstruct &&
		p.statementHasAwaitIdentifier == state.statementHasAwaitIdentifier {
		boundary := probeExpressionBoundary{
			scannerState:  p.scanner.Mark(),
			loc:           result.Loc,
			flags:         result.Flags,
			hasParseError: p.hasParseError,
		}
		if p.probeExpressions == nil {
			p.probeExpressions = make(map[probeExpressionKey]probeExpressionBoundary)
		}
		p.probeExpressions[key] = boundary
	}
	return result
}
