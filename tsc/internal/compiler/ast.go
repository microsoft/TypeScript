package compiler

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

// NodeFactory

type NodeFactory struct {
	identifierPool Pool[Identifier]
}

func (f *NodeFactory) NewNode(kind SyntaxKind, data NodeData) *Node {
	n := data.AsNode()
	n.kind = kind
	n.data = data
	return n
}

// AST Node
// Interface values stored in AST nodes are never typed nil values. Construction code must ensure that
// interface valued properties either store a true nil or a reference to a non-nil struct.

type Node struct {
	kind   SyntaxKind
	flags  NodeFlags
	loc    TextRange
	id     NodeId
	parent *Node
	data   NodeData
}

// Node accessors

func (n *Node) Pos() int                                  { return n.loc.Pos() }
func (n *Node) End() int                                  { return n.loc.End() }
func (n *Node) ForEachChild(v Visitor) bool               { return n.data.ForEachChild(v) }
func (n *Node) Symbol() *Symbol                           { return n.data.Symbol() }
func (n *Node) LocalSymbol() *Symbol                      { return n.data.LocalSymbol() }
func (n *Node) Modifiers() *ModifierListNode              { return n.data.Modifiers() }
func (n *Node) Name() *DeclarationName                    { return n.data.Name() }
func (n *Node) FlowNodeData() *FlowNodeBase               { return n.data.FlowNodeData() }
func (n *Node) DeclarationData() *DeclarationBase         { return n.data.DeclarationData() }
func (n *Node) ExportableData() *ExportableBase           { return n.data.ExportableData() }
func (n *Node) LocalsContainerData() *LocalsContainerBase { return n.data.LocalsContainerData() }
func (n *Node) FunctionLikeData() *FunctionLikeBase       { return n.data.FunctionLikeData() }
func (n *Node) ClassLikeData() *ClassLikeBase             { return n.data.ClassLikeData() }
func (n *Node) BodyData() *BodyBase                       { return n.data.BodyData() }

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
func (n *Node) AsModifierList() *ModifierList {
	return n.data.(*ModifierList)
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
func (n *Node) AsBigintLiteral() *BigintLiteral {
	return n.data.(*BigintLiteral)
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
func (n *Node) AsTypeArgumentList() *TypeArgumentList {
	return n.data.(*TypeArgumentList)
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
func (n *Node) AsTypeParameterList() *TypeParameterList {
	return n.data.(*TypeParameterList)
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

// NodeData

type NodeData interface {
	AsNode() *Node
	ForEachChild(v Visitor) bool
	Symbol() *Symbol
	LocalSymbol() *Symbol
	Modifiers() *ModifierListNode
	Name() *DeclarationName
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
func (node *NodeDefault) Symbol() *Symbol                           { return nil }
func (node *NodeDefault) LocalSymbol() *Symbol                      { return nil }
func (node *NodeDefault) Modifiers() *ModifierListNode              { return nil }
func (node *NodeDefault) Name() *DeclarationName                    { return nil }
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
type JsxAttributeLike = Node            // JsxAttribute | JsxSpreadAttribute
type JsxAttributeName = Node            // Identifier | JsxNamespacedName
type ClassLikeDeclaration = Node        // ClassDeclaration | ClassExpression
type AccessorDeclaration = Node         // GetAccessorDeclaration | SetAccessorDeclaration
type LiteralLikeNode = Node             // StringLiteral | NumericLiteral | BigintLiteral | RegularExpressionLiteral | TemplateLiteralLikeNode | JsxText
type LiteralExpression = Node           // StringLiteral | NumericLiteral | BigintLiteral | RegularExpressionLiteral | NoSubstitutionTemplateLiteral
type UnionOrIntersectionTypeNode = Node // UnionTypeNode | IntersectionTypeNode
type TemplateLiteralLikeNode = Node     // TemplateHead | TemplateMiddle | TemplateTail
type TemplateMiddleOrTail = Node        // TemplateMiddle | TemplateTail

// Aliases for node signletons

type IdentifierNode = Node
type ModifierListNode = Node
type TokenNode = Node
type BlockNode = Node
type CatchClauseNode = Node
type CaseBlockNode = Node
type CaseOrDefaultClauseNode = Node
type VariableDeclarationNode = Node
type VariableDeclarationListNode = Node
type BindingElementNode = Node
type TypeParameterListNode = Node
type ParameterDeclarationNode = Node
type HeritageClauseNode = Node
type ExpressionWithTypeArgumentsNode = Node
type EnumMemberNode = Node
type ImportClauseNode = Node
type ImportAttributesNode = Node
type ImportSpecifierNode = Node
type ExportSpecifierNode = Node

// DeclarationBase

type DeclarationBase struct {
	symbol *Symbol // Symbol declared by node (initialized by binding)
}

func (node *DeclarationBase) Symbol() *Symbol                   { return node.symbol }
func (node *DeclarationBase) DeclarationData() *DeclarationBase { return node }

// DeclarationBase

type ExportableBase struct {
	localSymbol *Symbol // Local symbol declared by node (initialized by binding only for exported nodes)
}

func (node *ExportableBase) LocalSymbol() *Symbol            { return node.localSymbol }
func (node *ExportableBase) ExportableData() *ExportableBase { return node }

// ModifiersBase

type ModifiersBase struct {
	modifiers *ModifierListNode
}

func (node *ModifiersBase) Modifiers() *ModifierListNode { return node.modifiers }

// LocalsContainerBase

type LocalsContainerBase struct {
	locals        SymbolTable // Locals associated with node (initialized by binding)
	nextContainer *Node       // Next container in declaration order (initialized by binding)
}

func (node *LocalsContainerBase) LocalsContainerData() *LocalsContainerBase { return node }

func isLocalsContainer(node *Node) bool {
	return node.LocalsContainerData() != nil
}

// FunctionLikeBase

type FunctionLikeBase struct {
	LocalsContainerBase
	typeParameters *TypeParameterListNode // Optional
	parameters     []*ParameterDeclarationNode
	returnType     *TypeNode // Optional
}

func (node *FunctionLikeBase) LocalsContainerData() *LocalsContainerBase {
	return &node.LocalsContainerBase
}
func (node *FunctionLikeBase) FunctionLikeData() *FunctionLikeBase { return node }
func (node *FunctionLikeBase) BodyData() *BodyBase                 { return nil }

// BodyBase

type BodyBase struct {
	asteriskToken *TokenNode
	body          *BlockOrExpression // Optional, can be Expression only in arrow functions
	endFlowNode   *FlowNode
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
	flowNode *FlowNode
}

func (node *FlowNodeBase) FlowNodeData() *FlowNodeBase { return node }

// Token

type Token struct {
	NodeBase
}

func (f *NodeFactory) NewToken(kind SyntaxKind) *Node {
	return f.NewNode(kind, &Token{})
}

// Identifier

type Identifier struct {
	ExpressionBase
	FlowNodeBase
	text string
}

func (f *NodeFactory) NewIdentifier(text string) *Node {
	data := f.identifierPool.New()
	data.text = text
	return f.NewNode(SyntaxKindIdentifier, data)
}

func isIdentifier(node *Node) bool {
	return node.kind == SyntaxKindIdentifier
}

// PrivateIdentifier

type PrivateIdentifier struct {
	ExpressionBase
	text string
}

func (f *NodeFactory) NewPrivateIdentifier(text string) *Node {
	data := &PrivateIdentifier{}
	data.text = text
	return f.NewNode(SyntaxKindPrivateIdentifier, data)
}

func isPrivateIdentifier(node *Node) bool {
	return node.kind == SyntaxKindPrivateIdentifier
}

// QualifiedName

type QualifiedName struct {
	NodeBase
	FlowNodeBase
	left  *EntityName
	right *IdentifierNode
}

func (f *NodeFactory) NewQualifiedName(left *EntityName, right *IdentifierNode) *Node {
	data := &QualifiedName{}
	data.left = left
	data.right = right
	return f.NewNode(SyntaxKindQualifiedName, data)
}

func (node *QualifiedName) ForEachChild(v Visitor) bool {
	return visit(v, node.left) || visit(v, node.right)
}

func isQualifiedName(node *Node) bool {
	return node.kind == SyntaxKindQualifiedName
}

// TypeParameterDeclaration

type TypeParameterDeclaration struct {
	NodeBase
	DeclarationBase
	ModifiersBase
	name        *IdentifierNode // Identifier
	constraint  *TypeNode       // Optional
	defaultType *TypeNode       // Optional
	expression  *Node           // For error recovery purposes
}

func (f *NodeFactory) NewTypeParameterDeclaration(modifiers *Node, name *IdentifierNode, constraint *TypeNode, defaultType *TypeNode) *Node {
	data := &TypeParameterDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.constraint = constraint
	data.defaultType = defaultType
	return f.NewNode(SyntaxKindTypeParameter, data)
}

func (node *TypeParameterDeclaration) Kind() SyntaxKind {
	return SyntaxKindTypeParameter
}

func (node *TypeParameterDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.constraint) || visit(v, node.defaultType)
}

func (node *TypeParameterDeclaration) Name() *DeclarationName {
	return node.name
}

func isTypeParameterDeclaration(node *Node) bool {
	return node.kind == SyntaxKindTypeParameter
}

// ComputedPropertyName

type ComputedPropertyName struct {
	NodeBase
	expression *Node
}

func (f *NodeFactory) NewComputedPropertyName(expression *Node) *Node {
	data := &ComputedPropertyName{}
	data.expression = expression
	return f.NewNode(SyntaxKindComputedPropertyName, data)
}

func (node *ComputedPropertyName) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

func isComputedPropertyName(node *Node) bool {
	return node.kind == SyntaxKindComputedPropertyName
}

// Modifier

func (f *NodeFactory) NewModifier(kind SyntaxKind) *Node {
	return f.NewToken(kind)
}

// Decorator

type Decorator struct {
	NodeBase
	expression *Node
}

func (f *NodeFactory) NewDecorator(expression *Node) *Node {
	data := &Decorator{}
	data.expression = expression
	return f.NewNode(SyntaxKindDecorator, data)
}

func (node *Decorator) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

// ModifierList

type ModifierList struct {
	NodeBase
	modifiers     []*ModifierLike
	modifierFlags ModifierFlags
}

func (f *NodeFactory) NewModifierList(modifiers []*ModifierLike, modifierFlags ModifierFlags) *Node {
	data := &ModifierList{}
	data.modifiers = modifiers
	data.modifierFlags = modifierFlags
	return f.NewNode(SyntaxKindModifierList, data)
}

func (node *ModifierList) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.modifiers)
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
	return f.NewNode(SyntaxKindEmptyStatement, &EmptyStatement{})
}

func isEmptyStatement(node *Node) bool {
	return node.kind == SyntaxKindEmptyStatement
}

// IfStatement

type IfStatement struct {
	StatementBase
	expression    *Node
	thenStatement *Statement
	elseStatement *Statement // Optional
}

func (f *NodeFactory) NewIfStatement(expression *Node, thenStatement *Statement, elseStatement *Statement) *Node {
	data := &IfStatement{}
	data.expression = expression
	data.thenStatement = thenStatement
	data.elseStatement = elseStatement
	return f.NewNode(SyntaxKindIfStatement, data)
}

func (node *IfStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.thenStatement) || visit(v, node.elseStatement)
}

// DoStatement

type DoStatement struct {
	StatementBase
	statement  *Statement
	expression *Node
}

func (f *NodeFactory) NewDoStatement(statement *Statement, expression *Node) *Node {
	data := &DoStatement{}
	data.statement = statement
	data.expression = expression
	return f.NewNode(SyntaxKindDoStatement, data)
}

func (node *DoStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.statement) || visit(v, node.expression)
}

// WhileStatement

type WhileStatement struct {
	StatementBase
	expression *Node
	statement  *Statement
}

func (f *NodeFactory) NewWhileStatement(expression *Node, statement *Statement) *Node {
	data := &WhileStatement{}
	data.expression = expression
	data.statement = statement
	return f.NewNode(SyntaxKindWhileStatement, data)
}

func (node *WhileStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.statement)
}

// ForStatement

type ForStatement struct {
	StatementBase
	LocalsContainerBase
	initializer *ForInitializer // Optional
	condition   *Node           // Optional
	incrementor *Node           // Optional
	statement   *Statement
}

func (f *NodeFactory) NewForStatement(initializer *ForInitializer, condition *Node, incrementor *Node, statement *Statement) *Node {
	data := &ForStatement{}
	data.initializer = initializer
	data.condition = condition
	data.incrementor = incrementor
	data.statement = statement
	return f.NewNode(SyntaxKindForStatement, data)
}

func (node *ForStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.initializer) || visit(v, node.condition) || visit(v, node.incrementor) || visit(v, node.statement)
}

// ForInOrOfStatement

type ForInOrOfStatement struct {
	StatementBase
	LocalsContainerBase
	kind          SyntaxKind // SyntaxKindForInStatement | SyntaxKindForOfStatement
	awaitModifier *Node      // Optional
	initializer   *ForInitializer
	expression    *Node
	statement     *Statement
}

func (f *NodeFactory) NewForInOrOfStatement(kind SyntaxKind, awaitModifier *Node, initializer *ForInitializer, expression *Node, statement *Statement) *Node {
	data := &ForInOrOfStatement{}
	data.kind = kind
	data.awaitModifier = awaitModifier
	data.initializer = initializer
	data.expression = expression
	data.statement = statement
	return f.NewNode(kind, data)
}

func (node *ForInOrOfStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.awaitModifier) || visit(v, node.initializer) || visit(v, node.expression) || visit(v, node.statement)
}

func isForInOrOfStatement(node *Node) bool {
	return node.kind == SyntaxKindForInStatement || node.kind == SyntaxKindForOfStatement
}

// BreakStatement

type BreakStatement struct {
	StatementBase
	label *IdentifierNode // Optional
}

func (f *NodeFactory) NewBreakStatement(label *IdentifierNode) *Node {
	data := &BreakStatement{}
	data.label = label
	return f.NewNode(SyntaxKindBreakStatement, data)
}

func (node *BreakStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.label)
}

// ContinueStatement

type ContinueStatement struct {
	StatementBase
	label *IdentifierNode // Optional
}

func (f *NodeFactory) NewContinueStatement(label *IdentifierNode) *Node {
	data := &ContinueStatement{}
	data.label = label
	return f.NewNode(SyntaxKindContinueStatement, data)
}

func (node *ContinueStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.label)
}

// ReturnStatement

type ReturnStatement struct {
	StatementBase
	expression *Node // Optional
}

func (f *NodeFactory) NewReturnStatement(expression *Node) *Node {
	data := &ReturnStatement{}
	data.expression = expression
	return f.NewNode(SyntaxKindReturnStatement, data)
}

func (node *ReturnStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

// WithStatement

type WithStatement struct {
	StatementBase
	expression *Node
	statement  *Statement
}

func (f *NodeFactory) NewWithStatement(expression *Node, statement *Statement) *Node {
	data := &WithStatement{}
	data.expression = expression
	data.statement = statement
	return f.NewNode(SyntaxKindWithStatement, data)
}

func (node *WithStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.statement)
}

// SwitchStatement

type SwitchStatement struct {
	StatementBase
	expression *Node
	caseBlock  *CaseBlockNode
}

func (f *NodeFactory) NewSwitchStatement(expression *Node, caseBlock *CaseBlockNode) *Node {
	data := &SwitchStatement{}
	data.expression = expression
	data.caseBlock = caseBlock
	return f.NewNode(SyntaxKindSwitchStatement, data)
}

func (node *SwitchStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.caseBlock)
}

// CaseBlock

type CaseBlock struct {
	NodeBase
	LocalsContainerBase
	clauses []*CaseOrDefaultClauseNode
}

func (f *NodeFactory) NewCaseBlock(clauses []*CaseOrDefaultClauseNode) *Node {
	data := &CaseBlock{}
	data.clauses = clauses
	return f.NewNode(SyntaxKindCaseBlock, data)
}

func (node *CaseBlock) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.clauses)
}

// CaseOrDefaultClause

type CaseOrDefaultClause struct {
	NodeBase
	expression          *Node // nil in default clause
	statements          []*Statement
	fallthroughFlowNode *FlowNode
}

func (f *NodeFactory) NewCaseOrDefaultClause(kind SyntaxKind, expression *Node, statements []*Statement) *Node {
	data := &CaseOrDefaultClause{}
	data.expression = expression
	data.statements = statements
	return f.NewNode(kind, data)
}

func (node *CaseOrDefaultClause) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visitNodes(v, node.statements)
}

// ThrowStatement

type ThrowStatement struct {
	StatementBase
	expression *Node
}

func (f *NodeFactory) NewThrowStatement(expression *Node) *Node {
	data := &ThrowStatement{}
	data.expression = expression
	return f.NewNode(SyntaxKindThrowStatement, data)
}

func (node *ThrowStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

// TryStatement

type TryStatement struct {
	StatementBase
	tryBlock     *BlockNode
	catchClause  *CatchClauseNode // Optional
	finallyBlock *BlockNode       // Optional
}

func (f *NodeFactory) NewTryStatement(tryBlock *BlockNode, catchClause *CatchClauseNode, finallyBlock *BlockNode) *Node {
	data := &TryStatement{}
	data.tryBlock = tryBlock
	data.catchClause = catchClause
	data.finallyBlock = finallyBlock
	return f.NewNode(SyntaxKindTryStatement, data)
}

func (node *TryStatement) Kind() SyntaxKind {
	return SyntaxKindTryStatement
}

func (node *TryStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.tryBlock) || visit(v, node.catchClause) || visit(v, node.finallyBlock)
}

// CatchClause

type CatchClause struct {
	NodeBase
	LocalsContainerBase
	variableDeclaration *VariableDeclarationNode // Optional
	block               *BlockNode
}

func (f *NodeFactory) NewCatchClause(variableDeclaration *VariableDeclarationNode, block *BlockNode) *Node {
	data := &CatchClause{}
	data.variableDeclaration = variableDeclaration
	data.block = block
	return f.NewNode(SyntaxKindCatchClause, data)
}

func (node *CatchClause) ForEachChild(v Visitor) bool {
	return visit(v, node.variableDeclaration) || visit(v, node.block)
}

// DebuggerStatement

type DebuggerStatement struct {
	StatementBase
}

func (f *NodeFactory) NewDebuggerStatement() *Node {
	return f.NewNode(SyntaxKindDebuggerStatement, &DebuggerStatement{})
}

// LabeledStatement

type LabeledStatement struct {
	StatementBase
	label     *IdentifierNode
	statement *Statement
}

func (f *NodeFactory) NewLabeledStatement(label *IdentifierNode, statement *Statement) *Node {
	data := &LabeledStatement{}
	data.label = label
	data.statement = statement
	return f.NewNode(SyntaxKindLabeledStatement, data)
}

func (node *LabeledStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.label) || visit(v, node.statement)
}

// ExpressionStatement

type ExpressionStatement struct {
	StatementBase
	expression *Node
}

func (f *NodeFactory) NewExpressionStatement(expression *Node) *Node {
	data := &ExpressionStatement{}
	data.expression = expression
	return f.NewNode(SyntaxKindExpressionStatement, data)
}

func (node *ExpressionStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

func isExpressionStatement(node *Node) bool {
	return node.kind == SyntaxKindExpressionStatement
}

// Block

type Block struct {
	StatementBase
	LocalsContainerBase
	statements []*Statement
	multiline  bool
}

func (f *NodeFactory) NewBlock(statements []*Statement, multiline bool) *Node {
	data := &Block{}
	data.statements = statements
	data.multiline = multiline
	return f.NewNode(SyntaxKindBlock, data)
}

func (node *Block) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.statements)
}

func isBlock(node *Node) bool {
	return node.kind == SyntaxKindBlock
}

// VariableStatement

type VariableStatement struct {
	StatementBase
	ModifiersBase
	declarationList *VariableDeclarationListNode
}

func (f *NodeFactory) NewVariableStatement(modifiers *ModifierListNode, declarationList *VariableDeclarationListNode) *Node {
	data := &VariableStatement{}
	data.modifiers = modifiers
	data.declarationList = declarationList
	return f.NewNode(SyntaxKindVariableStatement, data)
}

func (node *VariableStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.declarationList)
}

func isVariableStatement(node *Node) bool {
	return node.kind == SyntaxKindVariableStatement
}

// VariableDeclaration

type VariableDeclaration struct {
	NodeBase
	DeclarationBase
	ExportableBase
	name             *BindingName
	exclamationToken *TokenNode // Optional
	typeNode         *TypeNode  // Optional
	initializer      *Node      // Optional
}

func (f *NodeFactory) NewVariableDeclaration(name *BindingName, exclamationToken *TokenNode, typeNode *TypeNode, initializer *Node) *Node {
	data := &VariableDeclaration{}
	data.name = name
	data.exclamationToken = exclamationToken
	data.typeNode = typeNode
	data.initializer = initializer
	return f.NewNode(SyntaxKindVariableDeclaration, data)
}

func (node *VariableDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.exclamationToken) || visit(v, node.typeNode) || visit(v, node.initializer)
}

func (node *VariableDeclaration) Name() *DeclarationName {
	return node.name
}

func isVariableDeclaration(node *Node) bool {
	return node.kind == SyntaxKindVariableDeclaration
}

// VariableDeclarationList

type VariableDeclarationList struct {
	NodeBase
	declarations []*VariableDeclarationNode
}

func (f *NodeFactory) NewVariableDeclarationList(flags NodeFlags, declarations []*VariableDeclarationNode) *Node {
	data := &VariableDeclarationList{}
	data.declarations = declarations
	node := f.NewNode(SyntaxKindVariableDeclarationList, data)
	node.flags = flags
	return node
}

func (node *VariableDeclarationList) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.declarations)
}

// BindingPattern (SyntaxBindObjectBindingPattern | SyntaxKindArrayBindingPattern)

type BindingPattern struct {
	NodeBase
	elements []*BindingElementNode
}

func (f *NodeFactory) NewBindingPattern(kind SyntaxKind, elements []*BindingElementNode) *Node {
	data := &BindingPattern{}
	data.elements = elements
	return f.NewNode(kind, data)
}

func (node *BindingPattern) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.elements)
}

func isObjectBindingPattern(node *Node) bool {
	return node.kind == SyntaxKindObjectBindingPattern
}

func isArrayBindingPattern(node *Node) bool {
	return node.kind == SyntaxKindArrayBindingPattern
}

// ParameterDeclaration

type ParameterDeclaration struct {
	NodeBase
	DeclarationBase
	ModifiersBase
	dotDotDotToken *TokenNode   // Present on rest parameter
	name           *BindingName // Declared parameter name
	questionToken  *TokenNode   // Present on optional parameter
	typeNode       *TypeNode    // Optional
	initializer    *Node        // Optional
}

func (f *NodeFactory) NewParameterDeclaration(modifiers *ModifierListNode, dotDotDotToken *TokenNode, name *BindingName, questionToken *TokenNode, typeNode *TypeNode, initializer *Node) *Node {
	data := &ParameterDeclaration{}
	data.modifiers = modifiers
	data.dotDotDotToken = dotDotDotToken
	data.name = name
	data.questionToken = questionToken
	data.typeNode = typeNode
	data.initializer = initializer
	return f.NewNode(SyntaxKindParameter, data)
}

func (node *ParameterDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.dotDotDotToken) || visit(v, node.name) ||
		visit(v, node.questionToken) || visit(v, node.typeNode) || visit(v, node.initializer)
}

func (node *ParameterDeclaration) Name() *DeclarationName {
	return node.name
}

func isParameter(node *Node) bool {
	return node.kind == SyntaxKindParameter
}

// BindingElement

type BindingElement struct {
	NodeBase
	DeclarationBase
	ExportableBase
	FlowNodeBase
	dotDotDotToken *TokenNode    // Present on rest element (in object binding pattern)
	propertyName   *PropertyName // Optional binding property name in object binding pattern
	name           *BindingName  // Optional (nil for missing element)
	initializer    *Node         // Optional
}

func (f *NodeFactory) NewBindingElement(dotDotDotToken *TokenNode, propertyName *PropertyName, name *BindingName, initializer *Node) *Node {
	data := &BindingElement{}
	data.dotDotDotToken = dotDotDotToken
	data.propertyName = propertyName
	data.name = name
	data.initializer = initializer
	return f.NewNode(SyntaxKindBindingElement, data)
}

func (node *BindingElement) ForEachChild(v Visitor) bool {
	return visit(v, node.propertyName) || visit(v, node.dotDotDotToken) || visit(v, node.name) || visit(v, node.initializer)
}

func (node *BindingElement) Name() *DeclarationName {
	return node.name
}

func isBindingElement(node *Node) bool {
	return node.kind == SyntaxKindBindingElement
}

// MissingDeclaration

type MissingDeclaration struct {
	StatementBase
	DeclarationBase
	ModifiersBase
}

func (f *NodeFactory) NewMissingDeclaration(modifiers *ModifierListNode) *Node {
	data := &MissingDeclaration{}
	data.modifiers = modifiers
	return f.NewNode(SyntaxKindMissingDeclaration, data)
}

func (node *MissingDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers)
}

// FunctionDeclaration

type FunctionDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	FunctionLikeWithBodyBase
	name           *IdentifierNode
	returnFlowNode *FlowNode
}

func (f *NodeFactory) NewFunctionDeclaration(modifiers *ModifierListNode, asteriskToken *TokenNode, name *IdentifierNode, typeParameters *TypeParameterListNode, parameters []*ParameterDeclarationNode, returnType *TypeNode, body *BlockNode) *Node {
	data := &FunctionDeclaration{}
	data.modifiers = modifiers
	data.asteriskToken = asteriskToken
	data.name = name
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	data.body = body
	return f.NewNode(SyntaxKindFunctionDeclaration, data)
}

func (node *FunctionDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.asteriskToken) || visit(v, node.name) || visit(v, node.typeParameters) ||
		visitNodes(v, node.parameters) || visit(v, node.returnType) || visit(v, node.body)
}

func (node *FunctionDeclaration) Name() *DeclarationName {
	return node.name
}

func (node *FunctionDeclaration) BodyData() *BodyBase { return &node.BodyBase }

func isFunctionDeclaration(node *Node) bool {
	return node.kind == SyntaxKindFunctionDeclaration
}

// ClassLikeDeclarationBase

type ClassLikeBase struct {
	DeclarationBase
	ExportableBase
	ModifiersBase
	name            *IdentifierNode
	typeParameters  *TypeParameterListNode
	heritageClauses []*HeritageClauseNode
	members         []*ClassElement
}

func (node *ClassLikeBase) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.typeParameters) ||
		visitNodes(v, node.heritageClauses) || visitNodes(v, node.members)
}

func (node *ClassLikeBase) Name() *DeclarationName {
	return node.name
}

func (node *ClassLikeBase) ClassLikeData() *ClassLikeBase { return node }

// ClassDeclaration

type ClassDeclaration struct {
	StatementBase
	ClassLikeBase
}

func (f *NodeFactory) NewClassDeclaration(modifiers *ModifierListNode, name *IdentifierNode, typeParameters *TypeParameterListNode, heritageClauses []*HeritageClauseNode, members []*ClassElement) *Node {
	data := &ClassDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.typeParameters = typeParameters
	data.heritageClauses = heritageClauses
	data.members = members
	return f.NewNode(SyntaxKindClassDeclaration, data)
}

func isClassDeclaration(node *Node) bool {
	return node.kind == SyntaxKindClassDeclaration
}

// ClassExpression

type ClassExpression struct {
	ExpressionBase
	ClassLikeBase
}

func (f *NodeFactory) NewClassExpression(modifiers *ModifierListNode, name *IdentifierNode, typeParameters *TypeParameterListNode, heritageClauses []*HeritageClauseNode, members []*ClassElement) *Node {
	data := &ClassExpression{}
	data.modifiers = modifiers
	data.name = name
	data.typeParameters = typeParameters
	data.heritageClauses = heritageClauses
	data.members = members
	return f.NewNode(SyntaxKindClassExpression, data)
}

func (node *ClassExpression) Kind() SyntaxKind { return SyntaxKindClassExpression }

func isClassExpression(node *Node) bool {
	return node.kind == SyntaxKindClassExpression
}

// HeritageClause

type HeritageClause struct {
	NodeBase
	token SyntaxKind
	types []*ExpressionWithTypeArgumentsNode
}

func (f *NodeFactory) NewHeritageClause(token SyntaxKind, types []*ExpressionWithTypeArgumentsNode) *Node {
	data := &HeritageClause{}
	data.token = token
	data.types = types
	return f.NewNode(SyntaxKindHeritageClause, data)
}

func (node *HeritageClause) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.types)
}

func isHeritageClause(node *Node) bool {
	return node.kind == SyntaxKindHeritageClause
}

// InterfaceDeclaration

type InterfaceDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	name            *IdentifierNode
	typeParameters  *TypeParameterListNode
	heritageClauses []*HeritageClauseNode
	members         []*TypeElement
}

func (f *NodeFactory) NewInterfaceDeclaration(modifiers *ModifierListNode, name *IdentifierNode, typeParameters *TypeParameterListNode, heritageClauses []*HeritageClauseNode, members []*TypeElement) *Node {
	data := &InterfaceDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.typeParameters = typeParameters
	data.heritageClauses = heritageClauses
	data.members = members
	return f.NewNode(SyntaxKindInterfaceDeclaration, data)
}

func (node *InterfaceDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.typeParameters) ||
		visitNodes(v, node.heritageClauses) || visitNodes(v, node.members)
}

func (node *InterfaceDeclaration) Name() *DeclarationName {
	return node.name
}

func isInterfaceDeclaration(node *Node) bool {
	return node.kind == SyntaxKindInterfaceDeclaration
}

// TypeAliasDeclaration

type TypeAliasDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	LocalsContainerBase
	name           *IdentifierNode
	typeParameters *TypeParameterListNode
	typeNode       *TypeNode
}

func (f *NodeFactory) NewTypeAliasDeclaration(modifiers *ModifierListNode, name *IdentifierNode, typeParameters *TypeParameterListNode, typeNode *TypeNode) *Node {
	data := &TypeAliasDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.typeParameters = typeParameters
	data.typeNode = typeNode
	return f.NewNode(SyntaxKindTypeAliasDeclaration, data)
}

func (node *TypeAliasDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.typeParameters) || visit(v, node.typeNode)
}

func (node *TypeAliasDeclaration) Name() *DeclarationName {
	return node.name
}

func isTypeAliasDeclaration(node *Node) bool {
	return node.kind == SyntaxKindTypeAliasDeclaration
}

// EnumMember

type EnumMember struct {
	NodeBase
	NamedMemberBase
	initializer *Node // Optional
}

func (f *NodeFactory) NewEnumMember(name *PropertyName, initializer *Node) *Node {
	data := &EnumMember{}
	data.name = name
	data.initializer = initializer
	return f.NewNode(SyntaxKindEnumMember, data)
}

func (node *EnumMember) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.initializer)
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
	name    *IdentifierNode
	members []*EnumMemberNode
}

func (f *NodeFactory) NewEnumDeclaration(modifiers *ModifierListNode, name *IdentifierNode, members []*EnumMemberNode) *Node {
	data := &EnumDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.members = members
	return f.NewNode(SyntaxKindEnumDeclaration, data)
}

func (node *EnumDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visitNodes(v, node.members)
}

func (node *EnumDeclaration) Name() *DeclarationName {
	return node.name
}

func isEnumDeclaration(node *Node) bool {
	return node.kind == SyntaxKindEnumDeclaration
}

// ModuleBlock

type ModuleBlock struct {
	StatementBase
	statements []*Statement
}

func (f *NodeFactory) NewModuleBlock(statements []*Statement) *Node {
	data := &ModuleBlock{}
	data.statements = statements
	return f.NewNode(SyntaxKindModuleBlock, data)
}

func (node *ModuleBlock) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.statements)
}

func isModuleBlock(node *Node) bool {
	return node.kind == SyntaxKindModuleBlock
}

// ModuleDeclaration

type ModuleDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	LocalsContainerBase
	name *ModuleName
	body *ModuleBody // Optional (may be nil in ambient module declaration)
}

func (f *NodeFactory) NewModuleDeclaration(modifiers *ModifierListNode, name *ModuleName, body *ModuleBody, flags NodeFlags) *Node {
	data := &ModuleDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.body = body
	node := f.NewNode(SyntaxKindModuleDeclaration, data)
	node.flags |= flags & (NodeFlagsNamespace | NodeFlagsNestedNamespace | NodeFlagsGlobalAugmentation)
	return node
}

func (node *ModuleDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.body)
}

func (node *ModuleDeclaration) Name() *DeclarationName {
	return node.name
}

func isModuleDeclaration(node *Node) bool {
	return node.kind == SyntaxKindModuleDeclaration
}

// ModuleEqualsDeclaration

type ImportEqualsDeclaration struct {
	StatementBase
	DeclarationBase
	ExportableBase
	ModifiersBase
	modifiers  *ModifierListNode
	isTypeOnly bool
	name       *IdentifierNode
	// 'EntityName' for an internal module reference, 'ExternalModuleReference' for an external
	// module reference.
	moduleReference *ModuleReference
}

func (f *NodeFactory) NewImportEqualsDeclaration(modifiers *ModifierListNode, isTypeOnly bool, name *IdentifierNode, moduleReference *ModuleReference) *Node {
	data := &ImportEqualsDeclaration{}
	data.modifiers = modifiers
	data.isTypeOnly = isTypeOnly
	data.name = name
	data.moduleReference = moduleReference
	return f.NewNode(SyntaxKindImportEqualsDeclaration, data)
}

func (node *ImportEqualsDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.moduleReference)
}

func (node *ImportEqualsDeclaration) Name() *DeclarationName {
	return node.name
}

func isImportEqualsDeclaration(node *Node) bool {
	return node.kind == SyntaxKindImportEqualsDeclaration
}

// ImportDeclaration

type ImportDeclaration struct {
	StatementBase
	ModifiersBase
	importClause    *ImportClauseNode
	moduleSpecifier *Node
	attributes      *ImportAttributesNode
}

func (f *NodeFactory) NewImportDeclaration(modifiers *ModifierListNode, importClause *ImportClauseNode, moduleSpecifier *Node, attributes *ImportAttributesNode) *Node {
	data := &ImportDeclaration{}
	data.modifiers = modifiers
	data.importClause = importClause
	data.moduleSpecifier = moduleSpecifier
	data.attributes = attributes
	return f.NewNode(SyntaxKindImportDeclaration, data)
}

func (node *ImportDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.importClause) || visit(v, node.moduleSpecifier) || visit(v, node.attributes)
}

func isImportDeclaration(node *Node) bool {
	return node.kind == SyntaxKindImportDeclaration
}

// ImportSpecifier

type ImportSpecifier struct {
	NodeBase
	DeclarationBase
	ExportableBase
	isTypeOnly   bool
	propertyName *ModuleExportName
	name         *IdentifierNode
}

func (f *NodeFactory) NewImportSpecifier(isTypeOnly bool, propertyName *ModuleExportName, name *IdentifierNode) *Node {
	data := &ImportSpecifier{}
	data.isTypeOnly = isTypeOnly
	data.propertyName = propertyName
	data.name = name
	return f.NewNode(SyntaxKindImportSpecifier, data)
}

func (node *ImportSpecifier) ForEachChild(v Visitor) bool {
	return visit(v, node.propertyName) || visit(v, node.name)
}

func (node *ImportSpecifier) Name() *DeclarationName {
	return node.name
}

func isImportSpecifier(node *Node) bool {
	return node.kind == SyntaxKindImportSpecifier
}

// ExternalModuleReference

type ExternalModuleReference struct {
	NodeBase
	expression *Node
}

func (f *NodeFactory) NewExternalModuleReference(expression *Node) *Node {
	data := &ExternalModuleReference{}
	data.expression = expression
	return f.NewNode(SyntaxKindExternalModuleReference, data)
}

func (node *ExternalModuleReference) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

func isExternalModuleReference(node *Node) bool {
	return node.kind == SyntaxKindExternalModuleReference
}

// ImportClause

type ImportClause struct {
	NodeBase
	DeclarationBase
	ExportableBase
	isTypeOnly    bool
	namedBindings *NamedImportBindings // Optional, named bindings
	name          *IdentifierNode      // Optional, default binding
}

func (f *NodeFactory) NewImportClause(isTypeOnly bool, name *IdentifierNode, namedBindings *NamedImportBindings) *Node {
	data := &ImportClause{}
	data.isTypeOnly = isTypeOnly
	data.name = name
	data.namedBindings = namedBindings
	return f.NewNode(SyntaxKindImportClause, data)
}

func (node *ImportClause) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.namedBindings)
}

func (node *ImportClause) Name() *DeclarationName {
	return node.name
}

// NamespaceImport

type NamespaceImport struct {
	NodeBase
	DeclarationBase
	ExportableBase
	name *IdentifierNode
}

func (f *NodeFactory) NewNamespaceImport(name *IdentifierNode) *Node {
	data := &NamespaceImport{}
	data.name = name
	return f.NewNode(SyntaxKindNamespaceImport, data)
}

func (node *NamespaceImport) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *NamespaceImport) Name() *DeclarationName {
	return node.name
}

func isNamespaceImport(node *Node) bool {
	return node.kind == SyntaxKindNamespaceImport
}

// NamedImports

type NamedImports struct {
	NodeBase
	elements []*ImportSpecifierNode
}

func (f *NodeFactory) NewNamedImports(elements []*ImportSpecifierNode) *Node {
	data := &NamedImports{}
	data.elements = elements
	return f.NewNode(SyntaxKindNamedImports, data)
}

func (node *NamedImports) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.elements)
}

// ExportAssignment

// This is either an `export =` or an `export default` declaration.
// Unless `isExportEquals` is set, this node was parsed as an `export default`.
type ExportAssignment struct {
	StatementBase
	DeclarationBase
	ModifiersBase
	isExportEquals bool
	expression     *Node
}

func (f *NodeFactory) NewExportAssignment(modifiers *ModifierListNode, isExportEquals bool, expression *Node) *Node {
	data := &ExportAssignment{}
	data.modifiers = modifiers
	data.isExportEquals = isExportEquals
	data.expression = expression
	return f.NewNode(SyntaxKindExportAssignment, data)
}

func (node *ExportAssignment) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.expression)
}

func isExportAssignment(node *Node) bool {
	return node.kind == SyntaxKindExportAssignment
}

// NamespaceExportDeclaration

type NamespaceExportDeclaration struct {
	StatementBase
	DeclarationBase
	ModifiersBase
	name *IdentifierNode
}

func (f *NodeFactory) NewNamespaceExportDeclaration(modifiers *ModifierListNode, name *IdentifierNode) *Node {
	data := &NamespaceExportDeclaration{}
	data.modifiers = modifiers
	data.name = name
	return f.NewNode(SyntaxKindNamespaceExportDeclaration, data)
}

func (node *NamespaceExportDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name)
}

func (node *NamespaceExportDeclaration) Name() *DeclarationName {
	return node.name
}

func isNamespaceExportDeclaration(node *Node) bool {
	return node.kind == SyntaxKindNamespaceExportDeclaration
}

// ExportDeclaration

type ExportDeclaration struct {
	StatementBase
	DeclarationBase
	ModifiersBase
	isTypeOnly      bool
	exportClause    *NamedExportBindings  // Optional
	moduleSpecifier *Node                 // Optional
	attributes      *ImportAttributesNode // Optional
}

func (f *NodeFactory) NewExportDeclaration(modifiers *ModifierListNode, isTypeOnly bool, exportClause *NamedExportBindings, moduleSpecifier *Node, attributes *ImportAttributesNode) *Node {
	data := &ExportDeclaration{}
	data.modifiers = modifiers
	data.isTypeOnly = isTypeOnly
	data.exportClause = exportClause
	data.moduleSpecifier = moduleSpecifier
	data.attributes = attributes
	return f.NewNode(SyntaxKindExportDeclaration, data)
}

func (node *ExportDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.exportClause) || visit(v, node.moduleSpecifier) || visit(v, node.attributes)
}

func isExportDeclaration(node *Node) bool {
	return node.kind == SyntaxKindExportDeclaration
}

// NamespaceExport

type NamespaceExport struct {
	NodeBase
	DeclarationBase
	name *ModuleExportName
}

func (f *NodeFactory) NewNamespaceExport(name *ModuleExportName) *Node {
	data := &NamespaceExport{}
	data.name = name
	return f.NewNode(SyntaxKindNamespaceExport, data)
}

func (node *NamespaceExport) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *NamespaceExport) Name() *DeclarationName {
	return node.name
}

func isNamespaceExport(node *Node) bool {
	return node.kind == SyntaxKindNamespaceExport
}

// NamedExports

type NamedExports struct {
	NodeBase
	elements []*ExportSpecifierNode
}

func (f *NodeFactory) NewNamedExports(elements []*ExportSpecifierNode) *Node {
	data := &NamedExports{}
	data.elements = elements
	return f.NewNode(SyntaxKindNamedExports, data)
}

func (node *NamedExports) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.elements)
}

// ExportSpecifier

type ExportSpecifier struct {
	NodeBase
	DeclarationBase
	ExportableBase
	isTypeOnly   bool
	propertyName *ModuleExportName // Optional, name preceding 'as' keyword
	name         *ModuleExportName
}

func (f *NodeFactory) NewExportSpecifier(isTypeOnly bool, propertyName *ModuleExportName, name *ModuleExportName) *Node {
	data := &ExportSpecifier{}
	data.isTypeOnly = isTypeOnly
	data.propertyName = propertyName
	data.name = name
	return f.NewNode(SyntaxKindExportSpecifier, data)
}

func (node *ExportSpecifier) ForEachChild(v Visitor) bool {
	return visit(v, node.propertyName) || visit(v, node.name)
}

func (node *ExportSpecifier) Name() *DeclarationName {
	return node.name
}

func isExportSpecifier(node *Node) bool {
	return node.kind == SyntaxKindExportSpecifier
}

// TypeElementBase

type TypeElementBase struct{}

// ClassElementBase

type ClassElementBase struct{}

// NamedMemberBase

type NamedMemberBase struct {
	DeclarationBase
	ModifiersBase
	name         *PropertyName
	postfixToken *TokenNode
}

func (node *NamedMemberBase) Symbol() *Symbol                   { return node.symbol }
func (node *NamedMemberBase) DeclarationData() *DeclarationBase { return &node.DeclarationBase }
func (node *NamedMemberBase) Modifiers() *ModifierListNode      { return node.modifiers }
func (node *NamedMemberBase) Name() *DeclarationName            { return node.name }

// CallSignatureDeclaration

type CallSignatureDeclaration struct {
	NodeBase
	DeclarationBase
	FunctionLikeBase
	TypeElementBase
}

func (f *NodeFactory) NewCallSignatureDeclaration(typeParameters *TypeParameterListNode, parameters []*ParameterDeclarationNode, returnType *Node) *Node {
	data := &CallSignatureDeclaration{}
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	return f.NewNode(SyntaxKindCallSignature, data)
}

func (node *CallSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.typeParameters) || visitNodes(v, node.parameters) || visit(v, node.returnType)
}

func isCallSignatureDeclaration(node *Node) bool {
	return node.kind == SyntaxKindCallSignature
}

// ConstructSignatureDeclaration

type ConstructSignatureDeclaration struct {
	NodeBase
	DeclarationBase
	FunctionLikeBase
	TypeElementBase
}

func (f *NodeFactory) NewConstructSignatureDeclaration(typeParameters *TypeParameterListNode, parameters []*ParameterDeclarationNode, returnType *Node) *Node {
	data := &ConstructSignatureDeclaration{}
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	return f.NewNode(SyntaxKindConstructSignature, data)
}

func (node *ConstructSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.typeParameters) || visitNodes(v, node.parameters) || visit(v, node.returnType)
}

// ConstructorDeclaration

type ConstructorDeclaration struct {
	NodeBase
	DeclarationBase
	ModifiersBase
	FunctionLikeWithBodyBase
	ClassElementBase
	returnFlowNode *FlowNode
}

func (f *NodeFactory) NewConstructorDeclaration(modifiers *ModifierListNode, typeParameters *TypeParameterListNode, parameters []*ParameterDeclarationNode, returnType *Node, body *BlockNode) *Node {
	data := &ConstructorDeclaration{}
	data.modifiers = modifiers
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	data.body = body
	return f.NewNode(SyntaxKindConstructor, data)
}

func (node *ConstructorDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.typeParameters) || visitNodes(v, node.parameters) || visit(v, node.returnType) || visit(v, node.body)
}

func isConstructorDeclaration(node *Node) bool {
	return node.kind == SyntaxKindConstructor
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
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.typeParameters) || visitNodes(v, node.parameters) ||
		visit(v, node.returnType) || visit(v, node.body)
}

func (node *AccessorDeclarationBase) isAccessorDeclaration() {}

// GetAccessorDeclaration

type GetAccessorDeclaration struct {
	AccessorDeclarationBase
}

func (f *NodeFactory) NewGetAccessorDeclaration(modifiers *ModifierListNode, name *PropertyName, typeParameters *TypeParameterListNode, parameters []*ParameterDeclarationNode, returnType *Node, body *BlockNode) *Node {
	data := &GetAccessorDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	data.body = body
	return f.NewNode(SyntaxKindGetAccessor, data)
}

func isGetAccessorDeclaration(node *Node) bool {
	return node.kind == SyntaxKindGetAccessor
}

// SetAccessorDeclaration

type SetAccessorDeclaration struct {
	AccessorDeclarationBase
}

func (f *NodeFactory) NewSetAccessorDeclaration(modifiers *ModifierListNode, name *PropertyName, typeParameters *TypeParameterListNode, parameters []*ParameterDeclarationNode, returnType *Node, body *BlockNode) *Node {
	data := &SetAccessorDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	data.body = body
	return f.NewNode(SyntaxKindSetAccessor, data)
}

func isSetAccessorDeclaration(node *Node) bool {
	return node.kind == SyntaxKindSetAccessor
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

func (f *NodeFactory) NewIndexSignatureDeclaration(modifiers *Node, parameters []*Node, returnType *Node) *Node {
	data := &IndexSignatureDeclaration{}
	data.modifiers = modifiers
	data.parameters = parameters
	data.returnType = returnType
	return f.NewNode(SyntaxKindIndexSignature, data)
}

func (node *IndexSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visitNodes(v, node.parameters) || visit(v, node.returnType)
}

// MethodSignatureDeclaration

type MethodSignatureDeclaration struct {
	NodeBase
	NamedMemberBase
	FunctionLikeBase
	TypeElementBase
}

func (f *NodeFactory) NewMethodSignatureDeclaration(modifiers *Node, name *Node, postfixToken *Node, typeParameters *Node, parameters []*Node, returnType *Node) *Node {
	data := &MethodSignatureDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.postfixToken = postfixToken
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	return f.NewNode(SyntaxKindMethodSignature, data)
}

func (node *MethodSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.postfixToken) || visit(v, node.typeParameters) ||
		visitNodes(v, node.parameters) || visit(v, node.returnType)
}

func isMethodSignatureDeclaration(node *Node) bool {
	return node.kind == SyntaxKindMethodSignature
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

func (f *NodeFactory) NewMethodDeclaration(modifiers *Node, asteriskToken *Node, name *Node, postfixToken *Node, typeParameters *Node, parameters []*Node, returnType *Node, body *Node) *Node {
	data := &MethodDeclaration{}
	data.modifiers = modifiers
	data.asteriskToken = asteriskToken
	data.name = name
	data.postfixToken = postfixToken
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	data.body = body
	return f.NewNode(SyntaxKindMethodDeclaration, data)
}

func (node *MethodDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.asteriskToken) || visit(v, node.name) || visit(v, node.postfixToken) ||
		visit(v, node.typeParameters) || visitNodes(v, node.parameters) || visit(v, node.returnType) || visit(v, node.body)
}

// PropertySignatureDeclaration

type PropertySignatureDeclaration struct {
	NodeBase
	NamedMemberBase
	TypeElementBase
	typeNode    *Node
	initializer *Node // For error reporting purposes
}

func (f *NodeFactory) NewPropertySignatureDeclaration(modifiers *Node, name *Node, postfixToken *Node, typeNode *Node, initializer *Node) *Node {
	data := &PropertySignatureDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.postfixToken = postfixToken
	data.typeNode = typeNode
	data.initializer = initializer
	return f.NewNode(SyntaxKindPropertySignature, data)
}

func (node *PropertySignatureDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.postfixToken) || visit(v, node.typeNode) || visit(v, node.initializer)
}

func isPropertySignatureDeclaration(node *Node) bool {
	return node.kind == SyntaxKindPropertySignature
}

// PropertyDeclaration

type PropertyDeclaration struct {
	NodeBase
	NamedMemberBase
	ClassElementBase
	typeNode    *Node // Optional
	initializer *Node // Optional
}

func (f *NodeFactory) NewPropertyDeclaration(modifiers *Node, name *Node, postfixToken *Node, typeNode *Node, initializer *Node) *Node {
	data := &PropertyDeclaration{}
	data.modifiers = modifiers
	data.name = name
	data.postfixToken = postfixToken
	data.typeNode = typeNode
	data.initializer = initializer
	return f.NewNode(SyntaxKindPropertyDeclaration, data)
}

func (node *PropertyDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.postfixToken) || visit(v, node.typeNode) || visit(v, node.initializer)
}

func isPropertyDeclaration(node *Node) bool {
	return node.kind == SyntaxKindPropertyDeclaration
}

// SemicolonClassElement

type SemicolonClassElement struct {
	NodeBase
	DeclarationBase
	ClassElementBase
}

func (f *NodeFactory) NewSemicolonClassElement() *Node {
	return f.NewNode(SyntaxKindSemicolonClassElement, &SemicolonClassElement{})
}

// ClassStaticBlockDeclaration

type ClassStaticBlockDeclaration struct {
	NodeBase
	DeclarationBase
	ModifiersBase
	LocalsContainerBase
	ClassElementBase
	body *Node
}

func (f *NodeFactory) NewClassStaticBlockDeclaration(modifiers *Node, body *Node) *Node {
	data := &ClassStaticBlockDeclaration{}
	data.modifiers = modifiers
	data.body = body
	return f.NewNode(SyntaxKindClassStaticBlockDeclaration, data)
}

func (node *ClassStaticBlockDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.body)
}

func isClassStaticBlockDeclaration(node *Node) bool {
	return node.kind == SyntaxKindClassStaticBlockDeclaration
}

// TypeParameterList

type TypeParameterList struct {
	NodeBase
	parameters []*Node
}

func (f *NodeFactory) NewTypeParameterList(parameters []*Node) *Node {
	data := &TypeParameterList{}
	data.parameters = parameters
	return f.NewNode(SyntaxKindTypeParameterList, data)
}

func (node *TypeParameterList) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.parameters)
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
	return f.NewNode(SyntaxKindOmittedExpression, &OmittedExpression{})
}

// KeywordExpression

type KeywordExpression struct {
	ExpressionBase
	FlowNodeBase // For 'this' and 'super' expressions
}

func (f *NodeFactory) NewKeywordExpression(kind SyntaxKind) *Node {
	return f.NewNode(kind, &KeywordExpression{})
}

// LiteralLikeBase

type LiteralLikeBase struct {
	text string
}

// StringLiteral

type StringLiteral struct {
	ExpressionBase
	LiteralLikeBase
}

func (f *NodeFactory) NewStringLiteral(text string) *Node {
	data := &StringLiteral{}
	data.text = text
	return f.NewNode(SyntaxKindStringLiteral, data)
}

func isStringLiteral(node *Node) bool {
	return node.kind == SyntaxKindStringLiteral
}

// NumericLiteral

type NumericLiteral struct {
	ExpressionBase
	LiteralLikeBase
}

func (f *NodeFactory) NewNumericLiteral(text string) *Node {
	data := &NumericLiteral{}
	data.text = text
	return f.NewNode(SyntaxKindNumericLiteral, data)
}

// BigintLiteral

type BigintLiteral struct {
	ExpressionBase
	LiteralLikeBase
}

func (f *NodeFactory) NewBigintLiteral(text string) *Node {
	data := &BigintLiteral{}
	data.text = text
	return f.NewNode(SyntaxKindBigintLiteral, data)
}

// RegularExpressionLiteral

type RegularExpressionLiteral struct {
	ExpressionBase
	LiteralLikeBase
}

func (f *NodeFactory) NewRegularExpressionLiteral(text string) *Node {
	data := &RegularExpressionLiteral{}
	data.text = text
	return f.NewNode(SyntaxKindRegularExpressionLiteral, data)
}

// NoSubstitutionTemplateLiteral

type NoSubstitutionTemplateLiteral struct {
	ExpressionBase
	TemplateLiteralLikeBase
}

func (f *NodeFactory) NewNoSubstitutionTemplateLiteral(text string) *Node {
	data := &NoSubstitutionTemplateLiteral{}
	data.text = text
	return f.NewNode(SyntaxKindNoSubstitutionTemplateLiteral, data)
}

// BinaryExpression

type BinaryExpression struct {
	ExpressionBase
	DeclarationBase
	left          *Node
	operatorToken *Node
	right         *Node
}

func (f *NodeFactory) NewBinaryExpression(left *Node, operatorToken *Node, right *Node) *Node {
	data := &BinaryExpression{}
	data.left = left
	data.operatorToken = operatorToken
	data.right = right
	return f.NewNode(SyntaxKindBinaryExpression, data)
}

func (node *BinaryExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.left) || visit(v, node.operatorToken) || visit(v, node.right)
}

// PrefixUnaryExpression

type PrefixUnaryExpression struct {
	ExpressionBase
	operator SyntaxKind
	operand  *Node
}

func (f *NodeFactory) NewPrefixUnaryExpression(operator SyntaxKind, operand *Node) *Node {
	data := &PrefixUnaryExpression{}
	data.operator = operator
	data.operand = operand
	return f.NewNode(SyntaxKindPrefixUnaryExpression, data)
}

func (node *PrefixUnaryExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.operand)
}

func isPrefixUnaryExpression(node *Node) bool {
	return node.kind == SyntaxKindPrefixUnaryExpression
}

// PostfixUnaryExpression

type PostfixUnaryExpression struct {
	ExpressionBase
	operand  *Node
	operator SyntaxKind
}

func (f *NodeFactory) NewPostfixUnaryExpression(operand *Node, operator SyntaxKind) *Node {
	data := &PostfixUnaryExpression{}
	data.operand = operand
	data.operator = operator
	return f.NewNode(SyntaxKindPostfixUnaryExpression, data)
}

func (node *PostfixUnaryExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.operand)
}

// YieldExpression

type YieldExpression struct {
	ExpressionBase
	asteriskToken *Node
	expression    *Node // Optional
}

func (f *NodeFactory) NewYieldExpression(asteriskToken *Node, expression *Node) *Node {
	data := &YieldExpression{}
	data.asteriskToken = asteriskToken
	data.expression = expression
	return f.NewNode(SyntaxKindYieldExpression, data)
}

func (node *YieldExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.asteriskToken) || visit(v, node.expression)
}

// ArrowFunction

type ArrowFunction struct {
	ExpressionBase
	DeclarationBase
	ModifiersBase
	FunctionLikeWithBodyBase
	FlowNodeBase
	equalsGreaterThanToken *Node
}

func (f *NodeFactory) NewArrowFunction(modifiers *Node, typeParameters *Node, parameters []*Node, returnType *Node, equalsGreaterThanToken *Node, body *Node) *Node {
	data := &ArrowFunction{}
	data.modifiers = modifiers
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	data.equalsGreaterThanToken = equalsGreaterThanToken
	data.body = body
	return f.NewNode(SyntaxKindArrowFunction, data)
}

func (node *ArrowFunction) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.typeParameters) || visitNodes(v, node.parameters) ||
		visit(v, node.returnType) || visit(v, node.equalsGreaterThanToken) || visit(v, node.body)
}

func (node *ArrowFunction) Name() *DeclarationName {
	return nil
}

func isArrowFunction(node *Node) bool {
	return node.kind == SyntaxKindArrowFunction
}

// FunctionExpression

type FunctionExpression struct {
	ExpressionBase
	DeclarationBase
	ModifiersBase
	FunctionLikeWithBodyBase
	FlowNodeBase
	name           *Node // Optional
	returnFlowNode *FlowNode
}

func (f *NodeFactory) NewFunctionExpression(modifiers *Node, asteriskToken *Node, name *Node, typeParameters *Node, parameters []*Node, returnType *Node, body *Node) *Node {
	data := &FunctionExpression{}
	data.modifiers = modifiers
	data.asteriskToken = asteriskToken
	data.name = name
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	data.body = body
	return f.NewNode(SyntaxKindFunctionExpression, data)
}

func (node *FunctionExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.asteriskToken) || visit(v, node.name) || visit(v, node.typeParameters) ||
		visitNodes(v, node.parameters) || visit(v, node.returnType) || visit(v, node.body)
}

func (node *FunctionExpression) Name() *DeclarationName {
	return node.name
}

func isFunctionExpression(node *Node) bool {
	return node.kind == SyntaxKindFunctionExpression
}

// AsExpression

type AsExpression struct {
	ExpressionBase
	expression *Node
	typeNode   *Node
}

func (f *NodeFactory) NewAsExpression(expression *Node, typeNode *Node) *Node {
	data := &AsExpression{}
	data.expression = expression
	data.typeNode = typeNode
	return f.NewNode(SyntaxKindAsExpression, data)
}

func (node *AsExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.typeNode)
}

// SatisfiesExpression

type SatisfiesExpression struct {
	ExpressionBase
	expression *Node
	typeNode   *Node
}

func (f *NodeFactory) NewSatisfiesExpression(expression *Node, typeNode *Node) *Node {
	data := &SatisfiesExpression{}
	data.expression = expression
	data.typeNode = typeNode
	return f.NewNode(SyntaxKindSatisfiesExpression, data)
}

func (node *SatisfiesExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.typeNode)
}

// ConditionalExpression

type ConditionalExpression struct {
	ExpressionBase
	condition     *Node
	questionToken *Node
	whenTrue      *Node
	colonToken    *Node
	whenFalse     *Node
}

func (f *NodeFactory) NewConditionalExpression(condition *Node, questionToken *Node, whenTrue *Node, colonToken *Node, whenFalse *Node) *Node {
	data := &ConditionalExpression{}
	data.condition = condition
	data.questionToken = questionToken
	data.whenTrue = whenTrue
	data.colonToken = colonToken
	data.whenFalse = whenFalse
	return f.NewNode(SyntaxKindConditionalExpression, data)
}

func (node *ConditionalExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.condition) || visit(v, node.questionToken) || visit(v, node.whenTrue) ||
		visit(v, node.colonToken) || visit(v, node.whenFalse)
}

// PropertyAccessExpression

type PropertyAccessExpression struct {
	ExpressionBase
	FlowNodeBase
	expression       *Node
	questionDotToken *Node
	name             *Node
}

func (f *NodeFactory) NewPropertyAccessExpression(expression *Node, questionDotToken *Node, name *Node, flags NodeFlags) *Node {
	data := &PropertyAccessExpression{}
	data.expression = expression
	data.questionDotToken = questionDotToken
	data.name = name
	node := f.NewNode(SyntaxKindPropertyAccessExpression, data)
	node.flags |= flags & NodeFlagsOptionalChain
	return node
}

func (node *PropertyAccessExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.questionDotToken) || visit(v, node.name)
}

func (node *PropertyAccessExpression) Name() *DeclarationName { return node.name }

func isPropertyAccessExpression(node *Node) bool {
	return node.kind == SyntaxKindPropertyAccessExpression
}

// ElementAccessExpression

type ElementAccessExpression struct {
	ExpressionBase
	FlowNodeBase
	expression         *Node
	questionDotToken   *Node
	argumentExpression *Node
}

func (f *NodeFactory) NewElementAccessExpression(expression *Node, questionDotToken *Node, argumentExpression *Node, flags NodeFlags) *Node {
	data := &ElementAccessExpression{}
	data.expression = expression
	data.questionDotToken = questionDotToken
	data.argumentExpression = argumentExpression
	node := f.NewNode(SyntaxKindElementAccessExpression, data)
	node.flags |= flags & NodeFlagsOptionalChain
	return node
}

func (node *ElementAccessExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.questionDotToken) || visit(v, node.argumentExpression)
}

func isElementAccessExpression(node *Node) bool {
	return node.kind == SyntaxKindElementAccessExpression
}

// CallExpression

type CallExpression struct {
	ExpressionBase
	expression       *Node
	questionDotToken *Node
	typeArguments    *Node
	arguments        []*Node
}

func (f *NodeFactory) NewCallExpression(expression *Node, questionDotToken *Node, typeArguments *Node, arguments []*Node, flags NodeFlags) *Node {
	data := &CallExpression{}
	data.expression = expression
	data.questionDotToken = questionDotToken
	data.typeArguments = typeArguments
	data.arguments = arguments
	node := f.NewNode(SyntaxKindCallExpression, data)
	node.flags |= flags & NodeFlagsOptionalChain
	return node
}

func (node *CallExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.questionDotToken) || visit(v, node.typeArguments) || visitNodes(v, node.arguments)
}

func isCallExpression(node *Node) bool {
	return node.kind == SyntaxKindCallExpression
}

// NewExpression

type NewExpression struct {
	ExpressionBase
	expression    *Node
	typeArguments *Node
	arguments     []*Node
}

func (f *NodeFactory) NewNewExpression(expression *Node, typeArguments *Node, arguments []*Node) *Node {
	data := &NewExpression{}
	data.expression = expression
	data.typeArguments = typeArguments
	data.arguments = arguments
	return f.NewNode(SyntaxKindNewExpression, data)
}

func (node *NewExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.typeArguments) || visitNodes(v, node.arguments)
}

// MetaProperty

type MetaProperty struct {
	ExpressionBase
	FlowNodeBase
	keywordToken SyntaxKind
	name         *Node
}

func (f *NodeFactory) NewMetaProperty(keywordToken SyntaxKind, name *Node) *Node {
	data := &MetaProperty{}
	data.keywordToken = keywordToken
	data.name = name
	return f.NewNode(SyntaxKindNewExpression, data)
}

func (node *MetaProperty) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func isMetaProperty(node *Node) bool {
	return node.kind == SyntaxKindMetaProperty
}

// NonNullExpression

type NonNullExpression struct {
	ExpressionBase
	expression *Node
}

func (f *NodeFactory) NewNonNullExpression(expression *Node) *Node {
	data := &NonNullExpression{}
	data.expression = expression
	return f.NewNode(SyntaxKindNonNullExpression, data)
}

func (node *NonNullExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

// SpreadElement

type SpreadElement struct {
	ExpressionBase
	expression *Node
}

func (f *NodeFactory) NewSpreadElement(expression *Node) *Node {
	data := &SpreadElement{}
	data.expression = expression
	return f.NewNode(SyntaxKindSpreadElement, data)
}

func (node *SpreadElement) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

// TemplateExpression

type TemplateExpression struct {
	ExpressionBase
	head          *Node
	templateSpans []*Node
}

func (f *NodeFactory) NewTemplateExpression(head *Node, templateSpans []*Node) *Node {
	data := &TemplateExpression{}
	data.head = head
	data.templateSpans = templateSpans
	return f.NewNode(SyntaxKindTemplateExpression, data)
}

func (node *TemplateExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.head) || visitNodes(v, node.templateSpans)
}

// TemplateLiteralTypeSpan

type TemplateSpan struct {
	NodeBase
	expression *Node
	literal    *Node
}

func (f *NodeFactory) NewTemplateSpan(expression *Node, literal *Node) *Node {
	data := &TemplateSpan{}
	data.expression = expression
	data.literal = literal
	return f.NewNode(SyntaxKindTemplateSpan, data)
}

func (node *TemplateSpan) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.literal)
}

// TaggedTemplateExpression

type TaggedTemplateExpression struct {
	ExpressionBase
	tag              *Node
	questionDotToken *Node // For error reporting purposes only
	typeArguments    *Node
	template         *Node
}

func (f *NodeFactory) NewTaggedTemplateExpression(tag *Node, questionDotToken *Node, typeArguments *Node, template *Node, flags NodeFlags) *Node {
	data := &TaggedTemplateExpression{}
	data.tag = tag
	data.questionDotToken = questionDotToken
	data.typeArguments = typeArguments
	data.template = template
	node := f.NewNode(SyntaxKindTaggedTemplateExpression, data)
	node.flags |= flags & NodeFlagsOptionalChain
	return node
}

func (node *TaggedTemplateExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.tag) || visit(v, node.questionDotToken) || visit(v, node.typeArguments) || visit(v, node.template)
}

// ParenthesizedExpression

type ParenthesizedExpression struct {
	ExpressionBase
	expression *Node
}

func (f *NodeFactory) NewParenthesizedExpression(expression *Node) *Node {
	data := &ParenthesizedExpression{}
	data.expression = expression
	return f.NewNode(SyntaxKindParenthesizedExpression, data)
}

func (node *ParenthesizedExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

func isParenthesizedExpression(node *Node) bool {
	return node.kind == SyntaxKindParenthesizedExpression
}

// ArrayLiteralExpression

type ArrayLiteralExpression struct {
	ExpressionBase
	elements  []*Node
	multiLine bool
}

func (f *NodeFactory) NewArrayLiteralExpression(elements []*Node, multiLine bool) *Node {
	data := &ArrayLiteralExpression{}
	data.elements = elements
	data.multiLine = multiLine
	return f.NewNode(SyntaxKindArrayLiteralExpression, data)
}

func (node *ArrayLiteralExpression) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.elements)
}

// ObjectLiteralExpression

type ObjectLiteralExpression struct {
	ExpressionBase
	DeclarationBase
	properties []*Node
	multiLine  bool
}

func (f *NodeFactory) NewObjectLiteralExpression(properties []*Node, multiLine bool) *Node {
	data := &ObjectLiteralExpression{}
	data.properties = properties
	data.multiLine = multiLine
	return f.NewNode(SyntaxKindObjectLiteralExpression, data)

}

func (node *ObjectLiteralExpression) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.properties)
}

func isObjectLiteralExpression(node *Node) bool {
	return node.kind == SyntaxKindObjectLiteralExpression
}

// ObjectLiteralElementBase

type ObjectLiteralElementBase struct{}

// SpreadAssignment

type SpreadAssignment struct {
	NodeBase
	ObjectLiteralElementBase
	expression *Node
}

func (f *NodeFactory) NewSpreadAssignment(expression *Node) *Node {
	data := &SpreadAssignment{}
	data.expression = expression
	return f.NewNode(SyntaxKindSpreadAssignment, data)
}

func (node *SpreadAssignment) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

// PropertyAssignment

type PropertyAssignment struct {
	NodeBase
	NamedMemberBase
	ObjectLiteralElementBase
	initializer *Node
}

func (f *NodeFactory) NewPropertyAssignment(modifiers *Node, name *Node, postfixToken *Node, initializer *Node) *Node {
	data := &PropertyAssignment{}
	data.modifiers = modifiers
	data.name = name
	data.postfixToken = postfixToken
	data.initializer = initializer
	return f.NewNode(SyntaxKindPropertyAssignment, data)
}

func (node *PropertyAssignment) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.postfixToken) || visit(v, node.initializer)
}

func isPropertyAssignment(node *Node) bool {
	return node.kind == SyntaxKindPropertyAssignment
}

// ShorthandPropertyAssignment

type ShorthandPropertyAssignment struct {
	NodeBase
	NamedMemberBase
	ObjectLiteralElementBase
	objectAssignmentInitializer *Node // Optional
}

func (f *NodeFactory) NewShorthandPropertyAssignment(modifiers *Node, name *Node, postfixToken *Node, objectAssignmentInitializer *Node) *Node {
	data := &ShorthandPropertyAssignment{}
	data.modifiers = modifiers
	data.name = name
	data.postfixToken = postfixToken
	data.objectAssignmentInitializer = objectAssignmentInitializer
	return f.NewNode(SyntaxKindShorthandPropertyAssignment, data)
}

func (node *ShorthandPropertyAssignment) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.name) || visit(v, node.postfixToken) || visit(v, node.objectAssignmentInitializer)
}

func isShorthandPropertyAssignment(node *Node) bool {
	return node.kind == SyntaxKindShorthandPropertyAssignment
}

// DeleteExpression

type DeleteExpression struct {
	ExpressionBase
	expression *Node
}

func (f *NodeFactory) NewDeleteExpression(expression *Node) *Node {
	data := &DeleteExpression{}
	data.expression = expression
	return f.NewNode(SyntaxKindDeleteExpression, data)

}

func (node *DeleteExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

// TypeOfExpression

type TypeOfExpression struct {
	ExpressionBase
	expression *Node
}

func (f *NodeFactory) NewTypeOfExpression(expression *Node) *Node {
	data := &TypeOfExpression{}
	data.expression = expression
	return f.NewNode(SyntaxKindTypeOfExpression, data)
}

func (node *TypeOfExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

func isTypeOfExpression(node *Node) bool {
	return node.kind == SyntaxKindTypeOfExpression
}

// VoidExpression

type VoidExpression struct {
	ExpressionBase
	expression *Node
}

func (f *NodeFactory) NewVoidExpression(expression *Node) *Node {
	data := &VoidExpression{}
	data.expression = expression
	return f.NewNode(SyntaxKindVoidExpression, data)
}

func (node *VoidExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

// AwaitExpression

type AwaitExpression struct {
	ExpressionBase
	expression *Node
}

func (f *NodeFactory) NewAwaitExpression(expression *Node) *Node {
	data := &AwaitExpression{}
	data.expression = expression
	return f.NewNode(SyntaxKindAwaitExpression, data)
}

func (node *AwaitExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

// TypeAssertion

type TypeAssertion struct {
	ExpressionBase
	typeNode   *Node
	expression *Node
}

func (f *NodeFactory) NewTypeAssertion(typeNode *Node, expression *Node) *Node {
	data := &TypeAssertion{}
	data.typeNode = typeNode
	data.expression = expression
	return f.NewNode(SyntaxKindTypeAssertionExpression, data)
}

func (node *TypeAssertion) ForEachChild(v Visitor) bool {
	return visit(v, node.typeNode) || visit(v, node.expression)
}

// TypeNodeBase

type TypeNodeBase struct {
	NodeBase
}

// KeywordTypeNode

type KeywordTypeNode struct {
	TypeNodeBase
}

func (f *NodeFactory) NewKeywordTypeNode(kind SyntaxKind) *Node {
	return f.NewNode(kind, &KeywordTypeNode{})
}

// UnionOrIntersectionTypeBase

type UnionOrIntersectionTypeNodeBase struct {
	TypeNodeBase
	types []*Node
}

func (node *UnionOrIntersectionTypeNodeBase) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.types)
}

// UnionTypeNode

type UnionTypeNode struct {
	UnionOrIntersectionTypeNodeBase
}

func (f *NodeFactory) NewUnionTypeNode(types []*Node) *Node {
	data := &UnionTypeNode{}
	data.types = types
	return f.NewNode(SyntaxKindUnionType, data)
}

// IntersectionTypeNode

type IntersectionTypeNode struct {
	UnionOrIntersectionTypeNodeBase
}

func (f *NodeFactory) NewIntersectionTypeNode(types []*Node) *Node {
	data := &IntersectionTypeNode{}
	data.types = types
	return f.NewNode(SyntaxKindIntersectionType, data)
}

// ConditionalTypeNode

type ConditionalTypeNode struct {
	TypeNodeBase
	LocalsContainerBase
	checkType   *Node
	extendsType *Node
	trueType    *Node
	falseType   *Node
}

func (f *NodeFactory) NewConditionalTypeNode(checkType *Node, extendsType *Node, trueType *Node, falseType *Node) *Node {
	data := &ConditionalTypeNode{}
	data.checkType = checkType
	data.extendsType = extendsType
	data.trueType = trueType
	data.falseType = falseType
	return f.NewNode(SyntaxKindConditionalType, data)
}

func (node *ConditionalTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.checkType) || visit(v, node.extendsType) || visit(v, node.trueType) || visit(v, node.falseType)
}

func isConditionalTypeNode(node *Node) bool {
	return node.kind == SyntaxKindConditionalType
}

// TypeOperatorNode

type TypeOperatorNode struct {
	TypeNodeBase
	operator SyntaxKind // SyntaxKindKeyOfKeyword | SyntaxKindUniqueKeyword | SyntaxKindReadonlyKeyword
	typeNode *Node
}

func (f *NodeFactory) NewTypeOperatorNode(operator SyntaxKind, typeNode *Node) *Node {
	data := &TypeOperatorNode{}
	data.operator = operator
	data.typeNode = typeNode
	return f.NewNode(SyntaxKindTypeOperator, data)
}

func (node *TypeOperatorNode) ForEachChild(v Visitor) bool {
	return visit(v, node.typeNode)
}

func isTypeOperatorNode(node *Node) bool {
	return node.kind == SyntaxKindTypeOperator
}

// InferTypeNode

type InferTypeNode struct {
	TypeNodeBase
	typeParameter *Node
}

func (f *NodeFactory) NewInferTypeNode(typeParameter *Node) *Node {
	data := &InferTypeNode{}
	data.typeParameter = typeParameter
	return f.NewNode(SyntaxKindInferType, data)
}

func (node *InferTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.typeParameter)
}

// ArrayTypeNode

type ArrayTypeNode struct {
	TypeNodeBase
	elementType *Node
}

func (f *NodeFactory) NewArrayTypeNode(elementType *Node) *Node {
	data := &ArrayTypeNode{}
	data.elementType = elementType
	return f.NewNode(SyntaxKindArrayType, data)
}

func (node *ArrayTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.elementType)
}

// IndexedAccessTypeNode

type IndexedAccessTypeNode struct {
	TypeNodeBase
	objectType *Node
	indexType  *Node
}

func (f *NodeFactory) NewIndexedAccessTypeNode(objectType *Node, indexType *Node) *Node {
	data := &IndexedAccessTypeNode{}
	data.objectType = objectType
	data.indexType = indexType
	return f.NewNode(SyntaxKindIndexedAccessType, data)
}

func (node *IndexedAccessTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.objectType) || visit(v, node.indexType)
}

// TypeArgumentList

type TypeArgumentList struct {
	NodeBase
	arguments []*Node
}

func (f *NodeFactory) NewTypeArgumentList(arguments []*Node) *Node {
	data := &TypeArgumentList{}
	data.arguments = arguments
	return f.NewNode(SyntaxKindTypeArgumentList, data)
}

func (node *TypeArgumentList) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.arguments)
}

// TypeReferenceNode

type TypeReferenceNode struct {
	TypeNodeBase
	typeName      *Node
	typeArguments *Node
}

func (f *NodeFactory) NewTypeReferenceNode(typeName *Node, typeArguments *Node) *Node {
	data := &TypeReferenceNode{}
	data.typeName = typeName
	data.typeArguments = typeArguments
	return f.NewNode(SyntaxKindTypeReference, data)
}

func (node *TypeReferenceNode) ForEachChild(v Visitor) bool {
	return visit(v, node.typeName) || visit(v, node.typeArguments)
}

func isTypeReferenceNode(node *Node) bool {
	return node.kind == SyntaxKindTypeReference
}

// ExpressionWithTypeArguments

type ExpressionWithTypeArguments struct {
	ExpressionBase
	expression    *Node
	typeArguments *Node
}

func (f *NodeFactory) NewExpressionWithTypeArguments(expression *Node, typeArguments *Node) *Node {
	data := &ExpressionWithTypeArguments{}
	data.expression = expression
	data.typeArguments = typeArguments
	return f.NewNode(SyntaxKindExpressionWithTypeArguments, data)
}

func (node *ExpressionWithTypeArguments) ForEachChild(v Visitor) bool {
	return visit(v, node.expression) || visit(v, node.typeArguments)
}

// LiteralTypeNode

type LiteralTypeNode struct {
	TypeNodeBase
	literal *Node // KeywordExpression | LiteralExpression | PrefixUnaryExpression
}

func (f *NodeFactory) NewLiteralTypeNode(literal *Node) *Node {
	data := &LiteralTypeNode{}
	data.literal = literal
	return f.NewNode(SyntaxKindLiteralType, data)
}

func (node *LiteralTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.literal)
}

func isLiteralTypeNode(node *Node) bool {
	return node.kind == SyntaxKindLiteralType
}

// ThisTypeNode

type ThisTypeNode struct {
	TypeNodeBase
}

func (f *NodeFactory) NewThisTypeNode() *Node {
	return f.NewNode(SyntaxKindThisType, &ThisTypeNode{})
}

// TypePredicateNode

type TypePredicateNode struct {
	TypeNodeBase
	assertsModifier *Node // Optional
	parameterName   *Node // Identifier | ThisTypeNode
	typeNode        *Node // Optional
}

func (f *NodeFactory) NewTypePredicateNode(assertsModifier *Node, parameterName *Node, typeNode *Node) *Node {
	data := &TypePredicateNode{}
	data.assertsModifier = assertsModifier
	data.parameterName = parameterName
	data.typeNode = typeNode
	return f.NewNode(SyntaxKindTypePredicate, data)
}

func (node *TypePredicateNode) ForEachChild(v Visitor) bool {
	return visit(v, node.assertsModifier) || visit(v, node.parameterName) || visit(v, node.typeNode)
}

// ImportTypeNode

type ImportTypeNode struct {
	TypeNodeBase
	isTypeOf      bool
	argument      *Node
	attributes    *Node // Optional
	qualifier     *Node // Optional
	typeArguments *Node // Optional
}

func (f *NodeFactory) NewImportTypeNode(isTypeOf bool, argument *Node, attributes *Node, qualifier *Node, typeArguments *Node) *Node {
	data := &ImportTypeNode{}
	data.isTypeOf = isTypeOf
	data.argument = argument
	data.attributes = attributes
	data.qualifier = qualifier
	data.typeArguments = typeArguments
	return f.NewNode(SyntaxKindImportType, data)
}

func (node *ImportTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.argument) || visit(v, node.attributes) || visit(v, node.qualifier) || visit(v, node.typeArguments)
}

func isImportTypeNode(node *Node) bool {
	return node.kind == SyntaxKindImportType
}

// ImportAttribute

type ImportAttribute struct {
	NodeBase
	name  *Node
	value *Node
}

func (f *NodeFactory) NewImportAttribute(name *Node, value *Node) *Node {
	data := &ImportAttribute{}
	data.name = name
	data.value = value
	return f.NewNode(SyntaxKindImportAttribute, data)
}

func (node *ImportAttribute) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.value)
}

// ImportAttributes

type ImportAttributes struct {
	NodeBase
	token      SyntaxKind
	attributes []*Node
	multiLine  bool
}

func (f *NodeFactory) NewImportAttributes(token SyntaxKind, attributes []*Node, multiLine bool) *Node {
	data := &ImportAttributes{}
	data.token = token
	data.attributes = attributes
	data.multiLine = multiLine
	return f.NewNode(SyntaxKindImportAttributes, data)
}

func (node *ImportAttributes) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.attributes)
}

// TypeQueryNode

type TypeQueryNode struct {
	TypeNodeBase
	exprName      *Node
	typeArguments *Node
}

func (f *NodeFactory) NewTypeQueryNode(exprName *Node, typeArguments *Node) *Node {
	data := &TypeQueryNode{}
	data.exprName = exprName
	data.typeArguments = typeArguments
	return f.NewNode(SyntaxKindTypeQuery, data)
}

func (node *TypeQueryNode) ForEachChild(v Visitor) bool {
	return visit(v, node.exprName) || visit(v, node.typeArguments)
}

func isTypeQueryNode(node *Node) bool {
	return node.kind == SyntaxKindTypeQuery
}

// MappedTypeNode

type MappedTypeNode struct {
	TypeNodeBase
	DeclarationBase
	LocalsContainerBase
	readonlyToken *Node // Optional
	typeParameter *Node
	nameType      *Node   // Optional
	questionToken *Node   // Optional
	typeNode      *Node   // Optional (error if missing)
	members       []*Node // Used only to produce grammar errors
}

func (f *NodeFactory) NewMappedTypeNode(readonlyToken *Node, typeParameter *Node, nameType *Node, questionToken *Node, typeNode *Node, members []*Node) *Node {
	data := &MappedTypeNode{}
	data.readonlyToken = readonlyToken
	data.typeParameter = typeParameter
	data.nameType = nameType
	data.questionToken = questionToken
	data.typeNode = typeNode
	data.members = members
	return f.NewNode(SyntaxKindMappedType, data)
}

func (node *MappedTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.readonlyToken) || visit(v, node.typeParameter) || visit(v, node.nameType) ||
		visit(v, node.questionToken) || visit(v, node.typeNode) || visitNodes(v, node.members)
}

// TypeLiteralNode

type TypeLiteralNode struct {
	TypeNodeBase
	DeclarationBase
	members []*TypeElement
}

func (f *NodeFactory) NewTypeLiteralNode(members []*TypeElement) *Node {
	data := &TypeLiteralNode{}
	data.members = members
	return f.NewNode(SyntaxKindTypeLiteral, data)
}

func (node *TypeLiteralNode) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.members)
}

// TupleTypeNode

type TupleTypeNode struct {
	TypeNodeBase
	elements []*TypeNode
}

func (f *NodeFactory) NewTupleTypeNode(elements []*TypeNode) *Node {
	data := &TupleTypeNode{}
	data.elements = elements
	return f.NewNode(SyntaxKindTupleType, data)
}

func (node *TupleTypeNode) Kind() SyntaxKind {
	return SyntaxKindTupleType
}

func (node *TupleTypeNode) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.elements)
}

// NamedTupleTypeMember

type NamedTupleMember struct {
	TypeNodeBase
	DeclarationBase
	dotDotDotToken *Node
	name           *Node
	questionToken  *Node
	typeNode       *Node
}

func (f *NodeFactory) NewNamedTupleTypeMember(dotDotDotToken *Node, name *Node, questionToken *Node, typeNode *Node) *Node {
	data := &NamedTupleMember{}
	data.dotDotDotToken = dotDotDotToken
	data.name = name
	data.questionToken = questionToken
	data.typeNode = typeNode
	return f.NewNode(SyntaxKindNamedTupleMember, data)
}

func (node *NamedTupleMember) ForEachChild(v Visitor) bool {
	return visit(v, node.dotDotDotToken) || visit(v, node.name) || visit(v, node.questionToken) || visit(v, node.typeNode)
}

func isNamedTupleMember(node *Node) bool {
	return node.kind == SyntaxKindNamedTupleMember
}

// OptionalTypeNode

type OptionalTypeNode struct {
	TypeNodeBase
	typeNode *TypeNode
}

func (f *NodeFactory) NewOptionalTypeNode(typeNode *TypeNode) *Node {
	data := &OptionalTypeNode{}
	data.typeNode = typeNode
	return f.NewNode(SyntaxKindOptionalType, data)
}

func (node *OptionalTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.typeNode)
}

// RestTypeNode

type RestTypeNode struct {
	TypeNodeBase
	typeNode *TypeNode
}

func (f *NodeFactory) NewRestTypeNode(typeNode *TypeNode) *Node {
	data := &RestTypeNode{}
	data.typeNode = typeNode
	return f.NewNode(SyntaxKindRestType, data)
}

func (node *RestTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.typeNode)
}

// ParenthesizedTypeNode

type ParenthesizedTypeNode struct {
	TypeNodeBase
	typeNode *TypeNode
}

func (f *NodeFactory) NewParenthesizedTypeNode(typeNode *TypeNode) *Node {
	data := &ParenthesizedTypeNode{}
	data.typeNode = typeNode
	return f.NewNode(SyntaxKindParenthesizedType, data)
}

func (node *ParenthesizedTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.typeNode)
}

func isParenthesizedTypeNode(node *Node) bool {
	return node.kind == SyntaxKindParenthesizedType
}

// FunctionOrConstructorTypeNodeBase

type FunctionOrConstructorTypeNodeBase struct {
	TypeNodeBase
	DeclarationBase
	ModifiersBase
	FunctionLikeBase
}

func (node *FunctionOrConstructorTypeNodeBase) ForEachChild(v Visitor) bool {
	return visit(v, node.modifiers) || visit(v, node.typeParameters) || visitNodes(v, node.parameters) || visit(v, node.returnType)
}

// FunctionTypeNode

type FunctionTypeNode struct {
	FunctionOrConstructorTypeNodeBase
}

func (f *NodeFactory) NewFunctionTypeNode(typeParameters *Node, parameters []*Node, returnType *Node) *Node {
	data := &FunctionTypeNode{}
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	return f.NewNode(SyntaxKindFunctionType, data)
}

func isFunctionTypeNode(node *Node) bool {
	return node.kind == SyntaxKindFunctionType
}

// ConstructorTypeNode

type ConstructorTypeNode struct {
	FunctionOrConstructorTypeNodeBase
}

func (f *NodeFactory) NewConstructorTypeNode(modifiers *Node, typeParameters *Node, parameters []*Node, returnType *Node) *Node {
	data := &ConstructorTypeNode{}
	data.modifiers = modifiers
	data.typeParameters = typeParameters
	data.parameters = parameters
	data.returnType = returnType
	return f.NewNode(SyntaxKindConstructorType, data)
}

// TemplateLiteralLikeBase

type TemplateLiteralLikeBase struct {
	LiteralLikeBase
	rawText       string
	templateFlags TokenFlags
}

// TemplateHead

type TemplateHead struct {
	NodeBase
	TemplateLiteralLikeBase
}

func (f *NodeFactory) NewTemplateHead(text string, rawText string, templateFlags TokenFlags) *Node {
	data := &TemplateHead{}
	data.text = text
	data.rawText = rawText
	data.templateFlags = templateFlags
	return f.NewNode(SyntaxKindTemplateHead, data)
}

// TemplateMiddle

type TemplateMiddle struct {
	NodeBase
	TemplateLiteralLikeBase
}

func (f *NodeFactory) NewTemplateMiddle(text string, rawText string, templateFlags TokenFlags) *Node {
	data := &TemplateMiddle{}
	data.text = text
	data.rawText = rawText
	data.templateFlags = templateFlags
	return f.NewNode(SyntaxKindTemplateMiddle, data)
}

// TemplateTail

type TemplateTail struct {
	NodeBase
	TemplateLiteralLikeBase
}

func (f *NodeFactory) NewTemplateTail(text string, rawText string, templateFlags TokenFlags) *Node {
	data := &TemplateTail{}
	data.text = text
	data.rawText = rawText
	data.templateFlags = templateFlags
	return f.NewNode(SyntaxKindTemplateTail, data)
}

// TemplateLiteralTypeNode

type TemplateLiteralTypeNode struct {
	TypeNodeBase
	head          *Node
	templateSpans []*Node
}

func (f *NodeFactory) NewTemplateLiteralTypeNode(head *Node, templateSpans []*Node) *Node {
	data := &TemplateLiteralTypeNode{}
	data.head = head
	data.templateSpans = templateSpans
	return f.NewNode(SyntaxKindTemplateLiteralType, data)
}

func (node *TemplateLiteralTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.head) || visitNodes(v, node.templateSpans)
}

// TemplateLiteralTypeSpan

type TemplateLiteralTypeSpan struct {
	NodeBase
	typeNode *Node
	literal  *Node
}

func (f *NodeFactory) NewTemplateLiteralTypeSpan(typeNode *Node, literal *Node) *Node {
	data := &TemplateLiteralTypeSpan{}
	data.typeNode = typeNode
	data.literal = literal
	return f.NewNode(SyntaxKindTemplateLiteralTypeSpan, data)
}

func (node *TemplateLiteralTypeSpan) ForEachChild(v Visitor) bool {
	return visit(v, node.typeNode) || visit(v, node.literal)
}

/// A JSX expression of the form <TagName attrs>...</TagName>

type JsxElement struct {
	ExpressionBase
	openingElement *Node
	children       []*Node
	closingElement *Node
}

func (f *NodeFactory) NewJsxElement(openingElement *Node, children []*Node, closingElement *Node) *Node {
	data := &JsxElement{}
	data.openingElement = openingElement
	data.children = children
	data.closingElement = closingElement
	return f.NewNode(SyntaxKindJsxElement, data)
}

func (node *JsxElement) ForEachChild(v Visitor) bool {
	return visit(v, node.openingElement) || visitNodes(v, node.children) || visit(v, node.closingElement)
}

// JsxAttributes

type JsxAttributes struct {
	ExpressionBase
	DeclarationBase
	properties []*JsxAttributeLike
}

func (f *NodeFactory) NewJsxAttributes(properties []*JsxAttributeLike) *Node {
	data := &JsxAttributes{}
	data.properties = properties
	return f.NewNode(SyntaxKindJsxAttributes, data)
}

func (node *JsxAttributes) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.properties)
}

// JsxNamespacedName

type JsxNamespacedName struct {
	ExpressionBase
	name      *Node
	namespace *Node
}

func (f *NodeFactory) NewJsxNamespacedName(name *Node, namespace *Node) *Node {
	data := &JsxNamespacedName{}
	data.name = name
	data.namespace = namespace
	return f.NewNode(SyntaxKindJsxNamespacedName, data)
}

func (node *JsxNamespacedName) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.namespace)
}

func isJsxNamespacedName(node *Node) bool {
	return node.kind == SyntaxKindJsxNamespacedName
}

/// The opening element of a <Tag>...</Tag> JsxElement

type JsxOpeningElement struct {
	ExpressionBase
	tagName       *Node // Identifier | KeywordExpression | PropertyAccessExpression | JsxNamespacedName
	typeArguments *Node
	attributes    *Node
}

func (f *NodeFactory) NewJsxOpeningElement(tagName *Node, typeArguments *Node, attributes *Node) *Node {
	data := &JsxOpeningElement{}
	data.tagName = tagName
	data.typeArguments = typeArguments
	data.attributes = attributes
	return f.NewNode(SyntaxKindJsxOpeningElement, data)
}

func (node *JsxOpeningElement) ForEachChild(v Visitor) bool {
	return visit(v, node.tagName) || visit(v, node.typeArguments) || visit(v, node.attributes)
}

func isJsxOpeningElement(node *Node) bool {
	return node.kind == SyntaxKindJsxOpeningElement
}

/// A JSX expression of the form <TagName attrs />

type JsxSelfClosingElement struct {
	ExpressionBase
	tagName       *Node // Identifier | KeywordExpression | PropertyAccessExpression | JsxNamespacedName
	typeArguments *Node
	attributes    *Node
}

func (f *NodeFactory) NewJsxSelfClosingElement(tagName *Node, typeArguments *Node, attributes *Node) *Node {
	data := &JsxSelfClosingElement{}
	data.tagName = tagName
	data.typeArguments = typeArguments
	data.attributes = attributes
	return f.NewNode(SyntaxKindJsxSelfClosingElement, data)
}

func (node *JsxSelfClosingElement) ForEachChild(v Visitor) bool {
	return visit(v, node.tagName) || visit(v, node.typeArguments) || visit(v, node.attributes)
}

/// A JSX expression of the form <>...</>

type JsxFragment struct {
	ExpressionBase
	openingFragment *Node
	children        []*Node
	closingFragment *Node
}

func (f *NodeFactory) NewJsxFragment(openingFragment *Node, children []*Node, closingFragment *Node) *Node {
	data := &JsxFragment{}
	data.openingFragment = openingFragment
	data.children = children
	data.closingFragment = closingFragment
	return f.NewNode(SyntaxKindJsxFragment, data)
}

func (node *JsxFragment) ForEachChild(v Visitor) bool {
	return visit(v, node.openingFragment) || visitNodes(v, node.children) || visit(v, node.closingFragment)
}

/// The opening element of a <>...</> JsxFragment

type JsxOpeningFragment struct {
	ExpressionBase
}

func (f *NodeFactory) NewJsxOpeningFragment() *Node {
	return f.NewNode(SyntaxKindJsxOpeningFragment, &JsxOpeningFragment{})
}

func isJsxOpeningFragment(node *Node) bool {
	return node.kind == SyntaxKindJsxOpeningFragment
}

/// The closing element of a <>...</> JsxFragment

type JsxClosingFragment struct {
	ExpressionBase
}

func (f *NodeFactory) NewJsxClosingFragment() *Node {
	return f.NewNode(SyntaxKindJsxClosingFragment, &JsxClosingFragment{})
}

// JsxAttribute

type JsxAttribute struct {
	NodeBase
	DeclarationBase
	name *Node
	/// JSX attribute initializers are optional; <X y /> is sugar for <X y={true} />
	initializer *Node
}

func (f *NodeFactory) NewJsxAttribute(name *Node, initializer *Node) *Node {
	data := &JsxAttribute{}
	data.name = name
	data.initializer = initializer
	return f.NewNode(SyntaxKindJsxAttribute, data)
}

func (node *JsxAttribute) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.initializer)
}

func isJsxAttribute(node *Node) bool {
	return node.kind == SyntaxKindJsxAttribute
}

// JsxSpreadAttribute

type JsxSpreadAttribute struct {
	NodeBase
	expression *Node
}

func (f *NodeFactory) NewJsxSpreadAttribute(expression *Node) *Node {
	data := &JsxSpreadAttribute{}
	data.expression = expression
	return f.NewNode(SyntaxKindJsxAttribute, data)
}

func (node *JsxSpreadAttribute) ForEachChild(v Visitor) bool {
	return visit(v, node.expression)
}

// JsxClosingElement

type JsxClosingElement struct {
	NodeBase
	tagName *Node // Identifier | KeywordExpression | PropertyAccessExpression | JsxNamespacedName
}

func (f *NodeFactory) NewJsxClosingElement(tagName *Node) *Node {
	data := &JsxClosingElement{}
	data.tagName = tagName
	return f.NewNode(SyntaxKindJsxClosingElement, data)
}

func (node *JsxClosingElement) ForEachChild(v Visitor) bool {
	return visit(v, node.tagName)
}

// JsxExpression

type JsxExpression struct {
	ExpressionBase
	dotDotDotToken *Node
	expression     *Node
}

func (f *NodeFactory) NewJsxExpression(dotDotDotToken *Node, expression *Node) *Node {
	data := &JsxExpression{}
	data.dotDotDotToken = dotDotDotToken
	data.expression = expression
	return f.NewNode(SyntaxKindJsxExpression, data)
}

func (node *JsxExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.dotDotDotToken) || visit(v, node.expression)
}

// JsxText

type JsxText struct {
	ExpressionBase
	LiteralLikeBase
	containsOnlyTriviaWhiteSpaces bool
}

func (f *NodeFactory) NewJsxText(text string, containsOnlyTriviaWhiteSpace bool) *Node {
	data := &JsxText{}
	data.text = text
	data.containsOnlyTriviaWhiteSpaces = containsOnlyTriviaWhiteSpace
	return f.NewNode(SyntaxKindJsxText, data)
}

// JSDocNonNullableType

type JSDocNonNullableType struct {
	TypeNodeBase
	typeNode *Node
	postfix  bool
}

func (f *NodeFactory) NewJSDocNonNullableType(typeNode *Node, postfix bool) *Node {
	data := &JSDocNonNullableType{}
	data.typeNode = typeNode
	data.postfix = postfix
	return f.NewNode(SyntaxKindJSDocNonNullableType, data)
}

func (node *JSDocNonNullableType) ForEachChild(v Visitor) bool {
	return visit(v, node.typeNode)
}

// JSDocNullableType

type JSDocNullableType struct {
	TypeNodeBase
	typeNode *Node
	postfix  bool
}

func (f *NodeFactory) NewJSDocNullableType(typeNode *Node, postfix bool) *Node {
	data := &JSDocNullableType{}
	data.typeNode = typeNode
	data.postfix = postfix
	return f.NewNode(SyntaxKindJSDocNullableType, data)
}

func (node *JSDocNullableType) ForEachChild(v Visitor) bool {
	return visit(v, node.typeNode)
}

// PatternAmbientModule

type PatternAmbientModule struct {
	pattern Pattern
	symbol  *Symbol
}

// SourceFile

type SourceFile struct {
	NodeBase
	DeclarationBase
	LocalsContainerBase
	text                        string
	fileName                    string
	path                        string
	statements                  []*Statement
	diagnostics                 []*Diagnostic
	bindDiagnostics             []*Diagnostic
	bindSuggestionDiagnostics   []*Diagnostic
	lineMap                     []TextPos
	languageVersion             ScriptTarget
	languageVariant             LanguageVariant
	scriptKind                  ScriptKind
	externalModuleIndicator     *Node
	endFlowNode                 *FlowNode
	jsGlobalAugmentations       SymbolTable
	isDeclarationFile           bool
	isBound                     bool
	moduleReferencesProcessed   bool
	usesUriStyleNodeCoreModules Tristate
	symbolCount                 int
	classifiableNames           map[string]bool
	imports                     []*LiteralLikeNode
	moduleAugmentations         []*ModuleName
	patternAmbientModules       []PatternAmbientModule
	ambientModuleNames          []string
}

func (f *NodeFactory) NewSourceFile(text string, fileName string, statements []*Node) *Node {
	data := &SourceFile{}
	data.text = text
	data.fileName = fileName
	data.statements = statements
	data.languageVersion = ScriptTargetLatest
	return f.NewNode(SyntaxKindSourceFile, data)
}

func (node *SourceFile) FileName() string {
	return node.fileName
}

func (node *SourceFile) Path() string {
	return node.path
}

func (node *SourceFile) Diagnostics() []*Diagnostic {
	return node.diagnostics
}

func (node *SourceFile) BindDiagnostics() []*Diagnostic {
	return node.bindDiagnostics
}

func (node *SourceFile) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.statements)
}

func isSourceFile(node *Node) bool {
	return node.kind == SyntaxKindSourceFile
}
