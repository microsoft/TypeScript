package ast

import (
	"github.com/microsoft/typescript-go/internal/core"
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

func (f *NodeFactory) newNode(kind Kind, data nodeData) *Node {
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
func (n *Node) ReturnType() *TypeNode         { return n.data.FunctionLikeData().ReturnType }
func (n *Node) ClassLikeData() *ClassLikeBase { return n.data.ClassLikeData() }
func (n *Node) BodyData() *BodyBase           { return n.data.BodyData() }

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

func (node *Node) Expression() *Node {
	switch node.Kind {
	case KindPropertyAccessExpression:
		return node.AsPropertyAccessExpression().Expression
	case KindElementAccessExpression:
		return node.AsElementAccessExpression().Expression
	case KindParenthesizedExpression:
		return node.AsParenthesizedExpression().Expression
	case KindCallExpression:
		return node.AsCallExpression().Expression
	case KindNewExpression:
		return node.AsNewExpression().Expression
	case KindExpressionWithTypeArguments:
		return node.AsExpressionWithTypeArguments().Expression
	case KindNonNullExpression:
		return node.AsNonNullExpression().Expression
	case KindTypeAssertionExpression:
		return node.AsTypeAssertion().Expression
	case KindAsExpression:
		return node.AsAsExpression().Expression
	case KindSatisfiesExpression:
		return node.AsSatisfiesExpression().Expression
	case KindSpreadAssignment:
		return node.AsSpreadAssignment().Expression
	case KindTemplateSpan:
		return node.AsTemplateSpan().Expression
	case KindForInStatement, KindForOfStatement:
		return node.AsForInOrOfStatement().Expression
	}
	panic("Unhandled case in Node.Expression")
}

func (node *Node) Arguments() []*Node {
	switch node.Kind {
	case KindCallExpression:
		return node.AsCallExpression().Arguments.Nodes
	case KindNewExpression:
		return node.AsNewExpression().Arguments.Nodes
	}
	panic("Unhandled case in Node.Arguments")
}

func (node *Node) ModifierFlags() ModifierFlags {
	modifiers := node.Modifiers()
	if modifiers != nil {
		return modifiers.ModifierFlags
	}
	return ModifierFlagsNone
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
func (n *Node) AsTypeReferenceNode() *TypeReferenceNode {
	return n.data.(*TypeReferenceNode)
}
func (n *Node) AsTypeQueryNode() *TypeQueryNode {
	return n.data.(*TypeQueryNode)
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
func (n *Node) AsTemplateExpression() *TemplateExpression {
	return n.data.(*TemplateExpression)
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
func (n *Node) AsEnumDeclaration() *EnumDeclaration {
	return n.data.(*EnumDeclaration)
}
func (n *Node) AsJSDocNullableType() *JSDocNullableType {
	return n.data.(*JSDocNullableType)
}
func (n *Node) AsTemplateLiteralTypeNode() *TemplateLiteralTypeNode {
	return n.data.(*TemplateLiteralTypeNode)
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
}

// NodeDefault

type NodeDefault struct {
	Node
}

func (node *NodeDefault) AsNode() *Node                             { return &node.Node }
func (node *NodeDefault) ForEachChild(v Visitor) bool               { return false }
func (node *NodeDefault) Name() *DeclarationName                    { return nil }
func (node *NodeDefault) Modifiers() *ModifierList                  { return nil }
func (node *NodeDefault) FlowNodeData() *FlowNodeBase               { return nil }
func (node *NodeDefault) DeclarationData() *DeclarationBase         { return nil }
func (node *NodeDefault) ExportableData() *ExportableBase           { return nil }
func (node *NodeDefault) LocalsContainerData() *LocalsContainerBase { return nil }
func (node *NodeDefault) FunctionLikeData() *FunctionLikeBase       { return nil }
func (node *NodeDefault) ClassLikeData() *ClassLikeBase             { return nil }
func (node *NodeDefault) BodyData() *BodyBase                       { return nil }

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
type TypeParameterListNode = Node
type TypeArgumentListNode = Node
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
	ReturnType     *TypeNode // Optional
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

// Token

type Token struct {
	NodeBase
}

func (f *NodeFactory) NewToken(kind Kind) *Node {
	return f.newNode(kind, f.tokenPool.New())
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
	return f.newNode(KindIdentifier, data)
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
	return f.newNode(KindPrivateIdentifier, data)
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
	return f.newNode(KindQualifiedName, data)
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
	return f.newNode(KindTypeParameter, data)
}

func (node *TypeParameterDeclaration) Kind() Kind {
	return KindTypeParameter
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
	return f.newNode(KindComputedPropertyName, data)
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
	return f.newNode(KindDecorator, data)
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
	return f.newNode(KindEmptyStatement, &EmptyStatement{})
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
	return f.newNode(KindIfStatement, data)
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
	return f.newNode(KindDoStatement, data)
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
	return f.newNode(KindWhileStatement, data)
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
	return f.newNode(KindForStatement, data)
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
	return f.newNode(kind, data)
}

func (node *ForInOrOfStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.AwaitModifier) || visit(v, node.Initializer) || visit(v, node.Expression) || visit(v, node.Statement)
}

func IsForInOrOfStatement(node *Node) bool {
	return node.Kind == KindForInStatement || node.Kind == KindForOfStatement
}

// BreakStatement

type BreakStatement struct {
	StatementBase
	Label *IdentifierNode // IdentifierNode. Optional
}

func (f *NodeFactory) NewBreakStatement(label *IdentifierNode) *Node {
	data := &BreakStatement{}
	data.Label = label
	return f.newNode(KindBreakStatement, data)
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
	return f.newNode(KindContinueStatement, data)
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
	return f.newNode(KindReturnStatement, data)
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
	return f.newNode(KindWithStatement, data)
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
	return f.newNode(KindSwitchStatement, data)
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
	return f.newNode(KindCaseBlock, data)
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
	return f.newNode(kind, data)
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
	return f.newNode(KindThrowStatement, data)
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
	return f.newNode(KindTryStatement, data)
}

func (node *TryStatement) Kind() Kind {
	return KindTryStatement
}

func (node *TryStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.TryBlock) || visit(v, node.CatchClause) || visit(v, node.FinallyBlock)
}

// CatchClause

type CatchClause struct {
	NodeBase
	LocalsContainerBase
	VariableDeclaration *VariableDeclarationNode // Optional
	Block               *BlockNode
}

func (f *NodeFactory) NewCatchClause(variableDeclaration *VariableDeclarationNode, block *BlockNode) *Node {
	data := &CatchClause{}
	data.VariableDeclaration = variableDeclaration
	data.Block = block
	return f.newNode(KindCatchClause, data)
}

func (node *CatchClause) ForEachChild(v Visitor) bool {
	return visit(v, node.VariableDeclaration) || visit(v, node.Block)
}

// DebuggerStatement

type DebuggerStatement struct {
	StatementBase
}

func (f *NodeFactory) NewDebuggerStatement() *Node {
	return f.newNode(KindDebuggerStatement, &DebuggerStatement{})
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
	return f.newNode(KindLabeledStatement, data)
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
	return f.newNode(KindExpressionStatement, data)
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
	return f.newNode(KindBlock, data)
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
	return f.newNode(KindVariableStatement, data)
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
	TypeNode         *TypeNode    // TypeNode. Optional
	Initializer      *Expression  // Expression. Optional
}

func (f *NodeFactory) NewVariableDeclaration(name *BindingName, exclamationToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	data := &VariableDeclaration{}
	data.name = name
	data.ExclamationToken = exclamationToken
	data.TypeNode = typeNode
	data.Initializer = initializer
	return f.newNode(KindVariableDeclaration, data)
}

func (node *VariableDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.ExclamationToken) || visit(v, node.TypeNode) || visit(v, node.Initializer)
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
	node := f.newNode(KindVariableDeclarationList, data)
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
	return f.newNode(kind, data)
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
	TypeNode       *TypeNode    // TypeNode. Optional
	Initializer    *Expression  // Expression. Optional
}

func (f *NodeFactory) NewParameterDeclaration(modifiers *ModifierList, dotDotDotToken *TokenNode, name *BindingName, questionToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	data := &ParameterDeclaration{}
	data.modifiers = modifiers
	data.DotDotDotToken = dotDotDotToken
	data.name = name
	data.QuestionToken = questionToken
	data.TypeNode = typeNode
	data.Initializer = initializer
	return f.newNode(KindParameter, data)
}

func (node *ParameterDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.DotDotDotToken) || visit(v, node.name) ||
		visit(v, node.QuestionToken) || visit(v, node.TypeNode) || visit(v, node.Initializer)
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
	return f.newNode(KindBindingElement, data)
}

func (node *BindingElement) ForEachChild(v Visitor) bool {
	return visit(v, node.PropertyName) || visit(v, node.DotDotDotToken) || visit(v, node.name) || visit(v, node.Initializer)
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
	return f.newNode(KindMissingDeclaration, data)
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
	data.ReturnType = returnType
	data.Body = body
	return f.newNode(KindFunctionDeclaration, data)
}

func (node *FunctionDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.AsteriskToken) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.Parameters) || visit(v, node.ReturnType) || visit(v, node.Body)
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
	return f.newNode(KindClassDeclaration, data)
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
	return f.newNode(KindClassExpression, data)
}

func (node *ClassExpression) Kind() Kind { return KindClassExpression }

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
	return f.newNode(KindHeritageClause, data)
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
	return f.newNode(KindInterfaceDeclaration, data)
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
	TypeNode       *TypeNode       // TypeNode
}

func (f *NodeFactory) NewTypeAliasDeclaration(modifiers *ModifierList, name *IdentifierNode, typeParameters *NodeList, typeNode *TypeNode) *Node {
	data := &TypeAliasDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.TypeParameters = typeParameters
	data.TypeNode = typeNode
	return f.newNode(KindTypeAliasDeclaration, data)
}

func (node *TypeAliasDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) || visit(v, node.TypeNode)
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
	return f.newNode(KindEnumMember, data)
}

func (node *EnumMember) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.Initializer)
}

func (node *EnumMember) Name() *DeclarationName {
	return node.name
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
	return f.newNode(KindEnumDeclaration, data)
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
	return f.newNode(KindModuleBlock, data)
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
	node := f.newNode(KindModuleDeclaration, data)
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
	return f.newNode(KindImportEqualsDeclaration, data)
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
	return f.newNode(KindImportDeclaration, data)
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
	return f.newNode(KindImportSpecifier, data)
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
	return f.newNode(KindExternalModuleReference, data)
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
	return f.newNode(KindImportClause, data)
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
	return f.newNode(KindNamespaceImport, data)
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
	Elements *NodeList // NodeList[*ImportSpecifierNode]
}

func (f *NodeFactory) NewNamedImports(elements *NodeList) *Node {
	data := &NamedImports{}
	data.Elements = elements
	return f.newNode(KindNamedImports, data)
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
	return f.newNode(KindExportAssignment, data)
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
	return f.newNode(KindNamespaceExportDeclaration, data)
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
	return f.newNode(KindExportDeclaration, data)
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
	return f.newNode(KindNamespaceExport, data)
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
	return f.newNode(KindNamedExports, data)
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
	return f.newNode(KindExportSpecifier, data)
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
	data.ReturnType = returnType
	return f.newNode(KindCallSignature, data)
}

func (node *CallSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.ReturnType)
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
	data.ReturnType = returnType
	return f.newNode(KindConstructSignature, data)
}

func (node *ConstructSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.ReturnType)
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
	data.ReturnType = returnType
	data.Body = body
	return f.newNode(KindConstructor, data)
}

func (node *ConstructorDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.ReturnType) || visit(v, node.Body)
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
		visit(v, node.ReturnType) || visit(v, node.Body)
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
	data.ReturnType = returnType
	data.Body = body
	return f.newNode(KindGetAccessor, data)
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
	data.ReturnType = returnType
	data.Body = body
	return f.newNode(KindSetAccessor, data)
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
	data.ReturnType = returnType
	return f.newNode(KindIndexSignature, data)
}

func (node *IndexSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.Parameters) || visit(v, node.ReturnType)
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
	data.ReturnType = returnType
	return f.newNode(KindMethodSignature, data)
}

func (node *MethodSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.Parameters) || visit(v, node.ReturnType)
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
	data.ReturnType = returnType
	data.Body = body
	return f.newNode(KindMethodDeclaration, data)
}

func (node *MethodDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.AsteriskToken) || visit(v, node.name) || visit(v, node.PostfixToken) ||
		visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.ReturnType) || visit(v, node.Body)
}

func IsMethodDeclaration(node *Node) bool {
	return node.Kind == KindMethodDeclaration
}

// PropertySignatureDeclaration

type PropertySignatureDeclaration struct {
	NodeBase
	NamedMemberBase
	TypeElementBase
	TypeNode    *TypeNode   // TypeNode
	Initializer *Expression // Expression. For error reporting purposes
}

func (f *NodeFactory) NewPropertySignatureDeclaration(modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	data := &PropertySignatureDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.PostfixToken = postfixToken
	data.TypeNode = typeNode
	data.Initializer = initializer
	return f.newNode(KindPropertySignature, data)
}

func (node *PropertySignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visit(v, node.TypeNode) || visit(v, node.Initializer)
}

func IsPropertySignatureDeclaration(node *Node) bool {
	return node.Kind == KindPropertySignature
}

// PropertyDeclaration

type PropertyDeclaration struct {
	NodeBase
	NamedMemberBase
	ClassElementBase
	TypeNode    *TypeNode   // TypeNode. Optional
	Initializer *Expression // Expression. Optional
}

func (f *NodeFactory) NewPropertyDeclaration(modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	data := &PropertyDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.PostfixToken = postfixToken
	data.TypeNode = typeNode
	data.Initializer = initializer
	return f.newNode(KindPropertyDeclaration, data)
}

func (node *PropertyDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visit(v, node.TypeNode) || visit(v, node.Initializer)
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
	return f.newNode(KindSemicolonClassElement, &SemicolonClassElement{})
}

// ClassStaticBlockDeclaration

type ClassStaticBlockDeclaration struct {
	NodeBase
	DeclarationBase
	ModifiersBase
	LocalsContainerBase
	ClassElementBase
	Body *BlockNode // BlockNode
}

func (f *NodeFactory) NewClassStaticBlockDeclaration(modifiers *ModifierList, body *BlockNode) *Node {
	data := &ClassStaticBlockDeclaration{}
	data.modifiers = modifiers
	data.Body = body
	return f.newNode(KindClassStaticBlockDeclaration, data)
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
	return f.newNode(KindOmittedExpression, &OmittedExpression{})
}

// KeywordExpression

type KeywordExpression struct {
	ExpressionBase
	FlowNodeBase // For 'this' and 'super' expressions
}

func (f *NodeFactory) NewKeywordExpression(kind Kind) *Node {
	return f.newNode(kind, &KeywordExpression{})
}

// LiteralLikeBase

type LiteralLikeBase struct {
	Text string
}

// StringLiteral

type StringLiteral struct {
	ExpressionBase
	LiteralLikeBase
}

func (f *NodeFactory) NewStringLiteral(text string) *Node {
	data := &StringLiteral{}
	data.Text = text
	return f.newNode(KindStringLiteral, data)
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
	return f.newNode(KindNumericLiteral, data)
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
	return f.newNode(KindBigIntLiteral, data)
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
	return f.newNode(KindRegularExpressionLiteral, data)
}

// NoSubstitutionTemplateLiteral

type NoSubstitutionTemplateLiteral struct {
	ExpressionBase
	TemplateLiteralLikeBase
}

func (f *NodeFactory) NewNoSubstitutionTemplateLiteral(text string) *Node {
	data := &NoSubstitutionTemplateLiteral{}
	data.Text = text
	return f.newNode(KindNoSubstitutionTemplateLiteral, data)
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
	return f.newNode(KindBinaryExpression, data)
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
	return f.newNode(KindPrefixUnaryExpression, data)
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
	return f.newNode(KindPostfixUnaryExpression, data)
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
	return f.newNode(KindYieldExpression, data)
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
	data.ReturnType = returnType
	data.EqualsGreaterThanToken = equalsGreaterThanToken
	data.Body = body
	return f.newNode(KindArrowFunction, data)
}

func (node *ArrowFunction) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) ||
		visit(v, node.ReturnType) || visit(v, node.EqualsGreaterThanToken) || visit(v, node.Body)
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
	data.ReturnType = returnType
	data.Body = body
	return f.newNode(KindFunctionExpression, data)
}

func (node *FunctionExpression) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.AsteriskToken) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.Parameters) || visit(v, node.ReturnType) || visit(v, node.Body)
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
	TypeNode   *TypeNode   // TypeNode
}

func (f *NodeFactory) NewAsExpression(expression *Expression, typeNode *TypeNode) *Node {
	data := &AsExpression{}
	data.Expression = expression
	data.TypeNode = typeNode
	return f.newNode(KindAsExpression, data)
}

func (node *AsExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.TypeNode)
}

// SatisfiesExpression

type SatisfiesExpression struct {
	ExpressionBase
	Expression *Expression // Expression
	TypeNode   *TypeNode   // TypeNode
}

func (f *NodeFactory) NewSatisfiesExpression(expression *Expression, typeNode *TypeNode) *Node {
	data := &SatisfiesExpression{}
	data.Expression = expression
	data.TypeNode = typeNode
	return f.newNode(KindSatisfiesExpression, data)
}

func (node *SatisfiesExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.TypeNode)
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
	return f.newNode(KindConditionalExpression, data)
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
	node := f.newNode(KindPropertyAccessExpression, data)
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
	node := f.newNode(KindElementAccessExpression, data)
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
	node := f.newNode(KindCallExpression, data)
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
	return f.newNode(KindNewExpression, data)
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
	return f.newNode(KindMetaProperty, data)
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
	return f.newNode(KindNonNullExpression, data)
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
	return f.newNode(KindSpreadElement, data)
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
	return f.newNode(KindTemplateExpression, data)
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
	return f.newNode(KindTemplateSpan, data)
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
	node := f.newNode(KindTaggedTemplateExpression, data)
	node.Flags |= flags & NodeFlagsOptionalChain
	return node
}

func (node *TaggedTemplateExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Tag) || visit(v, node.QuestionDotToken) || visitNodeList(v, node.TypeArguments) || visit(v, node.Template)
}

// ParenthesizedExpression

type ParenthesizedExpression struct {
	ExpressionBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewParenthesizedExpression(expression *Expression) *Node {
	data := &ParenthesizedExpression{}
	data.Expression = expression
	return f.newNode(KindParenthesizedExpression, data)
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
	return f.newNode(KindArrayLiteralExpression, data)
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
	return f.newNode(KindObjectLiteralExpression, data)
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
	return f.newNode(KindSpreadAssignment, data)
}

func (node *SpreadAssignment) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
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
	return f.newNode(KindPropertyAssignment, data)
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
	return f.newNode(KindShorthandPropertyAssignment, data)
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
	return f.newNode(KindDeleteExpression, data)
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
	return f.newNode(KindTypeOfExpression, data)
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
	return f.newNode(KindVoidExpression, data)
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
	return f.newNode(KindAwaitExpression, data)
}

func (node *AwaitExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

// TypeAssertion

type TypeAssertion struct {
	ExpressionBase
	TypeNode   *TypeNode   // TypeNode
	Expression *Expression // Expression
}

func (f *NodeFactory) NewTypeAssertion(typeNode *TypeNode, expression *Expression) *Node {
	data := &TypeAssertion{}
	data.TypeNode = typeNode
	data.Expression = expression
	return f.newNode(KindTypeAssertionExpression, data)
}

func (node *TypeAssertion) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeNode) || visit(v, node.Expression)
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
	return f.newNode(kind, &KeywordTypeNode{})
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
	return f.newNode(KindUnionType, data)
}

// IntersectionTypeNode

type IntersectionTypeNode struct {
	UnionOrIntersectionTypeNodeBase
}

func (f *NodeFactory) NewIntersectionTypeNode(types *NodeList) *Node {
	data := &IntersectionTypeNode{}
	data.Types = types
	return f.newNode(KindIntersectionType, data)
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
	return f.newNode(KindConditionalType, data)
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
	TypeNode *TypeNode // TypeNode
}

func (f *NodeFactory) NewTypeOperatorNode(operator Kind, typeNode *TypeNode) *Node {
	data := &TypeOperatorNode{}
	data.Operator = operator
	data.TypeNode = typeNode
	return f.newNode(KindTypeOperator, data)
}

func (node *TypeOperatorNode) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeNode)
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
	return f.newNode(KindInferType, data)
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
	return f.newNode(KindArrayType, data)
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
	return f.newNode(KindIndexedAccessType, data)
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
	return f.newNode(KindTypeReference, data)
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
	return f.newNode(KindExpressionWithTypeArguments, data)
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
	return f.newNode(KindLiteralType, data)
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
	return f.newNode(KindThisType, &ThisTypeNode{})
}

func IsThisTypeNode(node *Node) bool {
	return node.Kind == KindThisType
}

// TypePredicateNode

type TypePredicateNode struct {
	TypeNodeBase
	AssertsModifier *TokenNode                  // TokenNode. Optional
	ParameterName   *TypePredicateParameterName // TypePredicateParameterName (Identifier | ThisTypeNode)
	TypeNode        *TypeNode                   // TypeNode. Optional
}

func (f *NodeFactory) NewTypePredicateNode(assertsModifier *TokenNode, parameterName *TypePredicateParameterName, typeNode *TypeNode) *Node {
	data := &TypePredicateNode{}
	data.AssertsModifier = assertsModifier
	data.ParameterName = parameterName
	data.TypeNode = typeNode
	return f.newNode(KindTypePredicate, data)
}

func (node *TypePredicateNode) ForEachChild(v Visitor) bool {
	return visit(v, node.AssertsModifier) || visit(v, node.ParameterName) || visit(v, node.TypeNode)
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
	return f.newNode(KindImportType, data)
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
	return f.newNode(KindImportAttribute, data)
}

func (node *ImportAttribute) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.Value)
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
	return f.newNode(KindImportAttributes, data)
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
	return f.newNode(KindTypeQuery, data)
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
	TypeNode      *TypeNode                     // TypeNode. Optional (error if missing)
	Members       *NodeList                     // NodeList[*TypeElement]. Used only to produce grammar errors
}

func (f *NodeFactory) NewMappedTypeNode(readonlyToken *TokenNode, typeParameter *TypeParameterDeclarationNode, nameType *TypeNode, questionToken *TokenNode, typeNode *TypeNode, members *NodeList) *Node {
	data := &MappedTypeNode{}
	data.ReadonlyToken = readonlyToken
	data.TypeParameter = typeParameter
	data.NameType = nameType
	data.QuestionToken = questionToken
	data.TypeNode = typeNode
	data.Members = members
	return f.newNode(KindMappedType, data)
}

func (node *MappedTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.ReadonlyToken) || visit(v, node.TypeParameter) || visit(v, node.NameType) ||
		visit(v, node.QuestionToken) || visit(v, node.TypeNode) || visitNodeList(v, node.Members)
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
	return f.newNode(KindTypeLiteral, data)
}

func (node *TypeLiteralNode) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Members)
}

// TupleTypeNode

type TupleTypeNode struct {
	TypeNodeBase
	Elements *NodeList // NodeList[*TypeNode]
}

func (f *NodeFactory) NewTupleTypeNode(elements *NodeList) *Node {
	data := &TupleTypeNode{}
	data.Elements = elements
	return f.newNode(KindTupleType, data)
}

func (node *TupleTypeNode) Kind() Kind {
	return KindTupleType
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
	TypeNode       *TypeNode       // TypeNode
}

func (f *NodeFactory) NewNamedTupleTypeMember(dotDotDotToken *TokenNode, name *IdentifierNode, questionToken *TokenNode, typeNode *TypeNode) *Node {
	data := &NamedTupleMember{}
	data.DotDotDotToken = dotDotDotToken
	data.name = name
	data.QuestionToken = questionToken
	data.TypeNode = typeNode
	return f.newNode(KindNamedTupleMember, data)
}

func (node *NamedTupleMember) ForEachChild(v Visitor) bool {
	return visit(v, node.DotDotDotToken) || visit(v, node.name) || visit(v, node.QuestionToken) || visit(v, node.TypeNode)
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
	TypeNode *TypeNode // TypeNode
}

func (f *NodeFactory) NewOptionalTypeNode(typeNode *TypeNode) *Node {
	data := &OptionalTypeNode{}
	data.TypeNode = typeNode
	return f.newNode(KindOptionalType, data)
}

func (node *OptionalTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeNode)
}

// RestTypeNode

type RestTypeNode struct {
	TypeNodeBase
	TypeNode *TypeNode // TypeNode
}

func (f *NodeFactory) NewRestTypeNode(typeNode *TypeNode) *Node {
	data := &RestTypeNode{}
	data.TypeNode = typeNode
	return f.newNode(KindRestType, data)
}

func (node *RestTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeNode)
}

// ParenthesizedTypeNode

type ParenthesizedTypeNode struct {
	TypeNodeBase
	TypeNode *TypeNode // TypeNode
}

func (f *NodeFactory) NewParenthesizedTypeNode(typeNode *TypeNode) *Node {
	data := &ParenthesizedTypeNode{}
	data.TypeNode = typeNode
	return f.newNode(KindParenthesizedType, data)
}

func (node *ParenthesizedTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeNode)
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
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.ReturnType)
}

// FunctionTypeNode

type FunctionTypeNode struct {
	FunctionOrConstructorTypeNodeBase
}

func (f *NodeFactory) NewFunctionTypeNode(typeParameters *NodeList, parameters *NodeList, returnType *TypeNode) *Node {
	data := &FunctionTypeNode{}
	data.TypeParameters = typeParameters
	data.Parameters = parameters
	data.ReturnType = returnType
	return f.newNode(KindFunctionType, data)
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
	data.ReturnType = returnType
	return f.newNode(KindConstructorType, data)
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
	return f.newNode(KindTemplateHead, data)
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
	return f.newNode(KindTemplateMiddle, data)
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
	return f.newNode(KindTemplateTail, data)
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
	return f.newNode(KindTemplateLiteralType, data)
}

func (node *TemplateLiteralTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Head) || visitNodeList(v, node.TemplateSpans)
}

// TemplateLiteralTypeSpan

type TemplateLiteralTypeSpan struct {
	NodeBase
	TypeNode *TypeNode             // TypeNode
	Literal  *TemplateMiddleOrTail // TemplateMiddleOrTail
}

func (f *NodeFactory) NewTemplateLiteralTypeSpan(typeNode *TypeNode, literal *TemplateMiddleOrTail) *Node {
	data := &TemplateLiteralTypeSpan{}
	data.TypeNode = typeNode
	data.Literal = literal
	return f.newNode(KindTemplateLiteralTypeSpan, data)
}

func (node *TemplateLiteralTypeSpan) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeNode) || visit(v, node.Literal)
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
	return f.newNode(KindJsxElement, data)
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
	return f.newNode(KindJsxAttributes, data)
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
	return f.newNode(KindJsxNamespacedName, data)
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
	return f.newNode(KindJsxOpeningElement, data)
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
	return f.newNode(KindJsxSelfClosingElement, data)
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
	return f.newNode(KindJsxFragment, data)
}

func (node *JsxFragment) ForEachChild(v Visitor) bool {
	return visit(v, node.OpeningFragment) || visitNodeList(v, node.Children) || visit(v, node.ClosingFragment)
}

/// The opening element of a <>...</> JsxFragment

type JsxOpeningFragment struct {
	ExpressionBase
}

func (f *NodeFactory) NewJsxOpeningFragment() *Node {
	return f.newNode(KindJsxOpeningFragment, &JsxOpeningFragment{})
}

func IsJsxOpeningFragment(node *Node) bool {
	return node.Kind == KindJsxOpeningFragment
}

/// The closing element of a <>...</> JsxFragment

type JsxClosingFragment struct {
	ExpressionBase
}

func (f *NodeFactory) NewJsxClosingFragment() *Node {
	return f.newNode(KindJsxClosingFragment, &JsxClosingFragment{})
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
	return f.newNode(KindJsxAttribute, data)
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
	return f.newNode(KindJsxSpreadAttribute, data)
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
	return f.newNode(KindJsxClosingElement, data)
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
	return f.newNode(KindJsxExpression, data)
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
	return f.newNode(KindJsxText, data)
}

// JSDocNonNullableType

type JSDocNonNullableType struct {
	TypeNodeBase
	TypeNode *TypeNode // TypeNode
	Postfix  bool
}

func (f *NodeFactory) NewJSDocNonNullableType(typeNode *TypeNode, postfix bool) *Node {
	data := &JSDocNonNullableType{}
	data.TypeNode = typeNode
	data.Postfix = postfix
	return f.newNode(KindJSDocNonNullableType, data)
}

func (node *JSDocNonNullableType) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeNode)
}

// JSDocNullableType

type JSDocNullableType struct {
	TypeNodeBase
	TypeNode *TypeNode // TypeNode
	Postfix  bool
}

func (f *NodeFactory) NewJSDocNullableType(typeNode *TypeNode, postfix bool) *Node {
	data := &JSDocNullableType{}
	data.TypeNode = typeNode
	data.Postfix = postfix
	return f.newNode(KindJSDocNullableType, data)
}

func (node *JSDocNullableType) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeNode)
}

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
	path                        string
	Statements                  *NodeList // NodeList[*Statement]
	diagnostics                 []*Diagnostic
	bindDiagnostics             []*Diagnostic
	BindSuggestionDiagnostics   []*Diagnostic
	LineMap                     []core.TextPos
	LanguageVersion             core.ScriptTarget
	LanguageVariant             core.LanguageVariant
	ScriptKind                  core.ScriptKind
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
}

func (f *NodeFactory) NewSourceFile(text string, fileName string, statements *NodeList) *Node {
	data := &SourceFile{}
	data.Text = text
	data.fileName = fileName
	data.Statements = statements
	data.LanguageVersion = core.ScriptTargetLatest
	return f.newNode(KindSourceFile, data)
}

func (node *SourceFile) FileName() string {
	return node.fileName
}

func (node *SourceFile) Path() string {
	return node.path
}

func (node *SourceFile) SetPath(p string) {
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
