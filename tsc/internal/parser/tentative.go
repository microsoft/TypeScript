package parser

import "github.com/microsoft/TypeScript/tsc/internal/ast"

type tentativeParseFailure struct{}

type tentativeNode struct {
	kind         ast.Kind
	contextFlags ast.NodeFlags
	node         *ast.Node
}

type tentativeScope struct {
	parser     *Parser
	expression *tentativeExpression
}

type tentativeParse struct {
	tentativeScope
	state           ParserState
	nodes           map[int][]tentativeNode
	parsingFlags    ParsingFlags
	parsingContexts ParsingContexts
}

func (p *Parser) beginTentativeScope() tentativeScope {
	return tentativeScope{parser: p, expression: p.tentativeExpression}
}

func (tc *tentativeScope) suspendExpression() {
	tc.parser.tentativeExpression = nil
}

func (tc *tentativeScope) restore() {
	tc.parser.tentativeExpression = tc.expression
}

func (p *Parser) beginTentativeParse() tentativeParse {
	return tentativeParse{
		tentativeScope:  p.beginTentativeScope(),
		state:           p.mark(),
		parsingFlags:    p.parsingFlags,
		parsingContexts: p.parsingContexts,
	}
}

func (tp *tentativeParse) silence() {
	if tp.nodes == nil {
		tp.nodes = tp.parser.tentativeNodes
		if tp.nodes == nil {
			tp.nodes = make(map[int][]tentativeNode)
		}
	}
	tp.parser.tentativeNodes = tp.nodes
	tp.parser.parsingFlags |= ParsingFlagsTentative
	tp.parser.hasParseError = false
}

func (tp *tentativeParse) rewind() {
	tp.parser.rewind(tp.state)
	tp.parser.parsingFlags = tp.parsingFlags
	tp.parser.parsingContexts = tp.parsingContexts
}

func (tp *tentativeParse) commit() {
	if tp.parser != nil {
		tp.restore()
		tp.parser.tentativeNodes = tp.state.tentativeNodes
	}
	tp.parser = nil
}

func (tp *tentativeParse) revert() {
	if tp.parser != nil {
		tp.rewind()
		tp.parser = nil
	}
}

func (tp *tentativeParse) close() {
	failure := recover()
	if failure == nil {
		tp.revert()
		return
	}
	if tp.parser == nil {
		panic(failure)
	}
	tp.revert()
	if _, ok := failure.(tentativeParseFailure); ok {
		return
	}
	panic(failure)
}

func (p *Parser) getTentativeNode(pos int, kind ast.Kind) *ast.Node {
	for _, annotation := range p.tentativeNodes[pos] {
		if annotation.kind == kind && annotation.contextFlags == p.contextFlags {
			if annotation.node == nil {
				panic(tentativeParseFailure{})
			}
			p.scanner.ResetTokenState(annotation.node.End())
			p.nextToken()
			return annotation.node
		}
	}
	return nil
}

func (p *Parser) recordTentativeNode(pos int, kind ast.Kind, contextFlags ast.NodeFlags, node **ast.Node) {
	failure := recover()
	if failure != nil {
		if _, ok := failure.(tentativeParseFailure); !ok {
			panic(failure)
		}
	}
	p.tentativeNodes[pos] = append(p.tentativeNodes[pos], tentativeNode{kind: kind, contextFlags: contextFlags, node: *node})
	if failure != nil {
		panic(failure)
	}
}
