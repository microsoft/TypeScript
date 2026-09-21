package checker

import (
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// newNegatedType creates a new negated type 'not baseType'.
func (c *Checker) newNegatedType(baseType *Type, flags ObjectFlags) *Type {
	data := &NegatedType{}
	data.baseType = baseType
	return c.newType(TypeFlagsNegated, flags, data)
}

// getNegatedType constructs the type 'not T', applying the negation identities:
//
//	not any      => any
//	not unknown  => never
//	not never    => unknown
//	not not T    => T
//	not (A | B)  => not A & not B   (De Morgan)
//
// All other types are wrapped in a (cached) NegatedType.
func (c *Checker) getNegatedType(t *Type) *Type {
	switch {
	case t.flags&TypeFlagsAny != 0:
		return t
	case t.flags&TypeFlagsUnknown != 0:
		return c.neverType
	case t.flags&TypeFlagsNever != 0:
		return c.unknownType
	case t.flags&TypeFlagsNegated != 0:
		return t.AsNegatedType().baseType
	case t.flags&TypeFlagsUnion != 0:
		return c.getIntersectionType(core.Map(t.Types(), c.getNegatedType))
	}
	if cached := c.negatedTypes[t.id]; cached != nil {
		return cached
	}
	result := c.newNegatedType(t, ObjectFlagsNone)
	result.AsNegatedType().regularType = result
	result.AsNegatedType().freshType = c.newNegatedType(t, ObjectFlagsFreshNegated)
	result.AsNegatedType().freshType.AsNegatedType().regularType = result
	result.AsNegatedType().freshType.AsNegatedType().freshType = result.AsNegatedType().freshType
	c.negatedTypes[t.id] = result
	return result
}

// getFreshNegatedType is like getNegatedType, but the leaf negated types it constructs are marked
// fresh (ObjectFlagsFreshNegated). Fresh negated types are those introduced by control flow
// narrowing (as opposed to written explicitly by the user); they are widened away by getWidenedType
// when a narrowed type escapes into an inferred declaration, so they never leak into emitted
// declaration files.
func (c *Checker) getFreshNegatedType(t *Type) *Type {
	if t.flags&TypeFlagsUnion != 0 {
		return c.getIntersectionType(core.Map(t.Types(), c.getFreshNegatedType))
	}
	negated := c.getNegatedType(t)
	if negated.flags&TypeFlagsNegated == 0 {
		return negated
	}
	return negated.AsNegatedType().freshType
}

// isFreshNegatedType reports whether t is a fresh negated type introduced by control flow narrowing.
func isFreshNegatedType(t *Type) bool {
	return t.flags&TypeFlagsNegated != 0 && t.objectFlags&ObjectFlagsFreshNegated != 0
}

// containsFreshNegatedType reports whether t is a fresh negated type or (transitively) contains one
// within a union or intersection. ObjectFlagsFreshNegated is a TypeFlagsNegated-only flag (its bit
// is reused for other meanings on unions and intersections), so it must never be read directly on a
// container type; this helper recurses instead.
func containsFreshNegatedType(t *Type) bool {
	if isFreshNegatedType(t) {
		return true
	}
	if t.flags&TypeFlagsUnionOrIntersection != 0 {
		return core.Some(t.Types(), containsFreshNegatedType)
	}
	return false
}

// containsNegatedType reports whether t is a negated type or (transitively) contains one within a
// union or intersection. It is used to decide whether a location wants a negation (and should
// therefore preserve a fresh control-flow negation rather than widening it away).
func containsNegatedType(t *Type) bool {
	if t == nil {
		return false
	}
	if t.flags&TypeFlagsNegated != 0 {
		return true
	}
	if t.flags&TypeFlagsUnionOrIntersection != 0 {
		return core.Some(t.Types(), containsNegatedType)
	}
	return false
}

// removeFreshNegatedTypes strips fresh negated types (introduced by control flow narrowing) from t.
// It is used at inference barriers that do not go through getWidenedType (such as inferred type
// predicates) so that a CFA-introduced 'not X' never leaks into an inferred declaration.
func (c *Checker) removeFreshNegatedTypes(t *Type) *Type {
	if !containsFreshNegatedType(t) {
		return t
	}
	if isFreshNegatedType(t) {
		return c.unknownType
	}
	if t.flags&TypeFlagsUnion != 0 {
		return c.getUnionType(core.Map(t.Types(), c.removeFreshNegatedTypes))
	}
	if t.flags&TypeFlagsIntersection != 0 {
		return c.getIntersectionType(core.Map(t.Types(), c.removeFreshNegatedTypes))
	}
	return t
}

func (c *Checker) getRegularNegatedTypes(t *Type) *Type {
	if !containsFreshNegatedType(t) {
		return t
	}
	return c.mapType(t, func(t *Type) *Type {
		if t.flags&TypeFlagsNegated != 0 {
			return t.AsNegatedType().regularType
		}
		if t.flags&TypeFlagsIntersection != 0 {
			return c.getIntersectionType(core.Map(t.Types(), c.getRegularNegatedTypes))
		}
		return t
	})
}

func (c *Checker) removeOrRegularizeNegatedTypes(t *Type, remove bool) *Type {
	if remove {
		return c.removeFreshNegatedTypes(t)
	}
	return c.getRegularNegatedTypes(t)
}

// removeComplementaryFreshNegatedTypes cancels complementary members of a union that were produced
// by the true and false branches of a control-flow narrowing. When both a refined type 'Base & C'
// and its negated complement 'Base & not C' appear in the union, they cover all of 'Base', so both
// are replaced by the common supertype 'Base'. For example, when the branches of
//
//	if (crate.isPackedTight()) { ... }
//
// rejoin, the union '(Crate<any> & {extraContents}) | (Crate<any> & not (Crate<any> & {extraContents}))'
// simplifies back to just 'Crate<any>'. This is gated on ObjectFlagsFreshNegated so it only affects
// negations introduced by narrowing, not negations written explicitly by the user.
//
// The input slice is assumed to be sorted (per CompareTypes); the result remains sorted.
func (c *Checker) removeComplementaryFreshNegatedTypes(types []*Type) []*Type {
	for i := 0; i < len(types); i++ {
		n := types[i]
		if n.flags&TypeFlagsIntersection == 0 || !core.Some(n.Types(), isFreshNegatedType) {
			continue
		}
		members := n.Types()
		for _, m := range members {
			if !isFreshNegatedType(m) {
				continue
			}
			// 'base' is 'n' with this one negation removed; 'positive' is 'base' with the negation's
			// base type intersected back in (i.e. the corresponding true-branch member).
			rest := core.Filter(members, func(other *Type) bool { return other != m })
			if len(rest) == 0 {
				continue
			}
			base := c.getIntersectionType(rest)
			positive := c.getIntersectionType([]*Type{base, m.AsNegatedType().baseType})
			// Find the true-branch counterpart P. Narrowing may have reduced it (e.g. 'Crate<any> &
			// Crate<Sundries>' to just 'Crate<Sundries>'), so match structurally: any P with
			// (base & C) <: P <: base satisfies 'P | (base & not C) == base'.
			j := -1
			for k, p := range types {
				if k != i && c.isTypeSubtypeOf(p, base) && c.isTypeSubtypeOf(positive, p) {
					j = k
					break
				}
			}
			if j < 0 {
				continue
			}
			lo, hi := i, j
			if lo > hi {
				lo, hi = hi, lo
			}
			types = slices.Delete(types, hi, hi+1)
			types = slices.Delete(types, lo, lo+1)
			types, _ = insertType(types, base)
			i = -1 // Restart the scan since the set changed.
			break
		}
	}
	if core.Some(types, isNegatedType) {
		// Union type construction does this reduction *before* this intersection one - it may need to be checked again with the updated type set.
		if c.checkForSaturatedNegatedType(types) {
			return []*Type{c.unknownType}
		}
	}
	return types
}

// checkForUnsatisfiedNegatedType returns true if the intersection in typeSet is empty (never)
// because some non-negated member is a subtype of the union of the negated members' base types.
// For example, in '"w" & not string' the non-negated member '"w"' is a subtype of 'string'
// (the base type of 'not string'), so the intersection reduces to never.
func (c *Checker) checkForUnsatisfiedNegatedType(typeSet []*Type) bool {
	nonNegatedSet := core.Filter(typeSet, func(t *Type) bool { return t.flags&TypeFlagsNegated == 0 })
	if len(nonNegatedSet) == 0 {
		return false
	}
	negatedBounds := c.getUnionType(core.Map(core.Filter(typeSet, isNegatedType), func(t *Type) *Type {
		return t.AsNegatedType().baseType
	}))
	for _, nonNegatedType := range nonNegatedSet {
		if everyType(negatedBounds, func(bound *Type) bool { return bound.flags&TypeFlagsNullable != 0 }) {
			if nonNegatedType.flags&TypeFlagsNullable != 0 && someType(negatedBounds, func(bound *Type) bool { return bound.flags&nonNegatedType.flags&TypeFlagsNullable != 0 }) {
				return true
			}
			continue
		}
		if c.isTypeSubtypeOf(nonNegatedType, negatedBounds) {
			return true
		}
	}
	return false
}

func (c *Checker) reduceNullishComplements(types []*Type) []*Type {
	for index, member := range types {
		if member.flags&TypeFlagsIntersection == 0 || !core.Some(member.Types(), isNullishNegation) {
			continue
		}
		factors := core.Filter(member.Types(), func(factor *Type) bool { return !isNullishNegation(factor) })
		for _, negation := range member.Types() {
			if !isNullishNegation(negation) {
				continue
			}
			nullableFlags := negation.AsNegatedType().baseType.flags & TypeFlagsNullable
			for otherIndex, other := range types {
				if otherIndex == index {
					continue
				}
				coversFactors := other.flags&nullableFlags != 0
				matchesFactors := coversFactors && len(factors) == 0
				if other.flags&TypeFlagsIntersection != 0 && len(other.Types()) == len(factors)+1 {
					matchesFactors = core.Some(other.Types(), func(factor *Type) bool { return factor.flags&nullableFlags != 0 }) &&
						core.Every(factors, func(factor *Type) bool { return slices.Contains(other.Types(), factor) })
				}
				if !coversFactors && !matchesFactors {
					continue
				}
				remaining := core.Filter(member.Types(), func(factor *Type) bool {
					return !isNullishNegation(factor) || factor.AsNegatedType().baseType.flags&nullableFlags == 0
				})
				reduced := slices.Clone(types)
				reduced[index] = c.getIntersectionType(remaining)
				if matchesFactors {
					reduced = slices.Delete(reduced, otherIndex, otherIndex+1)
				}
				return reduced
			}
		}
	}
	return types
}

// checkForSaturatedNegatedType returns true if the union in typeSet covers every value (i.e. is the
// unknown type) because it contains a type and its complement. This is the union converse of
// checkForUnsatisfiedNegatedType: when a negated member 'not B' is combined with non-negated members
// whose union is a supertype of 'B', the non-negated part covers 'B' and 'not B' covers everything
// else, so the union is unknown. For example, 'T | not T' reduces to unknown, and 'string | not "w"'
// reduces to unknown because '"w"' is a subtype of 'string'.
func (c *Checker) checkForSaturatedNegatedType(typeSet []*Type) bool {
	isComplement := func(t *Type) bool {
		return isNegatedType(t) || t.flags&TypeFlagsIntersection != 0 && core.Every(t.Types(), isNegatedType)
	}
	complements := core.Filter(typeSet, isComplement)
	if len(complements) == 0 {
		return false
	}
	nonNegatedSet := core.Filter(typeSet, func(t *Type) bool { return !isComplement(t) })
	if len(nonNegatedSet) == 0 {
		return false
	}
	for _, complement := range complements {
		if complement.flags&TypeFlagsIntersection != 0 {
			if core.Every(complement.Types(), func(member *Type) bool {
				return slices.Contains(nonNegatedSet, member.AsNegatedType().baseType)
			}) {
				return true
			}
			continue
		}
		if c.isTypeSubtypeOf(complement.AsNegatedType().baseType, c.getUnionType(nonNegatedSet)) {
			return true
		}
	}
	return false
}

// removeNegatedSubtypes removes redundant negated members from an intersection. A member 'not X'
// is redundant when the combined non-negated part of the intersection is already a subtype of
// 'not X' (i.e. it is disjoint from X). For example, in 'false & not true' the non-negated part
// 'false' is a subtype of 'not true', so 'not true' is dropped, leaving just 'false'.
//
// A member 'not X' is also redundant when the non-negated part is mutually exclusive with X by
// virtue of a shared discriminant property (see objectTypesAreDisjointByProperties). For example, given
// discriminated types 'A = { kind: "a" }' and 'C = { kind: "c" }', the intersection 'C & not A'
// reduces to 'C' because no value of type C can be an A.
func (c *Checker) removeNegatedSubtypes(types []*Type) []*Type {
	if len(types) == 0 {
		return types
	}
	nonNegatedBounds := core.Filter(types, func(t *Type) bool { return t.flags&TypeFlagsNegated == 0 })
	if len(nonNegatedBounds) == 0 {
		return types
	}
	nonNegativePart := c.getIntersectionType(nonNegatedBounds)
	for i := range slices.Backward(types) {
		if types[i].flags&TypeFlagsNegated == 0 {
			continue
		}
		negatedBase := types[i].AsNegatedType().baseType
		if negatedBase.flags&TypeFlagsNullable != 0 {
			if nonNegativePart.flags&TypeFlagsDefinitelyNonNullable != 0 || nonNegativePart.flags&TypeFlagsIntersection != 0 && core.Some(nonNegativePart.Types(), func(member *Type) bool {
				return member.flags&TypeFlagsDefinitelyNonNullable != 0
			}) {
				types = slices.Delete(types, i, i+1)
				continue
			}
			if nonNegativePart.flags&TypeFlagsTypeVariable != 0 {
				constraint := c.getBaseConstraintOfType(nonNegativePart)
				if constraint != nil && everyType(constraint, func(member *Type) bool {
					return member.flags&TypeFlagsDefinitelyNonNullable != 0
				}) {
					types = slices.Delete(types, i, i+1)
					continue
				}
			}
			if nonNegativePart.flags&TypeFlagsStructuredOrInstantiable != 0 {
				continue
			}
		}
		if c.isTypeSubtypeOf(nonNegativePart, types[i]) || isFreshNegatedType(types[i]) && c.typesAreInDisjointDomainsIncludingObjects(nonNegativePart, negatedBase) || c.objectTypesAreDisjointByProperties(nonNegativePart, negatedBase, false /*sourceIsClosed*/) {
			types = slices.Delete(types, i, i+1)
		}
	}
	return types
}

// objectTypesAreDisjointByProperties reports whether 'source' and 'target' are provably mutually
// exclusive because they share a property whose types are in disjoint domains, or a discriminant
// property whose types have an empty (never) intersection. When sourceIsClosed is true, a required
// target property that cannot be supplied by the source also proves disjointness.
// For example '{ kind: "c" }' and '{ kind: "a" }' are disjoint by their 'kind' property, so
// 'C & not A' reduces to 'C'.
//
// Discriminant properties are located with findDiscriminantProperties over the union 'a | b' -- the
// same mechanism used for discriminated-union narrowing -- and disjointness of a single discriminant
// is decided by intersecting the two property types and checking for never. Other shared properties,
// including properties matched by an index signature, are only compared by their primitive domains,
// avoiding recursive intersections of object types.
// Deciding discriminant disjointness by intersecting the property types (rather than comparing them
// by identity) is important: an enum
// literal such as 'E.A' (where 'enum E { A = "a" }') is a distinct type from the string literal '"a"'
// yet is not mutually exclusive with it, so 'E.A & "a"' is not never.
//
// Only the (small, literal) discriminant property types are intersected here, never the full input
// types, so this stays cheap and avoids the circularities a general 'a & b is never' computation
// would risk during intersection construction.
func (c *Checker) objectTypesAreDisjointByProperties(source *Type, target *Type, sourceIsClosed bool) bool {
	union := c.getUnionType([]*Type{source, target})
	if union.flags&TypeFlagsUnion == 0 {
		// 'source' and 'target' collapsed into a single type (e.g. one is a subtype of the other), so there is
		// no discriminant to distinguish them.
		return false
	}
	discriminantProperties := c.findDiscriminantProperties(c.getPropertiesOfType(source), union)
	for _, prop := range c.getPropertiesOfType(source) {
		sourcePropType := c.getTypeOfPropertyOfType(source, prop.Name)
		targetProp := c.getPropertyOfType(target, prop.Name)
		var targetPropType *Type
		if targetProp != nil {
			targetPropType = c.getTypeOfSymbol(targetProp)
		}
		if targetPropType == nil {
			if indexInfo := c.getApplicableIndexInfoForName(target, prop.Name); indexInfo != nil {
				targetPropType = indexInfo.valueType
			}
		}
		if sourcePropType == nil || targetPropType == nil {
			continue
		}
		if (isRequiredProperty(prop) || isRequiredProperty(targetProp)) &&
			(typesAreInDisjointDomains(sourcePropType, targetPropType) ||
				slices.Contains(discriminantProperties, prop) && c.getIntersectionType([]*Type{sourcePropType, targetPropType}).flags&TypeFlagsNever != 0) {
			return true
		}
	}
	if sourceIsClosed {
		for _, targetProp := range c.getUnmatchedProperties(source, target, false /*requireOptionalProperties*/, false /*matchDiscriminantProperties*/) {
			sourceIndex := c.getApplicableIndexInfoForName(source, targetProp.Name)
			if sourceIndex == nil || typesAreInDisjointDomains(sourceIndex.valueType, c.getTypeOfSymbol(targetProp)) {
				return true
			}
		}
	}
	return false
}

func typesAreInDisjointDomains(a *Type, b *Type) bool {
	aDomains := a.flags & TypeFlagsDisjointDomains
	bDomains := b.flags & TypeFlagsDisjointDomains
	return aDomains != 0 && bDomains != 0 && aDomains&bDomains == 0
}

func (c *Checker) typesAreInDisjointDomainsIncludingObjects(a *Type, b *Type) bool {
	aDomains := c.getTypeDomains(a)
	bDomains := c.getTypeDomains(b)
	return aDomains != 0 && bDomains != 0 && aDomains&bDomains == 0
}

func (c *Checker) getTypeDomains(t *Type) TypeFlags {
	var domains TypeFlags
	if t.flags&TypeFlagsStringLike != 0 {
		domains |= TypeFlagsString
	}
	if t.flags&TypeFlagsNumberLike != 0 {
		domains |= TypeFlagsNumber
	}
	if t.flags&TypeFlagsBigIntLike != 0 {
		domains |= TypeFlagsBigInt
	}
	if t.flags&TypeFlagsBooleanLike != 0 {
		domains |= TypeFlagsBoolean
	}
	if t.flags&TypeFlagsESSymbolLike != 0 {
		domains |= TypeFlagsESSymbol
	}
	if t.flags&TypeFlagsVoidLike != 0 {
		domains |= TypeFlagsVoid
	}
	if t.flags&TypeFlagsNull != 0 {
		domains |= TypeFlagsNull
	}
	if t.flags&(TypeFlagsObject|TypeFlagsNonPrimitive) != 0 && !c.IsEmptyAnonymousObjectType(t) {
		domains |= TypeFlagsNonPrimitive
	}
	return domains
}

func isRequiredProperty(prop *ast.Symbol) bool {
	return prop != nil && prop.Flags&ast.SymbolFlagsOptional == 0 && prop.CheckFlags&ast.CheckFlagsPartial == 0
}
