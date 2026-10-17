package ast

import (
	"fmt"
	"iter"
	"strings"
	"sync"
	"sync/atomic"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/zeebo/xxh3"
)

// parseJSDocForNode is the package-level function for lazily parsing JSDoc.
// It is set by the parser package via init().
var parseJSDocForNode func(*SourceFile, Node) []Node

// SetParseJSDocForNode registers the lazy JSDoc parse function. Called from parser's init().
func SetParseJSDocForNode(fn func(*SourceFile, Node) []Node) {
	parseJSDocForNode = fn
}

// Visitor

type Visitor func(Node) bool

func visit(v Visitor, node Node) bool {
	if !node.IsNil() {
		return v(node)
	}
	return false
}

func visitNodes(v Visitor, nodes []Node) bool {
	for _, node := range nodes { //nolint:modernize
		if v(node) {
			return true
		}
	}
	return false
}

func visitNodeList(v Visitor, nodeList NodeList) bool {
	for i, n := 0, nodeList.Len(); i < n; i++ {
		if node := nodeList.at(i); !node.IsNil() && v(node) {
			return true
		}
	}
	return false
}

func visitModifiers(v Visitor, modifiers ModifierList) bool {
	return visitNodeList(v, modifiers.NodeList)
}

type NodeFactoryHooks struct {
	OnCreate func(node Node)                // Hooks the creation of a node.
	OnUpdate func(node Node, original Node) // Hooks the updating of a node.
	OnClone  func(node Node, original Node) // Hooks the cloning of a node.
}

type NodeFactoryCoercible interface {
	AsNodeFactory() *NodeFactory
}

func NewNodeFactory(hooks NodeFactoryHooks) *NodeFactory {
	return &NodeFactory{hooks: hooks}
}

func newNode(s *nodeStore, kind Kind, layout nodeLayout, rec Node, hooks NodeFactoryHooks) Node {
	n := s.newNode(kind, layout, rec)
	n.SetLoc(core.UndefinedTextRange())
	if hooks.OnCreate != nil {
		hooks.OnCreate(n)
	}
	return n
}

func (f *NodeFactory) nodeStore() *nodeStore {
	if f.store == nil {
		f.store = newNodeStore()
	}
	return f.store
}

// SetSourceText sets the text that nodes created by f are parsed from;
// string fields that are substrings of it are stored as offsets.
func (f *NodeFactory) SetSourceText(text string) {
	f.nodeStore().texts.setSource(text)
}

// BuildInScratch makes f build its nodes in reusable scratch memory, which
// FinishStore must then release.
func (f *NodeFactory) BuildInScratch() {
	f.nodeStore().sizeForSource()
}

// FinishStore moves the nodes created so far into memory of their exact
// size, after which they must never change. It must be called before the
// nodes are shared with other goroutines.
func (f *NodeFactory) FinishStore() {
	if f.store != nil {
		f.store.finish(true)
	}
}

// SetStoreFile records that the nodes created by f are the tree of file.
func (f *NodeFactory) SetStoreFile(file *SourceFile) {
	f.nodeStore().file = file
}

// FinishStoreUnfrozen is like FinishStore, but nodes may still be added.
func (f *NodeFactory) FinishStoreUnfrozen() {
	if f.store != nil {
		f.store.finish(false)
	}
}

// CompactBinderData packs the binder's additions to the file's nodes. It
// must be called before the file is shared with other goroutines.
func (node *SourceFile) CompactBinderData() {
	node.store().compactSide()
}

func (f *NodeFactory) newNode(kind Kind, layout nodeLayout, rec Node) Node {
	f.nodeCount++
	return newNode(f.store, kind, layout, rec, f.hooks)
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

func updateNode(updated Node, original Node, hooks NodeFactoryHooks) Node {
	if updated != original {
		updated.SetFlags(original.Flags())
		updated.SetLoc(original.Loc())
		if hooks.OnUpdate != nil {
			hooks.OnUpdate(updated, original)
		}
	}
	return updated
}

func cloneNode(updated Node, original Node, hooks NodeFactoryHooks) Node {
	updateNode(updated, original, hooks)
	if updated != original && hooks.OnClone != nil {
		hooks.OnClone(updated, original)
	}
	return updated
}

// Node is a handle to an AST node: the address of its record. The zero
// Node is the absent node.
type Node struct {
	p unsafe.Pointer
}

func (n Node) IsNil() bool               { return n.p == nil }
func (n Node) Kind() Kind                { return n.hdr().kind }
func (n Node) Flags() NodeFlags          { return n.hdr().flags }
func (n Node) Loc() core.TextRange       { return n.hdr().loc }
func (n Node) SetFlags(flags NodeFlags)  { n.hdr().flags = flags }
func (n Node) SetLoc(loc core.TextRange) { n.hdr().loc = loc }
func (n Node) SetParent(parent Node)     { n.setRef(&n.hdr().parent, parent) }

// Parent is deref of the parent field, written out so that loops walking up
// the tree stay small enough to inline.
func (n Node) Parent() Node {
	h := (*nodeBaseData)(n.p)
	r := h.parent
	if r&refNear != 0 {
		return Node{unsafe.Add(n.p, int(int32(r))+parentNearBias)}
	}
	return (*chunkHeader)(unsafe.Add(n.p, -int(h.chunk))).store.far[r>>1]
}

const parentNearBias = int(unsafe.Offsetof(nodeBaseData{}.parent)) - refNear

// Shared node accessors dispatch on Kind to the enclosing concrete node.

func (n Node) AsNode() Node { return n }
func (n Node) Pos() int     { return n.Loc().Pos() }
func (n Node) End() int     { return n.Loc().End() }
func (n Node) IterChildren() iter.Seq[Node] {
	// `true` stops a TS visitor early, whereas `false` stops a Go iterator yield,
	// so the result is inverted.
	return func(yield func(Node) bool) {
		n.ForEachChild(func(child Node) bool {
			return !yield(child)
		})
	}
}
func (n Node) ParameterList() ParameterList           { return n.FunctionLikeData().Parameters() }
func (n Node) Parameters() []ParameterDeclarationNode { return n.ParameterList().Slice() }
func (n Node) KindString() string                     { return n.Kind().String() }
func (n Node) KindValue() int16                       { return int16(n.Kind()) }
func (n Node) Decorators() []Node {
	if n.Modifiers().IsNil() {
		return nil
	}
	return core.Filter(n.Modifiers().Slice(), IsDecorator)
}

type MutableNode struct{ Node }

func (n Node) AsMutable() MutableNode { return MutableNode{n} }

func (n Node) Symbol() *Symbol {
	if off := nodeSymbolOffsets[n.Kind()]; off != 0 {
		return n.store().symbols.items[*(*sideRef)(unsafe.Add(n.p, off))]
	}
	return nil
}

func (n Node) LocalSymbol() *Symbol {
	data := n.ExportableData()
	if !data.IsNil() {
		return data.LocalSymbol()
	}
	return nil
}

func (n Node) Locals() SymbolTable {
	if off := nodeLocalsOffsets[n.Kind()]; off != 0 {
		return n.store().symbolTables.items[*(*sideRef)(unsafe.Add(n.p, off))]
	}
	return nil
}

func (n Node) Body() Node {
	if off := nodeBodyOffsets[n.Kind()]; off != 0 {
		return n.refAt(off)
	}
	return Node{}
}

// Text reads the text field of identifiers and literals through a table,
// and computes the text of the other kinds having it.
func (n Node) Text() string {
	if off := nodeTextOffsets[n.Kind()]; off != 0 {
		return n.store().texts.get(*(*textRef)(unsafe.Add(n.p, off)))
	}
	return n.computedText()
}

func (n Node) computedText() string {
	switch n.Kind() {
	case KindMetaProperty:
		return n.AsMetaProperty().Name().Text()
	case KindJsxNamespacedName:
		return n.AsJsxNamespacedName().Namespace().Text() + ":" + n.AsJsxNamespacedName().Name().Text()
	case KindJSDocText:
		return strings.Join(n.AsJSDocText().text(), "")
	case KindJSDocLink:
		return strings.Join(n.AsJSDocLink().text(), "")
	case KindJSDocLinkCode:
		return strings.Join(n.AsJSDocLinkCode().text(), "")
	case KindJSDocLinkPlain:
		return strings.Join(n.AsJSDocLinkPlain().text(), "")
	}
	panic(fmt.Sprintf("Unhandled case in Node.Text: %s", n.Kind()))
}

// unhandledKindError is the panic value of accessors given a kind without the
// member. Its message is built only when printed, which keeps the accessors
// small enough to inline.
type unhandledKindError struct {
	method string
	kind   Kind
}

func (e unhandledKindError) Error() string {
	return "Unhandled case in " + e.method + ": " + e.kind.String()
}

func (n Node) Expression() Node {
	k := n.Kind()
	if off := nodeExpressionOffsets[k]; off != 0 {
		return n.refAt(off)
	}
	panic(unhandledKindError{"Node.Expression", k})
}

func (n Node) RawText() string {
	switch n.Kind() {
	case KindTemplateHead:
		return n.AsTemplateHead().RawText()
	case KindTemplateMiddle:
		return n.AsTemplateMiddle().RawText()
	case KindTemplateTail:
		return n.AsTemplateTail().RawText()
	}
	panic("Unhandled case in Node.RawText: " + n.Kind().String())
}

func (m MutableNode) SetExpression(expr Node) {
	n := m.Node
	switch n.Kind() {
	case KindPropertyAccessExpression:
		n.AsPropertyAccessExpression().SetExpression(expr)
	case KindElementAccessExpression:
		n.AsElementAccessExpression().SetExpression(expr)
	case KindParenthesizedExpression:
		n.AsParenthesizedExpression().SetExpression(expr)
	case KindCallExpression:
		n.AsCallExpression().SetExpression(expr)
	case KindNewExpression:
		n.AsNewExpression().SetExpression(expr)
	case KindExpressionWithTypeArguments:
		n.AsExpressionWithTypeArguments().SetExpression(expr)
	case KindComputedPropertyName:
		n.AsComputedPropertyName().SetExpression(expr)
	case KindNonNullExpression:
		n.AsNonNullExpression().SetExpression(expr)
	case KindTypeAssertionExpression:
		n.AsTypeAssertion().SetExpression(expr)
	case KindAsExpression:
		n.AsAsExpression().SetExpression(expr)
	case KindSatisfiesExpression:
		n.AsSatisfiesExpression().SetExpression(expr)
	case KindTypeOfExpression:
		n.AsTypeOfExpression().SetExpression(expr)
	case KindSpreadAssignment:
		n.AsSpreadAssignment().SetExpression(expr)
	case KindSpreadElement:
		n.AsSpreadElement().SetExpression(expr)
	case KindTemplateSpan:
		n.AsTemplateSpan().SetExpression(expr)
	case KindDeleteExpression:
		n.AsDeleteExpression().SetExpression(expr)
	case KindVoidExpression:
		n.AsVoidExpression().SetExpression(expr)
	case KindAwaitExpression:
		n.AsAwaitExpression().SetExpression(expr)
	case KindYieldExpression:
		n.AsYieldExpression().SetExpression(expr)
	case KindPartiallyEmittedExpression:
		n.AsPartiallyEmittedExpression().SetExpression(expr)
	case KindIfStatement:
		n.AsIfStatement().SetExpression(expr)
	case KindDoStatement:
		n.AsDoStatement().SetExpression(expr)
	case KindWhileStatement:
		n.AsWhileStatement().SetExpression(expr)
	case KindWithStatement:
		n.AsWithStatement().SetExpression(expr)
	case KindForInStatement, KindForOfStatement:
		n.AsForInOrOfStatement().SetExpression(expr)
	case KindSwitchStatement:
		n.AsSwitchStatement().SetExpression(expr)
	case KindCaseClause:
		n.AsCaseOrDefaultClause().SetExpression(expr)
	case KindExpressionStatement:
		n.AsExpressionStatement().SetExpression(expr)
	case KindReturnStatement:
		n.AsReturnStatement().SetExpression(expr)
	case KindThrowStatement:
		n.AsThrowStatement().SetExpression(expr)
	case KindExternalModuleReference:
		n.AsExternalModuleReference().SetExpression(expr)
	case KindExportAssignment:
		n.AsExportAssignment().SetExpression(expr)
	case KindDecorator:
		n.AsDecorator().SetExpression(expr)
	case KindJsxExpression:
		n.AsJsxExpression().SetExpression(expr)
	case KindJsxSpreadAttribute:
		n.AsJsxSpreadAttribute().SetExpression(expr)
	default:
		panic("Unhandled case in mutableNode.SetExpression: " + n.Kind().String())
	}
}

func (n Node) ArgumentList() NodeList {
	k := n.Kind()
	if off := nodeArgumentsOffsets[k]; off != 0 {
		return n.listAt(off)
	}
	panic(unhandledKindError{"Node.Arguments", k})
}

func (n Node) Arguments() []Node {
	list := n.ArgumentList()
	if !list.IsNil() {
		return list.Slice()
	}
	return nil
}

func (n Node) TypeArgumentList() NodeList {
	if off := nodeTypeArgumentsOffsets[n.Kind()]; off != 0 {
		return n.listAt(off)
	}
	panic("Unhandled case in Node.TypeArguments")
}

func (n Node) TypeArguments() []Node {
	list := n.TypeArgumentList()
	if !list.IsNil() {
		return list.Slice()
	}
	return nil
}

func (n Node) TypeParameterList() NodeList {
	switch n.Kind() {
	case KindClassDeclaration:
		return n.AsClassDeclaration().TypeParameters()
	case KindClassExpression:
		return n.AsClassExpression().TypeParameters()
	case KindInterfaceDeclaration:
		return n.AsInterfaceDeclaration().TypeParameters()
	case KindTypeAliasDeclaration, KindJSTypeAliasDeclaration:
		return n.AsTypeAliasDeclaration().TypeParameters()
	case KindJSDocTemplateTag:
		return n.AsJSDocTemplateTag().TypeParameters()
	default:
		funcLike := n.FunctionLikeData()
		if !funcLike.IsNil() {
			return funcLike.TypeParameters()
		}
	}
	panic("Unhandled case in Node.TypeParameterList")
}

func (n Node) TypeParameters() []Node {
	list := n.TypeParameterList()
	if !list.IsNil() {
		return list.Slice()
	}
	return nil
}

func (n Node) MemberList() NodeList {
	switch n.Kind() {
	case KindClassDeclaration:
		return n.AsClassDeclaration().Members()
	case KindClassExpression:
		return n.AsClassExpression().Members()
	case KindInterfaceDeclaration:
		return n.AsInterfaceDeclaration().Members()
	case KindEnumDeclaration:
		return n.AsEnumDeclaration().Members()
	case KindTypeLiteral:
		return n.AsTypeLiteralNode().Members()
	case KindMappedType:
		return n.AsMappedTypeNode().Members()
	}
	panic("Unhandled case in Node.MemberList: " + n.Kind().String())
}

func (n Node) Members() []Node {
	list := n.MemberList()
	if !list.IsNil() {
		return list.Slice()
	}
	return nil
}

func (n Node) StatementList() NodeList {
	switch n.Kind() {
	case KindSourceFile:
		return n.AsSourceFile().Statements
	case KindBlock:
		return n.AsBlock().Statements()
	case KindModuleBlock:
		return n.AsModuleBlock().Statements()
	case KindCaseClause, KindDefaultClause:
		return n.AsCaseOrDefaultClause().Statements()
	}
	panic("Unhandled case in Node.StatementList: " + n.Kind().String())
}

func (n Node) Statements() []Node {
	list := n.StatementList()
	if !list.IsNil() {
		return list.Slice()
	}
	return nil
}

func (n Node) CanHaveStatements() bool {
	switch n.Kind() {
	case KindSourceFile, KindBlock, KindModuleBlock, KindCaseClause, KindDefaultClause:
		return true
	default:
		return false
	}
}

func (n Node) ModifierFlags() ModifierFlags {
	modifiers := n.Modifiers()
	if !modifiers.IsNil() {
		return modifiers.ModifierFlags()
	}
	return ModifierFlagsNone
}

func (n Node) ModifierNodes() []Node {
	modifiers := n.Modifiers()
	if !modifiers.IsNil() {
		return modifiers.Slice()
	}
	return nil
}

// Type reads the type expression of JSDoc parameter and property tags, and
// nothing for JSDocVariadicType, whose type is its operand.
func (n Node) Type() Node {
	if off := nodeTypeOffsets[n.Kind()]; off != 0 {
		return n.refAt(off)
	}
	return Node{}
}

func (m MutableNode) SetType(t Node) {
	n := m.Node
	switch m.Kind() {
	case KindVariableDeclaration:
		n.AsVariableDeclaration().SetType(t)
	case KindParameter:
		n.AsParameterDeclaration().SetType(t)
	case KindPropertySignature:
		n.AsPropertySignatureDeclaration().SetType(t)
	case KindPropertyDeclaration:
		n.AsPropertyDeclaration().SetType(t)
	case KindPropertyAssignment:
		n.AsPropertyAssignment().SetType(t)
	case KindShorthandPropertyAssignment:
		n.AsShorthandPropertyAssignment().SetType(t)
	case KindTypePredicate:
		n.AsTypePredicateNode().SetType(t)
	case KindParenthesizedType:
		n.AsParenthesizedTypeNode().SetType(t)
	case KindTypeOperator:
		n.AsTypeOperatorNode().SetType(t)
	case KindMappedType:
		n.AsMappedTypeNode().SetType(t)
	case KindTypeAssertionExpression:
		n.AsTypeAssertion().SetType(t)
	case KindAsExpression:
		n.AsAsExpression().SetType(t)
	case KindSatisfiesExpression:
		n.AsSatisfiesExpression().SetType(t)
	case KindTypeAliasDeclaration, KindJSTypeAliasDeclaration:
		n.AsTypeAliasDeclaration().SetType(t)
	case KindNamedTupleMember:
		n.AsNamedTupleMember().SetType(t)
	case KindOptionalType:
		n.AsOptionalTypeNode().SetType(t)
	case KindRestType:
		n.AsRestTypeNode().SetType(t)
	case KindTemplateLiteralTypeSpan:
		n.AsTemplateLiteralTypeSpan().SetType(t)
	case KindJSDocTypeExpression:
		n.AsJSDocTypeExpression().SetType(t)
	case KindJSDocParameterTag, KindJSDocPropertyTag:
		n.AsJSDocParameterOrPropertyTag().SetTypeExpression(t)
	case KindJSDocNullableType:
		n.AsJSDocNullableType().SetType(t)
	case KindJSDocNonNullableType:
		n.AsJSDocNonNullableType().SetType(t)
	case KindJSDocOptionalType:
		n.AsJSDocOptionalType().SetType(t)
	case KindExportAssignment:
		n.AsExportAssignment().SetType(t)
	case KindBinaryExpression:
		n.AsBinaryExpression().SetType(t)
	default:
		if funcLike := n.FunctionLikeData(); !funcLike.IsNil() {
			funcLike.SetType(t)
		} else {
			panic("Unhandled case in mutableNode.SetType: " + n.Kind().String())
		}
	}
}

func (n Node) Initializer() Node {
	if off := nodeInitializerOffsets[n.Kind()]; off != 0 {
		return n.refAt(off)
	}
	panic("Unhandled case in Node.Initializer")
}

func (m MutableNode) SetInitializer(initializer Node) {
	n := m.Node
	switch n.Kind() {
	case KindVariableDeclaration:
		n.AsVariableDeclaration().SetInitializer(initializer)
	case KindParameter:
		n.AsParameterDeclaration().SetInitializer(initializer)
	case KindBindingElement:
		n.AsBindingElement().SetInitializer(initializer)
	case KindPropertyDeclaration:
		n.AsPropertyDeclaration().SetInitializer(initializer)
	case KindPropertySignature:
		n.AsPropertySignatureDeclaration().SetInitializer(initializer)
	case KindPropertyAssignment:
		n.AsPropertyAssignment().SetInitializer(initializer)
	case KindEnumMember:
		n.AsEnumMember().SetInitializer(initializer)
	case KindForStatement:
		n.AsForStatement().SetInitializer(initializer)
	case KindForInStatement, KindForOfStatement:
		n.AsForInOrOfStatement().SetInitializer(initializer)
	case KindJsxAttribute:
		n.AsJsxAttribute().SetInitializer(initializer)
	default:
		panic("Unhandled case in mutableNode.SetInitializer")
	}
}

func (n Node) TagName() Node {
	switch n.Kind() {
	case KindJsxOpeningElement:
		return n.AsJsxOpeningElement().TagName()
	case KindJsxClosingElement:
		return n.AsJsxClosingElement().TagName()
	case KindJsxSelfClosingElement:
		return n.AsJsxSelfClosingElement().TagName()
	case KindJSDocUnknownTag:
		return n.AsJSDocUnknownTag().TagName()
	case KindJSDocAugmentsTag:
		return n.AsJSDocAugmentsTag().TagName()
	case KindJSDocImplementsTag:
		return n.AsJSDocImplementsTag().TagName()
	case KindJSDocDeprecatedTag:
		return n.AsJSDocDeprecatedTag().TagName()
	case KindJSDocPublicTag:
		return n.AsJSDocPublicTag().TagName()
	case KindJSDocPrivateTag:
		return n.AsJSDocPrivateTag().TagName()
	case KindJSDocProtectedTag:
		return n.AsJSDocProtectedTag().TagName()
	case KindJSDocReadonlyTag:
		return n.AsJSDocReadonlyTag().TagName()
	case KindJSDocOverrideTag:
		return n.AsJSDocOverrideTag().TagName()
	case KindJSDocCallbackTag:
		return n.AsJSDocCallbackTag().TagName()
	case KindJSDocOverloadTag:
		return n.AsJSDocOverloadTag().TagName()
	case KindJSDocParameterTag, KindJSDocPropertyTag:
		return n.AsJSDocParameterOrPropertyTag().TagName()
	case KindJSDocReturnTag:
		return n.AsJSDocReturnTag().TagName()
	case KindJSDocThisTag:
		return n.AsJSDocThisTag().TagName()
	case KindJSDocTypeTag:
		return n.AsJSDocTypeTag().TagName()
	case KindJSDocTemplateTag:
		return n.AsJSDocTemplateTag().TagName()
	case KindJSDocTypedefTag:
		return n.AsJSDocTypedefTag().TagName()
	case KindJSDocSeeTag:
		return n.AsJSDocSeeTag().TagName()
	case KindJSDocSatisfiesTag:
		return n.AsJSDocSatisfiesTag().TagName()
	case KindJSDocThrowsTag:
		return n.AsJSDocThrowsTag().TagName()
	case KindJSDocImportTag:
		return n.AsJSDocImportTag().TagName()
	}
	panic("Unhandled case in Node.TagName: " + n.Kind().String())
}

func (n Node) PropertyName() Node {
	switch n.Kind() {
	case KindImportSpecifier:
		return n.AsImportSpecifier().PropertyName()
	case KindExportSpecifier:
		return n.AsExportSpecifier().PropertyName()
	case KindBindingElement:
		return n.AsBindingElement().PropertyName()
	}
	return Node{}
}

func (n Node) PropertyNameOrName() Node {
	name := n.PropertyName()
	if name.IsNil() {
		name = n.Name()
	}
	return name
}

func (n Node) IsTypeOnly() bool {
	switch n.Kind() {
	case KindImportEqualsDeclaration:
		return n.AsImportEqualsDeclaration().IsTypeOnly()
	case KindImportSpecifier:
		return n.AsImportSpecifier().IsTypeOnly()
	case KindImportClause:
		return n.AsImportClause().PhaseModifier() == KindTypeKeyword
	case KindExportDeclaration:
		return n.AsExportDeclaration().IsTypeOnly()
	case KindExportSpecifier:
		return n.AsExportSpecifier().IsTypeOnly()
	}
	return false
}

// If updating this function, also update `hasComment`.
func (n Node) CommentList() NodeList {
	switch n.Kind() {
	case KindJSDoc:
		return n.AsJSDoc().Comment()
	case KindJSDocUnknownTag:
		return n.AsJSDocUnknownTag().Comment()
	case KindJSDocAugmentsTag:
		return n.AsJSDocAugmentsTag().Comment()
	case KindJSDocImplementsTag:
		return n.AsJSDocImplementsTag().Comment()
	case KindJSDocDeprecatedTag:
		return n.AsJSDocDeprecatedTag().Comment()
	case KindJSDocPublicTag:
		return n.AsJSDocPublicTag().Comment()
	case KindJSDocPrivateTag:
		return n.AsJSDocPrivateTag().Comment()
	case KindJSDocProtectedTag:
		return n.AsJSDocProtectedTag().Comment()
	case KindJSDocReadonlyTag:
		return n.AsJSDocReadonlyTag().Comment()
	case KindJSDocOverrideTag:
		return n.AsJSDocOverrideTag().Comment()
	case KindJSDocCallbackTag:
		return n.AsJSDocCallbackTag().Comment()
	case KindJSDocOverloadTag:
		return n.AsJSDocOverloadTag().Comment()
	case KindJSDocParameterTag, KindJSDocPropertyTag:
		return n.AsJSDocParameterOrPropertyTag().Comment()
	case KindJSDocReturnTag:
		return n.AsJSDocReturnTag().Comment()
	case KindJSDocThisTag:
		return n.AsJSDocThisTag().Comment()
	case KindJSDocTypeTag:
		return n.AsJSDocTypeTag().Comment()
	case KindJSDocTemplateTag:
		return n.AsJSDocTemplateTag().Comment()
	case KindJSDocTypedefTag:
		return n.AsJSDocTypedefTag().Comment()
	case KindJSDocSeeTag:
		return n.AsJSDocSeeTag().Comment()
	case KindJSDocSatisfiesTag:
		return n.AsJSDocSatisfiesTag().Comment()
	case KindJSDocThrowsTag:
		return n.AsJSDocThrowsTag().Comment()
	case KindJSDocImportTag:
		return n.AsJSDocImportTag().Comment()
	}
	panic("Unhandled case in Node.CommentList: " + n.Kind().String())
}

func (n Node) Comments() []Node {
	list := n.CommentList()
	if !list.IsNil() {
		return list.Slice()
	}
	return nil
}

func (n Node) Label() Node {
	switch n.Kind() {
	case KindLabeledStatement:
		return n.AsLabeledStatement().Label()
	case KindBreakStatement:
		return n.AsBreakStatement().Label()
	case KindContinueStatement:
		return n.AsContinueStatement().Label()
	}
	panic("Unhandled case in Node.Label: " + n.Kind().String())
}

func (n Node) Attributes() Node {
	switch n.Kind() {
	case KindJsxOpeningElement:
		return n.AsJsxOpeningElement().Attributes()
	case KindJsxSelfClosingElement:
		return n.AsJsxSelfClosingElement().Attributes()
	case KindModuleDeclaration:
		return n.AsModuleDeclaration().Attributes()
	}
	panic("Unhandled case in Node.Attributes: " + n.Kind().String())
}

func (n Node) Children() NodeList {
	switch n.Kind() {
	case KindJsxElement:
		return n.AsJsxElement().Children()
	case KindJsxFragment:
		return n.AsJsxFragment().Children()
	}
	panic("Unhandled case in Node.Children: " + n.Kind().String())
}

func (n Node) ModuleSpecifier() Expression {
	switch n.Kind() {
	case KindImportDeclaration, KindJSImportDeclaration:
		return n.AsImportDeclaration().ModuleSpecifier()
	case KindExportDeclaration:
		return n.AsExportDeclaration().ModuleSpecifier()
	case KindJSDocImportTag:
		return n.AsJSDocImportTag().ModuleSpecifier()
	}
	panic("Unhandled case in Node.ModuleSpecifier: " + n.Kind().String())
}

func (n Node) ImportClause() Node {
	switch n.Kind() {
	case KindImportDeclaration, KindJSImportDeclaration:
		return n.AsImportDeclaration().ImportClause()
	case KindJSDocImportTag:
		return n.AsJSDocImportTag().ImportClause()
	}
	panic("Unhandled case in Node.ImportClause: " + n.Kind().String())
}

func (n Node) Statement() Statement {
	switch n.Kind() {
	case KindDoStatement:
		return n.AsDoStatement().Statement()
	case KindWhileStatement:
		return n.AsWhileStatement().Statement()
	case KindForStatement:
		return n.AsForStatement().Statement()
	case KindForInStatement, KindForOfStatement:
		return n.AsForInOrOfStatement().Statement()
	case KindWithStatement:
		return n.AsWithStatement().Statement()
	case KindLabeledStatement:
		return n.AsLabeledStatement().Statement()
	}
	panic("Unhandled case in Node.Statement: " + n.Kind().String())
}

func (n Node) PropertyList() NodeList {
	switch n.Kind() {
	case KindObjectLiteralExpression:
		return n.AsObjectLiteralExpression().Properties()
	case KindJsxAttributes:
		return n.AsJsxAttributes().Properties()
	}
	panic("Unhandled case in Node.PropertyList: " + n.Kind().String())
}

func (n Node) Properties() []Node {
	list := n.PropertyList()
	if !list.IsNil() {
		return list.Slice()
	}
	return nil
}

func (n Node) ElementList() NodeList {
	switch n.Kind() {
	case KindNamedImports:
		return n.AsNamedImports().Elements()
	case KindNamedExports:
		return n.AsNamedExports().Elements()
	case KindObjectBindingPattern, KindArrayBindingPattern:
		return n.AsBindingPattern().Elements()
	case KindArrayLiteralExpression:
		return n.AsArrayLiteralExpression().Elements()
	case KindTupleType:
		return n.AsTupleTypeNode().Elements()
	}
	panic("Unhandled case in Node.ElementList: " + n.Kind().String())
}

func (n Node) Elements() []Node {
	list := n.ElementList()
	if !list.IsNil() {
		return list.Slice()
	}
	return nil
}

func (n Node) PostfixToken() Node {
	if off := nodePostfixTokenOffsets[n.Kind()]; off != 0 {
		return n.refAt(off)
	}
	return Node{}
}

func (n Node) QuestionToken() TokenNode {
	if off := nodeQuestionTokenOffsets[n.Kind()]; off != 0 {
		return n.refAt(off)
	}
	postfix := n.PostfixToken()
	if !postfix.IsNil() && postfix.Kind() == KindQuestionToken {
		return postfix
	}
	return Node{}
}

func (n Node) QuestionDotToken() Node {
	k := n.Kind()
	if off := nodeQuestionDotTokenOffsets[k]; off != 0 {
		return n.refAt(off)
	}
	panic(unhandledKindError{"Node.QuestionDotToken", k})
}

func (n Node) TypeExpression() Node {
	switch n.Kind() {
	case KindJSDocParameterTag, KindJSDocPropertyTag:
		return n.AsJSDocParameterOrPropertyTag().TypeExpression()
	case KindJSDocReturnTag:
		return n.AsJSDocReturnTag().TypeExpression()
	case KindJSDocTypeTag:
		return n.AsJSDocTypeTag().TypeExpression()
	case KindJSDocTypedefTag:
		return n.AsJSDocTypedefTag().TypeExpression()
	case KindJSDocCallbackTag:
		return n.AsJSDocCallbackTag().TypeExpression()
	case KindJSDocSatisfiesTag:
		return n.AsJSDocSatisfiesTag().TypeExpression()
	case KindJSDocThrowsTag:
		return n.AsJSDocThrowsTag().TypeExpression()
	}
	panic("Unhandled case in Node.TypeExpression: " + n.Kind().String())
}

func (n Node) ClassName() Node {
	switch n.Kind() {
	case KindJSDocAugmentsTag:
		return n.AsJSDocAugmentsTag().ClassName()
	case KindJSDocImplementsTag:
		return n.AsJSDocImplementsTag().ClassName()
	}
	panic("Unhandled case in Node.ClassName: " + n.Kind().String())
}

// Determines if `n` contains `descendant` by walking up the `Parent` pointers from `descendant`. This method panics if
// `descendant` or one of its ancestors is not parented except when that node is a `SourceFile`.
func (n Node) Contains(descendant Node) bool {
	for !descendant.IsNil() {
		if descendant == n {
			return true
		}
		parent := descendant.Parent()
		if parent.IsNil() && !IsSourceFile(descendant) {
			panic("descendant is not parented")
		}
		descendant = parent
	}
	return false
}

// Node casts

func (n Node) AsFlowSwitchClauseData() FlowSwitchClauseData {
	if n.Kind() != kindFlowSwitchClauseData {
		panic("Invalid node cast to FlowSwitchClauseData")
	}
	return FlowSwitchClauseData{n}
}

func (n Node) AsFlowReduceLabelData() FlowReduceLabelData {
	if n.Kind() != kindFlowReduceLabelData {
		panic("Invalid node cast to FlowReduceLabelData")
	}
	return FlowReduceLabelData{n}
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

func IsWriteOnlyAccess(node Node) bool {
	return accessKind(node) == AccessKindWrite
}

func IsWriteAccess(node Node) bool {
	return accessKind(node) != AccessKindRead
}

func IsWriteAccessForReference(node Node) bool {
	decl := GetDeclarationFromName(node)
	return (!decl.IsNil() && declarationIsWriteAccess(decl)) || node.Kind() == KindDefaultKeyword || IsWriteAccess(node)
}

func GetDeclarationFromName(name Node) Declaration {
	if name.IsNil() || name.Parent().IsNil() {
		return Node{}
	}
	parent := name.Parent()
	switch name.Kind() {
	case KindStringLiteral, KindNoSubstitutionTemplateLiteral, KindNumericLiteral:
		if IsComputedPropertyName(parent) {
			return parent.Parent()
		}
		fallthrough
	case KindIdentifier:
		if IsDeclaration(parent) {
			if parent.Name() == name {
				return parent
			}
			return Node{}
		}
		if IsQualifiedName(parent) {
			tag := parent.Parent()
			if IsJSDocParameterTag(tag) && tag.Name() == parent {
				return tag
			}
			return Node{}
		}
		binExp := parent.Parent()
		if IsBinaryExpression(binExp) && GetAssignmentDeclarationKind(binExp) != JSDeclarationKindNone {
			// (binExp.left as BindableStaticNameExpression).symbol || binExp.symbol
			leftHasSymbol := false
			if !binExp.AsBinaryExpression().Left().IsNil() && binExp.AsBinaryExpression().Left().Symbol() != nil {
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
	return Node{}
}

func declarationIsWriteAccess(decl Node) bool {
	if decl.IsNil() {
		return false
	}
	// Consider anything in an ambient declaration to be a write access since it may be coming from JS.
	if decl.Flags()&NodeFlagsAmbient != 0 {
		return true
	}

	switch decl.Kind() {
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
		return !IsArrayLiteralOrObjectLiteralDestructuringPattern(decl.Parent())

	case KindFunctionDeclaration, KindFunctionExpression, KindConstructor, KindMethodDeclaration, KindGetAccessor, KindSetAccessor:
		// functions considered write if they provide a value (have a body)
		switch decl.Kind() {
		case KindFunctionDeclaration:
			return !decl.AsFunctionDeclaration().Body().IsNil()
		case KindFunctionExpression:
			return !decl.AsFunctionExpression().Body().IsNil()
		case KindConstructor:
			// constructor node stores body on the parent? treat same as others
			return !decl.AsConstructorDeclaration().Body().IsNil()
		case KindMethodDeclaration:
			return !decl.AsMethodDeclaration().Body().IsNil()
		case KindGetAccessor:
			return !decl.AsGetAccessorDeclaration().Body().IsNil()
		case KindSetAccessor:
			return !decl.AsSetAccessorDeclaration().Body().IsNil()
		}
		return false

	case KindVariableDeclaration, KindPropertyDeclaration:
		// variable/property write if initializer present or is in catch clause
		var hasInit bool
		switch decl.Kind() {
		case KindVariableDeclaration:
			hasInit = !decl.AsVariableDeclaration().Initializer().IsNil()
		case KindPropertyDeclaration:
			hasInit = !decl.AsPropertyDeclaration().Initializer().IsNil()
		}
		return hasInit || IsCatchClause(decl.Parent())

	case KindMethodSignature, KindPropertySignature, KindJSDocPropertyTag, KindJSDocParameterTag:
		return false

	default:
		// preserve TS behavior: crash on unexpected kinds
		panic("Unhandled case in declarationIsWriteAccess")
	}
}

func IsArrayLiteralOrObjectLiteralDestructuringPattern(node Node) bool {
	if !(IsArrayLiteralExpression(node) || IsObjectLiteralExpression(node)) {
		return false
	}
	parent := node.Parent()
	// [a,b,c] from:
	// [a, b, c] = someExpression;
	if IsBinaryExpression(parent) && parent.AsBinaryExpression().Left() == node && parent.AsBinaryExpression().OperatorToken().Kind() == KindEqualsToken {
		return true
	}
	// [a, b, c] from:
	// for([a, b, c] of expression)
	if IsForOfStatement(parent) && parent.Initializer() == node {
		return true
	}
	// {x, a: {a, b, c} } = someExpression
	if IsPropertyAssignment(parent) {
		return IsArrayLiteralOrObjectLiteralDestructuringPattern(parent.Parent())
	}
	// [a, b, c] of
	// [x, [a, b, c] ] = someExpression
	return IsArrayLiteralOrObjectLiteralDestructuringPattern(parent)
}

func accessKind(node Node) AccessKind {
	parent := node.Parent()
	if parent.IsNil() {
		return AccessKindRead
	}
	switch parent.Kind() {
	case KindParenthesizedExpression:
		return accessKind(parent)
	case KindPrefixUnaryExpression:
		operator := parent.AsPrefixUnaryExpression().Operator()
		if operator == KindPlusPlusToken || operator == KindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case KindPostfixUnaryExpression:
		operator := parent.AsPostfixUnaryExpression().Operator()
		if operator == KindPlusPlusToken || operator == KindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case KindBinaryExpression:
		if parent.AsBinaryExpression().Left() == node {
			operator := parent.AsBinaryExpression().OperatorToken()
			if IsAssignmentOperator(operator.Kind()) {
				if operator.Kind() == KindEqualsToken {
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
		parentAccess := accessKind(parent.Parent())
		// In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
		if node == parent.AsPropertyAssignment().Name() {
			return reverseAccessKind(parentAccess)
		}
		return parentAccess
	case KindShorthandPropertyAssignment:
		// Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
		if node == parent.AsShorthandPropertyAssignment().ObjectAssignmentInitializer() {
			return AccessKindRead
		}
		return accessKind(parent.Parent())
	case KindArrayLiteralExpression:
		return accessKind(parent)
	case KindForInStatement, KindForOfStatement:
		if node == parent.AsForInOrOfStatement().Initializer() {
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

func IsDeclarationNode(node Node) bool {
	return !node.DeclarationData().IsNil()
}

// ExportableBase

// ModifiersBase

// LocalsContainerBase

func IsLocalsContainer(node Node) bool {
	return !node.LocalsContainerData().IsNil()
}

// FunctionLikeBase

// BodyBase

// FunctionLikeWithBodyBase

// FlowNodeBase

// if you provide nil for file, this code will walk to the root of the tree to find the file
func (node Node) JSDoc(file *SourceFile) []Node {
	if node.Flags()&NodeFlagsHasJSDoc == 0 {
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
func (node Node) EagerJSDoc(file *SourceFile) []Node {
	if node.Flags()&NodeFlagsHasJSDoc == 0 {
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

func subtreeFactsWorker(cache *atomic.Uint32, self Node) SubtreeFacts {
	// computeSubtreeFacts() is expected to be idempotent, so races will only impact time, not correctness.
	facts := SubtreeFacts(cache.Load())
	if facts&SubtreeFactsComputed == 0 {
		facts |= self.computeSubtreeFacts() | SubtreeFactsComputed
		cache.Store(uint32(facts))
	}
	return facts &^ SubtreeFactsComputed
}

func (node CompositeBase) computeSubtreeFacts() SubtreeFacts {
	// This method must be implemented by the concrete node type.
	panic("not implemented")
}

// TypeSyntaxBase

func (node TypeSyntaxBase) computeSubtreeFacts() SubtreeFacts { return SubtreeContainsTypeScript }

func (node TypeSyntaxBase) propagateSubtreeFacts() SubtreeFacts { return SubtreeContainsTypeScript }

func (node Token) computeSubtreeFacts() SubtreeFacts {
	switch node.Kind() {
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

func (node PrivateIdentifier) computeSubtreeFacts() SubtreeFacts {
	return SubtreeContainsClassFields
}

func (f *NodeFactory) NewModifier(kind Kind) Node {
	return f.NewToken(kind)
}

func (node Decorator) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) |
		SubtreeContainsTypeScript |
		SubtreeContainsDecorators
}

func (node ForInOrOfStatement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Initializer()) |
		propagateSubtreeFacts(node.Expression()) |
		propagateSubtreeFacts(node.Statement()) |
		core.IfElse(!node.AwaitModifier().IsNil(), SubtreeContainsForAwaitOrAsyncGenerator, SubtreeFactsNone)
}

func (node ReturnStatement) computeSubtreeFacts() SubtreeFacts {
	// return in an ES2018 async generator must be awaited
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsForAwaitOrAsyncGenerator
}

func (node CatchClause) computeSubtreeFacts() SubtreeFacts {
	res := propagateSubtreeFacts(node.VariableDeclaration()) |
		propagateSubtreeFacts(node.Block())
	if node.VariableDeclaration().IsNil() {
		res |= SubtreeContainsMissingCatchClauseVariable
	}
	return res
}

func (node CatchClause) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsCatchClause
}

func (node VariableStatement) computeSubtreeFacts() SubtreeFacts {
	if !node.Modifiers().IsNil() && node.Modifiers().ModifierFlags()&ModifierFlagsAmbient != 0 {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.Modifiers()) |
			propagateSubtreeFacts(node.DeclarationList())
	}
}

func (node VariableDeclaration) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Name()) |
		propagateEraseableSyntaxSubtreeFacts(node.ExclamationToken()) |
		propagateEraseableSyntaxSubtreeFacts(node.Type()) |
		propagateSubtreeFacts(node.Initializer())
}

func (node VariableDeclarationList) computeSubtreeFacts() SubtreeFacts {
	return propagateNodeListSubtreeFacts(node.Declarations(), propagateSubtreeFacts) |
		core.IfElse(node.Flags()&NodeFlagsUsing != 0, SubtreeContainsUsing, SubtreeFactsNone)
}

func (node VariableDeclarationList) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsVariableDeclarationList
}

func (node BindingPattern) computeSubtreeFacts() SubtreeFacts {
	switch node.Kind() {
	case KindObjectBindingPattern:
		return propagateNodeListSubtreeFacts(node.Elements(), propagateObjectBindingElementSubtreeFacts)
	case KindArrayBindingPattern:
		return propagateNodeListSubtreeFacts(node.Elements(), propagateBindingElementSubtreeFacts)
	default:
		return SubtreeFactsNone
	}
}

func (node BindingPattern) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsBindingPattern
}

func (node ParameterDeclaration) computeSubtreeFacts() SubtreeFacts {
	if !node.Name().IsNil() && IsThisIdentifier(node.Name()) {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.Modifiers()) |
			propagateSubtreeFacts(node.Name()) |
			propagateEraseableSyntaxSubtreeFacts(node.QuestionToken()) |
			propagateEraseableSyntaxSubtreeFacts(node.Type()) |
			propagateSubtreeFacts(node.Initializer())
	}
}

func (node ParameterDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsParameter
}

func (node BindingElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.PropertyName()) |
		propagateSubtreeFacts(node.Name()) |
		propagateSubtreeFacts(node.Initializer()) |
		core.IfElse(!node.DotDotDotToken().IsNil(), SubtreeContainsRestOrSpread, SubtreeFactsNone)
}

func (node FunctionDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.Body().IsNil() || node.ModifierFlags()&ModifierFlagsAmbient != 0 {
		return SubtreeContainsTypeScript
	} else {
		isAsync := node.ModifierFlags()&ModifierFlagsAsync != 0
		isGenerator := !node.AsteriskToken().IsNil()
		return propagateModifierListSubtreeFacts(node.Modifiers()) |
			propagateSubtreeFacts(node.AsteriskToken()) |
			propagateSubtreeFacts(node.Name()) |
			propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters()) |
			propagateNodeListSubtreeFacts(node.Parameters(), propagateSubtreeFacts) |
			propagateEraseableSyntaxSubtreeFacts(node.Type()) |
			propagateEraseableSyntaxSubtreeFacts(node.FullSignature()) |
			propagateSubtreeFacts(node.Body()) |
			core.IfElse(isAsync && isGenerator, SubtreeContainsForAwaitOrAsyncGenerator, SubtreeFactsNone) |
			core.IfElse(isAsync && !isGenerator, SubtreeContainsAnyAwait, SubtreeFactsNone)
	}
}

func (node FunctionDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsFunction
}

// ClassLikeBase

func (node ClassLikeBase) computeSubtreeFacts() SubtreeFacts {
	if !node.Modifiers().IsNil() && node.Modifiers().ModifierFlags()&ModifierFlagsAmbient != 0 {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.Modifiers()) |
			propagateSubtreeFacts(node.Name()) |
			propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters()) |
			propagateNodeListSubtreeFacts(node.HeritageClauses(), propagateSubtreeFacts) |
			propagateNodeListSubtreeFacts(node.Members(), propagateSubtreeFacts)
	}
}

func (node ClassDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsClass
}

func (node ClassExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsClass
}

func (node HeritageClause) computeSubtreeFacts() SubtreeFacts {
	switch node.Token() {
	case KindExtendsKeyword:
		return propagateNodeListSubtreeFacts(node.Types(), propagateSubtreeFacts)
	case KindImplementsKeyword:
		return SubtreeContainsTypeScript
	default:
		return SubtreeFactsNone
	}
}

func IsTypeOrJSTypeAliasDeclaration(node Node) bool {
	return node.Kind() == KindTypeAliasDeclaration || node.Kind() == KindJSTypeAliasDeclaration
}

func (node EnumMember) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Name()) |
		propagateSubtreeFacts(node.Initializer()) |
		SubtreeContainsTypeScript
}

func (node EnumDeclaration) computeSubtreeFacts() SubtreeFacts {
	if !node.Modifiers().IsNil() && node.Modifiers().ModifierFlags()&ModifierFlagsAmbient != 0 {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.Modifiers()) |
			propagateSubtreeFacts(node.Name()) |
			propagateNodeListSubtreeFacts(node.Members(), propagateSubtreeFacts) |
			SubtreeContainsTypeScript
	}
}

func (node ModuleDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.ModifierFlags()&ModifierFlagsAmbient != 0 {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.Modifiers()) |
			propagateSubtreeFacts(node.Name()) |
			propagateSubtreeFacts(node.Body()) |
			SubtreeContainsTypeScript
	}
}

func (node ModuleDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsModule
}

func (node ImportEqualsDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.IsTypeOnly() || !IsExternalModuleReference(node.ModuleReference()) {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.Modifiers()) |
			propagateSubtreeFacts(node.Name()) |
			propagateSubtreeFacts(node.ModuleReference())
	}
}

func IsImportDeclarationOrJSImportDeclaration(node Node) bool {
	return node.Kind() == KindImportDeclaration || node.Kind() == KindJSImportDeclaration
}

func (node ImportSpecifier) computeSubtreeFacts() SubtreeFacts {
	if node.IsTypeOnly() {
		return SubtreeContainsTypeScript
	} else {
		return propagateSubtreeFacts(node.PropertyName()) |
			propagateSubtreeFacts(node.Name())
	}
}

func (node ImportClause) computeSubtreeFacts() SubtreeFacts {
	if node.PhaseModifier() == KindTypeKeyword {
		return SubtreeContainsTypeScript
	} else {
		return propagateSubtreeFacts(node.Name()) |
			propagateSubtreeFacts(node.NamedBindings())
	}
}

func (node ExportAssignment) computeSubtreeFacts() SubtreeFacts {
	return propagateModifierListSubtreeFacts(node.Modifiers()) | propagateSubtreeFacts(node.Type()) | propagateSubtreeFacts(node.Expression()) | core.IfElse(node.IsExportEquals(), SubtreeContainsTypeScript, SubtreeFactsNone)
}

func IsAnyExportAssignment(node Node) bool {
	return node.Kind() == KindExportAssignment
}

func (node ExportDeclaration) computeSubtreeFacts() SubtreeFacts {
	return propagateModifierListSubtreeFacts(node.Modifiers()) |
		propagateSubtreeFacts(node.ExportClause()) |
		propagateSubtreeFacts(node.ModuleSpecifier()) |
		propagateSubtreeFacts(node.Attributes()) |
		core.IfElse(node.IsTypeOnly(), SubtreeContainsTypeScript, SubtreeFactsNone)
}

func (node ExportSpecifier) computeSubtreeFacts() SubtreeFacts {
	if node.IsTypeOnly() {
		return SubtreeContainsTypeScript
	} else {
		return propagateSubtreeFacts(node.PropertyName()) |
			propagateSubtreeFacts(node.Name())
	}
}

// NamedMemberBase

func (node ConstructorDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.Body().IsNil() {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.Modifiers()) |
			propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters()) |
			propagateNodeListSubtreeFacts(node.Parameters(), propagateSubtreeFacts) |
			propagateEraseableSyntaxSubtreeFacts(node.Type()) |
			propagateEraseableSyntaxSubtreeFacts(node.FullSignature()) |
			propagateSubtreeFacts(node.Body())
	}
}

func (node ConstructorDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsConstructor
}

func (node AccessorDeclarationBase) IsAccessorDeclaration() {}

func (node AccessorDeclarationBase) computeSubtreeFacts() SubtreeFacts {
	if node.Body().IsNil() {
		return SubtreeContainsTypeScript
	} else {
		return propagateModifierListSubtreeFacts(node.Modifiers()) |
			propagateSubtreeFacts(node.Name()) |
			propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters()) |
			propagateNodeListSubtreeFacts(node.Parameters(), propagateSubtreeFacts) |
			propagateEraseableSyntaxSubtreeFacts(node.Type()) |
			propagateEraseableSyntaxSubtreeFacts(node.FullSignature()) |
			propagateSubtreeFacts(node.Body())
	}
}

func (node AccessorDeclarationBase) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsAccessor |
		propagateSubtreeFacts(node.Name())
}

func (node MethodDeclaration) computeSubtreeFacts() SubtreeFacts {
	if node.Body().IsNil() {
		return SubtreeContainsTypeScript
	} else {
		isAsync := !node.Modifiers().IsNil() && node.Modifiers().ModifierFlags()&ModifierFlagsAsync != 0
		isGenerator := !node.AsteriskToken().IsNil()
		return propagateModifierListSubtreeFacts(node.Modifiers()) |
			propagateSubtreeFacts(node.AsteriskToken()) |
			propagateSubtreeFacts(node.Name()) |
			propagateEraseableSyntaxSubtreeFacts(node.PostfixToken()) |
			propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters()) |
			propagateNodeListSubtreeFacts(node.Parameters(), propagateSubtreeFacts) |
			propagateSubtreeFacts(node.Body()) |
			propagateEraseableSyntaxSubtreeFacts(node.Type()) |
			propagateEraseableSyntaxSubtreeFacts(node.FullSignature()) |
			core.IfElse(isAsync && isGenerator, SubtreeContainsForAwaitOrAsyncGenerator, SubtreeFactsNone) |
			core.IfElse(isAsync && !isGenerator, SubtreeContainsAnyAwait, SubtreeFactsNone)
	}
}

func (node MethodDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsMethod |
		propagateSubtreeFacts(node.Name())
}

func (node PropertyDeclaration) computeSubtreeFacts() SubtreeFacts {
	return propagateModifierListSubtreeFacts(node.Modifiers()) |
		propagateSubtreeFacts(node.Name()) |
		propagateEraseableSyntaxSubtreeFacts(node.PostfixToken()) |
		propagateEraseableSyntaxSubtreeFacts(node.Type()) |
		propagateSubtreeFacts(node.Initializer()) |
		SubtreeContainsClassFields
}

func (node PropertyDeclaration) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsProperty |
		propagateSubtreeFacts(node.Name())
}

func (node ClassStaticBlockDeclaration) computeSubtreeFacts() SubtreeFacts {
	return propagateModifierListSubtreeFacts(node.Modifiers()) |
		propagateSubtreeFacts(node.Body()) |
		SubtreeContainsClassFields
}

func (node KeywordExpression) computeSubtreeFacts() SubtreeFacts {
	switch node.Kind() {
	case KindThisKeyword:
		return SubtreeContainsLexicalThis
	case KindSuperKeyword:
		return SubtreeContainsLexicalSuper
	}
	return SubtreeFactsNone
}

// TemplateLiteralLikeBase

func (node BigIntLiteral) computeSubtreeFacts() SubtreeFacts {
	return SubtreeFactsNone // `bigint` is not downleveled in any way
}

func (node Identifier) computeSubtreeFacts() SubtreeFacts {
	return SubtreeContainsIdentifier
}

func (node NoSubstitutionTemplateLiteral) computeSubtreeFacts() SubtreeFacts {
	if node.TemplateFlags()&TokenFlagsContainsInvalidEscape != 0 {
		return SubtreeContainsInvalidTemplateEscape
	}
	return SubtreeFactsNone
}

func (node BinaryExpression) computeSubtreeFacts() SubtreeFacts {
	facts := propagateModifierListSubtreeFacts(node.Modifiers()) |
		propagateSubtreeFacts(node.Left()) |
		propagateSubtreeFacts(node.Type()) |
		propagateSubtreeFacts(node.OperatorToken()) |
		propagateSubtreeFacts(node.Right()) |
		core.IfElse(node.OperatorToken().Kind() == KindInKeyword && IsPrivateIdentifier(node.Left()), SubtreeContainsClassFields|SubtreeContainsPrivateIdentifierInExpression, SubtreeFactsNone)
	if node.OperatorToken().Kind() == KindEqualsToken {
		if (IsObjectLiteralExpression(node.Left()) || IsArrayLiteralExpression(node.Left())) && ContainsObjectRestOrSpread(node.Left()) {
			facts |= SubtreeContainsObjectRestOrSpread
		}
	}
	return facts
}

func (node YieldExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsForAwaitOrAsyncGenerator
}

func (node ArrowFunction) computeSubtreeFacts() SubtreeFacts {
	return propagateModifierListSubtreeFacts(node.Modifiers()) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters()) |
		propagateNodeListSubtreeFacts(node.Parameters(), propagateSubtreeFacts) |
		propagateEraseableSyntaxSubtreeFacts(node.Type()) |
		propagateEraseableSyntaxSubtreeFacts(node.FullSignature()) |
		propagateSubtreeFacts(node.Body()) |
		core.IfElse(node.ModifierFlags()&ModifierFlagsAsync != 0, SubtreeContainsAnyAwait, SubtreeFactsNone)
}

func (node ArrowFunction) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsArrowFunction
}

func (node FunctionExpression) computeSubtreeFacts() SubtreeFacts {
	isAsync := !node.Modifiers().IsNil() && node.Modifiers().ModifierFlags()&ModifierFlagsAsync != 0
	isGenerator := !node.AsteriskToken().IsNil()
	return propagateModifierListSubtreeFacts(node.Modifiers()) |
		propagateSubtreeFacts(node.AsteriskToken()) |
		propagateSubtreeFacts(node.Name()) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeParameters()) |
		propagateNodeListSubtreeFacts(node.Parameters(), propagateSubtreeFacts) |
		propagateEraseableSyntaxSubtreeFacts(node.Type()) |
		propagateEraseableSyntaxSubtreeFacts(node.FullSignature()) |
		propagateSubtreeFacts(node.Body()) |
		core.IfElse(isAsync && isGenerator, SubtreeContainsForAwaitOrAsyncGenerator, SubtreeFactsNone) |
		core.IfElse(isAsync && !isGenerator, SubtreeContainsAnyAwait, SubtreeFactsNone)
}

func (node FunctionExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsFunction
}

func (node AsExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsTypeScript
}

func (node AsExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsOuterExpression
}

func (node SatisfiesExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsTypeScript
}

func (node SatisfiesExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsOuterExpression
}

func (node PropertyAccessExpression) computeSubtreeFacts() SubtreeFacts {
	privateName := SubtreeFactsNone
	if !IsIdentifier(node.Name()) {
		privateName = SubtreeContainsPrivateIdentifierInExpression
	}
	return propagateSubtreeFacts(node.Expression()) |
		propagateSubtreeFacts(node.QuestionDotToken()) |
		propagateSubtreeFacts(node.Name()) | privateName
}

func (node PropertyAccessExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsPropertyAccess
}

func (node ElementAccessExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsElementAccess
}

func (node CallExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) |
		propagateSubtreeFacts(node.QuestionDotToken()) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments()) |
		propagateNodeListSubtreeFacts(node.Arguments(), propagateSubtreeFacts) |
		core.IfElse(IsImportCall(node.AsNode()), SubtreeContainsDynamicImport, SubtreeFactsNone)
}

func (node CallExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsCall
}

func (node NewExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments()) |
		propagateNodeListSubtreeFacts(node.Arguments(), propagateSubtreeFacts)
}

func (node NewExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsNew
}

func (node MetaProperty) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Name()) &^ SubtreeContainsIdentifier
}

func (node NonNullExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsTypeScript
}

func (node SpreadElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsRestOrSpread
}

func (node TaggedTemplateExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Tag()) |
		propagateSubtreeFacts(node.QuestionDotToken()) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments()) |
		propagateSubtreeFacts(node.Template())
}

// Hand-written subtree facts for nontrivial generated nodes.

func (node ArrayLiteralExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsArrayLiteral
}

func (node ObjectLiteralExpression) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsObjectLiteral
}

func (node SpreadAssignment) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsESObjectRestOrSpread | SubtreeContainsObjectRestOrSpread
}

func (node PropertyAssignment) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Name()) |
		propagateSubtreeFacts(node.Type()) |
		propagateSubtreeFacts(node.Initializer())
}

func (node ShorthandPropertyAssignment) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Name()) |
		propagateSubtreeFacts(node.Type()) |
		propagateSubtreeFacts(node.ObjectAssignmentInitializer()) |
		SubtreeContainsTypeScript
}

func (node AwaitExpression) computeSubtreeFacts() SubtreeFacts {
	// await in an ES2018 async generator must use `yield __await(expr)`
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsAwait | SubtreeContainsAnyAwait | SubtreeContainsForAwaitOrAsyncGenerator
}

func (node TypeAssertion) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsTypeScript
}

func (node TypeAssertion) propagateSubtreeFacts() SubtreeFacts {
	return node.SubtreeFacts() & ^SubtreeExclusionsOuterExpression
}

func (node ExpressionWithTypeArguments) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments())
}

func (node ImportAttributesNode) GetResolutionModeOverride(grammarErrorOnNode func(node Node, message *diagnostics.Message, args ...any) bool) (core.ResolutionMode, bool) {
	if node.IsNil() {
		return core.ResolutionModeNone, false
	}

	attributes := node.AsImportAttributes().Attributes()

	attribute := core.Find(attributes.Slice(), func(attribute Node) bool {
		return attribute.Name().Text() == "resolution-mode"
	})
	if attribute.IsNil() {
		return core.ResolutionModeNone, false
	}

	elem := attribute.AsImportAttribute()
	if !IsStringLiteralLike(elem.Value()) {
		return core.ResolutionModeNone, false
	}
	if elem.Value().Text() != "import" && elem.Value().Text() != "require" {
		if grammarErrorOnNode != nil {
			grammarErrorOnNode(elem.Value(), diagnostics.X_resolution_mode_should_be_either_require_or_import)
		}
		return core.ResolutionModeNone, false
	}
	if elem.Value().Text() == "import" {
		return core.ResolutionModeESM, true
	} else {
		return core.ModuleKindCommonJS, true
	}
}

// FunctionOrConstructorTypeNodeBase

func (node TemplateHead) computeSubtreeFacts() SubtreeFacts {
	if node.TemplateFlags()&TokenFlagsContainsInvalidEscape != 0 {
		return SubtreeContainsInvalidTemplateEscape
	}
	return SubtreeFactsNone
}

func (node TemplateMiddle) computeSubtreeFacts() SubtreeFacts {
	if node.TemplateFlags()&TokenFlagsContainsInvalidEscape != 0 {
		return SubtreeContainsInvalidTemplateEscape
	}
	return SubtreeFactsNone
}

func (node TemplateTail) computeSubtreeFacts() SubtreeFacts {
	if node.TemplateFlags()&TokenFlagsContainsInvalidEscape != 0 {
		return SubtreeContainsInvalidTemplateEscape
	}
	return SubtreeFactsNone
}

func (node JsxElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.OpeningElement()) |
		propagateNodeListSubtreeFacts(node.Children(), propagateSubtreeFacts) |
		propagateSubtreeFacts(node.ClosingElement()) |
		SubtreeContainsJsx
}

func (node JsxAttributes) computeSubtreeFacts() SubtreeFacts {
	return propagateNodeListSubtreeFacts(node.Properties(), propagateSubtreeFacts) |
		SubtreeContainsJsx
}

func (node JsxNamespacedName) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Namespace()) |
		propagateSubtreeFacts(node.Name()) |
		SubtreeContainsJsx
}

func (node JsxOpeningElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.TagName()) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments()) |
		propagateSubtreeFacts(node.Attributes()) |
		SubtreeContainsJsx
}

func (node JsxSelfClosingElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.TagName()) |
		propagateEraseableSyntaxListSubtreeFacts(node.TypeArguments()) |
		propagateSubtreeFacts(node.Attributes()) |
		SubtreeContainsJsx
}

func (node JsxFragment) computeSubtreeFacts() SubtreeFacts {
	return propagateNodeListSubtreeFacts(node.Children(), propagateSubtreeFacts) |
		SubtreeContainsJsx
}

func (node JsxOpeningFragment) computeSubtreeFacts() SubtreeFacts {
	return SubtreeContainsJsx
}

func (node JsxClosingFragment) computeSubtreeFacts() SubtreeFacts {
	return SubtreeContainsJsx
}

func (node JsxAttribute) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Name()) |
		propagateSubtreeFacts(node.Initializer()) |
		SubtreeContainsJsx
}

func (node JsxSpreadAttribute) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsJsx
}

func (node JsxClosingElement) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.TagName()) | SubtreeContainsJsx
}

func (node JsxExpression) computeSubtreeFacts() SubtreeFacts {
	return propagateSubtreeFacts(node.Expression()) | SubtreeContainsJsx
}

func (node JsxText) computeSubtreeFacts() SubtreeFacts {
	return SubtreeContainsJsx
}

/// JSDoc nodes ///

// JSDoc

func (node Node) IsJSDoc() bool {
	return node.Kind() == KindJSDoc
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
	PackageJsonDirectory tspath.RootedDirectoryPath
	ImpliedNodeFormat    core.ResolutionMode
}

// SourceFileDataKey identifies lazily-computed data attached to a SourceFile by
// another package. Prefer regular SourceFile fields for ast-owned data.
type SourceFileDataKey[T any] struct {
	key sourceFileDataKey
	_   [0]T
}

type sourceFileDataKey uint64

var sourceFileDataKeyCounter atomic.Uint64

type sourceFileDataCell[T any] struct {
	once  sync.Once
	value T
}

func NewSourceFileDataKey[T any]() *SourceFileDataKey[T] {
	return &SourceFileDataKey[T]{key: sourceFileDataKey(sourceFileDataKeyCounter.Add(1))}
}

func (file *SourceFile) GetOrComputeData[T any](key *SourceFileDataKey[T], compute func(*SourceFile) T) T {
	cell := file.getDataCell(key)
	cell.once.Do(func() {
		cell.value = compute(file)
	})
	return cell.value
}

func (file *SourceFile) getDataCell[T any](key *SourceFileDataKey[T]) *sourceFileDataCell[T] {
	if key == nil || key.key == 0 {
		panic("invalid SourceFileDataKey; use NewSourceFileDataKey")
	}

	file.dataMu.Lock()
	defer file.dataMu.Unlock()

	if file.data == nil {
		file.data = make(map[sourceFileDataKey]any)
	}
	if cell, ok := file.data[key.key]; ok {
		return cell.(*sourceFileDataCell[T])
	}
	cell := &sourceFileDataCell[T]{}
	file.data[key.key] = cell
	return cell
}

type CheckJsDirective struct {
	Enabled bool
	Range   CommentRange
}

type HasFileName interface {
	FileName() tspath.RootedFilePath
	PathKey() tspath.PathKey
}

type TokenCacheKey struct {
	parent Node
	loc    core.TextRange
}

// sourceFileData is a SourceFile's record. It holds the fields that
// SourceFile shares with other nodes; the rest are in the SourceFile.
type sourceFileData struct {
	nodeBaseData
	nextContainer nodeRef
	symbol        sideRef
	locals        sideRef
	file          sideRef
	facts         atomic.Uint32
}

// SourceFile is accessed by pointer rather than through a view, because its
// many fields are only meaningful for files. Its embedded Node is a handle to
// its record, giving *SourceFile the shared node methods.
type SourceFile struct {
	Node

	// Fields set by NewSourceFile
	fileName          tspath.RootedFilePath // For debugging convenience
	parseOptions      SourceFileParseOptions
	text              string
	contentMapperInfo *ContentMapperSourceFileInfo
	Statements        NodeList  // NodeList[*Statement]
	EndOfFileToken    TokenNode // TokenNode[*EndOfFileToken]

	// Fields for lazily-computed data owned by packages outside ast.
	dataMu sync.Mutex
	data   map[sourceFileDataKey]any

	// Fields set by parser
	diagnostics                 []*Diagnostic
	jsDiagnostics               []*Diagnostic
	jsdocDiagnostics            []*Diagnostic
	LanguageVariant             core.LanguageVariant
	ScriptKind                  core.ScriptKind
	IsDeclarationFile           bool
	UsesUriStyleNodeCoreModules core.Tristate
	IdentifierCount             int
	imports                     []LiteralLikeNode // []LiteralLikeNode
	ModuleAugmentations         []ModuleName      // []ModuleName
	AmbientModuleNames          []string
	CommentDirectives           []CommentDirective
	jsdocCache                  map[Node][]Node
	jsdocMu                     sync.RWMutex
	hasLazyJSDoc                bool
	identifiersOnce             sync.Once
	identifiers                 collections.Set[string]
	ReparsedClones              []Node
	Pragmas                     []Pragma
	ReferencedFiles             []*FileReference
	TypeReferenceDirectives     []*FileReference
	LibReferenceDirectives      []*FileReference
	CheckJsDirective            *CheckJsDirective
	NodeCount                   int
	TextCount                   int
	CommonJSModuleIndicator     Node
	// If this is the SourceFile itself, then this module was "forced"
	// to be an external module (previously "true").
	ExternalModuleIndicator Node

	// Fields set by binder

	isBound               atomic.Bool
	bindOnce              sync.Once
	bindDiagnostics       []*Diagnostic
	SymbolCount           int
	PatternAmbientModules []*PatternAmbientModule
	GlobalExports         SymbolTable

	// Fields set by ECMALineMap

	ecmaLineMapMu sync.RWMutex
	ecmaLineMap   []core.TextPos

	// Fields set by language service

	Hash             xxh3.Uint128
	tokenCacheMu     sync.Mutex
	tokenCache       map[TokenCacheKey]Node
	tokenFactory     *NodeFactory
	declarationMapMu sync.Mutex
	declarationMap   map[string][]Node
	nameTableOnce    sync.Once
	nameTable        map[string]int

	// Fields for UTF-8 to UTF-16 position mapping

	positionMapOnce sync.Once
	positionMap     *PositionMap
}

func (f *NodeFactory) NewSourceFile(opts SourceFileParseOptions, text string, statements NodeList, endOfFileToken TokenNode) Node {
	store := f.nodeStore()
	rec, i := newRecord[sourceFileData](store, layoutSourceFile)
	file := &SourceFile{
		fileName:       opts.FileName,
		parseOptions:   opts,
		text:           text,
		Statements:     statements,
		EndOfFileToken: endOfFileToken,
	}
	store.sourceFiles.set(&rec.file, file, false)
	file.Node = f.newNode(KindSourceFile, layoutSourceFile, i)
	return file.Node
}

func (n Node) asSourceFile() *SourceFile {
	return n.store().sourceFiles.get((*sourceFileData)(n.rec()).file)
}

func (node *SourceFile) ParseOptions() SourceFileParseOptions {
	return node.parseOptions
}

func (node *SourceFile) Text() string {
	return node.text
}

// OriginalText returns the untransformed source text for content-mapped files, or Text() otherwise.
func (node *SourceFile) OriginalText() string {
	if node.ContentMapper() != "" {
		return node.contentMapperInfo.OriginalText
	}
	return node.text
}

// OriginalFileName returns the canonical filename associated with a supplemental source file, or FileName() otherwise.
func (node *SourceFile) OriginalFileName() tspath.RootedFilePath {
	if canonical := node.CanonicalSourceFile(); canonical != nil {
		return canonical.FileName()
	}
	return node.FileName()
}

// SpanMap returns the span map that maps positions in this file's transformed Text() back to its
// original, untransformed content, or nil if the file is not content-mapped (or is a failure stub).
// The returned map is nil-safe: a nil map maps positions identically.
func (node *SourceFile) SpanMap() *spanmap.SpanMap {
	if node.contentMapperInfo == nil {
		return nil
	}
	return node.contentMapperInfo.SpanMap
}

// IsContentMapped reports whether this file was produced by a content mapper.
func (node *SourceFile) IsContentMapped() bool {
	return node.contentMapperInfo != nil
}

// ContentMapper returns the identity of the content mapper that produced this file, or "" if the file
// was not produced by a content mapper (or the mapper did not identify itself).
func (node *SourceFile) ContentMapper() string {
	if node.contentMapperInfo == nil {
		return ""
	}
	return node.contentMapperInfo.ContentMapper
}

// IsContentMapperFailureStub reports whether this file is the empty placeholder produced when a content
// mapper's transform failed.
func (node *SourceFile) IsContentMapperFailureStub() bool {
	return node.ContentMapper() != "" && node.SpanMap() == nil
}

func (node *SourceFile) ContentMapperTransformIdentity() string {
	if node.contentMapperInfo == nil {
		return ""
	}
	return node.contentMapperInfo.TransformIdentity
}

func (node *SourceFile) VirtualFileName() tspath.RootedFilePath {
	if node.contentMapperInfo == nil {
		return ""
	}
	return node.contentMapperInfo.VirtualFileName
}

type MappedDiagnosticDirectivePolicy uint8

const (
	MappedDiagnosticDirectivePolicyIgnore MappedDiagnosticDirectivePolicy = iota
	MappedDiagnosticDirectivePolicyExpect
)

type MappedDiagnosticDirective struct {
	OriginalRange     core.TextRange
	VirtualRange      core.TextRange
	Policy            MappedDiagnosticDirectivePolicy
	UnusedCode        int32
	UnusedMessageText string
	Source            string
}

type ContentMapperSourceFileInfo struct {
	ContentMapper           string
	TransformIdentity       string
	ParseOptions            SourceFileParseOptions
	VirtualFileName         tspath.RootedFilePath
	OriginalText            string
	SpanMap                 *spanmap.SpanMap
	DiagnosticDirectives    []MappedDiagnosticDirective
	SupplementalSourceFiles []*SourceFile
	CanonicalSourceFile     *SourceFile
}

// ContentMapperParseOptions returns the parse options used to acquire this file from the mapped parse cache.
func (node *SourceFile) ContentMapperParseOptions() SourceFileParseOptions {
	if node.contentMapperInfo == nil {
		return SourceFileParseOptions{}
	}
	return node.contentMapperInfo.ParseOptions
}

// SetContentMapperInfo initializes all content-mapper metadata before the source file is published.
func (node *SourceFile) SetContentMapperInfo(info ContentMapperSourceFileInfo) {
	if node.contentMapperInfo != nil {
		panic("content mapper source file info already set")
	}
	node.contentMapperInfo = &info
}

func (node *SourceFile) DiagnosticDirectives() []MappedDiagnosticDirective {
	if node.contentMapperInfo == nil {
		return nil
	}
	return node.contentMapperInfo.DiagnosticDirectives
}

// SupplementalSourceFiles returns the additional outputs produced from this canonical source file.
func (node *SourceFile) SupplementalSourceFiles() []*SourceFile {
	if node.contentMapperInfo == nil {
		return nil
	}
	return node.contentMapperInfo.SupplementalSourceFiles
}

// CanonicalSourceFile returns the canonical output associated with this supplemental source file.
func (node *SourceFile) CanonicalSourceFile() *SourceFile {
	if node.contentMapperInfo == nil {
		return nil
	}
	return node.contentMapperInfo.CanonicalSourceFile
}

// IsContentMapperSupplemental reports whether this is an unnamed supplemental mapper output.
func (node *SourceFile) IsContentMapperSupplemental() bool {
	return node.CanonicalSourceFile() != nil
}

func (file *SourceFile) HasIdentifier(name string) bool {
	file.identifiersOnce.Do(func() {
		file.identifiers = collectIdentifiersForSourceFile(file)
	})
	return file.identifiers.Has(name)
}

func collectIdentifiersForSourceFile(sourceFile *SourceFile) collections.Set[string] {
	var identifiers collections.Set[string]
	var collect func(Node) bool
	collect = func(node Node) bool {
		switch node.Kind() {
		case KindIdentifier,
			KindPrivateIdentifier,
			KindStringLiteral,
			KindNumericLiteral,
			KindBigIntLiteral,
			KindNoSubstitutionTemplateLiteral:
			identifiers.Add(node.Text())
		}
		node.ForEachChild(collect)
		return false
	}
	collect(sourceFile.AsNode())
	return identifiers
}

func (node *SourceFile) FileName() tspath.RootedFilePath {
	return node.parseOptions.FileName
}

func (node *SourceFile) PathKey() tspath.PathKey {
	return node.parseOptions.PathKey
}

func (node *SourceFile) Imports() []LiteralLikeNode {
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

func (node *SourceFile) SetJSDocCache(cache map[Node][]Node) {
	node.jsdocCache = cache
}

func (node *SourceFile) SetHasLazyJSDoc(lazy bool) {
	node.hasLazyJSDoc = lazy
}

func (node *SourceFile) resolveJSDoc(n Node) []Node {
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
		node.jsdocCache = make(map[Node][]Node)
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

func (node *SourceFile) VisitEachChild(v *NodeVisitor) Node {
	return v.Factory.UpdateSourceFile(node, v.visitTopLevelStatements(node.Statements), v.visitToken(node.EndOfFileToken))
}

func (node *SourceFile) IsJS() bool {
	return IsSourceFileJS(node)
}

func (node *SourceFile) copyFrom(other *SourceFile) {
	// Do not copy fields set by NewSourceFile (Text, FileName, Path, or Statements)
	if other.contentMapperInfo != nil {
		node.SetContentMapperInfo(*other.contentMapperInfo)
	}
	node.LanguageVariant = other.LanguageVariant
	node.ScriptKind = other.ScriptKind
	node.IsDeclarationFile = other.IsDeclarationFile
	node.UsesUriStyleNodeCoreModules = other.UsesUriStyleNodeCoreModules
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
	node.SetFlags(node.Flags() | other.Flags())
}

func (node *SourceFile) Clone(f NodeFactoryCoercible) Node {
	updated := f.AsNodeFactory().NewSourceFile(node.parseOptions, node.text, node.Statements, node.EndOfFileToken)
	newFile := updated.AsSourceFile()
	newFile.copyFrom(node)
	return cloneNode(updated, node.AsNode(), f.AsNodeFactory().hooks)
}

func (node *SourceFile) computeSubtreeFacts() SubtreeFacts {
	return propagateNodeListSubtreeFacts(node.Statements, propagateSubtreeFacts)
}

func (f *NodeFactory) UpdateSourceFile(node *SourceFile, statements StatementList, endOfFileToken TokenNode) Node {
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

		var walk func(node Node) bool
		walk = func(node Node) bool {
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
		file.positionMap = ComputePositionMap(file.Text())
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
	parent Node,
	flags TokenFlags,
) TokenNode {
	node.tokenCacheMu.Lock()
	defer node.tokenCacheMu.Unlock()
	loc := core.NewTextRange(pos, end)
	key := TokenCacheKey{parent, loc}
	if token, ok := node.tokenCache[key]; ok {
		if token.Kind() != kind {
			panic(fmt.Sprintf("Token cache mismatch: %v != %v", token.Kind(), kind))
		}
		return token
	}
	if parent.Flags()&NodeFlagsReparsed != 0 {
		panic(fmt.Sprintf("Cannot create token from reparsed node of kind %v", parent.Kind()))
	}
	if node.tokenCache == nil {
		node.tokenCache = make(map[TokenCacheKey]Node)
	}
	token := createToken(kind, node, pos, end, flags)
	token.SetLoc(loc)
	token.SetParent(parent)
	node.tokenCache[key] = token
	return token
}

// `kind` should be a token kind.
func createToken(kind Kind, file *SourceFile, pos, end int, flags TokenFlags) Node {
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

func (node *SourceFile) GetDeclarationMap() map[string][]Node {
	node.declarationMapMu.Lock()
	defer node.declarationMapMu.Unlock()
	if node.declarationMap == nil {
		node.declarationMap = node.computeDeclarationMap()
	}
	return node.declarationMap
}

func (node *SourceFile) computeDeclarationMap() map[string][]Node {
	result := make(map[string][]Node)

	addDeclaration := func(declaration Node) {
		name := GetDeclarationName(declaration)
		if name != "" {
			result[name] = append(result[name], declaration)
		}
	}

	var visit func(Node) bool
	visit = func(node Node) bool {
		switch node.Kind() {
		case KindFunctionDeclaration, KindFunctionExpression, KindMethodDeclaration, KindMethodSignature:
			declarationName := GetDeclarationName(node)
			if declarationName != "" {
				declarations := result[declarationName]
				var lastDeclaration Node
				if len(declarations) != 0 {
					lastDeclaration = declarations[len(declarations)-1]
				}
				// Check whether this declaration belongs to an "overload group".
				if !lastDeclaration.IsNil() && node.Parent() == lastDeclaration.Parent() && node.Symbol() == lastDeclaration.Symbol() {
					// Overwrite the last declaration if it was an overload and this one is an implementation.
					if !node.Body().IsNil() && lastDeclaration.Body().IsNil() {
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
			if !node.PropertyName().IsNil() {
				addDeclaration(node)
			}
		case KindParameter:
			// Only consider parameter properties
			if !HasSyntacticModifier(node, ModifierFlagsParameterPropertyModifier) {
				break
			}
			fallthrough
		case KindVariableDeclaration, KindBindingElement:
			name := node.Name()
			if !name.IsNil() {
				if IsBindingPattern(name) {
					node.Name().ForEachChild(visit)
				} else {
					if !node.Initializer().IsNil() {
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
			exportClause := node.AsExportDeclaration().ExportClause()
			if !exportClause.IsNil() {
				if IsNamedExports(exportClause) {
					for _, element := range exportClause.ElementList().All() {
						visit(element)
					}
				} else {
					visit(exportClause.AsNamespaceExport().Name())
				}
			}
		case KindImportDeclaration:
			importClause := node.AsImportDeclaration().ImportClause()
			if !importClause.IsNil() {
				// Handle default import case e.g.:
				//    import d from "mod";
				if !importClause.Name().IsNil() {
					addDeclaration(importClause.Name())
				}
				// Handle named bindings in imports e.g.:
				//    import * as NS from "mod";
				//    import {a, b as B} from "mod";
				namedBindings := importClause.AsImportClause().NamedBindings()
				if !namedBindings.IsNil() {
					if namedBindings.Kind() == KindNamespaceImport {
						addDeclaration(namedBindings)
					} else {
						for _, element := range namedBindings.ElementList().All() {
							visit(element)
						}
					}
				}
			}
		case KindBinaryExpression:
			switch GetAssignmentDeclarationKind(node) {
			case JSDeclarationKindExportsProperty, JSDeclarationKindThisProperty, JSDeclarationKindProperty:
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

func GetDeclarationName(declaration Node) string {
	name := GetNonAssignedNameOfDeclaration(declaration)
	if !name.IsNil() {
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

func forEachChild_JSDocParameterOrPropertyTag(node JSDocParameterOrPropertyTag, v Visitor) bool {
	return visit(v, node.TagName()) ||
		(node.IsNameFirst() &&
			(visit(v, node.Name()) || visit(v, node.TypeExpression()))) ||
		(!node.IsNameFirst() &&
			(visit(v, node.TypeExpression()) || visit(v, node.Name()))) ||
		visitNodeList(v, node.Comment())
}

func visitEachChild_JSDocParameterOrPropertyTag(node JSDocParameterOrPropertyTag, v *NodeVisitor) Node {
	return v.Factory.UpdateJSDocParameterOrPropertyTag(node, v.visitNode(node.TagName()), v.visitNode(node.Name()), node.IsBracketed(), v.visitNode(node.TypeExpression()), node.IsNameFirst(), v.visitNodes(node.Comment()))
}

func (f *NodeFactory) ReleaseArenas() {
	*f = NodeFactory{
		hooks:     f.hooks,
		textCount: f.textCount,
		nodeCount: f.nodeCount,
	}
}
