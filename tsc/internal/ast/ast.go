package ast

import (
	"fmt"
	"sync"
	"sync/atomic"

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
	binaryExpressionPool             core.Pool[BinaryExpression]
	blockPool                        core.Pool[Block]
	callExpressionPool               core.Pool[CallExpression]
	expressionStatementPool          core.Pool[ExpressionStatement]
	identifierPool                   core.Pool[Identifier]
	ifStatementPool                  core.Pool[IfStatement]
	jsdocPool                        core.Pool[JSDoc]
	jsdocTextPool                    core.Pool[JSDocText]
	keywordTypeNodePool              core.Pool[KeywordTypeNode]
	literalTypeNodePool              core.Pool[LiteralTypeNode]
	modifierListPool                 core.Pool[ModifierList]
	nodeListPool                     core.Pool[NodeList]
	parameterDeclarationPool         core.Pool[ParameterDeclaration]
	parenthesizedExpressionPool      core.Pool[ParenthesizedExpression]
	propertyAccessExpressionPool     core.Pool[PropertyAccessExpression]
	propertyAssignmentPool           core.Pool[PropertyAssignment]
	propertySignatureDeclarationPool core.Pool[PropertySignatureDeclaration]
	returnStatementPool              core.Pool[ReturnStatement]
	stringLiteralPool                core.Pool[StringLiteral]
	tokenPool                        core.Pool[Token]
	typeReferenceNodePool            core.Pool[TypeReferenceNode]
	variableDeclarationListPool      core.Pool[VariableDeclarationList]
	variableDeclarationPool          core.Pool[VariableDeclaration]
	variableStatementPool            core.Pool[VariableStatement]
}

func newNode(kind Kind, data nodeData) *Node {
	n := data.AsNode()
	n.Loc = core.UndefinedTextRange()
	n.Kind = kind
	n.data = data
	return n
}

func updateNode(updated *Node, original *Node) *Node {
	if updated != original {
		updated.Loc = original.Loc
	}
	return updated
}

// NodeList

type NodeList struct {
	Loc   core.TextRange
	Nodes []*Node
}

func (f *NodeFactory) NewNodeList(nodes []*Node) *NodeList {
	list := f.nodeListPool.New()
	list.Loc = core.UndefinedTextRange()
	list.Nodes = nodes
	return list
}

func (list *NodeList) Pos() int { return list.Loc.Pos() }
func (list *NodeList) End() int { return list.Loc.End() }

func (list *NodeList) HasTrailingComma() bool {
	if len(list.Nodes) == 0 || PositionIsSynthesized(list.End()) {
		return false
	}
	last := list.Nodes[len(list.Nodes)-1]
	return !PositionIsSynthesized(last.End()) && last.End() < list.End()
}

// ModifierList

type ModifierList struct {
	NodeList
	ModifierFlags ModifierFlags
}

func (f *NodeFactory) NewModifierList(nodes []*Node) *ModifierList {
	list := f.modifierListPool.New()
	list.Loc = core.UndefinedTextRange()
	list.Nodes = nodes
	list.ModifierFlags = ModifiersToFlags(nodes)
	return list
}

// AST Node
// Interface values stored in AST nodes are never typed nil values. Construction code must ensure that
// interface valued properties either store a true nil or a reference to a non-nil struct.

type Node struct {
	Kind   Kind
	Flags  NodeFlags
	Loc    core.TextRange
	id     atomic.Uint32
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
func (n *Node) VisitEachChild(v *NodeVisitor) *Node       { return n.data.VisitEachChild(v) }
func (n *Node) Name() *DeclarationName                    { return n.data.Name() }
func (n *Node) Modifiers() *ModifierList                  { return n.data.Modifiers() }
func (n *Node) FlowNodeData() *FlowNodeBase               { return n.data.FlowNodeData() }
func (n *Node) DeclarationData() *DeclarationBase         { return n.data.DeclarationData() }
func (n *Node) ExportableData() *ExportableBase           { return n.data.ExportableData() }
func (n *Node) LocalsContainerData() *LocalsContainerBase { return n.data.LocalsContainerData() }
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

func (n *Node) Symbol() *Symbol {
	return n.DeclarationData().Symbol
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
	case KindRegularExpressionLiteral:
		return n.AsRegularExpressionLiteral().Text
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
	case KindExportAssignment:
		return n.AsExportAssignment().Expression
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
	panic("Unhandled case in Node.MemberList")
}

func (n *Node) Members() []*Node {
	list := n.MemberList()
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
	case KindJSDocOptionalType:
		return n.AsJSDocOptionalType().Type
	case KindEnumMember, KindBindingElement, KindExportAssignment, KindBinaryExpression:
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

func (n *Node) TagName() *Node {
	switch n.Kind {
	case KindJsxOpeningElement:
		return n.AsJsxOpeningElement().TagName
	case KindJsxClosingElement:
		return n.AsJsxClosingElement().TagName
	case KindJsxSelfClosingElement:
		return n.AsJsxSelfClosingElement().TagName
	case KindJSDocTag:
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
	case KindJSDocParameterTag:
		return n.AsJSDocParameterTag().TagName
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
	case KindJSDocPropertyTag:
		return n.AsJSDocPropertyTag().TagName
	case KindJSDocSatisfiesTag:
		return n.AsJSDocSatisfiesTag().TagName
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
	panic("Unhandled case in Node.PropertyName: " + n.Kind.String())
}

func (n *Node) PropertyNameOrName() *Node {
	name := n.PropertyName()
	if name == nil {
		name = n.Name()
	}
	return name
}

func (n *Node) Comments() []*Node {
	switch n.Kind {
	case KindJSDoc:
		return n.AsJSDoc().Comment.Nodes
	case KindJSDocTag:
		return n.AsJSDocUnknownTag().Comment.Nodes
	case KindJSDocAugmentsTag:
		return n.AsJSDocAugmentsTag().Comment.Nodes
	case KindJSDocImplementsTag:
		return n.AsJSDocImplementsTag().Comment.Nodes
	case KindJSDocDeprecatedTag:
		return n.AsJSDocDeprecatedTag().Comment.Nodes
	case KindJSDocPublicTag:
		return n.AsJSDocPublicTag().Comment.Nodes
	case KindJSDocPrivateTag:
		return n.AsJSDocPrivateTag().Comment.Nodes
	case KindJSDocProtectedTag:
		return n.AsJSDocProtectedTag().Comment.Nodes
	case KindJSDocReadonlyTag:
		return n.AsJSDocReadonlyTag().Comment.Nodes
	case KindJSDocOverrideTag:
		return n.AsJSDocOverrideTag().Comment.Nodes
	case KindJSDocCallbackTag:
		return n.AsJSDocCallbackTag().Comment.Nodes
	case KindJSDocOverloadTag:
		return n.AsJSDocOverloadTag().Comment.Nodes
	case KindJSDocParameterTag:
		return n.AsJSDocParameterTag().Comment.Nodes
	case KindJSDocReturnTag:
		return n.AsJSDocReturnTag().Comment.Nodes
	case KindJSDocThisTag:
		return n.AsJSDocThisTag().Comment.Nodes
	case KindJSDocTypeTag:
		return n.AsJSDocTypeTag().Comment.Nodes
	case KindJSDocTemplateTag:
		return n.AsJSDocTemplateTag().Comment.Nodes
	case KindJSDocTypedefTag:
		return n.AsJSDocTypedefTag().Comment.Nodes
	case KindJSDocSeeTag:
		return n.AsJSDocSeeTag().Comment.Nodes
	case KindJSDocPropertyTag:
		return n.AsJSDocPropertyTag().Comment.Nodes
	case KindJSDocSatisfiesTag:
		return n.AsJSDocSatisfiesTag().Comment.Nodes
	case KindJSDocImportTag:
		return n.AsJSDocImportTag().Comment.Nodes
	}
	panic("Unhandled case in Node.Comments: " + n.Kind.String())
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

func (n *Node) AsMissingDeclaration() *MissingDeclaration {
	return n.data.(*MissingDeclaration)
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

func (n *Node) AsSyntaxList() *SyntaxList {
	return n.data.(*SyntaxList)
}

// NodeData

type nodeData interface {
	AsNode() *Node
	ForEachChild(v Visitor) bool
	VisitEachChild(v *NodeVisitor) *Node
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
func (node *NodeDefault) VisitEachChild(v *NodeVisitor) *Node               { return node.AsNode() }
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

type (
	Statement                   = Node // Node with StatementBase
	Declaration                 = Node // Node with DeclarationBase
	Expression                  = Node // Node with ExpressionBase
	TypeNode                    = Node // Node with TypeNodeBase
	TypeElement                 = Node // Node with TypeElementBase
	ClassElement                = Node // Node with ClassElementBase
	NamedMember                 = Node // Node with NamedMemberBase
	ObjectLiteralElement        = Node // Node with ObjectLiteralElementBase
	BlockOrExpression           = Node // Block | Expression
	AccessExpression            = Node // PropertyAccessExpression | ElementAccessExpression
	DeclarationName             = Node // Identifier | PrivateIdentifier | StringLiteral | NumericLiteral | BigIntLiteral | NoSubstitutionTemplateLiteral | ComputedPropertyName | BindingPattern | ElementAccessExpression
	ModuleName                  = Node // Identifier | StringLiteral
	ModuleExportName            = Node // Identifier | StringLiteral
	PropertyName                = Node // Identifier | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | ComputedPropertyName | PrivateIdentifier | BigIntLiteral
	ModuleBody                  = Node // ModuleBlock | ModuleDeclaration
	ForInitializer              = Node // Expression | MissingDeclaration | VariableDeclarationList
	ModuleReference             = Node // Identifier | QualifiedName | ExternalModuleReference
	NamedImportBindings         = Node // NamespaceImport | NamedImports
	NamedExportBindings         = Node // NamespaceExport | NamedExports
	MemberName                  = Node // Identifier | PrivateIdentifier
	EntityName                  = Node // Identifier | QualifiedName
	BindingName                 = Node // Identifier | BindingPattern
	ModifierLike                = Node // Modifier | Decorator
	JsxChild                    = Node // JsxText | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment
	JsxAttributeLike            = Node // JsxAttribute | JsxSpreadAttribute
	JsxAttributeName            = Node // Identifier | JsxNamespacedName
	JsxAttributeValue           = Node // StringLiteral | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment
	JsxTagNameExpression        = Node // IdentifierReference | KeywordExpression | JsxTagNamePropertyAccess | JsxNamespacedName
	ClassLikeDeclaration        = Node // ClassDeclaration | ClassExpression
	AccessorDeclaration         = Node // GetAccessorDeclaration | SetAccessorDeclaration
	LiteralLikeNode             = Node // StringLiteral | NumericLiteral | BigIntLiteral | RegularExpressionLiteral | TemplateLiteralLikeNode | JsxText
	LiteralExpression           = Node // StringLiteral | NumericLiteral | BigIntLiteral | RegularExpressionLiteral | NoSubstitutionTemplateLiteral
	UnionOrIntersectionTypeNode = Node // UnionTypeNode | IntersectionTypeNode
	TemplateLiteralLikeNode     = Node // TemplateHead | TemplateMiddle | TemplateTail
	TemplateMiddleOrTail        = Node // TemplateMiddle | TemplateTail
	TemplateLiteral             = Node // TemplateExpression | NoSubstitutionTemplateLiteral
	TypePredicateParameterName  = Node // Identifier | ThisTypeNode
	ImportAttributeName         = Node // Identifier | StringLiteral
	LeftHandSideExpression      = Node // subset of Expression
	JSDocComment                = Node // JSDocText | JSDocLink | JSDocLinkCode | JSDocLinkPlain;
	JSDocTag                    = Node // Node with JSDocTagBase
	SignatureDeclaration        = Node // CallSignatureDeclaration | ConstructSignatureDeclaration | MethodSignature | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | JSDocFunctionType | FunctionDeclaration | MethodDeclaration | ConstructorDeclaration | AccessorDeclaration | FunctionExpression | ArrowFunction;
)

// Aliases for node singletons

type (
	IdentifierNode                  = Node
	PrivateIdentifierNode           = Node
	TokenNode                       = Node
	StringLiteralNode               = Node
	TemplateHeadNode                = Node
	TemplateMiddleNode              = Node
	TemplateTailNode                = Node
	TemplateSpanNode                = Node
	TemplateLiteralTypeSpanNode     = Node
	BlockNode                       = Node
	CatchClauseNode                 = Node
	CaseBlockNode                   = Node
	CaseOrDefaultClauseNode         = Node
	VariableDeclarationNode         = Node
	VariableDeclarationListNode     = Node
	BindingElementNode              = Node
	TypeParameterDeclarationNode    = Node
	ParameterDeclarationNode        = Node
	HeritageClauseNode              = Node
	ExpressionWithTypeArgumentsNode = Node
	EnumDeclarationNode             = Node
	EnumMemberNode                  = Node
	ModuleDeclarationNode           = Node
	ImportClauseNode                = Node
	ImportAttributesNode            = Node
	ImportAttributeNode             = Node
	ImportSpecifierNode             = Node
	ExportSpecifierNode             = Node
	JsxAttributesNode               = Node
	JsxOpeningElementNode           = Node
	JsxClosingElementNode           = Node
	JsxOpeningFragmentNode          = Node
	JsxClosingFragmentNode          = Node
)

type (
	StatementList                   = NodeList // NodeList[*Statement]
	CaseClausesList                 = NodeList // NodeList[*CaseOrDefaultClause]
	VariableDeclarationNodeList     = NodeList // NodeList[*VariableDeclaration]
	BindingElementList              = NodeList // NodeList[*BindingElement]
	TypeParameterList               = NodeList // NodeList[*TypeParameterDeclaration]
	ParameterList                   = NodeList // NodeList[*ParameterDeclaration]
	HeritageClauseList              = NodeList // NodeList[*HeritageClause]
	ClassElementList                = NodeList // NodeList[*ClassElement]
	TypeElementList                 = NodeList // NodeList[*TypeElement]
	ExpressionWithTypeArgumentsList = NodeList // NodeList[*ExpressionWithTypeArguments]
	EnumMemberList                  = NodeList // NodeList[*EnumMember]
	ImportSpecifierList             = NodeList // NodeList[*ImportSpecifier]
	ExportSpecifierList             = NodeList // NodeList[*ExportSpecifier]
	TypeArgumentList                = NodeList // NodeList[*TypeNode]
	ArgumentList                    = NodeList // NodeList[*Expression]
	TemplateSpanList                = NodeList // NodeList[*TemplateSpan]
	ElementList                     = NodeList // NodeList[*Expression]
	PropertyDefinitionList          = NodeList // NodeList[*ObjectLiteralElement]
	TypeList                        = NodeList // NodeList[*TypeNode]
	ImportAttributeList             = NodeList // NodeList[*ImportAttributeNode]
	TemplateLiteralTypeSpanList     = NodeList // NodeList[*TemplateLiteralTypeSpan]
	JsxChildList                    = NodeList // NodeList[*JsxChild]
	JsxAttributeList                = NodeList // NodeList[*JsxAttributeLike]
)

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

func (f *NodeFactory) UpdateQualifiedName(node *QualifiedName, left *EntityName, right *IdentifierNode) *Node {
	if left != node.Left || right != node.Right {
		return updateNode(f.NewQualifiedName(left, right), node.AsNode())
	}
	return node.AsNode()
}

func (node *QualifiedName) ForEachChild(v Visitor) bool {
	return visit(v, node.Left) || visit(v, node.Right)
}

func (node *QualifiedName) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateQualifiedName(node, v.visitNode(node.Left), v.visitNode(node.Right))
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

func (f *NodeFactory) UpdateTypeParameterDeclaration(node *TypeParameterDeclaration, modifiers *ModifierList, name *IdentifierNode, constraint *TypeNode, defaultType *TypeNode) *Node {
	if modifiers != node.modifiers || name != node.name || constraint != node.Constraint || defaultType != node.DefaultType {
		return updateNode(f.NewTypeParameterDeclaration(modifiers, name, constraint, defaultType), node.AsNode())
	}
	return node.AsNode()
}

func (node *TypeParameterDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.Constraint) || visit(v, node.DefaultType)
}

func (node *TypeParameterDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTypeParameterDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitNode(node.Constraint), v.visitNode(node.DefaultType))
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

func (f *NodeFactory) UpdateComputedPropertyName(node *ComputedPropertyName, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewComputedPropertyName(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *ComputedPropertyName) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *ComputedPropertyName) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateComputedPropertyName(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateDecorator(node *Decorator, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewDecorator(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *Decorator) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *Decorator) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateDecorator(node, v.visitNode(node.Expression))
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
	data := f.ifStatementPool.New()
	data.Expression = expression
	data.ThenStatement = thenStatement
	data.ElseStatement = elseStatement
	return newNode(KindIfStatement, data)
}

func (f *NodeFactory) UpdateIfStatement(node *IfStatement, expression *Expression, thenStatement *Statement, elseStatement *Statement) *Node {
	if expression != node.Expression || thenStatement != node.ThenStatement || elseStatement != node.ElseStatement {
		return updateNode(f.NewIfStatement(expression, thenStatement, elseStatement), node.AsNode())
	}
	return node.AsNode()
}

func (node *IfStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.ThenStatement) || visit(v, node.ElseStatement)
}

func (node *IfStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateIfStatement(node, v.visitNode(node.Expression), v.visitNode(node.ThenStatement), v.visitNode(node.ElseStatement))
}

// DoStatement

type DoStatement struct {
	StatementBase
	Statement  *Statement  // Statement
	Expression *Expression // Expression
}

func (f *NodeFactory) UpdateDoStatement(node *DoStatement, statement *Statement, expression *Expression) *Node {
	if statement != node.Statement || expression != node.Expression {
		return updateNode(f.NewDoStatement(statement, expression), node.AsNode())
	}
	return node.AsNode()
}

func (f *NodeFactory) NewDoStatement(statement *Statement, expression *Expression) *Node {
	data := &DoStatement{}
	data.Statement = statement
	data.Expression = expression
	return newNode(KindDoStatement, data)
}

func (node *DoStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateDoStatement(node, v.visitNode(node.Statement), v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateWhileStatement(node *WhileStatement, expression *Expression, statement *Statement) *Node {
	if expression != node.Expression || statement != node.Statement {
		return updateNode(f.NewWhileStatement(expression, statement), node.AsNode())
	}
	return node.AsNode()
}

func (node *WhileStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.Statement)
}

func (node *WhileStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateWhileStatement(node, v.visitNode(node.Expression), v.visitNode(node.Statement))
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

func (f *NodeFactory) UpdateForStatement(node *ForStatement, initializer *ForInitializer, condition *Expression, incrementor *Expression, statement *Statement) *Node {
	if initializer != node.Initializer || condition != node.Condition || incrementor != node.Incrementor || statement != node.Statement {
		return updateNode(f.NewForStatement(initializer, condition, incrementor, statement), node.AsNode())
	}
	return node.AsNode()
}

func (node *ForStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Initializer) || visit(v, node.Condition) || visit(v, node.Incrementor) || visit(v, node.Statement)
}

func (node *ForStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateForStatement(node, v.visitNode(node.Initializer), v.visitNode(node.Condition), v.visitNode(node.Incrementor), v.visitNode(node.Statement))
}

func IsForStatement(node *Node) bool {
	return node.Kind == KindForStatement
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

func (f *NodeFactory) UpdateForInOrOfStatement(node *ForInOrOfStatement, awaitModifier *TokenNode, initializer *ForInitializer, expression *Expression, statement *Statement) *Node {
	if awaitModifier != node.AwaitModifier || initializer != node.Initializer || expression != node.Expression || statement != node.Statement {
		return updateNode(f.NewForInOrOfStatement(node.AsNode().Kind, awaitModifier, initializer, expression, statement), node.AsNode())
	}
	return node.AsNode()
}

func (node *ForInOrOfStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.AwaitModifier) || visit(v, node.Initializer) || visit(v, node.Expression) || visit(v, node.Statement)
}

func (node *ForInOrOfStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateForInOrOfStatement(node, v.visitToken(node.AwaitModifier), v.visitNode(node.Initializer), v.visitNode(node.Expression), v.visitNode(node.Statement))
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

func (f *NodeFactory) UpdateBreakStatement(node *BreakStatement, label *IdentifierNode) *Node {
	if label != node.Label {
		return updateNode(f.NewBreakStatement(label), node.AsNode())
	}
	return node.AsNode()
}

func (node *BreakStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Label)
}

func (node *BreakStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateBreakStatement(node, v.visitNode(node.Label))
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

func (f *NodeFactory) UpdateContinueStatement(node *ContinueStatement, label *IdentifierNode) *Node {
	if label != node.Label {
		return updateNode(f.NewContinueStatement(label), node.AsNode())
	}
	return node.AsNode()
}

func (node *ContinueStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Label)
}

func (node *ContinueStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateContinueStatement(node, v.visitNode(node.Label))
}

// ReturnStatement

type ReturnStatement struct {
	StatementBase
	Expression *Expression // Expression. Optional
}

func (f *NodeFactory) NewReturnStatement(expression *Expression) *Node {
	data := f.returnStatementPool.New()
	data.Expression = expression
	return newNode(KindReturnStatement, data)
}

func (f *NodeFactory) UpdateReturnStatement(node *ReturnStatement, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewReturnStatement(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *ReturnStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *ReturnStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateReturnStatement(node, v.visitNode(node.Expression))
}

func IsReturnStatement(node *Node) bool {
	return node.Kind == KindReturnStatement
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

func (f *NodeFactory) UpdateWithStatement(node *WithStatement, expression *Expression, statement *Statement) *Node {
	if expression != node.Expression || statement != node.Statement {
		return updateNode(f.NewWithStatement(expression, statement), node.AsNode())
	}
	return node.AsNode()
}

func (node *WithStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.Statement)
}

func (node *WithStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateWithStatement(node, v.visitNode(node.Expression), v.visitNode(node.Statement))
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

func (f *NodeFactory) UpdateSwitchStatement(node *SwitchStatement, expression *Expression, caseBlock *CaseBlockNode) *Node {
	if expression != node.Expression || caseBlock != node.CaseBlock {
		return updateNode(f.NewSwitchStatement(expression, caseBlock), node.AsNode())
	}
	return node.AsNode()
}

func (node *SwitchStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.CaseBlock)
}

func (node *SwitchStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateSwitchStatement(node, v.visitNode(node.Expression), v.visitNode(node.CaseBlock))
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

func (f *NodeFactory) UpdateCaseBlock(node *CaseBlock, clauses *CaseClausesList) *Node {
	if clauses != node.Clauses {
		return updateNode(f.NewCaseBlock(clauses), node.AsNode())
	}
	return node.AsNode()
}

func (node *CaseBlock) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Clauses)
}

func (node *CaseBlock) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateCaseBlock(node, v.visitNodes(node.Clauses))
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

func (f *NodeFactory) UpdateCaseOrDefaultClause(node *CaseOrDefaultClause, expression *Expression, statements *StatementList) *Node {
	if expression != node.Expression || statements != node.Statements {
		return updateNode(f.NewCaseOrDefaultClause(node.Kind, expression, statements), node.AsNode())
	}
	return node.AsNode()
}

func (node *CaseOrDefaultClause) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visitNodeList(v, node.Statements)
}

func (node *CaseOrDefaultClause) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateCaseOrDefaultClause(node, v.visitNode(node.Expression), v.visitNodes(node.Statements))
}

func IsCaseClause(node *Node) bool {
	return node.Kind == KindCaseClause
}

func IsDefaultClause(node *Node) bool {
	return node.Kind == KindDefaultClause
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

func (f *NodeFactory) UpdateThrowStatement(node *ThrowStatement, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewThrowStatement(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *ThrowStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *ThrowStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateThrowStatement(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateTryStatement(node *TryStatement, tryBlock *BlockNode, catchClause *CatchClauseNode, finallyBlock *BlockNode) *Node {
	if tryBlock != node.TryBlock || catchClause != node.CatchClause || finallyBlock != node.FinallyBlock {
		return updateNode(f.NewTryStatement(tryBlock, catchClause, finallyBlock), node.AsNode())
	}
	return node.AsNode()
}

func (node *TryStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.TryBlock) || visit(v, node.CatchClause) || visit(v, node.FinallyBlock)
}

func (node *TryStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTryStatement(node, v.visitNode(node.TryBlock), v.visitNode(node.CatchClause), v.visitNode(node.FinallyBlock))
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

func (f *NodeFactory) UpdateCatchClause(node *CatchClause, variableDeclaration *VariableDeclarationNode, block *BlockNode) *Node {
	if variableDeclaration != node.VariableDeclaration || block != node.Block {
		return updateNode(f.NewCatchClause(variableDeclaration, block), node.AsNode())
	}
	return node.AsNode()
}

func (node *CatchClause) ForEachChild(v Visitor) bool {
	return visit(v, node.VariableDeclaration) || visit(v, node.Block)
}

func (node *CatchClause) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateCatchClause(node, v.visitNode(node.VariableDeclaration), v.visitNode(node.Block))
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

func (f *NodeFactory) UpdateLabeledStatement(node *LabeledStatement, label *IdentifierNode, statement *Statement) *Node {
	if label != node.Label || statement != node.Statement {
		return updateNode(f.NewLabeledStatement(label, statement), node.AsNode())
	}
	return node.AsNode()
}

func (node *LabeledStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Label) || visit(v, node.Statement)
}

func (node *LabeledStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateLabeledStatement(node, v.visitNode(node.Label), v.visitNode(node.Statement))
}

func IsLabeledStatement(node *Node) bool {
	return node.Kind == KindLabeledStatement
}

// ExpressionStatement

type ExpressionStatement struct {
	StatementBase
	Expression *Expression // Expression
}

func (f *NodeFactory) NewExpressionStatement(expression *Expression) *Node {
	data := f.expressionStatementPool.New()
	data.Expression = expression
	return newNode(KindExpressionStatement, data)
}

func (f *NodeFactory) UpdateExpressionStatement(node *ExpressionStatement, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewExpressionStatement(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *ExpressionStatement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *ExpressionStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateExpressionStatement(node, v.visitNode(node.Expression))
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
	data := f.blockPool.New()
	data.Statements = statements
	data.Multiline = multiline
	return newNode(KindBlock, data)
}

func (f *NodeFactory) UpdateBlock(node *Block, statements *StatementList) *Node {
	if statements != node.Statements {
		return updateNode(f.NewBlock(statements, node.Multiline), node.AsNode())
	}
	return node.AsNode()
}

func (node *Block) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Statements)
}

func (node *Block) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateBlock(node, v.visitNodes(node.Statements))
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
	data := f.variableStatementPool.New()
	data.modifiers = modifiers
	data.DeclarationList = declarationList
	return newNode(KindVariableStatement, data)
}

func (f *NodeFactory) UpdateVariableStatement(node *VariableStatement, modifiers *ModifierList, declarationList *VariableDeclarationListNode) *Node {
	if modifiers != node.modifiers || declarationList != node.DeclarationList {
		return updateNode(f.NewVariableStatement(modifiers, declarationList), node.AsNode())
	}
	return node.AsNode()
}

func (node *VariableStatement) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.DeclarationList)
}

func (node *VariableStatement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateVariableStatement(node, v.visitModifiers(node.modifiers), v.visitNode(node.DeclarationList))
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
	data := f.variableDeclarationPool.New()
	data.name = name
	data.ExclamationToken = exclamationToken
	data.Type = typeNode
	data.Initializer = initializer
	return newNode(KindVariableDeclaration, data)
}

func (f *NodeFactory) UpdateVariableDeclaration(node *VariableDeclaration, name *BindingName, exclamationToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	if name != node.name || exclamationToken != node.ExclamationToken || typeNode != node.Type || initializer != node.Initializer {
		return updateNode(f.NewVariableDeclaration(name, exclamationToken, typeNode, initializer), node.AsNode())
	}
	return node.AsNode()
}

func (node *VariableDeclaration) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.ExclamationToken) || visit(v, node.Type) || visit(v, node.Initializer)
}

func (node *VariableDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateVariableDeclaration(node, v.visitNode(node.name), v.visitToken(node.ExclamationToken), v.visitNode(node.Type), v.visitNode(node.Initializer))
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
	data := f.variableDeclarationListPool.New()
	data.Declarations = declarations
	node := newNode(KindVariableDeclarationList, data)
	node.Flags = flags
	return node
}

func (f *NodeFactory) UpdateVariableDeclarationList(node *VariableDeclarationList, declarations *VariableDeclarationNodeList) *Node {
	if declarations != node.Declarations {
		return updateNode(f.NewVariableDeclarationList(node.Flags, declarations), node.AsNode())
	}
	return node.AsNode()
}

func (node *VariableDeclarationList) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Declarations)
}

func (node *VariableDeclarationList) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateVariableDeclarationList(node, v.visitNodes(node.Declarations))
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

func (f *NodeFactory) UpdateBindingPattern(node *BindingPattern, elements *BindingElementList) *Node {
	if elements != node.Elements {
		return updateNode(f.NewBindingPattern(node.Kind, elements), node.AsNode())
	}
	return node.AsNode()
}

func (node *BindingPattern) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Elements)
}

func (node *BindingPattern) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateBindingPattern(node, v.visitNodes(node.Elements))
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
	data := f.parameterDeclarationPool.New()
	data.modifiers = modifiers
	data.DotDotDotToken = dotDotDotToken
	data.name = name
	data.QuestionToken = questionToken
	data.Type = typeNode
	data.Initializer = initializer
	return newNode(KindParameter, data)
}

func (f *NodeFactory) UpdateParameterDeclaration(node *ParameterDeclaration, modifiers *ModifierList, dotDotDotToken *TokenNode, name *BindingName, questionToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	if modifiers != node.modifiers || dotDotDotToken != node.DotDotDotToken || name != node.name || questionToken != node.QuestionToken || typeNode != node.Type || initializer != node.Initializer {
		return updateNode(f.NewParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, typeNode, initializer), node.AsNode())
	}
	return node.AsNode()
}

func (node *ParameterDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.DotDotDotToken) || visit(v, node.name) ||
		visit(v, node.QuestionToken) || visit(v, node.Type) || visit(v, node.Initializer)
}

func (node *ParameterDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateParameterDeclaration(node, v.visitModifiers(node.modifiers), v.visitToken(node.DotDotDotToken), v.visitNode(node.name), v.visitToken(node.QuestionToken), v.visitNode(node.Type), v.visitNode(node.Initializer))
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

func (f *NodeFactory) UpdateBindingElement(node *BindingElement, dotDotDotToken *TokenNode, propertyName *PropertyName, name *BindingName, initializer *Expression) *Node {
	if dotDotDotToken != node.DotDotDotToken || propertyName != node.PropertyName || name != node.name || initializer != node.Initializer {
		return updateNode(f.NewBindingElement(dotDotDotToken, propertyName, name, initializer), node.AsNode())
	}
	return node.AsNode()
}

func (node *BindingElement) ForEachChild(v Visitor) bool {
	return visit(v, node.DotDotDotToken) || visit(v, node.PropertyName) || visit(v, node.name) || visit(v, node.Initializer)
}

func (node *BindingElement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateBindingElement(node, v.visitToken(node.DotDotDotToken), v.visitNode(node.PropertyName), v.visitNode(node.name), v.visitNode(node.Initializer))
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

func (f *NodeFactory) UpdateMissingDeclaration(node *MissingDeclaration, modifiers *ModifierList) *Node {
	if modifiers != node.modifiers {
		return updateNode(f.NewMissingDeclaration(modifiers), node.AsNode())
	}
	return node.AsNode()
}

func (node *MissingDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers)
}

func (node *MissingDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateMissingDeclaration(node, v.visitModifiers(node.modifiers))
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

func (f *NodeFactory) UpdateFunctionDeclaration(node *FunctionDeclaration, modifiers *ModifierList, asteriskToken *TokenNode, name *IdentifierNode, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode, body *BlockNode) *Node {
	if modifiers != node.modifiers || asteriskToken != node.AsteriskToken || name != node.name || typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type || body != node.Body {
		return updateNode(f.NewFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, returnType, body), node.AsNode())
	}
	return node.AsNode()
}

func (node *FunctionDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.AsteriskToken) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.Parameters) || visit(v, node.Type) || visit(v, node.Body)
}

func (node *FunctionDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateFunctionDeclaration(node, v.visitModifiers(node.modifiers), v.visitToken(node.AsteriskToken), v.visitNode(node.name), v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type), v.visitNode(node.Body))
}

func (node *FunctionDeclaration) Name() *DeclarationName {
	return node.name
}

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

func (f *NodeFactory) UpdateClassDeclaration(node *ClassDeclaration, modifiers *ModifierList, name *IdentifierNode, typeParameters *TypeParameterList, heritageClauses *HeritageClauseList, members *ClassElementList) *Node {
	if modifiers != node.modifiers || name != node.name || typeParameters != node.TypeParameters || heritageClauses != node.HeritageClauses || members != node.Members {
		return updateNode(f.NewClassDeclaration(modifiers, name, typeParameters, heritageClauses, members), node.AsNode())
	}
	return node.AsNode()
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

func (node *ClassDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	modifiers := v.visitModifiers(node.modifiers)
	name := v.visitNode(node.name)
	typeParameters := v.visitNodes(node.TypeParameters)
	heritageClauses := v.visitNodes(node.HeritageClauses)
	if heritageClauses != nil && len(heritageClauses.Nodes) == 0 {
		heritageClauses = nil
	}
	members := v.visitNodes(node.Members)
	return v.Factory.UpdateClassDeclaration(node, modifiers, name, typeParameters, heritageClauses, members)
}

func IsClassDeclaration(node *Node) bool {
	return node.Kind == KindClassDeclaration
}

// ClassExpression

type ClassExpression struct {
	ExpressionBase
	ClassLikeBase
}

func (f *NodeFactory) UpdateClassExpression(node *ClassExpression, modifiers *ModifierList, name *IdentifierNode, typeParameters *TypeParameterList, heritageClauses *HeritageClauseList, members *ClassElementList) *Node {
	if modifiers != node.modifiers || name != node.name || typeParameters != node.TypeParameters || heritageClauses != node.HeritageClauses || members != node.Members {
		return updateNode(f.NewClassExpression(modifiers, name, typeParameters, heritageClauses, members), node.AsNode())
	}
	return node.AsNode()
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

func (node *ClassExpression) VisitEachChild(v *NodeVisitor) *Node {
	modifiers := v.visitModifiers(node.modifiers)
	name := v.visitNode(node.name)
	typeParameters := v.visitNodes(node.TypeParameters)
	heritageClauses := v.visitNodes(node.HeritageClauses)
	if heritageClauses != nil && len(heritageClauses.Nodes) == 0 {
		heritageClauses = nil
	}
	members := v.visitNodes(node.Members)
	return v.Factory.UpdateClassExpression(node, modifiers, name, typeParameters, heritageClauses, members)
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

func (f *NodeFactory) UpdateHeritageClause(node *HeritageClause, types *ExpressionWithTypeArgumentsList) *Node {
	if types != node.Types {
		return updateNode(f.NewHeritageClause(node.Token, types), node.AsNode())
	}
	return node.AsNode()
}

func (node *HeritageClause) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Types)
}

func (node *HeritageClause) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateHeritageClause(node, v.visitNodes(node.Types))
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

func (f *NodeFactory) UpdateInterfaceDeclaration(node *InterfaceDeclaration, modifiers *ModifierList, name *IdentifierNode, typeParameters *TypeParameterList, heritageClauses *HeritageClauseList, members *TypeElementList) *Node {
	if modifiers != node.modifiers || name != node.name || typeParameters != node.TypeParameters || heritageClauses != node.HeritageClauses || members != node.Members {
		return updateNode(f.NewInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members), node.AsNode())
	}
	return node.AsNode()
}

func (node *InterfaceDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.HeritageClauses) || visitNodeList(v, node.Members)
}

func (node *InterfaceDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateInterfaceDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitNodes(node.TypeParameters), v.visitNodes(node.HeritageClauses), v.visitNodes(node.Members))
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

func (f *NodeFactory) UpdateTypeAliasDeclaration(node *TypeAliasDeclaration, modifiers *ModifierList, name *IdentifierNode, typeParameters *TypeParameterList, typeNode *TypeNode) *Node {
	if modifiers != node.modifiers || name != node.name || typeParameters != node.TypeParameters || typeNode != node.Type {
		return updateNode(f.NewTypeAliasDeclaration(modifiers, name, typeParameters, typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *TypeAliasDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) || visit(v, node.Type)
}

func (node *TypeAliasDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTypeAliasDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitNodes(node.TypeParameters), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateEnumMember(node *EnumMember, name *PropertyName, initializer *Expression) *Node {
	if name != node.name || initializer != node.Initializer {
		return updateNode(f.NewEnumMember(name, initializer), node.AsNode())
	}
	return node.AsNode()
}

func (node *EnumMember) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.Initializer)
}

func (node *EnumMember) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateEnumMember(node, v.visitNode(node.name), v.visitNode(node.Initializer))
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

func (f *NodeFactory) UpdateEnumDeclaration(node *EnumDeclaration, modifiers *ModifierList, name *IdentifierNode, members *EnumMemberList) *Node {
	if modifiers != node.modifiers || name != node.name || members != node.Members {
		return updateNode(f.NewEnumDeclaration(modifiers, name, members), node.AsNode())
	}
	return node.AsNode()
}

func (node *EnumDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visitNodeList(v, node.Members)
}

func (node *EnumDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateEnumDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitNodes(node.Members))
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

func (f *NodeFactory) UpdateModuleBlock(node *ModuleBlock, statements *StatementList) *Node {
	if statements != node.Statements {
		return updateNode(f.NewModuleBlock(statements), node.AsNode())
	}
	return node.AsNode()
}

func (node *ModuleBlock) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Statements)
}

func (node *ModuleBlock) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateModuleBlock(node, v.visitNodes(node.Statements))
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
	BodyBase
	name *ModuleName // ModuleName
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

func (f *NodeFactory) UpdateModuleDeclaration(node *ModuleDeclaration, modifiers *ModifierList, name *ModuleName, body *ModuleBody) *Node {
	if modifiers != node.modifiers || name != node.name || body != node.Body {
		return updateNode(f.NewModuleDeclaration(modifiers, name, body, node.Flags), node.AsNode())
	}
	return node.AsNode()
}

func (node *ModuleDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.Body)
}

func (node *ModuleDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateModuleDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitNode(node.Body))
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

func (f *NodeFactory) UpdateImportEqualsDeclaration(node *ImportEqualsDeclaration, modifiers *ModifierList, isTypeOnly bool, name *IdentifierNode, moduleReference *ModuleReference) *Node {
	if modifiers != node.modifiers || isTypeOnly != node.IsTypeOnly || name != node.name || moduleReference != node.ModuleReference {
		return updateNode(f.NewImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference), node.AsNode())
	}
	return node.AsNode()
}

func (node *ImportEqualsDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.ModuleReference)
}

func (node *ImportEqualsDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateImportEqualsDeclaration(node, v.visitModifiers(node.modifiers), node.IsTypeOnly, v.visitNode(node.name), v.visitNode(node.ModuleReference))
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

func (f *NodeFactory) UpdateImportDeclaration(node *ImportDeclaration, modifiers *ModifierList, importClause *ImportClauseNode, moduleSpecifier *Expression, attributes *ImportAttributesNode) *Node {
	if modifiers != node.modifiers || importClause != node.ImportClause || moduleSpecifier != node.ModuleSpecifier || attributes != node.Attributes {
		return updateNode(f.NewImportDeclaration(modifiers, importClause, moduleSpecifier, attributes), node.AsNode())
	}
	return node.AsNode()
}

func (node *ImportDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.ImportClause) || visit(v, node.ModuleSpecifier) || visit(v, node.Attributes)
}

func (node *ImportDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateImportDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.ImportClause), v.visitNode(node.ModuleSpecifier), v.visitNode(node.Attributes))
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

func (f *NodeFactory) UpdateImportSpecifier(node *ImportSpecifier, isTypeOnly bool, propertyName *ModuleExportName, name *IdentifierNode) *Node {
	if isTypeOnly != node.IsTypeOnly || propertyName != node.PropertyName || name != node.name {
		return updateNode(f.NewImportSpecifier(isTypeOnly, propertyName, name), node.AsNode())
	}
	return node.AsNode()
}

func (node *ImportSpecifier) ForEachChild(v Visitor) bool {
	return visit(v, node.PropertyName) || visit(v, node.name)
}

func (node *ImportSpecifier) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateImportSpecifier(node, node.IsTypeOnly, v.visitNode(node.PropertyName), v.visitNode(node.name))
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
	Expression *Expression // Expression
}

func (f *NodeFactory) NewExternalModuleReference(expression *Expression) *Node {
	data := &ExternalModuleReference{}
	data.Expression = expression
	return newNode(KindExternalModuleReference, data)
}

func (f *NodeFactory) UpdateExternalModuleReference(node *ExternalModuleReference, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewExternalModuleReference(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *ExternalModuleReference) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *ExternalModuleReference) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateExternalModuleReference(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateImportClause(node *ImportClause, isTypeOnly bool, name *IdentifierNode, namedBindings *NamedImportBindings) *Node {
	if isTypeOnly != node.IsTypeOnly || name != node.name || namedBindings != node.NamedBindings {
		return updateNode(f.NewImportClause(isTypeOnly, name, namedBindings), node.AsNode())
	}
	return node.AsNode()
}

func (node *ImportClause) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.NamedBindings)
}

func (node *ImportClause) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateImportClause(node, node.IsTypeOnly, v.visitNode(node.name), v.visitNode(node.NamedBindings))
}

func (node *ImportClause) Name() *DeclarationName {
	return node.name
}

func IsImportClause(node *Node) bool {
	return node.Kind == KindImportClause
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

func (f *NodeFactory) UpdateNamespaceImport(node *NamespaceImport, name *IdentifierNode) *Node {
	if name != node.name {
		return updateNode(f.NewNamespaceImport(name), node.AsNode())
	}
	return node.AsNode()
}

func (node *NamespaceImport) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *NamespaceImport) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateNamespaceImport(node, v.visitNode(node.name))
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

func (f *NodeFactory) UpdateNamedImports(node *NamedImports, elements *ImportSpecifierList) *Node {
	if elements != node.Elements {
		return updateNode(f.NewNamedImports(elements), node.AsNode())
	}
	return node.AsNode()
}

func (node *NamedImports) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Elements)
}

func (node *NamedImports) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateNamedImports(node, v.visitNodes(node.Elements))
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

func (f *NodeFactory) UpdateExportAssignment(node *ExportAssignment, modifiers *ModifierList, expression *Expression) *Node {
	if modifiers != node.modifiers || expression != node.Expression {
		return updateNode(f.NewExportAssignment(modifiers, node.IsExportEquals, expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *ExportAssignment) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.Expression)
}

func (node *ExportAssignment) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateExportAssignment(node, v.visitModifiers(node.modifiers), v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateNamespaceExportDeclaration(node *NamespaceExportDeclaration, modifiers *ModifierList, name *IdentifierNode) *Node {
	if modifiers != node.modifiers || name != node.name {
		return updateNode(f.NewNamespaceExportDeclaration(modifiers, name), node.AsNode())
	}
	return node.AsNode()
}

func (node *NamespaceExportDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name)
}

func (node *NamespaceExportDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateNamespaceExportDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name))
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

func (f *NodeFactory) UpdateExportDeclaration(node *ExportDeclaration, modifiers *ModifierList, isTypeOnly bool, exportClause *NamedExportBindings, moduleSpecifier *Expression, attributes *ImportAttributesNode) *Node {
	if modifiers != node.modifiers || exportClause != node.ExportClause || moduleSpecifier != node.ModuleSpecifier || attributes != node.Attributes {
		return updateNode(f.NewExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, attributes), node.AsNode())
	}
	return node.AsNode()
}

func (node *ExportDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.ExportClause) || visit(v, node.ModuleSpecifier) || visit(v, node.Attributes)
}

func (node *ExportDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateExportDeclaration(node, v.visitModifiers(node.modifiers), node.IsTypeOnly, v.visitNode(node.ExportClause), v.visitNode(node.ModuleSpecifier), v.visitNode(node.Attributes))
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

func (f *NodeFactory) UpdateNamespaceExport(node *NamespaceExport, name *ModuleExportName) *Node {
	if name != node.name {
		return updateNode(f.NewNamespaceExport(name), node.AsNode())
	}
	return node.AsNode()
}

func (node *NamespaceExport) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *NamespaceExport) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateNamespaceExport(node, v.visitNode(node.name))
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

func (f *NodeFactory) UpdateNamedExports(node *NamedExports, elements *ExportSpecifierList) *Node {
	if elements != node.Elements {
		return updateNode(f.NewNamedExports(elements), node.AsNode())
	}
	return node.AsNode()
}

func (node *NamedExports) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Elements)
}

func (node *NamedExports) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateNamedExports(node, v.visitNodes(node.Elements))
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

func (f *NodeFactory) UpdateExportSpecifier(node *ExportSpecifier, isTypeOnly bool, propertyName *ModuleExportName, name *ModuleExportName) *Node {
	if isTypeOnly != node.IsTypeOnly || propertyName != node.PropertyName || name != node.name {
		return updateNode(f.NewExportSpecifier(isTypeOnly, propertyName, name), node.AsNode())
	}
	return node.AsNode()
}

func (node *ExportSpecifier) ForEachChild(v Visitor) bool {
	return visit(v, node.PropertyName) || visit(v, node.name)
}

func (node *ExportSpecifier) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateExportSpecifier(node, node.IsTypeOnly, v.visitNode(node.PropertyName), v.visitNode(node.name))
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

func (f *NodeFactory) UpdateCallSignatureDeclaration(node *CallSignatureDeclaration, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode) *Node {
	if typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type {
		return updateNode(f.NewCallSignatureDeclaration(typeParameters, parameters, returnType), node.AsNode())
	}
	return node.AsNode()
}

func (node *CallSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

func (node *CallSignatureDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateCallSignatureDeclaration(node, v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateConstructSignatureDeclaration(node *ConstructSignatureDeclaration, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode) *Node {
	if typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type {
		return updateNode(f.NewConstructSignatureDeclaration(typeParameters, parameters, returnType), node.AsNode())
	}
	return node.AsNode()
}

func (node *ConstructSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

func (node *ConstructSignatureDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateConstructSignatureDeclaration(node, v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateConstructorDeclaration(node *ConstructorDeclaration, modifiers *ModifierList, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode, body *BlockNode) *Node {
	if modifiers != node.modifiers || typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type || body != node.Body {
		return updateNode(f.NewConstructorDeclaration(modifiers, typeParameters, parameters, returnType, body), node.AsNode())
	}
	return node.AsNode()
}

func (node *ConstructorDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.Type) || visit(v, node.Body)
}

func (node *ConstructorDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateConstructorDeclaration(node, v.visitModifiers(node.modifiers), v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type), v.visitNode(node.Body))
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

func (f *NodeFactory) UpdateGetAccessorDeclaration(node *GetAccessorDeclaration, modifiers *ModifierList, name *PropertyName, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode, body *BlockNode) *Node {
	if modifiers != node.modifiers || name != node.name || typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type || body != node.Body {
		return updateNode(f.NewGetAccessorDeclaration(modifiers, name, typeParameters, parameters, returnType, body), node.AsNode())
	}
	return node.AsNode()
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

func (node *GetAccessorDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateGetAccessorDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type), v.visitNode(node.Body))
}

func IsGetAccessorDeclaration(node *Node) bool {
	return node.Kind == KindGetAccessor
}

// SetAccessorDeclaration

type SetAccessorDeclaration struct {
	AccessorDeclarationBase
}

func (f *NodeFactory) UpdateSetAccessorDeclaration(node *SetAccessorDeclaration, modifiers *ModifierList, name *PropertyName, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode, body *BlockNode) *Node {
	if modifiers != node.modifiers || name != node.name || typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type || body != node.Body {
		return updateNode(f.NewSetAccessorDeclaration(modifiers, name, typeParameters, parameters, returnType, body), node.AsNode())
	}
	return node.AsNode()
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

func (node *SetAccessorDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateSetAccessorDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type), v.visitNode(node.Body))
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

func (f *NodeFactory) UpdateIndexSignatureDeclaration(node *IndexSignatureDeclaration, modifiers *ModifierList, parameters *ParameterList, returnType *TypeNode) *Node {
	if modifiers != node.modifiers || parameters != node.Parameters || returnType != node.Type {
		return updateNode(f.NewIndexSignatureDeclaration(modifiers, parameters, returnType), node.AsNode())
	}
	return node.AsNode()
}

func (node *IndexSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

func (node *IndexSignatureDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateIndexSignatureDeclaration(node, v.visitModifiers(node.modifiers), v.visitNodes(node.Parameters), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateMethodSignatureDeclaration(node *MethodSignatureDeclaration, modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode) *Node {
	if modifiers != node.modifiers || name != node.name || postfixToken != node.PostfixToken || typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type {
		return updateNode(f.NewMethodSignatureDeclaration(modifiers, name, postfixToken, typeParameters, parameters, returnType), node.AsNode())
	}
	return node.AsNode()
}

func (node *MethodSignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

func (node *MethodSignatureDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateMethodSignatureDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitToken(node.PostfixToken), v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateMethodDeclaration(node *MethodDeclaration, modifiers *ModifierList, asteriskToken *TokenNode, name *PropertyName, postfixToken *TokenNode, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode, body *BlockNode) *Node {
	if modifiers != node.modifiers || asteriskToken != node.AsteriskToken || name != node.name || postfixToken != node.PostfixToken || typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type || body != node.Body {
		return updateNode(f.NewMethodDeclaration(modifiers, asteriskToken, name, postfixToken, typeParameters, parameters, returnType, body), node.AsNode())
	}
	return node.AsNode()
}

func (node *MethodDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.AsteriskToken) || visit(v, node.name) || visit(v, node.PostfixToken) ||
		visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.Type) || visit(v, node.Body)
}

func (node *MethodDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateMethodDeclaration(node, v.visitModifiers(node.modifiers), v.visitToken(node.AsteriskToken), v.visitNode(node.name), v.visitToken(node.PostfixToken), v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type), v.visitNode(node.Body))
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
	data := f.propertySignatureDeclarationPool.New()
	data.modifiers = modifiers
	data.name = name
	data.PostfixToken = postfixToken
	data.Type = typeNode
	data.Initializer = initializer
	return newNode(KindPropertySignature, data)
}

func (f *NodeFactory) UpdatePropertySignatureDeclaration(node *PropertySignatureDeclaration, modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	if modifiers != node.modifiers || name != node.name || postfixToken != node.PostfixToken || typeNode != node.Type || initializer != node.Initializer {
		return updateNode(f.NewPropertySignatureDeclaration(modifiers, name, postfixToken, typeNode, initializer), node.AsNode())
	}
	return node.AsNode()
}

func (node *PropertySignatureDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visit(v, node.Type) || visit(v, node.Initializer)
}

func (node *PropertySignatureDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdatePropertySignatureDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitToken(node.PostfixToken), v.visitNode(node.Type), v.visitNode(node.Initializer))
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

func (f *NodeFactory) UpdatePropertyDeclaration(node *PropertyDeclaration, modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, typeNode *TypeNode, initializer *Expression) *Node {
	if modifiers != node.modifiers || name != node.name || postfixToken != node.PostfixToken || typeNode != node.Type || initializer != node.Initializer {
		return updateNode(f.NewPropertyDeclaration(modifiers, name, postfixToken, typeNode, initializer), node.AsNode())
	}
	return node.AsNode()
}

func (node *PropertyDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visit(v, node.Type) || visit(v, node.Initializer)
}

func (node *PropertyDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdatePropertyDeclaration(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitToken(node.PostfixToken), v.visitNode(node.Type), v.visitNode(node.Initializer))
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

func (f *NodeFactory) UpdateClassStaticBlockDeclaration(node *ClassStaticBlockDeclaration, modifiers *ModifierList, body *BlockNode) *Node {
	if modifiers != node.modifiers || body != node.Body {
		return updateNode(f.NewClassStaticBlockDeclaration(modifiers, body), node.AsNode())
	}
	return node.AsNode()
}

func (node *ClassStaticBlockDeclaration) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.Body)
}

func (node *ClassStaticBlockDeclaration) VisitEachChild(v *NodeVisitor) *Node {
	// A `static {}` Block does not have parameters, but we must still ensure we enter the lexical scope
	modifiers := v.visitModifiers(node.modifiers)
	body := v.visitNode(node.Body)
	return v.Factory.UpdateClassStaticBlockDeclaration(node, modifiers, body)
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
	data := f.stringLiteralPool.New()
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
	if operatorToken == nil {
		panic("operatorToken is required")
	}
	data := f.binaryExpressionPool.New()
	data.Left = left
	data.OperatorToken = operatorToken
	data.Right = right
	return newNode(KindBinaryExpression, data)
}

func (f *NodeFactory) UpdateBinaryExpression(node *BinaryExpression, left *Expression, operatorToken *TokenNode, right *Expression) *Node {
	if left != node.Left || operatorToken != node.OperatorToken || right != node.Right {
		return updateNode(f.NewBinaryExpression(left, operatorToken, right), node.AsNode())
	}
	return node.AsNode()
}

func (node *BinaryExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Left) || visit(v, node.OperatorToken) || visit(v, node.Right)
}

func (node *BinaryExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateBinaryExpression(node, v.visitNode(node.Left), v.visitToken(node.OperatorToken), v.visitNode(node.Right))
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

func (f *NodeFactory) UpdatePrefixUnaryExpression(node *PrefixUnaryExpression, operand *Expression) *Node {
	if operand != node.Operand {
		return updateNode(f.NewPrefixUnaryExpression(node.Operator, operand), node.AsNode())
	}
	return node.AsNode()
}

func (node *PrefixUnaryExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Operand)
}

func (node *PrefixUnaryExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdatePrefixUnaryExpression(node, v.visitNode(node.Operand))
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

func (f *NodeFactory) UpdatePostfixUnaryExpression(node *PostfixUnaryExpression, operand *Expression) *Node {
	if operand != node.Operand {
		return updateNode(f.NewPostfixUnaryExpression(operand, node.Operator), node.AsNode())
	}
	return node.AsNode()
}

func (node *PostfixUnaryExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Operand)
}

func (node *PostfixUnaryExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdatePostfixUnaryExpression(node, v.visitNode(node.Operand))
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

func (f *NodeFactory) UpdateYieldExpression(node *YieldExpression, asteriskToken *TokenNode, expression *Expression) *Node {
	if asteriskToken != node.AsteriskToken || expression != node.Expression {
		return updateNode(f.NewYieldExpression(asteriskToken, expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *YieldExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.AsteriskToken) || visit(v, node.Expression)
}

func (node *YieldExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateYieldExpression(node, v.visitToken(node.AsteriskToken), v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateArrowFunction(node *ArrowFunction, modifiers *ModifierList, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode, equalsGreaterThanToken *TokenNode, body *BlockOrExpression) *Node {
	if modifiers != node.modifiers || typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type || equalsGreaterThanToken != node.EqualsGreaterThanToken || body != node.Body {
		return updateNode(f.NewArrowFunction(modifiers, typeParameters, parameters, returnType, equalsGreaterThanToken, body), node.AsNode())
	}
	return node.AsNode()
}

func (node *ArrowFunction) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visitNodeList(v, node.TypeParameters) || visitNodeList(v, node.Parameters) ||
		visit(v, node.Type) || visit(v, node.EqualsGreaterThanToken) || visit(v, node.Body)
}

func (node *ArrowFunction) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateArrowFunction(node, v.visitModifiers(node.modifiers), v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type), v.visitToken(node.EqualsGreaterThanToken), v.visitNode(node.Body))
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

func (f *NodeFactory) UpdateFunctionExpression(node *FunctionExpression, modifiers *ModifierList, asteriskToken *TokenNode, name *IdentifierNode, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode, body *BlockNode) *Node {
	if modifiers != node.modifiers || asteriskToken != node.AsteriskToken || name != node.name || typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type || body != node.Body {
		return updateNode(f.NewFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, returnType, body), node.AsNode())
	}
	return node.AsNode()
}

func (node *FunctionExpression) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.AsteriskToken) || visit(v, node.name) || visitNodeList(v, node.TypeParameters) ||
		visitNodeList(v, node.Parameters) || visit(v, node.Type) || visit(v, node.Body)
}

func (node *FunctionExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateFunctionExpression(node, v.visitModifiers(node.modifiers), v.visitToken(node.AsteriskToken), v.visitNode(node.name), v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type), v.visitNode(node.Body))
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

func (f *NodeFactory) UpdateAsExpression(node *AsExpression, expression *Expression, typeNode *TypeNode) *Node {
	if expression != node.Expression || typeNode != node.Type {
		return updateNode(f.NewAsExpression(expression, typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *AsExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.Type)
}

func (node *AsExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateAsExpression(node, v.visitNode(node.Expression), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateSatisfiesExpression(node *SatisfiesExpression, expression *Expression, typeNode *TypeNode) *Node {
	if expression != node.Expression || typeNode != node.Type {
		return updateNode(f.NewSatisfiesExpression(expression, typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *SatisfiesExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.Type)
}

func (node *SatisfiesExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateSatisfiesExpression(node, v.visitNode(node.Expression), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateConditionalExpression(node *ConditionalExpression, condition *Expression, questionToken *TokenNode, whenTrue *Expression, colonToken *TokenNode, whenFalse *Expression) *Node {
	if condition != node.Condition || questionToken != node.QuestionToken || whenTrue != node.WhenTrue || colonToken != node.ColonToken || whenFalse != node.WhenFalse {
		return updateNode(f.NewConditionalExpression(condition, questionToken, whenTrue, colonToken, whenFalse), node.AsNode())
	}
	return node.AsNode()
}

func (node *ConditionalExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Condition) || visit(v, node.QuestionToken) || visit(v, node.WhenTrue) ||
		visit(v, node.ColonToken) || visit(v, node.WhenFalse)
}

func (node *ConditionalExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateConditionalExpression(node, v.visitNode(node.Condition), v.visitToken(node.QuestionToken), v.visitNode(node.WhenTrue), v.visitToken(node.ColonToken), v.visitNode(node.WhenFalse))
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
	data := f.propertyAccessExpressionPool.New()
	data.Expression = expression
	data.QuestionDotToken = questionDotToken
	data.name = name
	node := newNode(KindPropertyAccessExpression, data)
	node.Flags |= flags & NodeFlagsOptionalChain
	return node
}

func (f *NodeFactory) UpdatePropertyAccessExpression(node *PropertyAccessExpression, expression *Expression, questionDotToken *TokenNode, name *MemberName) *Node {
	if expression != node.Expression || questionDotToken != node.QuestionDotToken || name != node.name {
		return updateNode(f.NewPropertyAccessExpression(expression, questionDotToken, name, node.Flags), node.AsNode())
	}
	return node.AsNode()
}

func (node *PropertyAccessExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.QuestionDotToken) || visit(v, node.name)
}

func (node *PropertyAccessExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdatePropertyAccessExpression(node, v.visitNode(node.Expression), v.visitToken(node.QuestionDotToken), v.visitNode(node.name))
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

func (f *NodeFactory) UpdateElementAccessExpression(node *ElementAccessExpression, expression *Expression, questionDotToken *TokenNode, argumentExpression *Expression) *Node {
	if expression != node.Expression || questionDotToken != node.QuestionDotToken || argumentExpression != node.ArgumentExpression {
		return updateNode(f.NewElementAccessExpression(expression, questionDotToken, argumentExpression, node.Flags), node.AsNode())
	}
	return node.AsNode()
}

func (node *ElementAccessExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.QuestionDotToken) || visit(v, node.ArgumentExpression)
}

func (node *ElementAccessExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateElementAccessExpression(node, v.visitNode(node.Expression), v.visitToken(node.QuestionDotToken), v.visitNode(node.ArgumentExpression))
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
	data := f.callExpressionPool.New()
	data.Expression = expression
	data.QuestionDotToken = questionDotToken
	data.TypeArguments = typeArguments
	data.Arguments = arguments
	node := newNode(KindCallExpression, data)
	node.Flags |= flags & NodeFlagsOptionalChain
	return node
}

func (f *NodeFactory) UpdateCallExpression(node *CallExpression, expression *Expression, questionDotToken *TokenNode, typeArguments *TypeArgumentList, arguments *ArgumentList) *Node {
	if expression != node.Expression || questionDotToken != node.QuestionDotToken || typeArguments != node.TypeArguments || arguments != node.Arguments {
		return updateNode(f.NewCallExpression(expression, questionDotToken, typeArguments, arguments, node.Flags), node.AsNode())
	}
	return node.AsNode()
}

func (node *CallExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.QuestionDotToken) || visitNodeList(v, node.TypeArguments) || visitNodeList(v, node.Arguments)
}

func (node *CallExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateCallExpression(node, v.visitNode(node.Expression), v.visitToken(node.QuestionDotToken), v.visitNodes(node.TypeArguments), v.visitNodes(node.Arguments))
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

func (f *NodeFactory) UpdateNewExpression(node *NewExpression, expression *Expression, typeArguments *TypeArgumentList, arguments *ArgumentList) *Node {
	if expression != node.Expression || typeArguments != node.TypeArguments || arguments != node.Arguments {
		return updateNode(f.NewNewExpression(expression, typeArguments, arguments), node.AsNode())
	}
	return node.AsNode()
}

func (f *NodeFactory) NewNewExpression(expression *Expression, typeArguments *NodeList, arguments *NodeList) *Node {
	data := &NewExpression{}
	data.Expression = expression
	data.TypeArguments = typeArguments
	data.Arguments = arguments
	return newNode(KindNewExpression, data)
}

func (node *NewExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateNewExpression(node, v.visitNode(node.Expression), v.visitNodes(node.TypeArguments), v.visitNodes(node.Arguments))
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

func (f *NodeFactory) UpdateMetaProperty(node *MetaProperty, name *IdentifierNode) *Node {
	if name != node.name {
		return updateNode(f.NewMetaProperty(node.KeywordToken, name), node.AsNode())
	}
	return node.AsNode()
}

func (node *MetaProperty) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *MetaProperty) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateMetaProperty(node, v.visitNode(node.name))
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

func (f *NodeFactory) NewNonNullExpression(expression *Expression, flags NodeFlags) *Node {
	data := &NonNullExpression{}
	data.Expression = expression
	data.Flags |= flags & NodeFlagsOptionalChain
	return newNode(KindNonNullExpression, data)
}

func (f *NodeFactory) UpdateNonNullExpression(node *NonNullExpression, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewNonNullExpression(expression, node.AsNode().Flags), node.AsNode())
	}
	return node.AsNode()
}

func (node *NonNullExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *NonNullExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateNonNullExpression(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateSpreadElement(node *SpreadElement, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewSpreadElement(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *SpreadElement) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *SpreadElement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateSpreadElement(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateTemplateExpression(node *TemplateExpression, head *TemplateHeadNode, templateSpans *TemplateSpanList) *Node {
	if head != node.Head || templateSpans != node.TemplateSpans {
		return updateNode(f.NewTemplateExpression(head, templateSpans), node.AsNode())
	}
	return node.AsNode()
}

func (node *TemplateExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Head) || visitNodeList(v, node.TemplateSpans)
}

func (node *TemplateExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTemplateExpression(node, v.visitNode(node.Head), v.visitNodes(node.TemplateSpans))
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

func (f *NodeFactory) UpdateTemplateSpan(node *TemplateSpan, expression *Expression, literal *TemplateMiddleOrTail) *Node {
	if expression != node.Expression || literal != node.Literal {
		return updateNode(f.NewTemplateSpan(expression, literal), node.AsNode())
	}
	return node.AsNode()
}

func (node *TemplateSpan) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visit(v, node.Literal)
}

func (node *TemplateSpan) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTemplateSpan(node, v.visitNode(node.Expression), v.visitNode(node.Literal))
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

func (f *NodeFactory) UpdateTaggedTemplateExpression(node *TaggedTemplateExpression, tag *Expression, questionDotToken *TokenNode, typeArguments *TypeArgumentList, template *TemplateLiteral) *Node {
	if tag != node.Tag || questionDotToken != node.QuestionDotToken || typeArguments != node.TypeArguments || template != node.Template {
		return updateNode(f.NewTaggedTemplateExpression(tag, questionDotToken, typeArguments, template, node.Flags), node.AsNode())
	}
	return node.AsNode()
}

func (node *TaggedTemplateExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Tag) || visit(v, node.QuestionDotToken) || visitNodeList(v, node.TypeArguments) || visit(v, node.Template)
}

func (node *TaggedTemplateExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTaggedTemplateExpression(node, v.visitNode(node.Tag), v.visitToken(node.QuestionDotToken), v.visitNodes(node.TypeArguments), v.visitNode(node.Template))
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
	data := f.parenthesizedExpressionPool.New()
	data.Expression = expression
	return newNode(KindParenthesizedExpression, data)
}

func (f *NodeFactory) UpdateParenthesizedExpression(node *ParenthesizedExpression, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewParenthesizedExpression(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *ParenthesizedExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *ParenthesizedExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateParenthesizedExpression(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateArrayLiteralExpression(node *ArrayLiteralExpression, elements *ElementList) *Node {
	if elements != node.Elements {
		return updateNode(f.NewArrayLiteralExpression(elements, node.MultiLine), node.AsNode())
	}
	return node.AsNode()
}

func (node *ArrayLiteralExpression) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Elements)
}

func (node *ArrayLiteralExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateArrayLiteralExpression(node, v.visitNodes(node.Elements))
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

func (f *NodeFactory) UpdateObjectLiteralExpression(node *ObjectLiteralExpression, properties *PropertyDefinitionList) *Node {
	if properties != node.Properties {
		return updateNode(f.NewObjectLiteralExpression(properties, node.MultiLine), node.AsNode())
	}
	return node.AsNode()
}

func (node *ObjectLiteralExpression) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Properties)
}

func (node *ObjectLiteralExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateObjectLiteralExpression(node, v.visitNodes(node.Properties))
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

func (f *NodeFactory) UpdateSpreadAssignment(node *SpreadAssignment, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewSpreadAssignment(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *SpreadAssignment) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *SpreadAssignment) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateSpreadAssignment(node, v.visitNode(node.Expression))
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
	data := f.propertyAssignmentPool.New()
	data.modifiers = modifiers
	data.name = name
	data.PostfixToken = postfixToken
	data.Initializer = initializer
	return newNode(KindPropertyAssignment, data)
}

func (f *NodeFactory) UpdatePropertyAssignment(node *PropertyAssignment, modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, initializer *Expression) *Node {
	if modifiers != node.modifiers || name != node.name || postfixToken != node.PostfixToken || initializer != node.Initializer {
		return updateNode(f.NewPropertyAssignment(modifiers, name, postfixToken, initializer), node.AsNode())
	}
	return node.AsNode()
}

func (node *PropertyAssignment) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visit(v, node.Initializer)
}

func (node *PropertyAssignment) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdatePropertyAssignment(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitToken(node.PostfixToken), v.visitNode(node.Initializer))
}

func IsPropertyAssignment(node *Node) bool {
	return node.Kind == KindPropertyAssignment
}

// ShorthandPropertyAssignment

type ShorthandPropertyAssignment struct {
	NodeBase
	NamedMemberBase
	ObjectLiteralElementBase
	EqualsToken                 *TokenNode
	ObjectAssignmentInitializer *Expression // Optional
}

func (f *NodeFactory) NewShorthandPropertyAssignment(modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, equalsToken *TokenNode, objectAssignmentInitializer *Expression) *Node {
	data := &ShorthandPropertyAssignment{}
	data.modifiers = modifiers
	data.name = name
	data.PostfixToken = postfixToken
	data.EqualsToken = equalsToken
	data.ObjectAssignmentInitializer = objectAssignmentInitializer
	return newNode(KindShorthandPropertyAssignment, data)
}

func (f *NodeFactory) UpdateShorthandPropertyAssignment(node *ShorthandPropertyAssignment, modifiers *ModifierList, name *PropertyName, postfixToken *TokenNode, equalsToken *TokenNode, objectAssignmentInitializer *Expression) *Node {
	if modifiers != node.modifiers || name != node.name || postfixToken != node.PostfixToken || objectAssignmentInitializer != node.ObjectAssignmentInitializer {
		return updateNode(f.NewShorthandPropertyAssignment(modifiers, name, postfixToken, equalsToken, objectAssignmentInitializer), node.AsNode())
	}
	return node.AsNode()
}

func (node *ShorthandPropertyAssignment) ForEachChild(v Visitor) bool {
	return visitModifiers(v, node.modifiers) || visit(v, node.name) || visit(v, node.PostfixToken) || visit(v, node.EqualsToken) || visit(v, node.ObjectAssignmentInitializer)
}

func (node *ShorthandPropertyAssignment) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateShorthandPropertyAssignment(node, v.visitModifiers(node.modifiers), v.visitNode(node.name), v.visitToken(node.PostfixToken), v.visitToken(node.EqualsToken), v.visitNode(node.ObjectAssignmentInitializer))
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

func (f *NodeFactory) UpdateDeleteExpression(node *DeleteExpression, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewDeleteExpression(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *DeleteExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *DeleteExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateDeleteExpression(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateTypeOfExpression(node *TypeOfExpression, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewTypeOfExpression(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *TypeOfExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *TypeOfExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTypeOfExpression(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateVoidExpression(node *VoidExpression, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewVoidExpression(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *VoidExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *VoidExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateVoidExpression(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateAwaitExpression(node *AwaitExpression, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewAwaitExpression(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *AwaitExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *AwaitExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateAwaitExpression(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateTypeAssertion(node *TypeAssertion, typeNode *TypeNode, expression *Expression) *Node {
	if typeNode != node.Type || expression != node.Expression {
		return updateNode(f.NewTypeAssertion(typeNode, expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *TypeAssertion) ForEachChild(v Visitor) bool {
	return visit(v, node.Type) || visit(v, node.Expression)
}

func (node *TypeAssertion) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTypeAssertion(node, v.visitNode(node.Type), v.visitNode(node.Expression))
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
	return newNode(kind, f.keywordTypeNodePool.New())
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

func (f *NodeFactory) UpdateUnionTypeNode(node *UnionTypeNode, types *TypeList) *Node {
	if types != node.Types {
		return updateNode(f.NewUnionTypeNode(types), node.AsNode())
	}
	return node.AsNode()
}

func (f *NodeFactory) NewUnionTypeNode(types *NodeList) *Node {
	data := &UnionTypeNode{}
	data.Types = types
	return newNode(KindUnionType, data)
}

func (node *UnionTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateUnionTypeNode(node, v.visitNodes(node.Types))
}

// IntersectionTypeNode

type IntersectionTypeNode struct {
	UnionOrIntersectionTypeNodeBase
}

func (f *NodeFactory) UpdateIntersectionTypeNode(node *IntersectionTypeNode, types *TypeList) *Node {
	if types != node.Types {
		return updateNode(f.NewIntersectionTypeNode(types), node.AsNode())
	}
	return node.AsNode()
}

func (f *NodeFactory) NewIntersectionTypeNode(types *NodeList) *Node {
	data := &IntersectionTypeNode{}
	data.Types = types
	return newNode(KindIntersectionType, data)
}

func (node *IntersectionTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateIntersectionTypeNode(node, v.visitNodes(node.Types))
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

func (f *NodeFactory) UpdateConditionalTypeNode(node *ConditionalTypeNode, checkType *TypeNode, extendsType *TypeNode, trueType *TypeNode, falseType *TypeNode) *Node {
	if checkType != node.CheckType || extendsType != node.ExtendsType || trueType != node.TrueType || falseType != node.FalseType {
		return updateNode(f.NewConditionalTypeNode(checkType, extendsType, trueType, falseType), node.AsNode())
	}
	return node.AsNode()
}

func (node *ConditionalTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.CheckType) || visit(v, node.ExtendsType) || visit(v, node.TrueType) || visit(v, node.FalseType)
}

func (node *ConditionalTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateConditionalTypeNode(node, v.visitNode(node.CheckType), v.visitNode(node.ExtendsType), v.visitNode(node.TrueType), v.visitNode(node.FalseType))
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

func (f *NodeFactory) UpdateTypeOperatorNode(node *TypeOperatorNode, typeNode *TypeNode) *Node {
	if typeNode != node.Type {
		return updateNode(f.NewTypeOperatorNode(node.Operator, typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *TypeOperatorNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (node *TypeOperatorNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTypeOperatorNode(node, v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateInferTypeNode(node *InferTypeNode, typeParameter *TypeNode) *Node {
	if typeParameter != node.TypeParameter {
		return updateNode(f.NewInferTypeNode(typeParameter), node.AsNode())
	}
	return node.AsNode()
}

func (node *InferTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeParameter)
}

func (node *InferTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateInferTypeNode(node, v.visitNode(node.TypeParameter))
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

func (f *NodeFactory) UpdateArrayTypeNode(node *ArrayTypeNode, elementType *TypeNode) *Node {
	if elementType != node.ElementType {
		return updateNode(f.NewArrayTypeNode(elementType), node.AsNode())
	}
	return node.AsNode()
}

func (node *ArrayTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.ElementType)
}

func (node *ArrayTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateArrayTypeNode(node, v.visitNode(node.ElementType))
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

func (f *NodeFactory) UpdateIndexedAccessTypeNode(node *IndexedAccessTypeNode, objectType *TypeNode, indexType *TypeNode) *Node {
	if objectType != node.ObjectType || indexType != node.IndexType {
		return updateNode(f.NewIndexedAccessTypeNode(objectType, indexType), node.AsNode())
	}
	return node.AsNode()
}

func (node *IndexedAccessTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.ObjectType) || visit(v, node.IndexType)
}

func (node *IndexedAccessTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateIndexedAccessTypeNode(node, v.visitNode(node.ObjectType), v.visitNode(node.IndexType))
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
	data := f.typeReferenceNodePool.New()
	data.TypeName = typeName
	data.TypeArguments = typeArguments
	return newNode(KindTypeReference, data)
}

func (f *NodeFactory) UpdateTypeReferenceNode(node *TypeReferenceNode, typeName *EntityName, typeArguments *TypeArgumentList) *Node {
	if typeName != node.TypeName || typeArguments != node.TypeArguments {
		return updateNode(f.NewTypeReferenceNode(typeName, typeArguments), node.AsNode())
	}
	return node.AsNode()
}

func (node *TypeReferenceNode) ForEachChild(v Visitor) bool {
	return visit(v, node.TypeName) || visitNodeList(v, node.TypeArguments)
}

func (node *TypeReferenceNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTypeReferenceNode(node, v.visitNode(node.TypeName), v.visitNodes(node.TypeArguments))
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

func (f *NodeFactory) UpdateExpressionWithTypeArguments(node *ExpressionWithTypeArguments, expression *Expression, typeArguments *TypeArgumentList) *Node {
	if expression != node.Expression || typeArguments != node.TypeArguments {
		return updateNode(f.NewExpressionWithTypeArguments(expression, typeArguments), node.AsNode())
	}
	return node.AsNode()
}

func (node *ExpressionWithTypeArguments) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression) || visitNodeList(v, node.TypeArguments)
}

func (node *ExpressionWithTypeArguments) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateExpressionWithTypeArguments(node, v.visitNode(node.Expression), v.visitNodes(node.TypeArguments))
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
	data := f.literalTypeNodePool.New()
	data.Literal = literal
	return newNode(KindLiteralType, data)
}

func (f *NodeFactory) UpdateLiteralTypeNode(node *LiteralTypeNode, literal *Node) *Node {
	if literal != node.Literal {
		return updateNode(f.NewLiteralTypeNode(literal), node.AsNode())
	}
	return node.AsNode()
}

func (node *LiteralTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Literal)
}

func (node *LiteralTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateLiteralTypeNode(node, v.visitNode(node.Literal))
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

func (f *NodeFactory) UpdateTypePredicateNode(node *TypePredicateNode, assertsModifier *TokenNode, parameterName *TypePredicateParameterName, typeNode *TypeNode) *Node {
	if assertsModifier != node.AssertsModifier || parameterName != node.ParameterName || typeNode != node.Type {
		return updateNode(f.NewTypePredicateNode(assertsModifier, parameterName, typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *TypePredicateNode) ForEachChild(v Visitor) bool {
	return visit(v, node.AssertsModifier) || visit(v, node.ParameterName) || visit(v, node.Type)
}

func (node *TypePredicateNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTypePredicateNode(node, v.visitNode(node.AssertsModifier), v.visitNode(node.ParameterName), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateImportTypeNode(node *ImportTypeNode, isTypeOf bool, argument *TypeNode, attributes *ImportAttributesNode, qualifier *EntityName, typeArguments *TypeArgumentList) *Node {
	if isTypeOf != node.IsTypeOf || argument != node.Argument || attributes != node.Attributes || qualifier != node.Qualifier || typeArguments != node.TypeArguments {
		return updateNode(f.NewImportTypeNode(isTypeOf, argument, attributes, qualifier, typeArguments), node.AsNode())
	}
	return node.AsNode()
}

func (node *ImportTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Argument) || visit(v, node.Attributes) || visit(v, node.Qualifier) || visitNodeList(v, node.TypeArguments)
}

func (node *ImportTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateImportTypeNode(node, node.IsTypeOf, v.visitNode(node.Argument), v.visitNode(node.Attributes), v.visitNode(node.Qualifier), v.visitNodes(node.TypeArguments))
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

func (f *NodeFactory) UpdateImportAttribute(node *ImportAttribute, name *ImportAttributeName, value *Expression) *Node {
	if name != node.name || value != node.Value {
		return updateNode(f.NewImportAttribute(name, value), node.AsNode())
	}
	return node.AsNode()
}

func (node *ImportAttribute) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.Value)
}

func (node *ImportAttribute) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateImportAttribute(node, v.visitNode(node.name), v.visitNode(node.Value))
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

func (f *NodeFactory) UpdateImportAttributes(node *ImportAttributes, attributes *ImportAttributeList) *Node {
	if attributes != node.Attributes {
		return updateNode(f.NewImportAttributes(node.Token, attributes, node.MultiLine), node.AsNode())
	}
	return node.AsNode()
}

func (node *ImportAttributes) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Attributes)
}

func (node *ImportAttributes) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateImportAttributes(node, v.visitNodes(node.Attributes))
}

func IsImportAttributes(node *Node) bool {
	return node.Kind == KindImportAttributes
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

func (f *NodeFactory) UpdateTypeQueryNode(node *TypeQueryNode, exprName *EntityName, typeArguments *TypeArgumentList) *Node {
	if exprName != node.ExprName || typeArguments != node.TypeArguments {
		return updateNode(f.NewTypeQueryNode(exprName, typeArguments), node.AsNode())
	}
	return node.AsNode()
}

func (node *TypeQueryNode) ForEachChild(v Visitor) bool {
	return visit(v, node.ExprName) || visitNodeList(v, node.TypeArguments)
}

func (node *TypeQueryNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTypeQueryNode(node, v.visitNode(node.ExprName), v.visitNodes(node.TypeArguments))
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

func (f *NodeFactory) UpdateMappedTypeNode(node *MappedTypeNode, readonlyToken *TokenNode, typeParameter *TypeParameterDeclarationNode, nameType *TypeNode, questionToken *TokenNode, typeNode *TypeNode, members *TypeElementList) *Node {
	if readonlyToken != node.ReadonlyToken || typeParameter != node.TypeParameter || nameType != node.NameType || questionToken != node.QuestionToken || typeNode != node.Type || members != node.Members {
		return updateNode(f.NewMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, typeNode, members), node.AsNode())
	}
	return node.AsNode()
}

func (node *MappedTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.ReadonlyToken) || visit(v, node.TypeParameter) || visit(v, node.NameType) ||
		visit(v, node.QuestionToken) || visit(v, node.Type) || visitNodeList(v, node.Members)
}

func (node *MappedTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateMappedTypeNode(node, v.visitToken(node.ReadonlyToken), v.visitNode(node.TypeParameter), v.visitNode(node.NameType), v.visitToken(node.QuestionToken), v.visitNode(node.Type), v.visitNodes(node.Members))
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

func (f *NodeFactory) UpdateTypeLiteralNode(node *TypeLiteralNode, members *TypeElementList) *Node {
	if members != node.Members {
		return updateNode(f.NewTypeLiteralNode(members), node.AsNode())
	}
	return node.AsNode()
}

func (node *TypeLiteralNode) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Members)
}

func (node *TypeLiteralNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTypeLiteralNode(node, v.visitNodes(node.Members))
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

func (f *NodeFactory) UpdateTupleTypeNode(node *TupleTypeNode, elements *TypeList) *Node {
	if elements != node.Elements {
		return updateNode(f.NewTupleTypeNode(elements), node.AsNode())
	}
	return node.AsNode()
}

func (node *TupleTypeNode) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Elements)
}

func (node *TupleTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTupleTypeNode(node, v.visitNodes(node.Elements))
}

func IsTupleTypeNode(node *Node) bool {
	return node.Kind == KindTupleType
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

func (f *NodeFactory) NewNamedTupleMember(dotDotDotToken *TokenNode, name *IdentifierNode, questionToken *TokenNode, typeNode *TypeNode) *Node {
	data := &NamedTupleMember{}
	data.DotDotDotToken = dotDotDotToken
	data.name = name
	data.QuestionToken = questionToken
	data.Type = typeNode
	return newNode(KindNamedTupleMember, data)
}

func (f *NodeFactory) UpdateNamedTupleMember(node *NamedTupleMember, dotDotDotToken *TokenNode, name *IdentifierNode, questionToken *TokenNode, typeNode *TypeNode) *Node {
	if dotDotDotToken != node.DotDotDotToken || name != node.name || questionToken != node.QuestionToken || typeNode != node.Type {
		return updateNode(f.NewNamedTupleMember(dotDotDotToken, name, questionToken, typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *NamedTupleMember) ForEachChild(v Visitor) bool {
	return visit(v, node.DotDotDotToken) || visit(v, node.name) || visit(v, node.QuestionToken) || visit(v, node.Type)
}

func (node *NamedTupleMember) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateNamedTupleMember(node, v.visitToken(node.DotDotDotToken), v.visitNode(node.name), v.visitToken(node.QuestionToken), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateOptionalTypeNode(node *OptionalTypeNode, typeNode *TypeNode) *Node {
	if typeNode != node.Type {
		return updateNode(f.NewOptionalTypeNode(typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *OptionalTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (node *OptionalTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateOptionalTypeNode(node, v.visitNode(node.Type))
}

func IsOptionalTypeNode(node *Node) bool {
	return node.Kind == KindOptionalType
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

func (f *NodeFactory) UpdateRestTypeNode(node *RestTypeNode, typeNode *TypeNode) *Node {
	if typeNode != node.Type {
		return updateNode(f.NewRestTypeNode(typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *RestTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (node *RestTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateRestTypeNode(node, v.visitNode(node.Type))
}

func IsRestTypeNode(node *Node) bool {
	return node.Kind == KindRestType
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

func (f *NodeFactory) UpdateParenthesizedTypeNode(node *ParenthesizedTypeNode, typeNode *TypeNode) *Node {
	if typeNode != node.Type {
		return updateNode(f.NewParenthesizedTypeNode(typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *ParenthesizedTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (node *ParenthesizedTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateParenthesizedTypeNode(node, v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateFunctionTypeNode(node *FunctionTypeNode, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode) *Node {
	if typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type {
		return updateNode(f.NewFunctionTypeNode(typeParameters, parameters, returnType), node.AsNode())
	}
	return node.AsNode()
}

func (node *FunctionTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateFunctionTypeNode(node, v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateConstructorTypeNode(node *ConstructorTypeNode, modifiers *ModifierList, typeParameters *TypeParameterList, parameters *ParameterList, returnType *TypeNode) *Node {
	if modifiers != node.modifiers || typeParameters != node.TypeParameters || parameters != node.Parameters || returnType != node.Type {
		return updateNode(f.NewConstructorTypeNode(modifiers, typeParameters, parameters, returnType), node.AsNode())
	}
	return node.AsNode()
}

func (node *ConstructorTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateConstructorTypeNode(node, v.visitModifiers(node.modifiers), v.visitNodes(node.TypeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateTemplateLiteralTypeNode(node *TemplateLiteralTypeNode, head *TemplateHeadNode, templateSpans *TemplateLiteralTypeSpanList) *Node {
	if head != node.Head || templateSpans != node.TemplateSpans {
		return updateNode(f.NewTemplateLiteralTypeNode(head, templateSpans), node.AsNode())
	}
	return node.AsNode()
}

func (node *TemplateLiteralTypeNode) ForEachChild(v Visitor) bool {
	return visit(v, node.Head) || visitNodeList(v, node.TemplateSpans)
}

func (node *TemplateLiteralTypeNode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTemplateLiteralTypeNode(node, v.visitNode(node.Head), v.visitNodes(node.TemplateSpans))
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

func (f *NodeFactory) UpdateTemplateLiteralTypeSpan(node *TemplateLiteralTypeSpan, typeNode *TypeNode, literal *TemplateMiddleOrTail) *Node {
	if typeNode != node.Type || literal != node.Literal {
		return updateNode(f.NewTemplateLiteralTypeSpan(typeNode, literal), node.AsNode())
	}
	return node.AsNode()
}

func (node *TemplateLiteralTypeSpan) ForEachChild(v Visitor) bool {
	return visit(v, node.Type) || visit(v, node.Literal)
}

func (node *TemplateLiteralTypeSpan) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateTemplateLiteralTypeSpan(node, v.visitNode(node.Type), v.visitNode(node.Literal))
}

func IsTemplateLiteralTypeSpan(node *Node) bool {
	return node.Kind == KindTemplateLiteralTypeSpan
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

func (f *NodeFactory) UpdateJsxElement(node *JsxElement, openingElement *JsxOpeningElementNode, children *JsxChildList, closingElement *JsxClosingElementNode) *Node {
	if openingElement != node.OpeningElement || children != node.Children || closingElement != node.ClosingElement {
		return updateNode(f.NewJsxElement(openingElement, children, closingElement), node.AsNode())
	}
	return node.AsNode()
}

func (node *JsxElement) ForEachChild(v Visitor) bool {
	return visit(v, node.OpeningElement) || visitNodeList(v, node.Children) || visit(v, node.ClosingElement)
}

func (node *JsxElement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJsxElement(node, v.visitNode(node.OpeningElement), v.visitNodes(node.Children), v.visitNode(node.ClosingElement))
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

func (f *NodeFactory) UpdateJsxAttributes(node *JsxAttributes, properties *JsxAttributeList) *Node {
	if properties != node.Properties {
		return updateNode(f.NewJsxAttributes(properties), node.AsNode())
	}
	return node.AsNode()
}

func (node *JsxAttributes) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Properties)
}

func (node *JsxAttributes) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJsxAttributes(node, v.visitNodes(node.Properties))
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

func (f *NodeFactory) NewJsxNamespacedName(namespace *IdentifierNode, name *IdentifierNode) *Node {
	data := &JsxNamespacedName{}
	data.Namespace = namespace
	data.name = name
	return newNode(KindJsxNamespacedName, data)
}

func (f *NodeFactory) UpdateJsxNamespacedName(node *JsxNamespacedName, name *IdentifierNode, namespace *IdentifierNode) *Node {
	if name != node.name || namespace != node.Namespace {
		return updateNode(f.NewJsxNamespacedName(name, namespace), node.AsNode())
	}
	return node.AsNode()
}

func (node *JsxNamespacedName) ForEachChild(v Visitor) bool {
	return visit(v, node.Namespace) || visit(v, node.name)
}

func (node *JsxNamespacedName) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJsxNamespacedName(node, v.visitNode(node.name), v.visitNode(node.Namespace))
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

func (f *NodeFactory) UpdateJsxOpeningElement(node *JsxOpeningElement, tagName *JsxTagNameExpression, typeArguments *TypeArgumentList, attributes *JsxAttributesNode) *Node {
	if tagName != node.TagName || typeArguments != node.TypeArguments || attributes != node.Attributes {
		return updateNode(f.NewJsxOpeningElement(tagName, typeArguments, attributes), node.AsNode())
	}
	return node.AsNode()
}

func (node *JsxOpeningElement) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.TypeArguments) || visit(v, node.Attributes)
}

func (node *JsxOpeningElement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJsxOpeningElement(node, v.visitNode(node.TagName), v.visitNodes(node.TypeArguments), v.visitNode(node.Attributes))
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

func (f *NodeFactory) UpdateJsxSelfClosingElement(node *JsxSelfClosingElement, tagName *JsxTagNameExpression, typeArguments *TypeArgumentList, attributes *JsxAttributesNode) *Node {
	if tagName != node.TagName || typeArguments != node.TypeArguments || attributes != node.Attributes {
		return updateNode(f.NewJsxSelfClosingElement(tagName, typeArguments, attributes), node.AsNode())
	}
	return node.AsNode()
}

func (node *JsxSelfClosingElement) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.TypeArguments) || visit(v, node.Attributes)
}

func (node *JsxSelfClosingElement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJsxSelfClosingElement(node, v.visitNode(node.TagName), v.visitNodes(node.TypeArguments), v.visitNode(node.Attributes))
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

func (f *NodeFactory) UpdateJsxFragment(node *JsxFragment, openingFragment *JsxOpeningFragmentNode, children *JsxChildList, closingFragment *JsxClosingFragmentNode) *Node {
	if openingFragment != node.OpeningFragment || children != node.Children || closingFragment != node.ClosingFragment {
		return updateNode(f.NewJsxFragment(openingFragment, children, closingFragment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JsxFragment) ForEachChild(v Visitor) bool {
	return visit(v, node.OpeningFragment) || visitNodeList(v, node.Children) || visit(v, node.ClosingFragment)
}

func (node *JsxFragment) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJsxFragment(node, v.visitNode(node.OpeningFragment), v.visitNodes(node.Children), v.visitNode(node.ClosingFragment))
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

func (node *JsxAttribute) Name() *JsxAttributeName {
	return node.name
}

func (f *NodeFactory) UpdateJsxAttribute(node *JsxAttribute, name *JsxAttributeName, initializer *JsxAttributeValue) *Node {
	if name != node.name || initializer != node.Initializer {
		return updateNode(f.NewJsxAttribute(name, initializer), node.AsNode())
	}
	return node.AsNode()
}

func (node *JsxAttribute) ForEachChild(v Visitor) bool {
	return visit(v, node.name) || visit(v, node.Initializer)
}

func (node *JsxAttribute) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJsxAttribute(node, v.visitNode(node.name), v.visitNode(node.Initializer))
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

func (f *NodeFactory) UpdateJsxSpreadAttribute(node *JsxSpreadAttribute, expression *Expression) *Node {
	if expression != node.Expression {
		return updateNode(f.NewJsxSpreadAttribute(expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *JsxSpreadAttribute) ForEachChild(v Visitor) bool {
	return visit(v, node.Expression)
}

func (node *JsxSpreadAttribute) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJsxSpreadAttribute(node, v.visitNode(node.Expression))
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

func (f *NodeFactory) UpdateJsxClosingElement(node *JsxClosingElement, tagName *JsxTagNameExpression) *Node {
	if tagName != node.TagName {
		return updateNode(f.NewJsxClosingElement(tagName), node.AsNode())
	}
	return node.AsNode()
}

func (node *JsxClosingElement) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName)
}

func (node *JsxClosingElement) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJsxClosingElement(node, v.visitNode(node.TagName))
}

func IsJsxClosingElement(node *Node) bool {
	return node.Kind == KindJsxClosingElement
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

func (f *NodeFactory) UpdateJsxExpression(node *JsxExpression, dotDotDotToken *TokenNode, expression *Expression) *Node {
	if dotDotDotToken != node.DotDotDotToken || expression != node.Expression {
		return updateNode(f.NewJsxExpression(dotDotDotToken, expression), node.AsNode())
	}
	return node.AsNode()
}

func (node *JsxExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.DotDotDotToken) || visit(v, node.Expression)
}

func (node *JsxExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJsxExpression(node, v.visitToken(node.DotDotDotToken), v.visitNode(node.Expression))
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

// SyntaxList

type SyntaxList struct {
	NodeBase
	Children []*Node
}

func (f *NodeFactory) NewSyntaxList(children []*Node) *Node {
	data := &SyntaxList{}
	data.Children = children
	return newNode(KindSyntaxList, data)
}

func (node *SyntaxList) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.Children)
}

/// JSDoc ///

type JSDoc struct {
	NodeBase
	Comment *NodeList // NodeList[*JSDocCommentBase]
	Tags    *NodeList // NodeList[*JSDocTagBase]
}

func (f *NodeFactory) NewJSDoc(comment *NodeList, tags *NodeList) *Node {
	data := f.jsdocPool.New()
	data.Comment = comment
	data.Tags = tags
	return newNode(KindJSDoc, data)
}

func (f *NodeFactory) UpdateJSDoc(node *JSDoc, comment *NodeList, tags *NodeList) *Node {
	if comment != node.Comment || tags != node.Tags {
		return updateNode(f.NewJSDoc(comment, tags), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDoc) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Comment) || visitNodeList(v, node.Tags)
}

func (node *JSDoc) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDoc(node, v.visitNodes(node.Comment), v.visitNodes(node.Tags))
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
	data := f.jsdocTextPool.New()
	data.Text = text
	return newNode(KindJSDocText, data)
}

type JSDocLink struct {
	JSDocCommentBase
	name *Node // optional (should only be EntityName)
}

func (f *NodeFactory) NewJSDocLink(name *Node, text string) *Node {
	data := &JSDocLink{}
	data.name = name
	data.Text = text
	return newNode(KindJSDocLink, data)
}

func (f *NodeFactory) UpdateJSDocLink(node *JSDocLink, name *Node, text string) *Node {
	if name != node.name || text != node.Text {
		return updateNode(f.NewJSDocLink(name, text), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocLink) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *JSDocLink) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocLink(node, v.visitNode(node.name), node.Text)
}

func (node *JSDocLink) Name() *DeclarationName {
	return node.name
}

type JSDocLinkPlain struct {
	JSDocCommentBase
	name *Node // optional (should only be EntityName)
}

func (f *NodeFactory) NewJSDocLinkPlain(name *Node, text string) *Node {
	data := &JSDocLinkPlain{}
	data.name = name
	data.Text = text
	return newNode(KindJSDocLinkPlain, data)
}

func (f *NodeFactory) UpdateJSDocLinkPlain(node *JSDocLinkPlain, name *Node, text string) *Node {
	if name != node.name || text != node.Text {
		return updateNode(f.NewJSDocLinkPlain(name, text), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocLinkPlain) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *JSDocLinkPlain) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocLinkPlain(node, v.visitNode(node.name), node.Text)
}

func (node *JSDocLinkPlain) Name() *DeclarationName {
	return node.name
}

type JSDocLinkCode struct {
	JSDocCommentBase
	name *Node // optional (should only be EntityName)
}

func (f *NodeFactory) NewJSDocLinkCode(name *Node, text string) *Node {
	data := &JSDocLinkCode{}
	data.name = name
	data.Text = text
	return newNode(KindJSDocLinkCode, data)
}

func (f *NodeFactory) UpdateJSDocLinkCode(node *JSDocLinkCode, name *Node, text string) *Node {
	if name != node.name || text != node.Text {
		return updateNode(f.NewJSDocLinkCode(name, text), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocLinkCode) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *JSDocLinkCode) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocLinkCode(node, v.visitNode(node.name), node.Text)
}

func (node *JSDocLinkCode) Name() *DeclarationName {
	return node.name
}

// JSDocTypeExpression

type JSDocTypeExpression struct {
	TypeNodeBase
	Type *TypeNode
}

func (f *NodeFactory) NewJSDocTypeExpression(typeNode *TypeNode) *Node {
	data := &JSDocTypeExpression{}
	data.Type = typeNode
	return newNode(KindJSDocTypeExpression, data)
}

func (f *NodeFactory) UpdateJSDocTypeExpression(node *JSDocTypeExpression, typeNode *TypeNode) *Node {
	if typeNode != node.Type {
		return updateNode(f.NewJSDocTypeExpression(typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocTypeExpression) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (node *JSDocTypeExpression) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocTypeExpression(node, v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateJSDocNonNullableType(node *JSDocNonNullableType, typeNode *TypeNode) *Node {
	if typeNode != node.Type {
		return updateNode(f.NewJSDocNonNullableType(typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocNonNullableType) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (node *JSDocNonNullableType) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocNonNullableType(node, v.visitNode(node.Type))
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

func (f *NodeFactory) UpdateJSDocNullableType(node *JSDocNullableType, typeNode *TypeNode) *Node {
	if typeNode != node.Type {
		return updateNode(f.NewJSDocNullableType(typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocNullableType) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (node *JSDocNullableType) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocNullableType(node, v.visitNode(node.Type))
}

// JSDocAllType

type JSDocAllType struct {
	TypeNodeBase
}

func (f *NodeFactory) NewJSDocAllType() *Node {
	data := &JSDocAllType{}
	return newNode(KindJSDocAllType, data)
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

func (f *NodeFactory) UpdateJSDocVariadicType(node *JSDocVariadicType, typeNode *TypeNode) *Node {
	if typeNode != node.Type {
		return updateNode(f.NewJSDocVariadicType(typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocVariadicType) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (node *JSDocVariadicType) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocVariadicType(node, v.visitNode(node.Type))
}

// JSDocOptionalType

type JSDocOptionalType struct {
	TypeNodeBase
	Type *TypeNode
}

func (f *NodeFactory) NewJSDocOptionalType(typeNode *TypeNode) *Node {
	data := &JSDocOptionalType{}
	data.Type = typeNode
	return newNode(KindJSDocOptionalType, data)
}

func (f *NodeFactory) UpdateJSDocOptionalType(node *JSDocOptionalType, typeNode *TypeNode) *Node {
	if typeNode != node.Type {
		return updateNode(f.NewJSDocOptionalType(typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocOptionalType) ForEachChild(v Visitor) bool {
	return visit(v, node.Type)
}

func (node *JSDocOptionalType) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocOptionalType(node, v.visitNode(node.Type))
}

// JSDocTypeTag

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

func (f *NodeFactory) UpdateJSDocTypeTag(node *JSDocTypeTag, tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *Node {
	if tagName != node.TagName || typeExpression != node.TypeExpression || comment != node.Comment {
		return updateNode(f.NewJSDocTypeTag(tagName, typeExpression, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocTypeTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

func (node *JSDocTypeTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocTypeTag(node, v.visitNode(node.TagName), v.visitNode(node.TypeExpression), v.visitNodes(node.Comment))
}

func IsJSDocTypeTag(node *Node) bool {
	return node.Kind == KindJSDocTypeTag
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

func (f *NodeFactory) UpdateJSDocUnknownTag(node *JSDocUnknownTag, tagName *IdentifierNode, comment *NodeList) *Node {
	if tagName != node.TagName || comment != node.Comment {
		return updateNode(f.NewJSDocUnknownTag(tagName, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocUnknownTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

func (node *JSDocUnknownTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocUnknownTag(node, v.visitNode(node.TagName), v.visitNodes(node.Comment))
}

func IsJSDocUnknownTag(node *Node) bool {
	return node.Kind == KindJSDocTag
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

func (f *NodeFactory) UpdateJSDocTemplateTag(node *JSDocTemplateTag, tagName *IdentifierNode, constraint *Node, typeParameters *TypeParameterList, comment *NodeList) *Node {
	if tagName != node.TagName || constraint != node.Constraint || typeParameters != node.typeParameters || comment != node.Comment {
		return updateNode(f.NewJSDocTemplateTag(tagName, constraint, typeParameters, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocTemplateTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.Constraint) || visitNodeList(v, node.typeParameters) || visitNodeList(v, node.Comment)
}

func (node *JSDocTemplateTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocTemplateTag(node, v.visitNode(node.TagName), v.visitNode(node.Constraint), v.visitNodes(node.typeParameters), v.visitNodes(node.Comment))
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

func (f *NodeFactory) NewJSDocPropertyTag(tagName *IdentifierNode, name *EntityName, isBracketed bool, typeExpression *TypeNode, isNameFirst bool, comment *NodeList) *Node {
	data := &JSDocPropertyTag{}
	data.TagName = tagName
	data.name = name
	data.IsBracketed = isBracketed
	data.TypeExpression = typeExpression
	data.IsNameFirst = isNameFirst
	data.Comment = comment
	return newNode(KindJSDocPropertyTag, data)
}

func (f *NodeFactory) UpdateJSDocPropertyTag(node *JSDocPropertyTag, tagName *IdentifierNode, name *EntityName, isBracketed bool, typeExpression *TypeNode, isNameFirst bool, comment *NodeList) *Node {
	if tagName != node.TagName || name != node.name || isBracketed != node.IsBracketed || typeExpression != node.TypeExpression || isNameFirst != node.IsNameFirst || comment != node.Comment {
		return updateNode(f.NewJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocPropertyTag) ForEachChild(v Visitor) bool {
	if node.IsNameFirst {
		return visit(v, node.TagName) || visit(v, node.name) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
	} else {
		return visit(v, node.TagName) || visit(v, node.TypeExpression) || visit(v, node.name) || visitNodeList(v, node.Comment)
	}
}

func (node *JSDocPropertyTag) VisitEachChild(v *NodeVisitor) *Node {
	tagName := v.visitNode(node.TagName)
	var name, typeExpression *Node
	if node.IsNameFirst {
		name, typeExpression = v.visitNode(node.name), v.visitNode(node.TypeExpression)
	} else {
		typeExpression, name = v.visitNode(node.TypeExpression), v.visitNode(node.name)
	}
	return v.Factory.UpdateJSDocPropertyTag(node, tagName, name, node.IsBracketed, typeExpression, node.IsNameFirst, v.visitNodes(node.Comment))
}

func (node *JSDocPropertyTag) Name() *EntityName { return node.name }

type JSDocParameterTag struct {
	JSDocTagBase
	name           *EntityName
	IsBracketed    bool
	TypeExpression *TypeNode
	IsNameFirst    bool
}

func (f *NodeFactory) NewJSDocParameterTag(tagName *IdentifierNode, name *EntityName, isBracketed bool, typeExpression *TypeNode, isNameFirst bool, comment *NodeList) *Node {
	data := &JSDocParameterTag{}
	data.TagName = tagName
	data.name = name
	data.IsBracketed = isBracketed
	data.TypeExpression = typeExpression
	data.IsNameFirst = isNameFirst
	data.Comment = comment
	return newNode(KindJSDocParameterTag, data)
}

func (f *NodeFactory) UpdateJSDocParameterTag(node *JSDocParameterTag, tagName *IdentifierNode, name *EntityName, isBracketed bool, typeExpression *TypeNode, isNameFirst bool, comment *NodeList) *Node {
	if tagName != node.TagName || name != node.name || isBracketed != node.IsBracketed || typeExpression != node.TypeExpression || isNameFirst != node.IsNameFirst || comment != node.Comment {
		return updateNode(f.NewJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocParameterTag) ForEachChild(v Visitor) bool {
	if visit(v, node.TagName) {
		return true
	}
	if node.IsNameFirst {
		return visit(v, node.name) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
	} else {
		return visit(v, node.TypeExpression) || visit(v, node.name) || visitNodeList(v, node.Comment)
	}
}

func (node *JSDocParameterTag) VisitEachChild(v *NodeVisitor) *Node {
	tagName := v.visitNode(node.TagName)
	var name, typeExpression *Node
	if node.IsNameFirst {
		name, typeExpression = v.visitNode(node.name), v.visitNode(node.TypeExpression)
	} else {
		typeExpression, name = v.visitNode(node.TypeExpression), v.visitNode(node.name)
	}
	return v.Factory.UpdateJSDocParameterTag(node, tagName, name, node.IsBracketed, typeExpression, node.IsNameFirst, v.visitNodes(node.Comment))
}

func (node *JSDocParameterTag) Name() *EntityName { return node.name }

// JSDocReturnTag
type JSDocReturnTag struct {
	JSDocTagBase
	TypeExpression *TypeNode
}

func (f *NodeFactory) NewJSDocReturnTag(tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *Node {
	data := &JSDocReturnTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return newNode(KindJSDocReturnTag, data)
}

func (f *NodeFactory) UpdateJSDocReturnTag(node *JSDocReturnTag, tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *Node {
	if tagName != node.TagName || typeExpression != node.TypeExpression || comment != node.Comment {
		return updateNode(f.NewJSDocReturnTag(tagName, typeExpression, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocReturnTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

func (node *JSDocReturnTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocReturnTag(node, v.visitNode(node.TagName), v.visitNode(node.TypeExpression), v.visitNodes(node.Comment))
}

func IsJSDocReturnTag(node *Node) bool {
	return node.Kind == KindJSDocReturnTag
}

// JSDocPublicTag
type JSDocPublicTag struct {
	JSDocTagBase
}

func (f *NodeFactory) NewJSDocPublicTag(tagName *IdentifierNode, comment *NodeList) *Node {
	data := &JSDocPublicTag{}
	data.TagName = tagName
	data.Comment = comment
	return newNode(KindJSDocPublicTag, data)
}

func (f *NodeFactory) UpdateJSDocPublicTag(node *JSDocPublicTag, tagName *IdentifierNode, comment *NodeList) *Node {
	if tagName != node.TagName || comment != node.Comment {
		return updateNode(f.NewJSDocPublicTag(tagName, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocPublicTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

func (node *JSDocPublicTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocPublicTag(node, v.visitNode(node.TagName), v.visitNodes(node.Comment))
}

// JSDocPrivateTag
type JSDocPrivateTag struct {
	JSDocTagBase
}

func (f *NodeFactory) NewJSDocPrivateTag(tagName *IdentifierNode, comment *NodeList) *Node {
	data := &JSDocPrivateTag{}
	data.TagName = tagName
	data.Comment = comment
	return newNode(KindJSDocPrivateTag, data)
}

func (f *NodeFactory) UpdateJSDocPrivateTag(node *JSDocPrivateTag, tagName *IdentifierNode, comment *NodeList) *Node {
	if tagName != node.TagName || comment != node.Comment {
		return updateNode(f.NewJSDocPrivateTag(tagName, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocPrivateTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

func (node *JSDocPrivateTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocPrivateTag(node, v.visitNode(node.TagName), v.visitNodes(node.Comment))
}

// JSDocProtectedTag
type JSDocProtectedTag struct {
	JSDocTagBase
}

func (f *NodeFactory) NewJSDocProtectedTag(tagName *IdentifierNode, comment *NodeList) *Node {
	data := &JSDocProtectedTag{}
	data.TagName = tagName
	data.Comment = comment
	return newNode(KindJSDocProtectedTag, data)
}

func (f *NodeFactory) UpdateJSDocProtectedTag(node *JSDocProtectedTag, tagName *IdentifierNode, comment *NodeList) *Node {
	if tagName != node.TagName || comment != node.Comment {
		return updateNode(f.NewJSDocProtectedTag(tagName, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocProtectedTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

func (node *JSDocProtectedTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocProtectedTag(node, v.visitNode(node.TagName), v.visitNodes(node.Comment))
}

// JSDocReadonlyTag
type JSDocReadonlyTag struct {
	JSDocTagBase
}

func (f *NodeFactory) NewJSDocReadonlyTag(tagName *IdentifierNode, comment *NodeList) *Node {
	data := &JSDocReadonlyTag{}
	data.TagName = tagName
	data.Comment = comment
	return newNode(KindJSDocReadonlyTag, data)
}

func (f *NodeFactory) UpdateJSDocReadonlyTag(node *JSDocReadonlyTag, tagName *IdentifierNode, comment *NodeList) *Node {
	if tagName != node.TagName || comment != node.Comment {
		return updateNode(f.NewJSDocReadonlyTag(tagName, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocReadonlyTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

func (node *JSDocReadonlyTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocReadonlyTag(node, v.visitNode(node.TagName), v.visitNodes(node.Comment))
}

// JSDocOverrideTag
type JSDocOverrideTag struct {
	JSDocTagBase
}

func (f *NodeFactory) NewJSDocOverrideTag(tagName *IdentifierNode, comment *NodeList) *Node {
	data := &JSDocOverrideTag{}
	data.TagName = tagName
	data.Comment = comment
	return newNode(KindJSDocOverrideTag, data)
}

func (f *NodeFactory) UpdateJSDocOverrideTag(node *JSDocOverrideTag, tagName *IdentifierNode, comment *NodeList) *Node {
	if tagName != node.TagName || comment != node.Comment {
		return updateNode(f.NewJSDocOverrideTag(tagName, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocOverrideTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

func (node *JSDocOverrideTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocOverrideTag(node, v.visitNode(node.TagName), v.visitNodes(node.Comment))
}

// JSDocDeprecatedTag
type JSDocDeprecatedTag struct {
	JSDocTagBase
}

func (f *NodeFactory) NewJSDocDeprecatedTag(tagName *IdentifierNode, comment *NodeList) *Node {
	data := &JSDocDeprecatedTag{}
	data.TagName = tagName
	data.Comment = comment
	return newNode(KindJSDocDeprecatedTag, data)
}

func (f *NodeFactory) UpdateJSDocDeprecatedTag(node *JSDocDeprecatedTag, tagName *IdentifierNode, comment *NodeList) *Node {
	if tagName != node.TagName || comment != node.Comment {
		return updateNode(f.NewJSDocDeprecatedTag(tagName, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocDeprecatedTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visitNodeList(v, node.Comment)
}

func (node *JSDocDeprecatedTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocDeprecatedTag(node, v.visitNode(node.TagName), v.visitNodes(node.Comment))
}

// JSDocSeeTag
type JSDocSeeTag struct {
	JSDocTagBase
	NameExpression *TypeNode
}

func (f *NodeFactory) NewJSDocSeeTag(tagName *IdentifierNode, nameExpression *TypeNode, comment *NodeList) *Node {
	data := &JSDocSeeTag{}
	data.TagName = tagName
	data.NameExpression = nameExpression
	data.Comment = comment
	return newNode(KindJSDocSeeTag, data)
}

func (f *NodeFactory) UpdateJSDocSeeTag(node *JSDocSeeTag, tagName *IdentifierNode, nameExpression *TypeNode, comment *NodeList) *Node {
	if tagName != node.TagName || nameExpression != node.NameExpression || comment != node.Comment {
		return updateNode(f.NewJSDocSeeTag(tagName, nameExpression, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocSeeTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.NameExpression) || visitNodeList(v, node.Comment)
}

func (node *JSDocSeeTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocSeeTag(node, v.visitNode(node.TagName), v.visitNode(node.NameExpression), v.visitNodes(node.Comment))
}

// JSDocImplementsTag
type JSDocImplementsTag struct {
	JSDocTagBase
	ClassName *Expression
}

func (f *NodeFactory) NewJSDocImplementsTag(tagName *IdentifierNode, className *Expression, comment *NodeList) *Node {
	data := &JSDocImplementsTag{}
	data.TagName = tagName
	data.ClassName = className
	data.Comment = comment
	return newNode(KindJSDocImplementsTag, data)
}

func (f *NodeFactory) UpdateJSDocImplementsTag(node *JSDocImplementsTag, tagName *IdentifierNode, className *Expression, comment *NodeList) *Node {
	if tagName != node.TagName || className != node.ClassName || comment != node.Comment {
		return updateNode(f.NewJSDocImplementsTag(tagName, className, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocImplementsTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.ClassName) || visitNodeList(v, node.Comment)
}

func (node *JSDocImplementsTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocImplementsTag(node, v.visitNode(node.TagName), v.visitNode(node.ClassName), v.visitNodes(node.Comment))
}

// JSDocAugmentsTag
type JSDocAugmentsTag struct {
	JSDocTagBase
	ClassName *Expression
}

func (f *NodeFactory) NewJSDocAugmentsTag(tagName *IdentifierNode, className *Expression, comment *NodeList) *Node {
	data := &JSDocAugmentsTag{}
	data.TagName = tagName
	data.ClassName = className
	data.Comment = comment
	return newNode(KindJSDocAugmentsTag, data)
}

func (f *NodeFactory) UpdateJSDocAugmentsTag(node *JSDocAugmentsTag, tagName *IdentifierNode, className *Expression, comment *NodeList) *Node {
	if tagName != node.TagName || className != node.ClassName || comment != node.Comment {
		return updateNode(f.NewJSDocAugmentsTag(tagName, className, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocAugmentsTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.ClassName) || visitNodeList(v, node.Comment)
}

func (node *JSDocAugmentsTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocAugmentsTag(node, v.visitNode(node.TagName), v.visitNode(node.ClassName), v.visitNodes(node.Comment))
}

// JSDocSatisfiesTag
type JSDocSatisfiesTag struct {
	JSDocTagBase
	TypeExpression *TypeNode
}

func (f *NodeFactory) NewJSDocSatisfiesTag(tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *Node {
	data := &JSDocSatisfiesTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return newNode(KindJSDocSatisfiesTag, data)
}

func (f *NodeFactory) UpdateJSDocSatisfiesTag(node *JSDocSatisfiesTag, tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *Node {
	if tagName != node.TagName || typeExpression != node.TypeExpression || comment != node.Comment {
		return updateNode(f.NewJSDocSatisfiesTag(tagName, typeExpression, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocSatisfiesTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

func (node *JSDocSatisfiesTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocSatisfiesTag(node, v.visitNode(node.TagName), v.visitNode(node.TypeExpression), v.visitNodes(node.Comment))
}

// JSDocThisTag
type JSDocThisTag struct {
	JSDocTagBase
	TypeExpression *TypeNode
}

func (f *NodeFactory) NewJSDocThisTag(tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *Node {
	data := &JSDocThisTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return newNode(KindJSDocThisTag, data)
}

func (f *NodeFactory) UpdateJSDocThisTag(node *JSDocThisTag, tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *Node {
	if tagName != node.TagName || typeExpression != node.TypeExpression || comment != node.Comment {
		return updateNode(f.NewJSDocThisTag(tagName, typeExpression, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocThisTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

func (node *JSDocThisTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocThisTag(node, v.visitNode(node.TagName), v.visitNode(node.TypeExpression), v.visitNodes(node.Comment))
}

// JSDocImportTag
type JSDocImportTag struct {
	JSDocTagBase
	ImportClause    *Declaration
	ModuleSpecifier *Node
	Attributes      *Node
}

func (f *NodeFactory) NewJSDocImportTag(tagName *IdentifierNode, importClause *Declaration, moduleSpecifier *Node, attributes *Node, comment *NodeList) *Node {
	data := &JSDocImportTag{}
	data.TagName = tagName
	data.ImportClause = importClause
	data.ModuleSpecifier = moduleSpecifier
	data.Attributes = attributes
	data.Comment = comment
	return newNode(KindJSDocImportTag, data)
}

func (f *NodeFactory) UpdateJSDocImportTag(node *JSDocImportTag, tagName *IdentifierNode, importClause *Declaration, moduleSpecifier *Node, attributes *Node, comment *NodeList) *Node {
	if tagName != node.TagName || importClause != node.ImportClause || moduleSpecifier != node.ModuleSpecifier || attributes != node.Attributes || comment != node.Comment {
		return updateNode(f.NewJSDocImportTag(tagName, importClause, moduleSpecifier, attributes, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocImportTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.ImportClause) || visit(v, node.ModuleSpecifier) || visit(v, node.Attributes) || visitNodeList(v, node.Comment)
}

func (node *JSDocImportTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocImportTag(node, v.visitNode(node.TagName), v.visitNode(node.ImportClause), v.visitNode(node.ModuleSpecifier), v.visitNode(node.Attributes), v.visitNodes(node.Comment))
}

// JSDocCallbackTag
type JSDocCallbackTag struct {
	JSDocTagBase
	FullName       *Node
	TypeExpression *TypeNode
}

func (f *NodeFactory) NewJSDocCallbackTag(tagName *IdentifierNode, typeExpression *TypeNode, fullName *Node, comment *NodeList) *Node {
	data := &JSDocCallbackTag{}
	data.TagName = tagName
	data.FullName = fullName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return newNode(KindJSDocCallbackTag, data)
}

func (f *NodeFactory) UpdateJSDocCallbackTag(node *JSDocCallbackTag, tagName *IdentifierNode, typeExpression *TypeNode, fullName *Node, comment *NodeList) *Node {
	if tagName != node.TagName || typeExpression != node.TypeExpression || fullName != node.FullName || comment != node.Comment {
		return updateNode(f.NewJSDocCallbackTag(tagName, typeExpression, fullName, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocCallbackTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.FullName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

func (node *JSDocCallbackTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocCallbackTag(node, v.visitNode(node.TagName), v.visitNode(node.TypeExpression), v.visitNode(node.FullName), v.visitNodes(node.Comment))
}

// JSDocOverloadTag
type JSDocOverloadTag struct {
	JSDocTagBase
	TypeExpression *TypeNode
}

func (f *NodeFactory) NewJSDocOverloadTag(tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *Node {
	data := &JSDocOverloadTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.Comment = comment
	return newNode(KindJSDocOverloadTag, data)
}

func (f *NodeFactory) UpdateJSDocOverloadTag(node *JSDocOverloadTag, tagName *IdentifierNode, typeExpression *TypeNode, comment *NodeList) *Node {
	if tagName != node.TagName || typeExpression != node.TypeExpression || comment != node.Comment {
		return updateNode(f.NewJSDocOverloadTag(tagName, typeExpression, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocOverloadTag) ForEachChild(v Visitor) bool {
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
}

func (node *JSDocOverloadTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocOverloadTag(node, v.visitNode(node.TagName), v.visitNode(node.TypeExpression), v.visitNodes(node.Comment))
}

// JSDocTypedefTag
type JSDocTypedefTag struct {
	JSDocTagBase
	TypeExpression *Node
	FullName       *Node
}

func (f *NodeFactory) NewJSDocTypedefTag(tagName *IdentifierNode, typeExpression *Node, fullName *Node, comment *NodeList) *Node {
	data := &JSDocTypedefTag{}
	data.TagName = tagName
	data.TypeExpression = typeExpression
	data.FullName = fullName
	data.Comment = comment
	return newNode(KindJSDocTypedefTag, data)
}

func (f *NodeFactory) UpdateJSDocTypedefTag(node *JSDocTypedefTag, tagName *IdentifierNode, typeExpression *Node, fullName *Node, comment *NodeList) *Node {
	if tagName != node.TagName || typeExpression != node.TypeExpression || fullName != node.FullName || comment != node.Comment {
		return updateNode(f.NewJSDocTypedefTag(tagName, typeExpression, fullName, comment), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocTypedefTag) ForEachChild(v Visitor) bool {
	if node.TypeExpression != nil && node.TypeExpression.Kind == KindJSDocTypeLiteral {
		return visit(v, node.TagName) || visit(v, node.FullName) || visit(v, node.TypeExpression) || visitNodeList(v, node.Comment)
	}
	return visit(v, node.TagName) || visit(v, node.TypeExpression) || visit(v, node.FullName) || visitNodeList(v, node.Comment)
}

func (node *JSDocTypedefTag) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocTypedefTag(node, v.visitNode(node.TagName), v.visitNode(node.TypeExpression), v.visitNode(node.FullName), v.visitNodes(node.Comment))
}

// JSDocTypeLiteral
type JSDocTypeLiteral struct {
	TypeNodeBase
	DeclarationBase
	JsDocPropertyTags []*Node
	IsArrayType       bool
}

func (f *NodeFactory) NewJSDocTypeLiteral(jsDocPropertyTags []*Node, isArrayType bool) *Node {
	data := &JSDocTypeLiteral{}
	data.JsDocPropertyTags = jsDocPropertyTags
	data.IsArrayType = isArrayType
	return newNode(KindJSDocTypeLiteral, data)
}

func (f *NodeFactory) UpdateJSDocTypeLiteral(node *JSDocTypeLiteral, jsDocPropertyTags []*Node, isArrayType bool) *Node {
	if !core.Same(jsDocPropertyTags, node.JsDocPropertyTags) || isArrayType != node.IsArrayType {
		return updateNode(f.NewJSDocTypeLiteral(jsDocPropertyTags, isArrayType), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocTypeLiteral) ForEachChild(v Visitor) bool {
	return visitNodes(v, node.JsDocPropertyTags)
}

func (node *JSDocTypeLiteral) VisitEachChild(v *NodeVisitor) *Node {
	jsdocPropertyTags := core.SameMap(node.JsDocPropertyTags, func(n *Node) *Node { return v.visitNode(n) })
	return v.Factory.UpdateJSDocTypeLiteral(node, jsdocPropertyTags, node.IsArrayType)
}

// JSDocSignature
type JSDocSignature struct {
	TypeNodeBase
	typeParameters *TypeParameterList
	Parameters     *NodeList
	Type           *JSDocTag
}

func (f *NodeFactory) NewJSDocSignature(typeParameters *TypeParameterList, parameters *NodeList, typeNode *JSDocTag) *Node {
	data := &JSDocSignature{}
	data.typeParameters = typeParameters
	data.Parameters = parameters
	data.Type = typeNode
	return newNode(KindJSDocSignature, data)
}

func (f *NodeFactory) UpdateJSDocSignature(node *JSDocSignature, typeParameters *TypeParameterList, parameters *NodeList, typeNode *JSDocTag) *Node {
	if typeParameters != node.typeParameters || parameters != node.Parameters || typeNode != node.Type {
		return updateNode(f.NewJSDocSignature(typeParameters, parameters, typeNode), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocSignature) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.typeParameters) || visitNodeList(v, node.Parameters) || visit(v, node.Type)
}

func (node *JSDocSignature) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocSignature(node, v.visitNodes(node.typeParameters), v.visitNodes(node.Parameters), v.visitNode(node.Type))
}

func (node *JSDocSignature) TypeParameters() *TypeParameterList { return node.typeParameters }

// JSDocNameReference
type JSDocNameReference struct {
	TypeNodeBase
	name *EntityName
}

func (f *NodeFactory) NewJSDocNameReference(name *EntityName) *Node {
	data := &JSDocNameReference{}
	data.name = name
	return newNode(KindJSDocNameReference, data)
}

func (f *NodeFactory) UpdateJSDocNameReference(node *JSDocNameReference, name *EntityName) *Node {
	if name != node.name {
		return updateNode(f.NewJSDocNameReference(name), node.AsNode())
	}
	return node.AsNode()
}

func (node *JSDocNameReference) ForEachChild(v Visitor) bool {
	return visit(v, node.name)
}

func (node *JSDocNameReference) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateJSDocNameReference(node, v.visitNode(node.name))
}

func (node *JSDocNameReference) Name() *EntityName { return node.name }

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

type SourceFile struct {
	NodeBase
	DeclarationBase
	LocalsContainerBase

	// Fields set by NewSourceFile

	Text       string
	fileName   string
	path       tspath.Path
	Statements *NodeList // NodeList[*Statement]

	// Fields set by parser

	diagnostics                 []*Diagnostic
	jsdocDiagnostics            []*Diagnostic
	LanguageVersion             core.ScriptTarget
	LanguageVariant             core.LanguageVariant
	ScriptKind                  core.ScriptKind
	IsDeclarationFile           bool
	HasNoDefaultLib             bool
	UsesUriStyleNodeCoreModules core.Tristate
	Identifiers                 map[string]string
	Imports                     []*LiteralLikeNode // []LiteralLikeNode
	ModuleAugmentations         []*ModuleName      // []ModuleName
	AmbientModuleNames          []string
	CommentDirectives           []CommentDirective
	jsdocCache                  map[*Node][]*Node
	Pragmas                     []Pragma
	ReferencedFiles             []*FileReference
	TypeReferenceDirectives     []*FileReference
	LibReferenceDirectives      []*FileReference

	// Fields set by binder

	isBound                   atomic.Bool
	bindOnce                  sync.Once
	bindDiagnostics           []*Diagnostic
	BindSuggestionDiagnostics []*Diagnostic
	EndFlowNode               *FlowNode
	SymbolCount               int
	ClassifiableNames         core.Set[string]
	PatternAmbientModules     []PatternAmbientModule

	// Fields set by LineMap

	lineMapMu sync.RWMutex
	lineMap   []core.TextPos

	// Fields set by document registry

	Version int

	// !!!

	ImpliedNodeFormat       core.ModuleKind
	CommonJsModuleIndicator *Node
	ExternalModuleIndicator *Node
	JsGlobalAugmentations   SymbolTable
	tokenCacheMu            sync.Mutex
	tokenCache              map[*Node][]*Node
}

func (f *NodeFactory) NewSourceFile(text string, fileName string, path tspath.Path, statements *NodeList) *Node {
	data := &SourceFile{}
	data.Text = text
	data.fileName = fileName
	data.path = path
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

func (node *SourceFile) Diagnostics() []*Diagnostic {
	return node.diagnostics
}

func (node *SourceFile) SetDiagnostics(diags []*Diagnostic) {
	node.diagnostics = diags
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

func (node *SourceFile) BindDiagnostics() []*Diagnostic {
	return node.bindDiagnostics
}

func (node *SourceFile) SetBindDiagnostics(diags []*Diagnostic) {
	node.bindDiagnostics = diags
}

func (node *SourceFile) ForEachChild(v Visitor) bool {
	return visitNodeList(v, node.Statements)
}

func (node *SourceFile) VisitEachChild(v *NodeVisitor) *Node {
	return v.Factory.UpdateSourceFile(node, v.visitNodes(node.Statements))
}

func (f *NodeFactory) UpdateSourceFile(node *SourceFile, statements *StatementList) *Node {
	if statements != node.Statements {
		updated := f.NewSourceFile(node.Text, node.fileName, node.path, statements).AsSourceFile()
		updated.LanguageVersion = node.LanguageVersion
		updated.LanguageVariant = node.LanguageVariant
		updated.ScriptKind = node.ScriptKind
		updated.IsDeclarationFile = node.IsDeclarationFile
		updated.CommonJsModuleIndicator = node.CommonJsModuleIndicator
		updated.ExternalModuleIndicator = node.ExternalModuleIndicator
		// TODO: Include other fields or use .original to get to original source file
		return updateNode(updated.AsNode(), node.AsNode())
	}
	return node.AsNode()
}

func (node *SourceFile) LineMap() []core.TextPos {
	node.lineMapMu.RLock()
	lineMap := node.lineMap
	node.lineMapMu.RUnlock()
	if lineMap == nil {
		node.lineMapMu.Lock()
		defer node.lineMapMu.Unlock()
		lineMap = node.lineMap
		if lineMap == nil {
			lineMap = core.ComputeLineStarts(node.Text)
			node.lineMap = lineMap
		}
	}
	return lineMap
}

func (node *SourceFile) IsBound() bool {
	return node.isBound.Load()
}

func (node *SourceFile) BindOnce(bind func()) {
	node.bindOnce.Do(func() {
		bind()
		node.isBound.Store(true)
	})
}

func IsSourceFile(node *Node) bool {
	return node.Kind == KindSourceFile
}

type CommentRange struct {
	core.TextRange
	HasTrailingNewLine bool
	Kind               Kind
}

func (f *NodeFactory) NewCommentRange(kind Kind, pos int, end int, hasTrailingNewLine bool) CommentRange {
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
