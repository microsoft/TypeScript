package ast

import (
	"fmt"
)

type OperatorPrecedence int

const (
	// Expression:
	//     AssignmentExpression
	//     Expression `,` AssignmentExpression
	OperatorPrecedenceComma OperatorPrecedence = iota
	// NOTE: `Spread` is higher than `Comma` due to how it is parsed in |ElementList|
	// SpreadElement:
	//     `...` AssignmentExpression
	OperatorPrecedenceSpread
	// AssignmentExpression:
	//     ConditionalExpression
	//     YieldExpression
	//     ArrowFunction
	//     AsyncArrowFunction
	//     LeftHandSideExpression `=` AssignmentExpression
	//     LeftHandSideExpression AssignmentOperator AssignmentExpression
	//
	// NOTE: AssignmentExpression is broken down into several precedences due to the requirements
	//       of the parenthesizer rules.
	// AssignmentExpression: YieldExpression
	// YieldExpression:
	//     `yield`
	//     `yield` AssignmentExpression
	//     `yield` `*` AssignmentExpression
	OperatorPrecedenceYield
	// AssignmentExpression: LeftHandSideExpression `=` AssignmentExpression
	// AssignmentExpression: LeftHandSideExpression AssignmentOperator AssignmentExpression
	// AssignmentOperator: one of
	//     `*=` `/=` `%=` `+=` `-=` `<<=` `>>=` `>>>=` `&=` `^=` `|=` `**=`
	OperatorPrecedenceAssignment
	// NOTE: `Conditional` is considered higher than `Assignment` here, but in reality they have
	//       the same precedence.
	// AssignmentExpression: ConditionalExpression
	// ConditionalExpression:
	//     ShortCircuitExpression
	//     ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression
	OperatorPrecedenceConditional
	// LogicalORExpression:
	//     LogicalANDExpression
	//     LogicalORExpression `||` LogicalANDExpression
	OperatorPrecedenceLogicalOR
	// LogicalANDExpression:
	//     BitwiseORExpression
	//     LogicalANDExprerssion `&&` BitwiseORExpression
	OperatorPrecedenceLogicalAND
	// BitwiseORExpression:
	//     BitwiseXORExpression
	//     BitwiseORExpression `|` BitwiseXORExpression
	OperatorPrecedenceBitwiseOR
	// BitwiseXORExpression:
	//     BitwiseANDExpression
	//     BitwiseXORExpression `^` BitwiseANDExpression
	OperatorPrecedenceBitwiseXOR
	// BitwiseANDExpression:
	//     EqualityExpression
	//     BitwiseANDExpression `&` EqualityExpression
	OperatorPrecedenceBitwiseAND
	// EqualityExpression:
	//     RelationalExpression
	//     EqualityExpression `==` RelationalExpression
	//     EqualityExpression `!=` RelationalExpression
	//     EqualityExpression `===` RelationalExpression
	//     EqualityExpression `!==` RelationalExpression
	OperatorPrecedenceEquality
	// RelationalExpression:
	//     ShiftExpression
	//     RelationalExpression `<` ShiftExpression
	//     RelationalExpression `>` ShiftExpression
	//     RelationalExpression `<=` ShiftExpression
	//     RelationalExpression `>=` ShiftExpression
	//     RelationalExpression `instanceof` ShiftExpression
	//     RelationalExpression `in` ShiftExpression
	//     [+TypeScript] RelationalExpression `as` Type
	OperatorPrecedenceRelational
	// ShiftExpression:
	//     AdditiveExpression
	//     ShiftExpression `<<` AdditiveExpression
	//     ShiftExpression `>>` AdditiveExpression
	//     ShiftExpression `>>>` AdditiveExpression
	OperatorPrecedenceShift
	// AdditiveExpression:
	//     MultiplicativeExpression
	//     AdditiveExpression `+` MultiplicativeExpression
	//     AdditiveExpression `-` MultiplicativeExpression
	OperatorPrecedenceAdditive
	// MultiplicativeExpression:
	//     ExponentiationExpression
	//     MultiplicativeExpression MultiplicativeOperator ExponentiationExpression
	// MultiplicativeOperator: one of `*`, `/`, `%`
	OperatorPrecedenceMultiplicative
	// ExponentiationExpression:
	//     UnaryExpression
	//     UpdateExpression `**` ExponentiationExpression
	OperatorPrecedenceExponentiation
	// UnaryExpression:
	//     UpdateExpression
	//     `delete` UnaryExpression
	//     `void` UnaryExpression
	//     `typeof` UnaryExpression
	//     `+` UnaryExpression
	//     `-` UnaryExpression
	//     `~` UnaryExpression
	//     `!` UnaryExpression
	//     AwaitExpression
	// UpdateExpression:            // TODO: Do we need to investigate the precedence here?
	//     `++` UnaryExpression
	//     `--` UnaryExpression
	OperatorPrecedenceUnary
	// UpdateExpression:
	//     LeftHandSideExpression
	//     LeftHandSideExpression `++`
	//     LeftHandSideExpression `--`
	OperatorPrecedenceUpdate
	// LeftHandSideExpression:
	//     NewExpression
	// NewExpression:
	//     MemberExpression
	//     `new` NewExpression
	OperatorPrecedenceLeftHandSide
	// LeftHandSideExpression:
	//     OptionalExpression
	// OptionalExpression:
	//     MemberExpression OptionalChain
	//     CallExpression OptionalChain
	//     OptionalExpression OptionalChain
	OperatorPrecedenceOptionalChain
	// LeftHandSideExpression:
	//     CallExpression
	// CallExpression:
	//     CoverCallExpressionAndAsyncArrowHead
	//     SuperCall
	//     ImportCall
	//     CallExpression Arguments
	//     CallExpression `[` Expression `]`
	//     CallExpression `.` IdentifierName
	//     CallExpression TemplateLiteral
	// MemberExpression:
	//     PrimaryExpression
	//     MemberExpression `[` Expression `]`
	//     MemberExpression `.` IdentifierName
	//     MemberExpression TemplateLiteral
	//     SuperProperty
	//     MetaProperty
	//     `new` MemberExpression Arguments
	OperatorPrecedenceMember
	// TODO: JSXElement?
	// PrimaryExpression:
	//     `this`
	//     IdentifierReference
	//     Literal
	//     ArrayLiteral
	//     ObjectLiteral
	//     FunctionExpression
	//     ClassExpression
	//     GeneratorExpression
	//     AsyncFunctionExpression
	//     AsyncGeneratorExpression
	//     RegularExpressionLiteral
	//     TemplateLiteral
	OperatorPrecedencePrimary
	// PrimaryExpression:
	//     CoverParenthesizedExpressionAndArrowParameterList
	OperatorPrecedenceParentheses
	OperatorPrecedenceLowest        = OperatorPrecedenceComma
	OperatorPrecedenceHighest       = OperatorPrecedenceParentheses
	OperatorPrecedenceDisallowComma = OperatorPrecedenceYield
	// ShortCircuitExpression:
	//     LogicalORExpression
	//     CoalesceExpression
	// CoalesceExpression:
	//     CoalesceExpressionHead `??` BitwiseORExpression
	// CoalesceExpressionHead:
	//     CoalesceExpression
	//     BitwiseORExpression
	OperatorPrecedenceCoalesce = OperatorPrecedenceLogicalOR
	// -1 is lower than all other precedences. Returning it will cause binary expression
	// parsing to stop.
	OperatorPrecedenceInvalid OperatorPrecedence = -1
)

func getOperator(expression *Expression) Kind {
	switch expression.Kind {
	case KindBinaryExpression:
		return expression.AsBinaryExpression().OperatorToken.Kind
	case KindPrefixUnaryExpression:
		return expression.AsPrefixUnaryExpression().Operator
	case KindPostfixUnaryExpression:
		return expression.AsPostfixUnaryExpression().Operator
	default:
		return expression.Kind
	}
}

// Gets the precedence of an expression
func GetExpressionPrecedence(expression *Expression) OperatorPrecedence {
	operator := getOperator(expression)
	var flags OperatorPrecedenceFlags
	if expression.Kind == KindNewExpression && expression.ArgumentList() == nil {
		flags = OperatorPrecedenceFlagsNewWithoutArguments
	} else if IsOptionalChain(expression) {
		flags = OperatorPrecedenceFlagsOptionalChain
	}
	return GetOperatorPrecedence(expression.Kind, operator, flags)
}

type OperatorPrecedenceFlags int

const (
	OperatorPrecedenceFlagsNone                OperatorPrecedenceFlags = 0
	OperatorPrecedenceFlagsNewWithoutArguments OperatorPrecedenceFlags = 1 << 0
	OperatorPrecedenceFlagsOptionalChain       OperatorPrecedenceFlags = 1 << 1
)

// Gets the precedence of an operator
func GetOperatorPrecedence(nodeKind Kind, operatorKind Kind, flags OperatorPrecedenceFlags) OperatorPrecedence {
	switch nodeKind {
	case KindCommaListExpression:
		return OperatorPrecedenceComma
	case KindSpreadElement:
		return OperatorPrecedenceSpread
	case KindYieldExpression:
		return OperatorPrecedenceYield
	// !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
	case KindArrowFunction:
		return OperatorPrecedenceAssignment
	case KindConditionalExpression:
		return OperatorPrecedenceConditional
	case KindBinaryExpression:
		switch operatorKind {
		case KindCommaToken:
			return OperatorPrecedenceComma

		case KindEqualsToken,
			KindPlusEqualsToken,
			KindMinusEqualsToken,
			KindAsteriskAsteriskEqualsToken,
			KindAsteriskEqualsToken,
			KindSlashEqualsToken,
			KindPercentEqualsToken,
			KindLessThanLessThanEqualsToken,
			KindGreaterThanGreaterThanEqualsToken,
			KindGreaterThanGreaterThanGreaterThanEqualsToken,
			KindAmpersandEqualsToken,
			KindCaretEqualsToken,
			KindBarEqualsToken,
			KindBarBarEqualsToken,
			KindAmpersandAmpersandEqualsToken,
			KindQuestionQuestionEqualsToken:
			return OperatorPrecedenceAssignment

		default:
			return GetBinaryOperatorPrecedence(operatorKind)
		}
	// TODO: Should prefix `++` and `--` be moved to the `Update` precedence?
	case KindTypeAssertionExpression,
		KindNonNullExpression,
		KindPrefixUnaryExpression,
		KindTypeOfExpression,
		KindVoidExpression,
		KindDeleteExpression,
		KindAwaitExpression:
		return OperatorPrecedenceUnary

	case KindPostfixUnaryExpression:
		return OperatorPrecedenceUpdate

	// !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
	case KindPropertyAccessExpression, KindElementAccessExpression:
		if flags&OperatorPrecedenceFlagsOptionalChain != 0 {
			return OperatorPrecedenceOptionalChain
		}
		return OperatorPrecedenceMember

	case KindCallExpression:
		if flags&OperatorPrecedenceFlagsOptionalChain != 0 {
			return OperatorPrecedenceOptionalChain
		}
		return OperatorPrecedenceMember

	// !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
	case KindNewExpression:
		if flags&OperatorPrecedenceFlagsNewWithoutArguments != 0 {
			return OperatorPrecedenceLeftHandSide
		}
		return OperatorPrecedenceMember

	// !!! By necessity, this differs from the old compiler to better align with ParenthesizerRules. consider backporting
	case KindTaggedTemplateExpression, KindMetaProperty, KindExpressionWithTypeArguments:
		return OperatorPrecedenceMember

	case KindAsExpression,
		KindSatisfiesExpression:
		return OperatorPrecedenceRelational

	case KindThisKeyword,
		KindSuperKeyword,
		KindImportKeyword,
		KindIdentifier,
		KindPrivateIdentifier,
		KindNullKeyword,
		KindTrueKeyword,
		KindFalseKeyword,
		KindNumericLiteral,
		KindBigIntLiteral,
		KindStringLiteral,
		KindArrayLiteralExpression,
		KindObjectLiteralExpression,
		KindFunctionExpression,
		KindClassExpression,
		KindRegularExpressionLiteral,
		KindNoSubstitutionTemplateLiteral,
		KindTemplateExpression,
		KindOmittedExpression,
		KindJsxElement,
		KindJsxSelfClosingElement,
		KindJsxFragment:
		return OperatorPrecedencePrimary

	// !!! By necessity, this differs from the old compiler to support emit. consider backporting
	case KindParenthesizedExpression:
		return OperatorPrecedenceParentheses

	default:
		return OperatorPrecedenceInvalid
	}
}

// Gets the precedence of a binary operator
func GetBinaryOperatorPrecedence(operatorKind Kind) OperatorPrecedence {
	switch operatorKind {
	case KindQuestionQuestionToken:
		return OperatorPrecedenceCoalesce
	case KindBarBarToken:
		return OperatorPrecedenceLogicalOR
	case KindAmpersandAmpersandToken:
		return OperatorPrecedenceLogicalAND
	case KindBarToken:
		return OperatorPrecedenceBitwiseOR
	case KindCaretToken:
		return OperatorPrecedenceBitwiseXOR
	case KindAmpersandToken:
		return OperatorPrecedenceBitwiseAND
	case KindEqualsEqualsToken, KindExclamationEqualsToken, KindEqualsEqualsEqualsToken, KindExclamationEqualsEqualsToken:
		return OperatorPrecedenceEquality
	case KindLessThanToken, KindGreaterThanToken, KindLessThanEqualsToken, KindGreaterThanEqualsToken,
		KindInstanceOfKeyword, KindInKeyword, KindAsKeyword, KindSatisfiesKeyword:
		return OperatorPrecedenceRelational
	case KindLessThanLessThanToken, KindGreaterThanGreaterThanToken, KindGreaterThanGreaterThanGreaterThanToken:
		return OperatorPrecedenceShift
	case KindPlusToken, KindMinusToken:
		return OperatorPrecedenceAdditive
	case KindAsteriskToken, KindSlashToken, KindPercentToken:
		return OperatorPrecedenceMultiplicative
	case KindAsteriskAsteriskToken:
		return OperatorPrecedenceExponentiation
	}
	// -1 is lower than all other precedences.  Returning it will cause binary expression
	// parsing to stop.
	return OperatorPrecedenceInvalid
}

// Gets the leftmost expression of an expression, e.g. `a` in `a.b`, `a[b]`, `a++`, `a+b`, `a?b:c`, `a as B`, etc.
func GetLeftmostExpression(node *Expression, stopAtCallExpressions bool) *Expression {
	for {
		switch node.Kind {
		case KindPostfixUnaryExpression:
			node = node.AsPostfixUnaryExpression().Operand
			continue
		case KindBinaryExpression:
			node = node.AsBinaryExpression().Left
			continue
		case KindConditionalExpression:
			node = node.AsConditionalExpression().Condition
			continue
		case KindTaggedTemplateExpression:
			node = node.AsTaggedTemplateExpression().Tag
			continue
		case KindCallExpression:
			if stopAtCallExpressions {
				return node
			}
			fallthrough
		case KindAsExpression,
			KindElementAccessExpression,
			KindPropertyAccessExpression,
			KindNonNullExpression,
			KindPartiallyEmittedExpression,
			KindSatisfiesExpression:
			node = node.Expression()
			continue
		}
		return node
	}
}

type TypePrecedence int32

const (
	// Conditional precedence (lowest)
	//
	//   Type[Extends]:
	//       ConditionalType[?Extends]
	//
	//   ConditionalType[Extends]:
	//       [~Extends] UnionType `extends` Type[+Extends] `?` Type[~Extends] `:` Type[~Extends]
	//
	TypePrecedenceConditional TypePrecedence = iota

	// JSDoc precedence (optional and variadic types)
	//
	//    JSDocType:
	//      `...`? Type `=`?
	TypePrecedenceJSDoc

	// Function precedence
	//
	//   Type[Extends]:
	//       ConditionalType[?Extends]
	//       FunctionType[?Extends]
	//       ConstructorType[?Extends]
	//
	//   ConditionalType[Extends]:
	//       UnionType
	//
	//   FunctionType[Extends]:
	//       TypeParameters? ArrowParameters `=>` Type[?Extends]
	//
	//   ConstructorType[Extends]:
	//       `abstract`? TypeParameters? ArrowParameters `=>` Type[?Extends]
	//
	TypePrecedenceFunction

	// Union precedence
	//
	//   UnionType:
	//       `|`? UnionTypeNoBar
	//
	//   UnionTypeNoBar:
	//       IntersectionType
	//       UnionTypeNoBar `|` IntersectionType
	//
	TypePrecedenceUnion

	// Intersection precedence
	//
	//   IntersectionType:
	//       `&`? IntersectionTypeNoAmpersand
	//
	//   IntersectionTypeNoAmpersand:
	//       TypeOperator
	//       IntersectionTypeNoAmpersand `&` TypeOperator
	//
	TypePrecedenceIntersection

	// TypeOperator precedence
	//
	//   TypeOperator:
	//     PostfixType
	//     InferType
	//     `keyof` TypeOperator
	//     `unique` TypeOperator
	//     `readonly` PostfixType
	//
	//   InferType:
	//     `infer` BindingIdentifier
	//     `infer` BindingIdentifier `extends` Type[+Extends]
	//
	TypePrecedenceTypeOperator

	// Postfix precedence
	//
	//   PostfixType:
	//       NonArrayType
	//       OptionalType
	//       ArrayType
	//       IndexedAccessType
	//
	//   OptionalType:
	//       PostfixType `?`
	//
	//   ArrayType:
	//       PostfixType `[` `]`
	//
	//   IndexedAccessType:
	//       PostfixType `[` Type[~Extends] `]`
	//
	TypePrecedencePostfix

	// NonArray precedence (highest)
	//
	//   NonArrayType:
	//       KeywordType
	//       LiteralType
	//       ThisType
	//       ImportType
	//       TypeQuery
	//       MappedType
	//       TypeLiteral
	//       TupleType
	//       ParenthesizedType
	//       TypePredicate
	//       TypeReference
	//       TemplateType
	//
	//   KeywordType: one of
	//       `any`       `unknown` `string`    `number` `bigint`
	//       `symbol`    `boolean` `undefined` `never`  `object`
	//       `intrinsic` `void`
	//
	//   LiteralType:
	//       StringLiteral
	//       NoSubstitutionTemplateLiteral
	//       NumericLiteral
	//       BigIntLiteral
	//       `-` NumericLiteral
	//       `-` BigIntLiteral
	//       `true`
	//       `false`
	//       `null`
	//
	//   ThisType:
	//       `this`
	//
	//   ImportType:
	//       `typeof`? `import` `(` Type[~Extends] `,`? `)` ImportTypeQualifier? TypeArguments?
	//       `typeof`? `import` `(` Type[~Extends] `,` ImportTypeAttributes `,`? `)` ImportTypeQualifier? TypeArguments?
	//
	//   ImportTypeQualifier:
	//       `.` EntityName
	//
	//   ImportTypeAttributes:
	//       `{` `with` `:` ImportAttributes `,`? `}`
	//
	//   TypeQuery:
	//
	//   MappedType:
	//       `{` MappedTypePrefix? MappedTypePropertyName MappedTypeSuffix? `:` Type[~Extends] `;` `}`
	//
	//   MappedTypePrefix:
	//       `readonly`
	//       `+` `readonly`
	//       `-` `readonly`
	//
	//   MappedTypePropertyName:
	//       `[` BindingIdentifier `in` Type[~Extends] `]`
	//       `[` BindingIdentifier `in` Type[~Extends] `as` Type[~Extends] `]`
	//
	//   MappedTypeSuffix:
	//       `?`
	//       `+` `?`
	//       `-` `?`
	//
	//   TypeLiteral:
	//       `{` TypeElementList `}`
	//
	//   TypeElementList:
	//       [empty]
	//       TypeElementList TypeElement
	//
	//   TypeElement:
	//       PropertySignature
	//       MethodSignature
	//       IndexSignature
	//       CallSignature
	//       ConstructSignature
	//
	//   PropertySignature:
	//       PropertyName `?`? TypeAnnotation? `;`
	//
	//   MethodSignature:
	//       PropertyName `?`? TypeParameters? `(` FormalParameterList `)` TypeAnnotation? `;`
	//       `get` PropertyName TypeParameters? `(` FormalParameterList `)` TypeAnnotation? `;` // GetAccessor
	//       `set` PropertyName TypeParameters? `(` FormalParameterList `)` TypeAnnotation? `;` // SetAccessor
	//
	//   IndexSignature:
	//       `[` IdentifierName`]` TypeAnnotation `;`
	//
	//   CallSignature:
	//       TypeParameters? `(` FormalParameterList `)` TypeAnnotation? `;`
	//
	//   ConstructSignature:
	//       `new` TypeParameters? `(` FormalParameterList `)` TypeAnnotation? `;`
	//
	//   TupleType:
	//       `[` `]`
	//       `[` NamedTupleElementTypes `,`? `]`
	//       `[` TupleElementTypes `,`? `]`
	//
	//   NamedTupleElementTypes:
	//       NamedTupleMember
	//       NamedTupleElementTypes `,` NamedTupleMember
	//
	//   NamedTupleMember:
	//       IdentifierName `?`? `:` Type[~Extends]
	//       `...` IdentifierName `:` Type[~Extends]
	//
	//   TupleElementTypes:
	//       TupleElementType
	//       TupleElementTypes `,` TupleElementType
	//
	//   TupleElementType:
	//       Type[~Extends]
	//       OptionalType
	//       RestType
	//
	//   RestType:
	//       `...` Type[~Extends]
	//
	//   ParenthesizedType:
	//       `(` Type[~Extends] `)`
	//
	//   TypePredicate:
	//       `asserts`? TypePredicateParameterName
	//       `asserts`? TypePredicateParameterName `is` Type[~Extends]
	//
	//   TypePredicateParameterName:
	//       `this`
	//       IdentifierReference
	//
	//   TypeReference:
	//       EntityName TypeArguments?
	//
	//   TemplateType:
	//       TemplateHead Type[~Extends] TemplateTypeSpans
	//
	//   TemplateTypeSpans:
	//       TemplateTail
	//       TemplateTypeMiddleList TemplateTail
	//
	//   TemplateTypeMiddleList:
	//       TemplateMiddle Type[~Extends]
	//       TemplateTypeMiddleList TemplateMiddle Type[~Extends]
	//
	//   TypeArguments:
	//       `<` TypeArgumentList `,`? `>`
	//
	//   TypeArgumentList:
	//       Type[~Extends]
	//       TypeArgumentList `,` Type[~Extends]
	//
	TypePrecedenceNonArray

	TypePrecedenceLowest  = TypePrecedenceConditional
	TypePrecedenceHighest = TypePrecedenceNonArray
)

// Gets the precedence of a TypeNode
func GetTypeNodePrecedence(n *TypeNode) TypePrecedence {
	switch n.Kind {
	case KindConditionalType:
		return TypePrecedenceConditional
	case KindJSDocOptionalType, KindJSDocVariadicType:
		return TypePrecedenceJSDoc
	case KindFunctionType, KindConstructorType:
		return TypePrecedenceFunction
	case KindUnionType:
		return TypePrecedenceUnion
	case KindIntersectionType:
		return TypePrecedenceIntersection
	case KindTypeOperator:
		return TypePrecedenceTypeOperator
	case KindInferType:
		if n.AsInferTypeNode().TypeParameter.AsTypeParameter().Constraint != nil {
			// `infer T extends U` must be treated as FunctionType precedence as the `extends` clause eagerly consumes
			// TypeNode
			return TypePrecedenceFunction
		}
		return TypePrecedenceTypeOperator
	case KindIndexedAccessType, KindArrayType, KindOptionalType:
		return TypePrecedencePostfix
	case KindTypeQuery:
		// TypeQuery is actually a NonArrayType, but we treat it as the same
		// precedence as PostfixType
		return TypePrecedencePostfix
	case KindAnyKeyword,
		KindUnknownKeyword,
		KindStringKeyword,
		KindNumberKeyword,
		KindBigIntKeyword,
		KindSymbolKeyword,
		KindBooleanKeyword,
		KindUndefinedKeyword,
		KindNeverKeyword,
		KindObjectKeyword,
		KindIntrinsicKeyword,
		KindVoidKeyword,
		KindJSDocAllType,
		KindJSDocNullableType,
		KindJSDocNonNullableType,
		KindLiteralType,
		KindTypePredicate,
		KindTypeReference,
		KindTypeLiteral,
		KindTupleType,
		KindRestType,
		KindParenthesizedType,
		KindThisType,
		KindMappedType,
		KindNamedTupleMember,
		KindTemplateLiteralType,
		KindImportType:
		return TypePrecedenceNonArray
	default:
		panic(fmt.Sprintf("unhandled TypeNode: %v", n.Kind))
	}
}
