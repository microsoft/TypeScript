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

// Boundaries only describe diagnostic-free, disposable recognition passes.
// They retain no AST handles and never construct committed expressions.
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
		// Earlier diagnostics cannot be deduplicated with errors in this value.
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

// These entry points are used where the grammar needs a value and its end,
// rather than inspecting the value as an assignment target or binding cover.
// During a probe, callers must not inspect the returned expression's kind or
// children to choose a grammar production. A successful outer probe rebuilds
// any opaque values before committing its AST.
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
	debug.Assert(p.inExpressionProbe && p.contextFlags&ast.NodeFlagsJSDoc == 0, "Expression boundaries are only reusable in disposable probes")
	key := probeExpressionKey{speculationKey: p.speculationKey(), kind: kind}
	if boundary, known := p.probeExpressions[key]; known {
		p.scanner.RewindPosition(boundary.scannerState)
		p.token = p.scanner.Token()
		p.hasParseError = boundary.hasParseError
		// A nested lookahead may rewind its AST after observing this value.
		// Keep the taint until the enclosing speculative parse is discarded.
		p.hasOpaqueExpression = true
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
	// A preceding operator can consume hasParseError after scanning the first
	// token of this value. Its existing diagnostics still prevent boundary reuse.
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
