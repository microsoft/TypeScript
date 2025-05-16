package checker

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/diagnostics"
)

func (c *Checker) GetUnionType(types []*Type) *Type {
	return c.getUnionType(types)
}

func (c *Checker) GetGlobalSymbol(name string, meaning ast.SymbolFlags, diagnostic *diagnostics.Message) *ast.Symbol {
	return c.getGlobalSymbol(name, meaning, diagnostic)
}

func (c *Checker) GetTypeFromTypeNode(node *ast.Node) *Type {
	return c.getTypeFromTypeNode(node)
}

func (c *Checker) IsArrayLikeType(t *Type) bool {
	return c.isArrayLikeType(t)
}

func (c *Checker) GetPropertiesOfType(t *Type) []*ast.Symbol {
	return c.getPropertiesOfType(t)
}

func (c *Checker) TypeHasCallOrConstructSignatures(t *Type) bool {
	return c.typeHasCallOrConstructSignatures(t)
}

// Checks if a property can be accessed in a location.
// The location is given by the `node` parameter.
// The node does not need to be a property access.
// @param node location where to check property accessibility
// @param isSuper whether to consider this a `super` property access, e.g. `super.foo`.
// @param isWrite whether this is a write access, e.g. `++foo.x`.
// @param containingType type where the property comes from.
// @param property property symbol.
func (c *Checker) IsPropertyAccessible(node *ast.Node, isSuper bool, isWrite bool, containingType *Type, property *ast.Symbol) bool {
	return c.isPropertyAccessible(node, isSuper, isWrite, containingType, property)
}

func (c *Checker) GetTypeOfPropertyOfContextualType(t *Type, name string) *Type {
	return c.getTypeOfPropertyOfContextualType(t, name)
}

func GetDeclarationModifierFlagsFromSymbol(s *ast.Symbol) ast.ModifierFlags {
	return getDeclarationModifierFlagsFromSymbol(s)
}

func (c *Checker) WasCanceled() bool {
	return c.wasCanceled
}
