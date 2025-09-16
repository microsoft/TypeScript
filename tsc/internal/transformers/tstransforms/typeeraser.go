package tstransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type TypeEraserTransformer struct {
	transformers.Transformer
	compilerOptions *core.CompilerOptions
	parentNode      *ast.Node
	currentNode     *ast.Node
}

func NewTypeEraserTransformer(opt *transformers.TransformOptions) *transformers.Transformer {
	compilerOptions := opt.CompilerOptions
	emitContext := opt.Context
	tx := &TypeEraserTransformer{compilerOptions: compilerOptions}
	return tx.NewTransformer(tx.visit, emitContext)
}

// Pushes a new child node onto the ancestor tracking stack, returning the grandparent node to be restored later via `popNode`.
func (tx *TypeEraserTransformer) pushNode(node *ast.Node) (grandparentNode *ast.Node) {
	grandparentNode = tx.parentNode
	tx.parentNode = tx.currentNode
	tx.currentNode = node
	return grandparentNode
}

// Pops the last child node off the ancestor tracking stack, restoring the grandparent node.
func (tx *TypeEraserTransformer) popNode(grandparentNode *ast.Node) {
	tx.currentNode = tx.parentNode
	tx.parentNode = grandparentNode
}

func (tx *TypeEraserTransformer) elide(node *ast.Statement) *ast.Statement {
	return tx.EmitContext().NewNotEmittedStatement(node.AsNode())
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

	case ast.KindJSExportAssignment, ast.KindJSImportDeclaration:
		// reparsed commonjs are elided
		return nil
	case ast.KindTypeAliasDeclaration,
		ast.KindJSTypeAliasDeclaration,
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
		return tx.Visitor().VisitEachChild(node)

	case ast.KindExpressionWithTypeArguments:
		n := node.AsExpressionWithTypeArguments()
		return tx.Factory().UpdateExpressionWithTypeArguments(n, tx.Visitor().VisitNode(n.Expression), nil)

	case ast.KindPropertyDeclaration:
		if ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient) {
			// TypeScript `declare` fields are elided
			return nil
		}
		n := node.AsPropertyDeclaration()
		return tx.Factory().UpdatePropertyDeclaration(n, tx.Visitor().VisitModifiers(n.Modifiers()), tx.Visitor().VisitNode(n.Name()), nil, nil, tx.Visitor().VisitNode(n.Initializer))

	case ast.KindConstructor:
		n := node.AsConstructorDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return tx.Factory().UpdateConstructorDeclaration(n, nil, nil, tx.Visitor().VisitNodes(n.Parameters), nil, nil, tx.Visitor().VisitNode(n.Body))

	case ast.KindMethodDeclaration:
		n := node.AsMethodDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return tx.Factory().UpdateMethodDeclaration(n, tx.Visitor().VisitModifiers(n.Modifiers()), n.AsteriskToken, tx.Visitor().VisitNode(n.Name()), nil, nil, tx.Visitor().VisitNodes(n.Parameters), nil, nil, tx.Visitor().VisitNode(n.Body))

	case ast.KindGetAccessor:
		n := node.AsGetAccessorDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return tx.Factory().UpdateGetAccessorDeclaration(n, tx.Visitor().VisitModifiers(n.Modifiers()), tx.Visitor().VisitNode(n.Name()), nil, tx.Visitor().VisitNodes(n.Parameters), nil, nil, tx.Visitor().VisitNode(n.Body))

	case ast.KindSetAccessor:
		n := node.AsSetAccessorDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return tx.Factory().UpdateSetAccessorDeclaration(n, tx.Visitor().VisitModifiers(n.Modifiers()), tx.Visitor().VisitNode(n.Name()), nil, tx.Visitor().VisitNodes(n.Parameters), nil, nil, tx.Visitor().VisitNode(n.Body))

	case ast.KindVariableDeclaration:
		n := node.AsVariableDeclaration()
		return tx.Factory().UpdateVariableDeclaration(n, tx.Visitor().VisitNode(n.Name()), nil, nil, tx.Visitor().VisitNode(n.Initializer))

	case ast.KindHeritageClause:
		n := node.AsHeritageClause()
		if n.Token == ast.KindImplementsKeyword {
			// TypeScript `implements` clauses are elided
			return nil
		}
		return tx.Factory().UpdateHeritageClause(n, tx.Visitor().VisitNodes(n.Types))

	case ast.KindClassDeclaration:
		n := node.AsClassDeclaration()
		return tx.Factory().UpdateClassDeclaration(n, tx.Visitor().VisitModifiers(n.Modifiers()), tx.Visitor().VisitNode(n.Name()), nil, tx.Visitor().VisitNodes(n.HeritageClauses), tx.Visitor().VisitNodes(n.Members))

	case ast.KindClassExpression:
		n := node.AsClassExpression()
		return tx.Factory().UpdateClassExpression(n, tx.Visitor().VisitModifiers(n.Modifiers()), tx.Visitor().VisitNode(n.Name()), nil, tx.Visitor().VisitNodes(n.HeritageClauses), tx.Visitor().VisitNodes(n.Members))

	case ast.KindFunctionDeclaration:
		n := node.AsFunctionDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return tx.elide(node)
		}
		return tx.Factory().UpdateFunctionDeclaration(n, tx.Visitor().VisitModifiers(n.Modifiers()), n.AsteriskToken, tx.Visitor().VisitNode(n.Name()), nil, tx.Visitor().VisitNodes(n.Parameters), nil, nil, tx.Visitor().VisitNode(n.Body))

	case ast.KindFunctionExpression:
		n := node.AsFunctionExpression()
		return tx.Factory().UpdateFunctionExpression(n, tx.Visitor().VisitModifiers(n.Modifiers()), n.AsteriskToken, tx.Visitor().VisitNode(n.Name()), nil, tx.Visitor().VisitNodes(n.Parameters), nil, nil, tx.Visitor().VisitNode(n.Body))

	case ast.KindArrowFunction:
		n := node.AsArrowFunction()
		return tx.Factory().UpdateArrowFunction(n, tx.Visitor().VisitModifiers(n.Modifiers()), nil, tx.Visitor().VisitNodes(n.Parameters), nil, nil, n.EqualsGreaterThanToken, tx.Visitor().VisitNode(n.Body))

	case ast.KindParameter:
		if ast.IsThisParameter(node) {
			// TypeScript `this` parameters are elided
			return nil
		}
		n := node.AsParameterDeclaration()
		// preserve parameter property modifiers to be handled by the runtime transformer
		var modifiers *ast.ModifierList
		if ast.IsParameterPropertyDeclaration(node, tx.parentNode) {
			modifiers = transformers.ExtractModifiers(tx.EmitContext(), n.Modifiers(), ast.ModifierFlagsParameterPropertyModifier)
		}
		return tx.Factory().UpdateParameterDeclaration(n, modifiers, n.DotDotDotToken, tx.Visitor().VisitNode(n.Name()), nil, nil, tx.Visitor().VisitNode(n.Initializer))

	case ast.KindCallExpression:
		n := node.AsCallExpression()
		return tx.Factory().UpdateCallExpression(n, tx.Visitor().VisitNode(n.Expression), n.QuestionDotToken, nil, tx.Visitor().VisitNodes(n.Arguments))

	case ast.KindNewExpression:
		n := node.AsNewExpression()
		return tx.Factory().UpdateNewExpression(n, tx.Visitor().VisitNode(n.Expression), nil, tx.Visitor().VisitNodes(n.Arguments))

	case ast.KindTaggedTemplateExpression:
		n := node.AsTaggedTemplateExpression()
		return tx.Factory().UpdateTaggedTemplateExpression(n, tx.Visitor().VisitNode(n.Tag), n.QuestionDotToken, nil, tx.Visitor().VisitNode(n.Template))

	case ast.KindNonNullExpression, ast.KindTypeAssertionExpression, ast.KindAsExpression, ast.KindSatisfiesExpression:
		partial := tx.Factory().NewPartiallyEmittedExpression(tx.Visitor().VisitNode(node.Expression()))
		tx.EmitContext().SetOriginal(partial, node)
		partial.Loc = node.Loc
		return partial

	case ast.KindParenthesizedExpression:
		n := node.AsParenthesizedExpression()
		expression := ast.SkipOuterExpressions(n.Expression, ^(ast.OEKAssertions | ast.OEKExpressionsWithTypeArguments))
		if ast.IsAssertionExpression(expression) || ast.IsSatisfiesExpression(expression) {
			partial := tx.Factory().NewPartiallyEmittedExpression(tx.Visitor().VisitNode(n.Expression))
			tx.EmitContext().SetOriginal(partial, node)
			partial.Loc = node.Loc
			return partial
		}
		return tx.Visitor().VisitEachChild(node)

	case ast.KindJsxSelfClosingElement:
		n := node.AsJsxSelfClosingElement()
		return tx.Factory().UpdateJsxSelfClosingElement(n, tx.Visitor().VisitNode(n.TagName), nil, tx.Visitor().VisitNode(n.Attributes))

	case ast.KindJsxOpeningElement:
		n := node.AsJsxOpeningElement()
		return tx.Factory().UpdateJsxOpeningElement(n, tx.Visitor().VisitNode(n.TagName), nil, tx.Visitor().VisitNode(n.Attributes))

	case ast.KindImportEqualsDeclaration:
		n := node.AsImportEqualsDeclaration()
		if n.IsTypeOnly {
			// elide type-only imports
			return nil
		}
		return tx.Visitor().VisitEachChild(node)

	case ast.KindImportDeclaration:
		n := node.AsImportDeclaration()
		if n.ImportClause == nil {
			// Do not elide a side-effect only import declaration.
			//  import "foo";
			return node
		}
		importClause := tx.Visitor().VisitNode(n.ImportClause)
		if importClause == nil {
			return nil
		}
		return tx.Factory().UpdateImportDeclaration(n, n.Modifiers(), importClause, n.ModuleSpecifier, n.Attributes)

	case ast.KindImportClause:
		n := node.AsImportClause()
		if n.IsTypeOnly {
			// Always elide type-only imports
			return nil
		}
		name := n.Name()
		namedBindings := tx.Visitor().VisitNode(n.NamedBindings)
		if name == nil && namedBindings == nil {
			// all import bindings were elided
			return nil
		}
		return tx.Factory().UpdateImportClause(n, false /*isTypeOnly*/, name, namedBindings)

	case ast.KindNamedImports:
		n := node.AsNamedImports()
		if len(n.Elements.Nodes) == 0 {
			// Do not elide a side-effect only import declaration.
			return node
		}
		elements := tx.Visitor().VisitNodes(n.Elements)
		if !tx.compilerOptions.VerbatimModuleSyntax.IsTrue() && len(elements.Nodes) == 0 {
			// all import specifiers were elided
			return nil
		}
		return tx.Factory().UpdateNamedImports(n, elements)

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
			exportClause = tx.Visitor().VisitNode(n.ExportClause)
			if exportClause == nil {
				// all export bindings were elided
				return nil
			}
		}
		return tx.Factory().UpdateExportDeclaration(n, nil /*modifiers*/, false /*isTypeOnly*/, exportClause, tx.Visitor().VisitNode(n.ModuleSpecifier), tx.Visitor().VisitNode(n.Attributes))

	case ast.KindNamedExports:
		n := node.AsNamedExports()
		if len(n.Elements.Nodes) == 0 {
			// Do not elide an empty export declaration.
			return node
		}

		elements := tx.Visitor().VisitNodes(n.Elements)
		if !tx.compilerOptions.VerbatimModuleSyntax.IsTrue() && len(elements.Nodes) == 0 {
			// all export specifiers were elided
			return nil
		}
		return tx.Factory().UpdateNamedExports(n, elements)

	case ast.KindExportSpecifier:
		n := node.AsExportSpecifier()
		if n.IsTypeOnly {
			// elide unused export
			return nil
		}
		return node

	case ast.KindEnumDeclaration:
		if ast.IsEnumConst(node) {
			return node
		}
		return tx.Visitor().VisitEachChild(node)

	default:
		return tx.Visitor().VisitEachChild(node)
	}
}
