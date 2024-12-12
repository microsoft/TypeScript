package ast

import (
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// Visitor

type Visitor func(*Node) bool

func visit(v Visitor, node *Node) bool {
	if node != nil {
		return v(node)
	}
	return false
}

func visitNodes(v Visitor, nodes []*Node) bool {
	for _, node := range nodes {
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

// NodeFactory

type NodeFactory struct {
	identifierPool core.Pool[Identifier]
	tokenPool      core.Pool[Token]
	nodeListPool   core.Pool[NodeList]
}

func newNode(kind Kind, data nodeData) *Node {
	n := data.AsNode()
	n.Kind = kind
	n.data = data
	return n
}

// NodeList

type NodeList struct {
	Loc   core.TextRange
	Nodes []*Node
}

func (f *NodeFactory) NewNodeList(loc core.TextRange, nodes []*Node) *NodeList {
	list := f.nodeListPool.New()
	list.Loc = loc
	list.Nodes = nodes
	return list
}

func (list *NodeList) Pos() int { return list.Loc.Pos() }
func (list *NodeList) End() int { return list.Loc.End() }

func (list *NodeList) HasTrailingComma() bool {
	return len(list.Nodes) > 0 && list.Nodes[len(list.Nodes)-1].End() < list.End()
}

// ModifierList

type ModifierList struct {
	NodeList
	ModifierFlags ModifierFlags
}

func (f *NodeFactory) NewModifierList(loc core.TextRange, nodes []*Node) *ModifierList {
	return &ModifierList{NodeList: NodeList{Loc: loc, Nodes: nodes}, ModifierFlags: ModifiersToFlags(nodes)}
}

// AST Node
// Interface values stored in AST nodes are never typed nil values. Construction code must ensure that
// interface valued properties either store a true nil or a reference to a non-nil struct.

type Node struct {
	Kind   Kind
	Flags  NodeFlags
	Loc    core.TextRange
	Id     NodeId
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
func (n *Node) Name() *DeclarationName                    { return n.data.Name() }
func (n *Node) Modifiers() *ModifierList                  { return n.data.Modifiers() }
func (n *Node) FlowNodeData() *FlowNodeBase               { return n.data.FlowNodeData() }
func (n *Node) DeclarationData() *DeclarationBase         { return n.data.DeclarationData() }
func (n *Node) Symbol() *Symbol                           { return n.data.DeclarationData().Symbol }
func (n *Node) ExportableData() *ExportableBase           { return n.data.ExportableData() }
func (n *Node) LocalSymbol() *Symbol                      { return n.data.ExportableData().LocalSymbol }
func (n *Node) LocalsContainerData() *LocalsContainerBase { return n.data.LocalsContainerData() }
func (n *Node) Locals() SymbolTable                       { return n.data.LocalsContainerData().Locals }
func (n *Node) FunctionLikeData() *FunctionLikeBase       { return n.data.FunctionLikeData() }
func (n *Node) Parameters() []*ParameterDeclarationNode {
	return n.data.FunctionLikeData().Parameters.Nodes
}
func (n *Node) ClassLikeData() *ClassLikeBase     { return n.data.ClassLikeData() }
func (n *Node) BodyData() *BodyBase               { return n.data.BodyData() }
func (n *Node) LiteralLikeData() *LiteralLikeBase { return n.data.LiteralLikeData() }
func (n *Node) TemplateLiteralLikeData() *TemplateLiteralLikeBase {
	return n.data.TemplateLiteralLikeData()
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
	case KindNoSubstitutionTemplateLiteral:
		return n.AsNoSubstitutionTemplateLiteral().Text
	case KindTemplateHead:
		return n.AsTemplateHead().Text
	case KindTemplateMiddle:
		return n.AsTemplateMiddle().Text
	case KindTemplateTail:
		return n.AsTemplateTail().Text
	case KindJsxNamespacedName:
		return n.AsJsxNamespacedName().Namespace.Text() + ":" + n.AsJsxNamespacedName().Name().Text()
	}
	panic("Unhandled case in Node.Text")
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
	}
	panic("Unhandled case in Node.Expression")
}

func (n *Node) ArgumentList() *NodeList {
	switch n.Kind {
	case KindCallExpression:
		return n.AsCallExpression().Arguments
	case KindNewExpression:
		return n.AsNewExpression().Arguments
	}
	panic("Unhandled case in Node.Arguments")
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
		return n.AsTypeReference().TypeArguments
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
	case KindTypeAliasDeclaration:
		return n.AsTypeAliasDeclaration().TypeParameters
	default:
		funcLike := n.FunctionLikeData()
		if funcLike != nil {
			return funcLike.TypeParameters
		}
	}
	panic("Unhandled case in Node.TypeParameters")
}

func (n *Node) TypeParameters() []*Node {
	list := n.TypeParameterList()
	if list != nil {
		return list.Nodes
	}
	return nil
}

func (n *Node) ModifierFlags() ModifierFlags {
	modifiers := n.Modifiers()
	if modifiers != nil {
		return modifiers.ModifierFlags
	}
	return ModifierFlagsNone
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
	case KindTypeAliasDeclaration:
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
	case KindJSDocNullableType:
		return n.AsJSDocNullableType().Type
	case KindJSDocNonNullableType:
		return n.AsJSDocNonNullableType().Type
	case KindJSDocFunctionType:
		return n.AsJSDocFunctionType().Type
	case KindJSDocOptionalType:
		return n.AsJSDocOptionalType().Type
	case KindEnumMember, KindBindingElement, KindExportAssignment:
		return nil
	default:
		funcLike := n.FunctionLikeData()
		if funcLike != nil {
			return funcLike.Type
		}
	}
	panic("Unhandled case in Node.Type")
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
	}
	panic("Unhandled case in Node.Initializer")
}

// Node casts

func (n *Node) AsIdentifier() *Identifier {
	return n.data.(*Identifier)
}
func (n *Node) AsPrivateIdentifier() *PrivateIdentifier {
	return n.data.(*PrivateIdentifier)
}
func (n *Node) AsQualifiedName() *QualifiedName {
	return n.data.(*QualifiedName)
}
func (n *Node) AsSourceFile() *SourceFile {
	return n.data.(*SourceFile)
}
func (n *Node) AsPrefixUnaryExpression() *PrefixUnaryExpression {
	return n.data.(*PrefixUnaryExpression)
}
func (n *Node) AsPostfixUnaryExpression() *PostfixUnaryExpression {
	return n.data.(*PostfixUnaryExpression)
}
func (n *Node) AsParenthesizedExpression() *ParenthesizedExpression {
	return n.data.(*ParenthesizedExpression)
}
func (n *Node) AsTypeAssertion() *TypeAssertion {
	return n.data.(*TypeAssertion)
}
func (n *Node) AsAsExpression() *AsExpression {
	return n.data.(*AsExpression)
}
func (n *Node) AsSatisfiesExpression() *SatisfiesExpression {
	return n.data.(*SatisfiesExpression)
}
func (n *Node) AsExpressionWithTypeArguments() *ExpressionWithTypeArguments {
	return n.data.(*ExpressionWithTypeArguments)
}
func (n *Node) AsNonNullExpression() *NonNullExpression {
	return n.data.(*NonNullExpression)
}
func (n *Node) AsBindingElement() *BindingElement {
	return n.data.(*BindingElement)
}
func (n *Node) AsImportSpecifier() *ImportSpecifier {
	return n.data.(*ImportSpecifier)
}
func (n *Node) AsArrowFunction() *ArrowFunction {
	return n.data.(*ArrowFunction)
}
func (n *Node) AsCallExpression() *CallExpression {
	return n.data.(*CallExpression)
}
func (n *Node) AsPropertyAccessExpression() *PropertyAccessExpression {
	return n.data.(*PropertyAccessExpression)
}
func (n *Node) AsElementAccessExpression() *ElementAccessExpression {
	return n.data.(*ElementAccessExpression)
}
func (n *Node) AsComputedPropertyName() *ComputedPropertyName {
	return n.data.(*ComputedPropertyName)
}
func (n *Node) AsBinaryExpression() *BinaryExpression {
	return n.data.(*BinaryExpression)
}
func (n *Node) AsModuleDeclaration() *ModuleDeclaration {
	return n.data.(*ModuleDeclaration)
}
func (n *Node) AsStringLiteral() *StringLiteral {
	return n.data.(*StringLiteral)
}
func (n *Node) AsNumericLiteral() *NumericLiteral {
	return n.data.(*NumericLiteral)
}
func (n *Node) AsBigIntLiteral() *BigIntLiteral {
	return n.data.(*BigIntLiteral)
}
func (n *Node) AsNoSubstitutionTemplateLiteral() *NoSubstitutionTemplateLiteral {
	return n.data.(*NoSubstitutionTemplateLiteral)
}
func (n *Node) AsRegularExpressionLiteral() *RegularExpressionLiteral {
	return n.data.(*RegularExpressionLiteral)
}
func (n *Node) AsTemplateHead() *TemplateHead {
	return n.data.(*TemplateHead)
}
func (n *Node) AsTemplateMiddle() *TemplateMiddle {
	return n.data.(*TemplateMiddle)
}
func (n *Node) AsTemplateTail() *TemplateTail {
	return n.data.(*TemplateTail)
}
func (n *Node) AsVariableDeclaration() *VariableDeclaration {
	return n.data.(*VariableDeclaration)
}
func (n *Node) AsExportAssignment() *ExportAssignment {
	return n.data.(*ExportAssignment)
}
func (n *Node) AsObjectLiteralExpression() *ObjectLiteralExpression {
	return n.data.(*ObjectLiteralExpression)
}
func (n *Node) AsIfStatement() *IfStatement {
	return n.data.(*IfStatement)
}
func (n *Node) AsWhileStatement() *WhileStatement {
	return n.data.(*WhileStatement)
}
func (n *Node) AsDoStatement() *DoStatement {
	return n.data.(*DoStatement)
}
func (n *Node) AsForStatement() *ForStatement {
	return n.data.(*ForStatement)
}
func (n *Node) AsConditionalExpression() *ConditionalExpression {
	return n.data.(*ConditionalExpression)
}
func (n *Node) AsForInOrOfStatement() *ForInOrOfStatement {
	return n.data.(*ForInOrOfStatement)
}
func (n *Node) AsShorthandPropertyAssignment() *ShorthandPropertyAssignment {
	return n.data.(*ShorthandPropertyAssignment)
}
func (n *Node) AsPropertyAssignment() *PropertyAssignment {
	return n.data.(*PropertyAssignment)
}
func (n *Node) AsExpressionStatement() *ExpressionStatement {
	return n.data.(*ExpressionStatement)
}
func (n *Node) AsBlock() *Block {
	return n.data.(*Block)
}
func (n *Node) AsModuleBlock() *ModuleBlock {
	return n.data.(*ModuleBlock)
}
func (n *Node) AsVariableStatement() *VariableStatement {
	return n.data.(*VariableStatement)
}
func (n *Node) AsVariableDeclarationList() *VariableDeclarationList {
	return n.data.(*VariableDeclarationList)
}
func (n *Node) AsMetaProperty() *MetaProperty {
	return n.data.(*MetaProperty)
}
func (n *Node) AsTypeReference() *TypeReferenceNode {
	return n.data.(*TypeReferenceNode)
}
func (n *Node) AsConstructorDeclaration() *ConstructorDeclaration {
	return n.data.(*ConstructorDeclaration)
}
func (n *Node) AsConditionalTypeNode() *ConditionalTypeNode {
	return n.data.(*ConditionalTypeNode)
}
func (n *Node) AsClassExpression() *ClassExpression {
	return n.data.(*ClassExpression)
}
func (n *Node) AsHeritageClause() *HeritageClause {
	return n.data.(*HeritageClause)
}
func (n *Node) AsFunctionExpression() *FunctionExpression {
	return n.data.(*FunctionExpression)
}
func (n *Node) AsParameterDeclaration() *ParameterDeclaration {
	return n.data.(*ParameterDeclaration)
}
func (n *Node) AsDecorator() *Decorator {
	return n.data.(*Decorator)
}
func (n *Node) AsInferTypeNode() *InferTypeNode {
	return n.data.(*InferTypeNode)
}
func (n *Node) AsTypeParameter() *TypeParameterDeclaration {
	return n.data.(*TypeParameterDeclaration)
}
func (n *Node) AsExportSpecifier() *ExportSpecifier {
	return n.data.(*ExportSpecifier)
}
func (n *Node) AsExportDeclaration() *ExportDeclaration {
	return n.data.(*ExportDeclaration)
}
func (n *Node) AsPropertyDeclaration() *PropertyDeclaration {
	return n.data.(*PropertyDeclaration)
}
func (n *Node) AsImportClause() *ImportClause {
	return n.data.(*ImportClause)
}
func (n *Node) AsImportEqualsDeclaration() *ImportEqualsDeclaration {
	return n.data.(*ImportEqualsDeclaration)
}
func (n *Node) AsNamespaceImport() *NamespaceImport {
	return n.data.(*NamespaceImport)
}
func (n *Node) AsPropertySignatureDeclaration() *PropertySignatureDeclaration {
	return n.data.(*PropertySignatureDeclaration)
}
func (n *Node) AsEnumMember() *EnumMember {
	return n.data.(*EnumMember)
}
func (n *Node) AsReturnStatement() *ReturnStatement {
	return n.data.(*ReturnStatement)
}
func (n *Node) AsWithStatement() *WithStatement {
	return n.data.(*WithStatement)
}
func (n *Node) AsSwitchStatement() *SwitchStatement {
	return n.data.(*SwitchStatement)
}
func (n *Node) AsCaseOrDefaultClause() *CaseOrDefaultClause {
	return n.data.(*CaseOrDefaultClause)
}
func (n *Node) AsThrowStatement() *ThrowStatement {
	return n.data.(*ThrowStatement)
}
func (n *Node) AsTemplateSpan() *TemplateSpan {
	return n.data.(*TemplateSpan)
}
func (n *Node) AsImportTypeNode() *ImportTypeNode {
	return n.data.(*ImportTypeNode)
}
func (n *Node) AsNewExpression() *NewExpression {
	return n.data.(*NewExpression)
}
func (n *Node) AsTaggedTemplateExpression() *TaggedTemplateExpression {
	return n.data.(*TaggedTemplateExpression)
}
func (n *Node) AsJsxOpeningElement() *JsxOpeningElement {
	return n.data.(*JsxOpeningElement)
}
func (n *Node) AsJsxSelfClosingElement() *JsxSelfClosingElement {
	return n.data.(*JsxSelfClosingElement)
}
func (n *Node) AsJsxClosingElement() *JsxClosingElement {
	return n.data.(*JsxClosingElement)
}
func (n *Node) AsJsxOpeningFragment() *JsxOpeningFragment {
	return n.data.(*JsxOpeningFragment)
}
func (n *Node) AsJsxClosingFragment() *JsxClosingFragment {
	return n.data.(*JsxClosingFragment)
}
func (n *Node) AsImportDeclaration() *ImportDeclaration {
	return n.data.(*ImportDeclaration)
}
func (n *Node) AsExternalModuleReference() *ExternalModuleReference {
	return n.data.(*ExternalModuleReference)
}
func (n *Node) AsLiteralTypeNode() *LiteralTypeNode {
	return n.data.(*LiteralTypeNode)
}
func (n *Node) AsJsxNamespacedName() *JsxNamespacedName {
	return n.data.(*JsxNamespacedName)
}
func (n *Node) AsClassDeclaration() *ClassDeclaration {
	return n.data.(*ClassDeclaration)
}
func (n *Node) AsInterfaceDeclaration() *InterfaceDeclaration {
	return n.data.(*InterfaceDeclaration)
}
func (n *Node) AsTypeAliasDeclaration() *TypeAliasDeclaration {
	return n.data.(*TypeAliasDeclaration)
}
func (n *Node) AsJsxAttribute() *JsxAttribute {
	return n.data.(*JsxAttribute)
}
func (n *Node) AsJsxAttributes() *JsxAttributes {
	return n.data.(*JsxAttributes)
}
func (n *Node) AsJsxSpreadAttribute() *JsxSpreadAttribute {
	return n.data.(*JsxSpreadAttribute)
}
func (n *Node) AsJsxExpression() *JsxExpression {
	return n.data.(*JsxExpression)
}
func (n *Node) AsJsxText() *JsxText {
	return n.data.(*JsxText)
}
func (n *Node) AsKeywordTypeNode() *KeywordTypeNode {
	return n.data.(*KeywordTypeNode)
}
func (n *Node) AsThisTypeNode() *ThisTypeNode {
	return n.data.(*ThisTypeNode)
}
func (n *Node) AsParenthesizedTypeNode() *ParenthesizedTypeNode {
	return n.data.(*ParenthesizedTypeNode)
}
func (n *Node) AsTypePredicateNode() *TypePredicateNode {
	return n.data.(*TypePredicateNode)
}
func (n *Node) AsTypeOperatorNode() *TypeOperatorNode {
	return n.data.(*TypeOperatorNode)
}
func (n *Node) AsMappedTypeNode() *MappedTypeNode {
	return n.data.(*MappedTypeNode)
}
func (n *Node) AsArrayLiteralExpression() *ArrayLiteralExpression {
	return n.data.(*ArrayLiteralExpression)
}
func (n *Node) AsMethodDeclaration() *MethodDeclaration {
	return n.data.(*MethodDeclaration)
}
func (n *Node) AsMethodSignatureDeclaration() *MethodSignatureDeclaration {
	return n.data.(*MethodSignatureDeclaration)
}
func (n *Node) AsTemplateLiteralTypeSpan() *TemplateLiteralTypeSpan {
	return n.data.(*TemplateLiteralTypeSpan)
}
func (n *Node) AsJsxElement() *JsxElement {
	return n.data.(*JsxElement)
}
func (n *Node) AsJsxFragment() *JsxFragment {
	return n.data.(*JsxFragment)
}
func (n *Node) AsKeywordExpression() *KeywordExpression {
	return n.data.(*KeywordExpression)
}
func (n *Node) AsCatchClause() *CatchClause {
	return n.data.(*CatchClause)
}
func (n *Node) AsDeleteExpression() *DeleteExpression {
	return n.data.(*DeleteExpression)
}
func (n *Node) AsLabeledStatement() *LabeledStatement {
	return n.data.(*LabeledStatement)
}
func (n *Node) AsNamespaceExportDeclaration() *NamespaceExportDeclaration {
	return n.data.(*NamespaceExportDeclaration)
}
func (n *Node) AsNamedImports() *NamedImports {
	return n.data.(*NamedImports)
}
func (n *Node) AsNamedExports() *NamedExports {
	return n.data.(*NamedExports)
}
func (n *Node) AsBreakStatement() *BreakStatement {
	return n.data.(*BreakStatement)
}
func (n *Node) AsContinueStatement() *ContinueStatement {
	return n.data.(*ContinueStatement)
}
func (n *Node) AsCaseBlock() *CaseBlock {
	return n.data.(*CaseBlock)
}
func (n *Node) AsTryStatement() *TryStatement {
	return n.data.(*TryStatement)
}
func (n *Node) AsBindingPattern() *BindingPattern {
	return n.data.(*BindingPattern)
}
func (n *Node) AsFunctionDeclaration() *FunctionDeclaration {
	return n.data.(*FunctionDeclaration)
}
func (n *Node) AsTypeOfExpression() *TypeOfExpression {
	return n.data.(*TypeOfExpression)
}
func (n *Node) AsVoidExpression() *VoidExpression {
	return n.data.(*VoidExpression)
}
func (n *Node) AsAwaitExpression() *AwaitExpression {
	return n.data.(*AwaitExpression)
}
func (n *Node) AsTemplateExpression() *TemplateExpression {
	return n.data.(*TemplateExpression)
}
func (n *Node) AsYieldExpression() *YieldExpression {
	return n.data.(*YieldExpression)
}
func (n *Node) AsSpreadElement() *SpreadElement {
	return n.data.(*SpreadElement)
}
func (n *Node) AsSpreadAssignment() *SpreadAssignment {
	return n.data.(*SpreadAssignment)
}
func (n *Node) AsArrayTypeNode() *ArrayTypeNode {
	return n.data.(*ArrayTypeNode)
}
func (n *Node) AsTupleTypeNode() *TupleTypeNode {
	return n.data.(*TupleTypeNode)
}
func (n *Node) AsUnionTypeNode() *UnionTypeNode {
	return n.data.(*UnionTypeNode)
}
func (n *Node) AsIntersectionTypeNode() *IntersectionTypeNode {
	return n.data.(*IntersectionTypeNode)
}
func (n *Node) AsRestTypeNode() *RestTypeNode {
	return n.data.(*RestTypeNode)
}
func (n *Node) AsNamedTupleMember() *NamedTupleMember {
	return n.data.(*NamedTupleMember)
}
func (n *Node) AsOptionalTypeNode() *OptionalTypeNode {
	return n.data.(*OptionalTypeNode)
}
func (n *Node) AsTemplateLiteralTypeNode() *TemplateLiteralTypeNode {
	return n.data.(*TemplateLiteralTypeNode)
}
func (n *Node) AsTypeReferenceNode() *TypeReferenceNode {
	return n.data.(*TypeReferenceNode)
}
func (n *Node) AsFunctionTypeNode() *FunctionTypeNode {
	return n.data.(*FunctionTypeNode)
}
func (n *Node) AsConstructorTypeNode() *ConstructorTypeNode {
	return n.data.(*ConstructorTypeNode)
}
func (n *Node) AsTypeQueryNode() *TypeQueryNode {
	return n.data.(*TypeQueryNode)
}
func (n *Node) AsTypeLiteralNode() *TypeLiteralNode {
	return n.data.(*TypeLiteralNode)
}
func (n *Node) AsIndexedAccessTypeNode() *IndexedAccessTypeNode {
	return n.data.(*IndexedAccessTypeNode)
}
func (n *Node) AsGetAccessorDeclaration() *GetAccessorDeclaration {
	return n.data.(*GetAccessorDeclaration)
}
func (n *Node) AsSetAccessorDeclaration() *SetAccessorDeclaration {
	return n.data.(*SetAccessorDeclaration)
}
func (n *Node) AsClassStaticBlockDeclaration() *ClassStaticBlockDeclaration {
	return n.data.(*ClassStaticBlockDeclaration)
}
func (n *Node) AsSemicolonClassElement() *SemicolonClassElement {
	return n.data.(*SemicolonClassElement)
}
func (n *Node) AsCallSignatureDeclaration() *CallSignatureDeclaration {
	return n.data.(*CallSignatureDeclaration)
}
func (n *Node) AsConstructSignatureDeclaration() *ConstructSignatureDeclaration {
	return n.data.(*ConstructSignatureDeclaration)
}
func (n *Node) AsIndexSignatureDeclaration() *IndexSignatureDeclaration {
	return n.data.(*IndexSignatureDeclaration)
}
func (n *Node) AsDebuggerStatement() *DebuggerStatement {
	return n.data.(*DebuggerStatement)
}
func (n *Node) AsEmptyStatement() *EmptyStatement {
	return n.data.(*EmptyStatement)
}
func (n *Node) AsEnumDeclaration() *EnumDeclaration {
	return n.data.(*EnumDeclaration)
}
func (n *Node) AsJSDoc() *JSDoc {
	return n.data.(*JSDoc)
}
func (n *Node) AsJSDocTagBase() *JSDocTagBase {
	return n.data.(*JSDocTagBase)
}
func (n *Node) AsJSDocCommentBase() *JSDocCommentBase {
	return n.data.(*JSDocCommentBase)
}
func (n *Node) AsJSDocText() *JSDocText {
	return n.data.(*JSDocText)
}
func (n *Node) AsJSDocLink() *JSDocLink {
	return n.data.(*JSDocLink)
}
func (n *Node) AsJSDocLinkPlain() *JSDocLinkPlain {
	return n.data.(*JSDocLinkPlain)
}
func (n *Node) AsJSDocLinkCode() *JSDocLinkCode {
	return n.data.(*JSDocLinkCode)
}
func (n *Node) AsJSDocTypeExpression() *JSDocTypeExpression {
	return n.data.(*JSDocTypeExpression)
}
func (n *Node) AsJSDocNonNullableType() *JSDocNonNullableType {
	return n.data.(*JSDocNonNullableType)
}
func (n *Node) AsJSDocNullableType() *JSDocNullableType {
	return n.data.(*JSDocNullableType)
}
func (n *Node) AsJSDocAllType() *JSDocAllType {
	return n.data.(*JSDocAllType)
}
func (n *Node) AsJSDocFunctionType() *JSDocFunctionType {
	return n.data.(*JSDocFunctionType)
}
func (n *Node) AsJSDocVariadicType() *JSDocVariadicType {
	return n.data.(*JSDocVariadicType)
}
func (n *Node) AsJSDocOptionalType() *JSDocOptionalType {
	return n.data.(*JSDocOptionalType)
}
func (n *Node) AsJSDocTypeTag() *JSDocTypeTag {
	return n.data.(*JSDocTypeTag)
}
func (n *Node) AsJSDocUnknownTag() *JSDocUnknownTag {
	return n.data.(*JSDocUnknownTag)
}
func (n *Node) AsJSDocTemplateTag() *JSDocTemplateTag {
	return n.data.(*JSDocTemplateTag)
}
func (n *Node) AsJSDocPropertyTag() *JSDocPropertyTag {
	return n.data.(*JSDocPropertyTag)
}
func (n *Node) AsJSDocParameterTag() *JSDocParameterTag {
	return n.data.(*JSDocParameterTag)
}
func (n *Node) AsJSDocReturnTag() *JSDocReturnTag {
	return n.data.(*JSDocReturnTag)
}
func (n *Node) AsJSDocPublicTag() *JSDocPublicTag {
	return n.data.(*JSDocPublicTag)
}
func (n *Node) AsJSDocPrivateTag() *JSDocPrivateTag {
	return n.data.(*JSDocPrivateTag)
}
func (n *Node) AsJSDocProtectedTag() *JSDocProtectedTag {
	return n.data.(*JSDocProtectedTag)
}
func (n *Node) AsJSDocReadonlyTag() *JSDocReadonlyTag {
	return n.data.(*JSDocReadonlyTag)
}
func (n *Node) AsJSDocOverrideTag() *JSDocOverrideTag {
	return n.data.(*JSDocOverrideTag)
}
func (n *Node) AsJSDocDeprecatedTag() *JSDocDeprecatedTag {
	return n.data.(*JSDocDeprecatedTag)
}
func (n *Node) AsJSDocSeeTag() *JSDocSeeTag {
	return n.data.(*JSDocSeeTag)
}
func (n *Node) AsJSDocImplementsTag() *JSDocImplementsTag {
	return n.data.(*JSDocImplementsTag)
}
func (n *Node) AsJSDocAugmentsTag() *JSDocAugmentsTag {
	return n.data.(*JSDocAugmentsTag)
}
func (n *Node) AsJSDocSatisfiesTag() *JSDocSatisfiesTag {
	return n.data.(*JSDocSatisfiesTag)
}
func (n *Node) AsJSDocThisTag() *JSDocThisTag {
	return n.data.(*JSDocThisTag)
}
func (n *Node) AsJSDocImportTag() *JSDocImportTag {
	return n.data.(*JSDocImportTag)
}
func (n *Node) AsJSDocCallbackTag() *JSDocCallbackTag {
	return n.data.(*JSDocCallbackTag)
}
func (n *Node) AsJSDocOverloadTag() *JSDocOverloadTag {
	return n.data.(*JSDocOverloadTag)
}
func (n *Node) AsJSDocTypedefTag() *JSDocTypedefTag {
	return n.data.(*JSDocTypedefTag)
}
func (n *Node) AsJSDocTypeLiteral() *JSDocTypeLiteral {
	return n.data.(*JSDocTypeLiteral)
}
func (n *Node) AsJSDocSignature() *JSDocSignature {
	return n.data.(*JSDocSignature)
}
func (n *Node) AsJSDocNameReference() *JSDocNameReference {
	return n.data.(*JSDocNameReference)
}
func (n *Node) AsNamespaceExport() *NamespaceExport {
	return n.data.(*NamespaceExport)
}
func (n *Node) AsImportAttribute() *ImportAttribute {
	return n.data.(*ImportAttribute)
}
func (n *Node) AsImportAttributes() *ImportAttributes {
	return n.data.(*ImportAttributes)
}
func (n *Node) AsFlowSwitchClauseData() *FlowSwitchClauseData {
	return n.data.(*FlowSwitchClauseData)
}
func (n *Node) AsFlowReduceLabelData() *FlowReduceLabelData {
	return n.data.(*FlowReduceLabelData)
}
func (n *Node) AsSyntheticExpression() *SyntheticExpression {
	return n.data.(*SyntheticExpression)
}

// NodeData

type nodeData interface {
	AsNode() *Node
	ForEachChild(v Visitor) bool
	Name() *DeclarationName
	Modifiers() *ModifierList
	FlowNodeData() *FlowNodeBase
	DeclarationData() *DeclarationBase
	ExportableData() *ExportableBase
	LocalsContainerData() *LocalsContainerBase
	FunctionLikeData() *FunctionLikeBase
	ClassLikeData() *ClassLikeBase
	BodyData() *BodyBase
	LiteralLikeData() *LiteralLikeBase
	TemplateLiteralLikeData() *TemplateLiteralLikeBase
}

// NodeDefault

type NodeDefault struct {
	Node
}

func (node *NodeDefault) AsNode() *Node                                     { return &node.Node }
func (node *NodeDefault) ForEachChild(v Visitor) bool                       { return false }
func (node *NodeDefault) Name() *DeclarationName                            { return nil }
func (node *NodeDefault) Modifiers() *ModifierList                          { return nil }
func (node *NodeDefault) FlowNodeData() *FlowNodeBase                       { return nil }
func (node *NodeDefault) DeclarationData() *DeclarationBase                 { return nil }
func (node *NodeDefault) ExportableData() *ExportableBase                   { return nil }
func (node *NodeDefault) LocalsContainerData() *LocalsContainerBase         { return nil }
func (node *NodeDefault) FunctionLikeData() *FunctionLikeBase               { return nil }
func (node *NodeDefault) ClassLikeData() *ClassLikeBase                     { return nil }
func (node *NodeDefault) BodyData() *BodyBase                               { return nil }
func (node *NodeDefault) LiteralLikeData() *LiteralLikeBase                 { return nil }
func (node *NodeDefault) TemplateLiteralLikeData() *TemplateLiteralLikeBase { return nil }

// NodeBase

type NodeBase struct {
	NodeDefault
}

// Aliases for Node unions

type Statement = Node                   // Node with StatementBase
type Declaration = Node                 // Node with DeclarationBase
type Expression = Node                  // Node with ExpressionBase
type TypeNode = Node                    // Node with TypeNodeBase
type TypeElement = Node                 // Node with TypeElementBase
type ClassElement = Node                // Node with ClassElementBase
type NamedMember = Node                 // Node with NamedMemberBase
type ObjectLiteralElement = Node        // Node with ObjectLiteralElementBase
type BlockOrExpression = Node           // Block | Expression
type AccessExpression = Node            // PropertyAccessExpression | ElementAccessExpression
type DeclarationName = Node             // Identifier | PrivateIdentifier | StringLiteral | NumericLiteral | BigIntLiteral | NoSubstitutionTemplateLiteral | ComputedPropertyName | BindingPattern | ElementAccessExpression
type ModuleName = Node                  // Identifier | StringLiteral
type ModuleExportName = Node            // Identifier | StringLiteral
type PropertyName = Node                // Identifier | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | ComputedPropertyName | PrivateIdentifier | BigIntLiteral
type ModuleBody = Node                  // ModuleBlock | ModuleDeclaration
type ForInitializer = Node              // Expression | MissingDeclaration | VariableDeclarationList
type ModuleReference = Node             // Identifier | QualifiedName | ExternalModuleReference
type NamedImportBindings = Node         // NamespaceImport | NamedImports
type NamedExportBindings = Node         // NamespaceExport | NamedExports
type MemberName = Node                  // Identifier | PrivateIdentifier
type EntityName = Node                  // Identifier | QualifiedName
type BindingName = Node                 // Identifier | BindingPattern
type ModifierLike = Node                // Modifier | Decorator
type JsxChild = Node                    // JsxText | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment
type JsxAttributeLike = Node            // JsxAttribute | JsxSpreadAttribute
type JsxAttributeName = Node            // Identifier | JsxNamespacedName
type JsxAttributeValue = Node           // StringLiteral | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment
type JsxTagNameExpression = Node        // IdentifierReference | KeywordExpression | JsxTagNamePropertyAccess | JsxNamespacedName
type ClassLikeDeclaration = Node        // ClassDeclaration | ClassExpression
type AccessorDeclaration = Node         // GetAccessorDeclaration | SetAccessorDeclaration
type LiteralLikeNode = Node             // StringLiteral | NumericLiteral | BigIntLiteral | RegularExpressionLiteral | TemplateLiteralLikeNode | JsxText
type LiteralExpression = Node           // StringLiteral | NumericLiteral | BigIntLiteral | RegularExpressionLiteral | NoSubstitutionTemplateLiteral
type UnionOrIntersectionTypeNode = Node // UnionTypeNode | IntersectionTypeNode
type TemplateLiteralLikeNode = Node     // TemplateHead | TemplateMiddle | TemplateTail
type TemplateMiddleOrTail = Node        // TemplateMiddle | TemplateTail
type TemplateLiteral = Node             // TemplateExpression | NoSubstitutionTemplateLiteral
type TypePredicateParameterName = Node  // Identifier | ThisTypeNode
type ImportAttributeName = Node         // Identifier | StringLiteral
type LeftHandSideExpression = Node      // subset of Expression
type JSDocComment = Node                // JSDocText | JSDocLink | JSDocLinkCode | JSDocLinkPlain;
type JSDocTag = Node                    // Node with JSDocTagBase

// Aliases for node singletons

type IdentifierNode = Node
type TokenNode = Node
type TemplateHeadNode = Node
type TemplateMiddleNode = Node
type TemplateTailNode = Node
type TemplateSpanNode = Node
type TemplateLiteralTypeSpanNode = Node
type BlockNode = Node
type CatchClauseNode = Node
type CaseBlockNode = Node
type CaseOrDefaultClauseNode = Node
type VariableDeclarationNode = Node
type VariableDeclarationListNode = Node
type BindingElementNode = Node
type TypeParameterDeclarationNode = Node
type ParameterDeclarationNode = Node
type HeritageClauseNode = Node
type ExpressionWithTypeArgumentsNode = Node
type EnumMemberNode = Node
type ImportClauseNode = Node
type ImportAttributesNode = Node
type ImportAttributeNode = Node
type ImportSpecifierNode = Node
type ExportSpecifierNode = Node
type JsxAttributesNode = Node
type JsxOpeningElementNode = Node
type JsxClosingElementNode = Node
type JsxOpeningFragmentNode = Node
type JsxClosingFragmentNode = Node

type StatementList = NodeList                   // NodeList[*Statement]
type CaseClausesList = NodeList                 // NodeList[*CaseOrDefaultClause]
type VariableDeclarationNodeList = NodeList     // NodeList[*VariableDeclaration]
type BindingElementList = NodeList              // NodeList[*BindingElement]
type TypeParameterList = NodeList               // NodeList[*TypeParameterDeclaration]
type ParameterList = NodeList                   // NodeList[*ParameterDeclaration]
type HeritageClauseList = NodeList              // NodeList[*HeritageClause]
type ClassElementList = NodeList                // NodeList[*ClassElement]
type TypeElementList = NodeList                 // NodeList[*TypeElement]
type ExpressionWithTypeArgumentsList = NodeList // NodeList[*ExpressionWithTypeArguments]
type EnumMemberList = NodeList                  // NodeList[*EnumMember]
type ImportSpecifierList = NodeList             // NodeList[*ImportSpecifier]
type ExportSpecifierList = NodeList             // NodeList[*ExportSpecifier]
type TypeArgumentList = NodeList                // NodeList[*TypeNode]
type ArgumentList = NodeList                    // NodeList[*Expression]
type TemplateSpanList = NodeList                // NodeList[*TemplateSpan]
type ElementList = NodeList                     // NodeList[*Expression]
type PropertyDefinitionList = NodeList          // NodeList[*ObjectLiteralElement]
type TypeList = NodeList                        // NodeList[*TypeNode]
type ImportAttributeList = NodeList             // NodeList[*ImportAttributeNode]
type TemplateLiteralTypeSpanList = NodeList     // NodeList[*TemplateLiteralTypeSpan]
type JsxChildList = NodeList                    // NodeList[*JsxChild]
type JsxAttributeList = NodeList                // NodeList[*JsxAttributeLike]

// DeclarationBase

type DeclarationBase struct {
	Symbol *Symbol // Symbol declared by node (initialized by binding)
}

func (node *DeclarationBase) DeclarationData() *DeclarationBase { return node }

func IsDeclarationNode(node *Node) bool {
	return node.DeclarationData() != nil
}

// DeclarationBase

type ExportableBase struct {
	LocalSymbol *Symbol // Local symbol declared by node (initialized by binding only for exported nodes)
}

func (node *ExportableBase) ExportableData() *ExportableBase { return node }

// ModifiersBase

type ModifiersBase struct {
	modifiers *ModifierList
}

func (node *ModifiersBase) Modifiers() *ModifierList { return node.modifiers }

// LocalsContainerBase

type LocalsContainerBase struct {
	Locals        SymbolTable // Locals associated with node (initialized by binding)
	NextContainer *Node       // Next container in declaration order (initialized by binding)
}

func (node *LocalsContainerBase) LocalsContainerData() *LocalsContainerBase { return node }

func IsLocalsContainer(node *Node) bool {
	return node.LocalsContainerData() != nil
}

// FunctionLikeBase

type FunctionLikeBase struct {
	LocalsContainerBase
	TypeParameters *NodeList // NodeList[*TypeParameterDeclarationNode]. Optional
	Parameters     *NodeList // NodeList[*ParameterDeclarationNode]
	Type           *TypeNode // Optional
}

func (node *FunctionLikeBase) LocalsContainerData() *LocalsContainerBase {
	return &node.LocalsContainerBase
}
func (node *FunctionLikeBase) FunctionLikeData() *FunctionLikeBase { return node }
func (node *FunctionLikeBase) BodyData() *BodyBase                 { return nil }

// BodyBase

type BodyBase struct {
	AsteriskToken *TokenNode
	Body          *BlockOrExpression // Optional, can be Expression only in arrow functions
	EndFlowNode   *FlowNode
}

func (node *BodyBase) BodyData() *BodyBase { return node }

// FunctionLikeWithBodyBase

type FunctionLikeWithBodyBase struct {
	FunctionLikeBase
	BodyBase
}

func (node *FunctionLikeWithBodyBase) LocalsContainerData() *LocalsContainerBase {
	return &node.LocalsContainerBase
}
func (node *FunctionLikeWithBodyBase) FunctionLikeData() *FunctionLikeBase {
	return &node.FunctionLikeBase
}
func (node *FunctionLikeWithBodyBase) BodyData() *BodyBase { return &node.BodyBase }

// FlowNodeBase

type FlowNodeBase struct {
	FlowNode *FlowNode
}

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
	if jsdocs, ok := file.jsdocCache[node]; ok {
		return jsdocs
	}
	return nil
}
func (node *Node) SetJSDoc(file *SourceFile, jsDocs []*Node) {
	if node.Flags&NodeFlagsHasJSDoc == 0 {
		node.Flags &= NodeFlagsHasJSDoc
	}
	file.jsdocCache[node] = jsDocs
}

// Token

type Token struct {
	NodeBase
}

func (f *NodeFactory) NewToken(kind Kind) *Node {
	return newNode(kind, f.tokenPool.New())
}

// Identifier

type Identifier struct {
	ExpressionBase
	FlowNodeBase
	Text string
}

func (f *NodeFactory) NewIdentifier(text string) *Node {
	data := f.identifierPool.New()
	data.Text = text
	return newNode(KindIdentifier, data)
}

func IsIdentifier(node *Node) bool {
	return node.Kind == KindIdentifier
}

// PrivateIdentifier

type PrivateIdentifier struct {
	ExpressionBase
	Text string
}

func (f *NodeFactory) NewPrivateIdentifier(text string) *Node {
	data := &PrivateIdentifier{}
	data.Text = text
	return newNode(KindPrivateIdentifier, data)
}

func IsPrivateIdentifier(node *Node) bool {
	return node.Kind == KindPrivateIdentifier
}

// QualifiedName

type QualifiedName struct {
	NodeBase
	FlowNodeBase
	Left  *EntityName     // EntityName
	Right *IdentifierNode // IdentifierNode
}

func (f *NodeFactory) NewQualifiedName(left *EntityName, right *IdentifierNode) *Node {
	data := &QualifiedName{}
	data.Left = left
	data.Right = right
	return newNode(KindQualifiedName, data)
}

func (node *QualifiedName) ForEachChild(v Visitor) bool {
	return visit(v, node.Left) || visit(v, node.Right)
}

func IsQualifiedName(node *Node) bool {
	return node.Kind == KindQualifiedName
}

// TypeParameterDeclaration

type TypeParameterDeclaration struct {
	NodeBase
	DeclarationBase
	ModifiersBase
	name        *IdentifierNode // IdentifierNode
	Constraint  *TypeNode       // TypeNode. Optional
	DefaultType *TypeNode       // TypeNode. Optional
	Expression  *Expression     // Expression. Optional, For error recovery purposes
}

func (f *NodeFactory) NewTypeParameterDeclaration(modifiers *ModifierList, name *IdentifierNode, constraint *TypeNode, defaultType *TypeNode) *Node {
	data := &TypeParameterDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.Constraint = constraint
	data.DefaultType = defaultType
	return newNode(KindTypeParameter, data)
}

func (node *TypeParameterDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.Constraint) || visit(v, node.DefaultType)
}

func (node *TypeParameterDeclaration) Name() *DeclarationName {
	return node.name
}

func IsTypeParameterDeclaration(node *Node) bool {
	return node.Kind == KindTypeParameter
}

// ComputedPropertyName

type ComputedPropertyName struct {
	NodeBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewComputedPropertyName(expression *Expression) *Node {
	data := &ComputedPropertyName{}
	data.Expression = expression
	return newNode(KindComputedPropertyName, data)
}

func (node *ComputedPropertyName) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func IsComputedPropertyName(node *Node) bool {
	return node.Kind == KindComputedPropertyName
}

// Modifier

func (f *NodeFactory) NewModifier(kind Kind) *Node {
	return f.NewToken(kind)
}

// Decorator

type Decorator struct {
	NodeBase
	Expression *LeftHandSideExpression // LeftHandSideExpression
}

func (f *NodeFactory) NewDecorator(expression *LeftHandSideExpression) *Node {
	data := &Decorator{}
	data.Expression = expression
	return newNode(KindDecorator, data)
}

func (node *Decorator) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func IsDecorator(node *Node) bool {
	return node.Kind == KindDecorator
}

// StatementBase

type StatementBase struct {
	NodeBase
	FlowNodeBase
}

// EmptyStatement

type EmptyStatement struct {
	StatementBase
}

func (f *NodeFactory) NewEmptyStatement() *Node {
	return newNode(KindEmptyStatement, &EmptyStatement{})
}

func IsEmptyStatement(node *Node) bool {
	return node.Kind == KindEmptyStatement
}

// IfStatement

type IfStatement struct {
	StatementBase
	Expression    *Expression // Expression
	ThenStatement *Statement  // Statement
	ElseStatement *Statement  // Statement. Optional
}

func (f *NodeFactory) NewIfStatement(expression *Expression, thenStatement *Statement, elseStatement *Statement) *Node {
	data := &IfStatement{}
	data.Expression = expression
	data.ThenStatement = thenStatement
	data.ElseStatement = elseStatement
	return newNode(KindIfStatement, data)
}

func (node *IfStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.ThenStatement) || visit(v, node.ElseStatement)
}

// DoStatement

type DoStatement struct {
	StatementBase
	Statement  *Statement  // Statement
	Expression *Expression // Expression
}

func (f *NodeFactory) NewDoStatement(statement *Statement, expression *Expression) *Node {
	data := &DoStatement{}
	data.Statement = statement
	data.Expression = expression
	return newNode(KindDoStatement, data)
}

func (node *DoStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Statement) || visit(v, node.Expression)
}

// WhileStatement

type WhileStatement struct {
	StatementBase
	Expression *Expression // Expression
	Statement  *Statement  // Statement
}

func (f *NodeFactory) NewWhileStatement(expression *Expression, statement *Statement) *Node {
	data := &WhileStatement{}
	data.Expression = expression
	data.Statement = statement
	return newNode(KindWhileStatement, data)
}

func (node *WhileStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.Statement)
}

// ForStatement

type ForStatement struct {
	StatementBase
	LocalsContainerBase
	Initializer *ForInitializer // ForInitializer. Optional
	Condition   *Expression     // Expression. Optional
	Incrementor *Expression     // Expression. Optional
	Statement   *Statement      // Statement
}

func (f *NodeFactory) NewForStatement(initializer *ForInitializer, condition *Expression, incrementor *Expression, statement *Statement) *Node {
	data := &ForStatement{}
	data.Initializer = initializer
	data.Condition = condition
	data.Incrementor = incrementor
	data.Statement = statement
	return newNode(KindForStatement, data)
}

func (node *ForStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Initializer) || visit(v, node.Condition) || visit(v, node.Incrementor) || visit(v, node.Statement)
}

// ForInOrOfStatement

type ForInOrOfStatement struct {
	StatementBase
	LocalsContainerBase
	AwaitModifier *TokenNode      // TokenNode. Optional
	Initializer   *ForInitializer // ForInitializer
	Expression    *Expression     // Expression
	Statement     *Statement      // Statement
}

func (f *NodeFactory) NewForInOrOfStatement(kind Kind, awaitModifier *TokenNode, initializer *ForInitializer, expression *Expression, statement *Statement) *Node {
	data := &ForInOrOfStatement{}
	data.AwaitModifier = awaitModifier
	data.Initializer = initializer
	data.Expression = expression
	data.Statement = statement
	return newNode(kind, data)
}

func (node *ForInOrOfStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.AwaitModifier) || visit(v, node.Initializer) || visit(v, node.Expression) || visit(v, node.Statement)
}

func IsForInStatement(node *Node) bool {
	return node.Kind == KindForInStatement
}

func IsForOfStatement(node *Node) bool {
	return node.Kind == KindForOfStatement
}

func IsForInOrOfStatement(node *Node) bool {
	return IsForInStatement(node) || IsForOfStatement(node)
}

// BreakStatement

type BreakStatement struct {
	StatementBase
	Label *IdentifierNode // IdentifierNode. Optional
}

func (f *NodeFactory) NewBreakStatement(label *IdentifierNode) *Node {
	data := &BreakStatement{}
	data.Label = label
	return newNode(KindBreakStatement, data)
}

func (node *BreakStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Label)
}

// ContinueStatement

type ContinueStatement struct {
	StatementBase
	Label *IdentifierNode // IdentifierNode. Optional
}

func (f *NodeFactory) NewContinueStatement(label *IdentifierNode) *Node {
	data := &ContinueStatement{}
	data.Label = label
	return newNode(KindContinueStatement, data)
}

func (node *ContinueStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Label)
}

// ReturnStatement

type ReturnStatement struct {
	StatementBase
	Expression *Expression // Expression. Optional
}

func (f *NodeFactory) NewReturnStatement(expression *Expression) *Node {
	data := &ReturnStatement{}
	data.Expression = expression
	return newNode(KindReturnStatement, data)
}

func (node *ReturnStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

// WithStatement

type WithStatement struct {
	StatementBase
	Expression *Expression // Expression
	Statement  *Statement  // Statement
}

func (f *NodeFactory) NewWithStatement(expression *Expression, statement *Statement) *Node {
	data := &WithStatement{}
	data.Expression = expression
	data.Statement = statement
	return newNode(KindWithStatement, data)
}

func (node *WithStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.Statement)
}

// SwitchStatement

type SwitchStatement struct {
	StatementBase
	Expression *Expression    // Expression
	CaseBlock  *CaseBlockNode // CaseBlockNode
}

func (f *NodeFactory) NewSwitchStatement(expression *Expression, caseBlock *CaseBlockNode) *Node {
	data := &SwitchStatement{}
	data.Expression = expression
	data.CaseBlock = caseBlock
	return newNode(KindSwitchStatement, data)
}

func (node *SwitchStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.CaseBlock)
}

// CaseBlock

type CaseBlock struct {
	NodeBase
	LocalsContainerBase
	Clauses *NodeList // NodeList[*CaseOrDefaultClauseNode]
}

func (f *NodeFactory) NewCaseBlock(clauses *NodeList) *Node {
	data := &CaseBlock{}
	data.Clauses = clauses
	return newNode(KindCaseBlock, data)
}

func (node *CaseBlock) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Clauses)
}

// CaseOrDefaultClause

type CaseOrDefaultClause struct {
	NodeBase
	Expression          *Expression // Expression. nil in default clause
	Statements          *NodeList   // NodeList[*Statement]
	FallthroughFlowNode *FlowNode
}

func (f *NodeFactory) NewCaseOrDefaultClause(kind Kind, expression *Expression, statements *NodeList) *Node {
	data := &CaseOrDefaultClause{}
	data.Expression = expression
	data.Statements = statements
	return newNode(kind, data)
}

func (node *CaseOrDefaultClause) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visitNodeList(v, node.Statements)
}

// ThrowStatement

type ThrowStatement struct {
	StatementBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewThrowStatement(expression *Expression) *Node {
	data := &ThrowStatement{}
	data.Expression = expression
	return newNode(KindThrowStatement, data)
}

func (node *ThrowStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

// TryStatement

type TryStatement struct {
	StatementBase
	TryBlock     *BlockNode       // BlockNode
	CatchClause  *CatchClauseNode // CatchClauseNode. Optional
	FinallyBlock *BlockNode       // BlockNode. Optional
}

func (f *NodeFactory) NewTryStatement(tryBlock *BlockNode, catchClause *CatchClauseNode, finallyBlock *BlockNode) *Node {
	data := &TryStatement{}
	data.TryBlock = tryBlock
	data.CatchClause = catchClause
	data.FinallyBlock = finallyBlock
	return newNode(KindTryStatement, data)
}

func (node *TryStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.TryBlock) || visit(v, node.CatchClause) || visit(v, node.FinallyBlock)
}

// CatchClause

type CatchClause struct {
	NodeBase
	LocalsContainerBase
	VariableDeclaration *VariableDeclarationNode // VariableDeclarationNode. Optional
	Block               *BlockNode               // BlockNode
}

func (f *NodeFactory) NewCatchClause(variableDeclaration *VariableDeclarationNode, block *BlockNode) *Node {
	data := &CatchClause{}
	data.VariableDeclaration = variableDeclaration
	data.Block = block
	return newNode(KindCatchClause, data)
}

func (node *CatchClause) ForEachChild(v Visitor) bool {
	return visit(v, node.VariableDeclaration) || visit(v, node.Block)
}

func IsCatchClause(node *Node) bool {
	return node.Kind == KindCatchClause
}

// DebuggerStatement

type DebuggerStatement struct {
	StatementBase
}

func (f *NodeFactory) NewDebuggerStatement() *Node {
	return newNode(KindDebuggerStatement, &DebuggerStatement{})
}

// LabeledStatement

type LabeledStatement struct {
	StatementBase
	Label     *IdentifierNode // IdentifierNode
	Statement *Statement      // Statement
}

func (f *NodeFactory) NewLabeledStatement(label *IdentifierNode, statement *Statement) *Node {
	data := &LabeledStatement{}
	data.Label = label
	data.Statement = statement
	return newNode(KindLabeledStatement, data)
}

func (node *LabeledStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Label) || visit(v, node.Statement)
}

// ExpressionStatement

type ExpressionStatement struct {
	StatementBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewExpressionStatement(expression *Expression) *Node {
	data := &ExpressionStatement{}
	data.Expression = expression
	return newNode(KindExpressionStatement, data)
}

func (node *ExpressionStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func IsExpressionStatement(node *Node) bool {
	return node.Kind == KindExpressionStatement
}

// Block

type Block struct {
	StatementBase
	LocalsContainerBase
	Statements *NodeList // NodeList[*Statement]
	Multiline  bool
}

func (f *NodeFactory) NewBlock(statements *NodeList, multiline bool) *Node {
	data := &Block{}
	data.Statements = statements
	data.Multiline = multiline
	return newNode(KindBlock, data)
}

func (node *Block) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Statements)
}

func IsBlock(node *Node) bool {
	return node.Kind == KindBlock
}

// VariableStatement

type VariableStatement struct {
	StatementBase
	ModifiersBase
	DeclarationList *VariableDeclarationListNode // VariableDeclarationListNode
}

func (f *NodeFactory) NewVariableStatement(modifiers *ModifierList, declarationList *VariableDeclarationListNode) *Node {
	data := &VariableStatement{}
	data.modifiers = modifiers
	data.DeclarationList = declarationList
	return newNode(KindVariableStatement, data)
}

func (node *VariableStatement) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.DeclarationList)
}

func IsVariableStatement(node *Node) bool {
	return node.Kind == KindVariableStatement
}

// VariableDeclaration

type VariableDeclaration struct {
	NodeBase
	DeclarationBase
	ExportableBase
	name             *BindingName // BindingName
	ExclamationToken *TokenNode   // TokenNode. Optional
	Type             *TypeNode    // TypeNode. Optional
	Initializer      *Expression  // Expression. Optional
}

func (f *NodeFactory) NewVariableDeclaration(name *BindingName, exclamationToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	data := &VariableDeclaration{}
	data.name = name
	data.ExclamationToken = exclamationToken
	data.Type = typeNode
	data.Initializer = initializer
	return newNode(KindVariableDeclaration, data)
}

func (node *VariableDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.ExclamationToken) || visit(v, node.Type) || visit(v, node.Initializer)
}

func (node *VariableDeclaration) Name() *DeclarationName {
	return node.name
}

func IsVariableDeclaration(node *Node) bool {
	return node.Kind == KindVariableDeclaration
}

// VariableDeclarationList

type VariableDeclarationList struct {
	NodeBase
	Declarations *NodeList // NodeList[*VariableDeclarationNode]
}

func (f *NodeFactory) NewVariableDeclarationList(flags NodeFlags, declarations *NodeList) *Node {
	data := &VariableDeclarationList{}
	data.Declarations = declarations
	node := newNode(KindVariableDeclarationList, data)
	node.Flags = flags
	return node
}

func (node *VariableDeclarationList) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Declarations)
}

func IsVariableDeclarationList(node *Node) bool {
	return node.Kind == KindVariableDeclarationList
}

// BindingPattern (SyntaxBindObjectBindingPattern | KindArrayBindingPattern)

type BindingPattern struct {
	NodeBase
	Elements *NodeList // NodeList[*BindingElementNode]
}

func (f *NodeFactory) NewBindingPattern(kind Kind, elements *NodeList) *Node {
	data := &BindingPattern{}
	data.Elements = elements
	return newNode(kind, data)
}

func (node *BindingPattern) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Elements)
}

func IsObjectBindingPattern(node *Node) bool {
	return node.Kind == KindObjectBindingPattern
}

func IsArrayBindingPattern(node *Node) bool {
	return node.Kind == KindArrayBindingPattern
}

func IsBindingPattern(node *Node) bool {
	return node.Kind == KindArrayBindingPattern || node.Kind == KindObjectBindingPattern
}

// ParameterDeclaration

type ParameterDeclaration struct {
	NodeBase
	DeclarationBase
	ModifiersBase
	DotDotDotToken *TokenNode   // TokenNode. Present on rest parameter
	name           *BindingName // BindingName. Declared parameter name
	QuestionToken  *TokenNode   // TokenNode. Present on optional parameter
	Type           *TypeNode    // TypeNode. Optional
	Initializer    *Expression  // Expression. Optional
}

func (f *NodeFactory) NewParameterDeclaration(modifiers *ModifierList, dotDotDotToken *TokenNode, name *BindingName, questionToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	data := &ParameterDeclaration{}
	data.modifiers = modifiers
	data.DotDotDotToken = dotDotDotToken
	data.name = name
	data.QuestionToken = questionToken
	data.Type = typeNode
	data.Initializer = initializer
	return newNode(KindParameter, data)
}

func (node *ParameterDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.DotDotDotToken) || visit(v, node.name) ||
		visit(v, node.QuestionToken) || visit(v, node.Type) || visit(v, node.Initializer)
}

func (node *ParameterDeclaration) Name() *DeclarationName {
	return node.name
}

func IsParameter(node *Node) bool {
	return node.Kind == KindParameter
}

// BindingElement

type BindingElement struct {
	NodeBase
	DeclarationBase
	ExportableBase
	FlowNodeBase
	DotDotDotToken *TokenNode    // TokenNode. Present on rest element (in object binding pattern)
	PropertyName   *PropertyName // PropertyName. Optional binding property name in object binding pattern
	name           *BindingName  // BindingName. Optional (nil for missing element)
	Initializer    *Expression   // Expression. Optional
}

func (f *NodeFactory) NewBindingElement(dotDotDotToken *TokenNode, propertyName *PropertyName, name *BindingName, initializer *Expression) *Node {
	data := &BindingElement{}
	data.DotDotDotToken = dotDotDotToken
	data.PropertyName = propertyName
	data.name = name
	data.Initializer = initializer
	return newNode(KindBindingElement, data)
}

func (node *BindingElement) ForEachChild(v Visitor) bool {
	return visit(v, node.DotDotDotToken) || visit(v, node.PropertyName) || visit(v, node.name) || visit(v, node.Initializer)
}

func (node *BindingElement) Name() *DeclarationName {
	return node.name
}

func IsBindingElement(node *Node) bool {
	return node.Kind == KindBindingElement
}

// MissingDeclaration

type MissingDeclaration struct {
	StatementBase
	DeclarationBase
	ModifiersBase
}

func (f *NodeFactory) NewMissingDeclaration(modifiers *ModifierList) *Node {
	data := &MissingDeclaration{}
	data.modifiers = modifiers
	return newNode(KindMissingDeclaration, data)
}

func (node *MissingDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers)
}

// FunctionDeclaration

type FunctionDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	FunctionLikeWithBodyBase
	name           *IdentifierNode // IdentifierNode
	ReturnFlowNode *FlowNode
}

func (f *NodeFactory) NewFunctionDeclaration(modifiers *ModifierList, asteriskToken *TokenNode, name *IdentifierNode, typeParameters *NodeList, parameters *NodeList, returnType *TypeNode, body *BlockNode) *Node {
	data := &FunctionDeclaration{}
	data.modifiers = modifiers
	data.AsteriskToken = asteriskToken
	data.name = name
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	data.Body = body
	return newNode(KindFunctionDeclaration, data)
}

func (node *FunctionDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.AsteriskToken) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.Parameters) || visit(v, node.Type) || visit(v, node.Body)
}

func (node *FunctionDeclaration) Name() *DeclarationName {
	return node.name
}

func (node *FunctionDeclaration) BodyData() *BodyBase { return &node.BodyBase }

func IsFunctionDeclaration(node *Node) bool {
	return node.Kind == KindFunctionDeclaration
}

// ClassLikeDeclarationBase

type ClassLikeBase struct {
	DeclarationBase
	ExportableBase
	ModifiersBase
	name            *IdentifierNode // IdentifierNode
	TypeParameters  *NodeList       // NodeList[*TypeParameterDeclarationNode]. Optional
	HeritageClauses *NodeList       // NodeList[*HeritageClauseNode]. Optional
	Members         *NodeList       // NodeList[*ClassElement]
}

func (node *ClassLikeBase) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.HeritageClauses) || visitNodeList(v, node.Members)
}

func (node *ClassLikeBase) Name() *DeclarationName        { return node.name }
func (node *ClassLikeBase) ClassLikeData() *ClassLikeBase { return node }

// ClassDeclaration

type ClassDeclaration struct {
	StatementBase
	ClassLikeBase
}

func (f *NodeFactory) NewClassDeclaration(modifiers *ModifierList, name *IdentifierNode, typeParameters *NodeList, heritageClauses *NodeList, members *NodeList) *Node {
	data := &ClassDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.TypeParameters = typeParameters
	data.HeritageClauses = heritageClauses
	data.Members = members
	return newNode(KindClassDeclaration, data)
}

func IsClassDeclaration(node *Node) bool {
	return node.Kind == KindClassDeclaration
}

// ClassExpression

type ClassExpression struct {
	ExpressionBase
	ClassLikeBase
}

func (f *NodeFactory) NewClassExpression(modifiers *ModifierList, name *IdentifierNode, typeParameters *NodeList, heritageClauses *NodeList, members *NodeList) *Node {
	data := &ClassExpression{}
	data.modifiers = modifiers
	data.name = name
	data.TypeParameters = typeParameters
	data.HeritageClauses = heritageClauses
	data.Members = members
	return newNode(KindClassExpression, data)
}

func IsClassExpression(node *Node) bool {
	return node.Kind == KindClassExpression
}

// HeritageClause

type HeritageClause struct {
	NodeBase
	Token Kind
	Types *NodeList // NodeList[*ExpressionWithTypeArgumentsNode]
}

func (f *NodeFactory) NewHeritageClause(token Kind, types *NodeList) *Node {
	data := &HeritageClause{}
	data.Token = token
	data.Types = types
	return newNode(KindHeritageClause, data)
}

func (node *HeritageClause) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Types)
}

func IsHeritageClause(node *Node) bool {
	return node.Kind == KindHeritageClause
}

// InterfaceDeclaration

type InterfaceDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	name            *IdentifierNode
	TypeParameters  *NodeList // NodeList[*TypeParameterDeclarationNode]. Optional
	HeritageClauses *NodeList // NodeList[*HeritageClauseNode]. Optional
	Members         *NodeList // NodeList[*TypeElement]
}

func (f *NodeFactory) NewInterfaceDeclaration(modifiers *ModifierList, name *IdentifierNode, typeParameters *NodeList, heritageClauses *NodeList, members *NodeList) *Node {
	data := &InterfaceDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.TypeParameters = typeParameters
	data.HeritageClauses = heritageClauses
	data.Members = members
	return newNode(KindInterfaceDeclaration, data)
}

func (node *InterfaceDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.HeritageClauses) || visitNodeList(v, node.Members)
}

func (node *InterfaceDeclaration) Name() *DeclarationName { return node.name }

func IsInterfaceDeclaration(node *Node) bool {
	return node.Kind == KindInterfaceDeclaration
}

// TypeAliasDeclaration

type TypeAliasDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	LocalsContainerBase
	name           *IdentifierNode // IdentifierNode
	TypeParameters *NodeList       // NodeList[*TypeParameterDeclarationNode]. Optional
	Type           *TypeNode       // TypeNode
}

func (f *NodeFactory) NewTypeAliasDeclaration(modifiers *ModifierList, name *IdentifierNode, typeParameters *NodeList, typeNode *TypeNode) *Node {
	data := &TypeAliasDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.TypeParameters = typeParameters
	data.Type = typeNode
	return newNode(KindTypeAliasDeclaration, data)
}

func (node *TypeAliasDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) || visit(v, node.Type)
}

func (node *TypeAliasDeclaration) Name() *DeclarationName { return node.name }

func IsTypeAliasDeclaration(node *Node) bool {
	return node.Kind == KindTypeAliasDeclaration
}

// EnumMember

type EnumMember struct {
	NodeBase
	NamedMemberBase
	Initializer *Expression // Expression. Optional
}

func (f *NodeFactory) NewEnumMember(name *PropertyName, initializer *Expression) *Node {
	data := &EnumMember{}
	data.name = name
	data.Initializer = initializer
	return newNode(KindEnumMember, data)
}

func (node *EnumMember) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.Initializer)
}

func (node *EnumMember) Name() *DeclarationName {
	return node.name
}

func IsEnumMember(node *Node) bool {
	return node.Kind == KindEnumMember
}

// EnumDeclaration

type EnumDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	name    *IdentifierNode // IdentifierNode
	Members *NodeList       // NodeList[*EnumMemberNode]
}

func (f *NodeFactory) NewEnumDeclaration(modifiers *ModifierList, name *IdentifierNode, members *NodeList) *Node {
	data := &EnumDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.Members = members
	return newNode(KindEnumDeclaration, data)
}

func (node *EnumDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visitNodeList(v, node.Members)
}

func (node *EnumDeclaration) Name() *DeclarationName {
	return node.name
}

func IsEnumDeclaration(node *Node) bool {
	return node.Kind == KindEnumDeclaration
}

// ModuleBlock

type ModuleBlock struct {
	StatementBase
	Statements *NodeList // NodeList[*Statement]
}

func (f *NodeFactory) NewModuleBlock(statements *NodeList) *Node {
	data := &ModuleBlock{}
	data.Statements = statements
	return newNode(KindModuleBlock, data)
}

func (node *ModuleBlock) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Statements)
}

func IsModuleBlock(node *Node) bool {
	return node.Kind == KindModuleBlock
}

// ModuleDeclaration

type ModuleDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	LocalsContainerBase
	name *ModuleName // ModuleName
	Body *ModuleBody // ModuleBody. Optional (may be nil in ambient module declaration)
}

func (f *NodeFactory) NewModuleDeclaration(modifiers *ModifierList, name *ModuleName, body *ModuleBody, flags NodeFlags) *Node {
	data := &ModuleDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.Body = body
	node := newNode(KindModuleDeclaration, data)
	node.Flags |= flags & (NodeFlagsNamespace | NodeFlagsNestedNamespace | NodeFlagsGlobalAugmentation)
	return node
}

func (node *ModuleDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.Body)
}

func (node *ModuleDeclaration) Name() *DeclarationName {
	return node.name
}

func IsModuleDeclaration(node *Node) bool {
	return node.Kind == KindModuleDeclaration
}

// ModuleEqualsDeclaration

type ImportEqualsDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	IsTypeOnly bool
	name       *IdentifierNode // IdentifierNode
	// 'EntityName' for an internal module reference, 'ExternalModuleReference' for an external
	// module reference.
	ModuleReference *ModuleReference // ModuleReference
}

func (f *NodeFactory) NewImportEqualsDeclaration(modifiers *ModifierList, isTypeOnly bool, name *IdentifierNode, moduleReference *ModuleReference) *Node {
	data := &ImportEqualsDeclaration{}
	data.modifiers = modifiers
	data.IsTypeOnly = isTypeOnly
	data.name = name
	data.ModuleReference = moduleReference
	return newNode(KindImportEqualsDeclaration, data)
}

func (node *ImportEqualsDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.ModuleReference)
}

func (node *ImportEqualsDeclaration) Name() *DeclarationName {
	return node.name
}

func IsImportEqualsDeclaration(node *Node) bool {
	return node.Kind == KindImportEqualsDeclaration
}

// ImportDeclaration

type ImportDeclaration struct {
	StatementBase
	ModifiersBase
	ImportClause    *ImportClauseNode     // ImportClauseNode. Optional
	ModuleSpecifier *Expression           // Expression
	Attributes      *ImportAttributesNode // ImportAttributesNode. Optional
}

func (f *NodeFactory) NewImportDeclaration(modifiers *ModifierList, importClause *ImportClauseNode, moduleSpecifier *Expression, attributes *ImportAttributesNode) *Node {
	data := &ImportDeclaration{}
	data.modifiers = modifiers
	data.ImportClause = importClause
	data.ModuleSpecifier = moduleSpecifier
	data.Attributes = attributes
	return newNode(KindImportDeclaration, data)
}

func (node *ImportDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.ImportClause) || visit(v, node.ModuleSpecifier) || visit(v, node.Attributes)
}

func IsImportDeclaration(node *Node) bool {
	return node.Kind == KindImportDeclaration
}

// ImportSpecifier

type ImportSpecifier struct {
	NodeBase
	DeclarationBase
	ExportableBase
	IsTypeOnly   bool
	PropertyName *ModuleExportName // ModuleExportName. Optional
	name         *IdentifierNode   // IdentifierNode
}

func (f *NodeFactory) NewImportSpecifier(isTypeOnly bool, propertyName *ModuleExportName, name *IdentifierNode) *Node {
	data := &ImportSpecifier{}
	data.IsTypeOnly = isTypeOnly
	data.PropertyName = propertyName
	data.name = name
	return newNode(KindImportSpecifier, data)
}

func (node *ImportSpecifier) ForEachChild(v Visitor) bool {
	return visit(v, node.PropertyName) || visit(v, node.name)
}

func (node *ImportSpecifier) Name() *DeclarationName {
	return node.name
}

func IsImportSpecifier(node *Node) bool {
	return node.Kind == KindImportSpecifier
}

// ExternalModuleReference

type ExternalModuleReference struct {
	NodeBase
	Expression_ *Expression // Expression
}

func (f *NodeFactory) NewExternalModuleReference(expression *Expression) *Node {
	data := &ExternalModuleReference{}
	data.Expression_ = expression
	return newNode(KindExternalModuleReference, data)
}

func (node *ExternalModuleReference) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression_)
}

func IsExternalModuleReference(node *Node) bool {
	return node.Kind == KindExternalModuleReference
}

// ImportClause

type ImportClause struct {
	NodeBase
	DeclarationBase
	ExportableBase
	IsTypeOnly    bool
	NamedBindings *NamedImportBindings // NamedImportBindings. Optional, named bindings
	name          *IdentifierNode      // IdentifierNode. Optional, default binding
}

func (f *NodeFactory) NewImportClause(isTypeOnly bool, name *IdentifierNode, namedBindings *NamedImportBindings) *Node {
	data := &ImportClause{}
	data.IsTypeOnly = isTypeOnly
	data.name = name
	data.NamedBindings = namedBindings
	return newNode(KindImportClause, data)
}

func (node *ImportClause) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.NamedBindings)
}

func (node *ImportClause) Name() *DeclarationName {
	return node.name
}

// NamespaceImport

type NamespaceImport struct {
	NodeBase
	DeclarationBase
	ExportableBase
	name *IdentifierNode // IdentifierNode
}

func (f *NodeFactory) NewNamespaceImport(name *IdentifierNode) *Node {
	data := &NamespaceImport{}
	data.name = name
	return newNode(KindNamespaceImport, data)
}

func (node *NamespaceImport) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *NamespaceImport) Name() *DeclarationName {
	return node.name
}

func IsNamespaceImport(node *Node) bool {
	return node.Kind == KindNamespaceImport
}

// NamedImports

type NamedImports struct {
	NodeBase
	Elements *ImportSpecifierList // NodeList[*ImportSpecifierNode]
}

func (f *NodeFactory) NewNamedImports(elements *ImportSpecifierList) *Node {
	data := &NamedImports{}
	data.Elements = elements
	return newNode(KindNamedImports, data)
}

func (node *NamedImports) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Elements)
}

func IsNamedImports(node *Node) bool {
	return node.Kind == KindNamedImports
}

// ExportAssignment

// This is either an `export =` or an `export default` declaration.
// Unless `isExportEquals` is set, this node was parsed as an `export default`.
type ExportAssignment struct {
	StatementBase
	DeclarationBase
	ModifiersBase
	IsExportEquals bool
	Expression     *Expression // Expression
}

func (f *NodeFactory) NewExportAssignment(modifiers *ModifierList, isExportEquals bool, expression *Expression) *Node {
	data := &ExportAssignment{}
	data.modifiers = modifiers
	data.IsExportEquals = isExportEquals
	data.Expression = expression
	return newNode(KindExportAssignment, data)
}

func (node *ExportAssignment) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.Expression)
}

func IsExportAssignment(node *Node) bool {
	return node.Kind == KindExportAssignment
}

// NamespaceExportDeclaration

type NamespaceExportDeclaration struct {
	StatementBase
	DeclarationBase
	ModifiersBase
	name *IdentifierNode // IdentifierNode
}

func (f *NodeFactory) NewNamespaceExportDeclaration(modifiers *ModifierList, name *IdentifierNode) *Node {
	data := &NamespaceExportDeclaration{}
	data.modifiers = modifiers
	data.name = name
	return newNode(KindNamespaceExportDeclaration, data)
}

func (node *NamespaceExportDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name)
}

func (node *NamespaceExportDeclaration) Name() *DeclarationName {
	return node.name
}

func IsNamespaceExportDeclaration(node *Node) bool {
	return node.Kind == KindNamespaceExportDeclaration
}

// ExportDeclaration

type ExportDeclaration struct {
	StatementBase
	DeclarationBase
	ModifiersBase
	IsTypeOnly      bool
	ExportClause    *NamedExportBindings  // NamedExportBindings. Optional
	ModuleSpecifier *Expression           // Expression. Optional
	Attributes      *ImportAttributesNode // ImportAttributesNode. Optional
}

func (f *NodeFactory) NewExportDeclaration(modifiers *ModifierList, isTypeOnly bool, exportClause *NamedExportBindings, moduleSpecifier *Expression, attributes *ImportAttributesNode) *Node {
	data := &ExportDeclaration{}
	data.modifiers = modifiers
	data.IsTypeOnly = isTypeOnly
	data.ExportClause = exportClause
	data.ModuleSpecifier = moduleSpecifier
	data.Attributes = attributes
	return newNode(KindExportDeclaration, data)
}

func (node *ExportDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.ExportClause) || visit(v, node.ModuleSpecifier) || visit(v, node.Attributes)
}

func IsExportDeclaration(node *Node) bool {
	return node.Kind == KindExportDeclaration
}

// NamespaceExport

type NamespaceExport struct {
	NodeBase
	DeclarationBase
	name *ModuleExportName // ModuleExportName
}

func (f *NodeFactory) NewNamespaceExport(name *ModuleExportName) *Node {
	data := &NamespaceExport{}
	data.name = name
	return newNode(KindNamespaceExport, data)
}

func (node *NamespaceExport) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *NamespaceExport) Name() *DeclarationName {
	return node.name
}

func IsNamespaceExport(node *Node) bool {
	return node.Kind == KindNamespaceExport
}

// NamedExports

type NamedExports struct {
	NodeBase
	Elements *NodeList // NodeList[*ExportSpecifierNode]
}

func (f *NodeFactory) NewNamedExports(elements *NodeList) *Node {
	data := &NamedExports{}
	data.Elements = elements
	return newNode(KindNamedExports, data)
}

func (node *NamedExports) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Elements)
}

// ExportSpecifier

type ExportSpecifier struct {
	NodeBase
	DeclarationBase
	ExportableBase
	IsTypeOnly   bool
	PropertyName *ModuleExportName // ModuleExportName. Optional, name preceding 'as' keyword
	name         *ModuleExportName // ModuleExportName
}

func (f *NodeFactory) NewExportSpecifier(isTypeOnly bool, propertyName *ModuleExportName, name *ModuleExportName) *Node {
	data := &ExportSpecifier{}
	data.IsTypeOnly = isTypeOnly
	data.PropertyName = propertyName
	data.name = name
	return newNode(KindExportSpecifier, data)
}

func (node *ExportSpecifier) ForEachChild(v Visitor) bool {
	return visit(v, node.PropertyName) || visit(v, node.name)
}

func (node *ExportSpecifier) Name() *DeclarationName {
	return node.name
}

func IsExportSpecifier(node *Node) bool {
	return node.Kind == KindExportSpecifier
}

// TypeElementBase

type TypeElementBase struct{}

// ClassElementBase

type ClassElementBase struct{}

// NamedMemberBase

type NamedMemberBase struct {
	DeclarationBase
	ModifiersBase
	name         *PropertyName // PropertyName
	PostfixToken *TokenNode    // TokenNode. Optional
}

func (node *NamedMemberBase) DeclarationData() *DeclarationBase { return &node.DeclarationBase }
func (node *NamedMemberBase) Modifiers() *ModifierList          { return node.modifiers }
func (node *NamedMemberBase) Name() *DeclarationName            { return node.name }

// CallSignatureDeclaration

type CallSignatureDeclaration struct {
	NodeBase
	DeclarationBase
	FunctionLikeBase
	TypeElementBase
}

func (f *NodeFactory) NewCallSignatureDeclaration(typeParameters *NodeList, parameters *NodeList, returnType *TypeNode) *Node {
	data := &CallSignatureDeclaration{}
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	return newNode(KindCallSignature, data)
}

func (node *CallSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

func IsCallSignatureDeclaration(node *Node) bool {
	return node.Kind == KindCallSignature
}

// ConstructSignatureDeclaration

type ConstructSignatureDeclaration struct {
	NodeBase
	DeclarationBase
	FunctionLikeBase
	TypeElementBase
}

func (f *NodeFactory) NewConstructSignatureDeclaration(typeParameters *NodeList, parameters *NodeList, returnType *TypeNode) *Node {
	data := &ConstructSignatureDeclaration{}
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	return newNode(KindConstructSignature, data)
}

func (node *ConstructSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

func IsConstructSignatureDeclaration(node *Node) bool {
	return node.Kind == KindConstructSignature
}

// ConstructorDeclaration

type ConstructorDeclaration struct {
	NodeBase
	DeclarationBase
	ModifiersBase
	FunctionLikeWithBodyBase
	ClassElementBase
	ReturnFlowNode *FlowNode
}

func (f *NodeFactory) NewConstructorDeclaration(modifiers *ModifierList, typeParameters *NodeList, parameters *NodeList, returnType *TypeNode, body *BlockNode) *Node {
	data := &ConstructorDeclaration{}
	data.modifiers = modifiers
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	data.Body = body
	return newNode(KindConstructor, data)
}

func (node *ConstructorDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.Type) || visit(v, node.Body)
}

func IsConstructorDeclaration(node *Node) bool {
	return node.Kind == KindConstructor
}

// AccessorDeclarationBase

type AccessorDeclarationBase struct {
	NodeBase
	NamedMemberBase
	FunctionLikeWithBodyBase
	FlowNodeBase
	TypeElementBase
	ClassElementBase
	ObjectLiteralElementBase
}

func (node *AccessorDeclarationBase) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) ||
		visit(v, node.Type) || visit(v, node.Body)
}

func (node *AccessorDeclarationBase) IsAccessorDeclaration() {}

// GetAccessorDeclaration

type GetAccessorDeclaration struct {
	AccessorDeclarationBase
}

func (f *NodeFactory) NewGetAccessorDeclaration(modifiers *ModifierList, name *PropertyName, typeParameters *NodeList, parameters *NodeList, returnType *TypeNode, body *BlockNode) *Node {
	data := &GetAccessorDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	data.Body = body
	return newNode(KindGetAccessor, data)
}

func IsGetAccessorDeclaration(node *Node) bool {
	return node.Kind == KindGetAccessor
}

// SetAccessorDeclaration

type SetAccessorDeclaration struct {
	AccessorDeclarationBase
}

func (f *NodeFactory) NewSetAccessorDeclaration(modifiers *ModifierList, name *PropertyName, typeParameters *NodeList, parameters *NodeList, returnType *TypeNode, body *BlockNode) *Node {
	data := &SetAccessorDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	data.Body = body
	return newNode(KindSetAccessor, data)
}

func IsSetAccessorDeclaration(node *Node) bool {
	return node.Kind == KindSetAccessor
}

// IndexSignatureDeclaration

type IndexSignatureDeclaration struct {
	NodeBase
	DeclarationBase
	ModifiersBase
	FunctionLikeBase
	TypeElementBase
	ClassElementBase
}

func (f *NodeFactory) NewIndexSignatureDeclaration(modifiers *ModifierList, parameters *NodeList, returnType *TypeNode) *Node {
	data := &IndexSignatureDeclaration{}
	data.modifiers = modifiers
	data.Parameters = parameters
	data.Type = returnType
	return newNode(KindIndexSignature, data)
}

func (node *IndexSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

func IsIndexSignatureDeclaration(node *Node) bool {
	return node.Kind == KindIndexSignature
}

// MethodSignatureDeclaration

type MethodSignatureDeclaration struct {
	NodeBase
	NamedMemberBase
	FunctionLikeBase
	TypeElementBase
}

func (f *NodeFactory) NewMethodSignatureDeclaration(modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, typeParameters *NodeList, parameters *NodeList, returnType *TypeNode) *Node {
	data := &MethodSignatureDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.PostfixToken = postfixToken
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	return newNode(KindMethodSignature, data)
}

func (node *MethodSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

func IsMethodSignatureDeclaration(node *Node) bool {
	return node.Kind == KindMethodSignature
}

// MethodSignatureDeclaration

type MethodDeclaration struct {
	NodeBase
	NamedMemberBase
	FunctionLikeWithBodyBase
	FlowNodeBase
	ClassElementBase
	ObjectLiteralElementBase
}

func (f *NodeFactory) NewMethodDeclaration(modifiers *ModifierList, asteriskToken *TokenNode, name *PropertyName, postfixToken *TokenNode, typeParameters *NodeList, parameters *NodeList, returnType *TypeNode, body *BlockNode) *Node {
	data := &MethodDeclaration{}
	data.modifiers = modifiers
	data.AsteriskToken = asteriskToken
	data.name = name
	data.PostfixToken = postfixToken
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	data.Body = body
	return newNode(KindMethodDeclaration, data)
}

func (node *MethodDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.AsteriskToken) || visit(v, node.name) || visit(v, node.PostfixToken) ||
		visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.Type) || visit(v, node.Body)
}

func IsMethodDeclaration(node *Node) bool {
	return node.Kind == KindMethodDeclaration
}

// PropertySignatureDeclaration

type PropertySignatureDeclaration struct {
	NodeBase
	NamedMemberBase
	TypeElementBase
	Type        *TypeNode   // TypeNode
	Initializer *Expression // Expression. For error reporting purposes
}

func (f *NodeFactory) NewPropertySignatureDeclaration(modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	data := &PropertySignatureDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.PostfixToken = postfixToken
	data.Type = typeNode
	data.Initializer = initializer
	return newNode(KindPropertySignature, data)
}

func (node *PropertySignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visit(v, node.Type) || visit(v, node.Initializer)
}

func IsPropertySignatureDeclaration(node *Node) bool {
	return node.Kind == KindPropertySignature
}

// PropertyDeclaration

type PropertyDeclaration struct {
	NodeBase
	NamedMemberBase
	ClassElementBase
	Type        *TypeNode   // TypeNode. Optional
	Initializer *Expression // Expression. Optional
}

func (f *NodeFactory) NewPropertyDeclaration(modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	data := &PropertyDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.PostfixToken = postfixToken
	data.Type = typeNode
	data.Initializer = initializer
	return newNode(KindPropertyDeclaration, data)
}

func (node *PropertyDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visit(v, node.Type) || visit(v, node.Initializer)
}

func IsPropertyDeclaration(node *Node) bool {
	return node.Kind == KindPropertyDeclaration
}

// SemicolonClassElement

type SemicolonClassElement struct {
	NodeBase
	DeclarationBase
	ClassElementBase
}

func (f *NodeFactory) NewSemicolonClassElement() *Node {
	return newNode(KindSemicolonClassElement, &SemicolonClassElement{})
}

// ClassStaticBlockDeclaration

type ClassStaticBlockDeclaration struct {
	NodeBase
	DeclarationBase
	ModifiersBase
	LocalsContainerBase
	ClassElementBase
	Body           *BlockNode // BlockNode
	ReturnFlowNode *FlowNode
}

func (f *NodeFactory) NewClassStaticBlockDeclaration(modifiers *ModifierList, body *BlockNode) *Node {
	data := &ClassStaticBlockDeclaration{}
	data.modifiers = modifiers
	data.Body = body
	return newNode(KindClassStaticBlockDeclaration, data)
}

func (node *ClassStaticBlockDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.Body)
}

func IsClassStaticBlockDeclaration(node *Node) bool {
	return node.Kind == KindClassStaticBlockDeclaration
}

// ExpressionBase

type ExpressionBase struct {
	NodeBase
}

// OmittedExpression

type OmittedExpression struct {
	ExpressionBase
}

func (f *NodeFactory) NewOmittedExpression() *Node {
	return newNode(KindOmittedExpression, &OmittedExpression{})
}

func IsOmittedExpression(node *Node) bool {
	return node.Kind == KindOmittedExpression
}

// KeywordExpression

type KeywordExpression struct {
	ExpressionBase
	FlowNodeBase // For 'this' and 'super' expressions
}

func (f *NodeFactory) NewKeywordExpression(kind Kind) *Node {
	return newNode(kind, &KeywordExpression{})
}

// LiteralLikeBase

type LiteralLikeBase struct {
	Text       string
	TokenFlags TokenFlags
}

func (node *LiteralLikeBase) LiteralLikeData() *LiteralLikeBase { return node }

// StringLiteral

type StringLiteral struct {
	ExpressionBase
	LiteralLikeBase
}

func (f *NodeFactory) NewStringLiteral(text string) *Node {
	data := &StringLiteral{}
	data.Text = text
	return newNode(KindStringLiteral, data)
}

func IsStringLiteral(node *Node) bool {
	return node.Kind == KindStringLiteral
}

// NumericLiteral

type NumericLiteral struct {
	ExpressionBase
	LiteralLikeBase
}

func (f *NodeFactory) NewNumericLiteral(text string) *Node {
	data := &NumericLiteral{}
	data.Text = text
	return newNode(KindNumericLiteral, data)
}

func IsNumericLiteral(node *Node) bool {
	return node.Kind == KindNumericLiteral
}

// BigIntLiteral

type BigIntLiteral struct {
	ExpressionBase
	LiteralLikeBase
}

func (f *NodeFactory) NewBigIntLiteral(text string) *Node {
	data := &BigIntLiteral{}
	data.Text = text
	return newNode(KindBigIntLiteral, data)
}

func IsBigIntLiteral(node *Node) bool {
	return node.Kind == KindBigIntLiteral
}

// RegularExpressionLiteral

type RegularExpressionLiteral struct {
	ExpressionBase
	LiteralLikeBase
}

func (f *NodeFactory) NewRegularExpressionLiteral(text string) *Node {
	data := &RegularExpressionLiteral{}
	data.Text = text
	return newNode(KindRegularExpressionLiteral, data)
}

// NoSubstitutionTemplateLiteral

type NoSubstitutionTemplateLiteral struct {
	ExpressionBase
	TemplateLiteralLikeBase
}

func (f *NodeFactory) NewNoSubstitutionTemplateLiteral(text string) *Node {
	data := &NoSubstitutionTemplateLiteral{}
	data.Text = text
	return newNode(KindNoSubstitutionTemplateLiteral, data)
}

// BinaryExpression

type BinaryExpression struct {
	ExpressionBase
	DeclarationBase
	Left          *Expression // Expression
	OperatorToken *TokenNode  // TokenNode
	Right         *Expression // Expression
}

func (f *NodeFactory) NewBinaryExpression(left *Expression, operatorToken *TokenNode, right *Expression) *Node {
	data := &BinaryExpression{}
	data.Left = left
	data.OperatorToken = operatorToken
	data.Right = right
	return newNode(KindBinaryExpression, data)
}

func (node *BinaryExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Left) || visit(v, node.OperatorToken) || visit(v, node.Right)
}

func IsBinaryExpression(node *Node) bool {
	return node.Kind == KindBinaryExpression
}

// PrefixUnaryExpression

type PrefixUnaryExpression struct {
	ExpressionBase
	Operator Kind
	Operand  *Expression // Expression
}

func (f *NodeFactory) NewPrefixUnaryExpression(operator Kind, operand *Expression) *Node {
	data := &PrefixUnaryExpression{}
	data.Operator = operator
	data.Operand = operand
	return newNode(KindPrefixUnaryExpression, data)
}

func (node *PrefixUnaryExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Operand)
}

func IsPrefixUnaryExpression(node *Node) bool {
	return node.Kind == KindPrefixUnaryExpression
}

// PostfixUnaryExpression

type PostfixUnaryExpression struct {
	ExpressionBase
	Operand  *Expression // Expression
	Operator Kind
}

func (f *NodeFactory) NewPostfixUnaryExpression(operand *Expression, operator Kind) *Node {
	data := &PostfixUnaryExpression{}
	data.Operand = operand
	data.Operator = operator
	return newNode(KindPostfixUnaryExpression, data)
}

func (node *PostfixUnaryExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Operand)
}

// YieldExpression

type YieldExpression struct {
	ExpressionBase
	AsteriskToken *TokenNode  // TokenNode
	Expression    *Expression // Expression. Optional
}

func (f *NodeFactory) NewYieldExpression(asteriskToken *TokenNode, expression *Expression) *Node {
	data := &YieldExpression{}
	data.AsteriskToken = asteriskToken
	data.Expression = expression
	return newNode(KindYieldExpression, data)
}

func (node *YieldExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.AsteriskToken) || visit(v, node.Expression)
}

// ArrowFunction

type ArrowFunction struct {
	ExpressionBase
	DeclarationBase
	ModifiersBase
	FunctionLikeWithBodyBase
	FlowNodeBase
	EqualsGreaterThanToken *TokenNode // TokenNode
}

func (f *NodeFactory) NewArrowFunction(modifiers *ModifierList, typeParameters *NodeList, parameters *NodeList, returnType *TypeNode, equalsGreaterThanToken *TokenNode, body *BlockOrExpression) *Node {
	data := &ArrowFunction{}
	data.modifiers = modifiers
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	data.EqualsGreaterThanToken = equalsGreaterThanToken
	data.Body = body
	return newNode(KindArrowFunction, data)
}

func (node *ArrowFunction) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) ||
		visit(v, node.Type) || visit(v, node.EqualsGreaterThanToken) || visit(v, node.Body)
}

func (node *ArrowFunction) Name() *DeclarationName {
	return nil
}

func IsArrowFunction(node *Node) bool {
	return node.Kind == KindArrowFunction
}

// FunctionExpression

type FunctionExpression struct {
	ExpressionBase
	DeclarationBase
	ModifiersBase
	FunctionLikeWithBodyBase
	FlowNodeBase
	name           *IdentifierNode // IdentifierNode. Optional
	ReturnFlowNode *FlowNode
}

func (f *NodeFactory) NewFunctionExpression(modifiers *ModifierList, asteriskToken *TokenNode, name *IdentifierNode, typeParameters *NodeList, parameters *NodeList, returnType *TypeNode, body *BlockNode) *Node {
	data := &FunctionExpression{}
	data.modifiers = modifiers
	data.AsteriskToken = asteriskToken
	data.name = name
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	data.Body = body
	return newNode(KindFunctionExpression, data)
}

func (node *FunctionExpression) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.AsteriskToken) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.Parameters) || visit(v, node.Type) || visit(v, node.Body)
}

func (node *FunctionExpression) Name() *DeclarationName {
	return node.name
}

func IsFunctionExpression(node *Node) bool {
	return node.Kind == KindFunctionExpression
}

// AsExpression

type AsExpression struct {
	ExpressionBase
	Expression *Expression // Expression
	Type       *TypeNode   // TypeNode
}

func (f *NodeFactory) NewAsExpression(expression *Expression, typeNode *TypeNode) *Node {
	data := &AsExpression{}
	data.Expression = expression
	data.Type = typeNode
	return newNode(KindAsExpression, data)
}

func (node *AsExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.Type)
}

// SatisfiesExpression

type SatisfiesExpression struct {
	ExpressionBase
	Expression *Expression // Expression
	Type       *TypeNode   // TypeNode
}

func (f *NodeFactory) NewSatisfiesExpression(expression *Expression, typeNode *TypeNode) *Node {
	data := &SatisfiesExpression{}
	data.Expression = expression
	data.Type = typeNode
	return newNode(KindSatisfiesExpression, data)
}

func (node *SatisfiesExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.Type)
}

func IsSatisfiesExpression(node *Node) bool {
	return node.Kind == KindSatisfiesExpression
}

// ConditionalExpression

type ConditionalExpression struct {
	ExpressionBase
	Condition     *Expression
	QuestionToken *TokenNode
	WhenTrue      *Expression
	ColonToken    *TokenNode
	WhenFalse     *Expression
}

func (f *NodeFactory) NewConditionalExpression(condition *Expression, questionToken *TokenNode, whenTrue *Expression, colonToken *TokenNode, whenFalse *Expression) *Node {
	data := &ConditionalExpression{}
	data.Condition = condition
	data.QuestionToken = questionToken
	data.WhenTrue = whenTrue
	data.ColonToken = colonToken
	data.WhenFalse = whenFalse
	return newNode(KindConditionalExpression, data)
}

func (node *ConditionalExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Condition) || visit(v, node.QuestionToken) || visit(v, node.WhenTrue) ||
		visit(v, node.ColonToken) || visit(v, node.WhenFalse)
}

// PropertyAccessExpression

type PropertyAccessExpression struct {
	ExpressionBase
	FlowNodeBase
	Expression       *Expression // Expression
	QuestionDotToken *TokenNode  // TokenNode
	name             *MemberName // MemberName
}

func (f *NodeFactory) NewPropertyAccessExpression(expression *Expression, questionDotToken *TokenNode, name *MemberName, flags NodeFlags) *Node {
	data := &PropertyAccessExpression{}
	data.Expression = expression
	data.QuestionDotToken = questionDotToken
	data.name = name
	node := newNode(KindPropertyAccessExpression, data)
	node.Flags |= flags & NodeFlagsOptionalChain
	return node
}

func (node *PropertyAccessExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.QuestionDotToken) || visit(v, node.name)
}

func (node *PropertyAccessExpression) Name() *DeclarationName { return node.name }

func IsPropertyAccessExpression(node *Node) bool {
	return node.Kind == KindPropertyAccessExpression
}

// ElementAccessExpression

type ElementAccessExpression struct {
	ExpressionBase
	FlowNodeBase
	Expression         *Expression // Expression
	QuestionDotToken   *TokenNode  // TokenNode
	ArgumentExpression *Expression // Expression
}

func (f *NodeFactory) NewElementAccessExpression(expression *Expression, questionDotToken *TokenNode, argumentExpression *Expression, flags NodeFlags) *Node {
	data := &ElementAccessExpression{}
	data.Expression = expression
	data.QuestionDotToken = questionDotToken
	data.ArgumentExpression = argumentExpression
	node := newNode(KindElementAccessExpression, data)
	node.Flags |= flags & NodeFlagsOptionalChain
	return node
}

func (node *ElementAccessExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.QuestionDotToken) || visit(v, node.ArgumentExpression)
}

func IsElementAccessExpression(node *Node) bool {
	return node.Kind == KindElementAccessExpression
}

// CallExpression

type CallExpression struct {
	ExpressionBase
	Expression       *Expression // Expression
	QuestionDotToken *TokenNode  // TokenNode
	TypeArguments    *NodeList   // NodeList[*TypeNode]. Optional
	Arguments        *NodeList   // NodeList[*Expression]
}

func (f *NodeFactory) NewCallExpression(expression *Expression, questionDotToken *TokenNode, typeArguments *NodeList, arguments *NodeList, flags NodeFlags) *Node {
	data := &CallExpression{}
	data.Expression = expression
	data.QuestionDotToken = questionDotToken
	data.TypeArguments = typeArguments
	data.Arguments = arguments
	node := newNode(KindCallExpression, data)
	node.Flags |= flags & NodeFlagsOptionalChain
	return node
}

func (node *CallExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.QuestionDotToken) || visitNodeList(v, node.TypeArguments) || visitNodeList(v, node.Arguments)
}

func IsCallExpression(node *Node) bool {
	return node.Kind == KindCallExpression
}

// NewExpression

type NewExpression struct {
	ExpressionBase
	Expression    *Expression // Expression
	TypeArguments *NodeList   // NodeList[*TypeNode]. Optional
	Arguments     *NodeList   // NodeList[*Expression]. Optional
}

func (f *NodeFactory) NewNewExpression(expression *Expression, typeArguments *NodeList, arguments *NodeList) *Node {
	data := &NewExpression{}
	data.Expression = expression
	data.TypeArguments = typeArguments
	data.Arguments = arguments
	return newNode(KindNewExpression, data)
}

func (node *NewExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visitNodeList(v, node.TypeArguments) || visitNodeList(v, node.Arguments)
}

func IsNewExpression(node *Node) bool {
	return node.Kind == KindNewExpression
}

// MetaProperty

type MetaProperty struct {
	ExpressionBase
	FlowNodeBase
	KeywordToken Kind            // NewKeyword | ImportKeyword
	name         *IdentifierNode // IdentifierNode
}

func (f *NodeFactory) NewMetaProperty(keywordToken Kind, name *IdentifierNode) *Node {
	data := &MetaProperty{}
	data.KeywordToken = keywordToken
	data.name = name
	return newNode(KindMetaProperty, data)
}

func (node *MetaProperty) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *MetaProperty) Name() *DeclarationName {
	return node.name
}

func IsMetaProperty(node *Node) bool {
	return node.Kind == KindMetaProperty
}

// NonNullExpression

type NonNullExpression struct {
	ExpressionBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewNonNullExpression(expression *Expression) *Node {
	data := &NonNullExpression{}
	data.Expression = expression
	return newNode(KindNonNullExpression, data)
}

func (node *NonNullExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func IsNonNullExpression(node *Node) bool {
	return node.Kind == KindNonNullExpression
}

// SpreadElement

type SpreadElement struct {
	ExpressionBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewSpreadElement(expression *Expression) *Node {
	data := &SpreadElement{}
	data.Expression = expression
	return newNode(KindSpreadElement, data)
}

func (node *SpreadElement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func IsSpreadElement(node *Node) bool {
	return node.Kind == KindSpreadElement
}

// TemplateExpression

type TemplateExpression struct {
	ExpressionBase
	Head          *TemplateHeadNode // TemplateHeadNode
	TemplateSpans *NodeList         // NodeList[*TemplateSpanNode]
}

func (f *NodeFactory) NewTemplateExpression(head *TemplateHeadNode, templateSpans *NodeList) *Node {
	data := &TemplateExpression{}
	data.Head = head
	data.TemplateSpans = templateSpans
	return newNode(KindTemplateExpression, data)
}

func (node *TemplateExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Head) || visitNodeList(v, node.TemplateSpans)
}

func IsTemplateExpression(node *Node) bool {
	return node.Kind == KindTemplateExpression
}

// TemplateLiteralTypeSpan

type TemplateSpan struct {
	NodeBase
	Expression *Expression           // Expression
	Literal    *TemplateMiddleOrTail // TemplateMiddleOrTail
}

func (f *NodeFactory) NewTemplateSpan(expression *Expression, literal *TemplateMiddleOrTail) *Node {
	data := &TemplateSpan{}
	data.Expression = expression
	data.Literal = literal
	return newNode(KindTemplateSpan, data)
}

func (node *TemplateSpan) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.Literal)
}

func IsTemplateSpan(node *Node) bool {
	return node.Kind == KindTemplateSpan
}

// TaggedTemplateExpression

type TaggedTemplateExpression struct {
	ExpressionBase
	Tag              *Expression      // Expression
	QuestionDotToken *TokenNode       // TokenNode. For error reporting purposes only
	TypeArguments    *NodeList        // NodeList[*TypeNode]. Optional
	Template         *TemplateLiteral // TemplateLiteral
}

func (f *NodeFactory) NewTaggedTemplateExpression(tag *Expression, questionDotToken *TokenNode, typeArguments *NodeList, template *TemplateLiteral, flags NodeFlags) *Node {
	data := &TaggedTemplateExpression{}
	data.Tag = tag
	data.QuestionDotToken = questionDotToken
	data.TypeArguments = typeArguments
	data.Template = template
	node := newNode(KindTaggedTemplateExpression, data)
	node.Flags |= flags & NodeFlagsOptionalChain
	return node
}

func (node *TaggedTemplateExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Tag) || visit(v, node.QuestionDotToken) || visitNodeList(v, node.TypeArguments) || visit(v, node.Template)
}

func IsTaggedTemplateExpression(node *Node) bool {
	return node.Kind == KindTaggedTemplateExpression
}

// ParenthesizedExpression

type ParenthesizedExpression struct {
	ExpressionBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewParenthesizedExpression(expression *Expression) *Node {
	data := &ParenthesizedExpression{}
	data.Expression = expression
	return newNode(KindParenthesizedExpression, data)
}

func (node *ParenthesizedExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func IsParenthesizedExpression(node *Node) bool {
	return node.Kind == KindParenthesizedExpression
}

// ArrayLiteralExpression

type ArrayLiteralExpression struct {
	ExpressionBase
	Elements  *NodeList // NodeList[*Expression]
	MultiLine bool
}

func (f *NodeFactory) NewArrayLiteralExpression(elements *NodeList, multiLine bool) *Node {
	data := &ArrayLiteralExpression{}
	data.Elements = elements
	data.MultiLine = multiLine
	return newNode(KindArrayLiteralExpression, data)
}

func (node *ArrayLiteralExpression) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Elements)
}

func IsArrayLiteralExpression(node *Node) bool {
	return node.Kind == KindArrayLiteralExpression
}

// ObjectLiteralExpression

type ObjectLiteralExpression struct {
	ExpressionBase
	DeclarationBase
	Properties *NodeList // NodeList[*ObjectLiteralElement]
	MultiLine  bool
}

func (f *NodeFactory) NewObjectLiteralExpression(properties *NodeList, multiLine bool) *Node {
	data := &ObjectLiteralExpression{}
	data.Properties = properties
	data.MultiLine = multiLine
	return newNode(KindObjectLiteralExpression, data)
}

func (node *ObjectLiteralExpression) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Properties)
}

func IsObjectLiteralExpression(node *Node) bool {
	return node.Kind == KindObjectLiteralExpression
}

// ObjectLiteralElementBase

type ObjectLiteralElementBase struct{}

// SpreadAssignment

type SpreadAssignment struct {
	NodeBase
	DeclarationBase
	ObjectLiteralElementBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewSpreadAssignment(expression *Expression) *Node {
	data := &SpreadAssignment{}
	data.Expression = expression
	return newNode(KindSpreadAssignment, data)
}

func (node *SpreadAssignment) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func IsSpreadAssignment(node *Node) bool {
	return node.Kind == KindSpreadAssignment
}

// PropertyAssignment

type PropertyAssignment struct {
	NodeBase
	NamedMemberBase
	ObjectLiteralElementBase
	Initializer *Expression // Expression
}

func (f *NodeFactory) NewPropertyAssignment(modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, initializer *Expression) *Node {
	data := &PropertyAssignment{}
	data.modifiers = modifiers
	data.name = name
	data.PostfixToken = postfixToken
	data.Initializer = initializer
	return newNode(KindPropertyAssignment, data)
}

func (node *PropertyAssignment) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visit(v, node.Initializer)
}

func IsPropertyAssignment(node *Node) bool {
	return node.Kind == KindPropertyAssignment
}

// ShorthandPropertyAssignment

type ShorthandPropertyAssignment struct {
	NodeBase
	NamedMemberBase
	ObjectLiteralElementBase
	ObjectAssignmentInitializer *Expression // Optional
}

func (f *NodeFactory) NewShorthandPropertyAssignment(modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, objectAssignmentInitializer *Expression) *Node {
	data := &ShorthandPropertyAssignment{}
	data.modifiers = modifiers
	data.name = name
	data.PostfixToken = postfixToken
	data.ObjectAssignmentInitializer = objectAssignmentInitializer
	return newNode(KindShorthandPropertyAssignment, data)
}

func (node *ShorthandPropertyAssignment) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visit(v, node.ObjectAssignmentInitializer)
}

func IsShorthandPropertyAssignment(node *Node) bool {
	return node.Kind == KindShorthandPropertyAssignment
}

// DeleteExpression

type DeleteExpression struct {
	ExpressionBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewDeleteExpression(expression *Expression) *Node {
	data := &DeleteExpression{}
	data.Expression = expression
	return newNode(KindDeleteExpression, data)
}

func (node *DeleteExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

// TypeOfExpression

type TypeOfExpression struct {
	ExpressionBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewTypeOfExpression(expression *Expression) *Node {
	data := &TypeOfExpression{}
	data.Expression = expression
	return newNode(KindTypeOfExpression, data)
}

func (node *TypeOfExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func IsTypeOfExpression(node *Node) bool {
	return node.Kind == KindTypeOfExpression
}

// VoidExpression

type VoidExpression struct {
	ExpressionBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewVoidExpression(expression *Expression) *Node {
	data := &VoidExpression{}
	data.Expression = expression
	return newNode(KindVoidExpression, data)
}

func (node *VoidExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

// AwaitExpression

type AwaitExpression struct {
	ExpressionBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewAwaitExpression(expression *Expression) *Node {
	data := &AwaitExpression{}
	data.Expression = expression
	return newNode(KindAwaitExpression, data)
}

func (node *AwaitExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func IsAwaitExpression(node *Node) bool {
	return node.Kind == KindAwaitExpression
}

// TypeAssertion

type TypeAssertion struct {
	ExpressionBase
	Type       *TypeNode   // TypeNode
	Expression *Expression // Expression
}

func (f *NodeFactory) NewTypeAssertion(typeNode *TypeNode, expression *Expression) *Node {
	data := &TypeAssertion{}
	data.Type = typeNode
	data.Expression = expression
	return newNode(KindTypeAssertionExpression, data)
}

func (node *TypeAssertion) ForEachChild(v Visitor) bool {
	return visit(v, node.Type) || visit(v, node.Expression)
}

// TypeNodeBase

type TypeNodeBase struct {
	NodeBase
}

// KeywordTypeNode

type KeywordTypeNode struct {
	TypeNodeBase
}

func (f *NodeFactory) NewKeywordTypeNode(kind Kind) *Node {
	return newNode(kind, &KeywordTypeNode{})
}

// UnionOrIntersectionTypeBase

type UnionOrIntersectionTypeNodeBase struct {
	TypeNodeBase
	Types *NodeList // NodeList[*TypeNode]
}

func (node *UnionOrIntersectionTypeNodeBase) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Types)
}

// UnionTypeNode

type UnionTypeNode struct {
	UnionOrIntersectionTypeNodeBase
}

func (f *NodeFactory) NewUnionTypeNode(types *NodeList) *Node {
	data := &UnionTypeNode{}
	data.Types = types
	return newNode(KindUnionType, data)
}

// IntersectionTypeNode

type IntersectionTypeNode struct {
	UnionOrIntersectionTypeNodeBase
}

func (f *NodeFactory) NewIntersectionTypeNode(types *NodeList) *Node {
	data := &IntersectionTypeNode{}
	data.Types = types
	return newNode(KindIntersectionType, data)
}

// ConditionalTypeNode

type ConditionalTypeNode struct {
	TypeNodeBase
	LocalsContainerBase
	CheckType   *TypeNode // TypeNode
	ExtendsType *TypeNode // TypeNode
	TrueType    *TypeNode // TypeNode
	FalseType   *TypeNode // TypeNode
}

func (f *NodeFactory) NewConditionalTypeNode(checkType *TypeNode, extendsType *TypeNode, trueType *TypeNode, falseType *TypeNode) *Node {
	data := &ConditionalTypeNode{}
	data.CheckType = checkType
	data.ExtendsType = extendsType
	data.TrueType = trueType
	data.FalseType = falseType
	return newNode(KindConditionalType, data)
}

func (node *ConditionalTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.CheckType) || visit(v, node.ExtendsType) || visit(v, node.TrueType) || visit(v, node.FalseType)
}

func IsConditionalTypeNode(node *Node) bool {
	return node.Kind == KindConditionalType
}

// TypeOperatorNode

type TypeOperatorNode struct {
	TypeNodeBase
	Operator Kind      // KindKeyOfKeyword | KindUniqueKeyword | KindReadonlyKeyword
	Type     *TypeNode // TypeNode
}

func (f *NodeFactory) NewTypeOperatorNode(operator Kind, typeNode *TypeNode) *Node {
	data := &TypeOperatorNode{}
	data.Operator = operator
	data.Type = typeNode
	return newNode(KindTypeOperator, data)
}

func (node *TypeOperatorNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func IsTypeOperatorNode(node *Node) bool {
	return node.Kind == KindTypeOperator
}

// InferTypeNode

type InferTypeNode struct {
	TypeNodeBase
	TypeParameter *TypeParameterDeclarationNode // TypeParameterDeclarationNode
}

func (f *NodeFactory) NewInferTypeNode(typeParameter *TypeParameterDeclarationNode) *Node {
	data := &InferTypeNode{}
	data.TypeParameter = typeParameter
	return newNode(KindInferType, data)
}

func (node *InferTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeParameter)
}

func IsInferTypeNode(node *Node) bool {
	return node.Kind == KindInferType
}

// ArrayTypeNode

type ArrayTypeNode struct {
	TypeNodeBase
	ElementType *TypeNode // TypeNode
}

func (f *NodeFactory) NewArrayTypeNode(elementType *TypeNode) *Node {
	data := &ArrayTypeNode{}
	data.ElementType = elementType
	return newNode(KindArrayType, data)
}

func (node *ArrayTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.ElementType)
}

// IndexedAccessTypeNode

type IndexedAccessTypeNode struct {
	TypeNodeBase
	ObjectType *TypeNode // TypeNode
	IndexType  *TypeNode // TypeNode
}

func (f *NodeFactory) NewIndexedAccessTypeNode(objectType *TypeNode, indexType *TypeNode) *Node {
	data := &IndexedAccessTypeNode{}
	data.ObjectType = objectType
	data.IndexType = indexType
	return newNode(KindIndexedAccessType, data)
}

func (node *IndexedAccessTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.ObjectType) || visit(v, node.IndexType)
}

func IsIndexedAccessTypeNode(node *Node) bool {
	return node.Kind == KindIndexedAccessType
}

// TypeReferenceNode

type TypeReferenceNode struct {
	TypeNodeBase
	TypeName      *EntityName // EntityName
	TypeArguments *NodeList   // NodeList[*TypeNode]. Optional
}

func (f *NodeFactory) NewTypeReferenceNode(typeName *EntityName, typeArguments *NodeList) *Node {
	data := &TypeReferenceNode{}
	data.TypeName = typeName
	data.TypeArguments = typeArguments
	return newNode(KindTypeReference, data)
}

func (node *TypeReferenceNode) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeName) || visitNodeList(v, node.TypeArguments)
}

func IsTypeReferenceNode(node *Node) bool {
	return node.Kind == KindTypeReference
}

// ExpressionWithTypeArguments

type ExpressionWithTypeArguments struct {
	ExpressionBase
	Expression    *Expression // Expression
	TypeArguments *NodeList   // NodeList[*TypeNode]. Optional
}

func (f *NodeFactory) NewExpressionWithTypeArguments(expression *Expression, typeArguments *NodeList) *Node {
	data := &ExpressionWithTypeArguments{}
	data.Expression = expression
	data.TypeArguments = typeArguments
	return newNode(KindExpressionWithTypeArguments, data)
}

func (node *ExpressionWithTypeArguments) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visitNodeList(v, node.TypeArguments)
}

func IsExpressionWithTypeArguments(node *Node) bool {
	return node.Kind == KindExpressionWithTypeArguments
}

// LiteralTypeNode

type LiteralTypeNode struct {
	TypeNodeBase
	Literal *Node // KeywordExpression | LiteralExpression | PrefixUnaryExpression
}

func (f *NodeFactory) NewLiteralTypeNode(literal *Node) *Node {
	data := &LiteralTypeNode{}
	data.Literal = literal
	return newNode(KindLiteralType, data)
}

func (node *LiteralTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Literal)
}

func IsLiteralTypeNode(node *Node) bool {
	return node.Kind == KindLiteralType
}

// ThisTypeNode

type ThisTypeNode struct {
	TypeNodeBase
}

func (f *NodeFactory) NewThisTypeNode() *Node {
	return newNode(KindThisType, &ThisTypeNode{})
}

func IsThisTypeNode(node *Node) bool {
	return node.Kind == KindThisType
}

// TypePredicateNode

type TypePredicateNode struct {
	TypeNodeBase
	AssertsModifier *TokenNode                  // TokenNode. Optional
	ParameterName   *TypePredicateParameterName // TypePredicateParameterName (Identifier | ThisTypeNode)
	Type            *TypeNode                   // TypeNode. Optional
}

func (f *NodeFactory) NewTypePredicateNode(assertsModifier *TokenNode, parameterName *TypePredicateParameterName, typeNode *TypeNode) *Node {
	data := &TypePredicateNode{}
	data.AssertsModifier = assertsModifier
	data.ParameterName = parameterName
	data.Type = typeNode
	return newNode(KindTypePredicate, data)
}

func (node *TypePredicateNode) ForEachChild(v Visitor) bool {
	return visit(v, node.AssertsModifier) || visit(v, node.ParameterName) || visit(v, node.Type)
}

func IsTypePredicateNode(node *Node) bool {
	return node.Kind == KindTypePredicate
}

// ImportTypeNode

type ImportTypeNode struct {
	TypeNodeBase
	IsTypeOf      bool
	Argument      *TypeNode             // TypeNode
	Attributes    *ImportAttributesNode // ImportAttributesNode. Optional
	Qualifier     *EntityName           // EntityName. Optional
	TypeArguments *NodeList             // NodeList[*TypeNode]. Optional
}

func (f *NodeFactory) NewImportTypeNode(isTypeOf bool, argument *TypeNode, attributes *ImportAttributesNode, qualifier *EntityName, typeArguments *NodeList) *Node {
	data := &ImportTypeNode{}
	data.IsTypeOf = isTypeOf
	data.Argument = argument
	data.Attributes = attributes
	data.Qualifier = qualifier
	data.TypeArguments = typeArguments
	return newNode(KindImportType, data)
}

func (node *ImportTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Argument) || visit(v, node.Attributes) || visit(v, node.Qualifier) || visitNodeList(v, node.TypeArguments)
}

func IsImportTypeNode(node *Node) bool {
	return node.Kind == KindImportType
}

// ImportAttribute

type ImportAttribute struct {
	NodeBase
	name  *ImportAttributeName // ImportAttributeName
	Value *Expression          // Expression
}

func (f *NodeFactory) NewImportAttribute(name *ImportAttributeName, value *Expression) *Node {
	data := &ImportAttribute{}
	data.name = name
	data.Value = value
	return newNode(KindImportAttribute, data)
}

func (node *ImportAttribute) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.Value)
}

func (node *ImportAttribute) Name() *ImportAttributeName {
	return node.name
}

// ImportAttributes

type ImportAttributes struct {
	NodeBase
	Token      Kind
	Attributes *NodeList // NodeList[*ImportAttributeNode]
	MultiLine  bool
}

func (f *NodeFactory) NewImportAttributes(token Kind, attributes *NodeList, multiLine bool) *Node {
	data := &ImportAttributes{}
	data.Token = token
	data.Attributes = attributes
	data.MultiLine = multiLine
	return newNode(KindImportAttributes, data)
}

func (node *ImportAttributes) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Attributes)
}

// TypeQueryNode

type TypeQueryNode struct {
	TypeNodeBase
	ExprName      *EntityName // EntityName
	TypeArguments *NodeList   // NodeList[*TypeNode]. Optional
}

func (f *NodeFactory) NewTypeQueryNode(exprName *EntityName, typeArguments *NodeList) *Node {
	data := &TypeQueryNode{}
	data.ExprName = exprName
	data.TypeArguments = typeArguments
	return newNode(KindTypeQuery, data)
}

func (node *TypeQueryNode) ForEachChild(v Visitor) bool {
	return visit(v, node.ExprName) || visitNodeList(v, node.TypeArguments)
}

func IsTypeQueryNode(node *Node) bool {
	return node.Kind == KindTypeQuery
}

// MappedTypeNode

type MappedTypeNode struct {
	TypeNodeBase
	DeclarationBase
	LocalsContainerBase
	ReadonlyToken *TokenNode                    // TokenNode. Optional
	TypeParameter *TypeParameterDeclarationNode // TypeParameterDeclarationNode
	NameType      *TypeNode                     // TypeNode. Optional
	QuestionToken *TokenNode                    // TokenNode. Optional
	Type          *TypeNode                     // TypeNode. Optional (error if missing)
	Members       *NodeList                     // NodeList[*TypeElement]. Used only to produce grammar errors
}

func (f *NodeFactory) NewMappedTypeNode(readonlyToken *TokenNode, typeParameter *TypeParameterDeclarationNode, nameType *TypeNode, questionToken *TokenNode, typeNode *TypeNode, members *NodeList) *Node {
	data := &MappedTypeNode{}
	data.ReadonlyToken = readonlyToken
	data.TypeParameter = typeParameter
	data.NameType = nameType
	data.QuestionToken = questionToken
	data.Type = typeNode
	data.Members = members
	return newNode(KindMappedType, data)
}

func (node *MappedTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.ReadonlyToken) || visit(v, node.TypeParameter) || visit(v, node.NameType) ||
		visit(v, node.QuestionToken) || visit(v, node.Type) || visitNodeList(v, node.Members)
}

func IsMappedTypeNode(node *Node) bool {
	return node.Kind == KindMappedType
}

// TypeLiteralNode

type TypeLiteralNode struct {
	TypeNodeBase
	DeclarationBase
	Members *NodeList // NodeList[*TypeElement]
}

func (f *NodeFactory) NewTypeLiteralNode(members *NodeList) *Node {
	data := &TypeLiteralNode{}
	data.Members = members
	return newNode(KindTypeLiteral, data)
}

func (node *TypeLiteralNode) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Members)
}

func IsTypeLiteralNode(node *Node) bool {
	return node.Kind == KindTypeLiteral
}

// TupleTypeNode

type TupleTypeNode struct {
	TypeNodeBase
	Elements *NodeList // NodeList[*TypeNode]
}

func (f *NodeFactory) NewTupleTypeNode(elements *NodeList) *Node {
	data := &TupleTypeNode{}
	data.Elements = elements
	return newNode(KindTupleType, data)
}

func (node *TupleTypeNode) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Elements)
}

// NamedTupleTypeMember

type NamedTupleMember struct {
	TypeNodeBase
	DeclarationBase
	DotDotDotToken *TokenNode      // TokenNode
	name           *IdentifierNode // IdentifierNode
	QuestionToken  *TokenNode      // TokenNode
	Type           *TypeNode       // TypeNode
}

func (f *NodeFactory) NewNamedTupleTypeMember(dotDotDotToken *TokenNode, name *IdentifierNode, questionToken *TokenNode, typeNode *TypeNode) *Node {
	data := &NamedTupleMember{}
	data.DotDotDotToken = dotDotDotToken
	data.name = name
	data.QuestionToken = questionToken
	data.Type = typeNode
	return newNode(KindNamedTupleMember, data)
}

func (node *NamedTupleMember) ForEachChild(v Visitor) bool {
	return visit(v, node.DotDotDotToken) || visit(v, node.name) || visit(v, node.QuestionToken) || visit(v, node.Type)
}

func (node *NamedTupleMember) Name() *DeclarationName {
	return node.name
}
func IsNamedTupleMember(node *Node) bool {
	return node.Kind == KindNamedTupleMember
}

// OptionalTypeNode

type OptionalTypeNode struct {
	TypeNodeBase
	Type *TypeNode // TypeNode
}

func (f *NodeFactory) NewOptionalTypeNode(typeNode *TypeNode) *Node {
	data := &OptionalTypeNode{}
	data.Type = typeNode
	return newNode(KindOptionalType, data)
}

func (node *OptionalTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

// RestTypeNode

type RestTypeNode struct {
	TypeNodeBase
	Type *TypeNode // TypeNode
}

func (f *NodeFactory) NewRestTypeNode(typeNode *TypeNode) *Node {
	data := &RestTypeNode{}
	data.Type = typeNode
	return newNode(KindRestType, data)
}

func (node *RestTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

// ParenthesizedTypeNode

type ParenthesizedTypeNode struct {
	TypeNodeBase
	Type *TypeNode // TypeNode
}

func (f *NodeFactory) NewParenthesizedTypeNode(typeNode *TypeNode) *Node {
	data := &ParenthesizedTypeNode{}
	data.Type = typeNode
	return newNode(KindParenthesizedType, data)
}

func (node *ParenthesizedTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func IsParenthesizedTypeNode(node *Node) bool {
	return node.Kind == KindParenthesizedType
}

// FunctionOrConstructorTypeNodeBase

type FunctionOrConstructorTypeNodeBase struct {
	TypeNodeBase
	DeclarationBase
	ModifiersBase
	FunctionLikeBase
}

func (node *FunctionOrConstructorTypeNodeBase) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

// FunctionTypeNode

type FunctionTypeNode struct {
	FunctionOrConstructorTypeNodeBase
}

func (f *NodeFactory) NewFunctionTypeNode(typeParameters *NodeList, parameters *NodeList, returnType *TypeNode) *Node {
	data := &FunctionTypeNode{}
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	return newNode(KindFunctionType, data)
}

func IsFunctionTypeNode(node *Node) bool {
	return node.Kind == KindFunctionType
}

// ConstructorTypeNode

type ConstructorTypeNode struct {
	FunctionOrConstructorTypeNodeBase
}

func (f *NodeFactory) NewConstructorTypeNode(modifiers *ModifierList, typeParameters *NodeList, parameters *NodeList, returnType *TypeNode) *Node {
	data := &ConstructorTypeNode{}
	data.modifiers = modifiers
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.Type = returnType
	return newNode(KindConstructorType, data)
}

func IsConstructorTypeNode(node *Node) bool {
	return node.Kind == KindConstructorType
}

// TemplateLiteralLikeBase

type TemplateLiteralLikeBase struct {
	LiteralLikeBase
	RawText       string
	TemplateFlags TokenFlags
}

func (node *TemplateLiteralLikeBase) LiteralLikeData() *LiteralLikeBase                 { return &node.LiteralLikeBase }
func (node *TemplateLiteralLikeBase) TemplateLiteralLikeData() *TemplateLiteralLikeBase { return node }

// TemplateHead

type TemplateHead struct {
	NodeBase
	TemplateLiteralLikeBase
}

func (f *NodeFactory) NewTemplateHead(text string, rawText string, templateFlags TokenFlags) *Node {
	data := &TemplateHead{}
	data.Text = text
	data.RawText = rawText
	data.TemplateFlags = templateFlags
	return newNode(KindTemplateHead, data)
}

// TemplateMiddle

type TemplateMiddle struct {
	NodeBase
	TemplateLiteralLikeBase
}

func (f *NodeFactory) NewTemplateMiddle(text string, rawText string, templateFlags TokenFlags) *Node {
	data := &TemplateMiddle{}
	data.Text = text
	data.RawText = rawText
	data.TemplateFlags = templateFlags
	return newNode(KindTemplateMiddle, data)
}

// TemplateTail

type TemplateTail struct {
	NodeBase
	TemplateLiteralLikeBase
}

func (f *NodeFactory) NewTemplateTail(text string, rawText string, templateFlags TokenFlags) *Node {
	data := &TemplateTail{}
	data.Text = text
	data.RawText = rawText
	data.TemplateFlags = templateFlags
	return newNode(KindTemplateTail, data)
}

// TemplateLiteralTypeNode

type TemplateLiteralTypeNode struct {
	TypeNodeBase
	Head          *TemplateHeadNode // TemplateHeadNode
	TemplateSpans *NodeList         // NodeList[*TemplateLiteralTypeSpanNode]
}

func (f *NodeFactory) NewTemplateLiteralTypeNode(head *TemplateHeadNode, templateSpans *NodeList) *Node {
	data := &TemplateLiteralTypeNode{}
	data.Head = head
	data.TemplateSpans = templateSpans
	return newNode(KindTemplateLiteralType, data)
}

func (node *TemplateLiteralTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Head) || visitNodeList(v, node.TemplateSpans)
}

// TemplateLiteralTypeSpan

type TemplateLiteralTypeSpan struct {
	NodeBase
	Type    *TypeNode             // TypeNode
	Literal *TemplateMiddleOrTail // TemplateMiddleOrTail
}

func (f *NodeFactory) NewTemplateLiteralTypeSpan(typeNode *TypeNode, literal *TemplateMiddleOrTail) *Node {
	data := &TemplateLiteralTypeSpan{}
	data.Type = typeNode
	data.Literal = literal
	return newNode(KindTemplateLiteralTypeSpan, data)
}

func (node *TemplateLiteralTypeSpan) ForEachChild(v Visitor) bool {
	return visit(v, node.Type) || visit(v, node.Literal)
}

// SyntheticExpression

type SyntheticExpression struct {
	ExpressionBase
	Type            any
	IsSpread        bool
	TupleNameSource *Node
}

func (f *NodeFactory) NewSyntheticExpression(t any, isSpread bool, tupleNameSource *Node) *Node {
	data := &SyntheticExpression{}
	data.Type = t
	data.IsSpread = isSpread
	data.TupleNameSource = tupleNameSource
	return newNode(KindSyntheticExpression, data)
}

func IsSyntheticExpression(node *Node) bool {
	return node.Kind == KindSyntheticExpression
}

/// A JSX expression of the form <TagName attrs>...</TagName>

type JsxElement struct {
	ExpressionBase
	OpeningElement *JsxOpeningElementNode // JsxOpeningElementNode
	Children       *NodeList              // NodeList[*JsxChild]
	ClosingElement *JsxClosingElementNode // JsxClosingElementNode
}

func (f *NodeFactory) NewJsxElement(openingElement *JsxOpeningElementNode, children *NodeList, closingElement *JsxClosingElementNode) *Node {
	data := &JsxElement{}
	data.OpeningElement = openingElement
	data.Children = children
	data.ClosingElement = closingElement
	return newNode(KindJsxElement, data)
}

func (node *JsxElement) ForEachChild(v Visitor) bool {
	return visit(v, node.OpeningElement) || visitNodeList(v, node.Children) || visit(v, node.ClosingElement)
}

// JsxAttributes
type JsxAttributes struct {
	ExpressionBase
	DeclarationBase
	Properties *NodeList // NodeList[*JsxAttributeLike]
}

func (f *NodeFactory) NewJsxAttributes(properties *NodeList) *Node {
	data := &JsxAttributes{}
	data.Properties = properties
	return newNode(KindJsxAttributes, data)
}

func (node *JsxAttributes) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Properties)
}

func IsJsxAttributes(node *Node) bool {
	return node.Kind == KindJsxAttributes
}

// JsxNamespacedName

type JsxNamespacedName struct {
	ExpressionBase
	name      *IdentifierNode // IdentifierNode
	Namespace *IdentifierNode // IdentifierNode
}

func (f *NodeFactory) NewJsxNamespacedName(name *IdentifierNode, namespace *IdentifierNode) *Node {
	data := &JsxNamespacedName{}
	data.name = name
	data.Namespace = namespace
	return newNode(KindJsxNamespacedName, data)
}

func (node *JsxNamespacedName) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.Namespace)
}

func (node *JsxNamespacedName) Name() *DeclarationName {
	return node.name
}

func IsJsxNamespacedName(node *Node) bool {
	return node.Kind == KindJsxNamespacedName
}

/// The opening element of a <Tag>...</Tag> JsxElement

type JsxOpeningElement struct {
	ExpressionBase
	TagName       *JsxTagNameExpression // JsxTagNameExpression (Identifier | KeywordExpression | JsxTagNamePropertyAccess | JsxNamespacedName)
	TypeArguments *NodeList             // NodeList[*TypeNode]. Optional
	Attributes    *JsxAttributesNode    // JsxAttributesNode
}

func (f *NodeFactory) NewJsxOpeningElement(tagName *JsxTagNameExpression, typeArguments *NodeList, attributes *JsxAttributesNode) *Node {
	data := &JsxOpeningElement{}
	data.TagName = tagName
	data.TypeArguments = typeArguments
	data.Attributes = attributes
	return newNode(KindJsxOpeningElement, data)
}

func (node *JsxOpeningElement) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.TypeArguments) || visit(v, node.Attributes)
}

func IsJsxOpeningElement(node *Node) bool {
	return node.Kind == KindJsxOpeningElement
}

/// A JSX expression of the form <TagName attrs />

type JsxSelfClosingElement struct {
	ExpressionBase
	TagName       *JsxTagNameExpression // JsxTagNameExpression (IdentifierReference | KeywordExpression | JsxTagNamePropertyAccess | JsxNamespacedName)
	TypeArguments *NodeList             // NodeList[*TypeNode]. Optional
	Attributes    *JsxAttributesNode    // JsxAttributesNode
}

func (f *NodeFactory) NewJsxSelfClosingElement(tagName *JsxTagNameExpression, typeArguments *NodeList, attributes *JsxAttributesNode) *Node {
	data := &JsxSelfClosingElement{}
	data.TagName = tagName
	data.TypeArguments = typeArguments
	data.Attributes = attributes
	return newNode(KindJsxSelfClosingElement, data)
}

func (node *JsxSelfClosingElement) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.TypeArguments) || visit(v, node.Attributes)
}

func IsJsxSelfClosingElement(node *Node) bool {
	return node.Kind == KindJsxSelfClosingElement
}

/// A JSX expression of the form <>...</>

type JsxFragment struct {
	ExpressionBase
	OpeningFragment *JsxOpeningFragmentNode // JsxOpeningFragmentNode
	Children        *NodeList               // NodeList[*JsxChild]
	ClosingFragment *JsxClosingFragmentNode // JsxClosingFragmentNode
}

func (f *NodeFactory) NewJsxFragment(openingFragment *JsxOpeningFragmentNode, children *NodeList, closingFragment *JsxClosingFragmentNode) *Node {
	data := &JsxFragment{}
	data.OpeningFragment = openingFragment
	data.Children = children
	data.ClosingFragment = closingFragment
	return newNode(KindJsxFragment, data)
}

func (node *JsxFragment) ForEachChild(v Visitor) bool {
	return visit(v, node.OpeningFragment) || visitNodeList(v, node.Children) || visit(v, node.ClosingFragment)
}

/// The opening element of a <>...</> JsxFragment

type JsxOpeningFragment struct {
	ExpressionBase
}

func (f *NodeFactory) NewJsxOpeningFragment() *Node {
	return newNode(KindJsxOpeningFragment, &JsxOpeningFragment{})
}

func IsJsxOpeningFragment(node *Node) bool {
	return node.Kind == KindJsxOpeningFragment
}

/// The closing element of a <>...</> JsxFragment

type JsxClosingFragment struct {
	ExpressionBase
}

func (f *NodeFactory) NewJsxClosingFragment() *Node {
	return newNode(KindJsxClosingFragment, &JsxClosingFragment{})
}

// JsxAttribute

type JsxAttribute struct {
	NodeBase
	DeclarationBase
	name        *JsxAttributeName  // JsxAttributeName
	Initializer *JsxAttributeValue // JsxAttributeValue. Optional, <X y /> is sugar for <X y={true} />
}

func (f *NodeFactory) NewJsxAttribute(name *JsxAttributeName, initializer *JsxAttributeValue) *Node {
	data := &JsxAttribute{}
	data.name = name
	data.Initializer = initializer
	return newNode(KindJsxAttribute, data)
}

func (node *JsxAttribute) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.Initializer)
}

func IsJsxAttribute(node *Node) bool {
	return node.Kind == KindJsxAttribute
}

// JsxSpreadAttribute

type JsxSpreadAttribute struct {
	NodeBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewJsxSpreadAttribute(expression *Expression) *Node {
	data := &JsxSpreadAttribute{}
	data.Expression = expression
	return newNode(KindJsxSpreadAttribute, data)
}

func (node *JsxSpreadAttribute) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

// JsxClosingElement

type JsxClosingElement struct {
	NodeBase
	TagName *JsxTagNameExpression // JsxTagNameExpression
}

func (f *NodeFactory) NewJsxClosingElement(tagName *JsxTagNameExpression) *Node {
	data := &JsxClosingElement{}
	data.TagName = tagName
	return newNode(KindJsxClosingElement, data)
}

func (node *JsxClosingElement) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName)
}

// JsxExpression

type JsxExpression struct {
	ExpressionBase
	DotDotDotToken *TokenNode  // TokenNode. Optional
	Expression     *Expression // Expression
}

func (f *NodeFactory) NewJsxExpression(dotDotDotToken *TokenNode, expression *Expression) *Node {
	data := &JsxExpression{}
	data.DotDotDotToken = dotDotDotToken
	data.Expression = expression
	return newNode(KindJsxExpression, data)
}

func (node *JsxExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.DotDotDotToken) || visit(v, node.Expression)
}

// JsxText

type JsxText struct {
	ExpressionBase
	LiteralLikeBase
	ContainsOnlyTriviaWhiteSpaces bool
}

func (f *NodeFactory) NewJsxText(text string, containsOnlyTriviaWhiteSpace bool) *Node {
	data := &JsxText{}
	data.Text = text
	data.ContainsOnlyTriviaWhiteSpaces = containsOnlyTriviaWhiteSpace
	return newNode(KindJsxText, data)
}

/// JSDoc ///

type JSDoc struct {
	NodeBase
	Comment *NodeList // NodeList[*JSDocCommentBase]
	Tags    *NodeList // NodeList[*JSDocTagBase]
}

func (f *NodeFactory) NewJSDoc(comment *NodeList, tags *NodeList) *Node {
	data := &JSDoc{}
	data.Comment = comment
	data.Tags = tags
	return newNode(KindJSDoc, data)
}

func (node *JSDoc) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Comment) || visitNodeList(v, node.Tags)
}

type JSDocTagBase struct {
	NodeBase
	TagName *IdentifierNode
	Comment *NodeList
}

type JSDocCommentBase struct {
	NodeBase
	Text string
}

// JSDoc comments
type JSDocText struct {
	JSDocCommentBase
}

func (f *NodeFactory) NewJSDocText(text string) *Node {
	data := &JSDocText{}
	data.Text = text
	return newNode(KindJSDocText, data)
}

type JSDocLink struct {
	JSDocCommentBase
	name *Node // optional (should only be EntityName | JSDocMemberName)
}

func (f *NodeFactory) NewJSDocLink(name *Node, text string) *Node {
	data := &JSDocLink{}
	data.name = name
	data.Text = text
	return newNode(KindJSDocLink, data)
}

func (node *JSDocLink) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *JSDocLink) Name() *DeclarationName {
	return node.name
}

type JSDocLinkPlain struct {
	JSDocCommentBase
	name *Node // optional (should only be EntityName | JSDocMemberName)
}

func (f *NodeFactory) NewJSDocLinkPlain(name *Node, text string) *Node {
	data := &JSDocLinkPlain{}
	data.name = name
	data.Text = text
	return newNode(KindJSDocLinkPlain, data)
}

func (node *JSDocLinkPlain) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *JSDocLinkPlain) Name() *DeclarationName {
	return node.name
}

type JSDocLinkCode struct {
	JSDocCommentBase
	name *Node // optional (should only be EntityName | JSDocMemberName)
}

func (f *NodeFactory) NewJSDocLinkCode(name *Node, text string) *Node {
	data := &JSDocLinkCode{}
	data.name = name
	data.Text = text
	return newNode(KindJSDocLinkCode, data)
}

func (node *JSDocLinkCode) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *JSDocLinkCode) Name() *DeclarationName {
	return node.name
}

// JSDocTypeExpression

type JSDocTypeExpression struct {
	TypeNodeBase
	Type *TypeNode
}

func (node *JSDocTypeExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (f *NodeFactory) NewJSDocTypeExpression(typeNode *TypeNode) *Node {
	data := &JSDocTypeExpression{}
	data.Type = typeNode
	return newNode(KindJSDocTypeExpression, data)
}

// JSDocNonNullableType

type JSDocNonNullableType struct {
	TypeNodeBase
	Type *TypeNode // TypeNode
}

func (f *NodeFactory) NewJSDocNonNullableType(typeNode *TypeNode) *Node {
	data := &JSDocNonNullableType{}
	data.Type = typeNode
	return newNode(KindJSDocNonNullableType, data)
}

func (node *JSDocNonNullableType) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

// JSDocNullableType

type JSDocNullableType struct {
	TypeNodeBase
	Type *TypeNode // TypeNode
}

func (f *NodeFactory) NewJSDocNullableType(typeNode *TypeNode) *Node {
	data := &JSDocNullableType{}
	data.Type = typeNode
	return newNode(KindJSDocNullableType, data)
}

func (node *JSDocNullableType) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

// JSDocAllType

type JSDocAllType struct {
	TypeNodeBase
}

func (f *NodeFactory) NewJSDocAllType() *Node {
	data := &JSDocAllType{}
	return newNode(KindJSDocAllType, data)
}

// JSDocFunctionType

type JSDocFunctionType struct {
	TypeNodeBase
	Parameters *NodeList // NodeList[*ParameterDeclarationNode]
	Type       *TypeNode
}

func (node *JSDocFunctionType) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

func (f *NodeFactory) NewJSDocFunctionType(parameters *NodeList, typeNode *TypeNode) *Node {
	data := &JSDocFunctionType{}
	data.Parameters = parameters
	data.Type = typeNode
	return newNode(KindJSDocFunctionType, data)
}

// JSDocVariadicType

type JSDocVariadicType struct {
	TypeNodeBase
	Type *TypeNode
}

func (f *NodeFactory) NewJSDocVariadicType(typeNode *TypeNode) *Node {
	data := &JSDocVariadicType{}
	data.Type = typeNode
	return newNode(KindJSDocVariadicType, data)
}

func (node *JSDocVariadicType) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

// JSDocOptionalType

type JSDocOptionalType struct {
	TypeNodeBase
	Type *TypeNode
}

func (node *JSDocOptionalType) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (f *NodeFactory) NewJSDocOptionalType(typeNode *TypeNode) *Node {
	data := &JSDocOptionalType{}
	data.Type = typeNode
	return newNode(KindJSDocOptionalType, data)
}

type JSDocTypeTag struct {
	JSDocTagBase
	TypeExpression *TypeNode
}

func (f *NodeFactory) NewJSDocTypeTag(tagName *IdentifierNode, typeExpression *Node, comment *NodeList) *Node {
	data := &JSDocTypeTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return newNode(KindJSDocTypeTag, data)
}

func (node *JSDocTypeTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

// JSDocUnknownTag
type JSDocUnknownTag struct {
	JSDocTagBase
}

func (f *NodeFactory) NewJSDocUnknownTag(tagName *IdentifierNode, comment *NodeList) *Node {
	data := &JSDocUnknownTag{}
	data.TagName = tagName
	data.Comment = comment
	return newNode(KindJSDocTag, data)
}

// JSDocTemplateTag
type JSDocTemplateTag struct {
	JSDocTagBase
	Constraint     *Node
	typeParameters *TypeParameterList
}

func (f *NodeFactory) NewJSDocTemplateTag(tagName *IdentifierNode, constraint *Node, typeParameters *TypeParameterList, comment *NodeList) *Node {
	data := &JSDocTemplateTag{}
	data.TagName = tagName
	data.Constraint = constraint
	data.typeParameters = typeParameters
	data.Comment = comment
	return newNode(KindJSDocTemplateTag, data)
}

func (node *JSDocTemplateTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.Constraint) || visitNodeList(v, node.typeParameters) || visitNodeList(v, node.Comment)
}

func (node *JSDocTemplateTag) TypeParameters() *TypeParameterList { return node.typeParameters }

// JSDocParameterTag

type JSDocPropertyTag struct {
	JSDocTagBase
	name           *EntityName
	IsBracketed    bool
	TypeExpression *TypeNode
	IsNameFirst    bool
}

func NewJSDocPropertyTag(tagName *IdentifierNode, name *EntityName, isBracketed bool, typeExpression *TypeNode, isNameFirst bool, comment *NodeList) *JSDocPropertyTag {
	data := &JSDocPropertyTag{}
	data.TagName = tagName
	data.name = name
	data.IsBracketed = isBracketed
	data.TypeExpression = typeExpression
	data.IsNameFirst = isNameFirst
	data.Comment = comment
	return data
}
func (node *JSDocPropertyTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.name) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

func (node *JSDocPropertyTag) Name() *EntityName { return node.name }

type JSDocParameterTag struct {
	JSDocTagBase
	name           *EntityName
	IsBracketed    bool
	TypeExpression *TypeNode
	IsNameFirst    bool
}

func NewJSDocParameterTag(tagName *IdentifierNode, name *EntityName, isBracketed bool, typeExpression *TypeNode, isNameFirst bool, comment *NodeList) *JSDocParameterTag {
	data := &JSDocParameterTag{}
	data.TagName = tagName
	data.name = name
	data.IsBracketed = isBracketed
	data.TypeExpression = typeExpression
	data.IsNameFirst = isNameFirst
	data.Comment = comment
	return data
}
func (node *JSDocParameterTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.name) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

func (node *JSDocParameterTag) Name() *EntityName { return node.name }

// JSDocReturnTag
type JSDocReturnTag struct {
	JSDocTagBase
	TypeExpression *TypeNode
}

func NewJSDocReturnTag(tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *JSDocReturnTag {
	data := &JSDocReturnTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return data
}
func (node *JSDocReturnTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

// JSDocPublicTag
type JSDocPublicTag struct {
	JSDocTagBase
}

func NewJSDocPublicTag(tagName *IdentifierNode, comment *NodeList) *JSDocPublicTag {
	data := &JSDocPublicTag{}
	data.TagName = tagName
	data.Comment = comment
	return data
}
func (node *JSDocPublicTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

// JSDocPrivateTag
type JSDocPrivateTag struct {
	JSDocTagBase
}

func NewJSDocPrivateTag(tagName *IdentifierNode, comment *NodeList) *JSDocPrivateTag {
	data := &JSDocPrivateTag{}
	data.TagName = tagName
	data.Comment = comment
	return data
}

func (node *JSDocPrivateTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

// JSDocProtectedTag
type JSDocProtectedTag struct {
	JSDocTagBase
}

func NewJSDocProtectedTag(tagName *IdentifierNode, comment *NodeList) *JSDocProtectedTag {
	data := &JSDocProtectedTag{}
	data.TagName = tagName
	data.Comment = comment
	return data
}

func (node *JSDocProtectedTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

// JSDocReadonlyTag
type JSDocReadonlyTag struct {
	JSDocTagBase
}

func NewJSDocReadonlyTag(tagName *IdentifierNode, comment *NodeList) *JSDocReadonlyTag {
	data := &JSDocReadonlyTag{}
	data.TagName = tagName
	data.Comment = comment
	return data
}

func (node *JSDocReadonlyTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

// JSDocOverrideTag
type JSDocOverrideTag struct {
	JSDocTagBase
}

func NewJSDocOverrideTag(tagName *IdentifierNode, comment *NodeList) *JSDocOverrideTag {
	data := &JSDocOverrideTag{}
	data.TagName = tagName
	data.Comment = comment
	return data
}

func (node *JSDocOverrideTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

// JSDocDeprecatedTag
type JSDocDeprecatedTag struct {
	JSDocTagBase
}

func NewJSDocDeprecatedTag(tagName *IdentifierNode, comment *NodeList) *JSDocDeprecatedTag {
	data := &JSDocDeprecatedTag{}
	data.TagName = tagName
	data.Comment = comment
	return data
}

func (node *JSDocDeprecatedTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

// JSDocSeeTag
type JSDocSeeTag struct {
	JSDocTagBase
	NameExpression *TypeNode
}

func NewJSDocSeeTag(tagName *IdentifierNode, nameExpression *TypeNode, comment *NodeList) *JSDocSeeTag {
	data := &JSDocSeeTag{}
	data.TagName = tagName
	data.NameExpression = nameExpression
	data.Comment = comment
	return data
}

func (node *JSDocSeeTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.NameExpression) || visitNodeList(v, node.Comment)
}

// JSDocImplementsTag
type JSDocImplementsTag struct {
	JSDocTagBase
	ClassName *Expression
}

func NewJSDocImplementsTag(tagName *IdentifierNode, className *Expression, comment *NodeList) *JSDocImplementsTag {
	data := &JSDocImplementsTag{}
	data.TagName = tagName
	data.ClassName = className
	data.Comment = comment
	return data
}
func (node *JSDocImplementsTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.ClassName) || visitNodeList(v, node.Comment)
}

// JSDocAugmentsTag
type JSDocAugmentsTag struct {
	JSDocTagBase
	ClassName *Expression
}

func NewJSDocAugmentsTag(tagName *IdentifierNode, className *Expression, comment *NodeList) *JSDocAugmentsTag {
	data := &JSDocAugmentsTag{}
	data.TagName = tagName
	data.ClassName = className
	data.Comment = comment
	return data
}

func (node *JSDocAugmentsTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.ClassName) || visitNodeList(v, node.Comment)
}

// JSDocSatisfiesTag
type JSDocSatisfiesTag struct {
	JSDocTagBase
	TypeExpression *TypeNode
}

func NewJSDocSatisfiesTag(tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *JSDocSatisfiesTag {
	data := &JSDocSatisfiesTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return data
}

func (node *JSDocSatisfiesTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

// JSDocThisTag
type JSDocThisTag struct {
	JSDocTagBase
	TypeExpression *TypeNode
}

func NewJSDocThisTag(tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *JSDocThisTag {
	data := &JSDocThisTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return data
}

func (node *JSDocThisTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

// JSDocImportTag
type JSDocImportTag struct {
	JSDocTagBase
	ImportClause    *Declaration
	ModuleSpecifier *Node
	Attributes      *Node
}

func NewJSDocImportTag(tagName *IdentifierNode, importClause *Declaration, moduleSpecifier *Node, attributes *Node, comment *NodeList) *JSDocImportTag {
	data := &JSDocImportTag{}
	data.TagName = tagName
	data.ImportClause = importClause
	data.ModuleSpecifier = moduleSpecifier
	data.Attributes = attributes
	data.Comment = comment
	return data
}

func (node *JSDocImportTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.ImportClause) || visit(v, node.ModuleSpecifier) || visit(v, node.Attributes) || visitNodeList(v, node.Comment)
}

// JSDocCallbackTag
type JSDocCallbackTag struct {
	JSDocTagBase
	FullName       *Node
	TypeExpression *TypeNode
}

func NewJSDocCallbackTag(tagName *IdentifierNode, typeExpression *TypeNode, fullName *Node, comment *NodeList) *JSDocCallbackTag {
	data := &JSDocCallbackTag{}
	data.TagName = tagName
	data.FullName = fullName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return data
}

func (node *JSDocCallbackTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.FullName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

// JSDocOverloadTag
type JSDocOverloadTag struct {
	JSDocTagBase
	TypeExpression *TypeNode
}

func NewJSDocOverloadTag(tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *JSDocOverloadTag {
	data := &JSDocOverloadTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return data
}

func (node *JSDocOverloadTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

// JSDocTypedefTag
type JSDocTypedefTag struct {
	JSDocTagBase
	TypeExpression *Node
	FullName       *Node
}

func NewJSDocTypedefTag(tagName *IdentifierNode, typeExpression *Node, fullName *Node, comment *NodeList) *JSDocTypedefTag {
	data := &JSDocTypedefTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.FullName = fullName
	data.Comment = comment
	return data
}

func (node *JSDocTypedefTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visit(v, node.FullName) || visitNodeList(v, node.Comment)
}

// JSDocTypeLiteral
type JSDocTypeLiteral struct {
	TypeNodeBase
	DeclarationBase
	JsDocPropertyTags []*Node
	IsArrayType       bool
}

func NewJSDocTypeLiteral(jsDocPropertyTags []*Node, isArrayType bool) *JSDocTypeLiteral {
	data := &JSDocTypeLiteral{}
	data.JsDocPropertyTags = jsDocPropertyTags
	data.IsArrayType = isArrayType
	return data
}

func (node *JSDocTypeLiteral) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.JsDocPropertyTags)
}

// JSDocSignature
type JSDocSignature struct {
	TypeNodeBase
	typeParameters *TypeParameterList
	Parameters     []*JSDocTag
	Type           *JSDocTag
}

func NewJSDocSignature(typeParameters *TypeParameterList, parameters []*JSDocTag, typeNode *JSDocTag) *JSDocSignature {
	data := &JSDocSignature{}
	data.typeParameters = typeParameters
	data.Parameters = parameters
	data.Type = typeNode
	return data
}

func (node *JSDocSignature) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.typeParameters) || visitNodes(v, node.Parameters) || visit(v, node.Type)
}

func (node *JSDocSignature) TypeParameters() *TypeParameterList { return node.typeParameters }

// JSDocNameReference
type JSDocNameReference struct {
	TypeNodeBase
	name *EntityName
}

// JSDocMemberName
func NewJSDocNameReference(name *EntityName) *JSDocNameReference {
	data := &JSDocNameReference{}
	data.name = name
	return data
}

func (node *JSDocNameReference) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *JSDocNameReference) Name() *EntityName { return node.name }

// PatternAmbientModule

type PatternAmbientModule struct {
	Pattern core.Pattern
	Symbol  *Symbol
}

// SourceFile

type SourceFile struct {
	NodeBase
	DeclarationBase
	LocalsContainerBase
	Text                        string
	fileName                    string
	path                        tspath.Path
	Statements                  *NodeList // NodeList[*Statement]
	diagnostics                 []*Diagnostic
	bindDiagnostics             []*Diagnostic
	BindSuggestionDiagnostics   []*Diagnostic
	ImpliedNodeFormat           core.ModuleKind
	LineMap                     []core.TextPos
	LanguageVersion             core.ScriptTarget
	LanguageVariant             core.LanguageVariant
	ScriptKind                  core.ScriptKind
	CommonJsModuleIndicator     *Node
	ExternalModuleIndicator     *Node
	EndFlowNode                 *FlowNode
	JsGlobalAugmentations       SymbolTable
	IsDeclarationFile           bool
	IsBound                     bool
	ModuleReferencesProcessed   bool
	UsesUriStyleNodeCoreModules core.Tristate
	SymbolCount                 int
	ClassifiableNames           core.Set[string]
	Imports                     []*LiteralLikeNode // []LiteralLikeNode
	ModuleAugmentations         []*ModuleName      // []ModuleName
	PatternAmbientModules       []PatternAmbientModule
	AmbientModuleNames          []string
	HasNoDefaultLib             bool
	jsdocCache                  map[*Node][]*Node
	Pragmas                     []Pragma
	ReferencedFiles             []*FileReference
	TypeReferenceDirectives     []*FileReference
	LibReferenceDirectives      []*FileReference
}

func (f *NodeFactory) NewSourceFile(text string, fileName string, statements *NodeList) *Node {
	data := &SourceFile{}
	data.Text = text
	data.fileName = fileName
	data.Statements = statements
	data.LanguageVersion = core.ScriptTargetLatest
	return newNode(KindSourceFile, data)
}

func (node *SourceFile) FileName() string {
	return node.fileName
}

func (node *SourceFile) Path() tspath.Path {
	return node.path
}

func (node *SourceFile) SetPath(p tspath.Path) {
	node.path = p
}

func (node *SourceFile) Diagnostics() []*Diagnostic {
	return node.diagnostics
}

func (node *SourceFile) SetDiagnostics(diags []*Diagnostic) {
	node.diagnostics = diags
}

func (node *SourceFile) BindDiagnostics() []*Diagnostic {
	return node.bindDiagnostics
}

func (node *SourceFile) SetBindDiagnostics(diags []*Diagnostic) {
	node.bindDiagnostics = diags
}

func (node *SourceFile) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Statements)
}

func IsSourceFile(node *Node) bool {
	return node.Kind == KindSourceFile
}

type CommentRange struct {
	core.TextRange
	HasTrailingNewLine bool
	Kind               Kind
}

func NewCommentRange(kind Kind, pos int, end int, hasTrailingNewLine bool) CommentRange {
	return CommentRange{
		TextRange:          core.NewTextRange(pos, end),
		HasTrailingNewLine: hasTrailingNewLine,
		Kind:               kind,
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
	Name      string
	Args      map[string]PragmaArgument
	ArgsRange CommentRange
}

type PragmaKindFlags = uint8

const (
	PragmaKindFlagsNone PragmaKindFlags = iota
	PragmaKindTripleSlashXML
	PragmaKindSingleLine
	PragmaKindMultiLine
	PragmaKindAll     = PragmaKindTripleSlashXML | PragmaKindSingleLine | PragmaKindMultiLine
	PragmaKindDefault = PragmaKindAll
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
