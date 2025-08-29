package printer

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type ChangeTrackerWriter struct {
	textWriter
	lastNonTriviaPosition int
	pos                   map[triviaPositionKey]int
	end                   map[triviaPositionKey]int
}

type triviaPositionKey interface { // *astNode | *ast.NodeList
	Pos() int
	End() int
}

func NewChangeTrackerWriter(newline string) *ChangeTrackerWriter {
	ctw := &ChangeTrackerWriter{
		textWriter:            textWriter{newLine: newline},
		lastNonTriviaPosition: 0,
		pos:                   map[triviaPositionKey]int{},
		end:                   map[triviaPositionKey]int{},
	}
	ctw.textWriter.Clear()
	return ctw
}

func (ct *ChangeTrackerWriter) GetPrintHandlers() PrintHandlers {
	return PrintHandlers{
		OnBeforeEmitNode: func(nodeOpt *ast.Node) {
			if nodeOpt != nil {
				ct.setPos(nodeOpt)
			}
		},
		OnAfterEmitNode: func(nodeOpt *ast.Node) {
			if nodeOpt != nil {
				ct.setEnd(nodeOpt)
			}
		},
		OnBeforeEmitNodeList: func(nodesOpt *ast.NodeList) {
			if nodesOpt != nil {
				ct.setPos(nodesOpt)
			}
		},
		OnAfterEmitNodeList: func(nodesOpt *ast.NodeList) {
			if nodesOpt != nil {
				ct.setEnd(nodesOpt)
			}
		},
		OnBeforeEmitToken: func(nodeOpt *ast.TokenNode) {
			if nodeOpt != nil {
				ct.setPos(nodeOpt)
			}
		},
		OnAfterEmitToken: func(nodeOpt *ast.TokenNode) {
			if nodeOpt != nil {
				ct.setEnd(nodeOpt)
			}
		},
	}
}

func (ct *ChangeTrackerWriter) setPos(node triviaPositionKey) {
	ct.pos[node] = ct.lastNonTriviaPosition
}

func (ct *ChangeTrackerWriter) setEnd(node triviaPositionKey) {
	ct.end[node] = ct.lastNonTriviaPosition
}

func (ct *ChangeTrackerWriter) getPos(node triviaPositionKey) int {
	return ct.pos[node]
}

func (ct *ChangeTrackerWriter) getEnd(node triviaPositionKey) int {
	return ct.end[node]
}

func (ct *ChangeTrackerWriter) setLastNonTriviaPosition(s string, force bool) {
	if force || scanner.SkipTrivia(s, 0) != len(s) {
		ct.lastNonTriviaPosition = ct.textWriter.GetTextPos()
		i := 0
		for stringutil.IsWhiteSpaceLike(rune(s[len(s)-i-1])) {
			i++
		}
		// trim trailing whitespaces
		ct.lastNonTriviaPosition -= i
	}
}

func (ct *ChangeTrackerWriter) AssignPositionsToNode(node *ast.Node, factory *ast.NodeFactory) *ast.Node {
	var visitor *ast.NodeVisitor
	visitor = &ast.NodeVisitor{
		Visit:   func(n *ast.Node) *ast.Node { return ct.assignPositionsToNodeWorker(n, visitor) },
		Factory: factory,
		Hooks: ast.NodeVisitorHooks{
			VisitNode:  ct.assignPositionsToNodeWorker,
			VisitNodes: ct.assignPositionsToNodeArray,
			VisitToken: ct.assignPositionsToNodeWorker,
			VisitModifiers: func(modifiers *ast.ModifierList, v *ast.NodeVisitor) *ast.ModifierList {
				if modifiers != nil {
					ct.assignPositionsToNodeArray(&modifiers.NodeList, v)
				}
				return modifiers
			},
		},
	}
	return ct.assignPositionsToNodeWorker(node, visitor)
}

func (ct *ChangeTrackerWriter) assignPositionsToNodeWorker(
	node *ast.Node,
	v *ast.NodeVisitor,
) *ast.Node {
	if node == nil {
		return node
	}
	visited := node.VisitEachChild(v)
	// create proxy node for non synthesized nodes
	newNode := visited
	if !ast.NodeIsSynthesized(visited) {
		newNode = visited.Clone(v.Factory)
	}
	newNode.ForEachChild(func(child *ast.Node) bool {
		child.Parent = newNode
		return true
	})
	newNode.Loc = core.NewTextRange(ct.getPos(node), ct.getEnd(node))
	return newNode
}

func (ct *ChangeTrackerWriter) assignPositionsToNodeArray(
	nodes *ast.NodeList,
	v *ast.NodeVisitor,
) *ast.NodeList {
	visited := v.VisitNodes(nodes)
	if visited == nil {
		return visited
	}
	if nodes == nil {
		// Debug.assert(nodes);
		panic("if nodes is nil, visited should not be nil")
	}
	// clone nodearray if necessary
	nodeArray := visited
	if visited == nodes {
		nodeArray = visited.Clone(v.Factory)
	}

	nodeArray.Loc = core.NewTextRange(ct.getPos(nodes), ct.getEnd(nodes))
	return nodeArray
}

func (ct *ChangeTrackerWriter) Write(text string) {
	ct.textWriter.Write(text)
	ct.setLastNonTriviaPosition(text, false)
}

func (ct *ChangeTrackerWriter) WriteTrailingSemicolon(text string) {
	ct.textWriter.WriteTrailingSemicolon(text)
	ct.setLastNonTriviaPosition(text, false)
}
func (ct *ChangeTrackerWriter) WriteComment(text string) { ct.textWriter.WriteComment(text) }
func (ct *ChangeTrackerWriter) WriteKeyword(text string) {
	ct.textWriter.WriteKeyword(text)
	ct.setLastNonTriviaPosition(text, false)
}

func (ct *ChangeTrackerWriter) WriteOperator(text string) {
	ct.textWriter.WriteOperator(text)
	ct.setLastNonTriviaPosition(text, false)
}

func (ct *ChangeTrackerWriter) WritePunctuation(text string) {
	ct.textWriter.WritePunctuation(text)
	ct.setLastNonTriviaPosition(text, false)
}

func (ct *ChangeTrackerWriter) WriteSpace(text string) {
	ct.textWriter.WriteSpace(text)
	ct.setLastNonTriviaPosition(text, false)
}

func (ct *ChangeTrackerWriter) WriteStringLiteral(text string) {
	ct.textWriter.WriteStringLiteral(text)
	ct.setLastNonTriviaPosition(text, false)
}

func (ct *ChangeTrackerWriter) WriteParameter(text string) {
	ct.textWriter.WriteParameter(text)
	ct.setLastNonTriviaPosition(text, false)
}

func (ct *ChangeTrackerWriter) WriteProperty(text string) {
	ct.textWriter.WriteProperty(text)
	ct.setLastNonTriviaPosition(text, false)
}

func (ct *ChangeTrackerWriter) WriteSymbol(text string, symbol *ast.Symbol) {
	ct.textWriter.WriteSymbol(text, symbol)
	ct.setLastNonTriviaPosition(text, false)
}
func (ct *ChangeTrackerWriter) WriteLine()                { ct.textWriter.WriteLine() }
func (ct *ChangeTrackerWriter) WriteLineForce(force bool) { ct.textWriter.WriteLineForce(force) }
func (ct *ChangeTrackerWriter) IncreaseIndent()           { ct.textWriter.IncreaseIndent() }
func (ct *ChangeTrackerWriter) DecreaseIndent()           { ct.textWriter.DecreaseIndent() }
func (ct *ChangeTrackerWriter) Clear()                    { ct.textWriter.Clear(); ct.lastNonTriviaPosition = 0 }
func (ct *ChangeTrackerWriter) String() string            { return ct.textWriter.String() }
func (ct *ChangeTrackerWriter) RawWrite(s string) {
	ct.textWriter.RawWrite(s)
	ct.setLastNonTriviaPosition(s, false)
}

func (ct *ChangeTrackerWriter) WriteLiteral(s string) {
	ct.textWriter.WriteLiteral(s)
	ct.setLastNonTriviaPosition(s, true)
}
func (ct *ChangeTrackerWriter) GetTextPos() int          { return ct.textWriter.GetTextPos() }
func (ct *ChangeTrackerWriter) GetLine() int             { return ct.textWriter.GetLine() }
func (ct *ChangeTrackerWriter) GetColumn() int           { return ct.textWriter.GetColumn() }
func (ct *ChangeTrackerWriter) GetIndent() int           { return ct.textWriter.GetIndent() }
func (ct *ChangeTrackerWriter) IsAtStartOfLine() bool    { return ct.textWriter.IsAtStartOfLine() }
func (ct *ChangeTrackerWriter) HasTrailingComment() bool { return ct.textWriter.HasTrailingComment() }
func (ct *ChangeTrackerWriter) HasTrailingWhitespace() bool {
	return ct.textWriter.HasTrailingWhitespace()
}
