package ast

import (
	"fmt"
	"iter"
	"strings"
	"sync"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/zeebo/xxh3"
)

// parseJSDocForNode is the package-level function for lazily parsing JSDoc.
// It is set by the parser package via init().
var parseJSDocForNode func(*SourceFile, *Node) []*Node

// SetParseJSDocForNode registers the lazy JSDoc parse function. Called from parser's init().
func SetParseJSDocForNode(fn func(*SourceFile, *Node) []*Node) {
	parseJSDocForNode = fn
}

// Visitor

type Visitor func(*Node) bool

func visit(v Visitor, node *Node) bool {
	if node != nil {
		return v(node)
	}
	return false
}

func visitNodes(v Visitor, nodes []*Node) bool {
	for _, node := range nodes { //nolint:modernize
		if v(node) {
			return true
		}
	}
	return false
}

func visitNodeList(v Visitor, nodeList *NodeList) bool {
	if nodeList != nil {
		return visitNodes(v, nodeList.Nodes)
	}
	return false
}

func visitModifiers(v Visitor, modifiers *ModifierList) bool {
	if modifiers != nil {
		return visitNodes(v, modifiers.Nodes)
	}
	return false
}

type NodeFactoryHooks struct {
	OnCreate func(node *Node)                 // Hooks the creation of a node.
	OnUpdate func(node *Node, original *Node) // Hooks the updating of a node.
	OnClone  func(node *Node, original *Node) // Hooks the cloning of a node.
}

type NodeFactoryCoercible interface {
	AsNodeFactory() *NodeFactory
}

func NewNodeFactory(hooks NodeFactoryHooks) *NodeFactory {
	return &NodeFactory{hooks: hooks}
}

func newNode(kind Kind, data nodeData, hooks NodeFactoryHooks) *Node {
	n := data.AsNode()
	n.Loc = core.UndefinedTextRange()
	n.Kind = kind
	n.data = data
	if hooks.OnCreate != nil {
		hooks.OnCreate(n)
	}
	return n
}

func (f *NodeFactory) newNode(kind Kind, data nodeData) *Node {
	f.nodeCount++
	return newNode(kind, data, f.hooks)
}

func (f *NodeFactory) NodeCount() int {
	return f.nodeCount
}

func (f *NodeFactory) TextCount() int {
	return f.textCount
}

func (f *NodeFactory) AsNodeFactory() *NodeFactory {
	return f
}

func updateNode(updated *Node, original *Node, hooks NodeFactoryHooks) *Node {
	if updated != original {
		updated.Flags = original.Flags
		updated.Loc = original.Loc
		if hooks.OnUpdate != nil {
			hooks.OnUpdate(updated, original)
		}
	}
	return updated
}

func cloneNode(updated *Node, original *Node, hooks NodeFactoryHooks) *Node {
	updateNode(updated, original, hooks)
	if updated != original && hooks.OnClone != nil {
		hooks.OnClone(updated, original)
	}
	return updated
}

// NodeList

type NodeList struct {
	Loc   core.TextRange
	Nodes []*Node
}

func (f *NodeFactory) NewNodeList(nodes []*Node) *NodeList {
	list := f.nodeListArena.New()
	list.Loc = core.UndefinedTextRange()
	list.Nodes = nodes
	return list
}

func (list *NodeList) Pos() int { return list.Loc.Pos() }
func (list *NodeList) End() int { return list.Loc.End() }

func (list *NodeList) HasTrailingComma() bool {
	if len(list.Nodes) == 0 {
		return false
	}
	last := list.Nodes[len(list.Nodes)-1]
	return last.End() < list.End()
}

func (list *NodeList) Clone(f NodeFactoryCoercible) *NodeList {
	result := f.AsNodeFactory().NewNodeList(list.Nodes)
	result.Loc = list.Loc
	return result
}

// ModifierList

type ModifierList struct {
	NodeList
	ModifierFlags ModifierFlags
}

func (f *NodeFactory) NewModifierList(nodes []*Node) *ModifierList {
	list := f.modifierListArena.New()
	list.Loc = core.UndefinedTextRange()
	list.Nodes = nodes
	list.ModifierFlags = ModifiersToFlags(nodes)
	return list
}

func (list *ModifierList) Clone(f *NodeFactory) *ModifierList {
	res := f.modifierListArena.New()
	res.Loc = list.Loc
	res.Nodes = list.Nodes
	res.ModifierFlags = list.ModifierFlags
	return res
}

// AST Node
// Interface values stored in AST nodes are never typed nil values. Construction code must ensure that
// interface valued properties either store a true nil or a reference to a non-nil struct.

type Node struct {
	Kind   Kind
	Flags  NodeFlags
	Loc    core.TextRange
	id     atomic.Uint64
	Parent *Node
	data   nodeData
}

// Node accessors. Some accessors are implemented as methods on NodeData, others are implemented though
// type switches. Either approach is fine. Interface methods are likely more performant, but have higher
// code size costs because we have hundreds of implementations of the NodeData interface.

func (n *Node) AsNode() *Node                             { return n }
func (n *Node) Pos() int                                  { return n.Loc.Pos() }
func (n *Node) End() int                                  { return n.Loc.End() }
func (n *Node) ForEachChild(v Visitor) bool               { return n.data.ForEachChild(v) }
func (n *Node) IterChildren() iter.Seq[*Node]             { return n.data.IterChildren() }
func (n *Node) Clone(f NodeFactoryCoercible) *Node        { return n.data.Clone(f) }
func (n *Node) VisitEachChild(v *NodeVisitor) *Node       { return n.data.VisitEachChild(v) }
func (n *Node) Name() *DeclarationName                    { return n.data.Name() }
func (n *Node) Modifiers() *ModifierList                  { return n.data.Modifiers() }
func (n *Node) FlowNodeData() *FlowNodeBase               { return n.data.FlowNodeData() }
func (n *Node) DeclarationData() *DeclarationBase         { return n.data.DeclarationData() }
func (n *Node) ExportableData() *ExportableBase           { return n.data.ExportableData() }
func (n *Node) LocalsContainerData() *LocalsContainerBase { return n.data.LocalsContainerData() }
func (n *Node) FunctionLikeData() *FunctionLikeBase       { return n.data.FunctionLikeData() }
func (n *Node) ParameterList() *ParameterList             { return n.data.FunctionLikeData().Parameters }
func (n *Node) Parameters() []*ParameterDeclarationNode   { return n.ParameterList().Nodes }
func (n *Node) ClassLikeData() *ClassLikeBase             { return n.data.ClassLikeData() }
func (n *Node) BodyData() *BodyBase                       { return n.data.BodyData() }
func (n *Node) SubtreeFacts() SubtreeFacts                { return n.data.SubtreeFacts() }
func (n *Node) propagateSubtreeFacts() SubtreeFacts       { return n.data.propagateSubtreeFacts() }
func (n *Node) LiteralLikeData() *LiteralLikeNodeBase     { return n.data.LiteralLikeData() }
func (n *Node) TemplateLiteralLikeData() *TemplateLiteralLikeNodeBase {
	return n.data.TemplateLiteralLikeData()
}
func (n *Node) KindString() string { return n.Kind.String() }
func (n *Node) KindValue() int16   { return int16(n.Kind) }
func (n *Node) Decorators() []*Node {
	if n.Modifiers() == nil {
		return nil
	}
	return core.Filter(n.Modifiers().Nodes, IsDecorator)
}

type MutableNode Node

func (n *Node) AsMutable() *MutableNode                     { return (*MutableNode)(n) }
func (n *MutableNode) SetModifiers(modifiers *ModifierList) { n.data.setModifiers(modifiers) }

func (n *Node) Symbol() *Symbol {
	data := n.DeclarationData()
	if data != nil {
		return data.Symbol
	}
	return nil
}

func (n *Node) LocalSymbol() *Symbol {
	data := n.ExportableData()
	if data != nil {
		return data.LocalSymbol
	}
	return nil
}

func (n *Node) Locals() SymbolTable {
	data := n.LocalsContainerData()
	if data != nil {
		return data.Locals
	}
	return nil
}

func (n *Node) Body() *Node {
	data := n.BodyData()
	if data != nil {
		return data.Body
	}
	return nil
}

func (n *Node) Text() string {
	switch n.Kind {
	case KindIdentifier:
		return n.AsIdentifier().Text
	case KindPrivateIdentifier:
		return n.AsPrivateIdentifier().Text
	case KindStringLiteral:
		return n.AsStringLiteral().Text
	case KindNumericLiteral:
		return n.AsNumericLiteral().Text
	case KindBigIntLiteral:
		return n.AsBigIntLiteral().Text
	case KindMetaProperty:
		return n.AsMetaProperty().Name().Text()
	case KindNoSubstitutionTemplateLiteral:
		return n.AsNoSubstitutionTemplateLiteral().Text
	case KindTemplateHead:
		return n.AsTemplateHead().Text
	case KindTemplateMiddle:
		return n.AsTemplateMiddle().Text
	case KindTemplateTail:
		return n.AsTemplateTail().Text
	case KindJsxNamespacedName:
		return n.AsJsxNamespacedName().Namespace.Text() + ":" + n.AsJsxNamespacedName().name.Text()
	case KindRegularExpressionLiteral:
		return n.AsRegularExpressionLiteral().Text
	case KindJSDocText:
		return strings.Join(n.AsJSDocText().text, "")
	case KindJSDocLink:
		return strings.Join(n.AsJSDocLink().text, "")
	case KindJSDocLinkCode:
		return strings.Join(n.AsJSDocLinkCode().text, "")
	case KindJSDocLinkPlain:
		return strings.Join(n.AsJSDocLinkPlain().text, "")
	}
	panic(fmt.Sprintf("Unhandled case in Node.Text: %T", n.data))
}

func (n *Node) Expression() *Node {
	switch n.Kind {
	case KindPropertyAccessExpression:
		return n.AsPropertyAccessExpression().Expression
	case KindElementAccessExpression:
		return n.AsElementAccessExpression().Expression
	case KindParenthesizedExpression:
		return n.AsParenthesizedExpression().Expression
	case KindCallExpression:
		return n.AsCallExpression().Expression
	case KindNewExpression:
		return n.AsNewExpression().Expression
	case KindExpressionWithTypeArguments:
		return n.AsExpressionWithTypeArguments().Expression
	case KindComputedPropertyName:
		return n.AsComputedPropertyName().Expression
	case KindNonNullExpression:
		return n.AsNonNullExpression().Expression
	case KindTypeAssertionExpression:
		return n.AsTypeAssertion().Expression
	case KindAsExpression:
		return n.AsAsExpression().Expression
	case KindSatisfiesExpression:
		return n.AsSatisfiesExpression().Expression
	case KindTypeOfExpression:
		return n.AsTypeOfExpression().Expression
	case KindSpreadAssignment:
		return n.AsSpreadAssignment().Expression
	case KindSpreadElement:
		return n.AsSpreadElement().Expression
	case KindTemplateSpan:
		return n.AsTemplateSpan().Expression
	case KindDeleteExpression:
		return n.AsDeleteExpression().Expression
	case KindVoidExpression:
		return n.AsVoidExpression().Expression
	case KindAwaitExpression:
		return n.AsAwaitExpression().Expression
	case KindYieldExpression:
		return n.AsYieldExpression().Expression
	case KindPartiallyEmittedExpression:
		return n.AsPartiallyEmittedExpression().Expression
	case KindIfStatement:
		return n.AsIfStatement().Expression
	case KindDoStatement:
		return n.AsDoStatement().Expression
	case KindWhileStatement:
		return n.AsWhileStatement().Expression
	case KindWithStatement:
		return n.AsWithStatement().Expression
	case KindForInStatement, KindForOfStatement:
		return n.AsForInOrOfStatement().Expression
	case KindSwitchStatement:
		return n.AsSwitchStatement().Expression
	case KindCaseClause:
		return n.AsCaseOrDefaultClause().Expression
	case KindExpressionStatement:
		return n.AsExpressionStatement().Expression
	case KindReturnStatement:
		return n.AsReturnStatement().Expression
	case KindThrowStatement:
		return n.AsThrowStatement().Expression
	case KindExternalModuleReference:
		return n.AsExternalModuleReference().Expression
	case KindExportAssignment, KindJSExportAssignment:
		return n.AsExportAssignment().Expression
	case KindDecorator:
		return n.AsDecorator().Expression
	case KindJsxExpression:
		return n.AsJsxExpression().Expression
	case KindJsxSpreadAttribute:
		return n.AsJsxSpreadAttribute().Expression
	}
	panic("Unhandled case in Node.Expression: " + n.Kind.String())
}

func (n *Node) RawText() string {
	switch n.Kind {
	case KindTemplateHead:
		return n.AsTemplateHead().RawText
	case KindTemplateMiddle:
		return n.AsTemplateMiddle().RawText
	case KindTemplateTail:
		return n.AsTemplateTail().RawText
	}
	panic("Unhandled case in Node.RawText: " + n.Kind.String())
}

func (m *MutableNode) SetExpression(expr *Node) {
	n := (*Node)(m)
	switch n.Kind {
	case KindPropertyAccessExpression:
		n.AsPropertyAccessExpression().Expression = expr
	case KindElementAccessExpression:
		n.AsElementAccessExpression().Expression = expr
	case KindParenthesizedExpression:
		n.AsParenthesizedExpression().Expression = expr
	case KindCallExpression:
		n.AsCallExpression().Expression = expr
	case KindNewExpression:
		n.AsNewExpression().Expression = expr
	case KindExpressionWithTypeArguments:
		n.AsExpressionWithTypeArguments().Expression = expr
	case KindComputedPropertyName:
		n.AsComputedPropertyName().Expression = expr
	case KindNonNullExpression:
		n.AsNonNullExpression().Expression = expr
	case KindTypeAssertionExpression:
		n.AsTypeAssertion().Expression = expr
	case KindAsExpression:
		n.AsAsExpression().Expression = expr
	case KindSatisfiesExpression:
		n.AsSatisfiesExpression().Expression = expr
	case KindTypeOfExpression:
		n.AsTypeOfExpression().Expression = expr
	case KindSpreadAssignment:
		n.AsSpreadAssignment().Expression = expr
	case KindSpreadElement:
		n.AsSpreadElement().Expression = expr
	case KindTemplateSpan:
		n.AsTemplateSpan().Expression = expr
	case KindDeleteExpression:
		n.AsDeleteExpression().Expression = expr
	case KindVoidExpression:
		n.AsVoidExpression().Expression = expr
	case KindAwaitExpression:
		n.AsAwaitExpression().Expression = expr
	case KindYieldExpression:
		n.AsYieldExpression().Expression = expr
	case KindPartiallyEmittedExpression:
		n.AsPartiallyEmittedExpression().Expression = expr
	case KindIfStatement:
		n.AsIfStatement().Expression = expr
	case KindDoStatement:
		n.AsDoStatement().Expression = expr
	case KindWhileStatement:
		n.AsWhileStatement().Expression = expr
	case KindWithStatement:
		n.AsWithStatement().Expression = expr
	case KindForInStatement, KindForOfStatement:
		n.AsForInOrOfStatement().Expression = expr
	case KindSwitchStatement:
		n.AsSwitchStatement().Expression = expr
	case KindCaseClause:
		n.AsCaseOrDefaultClause().Expression = expr
	case KindExpressionStatement:
		n.AsExpressionStatement().Expression = expr
	case KindReturnStatement:
		n.AsReturnStatement().Expression = expr
	case KindThrowStatement:
		n.AsThrowStatement().Expression = expr
	case KindExternalModuleReference:
		n.AsExternalModuleReference().Expression = expr
	case KindExportAssignment, KindJSExportAssignment:
		n.AsExportAssignment().Expression = expr
	case KindDecorator:
		n.AsDecorator().Expression = expr
	case KindJsxExpression:
		n.AsJsxExpression().Expression = expr
	case KindJsxSpreadAttribute:
		n.AsJsxSpreadAttribute().Expression = expr
	default:
		panic("Unhandled case in mutableNode.SetExpression: " + n.Kind.String())
	}
}

func (n *Node) ArgumentList() *NodeList {
	switch n.Kind {
	case KindCallExpression:
		return n.AsCallExpression().Arguments
	case KindNewExpression:
		return n.AsNewExpression().Arguments
	}
	panic("Unhandled case in Node.Arguments: " + n.Kind.String())
}

func (n *Node) Arguments() []*Node {
	list := n.ArgumentList()
	if list != nil {
		return list.Nodes
	}
	return nil
}

func (n *Node) TypeArgumentList() *NodeList {
	switch n.Kind {
	case KindCallExpression:
		return n.AsCallExpression().TypeArguments
	case KindNewExpression:
		return n.AsNewExpression().TypeArguments
	case KindTaggedTemplateExpression:
		return n.AsTaggedTemplateExpression().TypeArguments
	case KindTypeReference:
		return n.AsTypeReferenceNode().TypeArguments
	case KindExpressionWithTypeArguments:
		return n.AsExpressionWithTypeArguments().TypeArguments
	case KindImportType:
		return n.AsImportTypeNode().TypeArguments
	case KindTypeQuery:
		return n.AsTypeQueryNode().TypeArguments
	case KindJsxOpeningElement:
		return n.AsJsxOpeningElement().TypeArguments
	case KindJsxSelfClosingElement:
		return n.AsJsxSelfClosingElement().TypeArguments
	}
	panic("Unhandled case in Node.TypeArguments")
}

func (n *Node) TypeArguments() []*Node {
	list := n.TypeArgumentList()
	if list != nil {
		return list.Nodes
	}
	return nil
}

func (n *Node) TypeParameterList() *NodeList {
	switch n.Kind {
	case KindClassDeclaration:
		return n.AsClassDeclaration().TypeParameters
	case KindClassExpression:
		return n.AsClassExpression().TypeParameters
	case KindInterfaceDeclaration:
		return n.AsInterfaceDeclaration().TypeParameters
	case KindTypeAliasDeclaration, KindJSTypeAliasDeclaration:
		return n.AsTypeAliasDeclaration().TypeParameters
	case KindJSDocTemplateTag:
		return n.AsJSDocTemplateTag().TypeParameters
	default:
		funcLike := n.FunctionLikeData()
		if funcLike != nil {
			return funcLike.TypeParameters
		}
	}
	panic("Unhandled case in Node.TypeParameterList")
}

func (n *Node) TypeParameters() []*Node {
	list := n.TypeParameterList()
	if list != nil {
		return list.Nodes
	}
	return nil
}

func (n *Node) MemberList() *NodeList {
	switch n.Kind {
	case KindClassDeclaration:
		return n.AsClassDeclaration().Members
	case KindClassExpression:
		return n.AsClassExpression().Members
	case KindInterfaceDeclaration:
		return n.AsInterfaceDeclaration().Members
	case KindEnumDeclaration:
		return n.AsEnumDeclaration().Members
	case KindTypeLiteral:
		return n.AsTypeLiteralNode().Members
	case KindMappedType:
		return n.AsMappedTypeNode().Members
	}
	panic("Unhandled case in Node.MemberList: " + n.Kind.String())
}

func (n *Node) Members() []*Node {
	list := n.MemberList()
	if list != nil {
		return list.Nodes
	}
	return nil
}

func (n *Node) StatementList() *NodeList {
	switch n.Kind {
	case KindSourceFile:
		return n.AsSourceFile().Statements
	case KindBlock:
		return n.AsBlock().Statements
	case KindModuleBlock:
		return n.AsModuleBlock().Statements
	case KindCaseClause, KindDefaultClause:
		return n.AsCaseOrDefaultClause().Statements
	}
	panic("Unhandled case in Node.StatementList: " + n.Kind.String())
}

func (n *Node) Statements() []*Node {
	list := n.StatementList()
	if list != nil {
		return list.Nodes
	}
	return nil
}

func (n *Node) CanHaveStatements() bool {
	switch n.Kind {
	case KindSourceFile, KindBlock, KindModuleBlock, KindCaseClause, KindDefaultClause:
		return true
	default:
		return false
	}
}

func (n *Node) ModifierFlags() ModifierFlags {
	modifiers := n.Modifiers()
	if modifiers != nil {
		return modifiers.ModifierFlags
	}
	return ModifierFlagsNone
}

func (n *Node) ModifierNodes() []*Node {
	modifiers := n.Modifiers()
	if modifiers != nil {
		return modifiers.Nodes
	}
	return nil
}

func (n *Node) Type() *Node {
	switch n.Kind {
	case KindVariableDeclaration:
		return n.AsVariableDeclaration().Type
	case KindParameter:
		return n.AsParameterDeclaration().Type
	case KindPropertySignature:
		return n.AsPropertySignatureDeclaration().Type
	case KindPropertyDeclaration:
		return n.AsPropertyDeclaration().Type
	case KindPropertyAssignment:
		return n.AsPropertyAssignment().Type
	case KindShorthandPropertyAssignment:
		return n.AsShorthandPropertyAssignment().Type
	case KindTypePredicate:
		return n.AsTypePredicateNode().Type
	case KindParenthesizedType:
		return n.AsParenthesizedTypeNode().Type
	case KindTypeOperator:
		return n.AsTypeOperatorNode().Type
	case KindMappedType:
		return n.AsMappedTypeNode().Type
	case KindTypeAssertionExpression:
		return n.AsTypeAssertion().Type
	case KindAsExpression:
		return n.AsAsExpression().Type
	case KindSatisfiesExpression:
		return n.AsSatisfiesExpression().Type
	case KindTypeAliasDeclaration, KindJSTypeAliasDeclaration:
		return n.AsTypeAliasDeclaration().Type
	case KindNamedTupleMember:
		return n.AsNamedTupleMember().Type
	case KindOptionalType:
		return n.AsOptionalTypeNode().Type
	case KindRestType:
		return n.AsRestTypeNode().Type
	case KindTemplateLiteralTypeSpan:
		return n.AsTemplateLiteralTypeSpan().Type
	case KindJSDocTypeExpression:
		return n.AsJSDocTypeExpression().Type
	case KindJSDocParameterTag, KindJSDocPropertyTag:
		return n.AsJSDocParameterOrPropertyTag().TypeExpression
	case KindJSDocNullableType:
		return n.AsJSDocNullableType().Type
	case KindJSDocNonNullableType:
		return n.AsJSDocNonNullableType().Type
	case KindJSDocOptionalType:
		return n.AsJSDocOptionalType().Type
	case KindExportAssignment, KindJSExportAssignment:
		return n.AsExportAssignment().Type
	case KindCommonJSExport:
		return n.AsCommonJSExport().Type
	case KindBinaryExpression:
		return n.AsBinaryExpression().Type
	default:
		if funcLike := n.FunctionLikeData(); funcLike != nil {
			return funcLike.Type
		}
	}
	return nil
}

func (m *MutableNode) SetType(t *Node) {
	n := (*Node)(m)
	switch m.Kind {
	case KindVariableDeclaration:
		n.AsVariableDeclaration().Type = t
	case KindParameter:
		n.AsParameterDeclaration().Type = t
	case KindPropertySignature:
		n.AsPropertySignatureDeclaration().Type = t
	case KindPropertyDeclaration:
		n.AsPropertyDeclaration().Type = t
	case KindPropertyAssignment:
		n.AsPropertyAssignment().Type = t
	case KindShorthandPropertyAssignment:
		n.AsShorthandPropertyAssignment().Type = t
	case KindTypePredicate:
		n.AsTypePredicateNode().Type = t
	case KindParenthesizedType:
		n.AsParenthesizedTypeNode().Type = t
	case KindTypeOperator:
		n.AsTypeOperatorNode().Type = t
	case KindMappedType:
		n.AsMappedTypeNode().Type = t
	case KindTypeAssertionExpression:
		n.AsTypeAssertion().Type = t
	case KindAsExpression:
		n.AsAsExpression().Type = t
	case KindSatisfiesExpression:
		n.AsSatisfiesExpression().Type = t
	case KindTypeAliasDeclaration, KindJSTypeAliasDeclaration:
		n.AsTypeAliasDeclaration().Type = t
	case KindNamedTupleMember:
		n.AsNamedTupleMember().Type = t
	case KindOptionalType:
		n.AsOptionalTypeNode().Type = t
	case KindRestType:
		n.AsRestTypeNode().Type = t
	case KindTemplateLiteralTypeSpan:
		n.AsTemplateLiteralTypeSpan().Type = t
	case KindJSDocTypeExpression:
		n.AsJSDocTypeExpression().Type = t
	case KindJSDocParameterTag, KindJSDocPropertyTag:
		n.AsJSDocParameterOrPropertyTag().TypeExpression = t
	case KindJSDocNullableType:
		n.AsJSDocNullableType().Type = t
	case KindJSDocNonNullableType:
		n.AsJSDocNonNullableType().Type = t
	case KindJSDocOptionalType:
		n.AsJSDocOptionalType().Type = t
	case KindExportAssignment, KindJSExportAssignment:
		n.AsExportAssignment().Type = t
	case KindCommonJSExport:
		n.AsCommonJSExport().Type = t
	case KindBinaryExpression:
		n.AsBinaryExpression().Type = t
	default:
		if funcLike := n.FunctionLikeData(); funcLike != nil {
			funcLike.Type = t
		} else {
			panic("Unhandled case in mutableNode.SetType: " + n.Kind.String())
		}
	}
}

func (n *Node) Initializer() *Node {
	switch n.Kind {
	case KindVariableDeclaration:
		return n.AsVariableDeclaration().Initializer
	case KindParameter:
		return n.AsParameterDeclaration().Initializer
	case KindBindingElement:
		return n.AsBindingElement().Initializer
	case KindPropertyDeclaration:
		return n.AsPropertyDeclaration().Initializer
	case KindPropertySignature:
		return n.AsPropertySignatureDeclaration().Initializer
	case KindPropertyAssignment:
		return n.AsPropertyAssignment().Initializer
	case KindEnumMember:
		return n.AsEnumMember().Initializer
	case KindForStatement:
		return n.AsForStatement().Initializer
	case KindForInStatement, KindForOfStatement:
		return n.AsForInOrOfStatement().Initializer
	case KindJsxAttribute:
		return n.AsJsxAttribute().Initializer
	case KindCommonJSExport:
		return n.AsCommonJSExport().Initializer
	}
	panic("Unhandled case in Node.Initializer")
}

func (m *MutableNode) SetInitializer(initializer *Node) {
	n := (*Node)(m)
	switch n.Kind {
	case KindVariableDeclaration:
		n.AsVariableDeclaration().Initializer = initializer
	case KindParameter:
		n.AsParameterDeclaration().Initializer = initializer
	case KindBindingElement:
		n.AsBindingElement().Initializer = initializer
	case KindPropertyDeclaration:
		n.AsPropertyDeclaration().Initializer = initializer
	case KindPropertySignature:
		n.AsPropertySignatureDeclaration().Initializer = initializer
	case KindPropertyAssignment:
		n.AsPropertyAssignment().Initializer = initializer
	case KindEnumMember:
		n.AsEnumMember().Initializer = initializer
	case KindForStatement:
		n.AsForStatement().Initializer = initializer
	case KindForInStatement, KindForOfStatement:
		n.AsForInOrOfStatement().Initializer = initializer
	case KindJsxAttribute:
		n.AsJsxAttribute().Initializer = initializer
	case KindCommonJSExport:
		n.AsCommonJSExport().Initializer = initializer
	default:
		panic("Unhandled case in mutableNode.SetInitializer")
	}
}

func (n *Node) TagName() *Node {
	switch n.Kind {
	case KindJsxOpeningElement:
		return n.AsJsxOpeningElement().TagName
	case KindJsxClosingElement:
		return n.AsJsxClosingElement().TagName
	case KindJsxSelfClosingElement:
		return n.AsJsxSelfClosingElement().TagName
	case KindJSDocUnknownTag:
		return n.AsJSDocUnknownTag().TagName
	case KindJSDocAugmentsTag:
		return n.AsJSDocAugmentsTag().TagName
	case KindJSDocImplementsTag:
		return n.AsJSDocImplementsTag().TagName
	case KindJSDocDeprecatedTag:
		return n.AsJSDocDeprecatedTag().TagName
	case KindJSDocPublicTag:
		return n.AsJSDocPublicTag().TagName
	case KindJSDocPrivateTag:
		return n.AsJSDocPrivateTag().TagName
	case KindJSDocProtectedTag:
		return n.AsJSDocProtectedTag().TagName
	case KindJSDocReadonlyTag:
		return n.AsJSDocReadonlyTag().TagName
	case KindJSDocOverrideTag:
		return n.AsJSDocOverrideTag().TagName
	case KindJSDocCallbackTag:
		return n.AsJSDocCallbackTag().TagName
	case KindJSDocOverloadTag:
		return n.AsJSDocOverloadTag().TagName
	case KindJSDocParameterTag, KindJSDocPropertyTag:
		return n.AsJSDocParameterOrPropertyTag().TagName
	case KindJSDocReturnTag:
		return n.AsJSDocReturnTag().TagName
	case KindJSDocThisTag:
		return n.AsJSDocThisTag().TagName
	case KindJSDocTypeTag:
		return n.AsJSDocTypeTag().TagName
	case KindJSDocTemplateTag:
		return n.AsJSDocTemplateTag().TagName
	case KindJSDocTypedefTag:
		return n.AsJSDocTypedefTag().TagName
	case KindJSDocSeeTag:
		return n.AsJSDocSeeTag().TagName
	case KindJSDocSatisfiesTag:
		return n.AsJSDocSatisfiesTag().TagName
	case KindJSDocThrowsTag:
		return n.AsJSDocThrowsTag().TagName
	case KindJSDocImportTag:
		return n.AsJSDocImportTag().TagName
	}
	panic("Unhandled case in Node.TagName: " + n.Kind.String())
}

func (n *Node) PropertyName() *Node {
	switch n.Kind {
	case KindImportSpecifier:
		return n.AsImportSpecifier().PropertyName
	case KindExportSpecifier:
		return n.AsExportSpecifier().PropertyName
	case KindBindingElement:
		return n.AsBindingElement().PropertyName
	}
	return nil
}

func (n *Node) PropertyNameOrName() *Node {
	name := n.PropertyName()
	if name == nil {
		name = n.Name()
	}
	return name
}

func (n *Node) IsTypeOnly() bool {
	switch n.Kind {
	case KindImportEqualsDeclaration:
		return n.AsImportEqualsDeclaration().IsTypeOnly
	case KindImportSpecifier:
		return n.AsImportSpecifier().IsTypeOnly
	case KindImportClause:
		return n.AsImportClause().PhaseModifier == KindTypeKeyword
	case KindExportDeclaration:
		return n.AsExportDeclaration().IsTypeOnly
	case KindExportSpecifier:
		return n.AsExportSpecifier().IsTypeOnly
	}
	return false
}

// If updating this function, also update `hasComment`.
func (n *Node) CommentList() *NodeList {
	switch n.Kind {
	case KindJSDoc:
		return n.AsJSDoc().Comment
	case KindJSDocUnknownTag:
		return n.AsJSDocUnknownTag().Comment
	case KindJSDocAugmentsTag:
		return n.AsJSDocAugmentsTag().Comment
	case KindJSDocImplementsTag:
		return n.AsJSDocImplementsTag().Comment
	case KindJSDocDeprecatedTag:
		return n.AsJSDocDeprecatedTag().Comment
	case KindJSDocPublicTag:
		return n.AsJSDocPublicTag().Comment
	case KindJSDocPrivateTag:
		return n.AsJSDocPrivateTag().Comment
	case KindJSDocProtectedTag:
		return n.AsJSDocProtectedTag().Comment
	case KindJSDocReadonlyTag:
		return n.AsJSDocReadonlyTag().Comment
	case KindJSDocOverrideTag:
		return n.AsJSDocOverrideTag().Comment
	case KindJSDocCallbackTag:
		return n.AsJSDocCallbackTag().Comment
	case KindJSDocOverloadTag:
		return n.AsJSDocOverloadTag().Comment
	case KindJSDocParameterTag, KindJSDocPropertyTag:
		return n.AsJSDocParameterOrPropertyTag().Comment
	case KindJSDocReturnTag:
		return n.AsJSDocReturnTag().Comment
	case KindJSDocThisTag:
		return n.AsJSDocThisTag().Comment
	case KindJSDocTypeTag:
		return n.AsJSDocTypeTag().Comment
	case KindJSDocTemplateTag:
		return n.AsJSDocTemplateTag().Comment
	case KindJSDocTypedefTag:
		return n.AsJSDocTypedefTag().Comment
	case KindJSDocSeeTag:
		return n.AsJSDocSeeTag().Comment
	case KindJSDocSatisfiesTag:
		return n.AsJSDocSatisfiesTag().Comment
	case KindJSDocThrowsTag:
		return n.AsJSDocThrowsTag().Comment
	case KindJSDocImportTag:
		return n.AsJSDocImportTag().Comment
	}
	panic("Unhandled case in Node.CommentList: " + n.Kind.String())
}

func (n *Node) Comments() []*Node {
	list := n.CommentList()
	if list != nil {
		return list.Nodes
	}
	return nil
}

func (n *Node) Label() *Node {
	switch n.Kind {
	case KindLabeledStatement:
		return n.AsLabeledStatement().Label
	case KindBreakStatement:
		return n.AsBreakStatement().Label
	case KindContinueStatement:
		return n.AsContinueStatement().Label
	}
	panic("Unhandled case in Node.Label: " + n.Kind.String())
}

func (n *Node) Attributes() *Node {
	switch n.Kind {
	case KindJsxOpeningElement:
		return n.AsJsxOpeningElement().Attributes
	case KindJsxSelfClosingElement:
		return n.AsJsxSelfClosingElement().Attributes
	}
	panic("Unhandled case in Node.Attributes: " + n.Kind.String())
}

func (n *Node) Children() *NodeList {
	switch n.Kind {
	case KindJsxElement:
		return n.AsJsxElement().Children
	case KindJsxFragment:
		return n.AsJsxFragment().Children
	}
	panic("Unhandled case in Node.Children: " + n.Kind.String())
}

func (n *Node) ModuleSpecifier() *Expression {
	switch n.Kind {
	case KindImportDeclaration, KindJSImportDeclaration:
		return n.AsImportDeclaration().ModuleSpecifier
	case KindExportDeclaration:
		return n.AsExportDeclaration().ModuleSpecifier
	case KindJSDocImportTag:
		return n.AsJSDocImportTag().ModuleSpecifier
	}
	panic("Unhandled case in Node.ModuleSpecifier: " + n.Kind.String())
}

func (n *Node) ImportClause() *Node {
	switch n.Kind {
	case KindImportDeclaration, KindJSImportDeclaration:
		return n.AsImportDeclaration().ImportClause
	case KindJSDocImportTag:
		return n.AsJSDocImportTag().ImportClause
	}
	panic("Unhandled case in Node.ImportClause: " + n.Kind.String())
}

func (n *Node) Statement() *Statement {
	switch n.Kind {
	case KindDoStatement:
		return n.AsDoStatement().Statement
	case KindWhileStatement:
		return n.AsWhileStatement().Statement
	case KindForStatement:
		return n.AsForStatement().Statement
	case KindForInStatement, KindForOfStatement:
		return n.AsForInOrOfStatement().Statement
	case KindWithStatement:
		return n.AsWithStatement().Statement
	case KindLabeledStatement:
		return n.AsLabeledStatement().Statement
	}
	panic("Unhandled case in Node.Statement: " + n.Kind.String())
}

func (n *Node) PropertyList() *NodeList {
	switch n.Kind {
	case KindObjectLiteralExpression:
		return n.AsObjectLiteralExpression().Properties
	case KindJsxAttributes:
		return n.AsJsxAttributes().Properties
	}
	panic("Unhandled case in Node.PropertyList: " + n.Kind.String())
}

func (n *Node) Properties() []*Node {
	list := n.PropertyList()
	if list != nil {
		return list.Nodes
	}
	return nil
}

func (n *Node) ElementList() *NodeList {
	switch n.Kind {
	case KindNamedImports:
		return n.AsNamedImports().Elements
	case KindNamedExports:
		return n.AsNamedExports().Elements
	case KindObjectBindingPattern, KindArrayBindingPattern:
		return n.AsBindingPattern().Elements
	case KindArrayLiteralExpression:
		return n.AsArrayLiteralExpression().Elements
	case KindTupleType:
		return n.AsTupleTypeNode().Elements
	}
	panic("Unhandled case in Node.ElementList: " + n.Kind.String())
}

func (n *Node) Elements() []*Node {
	list := n.ElementList()
	if list != nil {
		return list.Nodes
	}
	return nil
}

func (n *Node) PostfixToken() *Node {
	switch n.Kind {
	case KindMethodDeclaration:
		return n.AsMethodDeclaration().PostfixToken
	case KindShorthandPropertyAssignment:
		return n.AsShorthandPropertyAssignment().PostfixToken
	case KindMethodSignature:
		return n.AsMethodSignatureDeclaration().PostfixToken
	case KindPropertySignature:
		return n.AsPropertySignatureDeclaration().PostfixToken
	case KindPropertyAssignment:
		return n.AsPropertyAssignment().PostfixToken
	case KindPropertyDeclaration:
		return n.AsPropertyDeclaration().PostfixToken
	case KindEnumMember:
		return n.AsEnumMember().PostfixToken
	case KindGetAccessor:
		return n.AsGetAccessorDeclaration().PostfixToken
	case KindSetAccessor:
		return n.AsSetAccessorDeclaration().PostfixToken
	}
	return nil
}

func (n *Node) QuestionToken() *TokenNode {
	switch n.Kind {
	case KindParameter:
		return n.AsParameterDeclaration().QuestionToken
	case KindConditionalExpression:
		return n.AsConditionalExpression().QuestionToken
	case KindMappedType:
		return n.AsMappedTypeNode().QuestionToken
	case KindNamedTupleMember:
		return n.AsNamedTupleMember().QuestionToken
	}
	postfix := n.PostfixToken()
	if postfix != nil && postfix.Kind == KindQuestionToken {
		return postfix
	}
	return nil
}

func (n *Node) QuestionDotToken() *Node {
	switch n.Kind {
	case KindElementAccessExpression:
		return n.AsElementAccessExpression().QuestionDotToken
	case KindPropertyAccessExpression:
		return n.AsPropertyAccessExpression().QuestionDotToken
	case KindCallExpression:
		return n.AsCallExpression().QuestionDotToken
	case KindTaggedTemplateExpression:
		return n.AsTaggedTemplateExpression().QuestionDotToken
	}
	panic("Unhandled case in Node.QuestionDotToken: " + n.Kind.String())
}

func (n *Node) TypeExpression() *Node {
	switch n.Kind {
	case KindJSDocParameterTag, KindJSDocPropertyTag:
		return n.AsJSDocParameterOrPropertyTag().TypeExpression
	case KindJSDocReturnTag:
		return n.AsJSDocReturnTag().TypeExpression
	case KindJSDocTypeTag:
		return n.AsJSDocTypeTag().TypeExpression
	case KindJSDocTypedefTag:
		return n.AsJSDocTypedefTag().TypeExpression
	case KindJSDocSatisfiesTag:
		return n.AsJSDocSatisfiesTag().TypeExpression
	case KindJSDocThrowsTag:
		return n.AsJSDocThrowsTag().TypeExpression
	}
	panic("Unhandled case in Node.TypeExpression: " + n.Kind.String())
}

func (n *Node) ClassName() *Node {
	switch n.Kind {
	case KindJSDocAugmentsTag:
		return n.AsJSDocAugmentsTag().ClassName
	case KindJSDocImplementsTag:
		return n.AsJSDocImplementsTag().ClassName
	}
	panic("Unhandled case in Node.ClassName: " + n.Kind.String())
}

// Determines if `n` contains `descendant` by walking up the `Parent` pointers from `descendant`. This method panics if
// `descendant` or one of its ancestors is not parented except when that node is a `SourceFile`.
func (n *Node) Contains(descendant *Node) bool {
	for descendant != nil {
		if descendant == n {
			return true
		}
		parent := descendant.Parent
		if parent == nil && !IsSourceFile(descendant) {
			panic("descendant is not parented")
		}
		descendant = parent
	}
	return false
}

// Node casts

func (n *Node) AsFlowSwitchClauseData() *FlowSwitchClauseData {
	return n.data.(*FlowSwitchClauseData)
}

func (n *Node) AsFlowReduceLabelData() *FlowReduceLabelData {
	return n.data.(*FlowReduceLabelData)
}

// NodeData

type nodeData interface {
	AsNode() *Node
	ForEachChild(v Visitor) bool
	IterChildren() iter.Seq[*Node]
	VisitEachChild(v *NodeVisitor) *Node
	Clone(v NodeFactoryCoercible) *Node
	Name() *DeclarationName
	Modifiers() *ModifierList
	setModifiers(modifiers *ModifierList)
	FlowNodeData() *FlowNodeBase
	DeclarationData() *DeclarationBase
	ExportableData() *ExportableBase
	LocalsContainerData() *LocalsContainerBase
	FunctionLikeData() *FunctionLikeBase
	ClassLikeData() *ClassLikeBase
	BodyData() *BodyBase
	LiteralLikeData() *LiteralLikeNodeBase
	TemplateLiteralLikeData() *TemplateLiteralLikeNodeBase
	SubtreeFacts() SubtreeFacts
	computeSubtreeFacts() SubtreeFacts
	subtreeFactsWorker(self nodeData) SubtreeFacts
	propagateSubtreeFacts() SubtreeFacts
}

// NodeDefault

type NodeDefault struct {
	Node
}

func invert(yield func(v *Node) bool) Visitor {
	return func(n *Node) bool {
		return !yield(n)
	}
}

func (node *NodeDefault) AsNode() *Node               { return &node.Node }
func (node *NodeDefault) ForEachChild(v Visitor) bool { return false }
func (node *NodeDefault) forEachChildIter(yield func(v *Node) bool) {
	node.data.ForEachChild(invert(yield)) // `true` is return early for a ts visitor, `false` is return early for a go iterator yield function
}

func (node *NodeDefault) IterChildren() iter.Seq[*Node] {
	return node.forEachChildIter
}
func (node *NodeDefault) VisitEachChild(v *NodeVisitor) *Node                   { return node.AsNode() }
func (node *NodeDefault) Clone(v NodeFactoryCoercible) *Node                    { return nil }
func (node *NodeDefault) Name() *DeclarationName                                { return nil }
func (node *NodeDefault) Modifiers() *ModifierList                              { return nil }
func (node *NodeDefault) setModifiers(modifiers *ModifierList)                  {}
func (node *NodeDefault) FlowNodeData() *FlowNodeBase                           { return nil }
func (node *NodeDefault) DeclarationData() *DeclarationBase                     { return nil }
func (node *NodeDefault) ExportableData() *ExportableBase                       { return nil }
func (node *NodeDefault) LocalsContainerData() *LocalsContainerBase             { return nil }
func (node *NodeDefault) FunctionLikeData() *FunctionLikeBase                   { return nil }
func (node *NodeDefault) ClassLikeData() *ClassLikeBase                         { return nil }
func (node *NodeDefault) BodyData() *BodyBase                                   { return nil }
func (node *NodeDefault) LiteralLikeData() *LiteralLikeNodeBase                 { return nil }
func (node *NodeDefault) TemplateLiteralLikeData() *TemplateLiteralLikeNodeBase { return nil }
func (node *NodeDefault) SubtreeFacts() SubtreeFacts {
	return node.data.subtreeFactsWorker(node.data)
}

func (node *NodeDefault) subtreeFactsWorker(self nodeData) SubtreeFacts {
	// To avoid excessive conditional checks, the default implementation of subtreeFactsWorker directly invokes
	// computeSubtreeFacts. More complex nodes should implement CompositeNodeBase, which overrides this
	// method to cache the result. `self` is passed along to ensure we lookup `computeSubtreeFacts` on the
	// correct type, as `CompositeNodeBase` does not, itself, inherit from `Node`.
	return self.computeSubtreeFacts()
}

func (node *NodeDefault) computeSubtreeFacts() SubtreeFacts {
	return SubtreeFactsNone
}

func (node *NodeDefault) propagateSubtreeFacts() SubtreeFacts {
	return node.data.SubtreeFacts() & ^SubtreeExclusionsNode
}

// NodeBase

type NodeBase struct {
	NodeDefault
}

// Aliases for Node unions not covered by ast_generated.go

type (
	NamedMember                 = Node // Node with NamedMemberBase
	AnyValidImportOrReExport    = Node // (ImportDeclaration | ExportDeclaration | JSDocImportTag) & { moduleSpecifier: StringLiteral } | ImportEqualsDeclaration & { moduleReference: ExternalModuleReference & { expression: StringLiteral }} | RequireOrImportCall | ValidImportTypeNode
	ValidImportTypeNode         = Node // ImportType & { argument: LiteralTypeNode & { literal: StringLiteral } }
	TypeOnlyImportDeclaration   = Node // ImportClause | ImportEqualsDeclaration | ImportSpecifier | NamespaceImport with isTypeOnly: true
	StringLiteralLike           = Node // StringLiteral | NoSubstitutionTemplateLiteral
	ObjectLiteralLike           = Node // ObjectLiteralExpression | ObjectBindingPattern
	AnyImportOrRequireStatement = Node // AnyImportSyntax | RequireVariableStatement
)

func IsWriteOnlyAccess(node *Node) bool {
	return accessKind(node) == AccessKindWrite
}

func IsWriteAccess(node *Node) bool {
	return accessKind(node) != AccessKindRead
}

func IsWriteAccessForReference(node *Node) bool {
	decl := GetDeclarationFromName(node)
	return (decl != nil && declarationIsWriteAccess(decl)) || node.Kind == KindDefaultKeyword || IsWriteAccess(node)
}

func GetDeclarationFromName(name *Node) *Declaration {
	if name == nil || name.Parent == nil {
		return nil
	}
	parent := name.Parent
	switch name.Kind {
	case KindStringLiteral, KindNoSubstitutionTemplateLiteral, KindNumericLiteral:
		if IsComputedPropertyName(parent) {
			return parent.Parent
		}
		fallthrough
	case KindIdentifier:
		if IsDeclaration(parent) {
			if parent.Name() == name {
				return parent
			}
			return nil
		}
		if IsQualifiedName(parent) {
			tag := parent.Parent
			if IsJSDocParameterTag(tag) && tag.Name() == parent {
				return tag
			}
			return nil
		}
		binExp := parent.Parent
		if IsBinaryExpression(binExp) && GetAssignmentDeclarationKind(binExp) != JSDeclarationKindNone {
			// (binExp.left as BindableStaticNameExpression).symbol || binExp.symbol
			leftHasSymbol := false
			if binExp.AsBinaryExpression().Left != nil && binExp.AsBinaryExpression().Left.Symbol() != nil {
				leftHasSymbol = true
			}
			if leftHasSymbol || binExp.Symbol() != nil {
				if GetNameOfDeclaration(binExp.AsNode()) == name {
					return binExp.AsNode()
				}
			}
		}
	case KindPrivateIdentifier:
		if IsDeclaration(parent) && parent.Name() == name {
			return parent
		}
	}
	return nil
}

func declarationIsWriteAccess(decl *Node) bool {
	if decl == nil {
		return false
	}
	// Consider anything in an ambient declaration to be a write access since it may be coming from JS.
	if decl.Flags&NodeFlagsAmbient != 0 {
		return true
	}

	switch decl.Kind {
	case KindBinaryExpression,
		KindBindingElement,
		KindClassDeclaration,
		KindClassExpression,
		KindDefaultKeyword,
		KindEnumDeclaration,
		KindEnumMember,
		KindExportSpecifier,
		KindImportClause, // default import
		KindImportEqualsDeclaration,
		KindImportSpecifier,
		KindInterfaceDeclaration,
		KindJSDocCallbackTag,
		KindJSDocTypedefTag,
		KindJsxAttribute,
		KindModuleDeclaration,
		KindNamespaceExportDeclaration,
		KindNamespaceImport,
		KindNamespaceExport,
		KindParameter,
		KindShorthandPropertyAssignment,
		KindTypeAliasDeclaration,
		KindJSTypeAliasDeclaration,
		KindTypeParameter:
		return true

	case KindPropertyAssignment:
		// In `({ x: y } = 0);`, `x` is not a write access.
		return !IsArrayLiteralOrObjectLiteralDestructuringPattern(decl.Parent)

	case KindFunctionDeclaration, KindFunctionExpression, KindConstructor, KindMethodDeclaration, KindGetAccessor, KindSetAccessor:
		// functions considered write if they provide a value (have a body)
		switch decl.Kind {
		case KindFunctionDeclaration:
			return decl.AsFunctionDeclaration().Body != nil
		case KindFunctionExpression:
			return decl.AsFunctionExpression().Body != nil
		case KindConstructor:
			// constructor node stores body on the parent? treat same as others
			return decl.AsConstructorDeclaration().Body != nil
		case KindMethodDeclaration:
			return decl.AsMethodDeclaration().Body != nil
		case KindGetAccessor:
			return decl.AsGetAccessorDeclaration().Body != nil
		case KindSetAccessor:
			return decl.AsSetAccessorDeclaration().Body != nil
		}
		return false

	case KindVariableDeclaration, KindPropertyDeclaration:
		// variable/property write if initializer present or is in catch clause
		var hasInit bool
		switch decl.Kind {
		case KindVariableDeclaration:
			hasInit = decl.AsVariableDeclaration().Initializer != nil
		case KindPropertyDeclaration:
			hasInit = decl.AsPropertyDeclaration().Initializer != nil
		}
		return hasInit || IsCatchClause(decl.Parent)

	case KindMethodSignature, KindPropertySignature, KindJSDocPropertyTag, KindJSDocParameterTag:
		return false

	default:
		// preserve TS behavior: crash on unexpected kinds
		panic("Unhandled case in declarationIsWriteAccess")
	}
}

func IsArrayLiteralOrObjectLiteralDestructuringPattern(node *Node) bool {
	if !(IsArrayLiteralExpression(node) || IsObjectLiteralExpression(node)) {
		return false
	}
	parent := node.Parent
	// [a,b,c] from:
	// [a, b, c] = someExpression;
	if IsBinaryExpression(parent) && parent.AsBinaryExpression().Left == node && parent.AsBinaryExpression().OperatorToken.Kind == KindEqualsToken {
		return true
	}
	// [a, b, c] from:
	// for([a, b, c] of expression)
	if IsForOfStatement(parent) && parent.Initializer() == node {
		return true
	}
	// {x, a: {a, b, c} } = someExpression
	if IsPropertyAssignment(parent) {
		return IsArrayLiteralOrObjectLiteralDestructuringPattern(parent.Parent)
	}
	// [a, b, c] of
	// [x, [a, b, c] ] = someExpression
	return IsArrayLiteralOrObjectLiteralDestructuringPattern(parent)
}

func accessKind(node *Node) AccessKind {
	parent := node.Parent
	if parent == nil {
		return AccessKindRead
	}
	switch parent.Kind {
	case KindParenthesizedExpression:
		return accessKind(parent)
	case KindPrefixUnaryExpression:
		operator := parent.AsPrefixUnaryExpression().Operator
		if operator == KindPlusPlusToken || operator == KindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case KindPostfixUnaryExpression:
		operator := parent.AsPostfixUnaryExpression().Operator
		if operator == KindPlusPlusToken || operator == KindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case KindBinaryExpression:
		if parent.AsBinaryExpression().Left == node {
			operator := parent.AsBinaryExpression().OperatorToken
			if IsAssignmentOperator(operator.Kind) {
				if operator.Kind == KindEqualsToken {
					return AccessKindWrite
				}
				return AccessKindReadWrite
			}
		}
		return AccessKindRead
	case KindPropertyAccessExpression:
		if parent.AsPropertyAccessExpression().Name() != node {
			return AccessKindRead
		}
		return accessKind(parent)
	case KindPropertyAssignment:
		parentAccess := accessKind(parent.Parent)
		// In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
		if node == parent.AsPropertyAssignment().Name() {
			return reverseAccessKind(parentAccess)
		}
		return parentAccess
	case KindShorthandPropertyAssignment:
		// Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
		if node == parent.AsShorthandPropertyAssignment().ObjectAssignmentInitializer {
			return AccessKindRead
		}
		return accessKind(parent.Parent)
	case KindArrayLiteralExpression:
		return accessKind(parent)
	case KindForInStatement, KindForOfStatement:
		if node == parent.AsForInOrOfStatement().Initializer {
			return AccessKindWrite
		}
		return AccessKindRead
	default:
		return AccessKindRead
	}
}

func reverseAccessKind(a AccessKind) AccessKind {
	switch a {
	case AccessKindRead:
		return AccessKindWrite
	case AccessKindWrite:
		return AccessKindRead
	case AccessKindReadWrite:
		return AccessKindReadWrite
	}
	panic("Unhandled case in reverseAccessKind")
}

type AccessKind int32

const (
	AccessKindRead      AccessKind = iota // Only reads from a variable
	AccessKindWrite                       // Only writes to a variable without ever reading it. E.g.: `x=1;`.
	AccessKindReadWrite                   // Reads from and writes to a variable. E.g.: `f(x++);`, `x/=1`.
)

// DeclarationBase

func (node *DeclarationBase) DeclarationData() *DeclarationBase { return node }

func IsDeclarationNode(node *Node) bool {
	return node.DeclarationData() != nil
}

// ExportableBase

func (node *ExportableBase) ExportableData() *ExportableBase { return node }

// ModifiersBase

func (node *ModifiersBase) Modifiers() *ModifierList { return node.modifiers }

// LocalsContainerBase

func (node *LocalsContainerBase) LocalsContainerData() *LocalsContainerBase { return node }

func IsLocalsContainer(node *Node) bool {
	return node.LocalsContainerData() != nil
}

// FunctionLikeBase

func (node *FunctionLikeBase) LocalsContainerData() *LocalsContainerBase {
	return &node.LocalsContainerBase
}
func (node *FunctionLikeBase) FunctionLikeData() *FunctionLikeBase { return node }

// BodyBase

func (node *BodyBase) BodyData() *BodyBase { return node }

// FunctionLikeWithBodyBase

func (node *FunctionLikeWithBodyBase) LocalsContainerData() *LocalsContainerBase {
	return &node.LocalsContainerBase
}

func (node *FunctionLikeWithBodyBase) FunctionLikeData() *FunctionLikeBase {
	return &node.FunctionLikeBase
}
func (node *FunctionLikeWithBodyBase) BodyData() *BodyBase { return &node.BodyBase }

// FlowNodeBase

func (node *FlowNodeBase) FlowNodeData() *FlowNodeBase { return node }

// if you provide nil for file, this code will walk to the root of the tree to find the file
func (node *Node) JSDoc(file *SourceFile) []*Node {
	if node.Flags&NodeFlagsHasJSDoc == 0 {
		return nil
	}
	if file == nil {
		file = GetSourceFileOfNode(node)
		if file == nil {
			return nil
		}
	}
	if file.hasLazyJSDoc {
		return file.resolveJSDoc(node)
	}
	return file.jsdocCache[node]
}

// EagerJSDoc returns JSDoc nodes that have already been parsed and cached,
// without triggering lazy JSDoc parsing.
func (node *Node) EagerJSDoc(file *SourceFile) []*Node {
	if node.Flags&NodeFlagsHasJSDoc == 0 {
		return nil
	}
	if file == nil {
		file = GetSourceFileOfNode(node)
		if file == nil {
			return nil
		}
	}
	if file.hasLazyJSDoc {
		file.jsdocMu.RLock()
		jsdocs := file.jsdocCache[node]
		file.jsdocMu.RUnlock()
		return jsdocs
	}
	return file.jsdocCache[node]
}

// CompositeBase

func (node *CompositeBase) subtreeFactsWorker(self nodeData) SubtreeFacts {
	// computeSubtreeFacts() is expected to be idempotent, so races will only impact time, not correctness.
	facts := SubtreeFacts(node.facts.Load())
	if facts&SubtreeFactsComputed == 0 {
		facts |= self.computeSubtreeFacts() | SubtreeFactsComputed
		node.facts.Store(uint32(facts))
	}
	return facts &^ SubtreeFactsComputed
}

func (node *CompositeBase) computeSubtreeFacts() SubtreeFacts {
	// This method must be implemented by the concrete node type.
	panic("not implemented")
}

// TypeSyntaxBase

func (node *TypeSyntaxBase) computeSubtreeFacts() SubtreeFacts   { return SubtreeContainsTypeScript }
func (node *TypeSyntaxBase) propagateSubtreeFacts() SubtreeFacts { return SubtreeContainsTypeScript }

func (node *Token) computeSubtreeFacts() SubtreeFacts {
	switch node.Kind {
	case KindUsingKeyword:
		return SubtreeContainsUsing
	case KindPublicKeyword,
		KindPrivateKeyword,
		KindProtectedKeyword,
		KindReadonlyKeyword,
		KindAbstractKeyword,
		KindDeclareKeyword,
		KindConstKeyword,
		KindAnyKeyword,
		KindNumberKeyword,
		KindBigIntKeyword,
		KindNeverKeyword,
		KindObjectKeyword,
		KindInKeyword,
		KindOutKeyword,
		KindOverrideKeyword,
		KindStringKeyword,
		KindBooleanKeyword,
		KindSymbolKeyword,
		KindVoidKeyword,
		KindUnknownKeyword,
		KindUndefinedKeyword,
		KindExportKeyword:
		return SubtreeContainsTypeScript
	case KindAccessorKeyword:
		return SubtreeContainsClassFields
	case KindAsyncKeyword:
		return SubtreeContainsAnyAwait
	case KindSuperKeyword:
		return SubtreeContainsLexicalSuper
	case KindThisKeyword:
		return SubtreeContainsLexicalThis
	case KindAsteriskAsteriskToken, KindAsteriskAsteriskEqualsToken:
		return SubtreeContainsExponentiationOperator
	case KindQuestionQuestionToken:
		return SubtreeContainsNullishCoalescing
	case KindQuestionDotToken:
		return SubtreeContainsOptionalChaining
	case KindQuestionQuestionEqualsToken, KindBarBarEqualsToken, KindAmpersandAmpersandEqualsToken:
		return SubtreeContainsLogicalAssignments
	}
	return SubtreeFactsNone
}

func (node *PrivateIdentifier) computeSubtreeFacts() SubtreeFacts {
	return SubtreeContainsClassFields
}

func (f *NodeFactory) NewModifier(kind Kind) *Node {
	return f.NewToken(kind)
}

func (node *Decorator) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) |
		SubtreeContainsTypeScript |
		SubtreeContainsDecorators
}

func (node *ForInOrOfStatement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Initializer) |
		propagateSubtreeFacts(node.Expression) |
		propagateSubtreeFacts(node.Statement) |
		core.IfElse(node.AwaitModifier != nil, SubtreeContainsForAwaitOrAsyncGenerator, SubtreeFactsNone)
}

func (node *ReturnStatement) computeSubtreeFacts() SubtreeFacts {
	// return in an ES2018 async generator must be awaited
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsForAwaitOrAsyncGenerator
}

func (node *CatchClause) computeSubtreeFacts() SubtreeFacts {
	res := propagateSubtreeFacts(node.VariableDeclaration) |
		propagateSubtreeFacts(node.Block)
	if node.VariableDeclaration == nil {
		res |= SubtreeContainsMissingCatchClauseVariable
	}
	return res
}

func (node *CatchClause) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsCatchClause
}

func (node *VariableStatement) computeSubtreeFacts() SubtreeFacts {
	if node.modifiers != nil && node.modifiers.ModifierFlags&ModifierFlagsAmbient != 0 {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.modifiers) |
			propagateSubtreeFacts(node.DeclarationList)
	}
}

func (node *VariableDeclaration) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.name) |
		propagateEraseableSyntaxSubtreeFacts(node.ExclamationToken) |
		propagateEraseableSyntaxSubtreeFacts(node.Type) |
		propagateSubtreeFacts(node.Initializer)
}

func (node *VariableDeclarationList) computeSubtreeFacts() SubtreeFacts {
	return propagateNodeListSubtreeFacts(node.Declarations, propagateSubtreeFacts) |
		core.IfElse(node.Flags&NodeFlagsUsing != 0, SubtreeContainsUsing, SubtreeFactsNone)
}

func (node *VariableDeclarationList) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsVariableDeclarationList
}

func (node *BindingPattern) computeSubtreeFacts() SubtreeFacts {
	switch node.Kind {
	case KindObjectBindingPattern:
		return propagateNodeListSubtreeFacts(node.Elements, propagateObjectBindingElementSubtreeFacts)
	case KindArrayBindingPattern:
		return propagateNodeListSubtreeFacts(node.Elements, propagateBindingElementSubtreeFacts)
	default:
		return SubtreeFactsNone
	}
}

func (node *BindingPattern) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsBindingPattern
}

func (node *ParameterDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.name != nil && IsThisIdentifier(node.name) {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.modifiers) |
			propagateSubtreeFacts(node.name) |
			propagateEraseableSyntaxSubtreeFacts(node.QuestionToken) |
			propagateEraseableSyntaxSubtreeFacts(node.Type) |
			propagateSubtreeFacts(node.Initializer)
	}
}

func (node *ParameterDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsParameter
}

func (node *BindingElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.PropertyName) |
		propagateSubtreeFacts(node.name) |
		propagateSubtreeFacts(node.Initializer) |
		core.IfElse(node.DotDotDotToken != nil, SubtreeContainsRestOrSpread, SubtreeFactsNone)
}

func (node *FunctionDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.Body == nil || node.ModifierFlags()&ModifierFlagsAmbient != 0 {
		return SubtreeContainsTypeScript
	} else {
		isAsync := node.ModifierFlags()&ModifierFlagsAsync != 0
		isGenerator := node.AsteriskToken != nil
		return propagateModifierListSubtreeFacts(node.modifiers) |
			propagateSubtreeFacts(node.AsteriskToken) |
			propagateSubtreeFacts(node.name) |
			propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters) |
			propagateNodeListSubtreeFacts(node.Parameters, propagateSubtreeFacts) |
			propagateEraseableSyntaxSubtreeFacts(node.Type) |
			propagateEraseableSyntaxSubtreeFacts(node.FullSignature) |
			propagateSubtreeFacts(node.Body) |
			core.IfElse(isAsync && isGenerator, SubtreeContainsForAwaitOrAsyncGenerator, SubtreeFactsNone) |
			core.IfElse(isAsync && !isGenerator, SubtreeContainsAnyAwait, SubtreeFactsNone)
	}
}

func (node *FunctionDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsFunction
}

// ClassLikeBase

func (node *ClassLikeBase) Name() *DeclarationName { return node.name }

func (node *ClassLikeBase) ClassLikeData() *ClassLikeBase { return node }

func (node *ClassLikeBase) computeSubtreeFacts() SubtreeFacts {
	if node.modifiers != nil && node.modifiers.ModifierFlags&ModifierFlagsAmbient != 0 {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.modifiers) |
			propagateSubtreeFacts(node.name) |
			propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters) |
			propagateNodeListSubtreeFacts(node.HeritageClauses, propagateSubtreeFacts) |
			propagateNodeListSubtreeFacts(node.Members, propagateSubtreeFacts)
	}
}

func (node *ClassDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsClass
}

func (node *ClassExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsClass
}

func (node *HeritageClause) computeSubtreeFacts() SubtreeFacts {
	switch node.Token {
	case KindExtendsKeyword:
		return propagateNodeListSubtreeFacts(node.Types, propagateSubtreeFacts)
	case KindImplementsKeyword:
		return SubtreeContainsTypeScript
	default:
		return SubtreeFactsNone
	}
}

func IsTypeOrJSTypeAliasDeclaration(node *Node) bool {
	return node.Kind == KindTypeAliasDeclaration || node.Kind == KindJSTypeAliasDeclaration
}

func (node *EnumMember) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.name) |
		propagateSubtreeFacts(node.Initializer) |
		SubtreeContainsTypeScript
}

func (node *EnumDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.modifiers != nil && node.modifiers.ModifierFlags&ModifierFlagsAmbient != 0 {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.modifiers) |
			propagateSubtreeFacts(node.name) |
			propagateNodeListSubtreeFacts(node.Members, propagateSubtreeFacts) |
			SubtreeContainsTypeScript
	}
}

func (node *ModuleDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.ModifierFlags()&ModifierFlagsAmbient != 0 {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.modifiers) |
			propagateSubtreeFacts(node.name) |
			propagateSubtreeFacts(node.Body) |
			SubtreeContainsTypeScript
	}
}

func (node *ModuleDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsModule
}

func (node *ImportEqualsDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.IsTypeOnly || !IsExternalModuleReference(node.ModuleReference) {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.modifiers) |
			propagateSubtreeFacts(node.name) |
			propagateSubtreeFacts(node.ModuleReference)
	}
}

func IsImportDeclarationOrJSImportDeclaration(node *Node) bool {
	return node.Kind == KindImportDeclaration || node.Kind == KindJSImportDeclaration
}

func (node *ImportSpecifier) computeSubtreeFacts() SubtreeFacts {
	if node.IsTypeOnly {
		return SubtreeContainsTypeScript
	} else {
		return propagateSubtreeFacts(node.PropertyName) |
			propagateSubtreeFacts(node.name)
	}
}

func (node *ImportClause) computeSubtreeFacts() SubtreeFacts {
	if node.PhaseModifier == KindTypeKeyword {
		return SubtreeContainsTypeScript
	} else {
		return propagateSubtreeFacts(node.name) |
			propagateSubtreeFacts(node.NamedBindings)
	}
}

func (node *ExportAssignment) computeSubtreeFacts() SubtreeFacts {
	return propagateModifierListSubtreeFacts(node.modifiers) | propagateSubtreeFacts(node.Type) | propagateSubtreeFacts(node.Expression) | core.IfElse(node.IsExportEquals, SubtreeContainsTypeScript, SubtreeFactsNone)
}

func IsAnyExportAssignment(node *Node) bool {
	return node.Kind == KindExportAssignment || node.Kind == KindJSExportAssignment
}

func (node *ExportDeclaration) computeSubtreeFacts() SubtreeFacts {
	return propagateModifierListSubtreeFacts(node.modifiers) |
		propagateSubtreeFacts(node.ExportClause) |
		propagateSubtreeFacts(node.ModuleSpecifier) |
		propagateSubtreeFacts(node.Attributes) |
		core.IfElse(node.IsTypeOnly, SubtreeContainsTypeScript, SubtreeFactsNone)
}

func (node *ExportSpecifier) computeSubtreeFacts() SubtreeFacts {
	if node.IsTypeOnly {
		return SubtreeContainsTypeScript
	} else {
		return propagateSubtreeFacts(node.PropertyName) |
			propagateSubtreeFacts(node.name)
	}
}

// NamedMemberBase

func (node *NamedMemberBase) DeclarationData() *DeclarationBase    { return &node.DeclarationBase }
func (node *NamedMemberBase) Modifiers() *ModifierList             { return node.modifiers }
func (node *NamedMemberBase) setModifiers(modifiers *ModifierList) { node.modifiers = modifiers }
func (node *NamedMemberBase) Name() *DeclarationName               { return node.name }

func (node *ConstructorDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.Body == nil {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.modifiers) |
			propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters) |
			propagateNodeListSubtreeFacts(node.Parameters, propagateSubtreeFacts) |
			propagateEraseableSyntaxSubtreeFacts(node.Type) |
			propagateEraseableSyntaxSubtreeFacts(node.FullSignature) |
			propagateSubtreeFacts(node.Body)
	}
}

func (node *ConstructorDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsConstructor
}

func (node *AccessorDeclarationBase) IsAccessorDeclaration() {}

func (node *AccessorDeclarationBase) computeSubtreeFacts() SubtreeFacts {
	if node.Body == nil {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.modifiers) |
			propagateSubtreeFacts(node.name) |
			propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters) |
			propagateNodeListSubtreeFacts(node.Parameters, propagateSubtreeFacts) |
			propagateEraseableSyntaxSubtreeFacts(node.Type) |
			propagateEraseableSyntaxSubtreeFacts(node.FullSignature) |
			propagateSubtreeFacts(node.Body)
	}
}

func (node *AccessorDeclarationBase) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsAccessor |
		propagateSubtreeFacts(node.name)
}

func (node *MethodDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.Body == nil {
		return SubtreeContainsTypeScript
	} else {
		isAsync := node.modifiers != nil && node.modifiers.ModifierFlags&ModifierFlagsAsync != 0
		isGenerator := node.AsteriskToken != nil
		return propagateModifierListSubtreeFacts(node.modifiers) |
			propagateSubtreeFacts(node.AsteriskToken) |
			propagateSubtreeFacts(node.name) |
			propagateEraseableSyntaxSubtreeFacts(node.PostfixToken) |
			propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters) |
			propagateNodeListSubtreeFacts(node.Parameters, propagateSubtreeFacts) |
			propagateSubtreeFacts(node.Body) |
			propagateEraseableSyntaxSubtreeFacts(node.Type) |
			propagateEraseableSyntaxSubtreeFacts(node.FullSignature) |
			core.IfElse(isAsync && isGenerator, SubtreeContainsForAwaitOrAsyncGenerator, SubtreeFactsNone) |
			core.IfElse(isAsync && !isGenerator, SubtreeContainsAnyAwait, SubtreeFactsNone)
	}
}

func (node *MethodDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsMethod |
		propagateSubtreeFacts(node.name)
}

func (node *PropertyDeclaration) computeSubtreeFacts() SubtreeFacts {
	return propagateModifierListSubtreeFacts(node.modifiers) |
		propagateSubtreeFacts(node.name) |
		propagateEraseableSyntaxSubtreeFacts(node.PostfixToken) |
		propagateEraseableSyntaxSubtreeFacts(node.Type) |
		propagateSubtreeFacts(node.Initializer) |
		SubtreeContainsClassFields
}

func (node *PropertyDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsProperty |
		propagateSubtreeFacts(node.name)
}

func (node *ClassStaticBlockDeclaration) computeSubtreeFacts() SubtreeFacts {
	return propagateModifierListSubtreeFacts(node.modifiers) |
		propagateSubtreeFacts(node.Body) |
		SubtreeContainsClassFields
}

func (node *KeywordExpression) computeSubtreeFacts() SubtreeFacts {
	switch node.Kind {
	case KindThisKeyword:
		return SubtreeContainsLexicalThis
	case KindSuperKeyword:
		return SubtreeContainsLexicalSuper
	}
	return SubtreeFactsNone
}

// TemplateLiteralLikeBase

func (node *LiteralLikeNodeBase) LiteralLikeData() *LiteralLikeNodeBase { return node }

func (node *BigIntLiteral) computeSubtreeFacts() SubtreeFacts {
	return SubtreeFactsNone // `bigint` is not downleveled in any way
}

func (node *Identifier) computeSubtreeFacts() SubtreeFacts {
	return SubtreeContainsIdentifier
}

func (node *NoSubstitutionTemplateLiteral) computeSubtreeFacts() SubtreeFacts {
	if node.TemplateFlags&TokenFlagsContainsInvalidEscape != 0 {
		return SubtreeContainsInvalidTemplateEscape
	}
	return SubtreeFactsNone
}

func (node *BinaryExpression) computeSubtreeFacts() SubtreeFacts {
	facts := propagateModifierListSubtreeFacts(node.modifiers) |
		propagateSubtreeFacts(node.Left) |
		propagateSubtreeFacts(node.Type) |
		propagateSubtreeFacts(node.OperatorToken) |
		propagateSubtreeFacts(node.Right) |
		core.IfElse(node.OperatorToken.Kind == KindInKeyword && IsPrivateIdentifier(node.Left), SubtreeContainsClassFields|SubtreeContainsPrivateIdentifierInExpression, SubtreeFactsNone)
	if node.OperatorToken.Kind == KindEqualsToken {
		if (IsObjectLiteralExpression(node.Left) || IsArrayLiteralExpression(node.Left)) && ContainsObjectRestOrSpread(node.Left) {
			facts |= SubtreeContainsObjectRestOrSpread
		}
	}
	return facts
}

func (node *BinaryExpression) setModifiers(modifiers *ModifierList) { node.modifiers = modifiers }

func (node *YieldExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsForAwaitOrAsyncGenerator
}

func (node *ArrowFunction) computeSubtreeFacts() SubtreeFacts {
	return propagateModifierListSubtreeFacts(node.modifiers) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters) |
		propagateNodeListSubtreeFacts(node.Parameters, propagateSubtreeFacts) |
		propagateEraseableSyntaxSubtreeFacts(node.Type) |
		propagateEraseableSyntaxSubtreeFacts(node.FullSignature) |
		propagateSubtreeFacts(node.Body) |
		core.IfElse(node.ModifierFlags()&ModifierFlagsAsync != 0, SubtreeContainsAnyAwait, SubtreeFactsNone)
}

func (node *ArrowFunction) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsArrowFunction
}

func (node *FunctionExpression) computeSubtreeFacts() SubtreeFacts {
	isAsync := node.modifiers != nil && node.modifiers.ModifierFlags&ModifierFlagsAsync != 0
	isGenerator := node.AsteriskToken != nil
	return propagateModifierListSubtreeFacts(node.modifiers) |
		propagateSubtreeFacts(node.AsteriskToken) |
		propagateSubtreeFacts(node.name) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters) |
		propagateNodeListSubtreeFacts(node.Parameters, propagateSubtreeFacts) |
		propagateEraseableSyntaxSubtreeFacts(node.Type) |
		propagateEraseableSyntaxSubtreeFacts(node.FullSignature) |
		propagateSubtreeFacts(node.Body) |
		core.IfElse(isAsync && isGenerator, SubtreeContainsForAwaitOrAsyncGenerator, SubtreeFactsNone) |
		core.IfElse(isAsync && !isGenerator, SubtreeContainsAnyAwait, SubtreeFactsNone)
}

func (node *FunctionExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsFunction
}

func (node *AsExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsTypeScript
}

func (node *AsExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsOuterExpression
}

func (node *SatisfiesExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsTypeScript
}

func (node *SatisfiesExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsOuterExpression
}

func (node *PropertyAccessExpression) computeSubtreeFacts() SubtreeFacts {
	privateName := SubtreeFactsNone
	if !IsIdentifier(node.name) {
		privateName = SubtreeContainsPrivateIdentifierInExpression
	}
	return propagateSubtreeFacts(node.Expression) |
		propagateSubtreeFacts(node.QuestionDotToken) |
		propagateSubtreeFacts(node.name) | privateName
}

func (node *PropertyAccessExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsPropertyAccess
}

func (node *ElementAccessExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsElementAccess
}

func (node *CallExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) |
		propagateSubtreeFacts(node.QuestionDotToken) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments) |
		propagateNodeListSubtreeFacts(node.Arguments, propagateSubtreeFacts) |
		core.IfElse(node.Expression.Kind == KindImportKeyword, SubtreeContainsDynamicImport, SubtreeFactsNone)
}

func (node *CallExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsCall
}

func (node *NewExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments) |
		propagateNodeListSubtreeFacts(node.Arguments, propagateSubtreeFacts)
}

func (node *NewExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsNew
}

func (node *MetaProperty) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.name)
}

func (node *NonNullExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsTypeScript
}

func (node *SpreadElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsRestOrSpread
}

func (node *TaggedTemplateExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Tag) |
		propagateSubtreeFacts(node.QuestionDotToken) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments) |
		propagateSubtreeFacts(node.Template)
}

// Hand-written subtree facts for nontrivial generated nodes.

func (node *ArrayLiteralExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsArrayLiteral
}

func (node *ObjectLiteralExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsObjectLiteral
}

func (node *SpreadAssignment) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsESObjectRestOrSpread | SubtreeContainsObjectRestOrSpread
}

func (node *PropertyAssignment) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.name) |
		propagateSubtreeFacts(node.Type) |
		propagateSubtreeFacts(node.Initializer)
}

func (node *ShorthandPropertyAssignment) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.name) |
		propagateSubtreeFacts(node.Type) |
		propagateSubtreeFacts(node.ObjectAssignmentInitializer) |
		SubtreeContainsTypeScript
}

func (node *AwaitExpression) computeSubtreeFacts() SubtreeFacts {
	// await in an ES2018 async generator must use `yield __await(expr)`
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsAwait | SubtreeContainsAnyAwait | SubtreeContainsForAwaitOrAsyncGenerator
}

func (node *TypeAssertion) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsTypeScript
}

func (node *TypeAssertion) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsOuterExpression
}

func (node *ExpressionWithTypeArguments) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments)
}

func (node *ImportAttributesNode) GetResolutionModeOverride( /* !!! grammarErrorOnNode?: (node: Node, diagnostic: DiagnosticMessage) => void*/ ) (core.ResolutionMode, bool) {
	if node == nil {
		return core.ResolutionModeNone, false
	}

	attributes := node.AsImportAttributes().Attributes

	if len(attributes.Nodes) != 1 {
		// !!!
		// grammarErrorOnNode?.(
		//     node,
		//     node.token === SyntaxKind.WithKeyword
		//         ? Diagnostics.Type_import_attributes_should_have_exactly_one_key_resolution_mode_with_value_import_or_require
		//         : Diagnostics.Type_import_assertions_should_have_exactly_one_key_resolution_mode_with_value_import_or_require,
		// );
		return core.ResolutionModeNone, false
	}

	elem := attributes.Nodes[0].AsImportAttribute()
	if !IsStringLiteralLike(elem.Name()) {
		return core.ResolutionModeNone, false
	}
	if elem.Name().Text() != "resolution-mode" {
		// !!!
		// grammarErrorOnNode?.(
		//     elem.name,
		//     node.token === SyntaxKind.WithKeyword
		//         ? Diagnostics.resolution_mode_is_the_only_valid_key_for_type_import_attributes
		//         : Diagnostics.resolution_mode_is_the_only_valid_key_for_type_import_assertions,
		// );
		return core.ResolutionModeNone, false
	}
	if !IsStringLiteralLike(elem.Value) {
		return core.ResolutionModeNone, false
	}
	if elem.Value.Text() != "import" && elem.Value.Text() != "require" {
		// !!!
		// grammarErrorOnNode?.(elem.value, Diagnostics.resolution_mode_should_be_either_require_or_import);
		return core.ResolutionModeNone, false
	}
	if elem.Value.Text() == "import" {
		return core.ResolutionModeESM, true
	} else {
		return core.ModuleKindCommonJS, true
	}
}

// FunctionOrConstructorTypeNodeBase

func (node *FunctionOrConstructorTypeNodeBase) DeclarationData() *DeclarationBase {
	return node.FunctionLikeBase.DeclarationData()
}

func (node *TemplateLiteralLikeNodeBase) LiteralLikeData() *LiteralLikeNodeBase {
	return &node.LiteralLikeNodeBase
}

func (node *TemplateLiteralLikeNodeBase) TemplateLiteralLikeData() *TemplateLiteralLikeNodeBase {
	return node
}

func (node *TemplateHead) computeSubtreeFacts() SubtreeFacts {
	if node.TemplateFlags&TokenFlagsContainsInvalidEscape != 0 {
		return SubtreeContainsInvalidTemplateEscape
	}
	return SubtreeFactsNone
}

func (node *TemplateMiddle) computeSubtreeFacts() SubtreeFacts {
	if node.TemplateFlags&TokenFlagsContainsInvalidEscape != 0 {
		return SubtreeContainsInvalidTemplateEscape
	}
	return SubtreeFactsNone
}

func (node *TemplateTail) computeSubtreeFacts() SubtreeFacts {
	if node.TemplateFlags&TokenFlagsContainsInvalidEscape != 0 {
		return SubtreeContainsInvalidTemplateEscape
	}
	return SubtreeFactsNone
}

func (node *JsxElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.OpeningElement) |
		propagateNodeListSubtreeFacts(node.Children, propagateSubtreeFacts) |
		propagateSubtreeFacts(node.ClosingElement) |
		SubtreeContainsJsx
}

func (node *JsxAttributes) computeSubtreeFacts() SubtreeFacts {
	return propagateNodeListSubtreeFacts(node.Properties, propagateSubtreeFacts) |
		SubtreeContainsJsx
}

func (node *JsxNamespacedName) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Namespace) |
		propagateSubtreeFacts(node.name) |
		SubtreeContainsJsx
}

func (node *JsxOpeningElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.TagName) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments) |
		propagateSubtreeFacts(node.Attributes) |
		SubtreeContainsJsx
}

func (node *JsxSelfClosingElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.TagName) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments) |
		propagateSubtreeFacts(node.Attributes) |
		SubtreeContainsJsx
}

func (node *JsxFragment) computeSubtreeFacts() SubtreeFacts {
	return propagateNodeListSubtreeFacts(node.Children, propagateSubtreeFacts) |
		SubtreeContainsJsx
}

func (node *JsxOpeningFragment) computeSubtreeFacts() SubtreeFacts {
	return SubtreeContainsJsx
}

func (node *JsxClosingFragment) computeSubtreeFacts() SubtreeFacts {
	return SubtreeContainsJsx
}

func (node *JsxAttribute) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.name) |
		propagateSubtreeFacts(node.Initializer) |
		SubtreeContainsJsx
}

func (node *JsxSpreadAttribute) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsJsx
}

func (node *JsxClosingElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.TagName) | SubtreeContainsJsx
}

func (node *JsxExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression) | SubtreeContainsJsx
}

func (node *JsxText) computeSubtreeFacts() SubtreeFacts {
	return SubtreeContainsJsx
}

/// JSDoc nodes ///

// JSDoc

func (node *Node) IsJSDoc() bool {
	return node.Kind == KindJSDoc
}

// JSDocText

// PatternAmbientModule

type PatternAmbientModule struct {
	Pattern core.Pattern
	Symbol  *Symbol
}

type CommentDirectiveKind int32

const (
	CommentDirectiveKindUnknown CommentDirectiveKind = iota
	CommentDirectiveKindExpectError
	CommentDirectiveKindIgnore
)

type CommentDirective struct {
	Loc  core.TextRange
	Kind CommentDirectiveKind
}

// SourceFile

type SourceFileMetaData struct {
	PackageJsonType      string
	PackageJsonDirectory string
	ImpliedNodeFormat    core.ResolutionMode
}

type CheckJsDirective struct {
	Enabled bool
	Range   CommentRange
}

type HasFileName interface {
	FileName() string
	Path() tspath.Path
}

type TokenCacheKey struct {
	parent *Node
	loc    core.TextRange
}

type SourceFile struct {
	NodeBase
	DeclarationBase
	LocalsContainerBase
	CompositeBase

	// Fields set by NewSourceFile
	fileName       string // For debugging convenience
	parseOptions   SourceFileParseOptions
	text           string
	Statements     *NodeList  // NodeList[*Statement]
	EndOfFileToken *TokenNode // TokenNode[*EndOfFileToken]

	// Fields set by parser
	diagnostics                 []*Diagnostic
	jsDiagnostics               []*Diagnostic
	jsdocDiagnostics            []*Diagnostic
	LanguageVariant             core.LanguageVariant
	ScriptKind                  core.ScriptKind
	IsDeclarationFile           bool
	ContainsNonASCII            bool
	UsesUriStyleNodeCoreModules core.Tristate
	Identifiers                 map[string]string
	IdentifierCount             int
	imports                     []*LiteralLikeNode // []LiteralLikeNode
	ModuleAugmentations         []*ModuleName      // []ModuleName
	AmbientModuleNames          []string
	CommentDirectives           []CommentDirective
	jsdocCache                  map[*Node][]*Node
	jsdocMu                     sync.RWMutex
	hasLazyJSDoc                bool
	ReparsedClones              []*Node
	Pragmas                     []Pragma
	ReferencedFiles             []*FileReference
	TypeReferenceDirectives     []*FileReference
	LibReferenceDirectives      []*FileReference
	CheckJsDirective            *CheckJsDirective
	NodeCount                   int
	TextCount                   int
	CommonJSModuleIndicator     *Node
	// If this is the SourceFile itself, then this module was "forced"
	// to be an external module (previously "true").
	ExternalModuleIndicator *Node

	// Fields set by binder

	isBound                   atomic.Bool
	bindOnce                  sync.Once
	bindDiagnostics           []*Diagnostic
	BindSuggestionDiagnostics []*Diagnostic
	EndFlowNode               *FlowNode
	SymbolCount               int
	ClassifiableNames         collections.Set[string]
	PatternAmbientModules     []*PatternAmbientModule
	NestedCJSExports          []*Node
	GlobalExports             SymbolTable

	// Fields set by ECMALineMap

	ecmaLineMapMu sync.RWMutex
	ecmaLineMap   []core.TextPos

	// Fields set by language service

	Hash             xxh3.Uint128
	tokenCacheMu     sync.Mutex
	tokenCache       map[TokenCacheKey]*Node
	tokenFactory     *NodeFactory
	declarationMapMu sync.Mutex
	declarationMap   map[string][]*Node
	nameTableOnce    sync.Once
	nameTable        map[string]int

	// Fields for UTF-8 to UTF-16 position mapping

	positionMapOnce sync.Once
	positionMap     *PositionMap
}

func (f *NodeFactory) NewSourceFile(opts SourceFileParseOptions, text string, statements *NodeList, endOfFileToken *TokenNode) *Node {
	if tspath.GetEncodedRootLength(opts.FileName) == 0 || opts.FileName != tspath.NormalizePath(opts.FileName) {
		panic(fmt.Sprintf("fileName should be normalized and absolute: %q", opts.FileName))
	}
	data := &SourceFile{}
	data.fileName = opts.FileName
	data.parseOptions = opts
	data.text = text
	data.Statements = statements
	data.EndOfFileToken = endOfFileToken
	return f.newNode(KindSourceFile, data)
}

func (node *SourceFile) ParseOptions() SourceFileParseOptions {
	return node.parseOptions
}

func (node *SourceFile) Text() string {
	return node.text
}

func (node *SourceFile) FileName() string {
	return node.parseOptions.FileName
}

func (node *SourceFile) Path() tspath.Path {
	return node.parseOptions.Path
}

func (node *SourceFile) Imports() []*LiteralLikeNode {
	return node.imports
}

func (node *SourceFile) Diagnostics() []*Diagnostic {
	return node.diagnostics
}

func (node *SourceFile) SetDiagnostics(diags []*Diagnostic) {
	node.diagnostics = diags
}

func (node *SourceFile) JSDiagnostics() []*Diagnostic {
	return node.jsDiagnostics
}

func (node *SourceFile) SetJSDiagnostics(diags []*Diagnostic) {
	node.jsDiagnostics = diags
}

func (node *SourceFile) JSDocDiagnostics() []*Diagnostic {
	return node.jsdocDiagnostics
}

func (node *SourceFile) SetJSDocDiagnostics(diags []*Diagnostic) {
	node.jsdocDiagnostics = diags
}

func (node *SourceFile) SetJSDocCache(cache map[*Node][]*Node) {
	node.jsdocCache = cache
}

func (node *SourceFile) SetHasLazyJSDoc(lazy bool) {
	node.hasLazyJSDoc = lazy
}

func (node *SourceFile) resolveJSDoc(n *Node) []*Node {
	if parseJSDocForNode == nil {
		panic("resolveJSDoc called but parseJSDocForNode is not registered; ensure the parser package is imported")
	}
	// Fast path: check cache under read lock
	node.jsdocMu.RLock()
	if jsdocs, ok := node.jsdocCache[n]; ok {
		node.jsdocMu.RUnlock()
		return jsdocs
	}
	node.jsdocMu.RUnlock()

	// Slow path: parse and cache under write lock
	node.jsdocMu.Lock()
	defer node.jsdocMu.Unlock()
	// Double-check after acquiring write lock
	if jsdocs, ok := node.jsdocCache[n]; ok {
		return jsdocs
	}
	jsdocs := parseJSDocForNode(node, n)
	if node.jsdocCache == nil {
		node.jsdocCache = make(map[*Node][]*Node)
	}
	node.jsdocCache[n] = jsdocs
	return jsdocs
}

func (node *SourceFile) BindDiagnostics() []*Diagnostic {
	return node.bindDiagnostics
}

func (node *SourceFile) SetBindDiagnostics(diags []*Diagnostic) {
	node.bindDiagnostics = diags
}

func (node *SourceFile) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Statements) || visit(v, node.EndOfFileToken)
}

func (node *SourceFile) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateSourceFile(node, v.visitTopLevelStatements(node.Statements), v.visitToken(node.EndOfFileToken))
}

func (node *SourceFile) IsJS() bool {
	return IsSourceFileJS(node)
}

func (node *SourceFile) copyFrom(other *SourceFile) {
	// Do not copy fields set by NewSourceFile (Text, FileName, Path, or Statements)
	node.LanguageVariant = other.LanguageVariant
	node.ScriptKind = other.ScriptKind
	node.IsDeclarationFile = other.IsDeclarationFile
	node.ContainsNonASCII = other.ContainsNonASCII
	node.UsesUriStyleNodeCoreModules = other.UsesUriStyleNodeCoreModules
	node.Identifiers = other.Identifiers
	node.imports = other.imports
	node.ModuleAugmentations = other.ModuleAugmentations
	node.AmbientModuleNames = other.AmbientModuleNames
	node.CommentDirectives = other.CommentDirectives
	node.Pragmas = other.Pragmas
	node.ReferencedFiles = other.ReferencedFiles
	node.TypeReferenceDirectives = other.TypeReferenceDirectives
	node.LibReferenceDirectives = other.LibReferenceDirectives
	node.CommonJSModuleIndicator = other.CommonJSModuleIndicator
	node.ExternalModuleIndicator = other.ExternalModuleIndicator
	node.Flags |= other.Flags
}

func (node *SourceFile) Clone(f NodeFactoryCoercible) *Node {
	updated := f.AsNodeFactory().NewSourceFile(node.parseOptions, node.text, node.Statements, node.EndOfFileToken)
	newFile := updated.AsSourceFile()
	newFile.copyFrom(node)
	return cloneNode(updated, node.AsNode(), f.AsNodeFactory().hooks)
}

func (node *SourceFile) computeSubtreeFacts() SubtreeFacts {
	return propagateNodeListSubtreeFacts(node.Statements, propagateSubtreeFacts)
}

func (f *NodeFactory) UpdateSourceFile(node *SourceFile, statements *StatementList, endOfFileToken *TokenNode) *Node {
	if statements != node.Statements || endOfFileToken != node.EndOfFileToken {
		updated := f.NewSourceFile(node.parseOptions, node.text, statements, endOfFileToken).AsSourceFile()
		updated.copyFrom(node)
		return updateNode(updated.AsNode(), node.AsNode(), f.hooks)
	}
	return node.AsNode()
}

func (node *SourceFile) ECMALineMap() []core.TextPos {
	node.ecmaLineMapMu.RLock()
	lineMap := node.ecmaLineMap
	node.ecmaLineMapMu.RUnlock()
	if lineMap == nil {
		node.ecmaLineMapMu.Lock()
		defer node.ecmaLineMapMu.Unlock()
		lineMap = node.ecmaLineMap
		if lineMap == nil {
			lineMap = core.ComputeECMALineStarts(node.Text())
			node.ecmaLineMap = lineMap
		}
	}
	return lineMap
}

// GetNameTable returns a map of all names in the file to their positions.
// If the name appears more than once, the value is -1.
func (file *SourceFile) GetNameTable() map[string]int {
	file.nameTableOnce.Do(func() {
		nameTable := make(map[string]int, file.IdentifierCount)

		var walk func(node *Node) bool
		walk = func(node *Node) bool {
			if IsIdentifier(node) && !IsTagName(node) && node.Text() != "" ||
				IsStringOrNumericLiteralLike(node) && literalIsName(node) ||
				IsPrivateIdentifier(node) {
				text := node.Text()
				if _, ok := nameTable[text]; ok {
					nameTable[text] = -1
				} else {
					nameTable[text] = node.Pos()
				}
			}

			node.ForEachChild(walk)
			jsdocNodes := node.JSDoc(file)
			for _, jsdoc := range jsdocNodes {
				jsdoc.ForEachChild(walk)
			}
			return false
		}
		file.ForEachChild(walk)

		file.nameTable = nameTable
	})
	return file.nameTable
}

func (node *SourceFile) IsBound() bool {
	return node.isBound.Load()
}

// GetPositionMap returns the PositionMap for this source file, computing it lazily.
func (file *SourceFile) GetPositionMap() *PositionMap {
	file.positionMapOnce.Do(func() {
		if !file.ContainsNonASCII {
			file.positionMap = &PositionMap{asciiOnly: true}
		} else {
			file.positionMap = ComputePositionMap(file.Text())
		}
	})
	return file.positionMap
}

func (node *SourceFile) BindOnce(bind func()) {
	node.bindOnce.Do(func() {
		bind()
		node.isBound.Store(true)
	})
}

// Gets a token from the file's token cache, or creates it if it does not already exist.
// This function should NOT be used for creating synthetic tokens that are not in the file in the first place.
func (node *SourceFile) GetOrCreateToken(
	kind Kind,
	pos int,
	end int,
	parent *Node,
	flags TokenFlags,
) *TokenNode {
	node.tokenCacheMu.Lock()
	defer node.tokenCacheMu.Unlock()
	loc := core.NewTextRange(pos, end)
	key := TokenCacheKey{parent, loc}
	if token, ok := node.tokenCache[key]; ok {
		if token.Kind != kind {
			panic(fmt.Sprintf("Token cache mismatch: %v != %v", token.Kind, kind))
		}
		return token
	}
	if parent.Flags&NodeFlagsReparsed != 0 {
		panic(fmt.Sprintf("Cannot create token from reparsed node of kind %v", parent.Kind))
	}
	if node.tokenCache == nil {
		node.tokenCache = make(map[TokenCacheKey]*Node)
	}
	token := createToken(kind, node, pos, end, flags)
	token.Loc = loc
	token.Parent = parent
	node.tokenCache[key] = token
	return token
}

// `kind` should be a token kind.
func createToken(kind Kind, file *SourceFile, pos, end int, flags TokenFlags) *Node {
	if file.tokenFactory == nil {
		file.tokenFactory = NewNodeFactory(NodeFactoryHooks{})
	}
	text := file.text[pos:end]
	switch kind {
	case KindNumericLiteral:
		return file.tokenFactory.NewNumericLiteral(text, flags)
	case KindBigIntLiteral:
		return file.tokenFactory.NewBigIntLiteral(text, flags)
	case KindStringLiteral:
		return file.tokenFactory.NewStringLiteral(text, flags)
	case KindJsxText, KindJsxTextAllWhiteSpaces:
		return file.tokenFactory.NewJsxText(text, kind == KindJsxTextAllWhiteSpaces)
	case KindRegularExpressionLiteral:
		return file.tokenFactory.NewRegularExpressionLiteral(text, flags)
	case KindNoSubstitutionTemplateLiteral:
		return file.tokenFactory.NewNoSubstitutionTemplateLiteral(text, flags)
	case KindTemplateHead:
		return file.tokenFactory.NewTemplateHead(text, "" /*rawText*/, flags)
	case KindTemplateMiddle:
		return file.tokenFactory.NewTemplateMiddle(text, "" /*rawText*/, flags)
	case KindTemplateTail:
		return file.tokenFactory.NewTemplateTail(text, "" /*rawText*/, flags)
	case KindIdentifier:
		return file.tokenFactory.NewIdentifier(text)
	case KindPrivateIdentifier:
		return file.tokenFactory.NewPrivateIdentifier(text)
	default: // Punctuation and keywords
		return file.tokenFactory.NewToken(kind)
	}
}

func (node *SourceFile) GetDeclarationMap() map[string][]*Node {
	node.declarationMapMu.Lock()
	defer node.declarationMapMu.Unlock()
	if node.declarationMap == nil {
		node.declarationMap = node.computeDeclarationMap()
	}
	return node.declarationMap
}

func (node *SourceFile) computeDeclarationMap() map[string][]*Node {
	result := make(map[string][]*Node)

	addDeclaration := func(declaration *Node) {
		name := GetDeclarationName(declaration)
		if name != "" {
			result[name] = append(result[name], declaration)
		}
	}

	var visit func(*Node) bool
	visit = func(node *Node) bool {
		switch node.Kind {
		case KindFunctionDeclaration, KindFunctionExpression, KindMethodDeclaration, KindMethodSignature:
			declarationName := GetDeclarationName(node)
			if declarationName != "" {
				declarations := result[declarationName]
				var lastDeclaration *Node
				if len(declarations) != 0 {
					lastDeclaration = declarations[len(declarations)-1]
				}
				// Check whether this declaration belongs to an "overload group".
				if lastDeclaration != nil && node.Parent == lastDeclaration.Parent && node.Symbol() == lastDeclaration.Symbol() {
					// Overwrite the last declaration if it was an overload and this one is an implementation.
					if node.Body() != nil && lastDeclaration.Body() == nil {
						declarations[len(declarations)-1] = node
					}
				} else {
					result[declarationName] = append(result[declarationName], node)
				}
			}
			node.ForEachChild(visit)
		case KindClassDeclaration, KindClassExpression, KindInterfaceDeclaration, KindTypeAliasDeclaration, KindEnumDeclaration, KindModuleDeclaration,
			KindImportEqualsDeclaration, KindImportClause, KindNamespaceImport, KindGetAccessor, KindSetAccessor, KindTypeLiteral:
			addDeclaration(node)
			node.ForEachChild(visit)
		case KindImportSpecifier, KindExportSpecifier:
			if node.PropertyName() != nil {
				addDeclaration(node)
			}
		case KindParameter:
			// Only consider parameter properties
			if !HasSyntacticModifier(node, ModifierFlagsParameterPropertyModifier) {
				break
			}
			fallthrough
		case KindVariableDeclaration, KindBindingElement, KindCommonJSExport:
			name := node.Name()
			if name != nil {
				if IsBindingPattern(name) {
					node.Name().ForEachChild(visit)
				} else {
					if node.Initializer() != nil {
						visit(node.Initializer())
					}
					addDeclaration(node)
				}
			}
		case KindEnumMember, KindPropertyDeclaration, KindPropertySignature:
			addDeclaration(node)
		case KindExportDeclaration:
			// Handle named exports case e.g.:
			//    export {a, b as B} from "mod";
			exportClause := node.AsExportDeclaration().ExportClause
			if exportClause != nil {
				if IsNamedExports(exportClause) {
					for _, element := range exportClause.Elements() {
						visit(element)
					}
				} else {
					visit(exportClause.AsNamespaceExport().Name())
				}
			}
		case KindImportDeclaration:
			importClause := node.AsImportDeclaration().ImportClause
			if importClause != nil {
				// Handle default import case e.g.:
				//    import d from "mod";
				if importClause.Name() != nil {
					addDeclaration(importClause.Name())
				}
				// Handle named bindings in imports e.g.:
				//    import * as NS from "mod";
				//    import {a, b as B} from "mod";
				namedBindings := importClause.AsImportClause().NamedBindings
				if namedBindings != nil {
					if namedBindings.Kind == KindNamespaceImport {
						addDeclaration(namedBindings)
					} else {
						for _, element := range namedBindings.Elements() {
							visit(element)
						}
					}
				}
			}
		case KindBinaryExpression:
			switch GetAssignmentDeclarationKind(node) {
			case JSDeclarationKindThisProperty, JSDeclarationKindProperty:
				addDeclaration(node)
			}
			node.ForEachChild(visit)
		default:
			node.ForEachChild(visit)
		}
		return false
	}
	node.ForEachChild(visit)
	return result
}

func GetDeclarationName(declaration *Node) string {
	name := GetNonAssignedNameOfDeclaration(declaration)
	if name != nil {
		if IsComputedPropertyName(name) {
			if IsStringOrNumericLiteralLike(name.Expression()) {
				return name.Expression().Text()
			}
			if IsPropertyAccessExpression(name.Expression()) {
				return name.Expression().Name().Text()
			}
		} else if IsPropertyName(name) {
			return name.Text()
		}
	}
	return ""
}

type SourceFileLike interface {
	Text() string
	ECMALineMap() []core.TextPos
}

type CommentRange struct {
	core.TextRange
	Kind               Kind
	HasTrailingNewLine bool
}

func (f *NodeFactory) NewCommentRange(kind Kind, pos int, end int, hasTrailingNewLine bool) CommentRange {
	return CommentRange{
		TextRange:          core.NewTextRange(pos, end),
		Kind:               kind,
		HasTrailingNewLine: hasTrailingNewLine,
	}
}

type FileReference struct {
	core.TextRange
	FileName       string
	ResolutionMode core.ResolutionMode
	Preserve       bool
}

type PragmaArgument struct {
	core.TextRange
	Name  string
	Value string
}

type Pragma struct {
	CommentRange
	Name string
	Args map[string]PragmaArgument
}

type PragmaKindFlags = uint8

const (
	PragmaKindTripleSlashXML PragmaKindFlags = 1 << iota
	PragmaKindSingleLine
	PragmaKindMultiLine
	PragmaKindFlagsNone PragmaKindFlags = 0
	PragmaKindAll                       = PragmaKindTripleSlashXML | PragmaKindSingleLine | PragmaKindMultiLine
	PragmaKindDefault                   = PragmaKindAll
)

type PragmaArgumentSpecification struct {
	Name        string
	Optional    bool
	CaptureSpan bool
}
type PragmaSpecification struct {
	Args []PragmaArgumentSpecification
	Kind PragmaKindFlags
}

func (spec *PragmaSpecification) IsTripleSlash() bool {
	return (spec.Kind & PragmaKindTripleSlashXML) > 0
}

// Hand-written visitor implementations for nodes with runtime-dependent
// child ordering. Generated code in ast_generated.go delegates to these.

func forEachChild_JSDocParameterOrPropertyTag(node *JSDocParameterOrPropertyTag, v Visitor) bool {
	return visit(v, node.TagName) ||
		(node.IsNameFirst &&
			(visit(v, node.name) || visit(v, node.TypeExpression))) ||
		(!node.IsNameFirst &&
			(visit(v, node.TypeExpression) || visit(v, node.name))) ||
		visitNodeList(v, node.Comment)
}

func visitEachChild_JSDocParameterOrPropertyTag(node *JSDocParameterOrPropertyTag, v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocParameterOrPropertyTag(node, v.visitNode(node.TagName), v.visitNode(node.name), node.IsBracketed, v.visitNode(node.TypeExpression), node.IsNameFirst, v.visitNodes(node.Comment))
}
