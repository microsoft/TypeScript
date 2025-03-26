package transformers

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
)

type TypeEraserTransformer struct {
	Transformer
	compilerOptions *core.CompilerOptions
	parentNode      *ast.Node
	currentNode     *ast.Node
}

func NewTypeEraserTransformer(emitContext *printer.EmitContext, compilerOptions *core.CompilerOptions) *Transformer {
	tx := &TypeEraserTransformer{compilerOptions: compilerOptions}
	return tx.newTransformer(tx.visit, emitContext)
}

// Pushes a new child node onto the ancestor tracking stack, returning the grandparent node to be restored later via `popNode`.
func (tx *TypeEraserTransformer) pushNode(node *ast.Node) (grandparentNode *ast.Node) {
	grandparentNode = tx.parentNode
	tx.parentNode = tx.currentNode
	tx.currentNode = node
	return
}

// Pops the last child node off the ancestor tracking stack, restoring the grandparent node.
func (tx *TypeEraserTransformer) popNode(grandparentNode *ast.Node) {
	tx.currentNode = tx.parentNode
	tx.parentNode = grandparentNode
}

func (tx *TypeEraserTransformer) elide(node *ast.Statement) *ast.Statement {
	statement := tx.factory.NewNotEmittedStatement()
	tx.emitContext.SetOriginal(statement, node)
	statement.Loc = node.Loc
	return statement
}

func (tx *TypeEraserTransformer) visit(node *ast.Node) *ast.Node {
	if node.SubtreeFacts()&ast.SubtreeContainsTypeScript == 0 {
		return node
	}

	if ast.IsStatement(node) && ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient) {
		return tx.elide(node)
	}

	grandparentNode := tx.pushNode(node)
	defer tx.popNode(grandparentNode)

	switch node.Kind {
	case
		// TypeScript accessibility and readonly modifiers are elided
		ast.KindPublicKeyword,
		ast.KindPrivateKeyword,
		ast.KindProtectedKeyword,
		ast.KindAbstractKeyword,
		ast.KindOverrideKeyword,
		ast.KindConstKeyword,
		ast.KindDeclareKeyword,
		ast.KindReadonlyKeyword,
		// TypeScript type nodes are elided.
		ast.KindArrayType,
		ast.KindTupleType,
		ast.KindOptionalType,
		ast.KindRestType,
		ast.KindTypeLiteral,
		ast.KindTypePredicate,
		ast.KindTypeParameter,
		ast.KindAnyKeyword,
		ast.KindUnknownKeyword,
		ast.KindBooleanKeyword,
		ast.KindStringKeyword,
		ast.KindNumberKeyword,
		ast.KindNeverKeyword,
		ast.KindVoidKeyword,
		ast.KindSymbolKeyword,
		ast.KindConstructorType,
		ast.KindFunctionType,
		ast.KindTypeQuery,
		ast.KindTypeReference,
		ast.KindUnionType,
		ast.KindIntersectionType,
		ast.KindConditionalType,
		ast.KindParenthesizedType,
		ast.KindThisType,
		ast.KindTypeOperator,
		ast.KindIndexedAccessType,
		ast.KindMappedType,
		ast.KindLiteralType,
		// TypeScript index signatures are elided.
		ast.KindIndexSignature:
		return nil

	case ast.KindTypeAliasDeclaration,
		ast.KindInterfaceDeclaration:
		// TypeScript type-only declarations are elided.
		return tx.elide(node)

	case ast.KindNamespaceExportDeclaration:
		// TypeScript namespace export declarations are elided.
		return nil

	case ast.KindModuleDeclaration:
		if !ast.IsIdentifier(node.Name()) ||
			!isInstantiatedModule(node, tx.compilerOptions.ShouldPreserveConstEnums()) ||
			getInnermostModuleDeclarationFromDottedModule(node.AsModuleDeclaration()).Body == nil {
			// TypeScript module declarations are elided if they are not instantiated or have no body
			return tx.elide(node)
		}
		return tx.visitor.VisitEachChild(node)

	case ast.KindExpressionWithTypeArguments:
		n := node.AsExpressionWithTypeArguments()
		return tx.factory.UpdateExpressionWithTypeArguments(n, tx.visitor.VisitNode(n.Expression), nil)

	case ast.KindPropertyDeclaration:
		if ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient) {
			// TypeScript `declare` fields are elided
			return nil
		}
		n := node.AsPropertyDeclaration()
		return tx.factory.UpdatePropertyDeclaration(n, tx.visitor.VisitModifiers(n.Modifiers()), tx.visitor.VisitNode(n.Name()), nil, nil, tx.visitor.VisitNode(n.Initializer))

	case ast.KindConstructor:
		n := node.AsConstructorDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return tx.factory.UpdateConstructorDeclaration(n, nil, nil, tx.visitor.VisitNodes(n.Parameters), nil, tx.visitor.VisitNode(n.Body))

	case ast.KindMethodDeclaration:
		n := node.AsMethodDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return tx.factory.UpdateMethodDeclaration(n, tx.visitor.VisitModifiers(n.Modifiers()), n.AsteriskToken, tx.visitor.VisitNode(n.Name()), nil, nil, tx.visitor.VisitNodes(n.Parameters), nil, tx.visitor.VisitNode(n.Body))

	case ast.KindGetAccessor:
		n := node.AsGetAccessorDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return tx.factory.UpdateGetAccessorDeclaration(n, tx.visitor.VisitModifiers(n.Modifiers()), tx.visitor.VisitNode(n.Name()), nil, tx.visitor.VisitNodes(n.Parameters), nil, tx.visitor.VisitNode(n.Body))

	case ast.KindSetAccessor:
		n := node.AsSetAccessorDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return tx.factory.UpdateSetAccessorDeclaration(n, tx.visitor.VisitModifiers(n.Modifiers()), tx.visitor.VisitNode(n.Name()), nil, tx.visitor.VisitNodes(n.Parameters), nil, tx.visitor.VisitNode(n.Body))

	case ast.KindVariableDeclaration:
		n := node.AsVariableDeclaration()
		return tx.factory.UpdateVariableDeclaration(n, tx.visitor.VisitNode(n.Name()), nil, nil, tx.visitor.VisitNode(n.Initializer))

	case ast.KindHeritageClause:
		n := node.AsHeritageClause()
		if n.Token == ast.KindImplementsKeyword {
			// TypeScript `implements` clauses are elided
			return nil
		}
		return tx.factory.UpdateHeritageClause(n, tx.visitor.VisitNodes(n.Types))

	case ast.KindClassDeclaration:
		n := node.AsClassDeclaration()
		return tx.factory.UpdateClassDeclaration(n, tx.visitor.VisitModifiers(n.Modifiers()), tx.visitor.VisitNode(n.Name()), nil, tx.visitor.VisitNodes(n.HeritageClauses), tx.visitor.VisitNodes(n.Members))

	case ast.KindClassExpression:
		n := node.AsClassExpression()
		return tx.factory.UpdateClassExpression(n, tx.visitor.VisitModifiers(n.Modifiers()), tx.visitor.VisitNode(n.Name()), nil, tx.visitor.VisitNodes(n.HeritageClauses), tx.visitor.VisitNodes(n.Members))

	case ast.KindFunctionDeclaration:
		n := node.AsFunctionDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return tx.elide(node)
		}
		return tx.factory.UpdateFunctionDeclaration(n, tx.visitor.VisitModifiers(n.Modifiers()), n.AsteriskToken, tx.visitor.VisitNode(n.Name()), nil, tx.visitor.VisitNodes(n.Parameters), nil, tx.visitor.VisitNode(n.Body))

	case ast.KindFunctionExpression:
		n := node.AsFunctionExpression()
		return tx.factory.UpdateFunctionExpression(n, tx.visitor.VisitModifiers(n.Modifiers()), n.AsteriskToken, tx.visitor.VisitNode(n.Name()), nil, tx.visitor.VisitNodes(n.Parameters), nil, tx.visitor.VisitNode(n.Body))

	case ast.KindArrowFunction:
		n := node.AsArrowFunction()
		return tx.factory.UpdateArrowFunction(n, tx.visitor.VisitModifiers(n.Modifiers()), nil, tx.visitor.VisitNodes(n.Parameters), nil, n.EqualsGreaterThanToken, tx.visitor.VisitNode(n.Body))

	case ast.KindParameter:
		if ast.IsThisParameter(node) {
			// TypeScript `this` parameters are elided
			return nil
		}
		n := node.AsParameterDeclaration()
		// preserve parameter property modifiers to be handled by the runtime transformer
		var modifiers *ast.ModifierList
		if ast.IsParameterPropertyDeclaration(node, tx.parentNode) {
			modifiers = extractModifiers(tx.emitContext, n.Modifiers(), ast.ModifierFlagsParameterPropertyModifier)
		}
		return tx.factory.UpdateParameterDeclaration(n, modifiers, n.DotDotDotToken, tx.visitor.VisitNode(n.Name()), nil, nil, tx.visitor.VisitNode(n.Initializer))

	case ast.KindCallExpression:
		n := node.AsCallExpression()
		return tx.factory.UpdateCallExpression(n, tx.visitor.VisitNode(n.Expression), n.QuestionDotToken, nil, tx.visitor.VisitNodes(n.Arguments))

	case ast.KindNewExpression:
		n := node.AsNewExpression()
		return tx.factory.UpdateNewExpression(n, tx.visitor.VisitNode(n.Expression), nil, tx.visitor.VisitNodes(n.Arguments))

	case ast.KindTaggedTemplateExpression:
		n := node.AsTaggedTemplateExpression()
		return tx.factory.UpdateTaggedTemplateExpression(n, tx.visitor.VisitNode(n.Tag), n.QuestionDotToken, nil, tx.visitor.VisitNode(n.Template))

	case ast.KindNonNullExpression, ast.KindTypeAssertionExpression, ast.KindAsExpression, ast.KindSatisfiesExpression:
		partial := tx.factory.NewPartiallyEmittedExpression(tx.visitor.VisitNode(node.Expression()))
		tx.emitContext.SetOriginal(partial, node)
		partial.Loc = node.Loc
		return partial

	case ast.KindParenthesizedExpression:
		n := node.AsParenthesizedExpression()
		expression := ast.SkipOuterExpressions(n.Expression, ^(ast.OEKTypeAssertions | ast.OEKExpressionsWithTypeArguments))
		if ast.IsAssertionExpression(expression) || ast.IsSatisfiesExpression(expression) {
			partial := tx.factory.NewPartiallyEmittedExpression(tx.visitor.VisitNode(n.Expression))
			tx.emitContext.SetOriginal(partial, node)
			partial.Loc = node.Loc
			return partial
		}
		return tx.visitor.VisitEachChild(node)

	case ast.KindJsxSelfClosingElement:
		n := node.AsJsxSelfClosingElement()
		return tx.factory.UpdateJsxSelfClosingElement(n, tx.visitor.VisitNode(n.TagName), nil, tx.visitor.VisitNode(n.Attributes))

	case ast.KindJsxOpeningElement:
		n := node.AsJsxOpeningElement()
		return tx.factory.UpdateJsxOpeningElement(n, tx.visitor.VisitNode(n.TagName), nil, tx.visitor.VisitNode(n.Attributes))

	case ast.KindImportEqualsDeclaration:
		n := node.AsImportEqualsDeclaration()
		if n.IsTypeOnly {
			// elide type-only imports
			return nil
		}
		return tx.visitor.VisitEachChild(node)

	case ast.KindImportDeclaration:
		n := node.AsImportDeclaration()
		if n.ImportClause == nil {
			// Do not elide a side-effect only import declaration.
			//  import "foo";
			return node
		}
		importClause := tx.visitor.VisitNode(n.ImportClause)
		if importClause == nil {
			return nil
		}
		return tx.factory.UpdateImportDeclaration(n, n.Modifiers(), importClause, n.ModuleSpecifier, n.Attributes)

	case ast.KindImportClause:
		n := node.AsImportClause()
		if n.IsTypeOnly {
			// Always elide type-only imports
			return nil
		}
		name := n.Name()
		namedBindings := tx.visitor.VisitNode(n.NamedBindings)
		if name == nil && namedBindings == nil {
			// all import bindings were elided
			return nil
		}
		return tx.factory.UpdateImportClause(n, false /*isTypeOnly*/, name, namedBindings)

	case ast.KindNamedImports:
		n := node.AsNamedImports()
		if len(n.Elements.Nodes) == 0 {
			// Do not elide a side-effect only import declaration.
			return node
		}
		elements := tx.visitor.VisitNodes(n.Elements)
		if !tx.compilerOptions.VerbatimModuleSyntax.IsTrue() && len(elements.Nodes) == 0 {
			// all import specifiers were elided
			return nil
		}
		return tx.factory.UpdateNamedImports(n, elements)

	case ast.KindImportSpecifier:
		n := node.AsImportSpecifier()
		if n.IsTypeOnly {
			// elide type-only or unused imports
			return nil
		}
		return node

	case ast.KindExportDeclaration:
		n := node.AsExportDeclaration()
		if n.IsTypeOnly {
			// elide type-only exports
			return nil
		}
		var exportClause *ast.Node
		if n.ExportClause != nil {
			exportClause = tx.visitor.VisitNode(n.ExportClause)
			if exportClause == nil {
				// all export bindings were elided
				return nil
			}
		}
		return tx.factory.UpdateExportDeclaration(n, nil /*modifiers*/, false /*isTypeOnly*/, exportClause, tx.visitor.VisitNode(n.ModuleSpecifier), tx.visitor.VisitNode(n.Attributes))

	case ast.KindNamedExports:
		n := node.AsNamedExports()
		if len(n.Elements.Nodes) == 0 {
			// Do not elide an empty export declaration.
			return node
		}

		elements := tx.visitor.VisitNodes(n.Elements)
		if !tx.compilerOptions.VerbatimModuleSyntax.IsTrue() && len(elements.Nodes) == 0 {
			// all export specifiers were elided
			return nil
		}
		return tx.factory.UpdateNamedExports(n, elements)

	case ast.KindExportSpecifier:
		n := node.AsExportSpecifier()
		if n.IsTypeOnly {
			// elide unused export
			return nil
		}
		return node

	default:
		return tx.visitor.VisitEachChild(node)
	}
}
