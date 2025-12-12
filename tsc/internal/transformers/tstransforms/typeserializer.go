package tstransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type metadataSerializer struct {
	resolver         printer.EmitResolver
	strictNullChecks bool
	f                *printer.NodeFactory
	ec               *printer.EmitContext
	c                metadataSerializerContext
}

type metadataSerializerContext struct {
	currentLexicalScope *ast.Node
	currentNameScope    *ast.Node
}

func newMetadataSerializer(resolver printer.EmitResolver, f *printer.NodeFactory, ec *printer.EmitContext, strictNullChecks bool) *metadataSerializer {
	return &metadataSerializer{resolver: resolver, f: f, ec: ec, strictNullChecks: strictNullChecks}
}

func (s *metadataSerializer) setContext(ctx metadataSerializerContext) {
	s.c = ctx
}

func (s *metadataSerializer) SerializeTypeOfNode(ctx metadataSerializerContext, node *ast.Node, container *ast.Node) *ast.Node {
	oldCtx := s.c
	s.c = ctx
	defer s.setContext(oldCtx)
	return s.serializeTypeOfNode(node, container)
}

func (s *metadataSerializer) SerializeParameterTypesOfNode(ctx metadataSerializerContext, node *ast.Node, container *ast.Node) *ast.Node {
	oldCtx := s.c
	s.c = ctx
	defer s.setContext(oldCtx)
	return s.serializeParameterTypesOfNode(node, container)
}

func (s *metadataSerializer) SerializeReturnTypeOfNode(ctx metadataSerializerContext, node *ast.Node) *ast.Node {
	oldCtx := s.c
	s.c = ctx
	defer s.setContext(oldCtx)
	return s.serializeReturnTypeOfNode(node)
}

func getSetAccessorValueParameter(node *ast.SetAccessorDeclaration) *ast.Node {
	if node != nil && len(node.Parameters.Nodes) > 0 {
		if len(node.Parameters.Nodes) >= 2 && ast.IsThisParameter(node.Parameters.Nodes[0]) {
			return node.Parameters.Nodes[1]
		}
		return node.Parameters.Nodes[0]
	}
	return nil
}

/**
 * Get the type annotation for the value parameter.
 *
 * @internal
 */
func getSetAccessorTypeAnnotationNode(node *ast.SetAccessorDeclaration) *ast.Node {
	p := getSetAccessorValueParameter(node)
	if p != nil && p.Type() != nil {
		return p.Type()
	}
	return nil
}

func getAccessorTypeNode(node *ast.Node, container *ast.Node) *ast.Node {
	accessors := ast.GetAllAccessorDeclarations(container.Members(), node)
	if accessors.SetAccessor != nil {
		return getSetAccessorTypeAnnotationNode(accessors.SetAccessor)
	}
	if accessors.GetAccessor != nil {
		return accessors.GetAccessor.Type
	}
	return nil
}

/**
* Serializes the type of a node for use with decorator type metadata.
* @param node The node that should have its type serialized.
 */
func (s *metadataSerializer) serializeTypeOfNode(node *ast.Node, container *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindPropertyDeclaration, ast.KindParameter:
		return s.serializeTypeNode(node.Type())
	case ast.KindGetAccessor, ast.KindSetAccessor:
		return s.serializeTypeNode(getAccessorTypeNode(node, container))
	case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindMethodDeclaration:
		return s.f.NewIdentifier("Function")
	default:
		return s.f.NewVoidZeroExpression()
	}
}

/**
* Serializes the type of a node for use with decorator type metadata.
* @param node The node that should have its type serialized.
 */
func (s *metadataSerializer) serializeParameterTypesOfNode(node *ast.Node, container *ast.Node) *ast.Node {
	var valueDeclaration *ast.Node
	if ast.IsClassLike(node) {
		valueDeclaration = ast.GetFirstConstructorWithBody(node)
	} else if ast.IsFunctionLike(node) && ast.NodeIsPresent(node.Body()) {
		valueDeclaration = node
	}

	if valueDeclaration == nil {
		return s.f.NewArrayLiteralExpression(s.f.NewNodeList([]*ast.Node{}), false)
	}

	var expressions []*ast.Node
	parameters := getParametersOfDecoratedDeclaration(valueDeclaration, container)
	for i, parameter := range parameters.Nodes {
		if i == 0 && ast.IsIdentifier(parameter.Name()) && parameter.Name().Text() == "this" {
			continue
		}
		if parameter.AsParameterDeclaration().DotDotDotToken != nil {
			expressions = append(expressions, s.serializeTypeNode(ast.GetRestParameterElementType(parameter.Type())))
		} else {
			expressions = append(expressions, s.serializeTypeOfNode(parameter, container))
		}
	}
	return s.f.NewArrayLiteralExpression(s.f.NewNodeList(expressions), false)
}

func getParametersOfDecoratedDeclaration(node *ast.Node, container *ast.Node) *ast.NodeList {
	if container != nil && node.Kind == ast.KindGetAccessor {
		acc := ast.GetAllAccessorDeclarations(container.Members(), node)
		if acc.SetAccessor != nil {
			return acc.SetAccessor.Parameters
		}
	}
	return node.ParameterList()
}

/**
* Serializes the return type of a node for use with decorator type metadata.
* @param node The node that should have its return type serialized.
 */
func (s *metadataSerializer) serializeReturnTypeOfNode(node *ast.Node) *ast.Node {
	if ast.IsFunctionLike(node) && node.Type() != nil {
		return s.serializeTypeNode(node.Type())
	} else if ast.IsAsyncFunction(node) {
		return s.f.NewIdentifier("Promise")
	}
	return s.f.NewVoidZeroExpression()
}

/**
* Serializes a type node for use with decorator type metadata.
*
* Types are serialized in the following fashion:
* - Void types point to "undefined" (e.g. "void 0")
* - Function and Constructor types point to the global "Function" constructor.
* - Interface types with a call or construct signature types point to the global
*   "Function" constructor.
* - Array and Tuple types point to the global "Array" constructor.
* - Type predicates and booleans point to the global "Boolean" constructor.
* - String literal types and strings point to the global "String" constructor.
* - Enum and number types point to the global "Number" constructor.
* - Symbol types point to the global "Symbol" constructor.
* - Type references to classes (or class-like variables) point to the constructor for the class.
* - Anything else points to the global "Object" constructor.
*
* @param node The type node to serialize.
 */
func (s *metadataSerializer) serializeTypeNode(node *ast.Node) *ast.Node {
	if node == nil {
		return s.f.NewIdentifier("Object")
	}

	node = ast.SkipTypeParentheses(node)

	switch node.Kind {
	case ast.KindVoidKeyword, ast.KindUndefinedKeyword, ast.KindNeverKeyword:
		return s.f.NewVoidZeroExpression()
	case ast.KindFunctionType, ast.KindConstructorType:
		return s.f.NewIdentifier("Function")
	case ast.KindArrayType, ast.KindTupleType:
		return s.f.NewIdentifier("Array")
	case ast.KindTypePredicate:
		if node.AsTypePredicateNode().AssertsModifier != nil {
			return s.f.NewVoidZeroExpression()
		}
		return s.f.NewIdentifier("Boolean")
	case ast.KindBooleanKeyword:
		return s.f.NewIdentifier("Boolean")
	case ast.KindTemplateLiteralType, ast.KindStringKeyword:
		return s.f.NewIdentifier("String")
	case ast.KindObjectKeyword:
		return s.f.NewIdentifier("Object")
	case ast.KindLiteralType:
		return s.serializeLiteralOfLiteralTypeNode(node.AsLiteralTypeNode().Literal)
	case ast.KindNumberKeyword:
		return s.f.NewIdentifier("Number")
	case ast.KindBigIntKeyword:
		return s.f.NewIdentifier("BigInt") // !!! todo: fallback for targets < es2020
	case ast.KindSymbolKeyword:
		return s.f.NewIdentifier("Symbol")
	case ast.KindTypeReference:
		return s.serializeTypeReferenceNode(node.AsTypeReferenceNode())
	case ast.KindIntersectionType:
		return s.serializeUnionOrIntersectionConstituents(node.AsIntersectionTypeNode().Types.Nodes, true)
	case ast.KindUnionType:
		return s.serializeUnionOrIntersectionConstituents(node.AsUnionTypeNode().Types.Nodes, false)
	case ast.KindConditionalType:
		return s.serializeUnionOrIntersectionConstituents([]*ast.Node{node.AsConditionalTypeNode().TrueType, node.AsConditionalTypeNode().FalseType}, false)
	case ast.KindTypeOperator:
		if node.AsTypeOperatorNode().Operator == ast.KindReadonlyKeyword {
			return s.serializeTypeNode(node.Type())
		}
		// TODO: why is `unique symbol` not handled as `Symbol`? This falls back to `Object`
	case ast.KindTypeQuery, ast.KindIndexedAccessType, ast.KindMappedType, ast.KindTypeLiteral, ast.KindAnyKeyword, ast.KindUnknownKeyword, ast.KindThisType, ast.KindImportType:
		break

	// handle JSDoc types from an invalid parse
	case ast.KindJSDocAllType, ast.KindJSDocVariadicType:
		break
	case ast.KindJSDocNullableType, ast.KindJSDocNonNullableType, ast.KindJSDocOptionalType:
		return s.serializeTypeNode(node.Type())
	default:
		debug.FailBadSyntaxKind(node)
		return nil
	}
	return s.f.NewIdentifier("Object")
}

func (s *metadataSerializer) serializeUnionOrIntersectionConstituents(types []*ast.Node, isIntersection bool) *ast.Node {
	// Note when updating logic here also update `getEntityNameForDecoratorMetadata` in checker.ts so that aliases can be marked as referenced
	var serializedType *ast.Node
	for _, typeNode := range types {
		typeNode = ast.SkipTypeParentheses(typeNode)
		if typeNode.Kind == ast.KindNeverKeyword {
			if isIntersection {
				return s.f.NewVoidZeroExpression() // Reduce to `never` in an intersection
			}
			continue // Elide `never` in a union
		}

		if typeNode.Kind == ast.KindUnknownKeyword {
			if !isIntersection {
				return s.f.NewIdentifier("Object") // Reduce to `unknown` in a union
			}
			continue // Elide `unknown` in an intersection
		}

		if typeNode.Kind == ast.KindAnyKeyword {
			return s.f.NewIdentifier("Object") // Reduce to `any` in a union or intersection
		}

		if !s.strictNullChecks && (ast.IsLiteralTypeNode(typeNode) && typeNode.AsLiteralTypeNode().Literal.Kind == ast.KindNullKeyword) || typeNode.Kind == ast.KindUndefinedKeyword {
			continue // Elide null and undefined from unions for metadata, just like what we did prior to the implementation of strict null checks
		}

		serializedConstituent := s.serializeTypeNode(typeNode)
		if ast.IsIdentifier(serializedConstituent) && serializedConstituent.AsIdentifier().Text == "Object" {
			// One of the individual is global object, return immediately
			return serializedConstituent
		}

		// If there exists union that is not `void 0` expression, check if the the common type is identifier.
		// anything more complex and we will just default to Object
		if serializedType != nil {
			// Different types
			if !s.equateSerializedTypeNodes(serializedType, serializedConstituent) {
				return s.f.NewIdentifier("Object")
			}
		} else {
			// Initialize the union type
			serializedType = serializedConstituent
		}
	}

	// If we were able to find common type, use it
	if serializedType != nil {
		return serializedType
	}
	return s.f.NewVoidZeroExpression() // Fallback is only hit if all union constituents are null/undefined/never
}

func (s *metadataSerializer) serializeLiteralOfLiteralTypeNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral:
		return s.f.NewIdentifier("String")
	case ast.KindPrefixUnaryExpression:
		operand := node.AsPrefixUnaryExpression().Operand
		switch operand.Kind {
		case ast.KindNumericLiteral, ast.KindBigIntLiteral:
			return s.serializeLiteralOfLiteralTypeNode(operand)
		default:
			debug.FailBadSyntaxKind(operand)
		}
	case ast.KindNumericLiteral:
		return s.f.NewIdentifier("Number")
	case ast.KindBigIntLiteral:
		return s.f.NewIdentifier("BigInt") // !!! todo: fallback for targets < es2020
	case ast.KindTrueKeyword, ast.KindFalseKeyword:
		return s.f.NewIdentifier("Boolean")
	case ast.KindNullKeyword:
		return s.f.NewVoidZeroExpression()
	default:
		debug.FailBadSyntaxKind(node)
		return nil
	}
	return nil
}

func isConditionalTypeBranch(n *ast.Node) bool {
	return n.Parent != nil && ast.IsConditionalTypeNode(n.Parent) && (n.Parent.AsConditionalTypeNode().TrueType == n || n.Parent.AsConditionalTypeNode().FalseType == n)
}

/**
* Serializes a TypeReferenceNode to an appropriate JS constructor value for use with decorator type metadata.
* @param node The type reference node.
 */
func (s *metadataSerializer) serializeTypeReferenceNode(node *ast.TypeReferenceNode) *ast.Node {
	serialScope := s.c.currentNameScope
	if serialScope == nil {
		serialScope = s.c.currentLexicalScope
	}
	kind := s.resolver.GetTypeReferenceSerializationKind(s.ec.ParseNode(node.TypeName), s.ec.ParseNode(serialScope))
	switch kind {
	case printer.TypeReferenceSerializationKindUnknown:
		// From conditional type type reference that cannot be resolved is Similar to any or unknown
		if ast.FindAncestor(node.AsNode(), isConditionalTypeBranch) != nil {
			return s.f.NewIdentifier("Object")
		}

		serialized := s.serializeEntityNameAsExpressionFallback(node.TypeName)
		temp := s.f.NewTempVariable()
		s.ec.AddVariableDeclaration(temp)
		return s.f.NewConditionalExpression(
			s.f.NewTypeCheck(s.f.NewAssignmentExpression(temp, serialized), "function"),
			s.f.NewToken(ast.KindQuestionToken),
			temp,
			s.f.NewToken(ast.KindColonToken),
			s.f.NewIdentifier("Object"),
		)

	case printer.TypeReferenceSerializationKindTypeWithConstructSignatureAndValue:
		return s.serializeEntityNameAsExpression(node.TypeName)

	case printer.TypeReferenceSerializationKindVoidNullableOrNeverType:
		return s.f.NewVoidZeroExpression()

	case printer.TypeReferenceSerializationKindBigIntLikeType:
		return s.f.NewIdentifier("BigInt")

	case printer.TypeReferenceSerializationKindBooleanType:
		return s.f.NewIdentifier("Boolean")

	case printer.TypeReferenceSerializationKindNumberLikeType:
		return s.f.NewIdentifier("Number")

	case printer.TypeReferenceSerializationKindStringLikeType:
		return s.f.NewIdentifier("String")

	case printer.TypeReferenceSerializationKindArrayLikeType:
		return s.f.NewIdentifier("Array")

	case printer.TypeReferenceSerializationKindESSymbolType:
		return s.f.NewIdentifier("Symbol")

	case printer.TypeReferenceSerializationKindTypeWithCallSignature:
		return s.f.NewIdentifier("Function")

	case printer.TypeReferenceSerializationKindPromise:
		return s.f.NewIdentifier("Promise")

	case printer.TypeReferenceSerializationKindObjectType:
		return s.f.NewIdentifier("Object")
	default:
		debug.AssertNever(kind, "unknown type reference serialization kind")
		return nil
	}
}

/**
* Serializes an entity name as an expression for decorator type metadata.
* @param node The entity name to serialize.
 */
func (s *metadataSerializer) serializeEntityNameAsExpression(node *ast.EntityName) *ast.Node {
	switch node.Kind {
	case ast.KindIdentifier:
		// Create a clone of the name with a new parent, and treat it as if it were
		// a source tree node for the purposes of the checker.
		name := node.Clone(s.f)
		name.Loc = node.Loc
		s.ec.UnsetOriginal(name)                              // make this identifier emulate a parse node, making it behave correctly when inspected by the module transforms
		name.Parent = s.ec.ParseNode(s.c.currentLexicalScope) // ensure the parent is set to a parse tree node.
		return name
	case ast.KindQualifiedName:
		return s.serializeQualifiedNameAsExpression(node.AsQualifiedName())
	}
	return nil
}

/**
* Serializes an qualified name as an expression for decorator type metadata.
* @param node The qualified name to serialize.
 */
func (s *metadataSerializer) serializeQualifiedNameAsExpression(node *ast.QualifiedName) *ast.Node {
	return s.f.NewPropertyAccessExpression(s.serializeEntityNameAsExpression(node.Left), nil, node.Right, ast.NodeFlagsNone)
}

/**
* Serializes an entity name which may not exist at runtime, but whose access shouldn't throw
* @param node The entity name to serialize.
 */
func (s *metadataSerializer) serializeEntityNameAsExpressionFallback(node *ast.EntityName) *ast.Node {
	if node.Kind == ast.KindIdentifier {
		// A -> typeof A !== "undefined" && A
		copied := s.serializeEntityNameAsExpression(node)
		return s.createCheckedValue(copied, copied)
	}
	if node.AsQualifiedName().Left.Kind == ast.KindIdentifier {
		// A.B -> typeof A !== "undefined" && A.B
		return s.createCheckedValue(s.serializeEntityNameAsExpression(node.AsQualifiedName().Left), s.serializeEntityNameAsExpression(node))
	}
	// A.B.C -> typeof A !== "undefined" && (_a = A.B) !== void 0 && _a.C
	left := s.serializeEntityNameAsExpressionFallback(node.AsQualifiedName().Left)
	temp := s.f.NewTempVariable()
	s.ec.AddVariableDeclaration(temp)
	return s.f.NewLogicalANDExpression(
		s.f.NewLogicalANDExpression(
			left.AsBinaryExpression().Left,
			s.f.NewStrictInequalityExpression(s.f.NewAssignmentExpression(temp, left.AsBinaryExpression().Right), s.f.NewVoidZeroExpression()),
		),
		s.f.NewPropertyAccessExpression(temp, nil, node.AsQualifiedName().Right, ast.NodeFlagsNone),
	)
}

/**
* Produces an expression that results in `right` if `left` is not undefined at runtime:
*
* ```
* typeof left !== "undefined" && right
* ```
*
* We use `typeof L !== "undefined"` (rather than `L !== undefined`) since `L` may not be declared.
* It's acceptable for this expression to result in `false` at runtime, as the result is intended to be
* further checked by any containing expression.
 */
func (s *metadataSerializer) createCheckedValue(left *ast.Node, right *ast.Node) *ast.Node {
	return s.f.NewLogicalANDExpression(
		s.f.NewStrictInequalityExpression(s.f.NewTypeOfExpression(left), s.f.NewStringLiteral("undefined", ast.TokenFlagsNone)),
		right,
	)
}

func (s *metadataSerializer) equateSerializedTypeNodes(left *ast.Node, right *ast.Node) bool {
	// temp vars used in fallback
	if transformers.IsGeneratedIdentifier(s.ec, left) {
		return transformers.IsGeneratedIdentifier(s.ec, right)
	}
	// entity names
	if ast.IsIdentifier(left) {
		return ast.IsIdentifier(right) && left.Text() == right.Text()
	}
	if ast.IsPropertyAccessExpression(left) {
		return ast.IsPropertyAccessExpression(right) && s.equateSerializedTypeNodes(left.Expression(), right.Expression()) && s.equateSerializedTypeNodes(left.Name(), right.Name())
	}
	// `void 0`
	if ast.IsVoidExpression(left) {
		return ast.IsVoidExpression(right) && ast.IsNumericLiteral(left.Expression()) && ast.IsNumericLiteral(right.Expression()) && left.Expression().Text() == "0" && right.Expression().Text() == "0"
	}
	// `"undefined"` or `"function"` in `typeof` checks
	if ast.IsStringLiteral(left) {
		return ast.IsStringLiteral(right) && left.Text() == right.Text()
	}
	// used in `typeof` checks for fallback
	if ast.IsTypeOfExpression(left) {
		return ast.IsTypeOfExpression(right) && s.equateSerializedTypeNodes(left.Expression(), right.Expression())
	}
	// parens in `typeof` checks with temps
	if ast.IsParenthesizedExpression(left) {
		return ast.IsParenthesizedExpression(right) && s.equateSerializedTypeNodes(left.Expression(), right.Expression())
	}
	// conditionals used in fallback
	if ast.IsConditionalExpression(left) {
		return ast.IsConditionalExpression(right) && s.equateSerializedTypeNodes(left.AsConditionalExpression().Condition, right.AsConditionalExpression().Condition) && s.equateSerializedTypeNodes(left.AsConditionalExpression().WhenTrue, right.AsConditionalExpression().WhenTrue) && s.equateSerializedTypeNodes(left.AsConditionalExpression().WhenFalse, right.AsConditionalExpression().WhenFalse)
	}
	// logical binary and assignments used in fallback
	if ast.IsBinaryExpression(left) {
		return ast.IsBinaryExpression(right) && left.AsBinaryExpression().OperatorToken.Kind == right.AsBinaryExpression().OperatorToken.Kind && s.equateSerializedTypeNodes(left.AsBinaryExpression().Left, right.AsBinaryExpression().Left) && s.equateSerializedTypeNodes(left.AsBinaryExpression().Right, right.AsBinaryExpression().Right)
	}
	return false
}
