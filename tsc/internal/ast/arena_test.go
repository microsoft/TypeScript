package ast_test

import (
	"runtime"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/parsetestutil"
	"gotest.tools/v3/assert"
)

// churn runs the collector and reuses whatever memory it released.
func churn() {
	for range 3 {
		runtime.GC()
	}
	garbage := make([][]byte, 0, 4096)
	for range cap(garbage) {
		garbage = append(garbage, []byte(strings.Repeat("x", 4096)))
	}
	runtime.KeepAlive(garbage)
	runtime.GC()
}

func findIdentifier(node *ast.Node, text string) *ast.Node {
	if ast.IsIdentifier(node) && node.Text() == text {
		return node
	}
	var found *ast.Node
	node.ForEachChild(func(child *ast.Node) bool {
		found = findIdentifier(child, text)
		return found != nil
	})
	return found
}

//go:noinline
func parseAndFind(source string, text string) *ast.Node {
	return findIdentifier(parsetestutil.ParseTypeScript(source, false).AsNode(), text)
}

// The collector does not look inside nodes, so everything a node refers to has to be kept
// alive by the node's arena.
func TestNodeKeepsItsTreeAlive(t *testing.T) {
	t.Parallel()
	var source strings.Builder
	for i := range 2000 {
		source.WriteString("function f")
		source.WriteRune(rune('a' + i%26))
		source.WriteString("() { return [1, 2, 3].map(x => x + 1); }\n")
	}
	source.WriteString("const needle = { first: 1, second: [haystack] };\n")

	// Only a leaf of the tree is held.
	leaf := parseAndFind(source.String(), "haystack")
	churn()

	assert.Equal(t, leaf.Text(), "haystack")
	array := leaf.Parent()
	assert.Equal(t, array.Kind, ast.KindArrayLiteralExpression)
	property := array.Parent()
	assert.Equal(t, property.Name().Text(), "second")
	object := property.Parent()
	assert.Equal(t, len(object.Properties()), 2)
	assert.Equal(t, object.Properties()[0].Name().Text(), "first")
	root := leaf
	for root.Parent() != nil {
		root = root.Parent()
	}
	file := root.AsSourceFile()
	assert.Equal(t, file.Text(), source.String())
	assert.Equal(t, len(file.Statements.Nodes), 2001)
	assert.Equal(t, file.Statements.Nodes[0].Name().Text(), "fa")
}

//go:noinline
func combine(factory *ast.NodeFactory, name string) *ast.Node {
	// A parsed node stored in a slice of a new list, and one linked to directly.
	listed := parseAndFind("const value = listed + other;", "listed")
	linked := parseAndFind("const value = linked * 2;", "linked")
	text := strings.Repeat(name, 2) // not part of any source text
	call := factory.NewCallExpression(factory.NewIdentifier(text), nil, nil, factory.NewNodeList([]*ast.Node{listed.Parent()}), ast.NodeFlagsNone)
	return factory.NewBinaryExpression(nil, call, nil, factory.NewToken(ast.KindPlusToken), linked.Parent())
}

func TestNodeKeepsNodesOfOtherFactoriesAlive(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	node := combine(factory, "callee").AsBinaryExpression()
	// Other uses of the factory must not disturb nodes it created earlier.
	factory.ReleaseArenas()
	for range 5000 {
		factory.NewIdentifier("filler")
	}
	factory = nil
	churn()

	call := node.Left()
	assert.Equal(t, call.Kind, ast.KindCallExpression)
	assert.Equal(t, call.Expression().Text(), "calleecallee")
	listed := call.Arguments()[0].AsBinaryExpression()
	assert.Equal(t, listed.Left().Text(), "listed")
	assert.Equal(t, listed.Right().Text(), "other")
	linked := node.Right().AsBinaryExpression()
	assert.Equal(t, linked.Left().Text(), "linked")
	assert.Equal(t, linked.OperatorToken().Kind, ast.KindAsteriskToken)
	// The parsed nodes still belong to their own trees.
	assert.Equal(t, ast.GetSourceFileOfNode(listed.AsNode()).Text(), "const value = listed + other;")
	assert.Equal(t, ast.GetSourceFileOfNode(linked.AsNode()).Text(), "const value = linked * 2;")
}

func TestSetParentAcrossFactories(t *testing.T) {
	t.Parallel()
	child := func() *ast.Node {
		parent := parseAndFind("outer(inner);", "inner").Parent()
		child := ast.NewNodeFactory(ast.NodeFactoryHooks{}).NewIdentifier("synthetic")
		child.SetParent(parent)
		return child
	}()
	churn()
	assert.Equal(t, child.Parent().Kind, ast.KindCallExpression)
	assert.Equal(t, child.Parent().Expression().Text(), "outer")
	assert.Equal(t, ast.GetSourceFileOfNode(child).Text(), "outer(inner);")
}
