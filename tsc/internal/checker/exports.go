package checker

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
)

func (c *Checker) GetStringType() *Type {
	return c.stringType
}

func (c *Checker) GetUnknownSymbol() *ast.Symbol {
	return c.unknownSymbol
}

func (c *Checker) GetUnionType(types []*Type) *Type {
	return c.getUnionType(types)
}

func (c *Checker) GetGlobalSymbol(name string, meaning ast.SymbolFlags, diagnostic *diagnostics.Message) *ast.Symbol {
	return c.getGlobalSymbol(name, meaning, diagnostic)
}

func (c *Checker) GetMergedSymbol(symbol *ast.Symbol) *ast.Symbol {
	return c.getMergedSymbol(symbol)
}

func (c *Checker) TryFindAmbientModule(moduleName string) *ast.Symbol {
	return c.tryFindAmbientModule(moduleName, true /* withAugmentations */)
}

func (c *Checker) GetImmediateAliasedSymbol(symbol *ast.Symbol) *ast.Symbol {
	return c.getImmediateAliasedSymbol(symbol)
}

func (c *Checker) GetTypeOnlyAliasDeclaration(symbol *ast.Symbol) *ast.Node {
	return c.getTypeOnlyAliasDeclaration(symbol)
}

func (c *Checker) ResolveExternalModuleName(moduleSpecifier *ast.Node) *ast.Symbol {
	return c.resolveExternalModuleName(moduleSpecifier, moduleSpecifier, true /*ignoreErrors*/)
}

func (c *Checker) ResolveExternalModuleSymbol(moduleSymbol *ast.Symbol) *ast.Symbol {
	return c.resolveExternalModuleSymbol(moduleSymbol, false /*dontResolveAlias*/)
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

func (c *Checker) GetPropertyOfType(t *Type, name string) *ast.Symbol {
	return c.getPropertyOfType(t, name)
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

func (c *Checker) GetSignaturesOfType(t *Type, kind SignatureKind) []*Signature {
	return c.getSignaturesOfType(t, kind)
}

func (c *Checker) GetDeclaredTypeOfSymbol(symbol *ast.Symbol) *Type {
	return c.getDeclaredTypeOfSymbol(symbol)
}

func (c *Checker) GetTypeOfSymbol(symbol *ast.Symbol) *Type {
	return c.getTypeOfSymbol(symbol)
}

func (c *Checker) GetConstraintOfTypeParameter(typeParameter *Type) *Type {
	return c.getConstraintOfTypeParameter(typeParameter)
}

func (c *Checker) GetResolutionModeOverride(node *ast.ImportAttributes, reportErrors bool) core.ResolutionMode {
	return c.getResolutionModeOverride(node, reportErrors)
}

func (c *Checker) GetEffectiveDeclarationFlags(n *ast.Node, flagsToCheck ast.ModifierFlags) ast.ModifierFlags {
	return c.getEffectiveDeclarationFlags(n, flagsToCheck)
}

func (c *Checker) GetBaseConstraintOfType(t *Type) *Type {
	return c.getBaseConstraintOfType(t)
}

func (c *Checker) GetTypePredicateOfSignature(sig *Signature) *TypePredicate {
	return c.getTypePredicateOfSignature(sig)
}

func IsTupleType(t *Type) bool {
	return isTupleType(t)
}

func (c *Checker) GetReturnTypeOfSignature(sig *Signature) *Type {
	return c.getReturnTypeOfSignature(sig)
}

func (c *Checker) HasEffectiveRestParameter(signature *Signature) bool {
	return c.hasEffectiveRestParameter(signature)
}

func (c *Checker) GetLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol *ast.Symbol) []*Type {
	return c.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)
}

func (c *Checker) GetContextualTypeForObjectLiteralElement(element *ast.Node, contextFlags ContextFlags) *Type {
	return c.getContextualTypeForObjectLiteralElement(element, contextFlags)
}

func (c *Checker) TypePredicateToString(t *TypePredicate) string {
	return c.typePredicateToString(t)
}

func (c *Checker) GetExpandedParameters(signature *Signature, skipUnionExpanding bool) [][]*ast.Symbol {
	return c.getExpandedParameters(signature, skipUnionExpanding)
}

func (c *Checker) GetResolvedSignature(node *ast.Node) *Signature {
	return c.getResolvedSignature(node, nil, CheckModeNormal)
}

// Return the type of the given property in the given type, or nil if no such property exists
func (c *Checker) GetTypeOfPropertyOfType(t *Type, name string) *Type {
	return c.getTypeOfPropertyOfType(t, name)
}

func (c *Checker) GetContextualTypeForArgumentAtIndex(node *ast.Node, argIndex int) *Type {
	return c.getContextualTypeForArgumentAtIndex(node, argIndex)
}

func (c *Checker) GetIndexSignaturesAtLocation(node *ast.Node) []*ast.Node {
	return c.getIndexSignaturesAtLocation(node)
}

func (c *Checker) GetResolvedSymbol(node *ast.Node) *ast.Symbol {
	return c.getResolvedSymbol(node)
}
