package ast_test

import (
	"reflect"
	"runtime"
	"slices"
	"strconv"
	"testing"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"gotest.tools/v3/assert"
)

func TestNodeFactoryKinds(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name  string
		kinds []ast.Kind
	}{
		{"ForInOrOfStatement", []ast.Kind{ast.KindForInStatement, ast.KindForOfStatement}},
		{"CaseOrDefaultClause", []ast.Kind{ast.KindCaseClause, ast.KindDefaultClause}},
		{"BindingPattern", []ast.Kind{ast.KindArrayBindingPattern, ast.KindObjectBindingPattern}},
		{"KeywordExpression", []ast.Kind{ast.KindFalseKeyword, ast.KindImportKeyword, ast.KindNullKeyword, ast.KindSuperKeyword, ast.KindThisKeyword, ast.KindTrueKeyword}},
		{"KeywordTypeNode", []ast.Kind{ast.KindVoidKeyword, ast.KindAnyKeyword, ast.KindBooleanKeyword, ast.KindIntrinsicKeyword, ast.KindNeverKeyword, ast.KindNumberKeyword, ast.KindObjectKeyword, ast.KindStringKeyword, ast.KindSymbolKeyword, ast.KindUndefinedKeyword, ast.KindUnknownKeyword, ast.KindBigIntKeyword}},
		{"JSDocParameterOrPropertyTag", []ast.Kind{ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag}},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			factory := reflect.ValueOf(ast.NewNodeFactory(ast.NodeFactoryHooks{}))
			constructor := factory.MethodByName("New" + test.name)
			args := make([]reflect.Value, constructor.Type().NumIn())
			for i := range args {
				args[i] = reflect.Zero(constructor.Type().In(i))
			}
			for kind := ast.Kind(-1); kind <= ast.KindCount+2; kind++ {
				args[0] = reflect.ValueOf(kind)
				var node ast.Node
				panicked := func() (panicked bool) {
					defer func() { panicked = recover() != nil }()
					node = constructor.Call(args)[0].Interface().(ast.Node)
					return false
				}()
				valid := slices.Contains(test.kinds, kind)
				if panicked == valid {
					t.Fatalf("New%s(%v): valid=%v, panicked=%v", test.name, kind, valid, panicked)
				}
				if valid {
					assert.Equal(t, node.Kind(), kind)
					view := reflect.ValueOf(node).MethodByName("As" + test.name).Call(nil)[0].Interface()
					assert.Equal(t, reflect.ValueOf(view).Field(0).Interface().(ast.Node), node)
				}
			}
		})
	}
}

func TestNodeAccessors(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	name := factory.NewIdentifier("f")
	modifiers := factory.NewModifierList([]ast.Node{factory.NewToken(ast.KindExportKeyword)})
	node := factory.NewFunctionDeclaration(modifiers, ast.Node{}, name, ast.TypeParameterList{}, ast.ParameterList{}, ast.Node{}, ast.Node{}, ast.Node{})

	assert.Equal(t, node.Name(), name)
	assert.Equal(t, node.Modifiers(), modifiers)
	assert.Equal(t, node.DeclarationData(), ast.DeclarationBase{Node: node})
	assert.Equal(t, node.ExportableData(), ast.ExportableBase{Node: node})
	assert.Equal(t, node.FlowNodeData(), ast.FlowNodeBase{Node: node})
	assert.Equal(t, node.LocalsContainerData(), ast.LocalsContainerBase{Node: node})
	assert.Equal(t, node.FunctionLikeData(), ast.FunctionLikeBase{Node: node})
	assert.Equal(t, node.BodyData(), ast.BodyBase{Node: node})
	assert.Assert(t, node.LiteralLikeData().IsNil())

	symbol := &ast.Symbol{}
	node.DeclarationData().SetSymbol(symbol)
	assert.Equal(t, node.Symbol(), symbol)
	assert.Equal(t, node.AsFunctionDeclaration().Symbol(), symbol)

	literal := factory.NewStringLiteral("text", ast.TokenFlagsNone)
	assert.Equal(t, literal.LiteralLikeData(), ast.LiteralLikeNodeBase{Node: literal})
	assert.Equal(t, literal.LiteralLikeData().Text(), "text")
}

func TestNodeAccessorsSharedKinds(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	name := factory.NewIdentifier("T")
	modifiers := factory.NewModifierList([]ast.Node{factory.NewToken(ast.KindExportKeyword)})
	for _, node := range []ast.Node{
		factory.NewTypeAliasDeclaration(modifiers, name, ast.TypeParameterList{}, ast.Node{}),
		factory.NewJSTypeAliasDeclaration(modifiers, name, ast.TypeParameterList{}, ast.Node{}),
	} {
		assert.Equal(t, node.Name(), name)
		assert.Equal(t, node.Modifiers(), modifiers)
		assert.Equal(t, node.DeclarationData(), ast.DeclarationBase{Node: node})
		assert.Equal(t, node.ExportableData(), ast.ExportableBase{Node: node})
		assert.Equal(t, node.FlowNodeData(), ast.FlowNodeBase{Node: node})
	}
}

func TestNodeAccessorsMissing(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	file := factory.NewSourceFile(ast.SourceFileParseOptions{}, "", factory.NewNodeList(nil), factory.NewToken(ast.KindEndOfFile)).AsSourceFile()
	nodes := []ast.Node{
		factory.NewToken(ast.KindUnknown),
		factory.NewToken(ast.KindEndOfFile),
		factory.NewToken(ast.KindPlusToken),
		ast.NewFlowSwitchClauseData(factory.NewToken(ast.KindSwitchKeyword), 0, 0),
		ast.NewFlowReduceLabelData(file, ast.FlowLabel{}, ast.FlowList{}),
	}

	for _, node := range nodes {
		t.Run(node.Kind().String(), func(t *testing.T) {
			t.Parallel()
			assert.Assert(t, node.Name().IsNil())
			assert.Assert(t, node.Modifiers().IsNil())
			assert.Assert(t, node.DeclarationData().IsNil())
			assert.Assert(t, node.ExportableData().IsNil())
			assert.Assert(t, node.FlowNodeData().IsNil())
			assert.Assert(t, node.LocalsContainerData().IsNil())
			assert.Assert(t, node.FunctionLikeData().IsNil())
			assert.Assert(t, node.BodyData().IsNil())
			assert.Assert(t, node.LiteralLikeData().IsNil())
		})
	}
}

func TestNodeHandleLayout(t *testing.T) {
	t.Parallel()
	assert.Equal(t, unsafe.Sizeof(ast.Node{}), 2*unsafe.Sizeof(uintptr(0)))
	assert.Equal(t, unsafe.Sizeof(ast.Identifier{}), unsafe.Sizeof(ast.Node{}))
}

func TestNodeStoreGrowth(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	var nodes []ast.Node
	for i := range 5000 {
		name := factory.NewIdentifier(strconv.Itoa(i))
		nodes = append(nodes, factory.NewExpressionStatement(name))
	}
	for i, node := range nodes {
		assert.Equal(t, node.Kind(), ast.KindExpressionStatement)
		assert.Equal(t, node.Expression().Text(), strconv.Itoa(i))
	}
}

func TestNodeCrossStoreReferences(t *testing.T) {
	t.Parallel()
	f1 := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	f2 := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	inner := f1.NewIdentifier("x")
	outer := f2.NewParenthesizedExpression(inner)
	inner.SetParent(outer)
	again := f2.NewParenthesizedExpression(inner)
	assert.Equal(t, outer.Expression(), inner)
	assert.Equal(t, again.Expression(), inner)
	assert.Equal(t, inner.Parent(), outer)

	local := f2.NewIdentifier("y")
	outer.AsParenthesizedExpression().SetExpression(local)
	assert.Equal(t, outer.Expression(), local)
	outer.AsParenthesizedExpression().SetExpression(ast.Node{})
	assert.Assert(t, outer.Expression().IsNil())
}

func TestNodeCloneAsKindAlias(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	name := factory.NewIdentifier("T")
	node := factory.NewJSTypeAliasDeclaration(ast.ModifierList{}, name, ast.TypeParameterList{}, ast.Node{})
	clone := node.AsTypeAliasDeclaration().CloneAs(factory, ast.KindTypeAliasDeclaration)
	assert.Equal(t, clone.Kind(), ast.KindTypeAliasDeclaration)
	assert.Equal(t, clone.Name(), name)
	testutil.AssertPanics(t, func() {
		node.AsTypeAliasDeclaration().CloneAs(factory, ast.KindStringLiteral)
	}, "unexpected kind in TypeAliasDeclaration.CloneAs: KindStringLiteral")
}

func TestNodeCastRejectsWrongKind(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	identifier := factory.NewIdentifier("name")
	testutil.AssertPanics(t, func() {
		identifier.AsStringLiteral()
	}, "Invalid node cast to StringLiteral")
	literal := factory.NewStringLiteral("name", ast.TokenFlagsNone)
	testutil.AssertPanics(t, func() {
		literal.AsIdentifier()
	}, "Invalid node cast to Identifier")
	testutil.AssertPanics(t, func() {
		factory.NewToken(ast.KindPlusToken).AsFlowSwitchClauseData()
	}, "Invalid node cast to FlowSwitchClauseData")
	for _, kind := range []ast.Kind{ast.KindIdentifier, ast.KindStringLiteral, ast.KindTrueKeyword, ast.KindAnyKeyword} {
		testutil.AssertPanics(t, func() {
			factory.NewToken(kind).AsToken()
		}, "Invalid node cast to Token")
	}
	assert.Equal(t, factory.NewToken(ast.KindPlusToken).AsToken().Kind(), ast.KindPlusToken)
	testutil.AssertPanics(t, func() {
		factory.NewToken(ast.KindFunctionDeclaration)
	}, "Invalid token kind")
}

func TestNodeHeaderKeepsPayloadAlive(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	name := factory.NewIdentifier("property")
	root := factory.NewPropertyAccessExpression(factory.NewIdentifier("object"), ast.Node{}, name, ast.NodeFlagsNone)
	name.SetParent(root)
	for range 1000 {
		factory.NewPropertyAccessExpression(factory.NewIdentifier("other"), ast.Node{}, factory.NewIdentifier("field"), ast.NodeFlagsNone)
	}
	factory = nil
	runtime.GC()
	assert.Equal(t, root.AsPropertyAccessExpression().Name(), name)
	assert.Equal(t, name.AsIdentifier().Text(), "property")
	assert.Equal(t, name.Parent(), root)
	clone := root.Clone(ast.NewNodeFactory(ast.NodeFactoryHooks{}))
	runtime.GC()
	assert.Assert(t, clone != root)
	assert.Equal(t, clone.AsPropertyAccessExpression().Name(), name)
	assert.Equal(t, clone.AsPropertyAccessExpression().Expression().Text(), "object")
}
