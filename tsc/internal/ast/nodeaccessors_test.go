package ast_test

import (
	"reflect"
	"runtime"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestSourceFileAccessorsUsePointerReceivers(t *testing.T) {
	t.Parallel()
	value := reflect.TypeFor[ast.SourceFile]()
	pointer := reflect.TypeFor[*ast.SourceFile]()
	for _, name := range []string{
		"Symbol", "SetSymbol", "Locals", "SetLocals", "NextContainer", "SetNextContainer",
		"DeclarationBase", "LocalsContainerBase", "CompositeBase",
	} {
		if _, ok := value.MethodByName(name); ok {
			t.Errorf("%s must not copy SourceFile metadata through a value receiver", name)
		}
		if _, ok := pointer.MethodByName(name); !ok {
			t.Errorf("*SourceFile is missing %s", name)
		}
	}
}

func TestSourceFileAccessorsConcurrentMetadata(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	file := factory.NewSourceFile(ast.SourceFileParseOptions{}, "", nil, ast.Node{}).AsSourceFile()
	key := ast.NewSourceFileDataKey[int]()
	compute := func(*ast.SourceFile) int { return 1 }
	file.GetOrComputeData(key, compute)
	start := make(chan struct{})
	var wait sync.WaitGroup
	wait.Go(func() {
		<-start
		for range 1024 {
			assert.Equal(t, file.GetOrComputeData(key, compute), 1)
		}
	})
	wait.Go(func() {
		<-start
		for range 1024 {
			assert.Equal(t, file.Symbol(), (*ast.Symbol)(nil))
			assert.Assert(t, file.Locals() == nil)
			assert.Assert(t, file.NextContainer().IsNil())
			assert.Equal(t, file.DeclarationBase().AsNode(), file.AsNode())
			assert.Equal(t, file.LocalsContainerBase().AsNode(), file.AsNode())
			assert.Equal(t, file.CompositeBase().AsNode(), file.AsNode())
		}
	})
	close(start)
	wait.Wait()
}

func TestNodeAccessorsCastLayout(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	identifier := factory.NewIdentifier("name")
	testutil.AssertPanics(t, func() { identifier.AsFunctionDeclaration() }, "AST node has incompatible arena layout")
	testutil.AssertPanics(t, func() { identifier.AsSourceFile() }, "AST node has incompatible arena layout")

	token := factory.NewToken(ast.KindUnknown)
	assert.Equal(t, token.AsToken().AsNode(), token)
	testutil.AssertPanics(t, func() { token.AsIdentifier() }, "AST node has incompatible arena layout")
	identifier.SetKind(ast.KindUnknown)
	assert.Equal(t, identifier.AsIdentifier().Text(), "name")
	testutil.AssertPanics(t, func() { identifier.AsToken() }, "AST node has incompatible arena layout")
}

func TestNodeFactoryCanonicalTokenLayouts(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	identifier := factory.NewToken(ast.KindIdentifier)
	assert.Equal(t, identifier.AsIdentifier().Text(), "")
	assert.Equal(t, factory.NewToken(ast.KindNumericLiteral).AsNumericLiteral().Text(), "")
	assert.Equal(t, factory.NewToken(ast.KindNullKeyword).AsKeywordExpression().Kind(), ast.KindNullKeyword)
	assert.Equal(t, factory.NewToken(ast.KindNumberKeyword).AsKeywordTypeNode().Kind(), ast.KindNumberKeyword)
	assert.Equal(t, factory.NewToken(ast.KindPlusToken).AsToken().Kind(), ast.KindPlusToken)
	testutil.AssertPanics(t, func() { identifier.AsToken() }, "AST node has incompatible arena layout")
}

func TestNodeFactoryHookOrdering(t *testing.T) {
	t.Parallel()
	var seen bool
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{
		OnCreate: func(node ast.Node) {
			if node.Kind() == ast.KindVariableDeclarationList {
				seen = true
				assert.Equal(t, node.Flags(), ast.NodeFlagsNone)
				assert.Equal(t, len(node.AsVariableDeclarationList().Declarations().Nodes), 1)
				node.SetFlags(ast.NodeFlagsSynthesized)
			}
		},
	})
	declarations := factory.NewNodeList([]ast.Node{factory.NewIdentifier("x")})
	node := factory.NewVariableDeclarationList(declarations, ast.NodeFlagsConst)
	assert.Assert(t, seen)
	assert.Equal(t, node.Flags(), ast.NodeFlagsConst)
}

func TestNodeFactorySourceFileIdentity(t *testing.T) {
	t.Parallel()
	var factory ast.NodeFactory
	identifier := factory.NewIdentifier("before")
	options := ast.SourceFileParseOptions{
		FileName: tspath.RootedFilePathFromNormalized("/first.ts"),
		PathKey:  tspath.PathKeyFromCanonical("/first.ts"),
	}
	first := factory.NewSourceFile(options, "first", nil, ast.Node{})
	second := factory.NewSourceFile(options, "second", nil, ast.Node{})
	assert.Assert(t, first != second)
	assert.Equal(t, first.AsSourceFile().AsNode(), first)
	assert.Equal(t, second.AsSourceFile().AsNode(), second)
	assert.Equal(t, first.AsSourceFile().Text(), "first")
	assert.Equal(t, second.AsSourceFile().Text(), "second")
	identifier.SetParent(first)
	factory.ReleaseArenas()
	next := factory.NewIdentifier("after")
	assert.Assert(t, next != identifier)
	runtime.GC()
	assert.Equal(t, identifier.Parent(), first)
	assert.Equal(t, identifier.AsIdentifier().Text(), "before")
	assert.Equal(t, second.AsSourceFile().Text(), "second")
}

func TestNodeAccessorsArenaGrowthAndForeignEdges(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	foreignFactory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	local := factory.NewIdentifier("local")
	foreign := foreignFactory.NewIdentifier("foreign")
	node := factory.NewBinaryExpression(nil, local, ast.Node{}, factory.NewToken(ast.KindPlusToken), foreign)
	view := node.AsBinaryExpression()
	id := ast.GetNodeId(node)
	for range 8192 {
		factory.NewIdentifier("growth")
		foreignFactory.NewIdentifier("growth")
	}
	runtime.GC()
	assert.Equal(t, view.Left(), local)
	assert.Equal(t, view.Right(), foreign)
	assert.Equal(t, ast.GetNodeId(node), id)
	view.SetLeft(foreign)
	view.SetRight(local)
	node.SetParent(foreign)
	assert.Equal(t, node.AsBinaryExpression().Left(), foreign)
	assert.Equal(t, node.AsBinaryExpression().Right(), local)
	assert.Equal(t, node.Parent(), foreign)
	view.SetLeft(ast.Node{})
	node.SetParent(ast.Node{})
	assert.Assert(t, view.Left().IsNil())
	assert.Assert(t, node.Parent().IsNil())

	clone := node.Clone(foreignFactory)
	assert.Assert(t, clone != node)
	assert.Equal(t, clone.AsBinaryExpression().Right(), local)
	identifier := local.AsIdentifier()
	identifier.SetText("updated")
	assert.Equal(t, local.AsIdentifier().Text(), "updated")
	local.SetLoc(core.NewTextRange(1, 3))
	assert.Equal(t, identifier.Pos(), 1)
	assert.Equal(t, identifier.End(), 3)
}

func TestNodeAccessors(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	name := factory.NewIdentifier("f")
	modifiers := factory.NewModifierList([]ast.Node{factory.NewToken(ast.KindExportKeyword)})
	node := factory.NewFunctionDeclaration(modifiers, ast.Node{}, name, nil, nil, ast.Node{}, ast.Node{}, ast.Node{})
	data := node.AsFunctionDeclaration()

	assert.Equal(t, node.Name(), name)
	assert.Equal(t, node.Modifiers(), modifiers)
	assert.Equal(t, node.DeclarationData(), data.DeclarationBase())
	assert.Equal(t, node.ExportableData(), data.ExportableBase())
	assert.Equal(t, node.FlowNodeData(), data.FlowNodeBase())
	assert.Equal(t, node.LocalsContainerData(), data.LocalsContainerBase())
	assert.Equal(t, node.FunctionLikeData(), data.FunctionLikeBase())
	assert.Equal(t, node.BodyData(), data.BodyBase())
	assert.Equal(t, node.LiteralLikeData(), ast.LiteralLikeNodeBase{})

	literal := factory.NewStringLiteral("text", ast.TokenFlagsNone)
	assert.Equal(t, literal.LiteralLikeData(), literal.AsStringLiteral().LiteralLikeNodeBase())
}

func TestNodeAccessorsSharedKinds(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	name := factory.NewIdentifier("T")
	modifiers := factory.NewModifierList([]ast.Node{factory.NewToken(ast.KindExportKeyword)})
	node := factory.NewTypeAliasDeclaration(modifiers, name, nil, ast.Node{})
	data := node.AsTypeAliasDeclaration()

	for _, kind := range []ast.Kind{ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration} {
		node.SetKind(kind)
		assert.Equal(t, node.Name(), name)
		assert.Equal(t, node.Modifiers(), modifiers)
		assert.Equal(t, node.DeclarationData(), data.DeclarationBase())
		assert.Equal(t, node.ExportableData(), data.ExportableBase())
		assert.Equal(t, node.FlowNodeData(), data.FlowNodeBase())
	}
}

func TestNodeAccessorsMissing(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	nodes := []ast.Node{
		factory.NewToken(ast.KindUnknown),
		factory.NewToken(ast.KindEndOfFile),
		factory.NewToken(ast.KindPlusToken),
		ast.NewFlowSwitchClauseData(ast.Node{}, 0, 0),
		ast.NewFlowReduceLabelData(nil, nil),
	}
	for _, node := range nodes {
		t.Run(node.Kind().String(), func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, node.Name(), ast.Node{})
			assert.Equal(t, node.Modifiers(), (*ast.ModifierList)(nil))
			assert.Equal(t, node.DeclarationData(), ast.DeclarationBase{})
			assert.Equal(t, node.ExportableData(), ast.ExportableBase{})
			assert.Equal(t, node.FlowNodeData(), ast.FlowNodeBase{})
			assert.Equal(t, node.LocalsContainerData(), ast.LocalsContainerBase{})
			assert.Equal(t, node.FunctionLikeData(), ast.FunctionLikeBase{})
			assert.Equal(t, node.BodyData(), ast.BodyBase{})
			assert.Equal(t, node.LiteralLikeData(), ast.LiteralLikeNodeBase{})
		})
	}
}
