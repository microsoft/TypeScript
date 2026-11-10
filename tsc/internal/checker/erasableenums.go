package checker

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/evaluator"
)

// ErasableEnumLinks keeps the ordinary object value separate from its nominal type.
type ErasableEnumLinks struct {
	valueType    *Type
	declaredType *Type
	checked      bool
}

type ErasableEnumMemberLinks struct {
	value     evaluator.Result
	computed  bool
	computing bool
}

func (c *Checker) checkErasableEnumDeclaration(node *ast.Node) {
	if !ast.IsErasableEnumDeclaration(node) {
		c.error(node.Type(), diagnostics.An_enum_annotation_requires_a_named_variable_in_a_variable_statement_with_an_object_literal_initializer)
		if initializer := node.Initializer(); initializer != nil {
			c.checkExpressionCached(initializer)
		}
		return
	}
	c.checkVariableLikeDeclaration(node)
}

func (c *Checker) checkErasableEnumInitializer(node *ast.Node) *Type {
	owner := c.getSymbolOfDeclaration(ast.GetErasableEnumDeclaration(node))
	info := c.getErasableEnumTypes(owner)
	if info.checked {
		return info.valueType
	}
	info.checked = true
	c.checkGrammarObjectLiteralExpression(node.AsObjectLiteralExpression(), false)
	for _, property := range node.AsObjectLiteralExpression().Properties.Nodes {
		if c.isCanceled() {
			break
		}
		if ast.IsSpreadAssignment(property) {
			c.error(property, diagnostics.Spread_assignments_are_not_allowed_in_erasable_enums)
			c.checkExpression(property.Expression())
			continue
		}
		if ast.IsComputedPropertyName(property.Name()) {
			c.error(property.Name(), diagnostics.Computed_property_names_are_not_allowed_in_enums)
		} else if !ast.IsIdentifier(property.Name()) && !ast.IsStringLiteral(property.Name()) {
			c.error(property.Name(), diagnostics.Erasable_enum_member_names_must_be_identifiers_or_string_literals)
		}
		if ast.IsErasableEnumPrototypeSetter(property) {
			c.checkExpression(property.Initializer())
			if ast.SkipParentheses(property.Initializer()).Kind != ast.KindNullKeyword {
				c.error(property.Initializer(), diagnostics.An_erasable_enum_prototype_setter_must_have_the_value_null)
			}
			continue
		}
		switch property.Kind {
		case ast.KindPropertyAssignment:
			c.checkPropertyAssignment(property, CheckModeNormal)
		case ast.KindShorthandPropertyAssignment:
			c.error(property, diagnostics.Erasable_enums_only_allow_property_assignments)
			c.checkShorthandPropertyAssignment(property, false, CheckModeNormal)
			continue
		default:
			c.error(property, diagnostics.Erasable_enums_only_allow_property_assignments)
			c.checkSourceElement(property)
			continue
		}
		if !ast.IsErasableEnumMember(property) {
			continue
		}
		if c.getErasableEnumMemberValue(property).Value == nil {
			c.error(property.Initializer(), diagnostics.Erasable_enum_member_initializers_must_be_constant_expressions)
		}
	}
	return info.valueType
}

func (c *Checker) getErasableEnumTypes(owner *ast.Symbol) *ErasableEnumLinks {
	info := c.erasableEnumLinks.Get(owner)
	if info.valueType != nil {
		return info
	}
	info.valueType = c.newAnonymousType(owner, owner.Exports(), nil, nil, nil)
	info.declaredType = c.errorType
	declaration := owner.ValueDeclaration()
	object := ast.GetErasableEnumInitializer(declaration)
	if object == nil {
		return info
	}
	var members []*Type
	hasMembers := false
	for _, property := range object.AsObjectLiteralExpression().Properties.Nodes {
		if ast.IsErasableEnumPrototypeSetter(property) {
			continue
		}
		hasMembers = true
		if !ast.IsErasableEnumMember(property) {
			continue
		}
		symbol := c.getSymbolOfDeclaration(property)
		value := c.getErasableEnumMemberValue(property).Value
		memberType := c.errorType
		if value != nil {
			memberType = c.getFreshTypeOfLiteralType(c.getEnumLiteralType(value, owner, symbol))
			members = append(members, memberType)
		}
		c.declaredTypeLinks.Get(symbol).declaredType = memberType
		c.valueSymbolLinks.Get(symbol).resolvedType = memberType
	}
	if len(members) == 0 && hasMembers {
		return info
	}
	info.declaredType = c.getUnionTypeEx(members, UnionReductionLiteral, &TypeAlias{symbol: owner}, nil)
	if info.declaredType.flags&TypeFlagsUnion != 0 {
		info.declaredType.flags |= TypeFlagsEnumLiteral
		info.declaredType.symbol = owner
	}
	return info
}

func (c *Checker) getErasableEnumValueType(owner *ast.Symbol) *Type {
	return c.getErasableEnumTypes(owner).valueType
}

func (c *Checker) getDeclaredTypeOfErasableEnum(owner *ast.Symbol) *Type {
	return c.getErasableEnumTypes(owner).declaredType
}

func (c *Checker) getErasableEnumMemberValue(property *ast.Node) evaluator.Result {
	links := c.erasableEnumMemberLinks.Get(property)
	if links.computed || links.computing {
		return links.value
	}
	links.computing = true
	initializer := property.Initializer()
	if initializer != nil {
		links.value = c.evaluate(initializer, property)
	}
	links.computing = false
	links.computed = true
	return links.value
}

func (c *Checker) evaluateErasableEnumMember(symbol *ast.Symbol, location *ast.Node) evaluator.Result {
	if location != nil && !c.isBlockScopedNameDeclaredBeforeUse(symbol.Parent().ValueDeclaration(), location) {
		return evaluator.Result{}
	}
	value := c.getErasableEnumMemberValue(symbol.ValueDeclaration())
	return evaluator.NewResult(value.Value, value.IsSyntacticallyString, value.ResolvedOtherFiles, true /*hasExternalReferences*/)
}
