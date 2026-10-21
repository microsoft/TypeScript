package ast_test

import (
	"reflect"
	"runtime"
	"slices"
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
				var node *ast.Node
				panicked := func() (panicked bool) {
					defer func() { panicked = recover() != nil }()
					node = constructor.Call(args)[0].Interface().(*ast.Node)
					return false
				}()
				valid := slices.Contains(test.kinds, kind)
				if panicked == valid {
					t.Fatalf("New%s(%v): valid=%v, panicked=%v", test.name, kind, valid, panicked)
				}
				if valid {
					assert.Equal(t, node.Kind, kind)
					assert.Assert(t, reflect.ValueOf(node).MethodByName("As" + test.name).Call(nil)[0].Pointer() != 0)
				}
			}
		})
	}
}

func TestNodeAccessors(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	name := factory.NewIdentifier("f")
	modifiers := factory.NewModifierList([]*ast.Node{factory.NewToken(ast.KindExportKeyword)})
	node := factory.NewFunctionDeclaration(modifiers, nil, name, nil, nil, nil, nil, nil)
	data := node.AsFunctionDeclaration()

	assert.Equal(t, node.Name(), name)
	assert.Equal(t, node.Modifiers(), modifiers)
	assert.Equal(t, node.DeclarationData(), &data.DeclarationBase)
	assert.Equal(t, node.ExportableData(), &data.ExportableBase)
	assert.Equal(t, node.FlowNodeData(), &data.FlowNodeBase)
	assert.Equal(t, node.LocalsContainerData(), &data.LocalsContainerBase)
	assert.Equal(t, node.FunctionLikeData(), &data.FunctionLikeBase)
	assert.Equal(t, node.BodyData(), &data.BodyBase)
	assert.Equal(t, node.LiteralLikeData(), (*ast.LiteralLikeNodeBase)(nil))

	literal := factory.NewStringLiteral("text", ast.TokenFlagsNone)
	assert.Equal(t, literal.LiteralLikeData(), &literal.AsStringLiteral().LiteralLikeNodeBase)
}

func TestNodeAccessorsSharedKinds(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	name := factory.NewIdentifier("T")
	modifiers := factory.NewModifierList([]*ast.Node{factory.NewToken(ast.KindExportKeyword)})
	node := factory.NewTypeAliasDeclaration(modifiers, name, nil, nil)
	data := node.AsTypeAliasDeclaration()

	for _, kind := range []ast.Kind{ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration} {
		node.Kind = kind
		assert.Equal(t, node.Name(), name)
		assert.Equal(t, node.Modifiers(), modifiers)
		assert.Equal(t, node.DeclarationData(), &data.DeclarationBase)
		assert.Equal(t, node.ExportableData(), &data.ExportableBase)
		assert.Equal(t, node.FlowNodeData(), &data.FlowNodeBase)
	}
}

func TestNodeAccessorsMissing(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	nodes := []*ast.Node{
		factory.NewToken(ast.KindUnknown),
		factory.NewToken(ast.KindEndOfFile),
		factory.NewToken(ast.KindPlusToken),
		ast.NewFlowSwitchClauseData(nil, 0, 0),
		ast.NewFlowReduceLabelData(nil, nil),
	}

	for _, node := range nodes {
		t.Run(node.Kind.String(), func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, node.Name(), (*ast.Node)(nil))
			assert.Equal(t, node.Modifiers(), (*ast.ModifierList)(nil))
			assert.Equal(t, node.DeclarationData(), (*ast.DeclarationBase)(nil))
			assert.Equal(t, node.ExportableData(), (*ast.ExportableBase)(nil))
			assert.Equal(t, node.FlowNodeData(), (*ast.FlowNodeBase)(nil))
			assert.Equal(t, node.LocalsContainerData(), (*ast.LocalsContainerBase)(nil))
			assert.Equal(t, node.FunctionLikeData(), (*ast.FunctionLikeBase)(nil))
			assert.Equal(t, node.BodyData(), (*ast.BodyBase)(nil))
			assert.Equal(t, node.LiteralLikeData(), (*ast.LiteralLikeNodeBase)(nil))
		})
	}
}

func TestNodeHeaderLayout(t *testing.T) {
	t.Parallel()
	assert.Equal(t, unsafe.Sizeof(ast.Node{}), uintptr(32))
	assert.Equal(t, unsafe.Offsetof(ast.Identifier{}.Node), uintptr(0))
	assert.Equal(t, unsafe.Offsetof(ast.SourceFile{}.Node), uintptr(0))
	assert.Equal(t, unsafe.Offsetof(ast.FlowSwitchClauseData{}.Node), uintptr(0))
	assert.Equal(t, unsafe.Offsetof(ast.FlowReduceLabelData{}.Node), uintptr(0))
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
	assert.Equal(t, factory.NewToken(ast.KindPlusToken).AsToken().Kind, ast.KindPlusToken)
	testutil.AssertPanics(t, func() {
		factory.NewToken(ast.KindFunctionDeclaration)
	}, "Invalid token kind")
}

func TestNodeHeaderKeepsPayloadAlive(t *testing.T) {
	t.Parallel()
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	name := factory.NewIdentifier("property")
	root := factory.NewPropertyAccessExpression(factory.NewIdentifier("object"), nil, name, ast.NodeFlagsNone)
	name.Parent = root
	for range 1000 {
		factory.NewPropertyAccessExpression(factory.NewIdentifier("other"), nil, factory.NewIdentifier("field"), ast.NodeFlagsNone)
	}
	factory = nil
	runtime.GC()
	assert.Equal(t, root.AsPropertyAccessExpression().Name(), name)
	assert.Equal(t, name.AsIdentifier().Text, "property")
	assert.Equal(t, name.Parent, root)
	clone := root.Clone(ast.NewNodeFactory(ast.NodeFactoryHooks{}))
	runtime.GC()
	assert.Assert(t, clone != root)
	assert.Equal(t, clone.AsPropertyAccessExpression().Name(), name)
	assert.Equal(t, clone.AsPropertyAccessExpression().Expression.Text(), "object")
}
