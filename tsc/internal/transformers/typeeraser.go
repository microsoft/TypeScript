package transformers

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
)

type TypeEraserTransformer struct {
	Transformer
	compilerOptions *core.CompilerOptions
}

func NewTypeEraserTransformer(emitContext *printer.EmitContext, compilerOptions *core.CompilerOptions) *Transformer {
	tx := &TypeEraserTransformer{compilerOptions: compilerOptions}
	return tx.newTransformer(tx.visit, emitContext)
}

func (tx *TypeEraserTransformer) visit(node *ast.Node) *ast.Node {
	// !!! TransformFlags were traditionally used here to skip over subtrees that contain no TypeScript syntax
	if ast.IsStatement(node) && ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient) {
		// !!! Use NotEmittedStatement to preserve comments
		return nil
	}

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
		ast.KindInterfaceDeclaration,
		ast.KindNamespaceExportDeclaration:
		// TypeScript type-only declarations are elided.
		// !!! Use NotEmittedStatement to preserve comments
		return nil

	case ast.KindModuleDeclaration:
		if !ast.IsIdentifier(node.Name()) ||
			!isInstantiatedModule(node, tx.compilerOptions.ShouldPreserveConstEnums()) ||
			getInnermostModuleDeclarationFromDottedModule(node.AsModuleDeclaration()).Body == nil {
			// TypeScript module declarations are elided if they are not instantiated or have no body
			return nil
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
			return nil
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
		return tx.factory.UpdateParameterDeclaration(n, nil, n.DotDotDotToken, tx.visitor.VisitNode(n.Name()), nil, nil, tx.visitor.VisitNode(n.Initializer))

	case ast.KindCallExpression:
		n := node.AsCallExpression()
		return tx.factory.UpdateCallExpression(n, tx.visitor.VisitNode(n.Expression), n.QuestionDotToken, nil, tx.visitor.VisitNodes(n.Arguments))

	case ast.KindNewExpression:
		n := node.AsNewExpression()
		return tx.factory.UpdateNewExpression(n, tx.visitor.VisitNode(n.Expression), nil, tx.visitor.VisitNodes(n.Arguments))

	case ast.KindTaggedTemplateExpression:
		n := node.AsTaggedTemplateExpression()
		return tx.factory.UpdateTaggedTemplateExpression(n, tx.visitor.VisitNode(n.Tag), n.QuestionDotToken, nil, tx.visitor.VisitNode(n.Template))

	case ast.KindNonNullExpression:
		// !!! Use PartiallyEmittedExpression to preserve comments
		return tx.visitor.VisitNode(node.AsNonNullExpression().Expression)

	case ast.KindTypeAssertionExpression:
		// !!! Use PartiallyEmittedExpression to preserve comments
		return tx.visitor.VisitNode(node.AsTypeAssertion().Expression)

	case ast.KindAsExpression:
		// !!! Use PartiallyEmittedExpression to preserve comments
		return tx.visitor.VisitNode(node.AsAsExpression().Expression)

	case ast.KindSatisfiesExpression:
		// !!! Use PartiallyEmittedExpression to preserve comments
		return tx.visitor.VisitNode(node.AsSatisfiesExpression().Expression)

	case ast.KindJsxSelfClosingElement:
		n := node.AsJsxSelfClosingElement()
		return tx.factory.UpdateJsxSelfClosingElement(n, tx.visitor.VisitNode(n.TagName), nil, tx.visitor.VisitNode(n.Attributes))

	case ast.KindJsxOpeningElement:
		n := node.AsJsxOpeningElement()
		return tx.factory.UpdateJsxOpeningElement(n, tx.visitor.VisitNode(n.TagName), nil, tx.visitor.VisitNode(n.Attributes))

	default:
		return tx.visitor.VisitEachChild(node)
	}
}
