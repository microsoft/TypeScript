package transformers

import (
	"github.com/microsoft/typescript-go/internal/ast"
)

type TypeEraserTransformer struct {
	ast.NodeVisitor
}

func NewTypeEraserTransformer() *TypeEraserTransformer {
	visitor := &TypeEraserTransformer{}
	visitor.Visit = visitor.visit
	return visitor
}

func (v *TypeEraserTransformer) visit(node *ast.Node) *ast.Node {
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
		ast.KindInKeyword,
		ast.KindOutKeyword,
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

	case ast.KindExpressionWithTypeArguments:
		n := node.AsExpressionWithTypeArguments()
		return v.Factory.UpdateExpressionWithTypeArguments(n, v.VisitNode(n.Expression), nil)

	case ast.KindPropertyDeclaration:
		if ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient) {
			// TypeScript `declare` fields are elided
			return nil
		}
		n := node.AsPropertyDeclaration()
		return v.Factory.UpdatePropertyDeclaration(n, v.VisitModifiers(n.Modifiers()), v.VisitNode(n.Name()), nil, nil, v.VisitNode(n.Initializer))

	case ast.KindConstructor:
		n := node.AsConstructorDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return v.Factory.UpdateConstructorDeclaration(n, nil, nil, v.VisitNodes(n.Parameters), nil, v.VisitNode(n.Body))

	case ast.KindMethodDeclaration:
		n := node.AsMethodDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return v.Factory.UpdateMethodDeclaration(n, v.VisitModifiers(n.Modifiers()), v.VisitToken(n.AsteriskToken), v.VisitNode(n.Name()), nil, nil, v.VisitNodes(n.Parameters), nil, v.VisitNode(n.Body))

	case ast.KindGetAccessor:
		n := node.AsGetAccessorDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return v.Factory.UpdateGetAccessorDeclaration(n, v.VisitModifiers(n.Modifiers()), v.VisitNode(n.Name()), nil, v.VisitNodes(n.Parameters), nil, v.VisitNode(n.Body))

	case ast.KindSetAccessor:
		n := node.AsSetAccessorDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return v.Factory.UpdateSetAccessorDeclaration(n, v.VisitModifiers(n.Modifiers()), v.VisitNode(n.Name()), nil, v.VisitNodes(n.Parameters), nil, v.VisitNode(n.Body))

	case ast.KindVariableDeclaration:
		n := node.AsVariableDeclaration()
		return v.Factory.UpdateVariableDeclaration(n, v.VisitNode(n.Name()), nil, nil, v.VisitNode(n.Initializer))

	case ast.KindHeritageClause:
		n := node.AsHeritageClause()
		if n.Token == ast.KindImplementsKeyword {
			// TypeScript `implements` clauses are elided
			return nil
		}
		return v.Factory.UpdateHeritageClause(n, v.VisitNodes(n.Types))

	case ast.KindClassDeclaration:
		n := node.AsClassDeclaration()
		return v.Factory.UpdateClassDeclaration(n, v.VisitModifiers(n.Modifiers()), v.VisitNode(n.Name()), nil, v.VisitNodes(n.HeritageClauses), v.VisitNodes(n.Members))

	case ast.KindClassExpression:
		n := node.AsClassExpression()
		return v.Factory.UpdateClassExpression(n, v.VisitModifiers(n.Modifiers()), v.VisitNode(n.Name()), nil, v.VisitNodes(n.HeritageClauses), v.VisitNodes(n.Members))

	case ast.KindFunctionDeclaration:
		n := node.AsFunctionDeclaration()
		if n.Body == nil {
			// TypeScript overloads are elided
			return nil
		}
		return v.Factory.UpdateFunctionDeclaration(n, v.VisitModifiers(n.Modifiers()), v.VisitToken(n.AsteriskToken), v.VisitNode(n.Name()), nil, v.VisitNodes(n.Parameters), nil, v.VisitNode(n.Body))

	case ast.KindFunctionExpression:
		n := node.AsFunctionExpression()
		return v.Factory.UpdateFunctionExpression(n, v.VisitModifiers(n.Modifiers()), v.VisitToken(n.AsteriskToken), v.VisitNode(n.Name()), nil, v.VisitNodes(n.Parameters), nil, v.VisitNode(n.Body))

	case ast.KindArrowFunction:
		n := node.AsArrowFunction()
		return v.Factory.UpdateArrowFunction(n, v.VisitModifiers(n.Modifiers()), nil, v.VisitNodes(n.Parameters), nil, v.VisitToken(n.EqualsGreaterThanToken), v.VisitNode(n.Body))

	case ast.KindParameter:
		if ast.IsThisParameter(node) {
			// TypeScript `this` parameters are elided
			return nil
		}
		n := node.AsParameterDeclaration()
		return v.Factory.UpdateParameterDeclaration(n, nil, v.VisitToken(n.DotDotDotToken), v.VisitNode(n.Name()), nil, nil, v.VisitNode(n.Initializer))

	case ast.KindCallExpression:
		n := node.AsCallExpression()
		return v.Factory.UpdateCallExpression(n, v.VisitNode(n.Expression), v.VisitToken(n.QuestionDotToken), nil, v.VisitNodes(n.Arguments))

	case ast.KindNewExpression:
		n := node.AsNewExpression()
		return v.Factory.UpdateNewExpression(n, v.VisitNode(n.Expression), nil, v.VisitNodes(n.Arguments))

	case ast.KindTaggedTemplateExpression:
		n := node.AsTaggedTemplateExpression()
		return v.Factory.UpdateTaggedTemplateExpression(n, v.VisitNode(n.Tag), v.VisitToken(n.QuestionDotToken), nil, v.VisitNode(n.Template))

	case ast.KindNonNullExpression:
		// !!! Use PartiallyEmittedExpression to preserve comments
		return v.VisitNode(node.AsNonNullExpression().Expression)

	case ast.KindTypeAssertionExpression:
		// !!! Use PartiallyEmittedExpression to preserve comments
		return v.VisitNode(node.AsTypeAssertion().Expression)

	case ast.KindAsExpression:
		// !!! Use PartiallyEmittedExpression to preserve comments
		return v.VisitNode(node.AsAsExpression().Expression)

	case ast.KindSatisfiesExpression:
		// !!! Use PartiallyEmittedExpression to preserve comments
		return v.VisitNode(node.AsSatisfiesExpression().Expression)

	case ast.KindJsxSelfClosingElement:
		n := node.AsJsxSelfClosingElement()
		return v.Factory.UpdateJsxSelfClosingElement(n, v.VisitNode(n.TagName), nil, v.VisitNode(n.Attributes))

	case ast.KindJsxOpeningElement:
		n := node.AsJsxOpeningElement()
		return v.Factory.UpdateJsxOpeningElement(n, v.VisitNode(n.TagName), nil, v.VisitNode(n.Attributes))

	default:
		return v.VisitEachChild(node)
	}
}
