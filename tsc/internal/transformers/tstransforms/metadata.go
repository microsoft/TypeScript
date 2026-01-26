package tstransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

const USE_NEW_TYPE_METADATA_FORMAT = false

type MetadataTransformer struct {
	transformers.Transformer
	legacyDecorators bool
	resolver         printer.EmitResolver

	serializer          *metadataSerializer
	strictNullChecks    bool
	parent              *ast.Node
	currentLexicalScope *ast.Node
}

func NewMetadataTransformer(opt *transformers.TransformOptions) *transformers.Transformer {
	tx := &MetadataTransformer{
		legacyDecorators: opt.CompilerOptions.ExperimentalDecorators.IsTrue(),
		resolver:         opt.EmitResolver,
		strictNullChecks: opt.CompilerOptions.GetStrictOptionValue(opt.CompilerOptions.StrictNullChecks),
	}
	return tx.NewTransformer(tx.visit, opt.Context)
}

func (tx *MetadataTransformer) visit(node *ast.Node) *ast.Node {
	if (node.SubtreeFacts() & ast.SubtreeContainsDecorators) == 0 {
		return node
	}

	switch node.Kind {
	case ast.KindClassDeclaration:
		return tx.visitClassDeclaration(node.AsClassDeclaration())
	case ast.KindClassExpression:
		return tx.visitClassExpression(node.AsClassExpression())
	case ast.KindPropertyDeclaration:
		return tx.visitPropertyDeclaration(node.AsPropertyDeclaration())
	case ast.KindMethodDeclaration:
		return tx.visitMethodDeclaration(node.AsMethodDeclaration())
	case ast.KindSetAccessor:
		return tx.visitSetAccessor(node.AsSetAccessorDeclaration())
	case ast.KindGetAccessor:
		return tx.visitGetAccessor(node.AsGetAccessorDeclaration())
	case ast.KindSourceFile:
		tx.parent = nil
		defer tx.setParent(nil)
		tx.currentLexicalScope = node
		defer tx.setCurrentLexicalScope(nil)
		tx.serializer = newMetadataSerializer(tx.resolver, tx.Factory(), tx.EmitContext(), tx.strictNullChecks)
		updated := tx.Visitor().VisitEachChild(node)
		tx.EmitContext().AddEmitHelper(updated, tx.EmitContext().ReadEmitHelpers()...)
		return updated
	case ast.KindModuleBlock, ast.KindBlock, ast.KindCaseBlock:
		oldScope := tx.currentLexicalScope
		tx.currentLexicalScope = node
		defer tx.setCurrentLexicalScope(oldScope)
		return tx.Visitor().VisitEachChild(node)
	default:
		return tx.Visitor().VisitEachChild(node)
	}
}

func (tx *MetadataTransformer) setParent(node *ast.Node) {
	tx.parent = node
}

func (tx *MetadataTransformer) setCurrentLexicalScope(node *ast.Node) {
	tx.currentLexicalScope = node
}

func (tx *MetadataTransformer) visitClassExpression(node *ast.ClassExpression) *ast.Node {
	oldParent := tx.parent
	tx.parent = node.AsNode()
	defer tx.setParent(oldParent)

	if !ast.ClassOrConstructorParameterIsDecorated(tx.legacyDecorators, node.AsNode()) {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}
	modifiers := tx.injectClassTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode())
	return tx.Factory().UpdateClassExpression(
		node,
		modifiers,
		tx.Visitor().VisitNode(node.Name()),
		tx.Visitor().VisitNodes(node.TypeParameters),
		tx.Visitor().VisitNodes(node.HeritageClauses),
		tx.Visitor().VisitNodes(node.Members),
	)
}

func (tx *MetadataTransformer) visitClassDeclaration(node *ast.ClassDeclaration) *ast.Node {
	oldParent := tx.parent
	tx.parent = node.AsNode()
	defer tx.setParent(oldParent)

	if !ast.ClassOrConstructorParameterIsDecorated(tx.legacyDecorators, node.AsNode()) {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}
	modifiers := tx.injectClassTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode())
	return tx.Factory().UpdateClassDeclaration(
		node,
		modifiers,
		tx.Visitor().VisitNode(node.Name()),
		tx.Visitor().VisitNodes(node.TypeParameters),
		tx.Visitor().VisitNodes(node.HeritageClauses),
		tx.Visitor().VisitNodes(node.Members),
	)
}

func (tx *MetadataTransformer) visitPropertyDeclaration(node *ast.PropertyDeclaration) *ast.Node {
	if !ast.HasDecorators(node.AsNode()) {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}

	modifiers := tx.injectClassElementTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode(), tx.parent)
	return tx.Factory().UpdatePropertyDeclaration(
		node,
		modifiers,
		tx.Visitor().VisitNode(node.Name()),
		tx.Visitor().VisitNode(node.PostfixToken),
		tx.Visitor().VisitNode(node.Type),
		tx.Visitor().VisitNode(node.Initializer),
	)
}

func (tx *MetadataTransformer) visitMethodDeclaration(node *ast.MethodDeclaration) *ast.Node {
	if !ast.HasDecorators(node.AsNode()) && len(getDecoratorsOfParameters(node.AsNode())) == 0 {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}

	modifiers := tx.injectClassElementTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode(), tx.parent)
	return tx.Factory().UpdateMethodDeclaration(
		node,
		modifiers,
		tx.Visitor().VisitNode(node.AsteriskToken),
		tx.Visitor().VisitNode(node.Name()),
		tx.Visitor().VisitNode(node.PostfixToken),
		tx.Visitor().VisitNodes(node.TypeParameters),
		tx.Visitor().VisitNodes(node.Parameters),
		tx.Visitor().VisitNode(node.Type),
		tx.Visitor().VisitNode(node.FullSignature),
		tx.Visitor().VisitNode(node.Body),
	)
}

func (tx *MetadataTransformer) visitSetAccessor(node *ast.SetAccessorDeclaration) *ast.Node {
	if !ast.HasDecorators(node.AsNode()) && len(getDecoratorsOfParameters(node.AsNode())) == 0 {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}

	modifiers := tx.injectClassElementTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode(), tx.parent)
	return tx.Factory().UpdateSetAccessorDeclaration(
		node,
		modifiers,
		tx.Visitor().VisitNode(node.Name()),
		tx.Visitor().VisitNodes(node.TypeParameters),
		tx.Visitor().VisitNodes(node.Parameters),
		tx.Visitor().VisitNode(node.Type),
		tx.Visitor().VisitNode(node.FullSignature),
		tx.Visitor().VisitNode(node.Body),
	)
}

func (tx *MetadataTransformer) visitGetAccessor(node *ast.GetAccessorDeclaration) *ast.Node {
	if !ast.HasDecorators(node.AsNode()) {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}

	modifiers := tx.injectClassElementTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode(), tx.parent)
	return tx.Factory().UpdateGetAccessorDeclaration(
		node,
		modifiers,
		tx.Visitor().VisitNode(node.Name()),
		tx.Visitor().VisitNodes(node.TypeParameters),
		tx.Visitor().VisitNodes(node.Parameters),
		tx.Visitor().VisitNode(node.Type),
		tx.Visitor().VisitNode(node.FullSignature),
		tx.Visitor().VisitNode(node.Body),
	)
}

func (tx *MetadataTransformer) injectClassTypeMetadata(list *ast.ModifierList, node *ast.Node) *ast.ModifierList {
	metadata := tx.getTypeMetadata(node, node)
	if len(metadata) > 0 {
		var originalNodes []*ast.Node
		if list != nil {
			originalNodes = list.Nodes
		}
		if len(originalNodes) == 0 {
			res := tx.Factory().NewModifierList(metadata)
			if list != nil {
				res.Loc = list.Loc
			}
			return res
		}
		var modifiersArray []*ast.Node
		if ast.IsModifier(originalNodes[0]) && (originalNodes[0].Kind == ast.KindDefaultKeyword || originalNodes[0].Kind == ast.KindExportKeyword) {
			modifiersArray = append(modifiersArray, originalNodes[0])
			if len(originalNodes) > 1 && (originalNodes[1].Kind == ast.KindDefaultKeyword || originalNodes[1].Kind == ast.KindExportKeyword) {
				modifiersArray = append(modifiersArray, originalNodes[1])
			}
		}
		restStart := len(modifiersArray)
		decos := core.Filter(originalNodes, ast.IsDecorator)
		modifiersArray = append(modifiersArray, decos...)
		modifiersArray = append(modifiersArray, metadata...)
		otherModifiers := core.Filter(originalNodes[restStart:], ast.IsModifier)
		modifiersArray = append(modifiersArray, otherModifiers...)
		res := tx.Factory().NewModifierList(modifiersArray)
		res.Loc = list.Loc
		return res
	}
	return list
}

func (tx *MetadataTransformer) injectClassElementTypeMetadata(list *ast.ModifierList, node *ast.Node, container *ast.Node) *ast.ModifierList {
	if !ast.IsClassLike(container) {
		return list
	}
	if !ast.ClassElementOrClassElementParameterIsDecorated(tx.legacyDecorators, node, container) {
		return list
	}
	metadata := tx.getTypeMetadata(node, container)
	if len(metadata) > 0 {
		var originalNodes []*ast.Node
		if list != nil {
			originalNodes = list.Nodes
		}
		if len(originalNodes) == 0 {
			res := tx.Factory().NewModifierList(metadata)
			if list != nil {
				res.Loc = list.Loc
			}
			return res
		}
		var modifiersArray []*ast.Node
		decos := core.Filter(originalNodes, ast.IsDecorator)
		modifiersArray = append(modifiersArray, decos...)
		modifiersArray = append(modifiersArray, metadata...)
		modifiers := core.Filter(originalNodes, ast.IsModifier)
		modifiersArray = append(modifiersArray, modifiers...)
		res := tx.Factory().NewModifierList(modifiersArray)
		res.Loc = list.Loc
		return res
	}
	return list
}

/**
 * Gets optional type metadata for a declaration.
 *
 * @param node The declaration node.
 */
func (tx *MetadataTransformer) getTypeMetadata(node *ast.Node, container *ast.Node) []*ast.Node {
	// Decorator metadata is not yet supported for ES decorators.
	if !tx.legacyDecorators {
		return nil
	}
	if USE_NEW_TYPE_METADATA_FORMAT {
		return tx.getNewTypeMetadata(node, container)
	}
	return tx.getOldTypeMetadata(node, container)
}

func (tx *MetadataTransformer) getOldTypeMetadata(node *ast.Node, container *ast.Node) []*ast.Node {
	var decorators []*ast.Node
	if tx.shouldAddTypeMetadata(node) {
		typeMetadata := tx.Factory().NewMetadataHelper("design:type", tx.serializer.SerializeTypeOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node, container))
		decorators = append(decorators, tx.Factory().NewDecorator(typeMetadata))
	}
	if tx.shouldAddParamTypesMetadata(node) {
		paramTypesMetadata := tx.Factory().NewMetadataHelper("design:paramtypes", tx.serializer.SerializeParameterTypesOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node, container))
		decorators = append(decorators, tx.Factory().NewDecorator(paramTypesMetadata))
	}
	if tx.shouldAddReturnTypeMetadata(node) {
		returnTypeMetadata := tx.Factory().NewMetadataHelper("design:returntype", tx.serializer.SerializeReturnTypeOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node))
		decorators = append(decorators, tx.Factory().NewDecorator(returnTypeMetadata))
	}
	return decorators
}

func (tx *MetadataTransformer) getNewTypeMetadata(node *ast.Node, container *ast.Node) []*ast.Node {
	var properties []*ast.Node
	if tx.shouldAddTypeMetadata(node) {
		properties = append(properties, tx.Factory().NewPropertyAssignment(
			nil,
			tx.Factory().NewIdentifier("type"),
			nil,
			nil,
			tx.Factory().NewArrowFunction(
				nil,
				nil,
				tx.Factory().NewNodeList([]*ast.Node{}),
				nil,
				nil,
				tx.Factory().NewToken(ast.KindEqualsGreaterThanToken),
				tx.serializer.SerializeTypeOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node, container),
			),
		))
	}
	if tx.shouldAddParamTypesMetadata(node) {
		properties = append(properties, tx.Factory().NewPropertyAssignment(
			nil,
			tx.Factory().NewIdentifier("paramTypes"),
			nil,
			nil,
			tx.Factory().NewArrowFunction(
				nil,
				nil,
				tx.Factory().NewNodeList([]*ast.Node{}),
				nil,
				nil,
				tx.Factory().NewToken(ast.KindEqualsGreaterThanToken),
				tx.serializer.SerializeParameterTypesOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node, container),
			),
		))
	}
	if tx.shouldAddReturnTypeMetadata(node) {
		properties = append(properties, tx.Factory().NewPropertyAssignment(
			nil,
			tx.Factory().NewIdentifier("returnType"),
			nil,
			nil,
			tx.Factory().NewArrowFunction(
				nil,
				nil,
				tx.Factory().NewNodeList([]*ast.Node{}),
				nil,
				nil,
				tx.Factory().NewToken(ast.KindEqualsGreaterThanToken),
				tx.serializer.SerializeReturnTypeOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node),
			),
		))
	}
	if len(properties) > 0 {
		typeInfoMetadata := tx.Factory().NewMetadataHelper("design:typeinfo", tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList(properties), true))
		return []*ast.Node{tx.Factory().NewDecorator(typeInfoMetadata)}
	}
	return nil
}

/**
* Determines whether to emit the "design:type" metadata based on the node's kind.
* The caller should have already tested whether the node has decorators and whether the
* emitDecoratorMetadata compiler option is set.
*
* @param node The node to test.
 */
func (tx *MetadataTransformer) shouldAddTypeMetadata(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindPropertyDeclaration:
		return true
	}
	return false
}

/**
* Determines whether to emit the "design:returntype" metadata based on the node's kind.
* The caller should have already tested whether the node has decorators and whether the
* emitDecoratorMetadata compiler option is set.
*
* @param node The node to test.
 */
func (tx *MetadataTransformer) shouldAddReturnTypeMetadata(node *ast.Node) bool {
	return node.Kind == ast.KindMethodDeclaration
}

/**
* Determines whether to emit the "design:paramtypes" metadata based on the node's kind.
* The caller should have already tested whether the node has decorators and whether the
* emitDecoratorMetadata compiler option is set.
*
* @param node The node to test.
 */
func (tx *MetadataTransformer) shouldAddParamTypesMetadata(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindClassDeclaration, ast.KindClassExpression:
		return ast.GetFirstConstructorWithBody(node) != nil
	case ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor:
		return true
	}
	return false
}
